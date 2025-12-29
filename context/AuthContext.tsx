
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  User as FirebaseUser 
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { User, UserRole, AccessCode } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (accessCode: string, name: string, email: string, grade: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isOfficer: boolean;
}

// Emails that automatically get Officer status (Fallback for legacy/admin accounts)
const OFFICER_EMAILS = [
  'sai@saimail.com',
  'jstjohn@leisd.ws',
  'admin@littleelmisd.net'
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen for Firebase Auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in, fetch their profile data from Firestore
        await fetchUserProfile(firebaseUser);
      } else {
        // User is signed out
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserProfile = async (firebaseUser: FirebaseUser) => {
    try {
      const docRef = doc(db, "members", firebaseUser.uid);
      let docSnap = await getDoc(docRef);

      // RACE CONDITION HANDLING:
      if (!docSnap.exists()) {
          await new Promise(resolve => setTimeout(resolve, 500));
          docSnap = await getDoc(docRef);
      }
      if (!docSnap.exists()) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          docSnap = await getDoc(docRef);
      }

      if (docSnap.exists()) {
        const userData = docSnap.data() as User;
        
        // Auto-promote ADVISOR memberId or hardcoded emails
        const isLegacyOfficer = OFFICER_EMAILS.includes(userData.email.toLowerCase());
        const isAdvisorId = userData.memberId === 'ADVISOR';

        if ((isLegacyOfficer || isAdvisorId) && userData.role !== 'advisor') {
             // Forcing advisor role for LEHS-ADMIN accounts
             const newRole = 'advisor'; 
             try {
                await setDoc(docRef, { ...userData, role: newRole }, { merge: true });
                userData.role = newRole;
            } catch (permError) {
                console.warn("Could not update role in Firestore (permission denied), applying locally:", permError);
                userData.role = newRole;
            }
        }
        
        setUser(userData);
      } else {
        console.warn(`No user profile found for uid: ${firebaseUser.uid}. Checking recovery options...`);
        
        // RECOVERY: Master Admin / Advisor Profile
        const email = firebaseUser.email?.toLowerCase();
        if (email === 'lehstsa@gmail.com' || email === 'admin@lehs.tsa') {
             console.log("Re-creating missing Advisor profile...");
             const newAdmin: User = {
                id: firebaseUser.uid,
                memberId: 'ADVISOR',
                name: 'Chapter Advisor',
                email: email,
                role: 'advisor', // Explicitly Advisor
                grade: 'Faculty',
                status: 'active',
                joinDate: new Date().toISOString().split('T')[0],
                avatar: `https://ui-avatars.com/api/?name=Advisor&background=3B6DF6&color=fff`
            };
            await setDoc(docRef, newAdmin);
            setUser(newAdmin);
        } else {
            await signOut(auth);
            setUser(null);
        }
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    try {
        await signInWithEmailAndPassword(auth, email, pass);
    } catch (error) {
        setIsLoading(false);
        throw error;
    }
  };

  const signup = async (accessCode: string, name: string, email: string, grade: string) => {
    const formattedCode = accessCode.trim();
    const password = formattedCode; 
    
    // --- ADVISOR BOOTSTRAP OVERRIDE ---
    if (formattedCode === 'LEHS-ADMIN') {
        try {
            // Attempt to create
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;
            
            const newUser: User = {
                id: firebaseUser.uid,
                memberId: 'ADVISOR',
                name,
                email,
                role: 'advisor',
                grade: 'Faculty',
                status: 'active',
                joinDate: new Date().toISOString().split('T')[0],
                avatar: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=3B6DF6&color=fff`
            };
            await setDoc(doc(db, "members", firebaseUser.uid), newUser);
            setUser(newUser);
            return;
        } catch (error: any) {
            // If Advisor account exists, try logging in with the code
            if (error.code === 'auth/email-already-in-use') {
                try {
                    await signInWithEmailAndPassword(auth, email, password);
                    // Ensure the advisor profile exists and update it
                    if (auth.currentUser) {
                         const newUser: User = {
                            id: auth.currentUser.uid,
                            memberId: 'ADVISOR',
                            name,
                            email,
                            role: 'advisor',
                            grade: 'Faculty',
                            status: 'active',
                            joinDate: new Date().toISOString().split('T')[0],
                            avatar: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=3B6DF6&color=fff`
                        };
                        await setDoc(doc(db, "members", auth.currentUser.uid), newUser, { merge: true });
                        setUser(newUser);
                    }
                    return;
                } catch (loginError) {
                    throw new Error("This Admin account already exists. Please Log In. If 'LEHS-ADMIN' is not your password, use the one you originally created.");
                }
            }
            throw error;
        }
    }
    // ----------------------------------

    // 1. Verify Access Code exists and is unused
    const codeRef = doc(db, "access_codes", formattedCode);
    const codeSnap = await getDoc(codeRef);

    if (!codeSnap.exists()) {
      throw new Error("Invalid Access Code. Please contact an officer.");
    }

    const codeData = codeSnap.data() as AccessCode;
    if (codeData.status === 'used') {
      throw new Error("This Access Code has already been used.");
    }

    // 2. Create Authentication User
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        // 3. Prepare Data
        const assignedRole = codeData.role || 'member';

        const newUser: User = {
          id: firebaseUser.uid,
          memberId: formattedCode, // Store the code used as reference
          name,
          email,
          role: assignedRole,
          grade,
          status: 'active',
          joinDate: new Date().toISOString().split('T')[0],
          avatar: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=3B6DF6&color=fff`
        };

        // 4. Parallelize Firestore Operations
        await Promise.all([
          updateDoc(codeRef, {
            status: 'used',
            assignedTo: name,
            assignedUid: firebaseUser.uid
          }),
          setDoc(doc(db, "members", firebaseUser.uid), newUser)
        ]);

        setUser(newUser);
    } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
            throw new Error("This email is already registered. Please go to Sign In.");
        }
        throw error;
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
        await signOut(auth);
        setUser(null);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      signup, 
      logout,
      isAuthenticated: !!user,
      isOfficer: user?.role === 'officer' || user?.role === 'advisor'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
