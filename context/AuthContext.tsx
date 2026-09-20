
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
import { User, AccessCode } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (accessCode: string, name: string, email: string, grade: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
  isOfficer: boolean;
}

/* ── Avatar helpers ──────────────────────────────────────────────────────────
   A member's avatar is either an uploaded photo (a data URL) or a generated
   initials tile whose color comes from `avatarColor`. Older accounts only ever
   stored the generated URL, so the color is recovered from it as a fallback. */

export const DEFAULT_AVATAR_COLOR = '6A9BCC';

/** Shared by the signup form and the signup call so the rule lives in one place. */
export const MIN_PASSWORD_LENGTH = 10;

const xmlEscape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** First letter of the first two words, e.g. "Jane Doe" -> "JD". */
const initialsOf = (name: string) => {
  const letters = (name || '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(w => w.charAt(0))
    .join('')
    .toUpperCase();
  return letters || 'M';
};

/**
 * The initials tile, drawn locally as an inline SVG.
 *
 * This used to point at ui-avatars.com. That is a third-party request on every
 * avatar, so anywhere the host is slow, offline, filtered by a school network,
 * or blocked by an extension, every member photo renders as a broken image.
 * Same string-URL shape as before, so every `<img src={avatar}>` is unchanged,
 * but nothing leaves the device.
 */
export const buildAvatarUrl = (name: string, color: string) => {
  const hex = (color || DEFAULT_AVATAR_COLOR).replace('#', '');
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">' +
    `<rect width="256" height="256" fill="#${hex}"/>` +
    '<text x="50%" y="50%" dy=".35em" text-anchor="middle" fill="#ffffff" ' +
    'font-family="Helvetica, Arial, sans-serif" font-size="112" font-weight="700">' +
    xmlEscape(initialsOf(name)) +
    '</text></svg>';
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

/** True when the avatar is a generated initials tile rather than a real photo.
 *  Uploads are always JPEG data URLs, so the SVG form is unambiguous. */
export const isGeneratedAvatar = (url?: string) =>
  !url || url.includes('ui-avatars.com') || url.startsWith('data:image/svg+xml');

export const avatarColorOf = (user?: Pick<User, 'avatar' | 'avatarColor'> | null): string => {
  if (user?.avatarColor) return user.avatarColor.replace('#', '');
  // Legacy ui-avatars URL, then the inline SVG tile (%23 is an encoded '#').
  const legacy = user?.avatar?.match(/background=([A-Fa-f0-9]{6})/);
  if (legacy) return legacy[1];
  const inline = user?.avatar?.match(/fill%3D%22%23([A-Fa-f0-9]{6})%22/);
  return inline ? inline[1] : DEFAULT_AVATAR_COLOR;
};

/** Tile colors offered wherever an avatar can be set. */
export const AVATAR_COLORS = [
  { hex: '6A9BCC', label: 'Blue'   },
  { hex: 'D97757', label: 'Orange' },
  { hex: '788C5D', label: 'Green'  },
  { hex: 'B0AEA5', label: 'Gray'   },
  { hex: '5B89B5', label: 'Steel'  },
  { hex: 'C4633E', label: 'Rust'   },
  { hex: '4D749E', label: 'Navy'   },
  { hex: 'A84F2A', label: 'Amber'  },
  { hex: '3A5A82', label: 'Slate'  },
];

/** The uploaded photo, if the member has one. */
export const avatarPhotoOf = (user?: Pick<User, 'avatar'> | null): string | undefined =>
  isGeneratedAvatar(user?.avatar) ? undefined : user?.avatar;

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

        // Role comes from the stored profile only. It used to be inferred from
        // a hardcoded email list and from memberId === 'ADVISOR', which let
        // anyone holding an access code self-promote to advisor simply by
        // typing one of those addresses at signup — the app never verifies
        // that a member owns the email they register. Advisor and officer
        // roles are now granted by the access code or by an existing
        // advisor in the admin panel.
        setUser(userData);
      } else {
        // An authenticated session with no member profile gets signed out.
        // This used to mint a fresh advisor profile for three hardcoded
        // addresses, which handed full admin to anyone who could sign in as
        // one of them. If an advisor ever does lose their profile document,
        // recover it deliberately: another advisor can set the role from the
        // admin panel, or write the members/<uid> document from the Firebase
        // console. Never infer privilege from an email string.
        console.warn(`No member profile for uid: ${firebaseUser.uid}. Signing out.`);
        await signOut(auth);
        setUser(null);
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

  const signup = async (
    accessCode: string,
    name: string,
    email: string,
    grade: string,
    password: string,
  ) => {
    const formattedCode = accessCode.trim();

    // The access code authorises registration; it is not the password. It used
    // to be both, which meant every member's password was a short string that
    // officers handed out and other members could see.
    if (!password || password.length < MIN_PASSWORD_LENGTH) {
      throw new Error(`Please choose a password of at least ${MIN_PASSWORD_LENGTH} characters.`);
    }
    if (password.trim() === formattedCode) {
      throw new Error('Your password cannot be the same as your access code.');
    }


    // 1. Verify Access Code exists and is unused
    const codeRef = doc(db, "access_codes", formattedCode);
    let codeSnap;
    try {
      codeSnap = await getDoc(codeRef);
    } catch (e) {
      console.error("Could not read access code:", e);
      throw new Error("We couldn't verify that access code right now. Please try again or contact an officer.");
    }

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
          avatarColor: DEFAULT_AVATAR_COLOR,
          avatar: buildAvatarUrl(name, DEFAULT_AVATAR_COLOR)
        };

        // 4. Write the profile first — it is what gates access to the portal.
        await setDoc(doc(db, "members", firebaseUser.uid), newUser);

        // 5. Claim the code. A failure here must not strand the new account,
        //    so log it and let an officer reconcile from the admin panel.
        try {
          await updateDoc(codeRef, {
            status: 'used',
            assignedTo: name,
            assignedUid: firebaseUser.uid
          });
        } catch (claimError) {
          console.error("Account created but access code could not be marked as used:", claimError);
        }

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

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    // Firestore rejects `undefined`, and merge:true tolerates a profile
    // document that was never written (older accounts, recovery flows).
    const clean = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== undefined)
    ) as Partial<User>;
    try {
      const docRef = doc(db, "members", user.id);
      await setDoc(docRef, clean, { merge: true });
      setUser(prev => prev ? { ...prev, ...clean } : null);
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      signup, 
      logout,
      updateProfile,
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
