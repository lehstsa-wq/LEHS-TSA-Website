
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot,
  addDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import { Announcement, User, ResourceLink, OfficerNote, InternalDeadline, SiteSettings, CompetitionInterest, Officer, Event, Project, GalleryItem, AccessCode, ProblemReport } from '../types';
import { useAuth } from './AuthContext';

// --- MOCK DATA ---
const MOCK_ANNOUNCEMENTS: Announcement[] = [
    {
        id: '1',
        title: 'Welcome Back! First Meeting',
        content: 'Join us for our first general meeting of the year. We will discuss competition events, officer elections, and upcoming workshops. Pizza will be provided!',
        date: '2024-09-05',
        author: 'President',
        type: 'Meeting',
        isPinned: true
    },
    {
        id: '2',
        title: 'Competition Sign-ups Open',
        content: 'Registration for Regional Competitions is now open. Please browse the events page and indicate your interest by Friday.',
        date: '2024-09-10',
        author: 'VP of Competitions',
        type: 'Deadline'
    }
];

const MOCK_EVENTS: Event[] = [
    {
        id: 'e1',
        title: 'Chapter Meeting',
        date: '2024-10-15',
        time: '3:45 PM',
        location: 'Room 204',
        description: 'Regular chapter meeting to discuss project progress.',
        category: 'Meeting',
        status: 'Upcoming'
    }
];

const MOCK_OFFICERS: Officer[] = [
    {
        id: 'p1',
        name: 'Alex Rivera',
        role: 'President',
        grade: '12th Grade',
        category: 'Executive',
        bio: 'Aspiring software engineer with a passion for leadership and robotics.',
        order: 1,
        imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop',
        email: 'alex@lehs.tsa'
    }
];

const MOCK_PROJECTS: Project[] = [
    {
        id: 'pr1',
        title: 'Eco-Friendly Smart Home',
        category: 'Architectural Design',
        year: '2024',
        description: 'A sustainable housing model incorporating solar tracking and greywater recycling.',
        imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80',
        award: '1st Place State'
    }
];

const MOCK_GALLERY: GalleryItem[] = [
    {
        id: 'g1',
        title: 'State Conference 2024',
        category: 'Competition',
        imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80',
        date: '2024-04-15'
    }
];

const MOCK_RESOURCES: ResourceLink[] = [
    {
        id: 'r1',
        title: '2025 High School Comp Guide',
        url: '#',
        type: 'PDF',
        category: 'competition',
        accessLevel: 'member',
        description: 'The official rulebook for all events.',
        dateAdded: '2024-09-01'
    }
];

const MOCK_REPORTS: ProblemReport[] = [
    {
        id: 'rep1',
        reporterName: 'John Doe',
        reporterEmail: 'john.doe@leisd.ws',
        category: 'Website Bug',
        description: 'The gallery images load very slowly on mobile data.',
        priority: 'Medium',
        status: 'Open',
        submittedDate: '2024-10-02'
    }
];

interface DataContextType {
  announcements: Announcement[];
  members: User[];
  resources: ResourceLink[];
  officerNotes: OfficerNote[];
  internalDeadlines: InternalDeadline[];
  siteSettings: SiteSettings;
  competitionInterests: CompetitionInterest[];
  problemReports: ProblemReport[];
  
  // Dynamic Competition Resources Map (multiple links per competition)
  competitionLinks: Record<string, Array<{ url: string; name: string }>>;
  updateCompetitionLinks: (compId: string, links: Array<{ url: string; name: string }>) => void;

  officersList: Officer[];
  eventsList: Event[];
  projectsList: Project[];
  galleryList: GalleryItem[];
  accessCodes: AccessCode[];
  
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'date' | 'author'>) => void;
  updateAnnouncement: (id: string, data: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;
  
  updateMemberRole: (id: string, role: User['role']) => void;
  updateMemberStatus: (id: string, status: User['status']) => void;
  updateMemberRequirement: (id: string, field: 'duesPaid' | 'appCompleted' | 'remindJoined', value: boolean) => void;
  deleteMember: (id: string) => Promise<void>;
  
  addResource: (resource: Omit<ResourceLink, 'id' | 'dateAdded'>) => void;
  updateResource: (id: string, data: Partial<ResourceLink>) => void;
  deleteResource: (id: string) => void;
  
  addInternalDeadline: (deadline: Omit<InternalDeadline, 'id'>) => void;
  toggleDeadlineStatus: (id: string) => void;
  
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  submitInterest: (interest: Omit<CompetitionInterest, 'timestamp'>) => Promise<void>;

  addProblemReport: (report: Omit<ProblemReport, 'id' | 'status' | 'submittedDate'>) => Promise<void>;
  updateProblemReport: (id: string, data: Partial<ProblemReport>) => void;
  deleteProblemReport: (id: string) => void;

  addOfficer: (officer: Omit<Officer, 'id'>) => void;
  updateOfficer: (id: string, data: Partial<Officer>) => void;
  deleteOfficer: (id: string) => void;

  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, data: Partial<Event>) => void;
  deleteEvent: (id: string) => void;

  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;

  generateAccessCode: (role: 'member' | 'officer', assignedName?: string) => Promise<string>;
  deleteAccessCode: (id: string) => Promise<void>;
  archiveAccessCode: (id: string) => Promise<void>;
  regenerateMemberAccessCode: (oldCodeId: string, memberUid: string, memberName: string, role: 'member' | 'officer') => Promise<string | null>;
  subscribe: (email: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State Initialization with Mock Data
  const [announcements, setAnnouncements] = useState<Announcement[]>(MOCK_ANNOUNCEMENTS);
  const [members, setMembers] = useState<User[]>([]);
  const [resources, setResources] = useState<ResourceLink[]>(MOCK_RESOURCES);
  const [officerNotes] = useState<OfficerNote[]>([]);
  const [internalDeadlines, setInternalDeadlines] = useState<InternalDeadline[]>([]);
  const [competitionInterests, setCompetitionInterests] = useState<CompetitionInterest[]>([]);
  const [problemReports, setProblemReports] = useState<ProblemReport[]>(MOCK_REPORTS);
  
  // State for Competition Links (multiple per competition)
  const [competitionLinks, setCompetitionLinks] = useState<Record<string, Array<{ url: string; name: string }>>>({});
  
  const [officersList, setOfficersList] = useState<Officer[]>(MOCK_OFFICERS);
  const [eventsList, setEventsList] = useState<Event[]>(MOCK_EVENTS);
  const [projectsList, setProjectsList] = useState<Project[]>(MOCK_PROJECTS);
  const [galleryList, setGalleryList] = useState<GalleryItem[]>(MOCK_GALLERY);
  const [accessCodes, setAccessCodes] = useState<AccessCode[]>([]);

  // Sync Officers from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "officers"), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Officer));
      items.sort((a, b) => a.order - b.order);
      setOfficersList(items);
    });
    return () => unsubscribe();
  }, []);

  // Sync Events from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "events"), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
      items.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setEventsList(items);
    });
    return () => unsubscribe();
  }, []);

  // Sync Projects from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "projects"), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
      setProjectsList(items);
    });
    return () => unsubscribe();
  }, []);

  // Sync Gallery from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "gallery"), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryItem));
      setGalleryList(items);
    });
    return () => unsubscribe();
  }, []);

  // Sync Resources from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "resources"), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ResourceLink));
      setResources(items);
    });
    return () => unsubscribe();
  }, []);

  // Sync Access Codes from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "access_codes"), (snapshot) => {
      const codes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AccessCode));
      setAccessCodes(codes);
    });
    return () => unsubscribe();
  }, []);

  // Sync Members from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "members"), (snapshot) => {
      const memberList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
      setMembers(memberList);
    });
    return () => unsubscribe();
  }, []);

  // Sync Problem Reports from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "problem_reports"), (snapshot) => {
      const reports = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ProblemReport));
      setProblemReports(reports);
    });
    return () => unsubscribe();
  }, []);

  // Sync Competition Interests from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "competition_interests"), (snapshot) => {
      const interests = snapshot.docs.map(doc => doc.data() as CompetitionInterest);
      setCompetitionInterests(interests);
    });
    return () => unsubscribe();
  }, []);

  // Sync Announcements from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "announcements"), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Announcement));
      // Sort by date descending
      items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setAnnouncements(items);
    });
    return () => unsubscribe();
  }, []);

  // Sync Site Settings from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "settings", "global"), (doc) => {
      if (doc.exists()) {
        setSiteSettings(doc.data() as SiteSettings);
      }
    });
    return () => unsubscribe();
  }, []);

  // Sync Competition Links from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "settings", "competition_links"), (doc) => {
      if (doc.exists()) {
        const raw = doc.data() as Record<string, unknown>;
        // Migrate: old format stored a single {url,name} object; new format is an array
        const normalized: Record<string, Array<{ url: string; name: string }>> = {};
        for (const [id, val] of Object.entries(raw)) {
          if (Array.isArray(val)) {
            normalized[id] = val as Array<{ url: string; name: string }>;
          } else if (val && typeof val === 'object' && 'url' in val) {
            const v = val as { url: string; name?: string };
            if (v.url) normalized[id] = [{ url: v.url, name: v.name || v.url }];
          }
        }
        setCompetitionLinks(normalized);
      }
    });
    return () => unsubscribe();
  }, []);

  // ------------------------------------------------------------------
  // SITE SETTINGS & LINKS CONFIGURATION
  // ------------------------------------------------------------------
  // EDIT THE LINKS BELOW TO UPDATE THE BUTTONS ON THE JOIN PAGE
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    id: 'global',
    primaryColor: '#00205B', 
    fontFamily: 'Inter',
    
    // LINK 1: Remind Class Join Link (e.g., https://www.remind.com/join/classcode)
    remindLink: 'https://www.remind.com/join/INSERT_REMIND_CODE',
    
    // LINK 2: Official TSA Application (JotForm)
    jotformLink: 'https://form.jotform.com/253622211875051', 
    
    // LINK 3: District Permission Slip / Club Paperwork URL
    districtAppLink: 'https://INSERT_DISTRICT_LINK',
    
    // LINK 4: Payment Portal (SuccessFund, RevTrak, etc.)
    successFundLink: 'https://www.successfund.com/INSERT_YOUR_LINK',

    instagramLink: 'https://instagram.com/littleelmhighschooltsa',
    twitterLink: 'https://twitter.com/littleelmhighschooltsa',
    
    nextEventTitle: 'State Competition',
    nextEventDate: '2025-04-15T09:00:00.000Z',
    stats: {
      members: '50+',
      wins: '25+',
      yearsActive: '4'
    }
  });

  const { user } = useAuth();

  /* --- ACTIONS --- */

  const addAnnouncement = async (newAnnouncement: Omit<Announcement, 'id' | 'date' | 'author'>) => {
    const item: Announcement = {
        ...newAnnouncement,
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        author: user?.name || 'Officer'
    };
    // Optimistic update
    setAnnouncements(prev => [item, ...prev]);
    try {
        await setDoc(doc(db, "announcements", item.id), item);
    } catch (e) {
        console.error("Error adding announcement:", e);
    }
  };

  const updateAnnouncement = async (id: string, data: Partial<Announcement>) => {
    setAnnouncements(prev => prev.map(item => item.id === id ? { ...item, ...data } : item));
    try {
        await setDoc(doc(db, "announcements", id), data, { merge: true });
    } catch (e) {
        console.error("Error updating announcement:", e);
    }
  };

  const deleteAnnouncement = async (id: string) => {
    setAnnouncements(prev => prev.filter(item => item.id !== id));
    try {
        await deleteDoc(doc(db, "announcements", id));
    } catch (e) {
        console.error("Error deleting announcement:", e);
    }
  };

  const updateMemberRole = async (id: string, role: User['role']) => {
      setMembers(prev => prev.map(m => m.id === id ? { ...m, role } : m));
      try {
          await setDoc(doc(db, "members", id), { role }, { merge: true });
      } catch (e) {
          console.error("Error updating role:", e);
      }
  };

  const updateMemberStatus = async (id: string, status: User['status']) => {
      setMembers(prev => prev.map(m => m.id === id ? { ...m, status } : m));
      try {
          await setDoc(doc(db, "members", id), { status }, { merge: true });
      } catch (e) {
          console.error("Error updating status:", e);
      }
  };

  const updateMemberRequirement = async (id: string, field: 'duesPaid' | 'appCompleted' | 'remindJoined', value: boolean) => {
      setMembers(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m));
      try {
          await setDoc(doc(db, "members", id), { [field]: value }, { merge: true });
      } catch (e) {
          console.error("Error updating requirement:", e);
      }
  };

  const deleteMember = async (id: string) => {
      // Find the member to get their memberId (which is the access code)
      const member = members.find(m => m.id === id);
      const accessCodeId = member?.memberId;

      setMembers(prev => prev.filter(m => m.id !== id));
      try {
          await deleteDoc(doc(db, "members", id));
          // If the member had an access code, delete it too
          if (accessCodeId) {
              await deleteDoc(doc(db, "access_codes", accessCodeId));
          }
      } catch (e) {
          console.error("Error deleting member:", e);
      }
  };

  const addResource = async (newResource: Omit<ResourceLink, 'id' | 'dateAdded'>) => {
      const item: ResourceLink = {
          ...newResource,
          id: Date.now().toString(),
          dateAdded: new Date().toISOString().split('T')[0]
      };
      setResources(prev => [item, ...prev]);
      try {
          await setDoc(doc(db, "resources", item.id), item);
      } catch (e) {
          console.error("Error adding resource:", e);
      }
  };

  const updateResource = async (id: string, data: Partial<ResourceLink>) => {
      setResources(prev => prev.map(r => r.id === id ? { ...r, ...data } : r));
      try {
          await setDoc(doc(db, "resources", id), data, { merge: true });
      } catch (e) {
          console.error("Error updating resource:", e);
      }
  };

  const deleteResource = async (id: string) => {
      setResources(prev => prev.filter(r => r.id !== id));
      try {
          await deleteDoc(doc(db, "resources", id));
      } catch (e) {
          console.error("Error deleting resource:", e);
      }
  };

  const addInternalDeadline = (deadline: Omit<InternalDeadline, 'id'>) => {
      setInternalDeadlines(prev => [...prev, { ...deadline, id: Date.now().toString() }]);
  };

  const toggleDeadlineStatus = (id: string) => {
      setInternalDeadlines(prev => prev.map(d => d.id === id ? { ...d, status: d.status === 'Completed' ? 'Pending' : 'Completed' } : d));
  };

  const updateSiteSettings = async (settings: Partial<SiteSettings>) => {
      setSiteSettings(prev => ({ ...prev, ...settings }));
      try {
          await setDoc(doc(db, "settings", "global"), settings, { merge: true });
      } catch (e) {
          console.error("Error updating site settings:", e);
      }
  };

  const submitInterest = async (interest: Omit<CompetitionInterest, 'timestamp'>) => {
      const item: CompetitionInterest = { ...interest, timestamp: new Date().toISOString() };
      setCompetitionInterests(prev => [...prev, item]);
      try {
          await addDoc(collection(db, "competition_interests"), item);
      } catch (e) {
          console.error("Error submitting interest:", e);
      }
  };

  // PROBLEM REPORTING
  const addProblemReport = async (report: Omit<ProblemReport, 'id' | 'status' | 'submittedDate'>) => {
      const newReport: ProblemReport = {
          ...report,
          id: Date.now().toString(),
          status: 'Open',
          submittedDate: new Date().toISOString().split('T')[0]
      };
      setProblemReports(prev => [newReport, ...prev]);
      try {
          await setDoc(doc(db, "problem_reports", newReport.id), newReport);
      } catch (e) {
          console.error("Error adding problem report:", e);
      }
  };

  const updateProblemReport = async (id: string, data: Partial<ProblemReport>) => {
      setProblemReports(prev => prev.map(r => r.id === id ? { ...r, ...data } : r));
      try {
          await setDoc(doc(db, "problem_reports", id), data, { merge: true });
      } catch (e) {
          console.error("Error updating problem report:", e);
      }
  };

  const deleteProblemReport = async (id: string) => {
      setProblemReports(prev => prev.filter(r => r.id !== id));
      try {
          await deleteDoc(doc(db, "problem_reports", id));
      } catch (e) {
          console.error("Error deleting problem report:", e);
      }
  };

  // Update multiple competition links for a single competition
  const updateCompetitionLinks = async (compId: string, links: Array<{ url: string; name: string }>) => {
      const newLinks = { ...competitionLinks };
      const filtered = links.filter(l => l.url.trim());
      if (filtered.length === 0) {
          delete newLinks[compId];
      } else {
          newLinks[compId] = filtered;
      }
      setCompetitionLinks(newLinks);
      try {
          await setDoc(doc(db, "settings", "competition_links"), newLinks);
      } catch (e) {
          console.error("Error updating competition links:", e);
      }
  };

  const addOfficer = async (officer: Omit<Officer, 'id'>) => {
      const newOfficer = { ...officer, id: Date.now().toString() };
      setOfficersList(prev => [...prev, newOfficer]);
      try {
          await setDoc(doc(db, "officers", newOfficer.id), newOfficer);
      } catch (e) {
          console.error("Error adding officer:", e);
      }
  };

  const updateOfficer = async (id: string, data: Partial<Officer>) => {
      setOfficersList(prev => prev.map(o => o.id === id ? { ...o, ...data } : o));
      try {
          await setDoc(doc(db, "officers", id), data, { merge: true });
      } catch (e) {
          console.error("Error updating officer:", e);
      }
  };

  const deleteOfficer = async (id: string) => {
      setOfficersList(prev => prev.filter(o => o.id !== id));
      try {
          await deleteDoc(doc(db, "officers", id));
      } catch (e) {
          console.error("Error deleting officer:", e);
      }
  };

  const addEvent = async (event: Omit<Event, 'id'>) => {
      const newEvent = { ...event, id: Date.now().toString() };
      setEventsList(prev => [...prev, newEvent]);
      try {
          await setDoc(doc(db, "events", newEvent.id), newEvent);
      } catch (e) {
          console.error("Error adding event:", e);
      }
  };

  const updateEvent = async (id: string, data: Partial<Event>) => {
      setEventsList(prev => prev.map(e => e.id === id ? { ...e, ...data } : e));
      try {
          await setDoc(doc(db, "events", id), data, { merge: true });
      } catch (e) {
          console.error("Error updating event:", e);
      }
  };

  const deleteEvent = async (id: string) => {
      setEventsList(prev => prev.filter(e => e.id !== id));
      try {
          await deleteDoc(doc(db, "events", id));
      } catch (e) {
          console.error("Error deleting event:", e);
      }
  };

  const addProject = async (project: Omit<Project, 'id'>) => {
      const newProject = { ...project, id: Date.now().toString() };
      setProjectsList(prev => [...prev, newProject]);
      try {
          await setDoc(doc(db, "projects", newProject.id), newProject);
      } catch (e) {
          console.error("Error adding project:", e);
      }
  };

  const updateProject = async (id: string, data: Partial<Project>) => {
      setProjectsList(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
      try {
          await setDoc(doc(db, "projects", id), data, { merge: true });
      } catch (e) {
          console.error("Error updating project:", e);
      }
  };

  const deleteProject = async (id: string) => {
      setProjectsList(prev => prev.filter(p => p.id !== id));
      try {
          await deleteDoc(doc(db, "projects", id));
      } catch (e) {
          console.error("Error deleting project:", e);
      }
  };

  const addGalleryItem = async (item: Omit<GalleryItem, 'id'>) => {
      const newItem = { ...item, id: Date.now().toString() };
      setGalleryList(prev => [...prev, newItem]);
      try {
          await setDoc(doc(db, "gallery", newItem.id), newItem);
      } catch (e) {
          console.error("Error adding gallery item:", e);
      }
  };

  const deleteGalleryItem = async (id: string) => {
      setGalleryList(prev => prev.filter(g => g.id !== id));
      try {
          await deleteDoc(doc(db, "gallery", id));
      } catch (e) {
          console.error("Error deleting gallery item:", e);
      }
  };

  const generateAccessCode = async (role: 'member' | 'officer' = 'member', assignedName?: string): Promise<string> => {
      const prefix = role === 'officer' ? 'OFF' : 'MEM';
      const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
      const code = `LEHS-${prefix}-${randomPart}`;
      
      const newCode: AccessCode = { 
          id: code, 
          createdDate: new Date().toISOString(), 
          status: 'unused', 
          role, 
          assignedTo: assignedName || undefined 
      };

      // Remove undefined fields before saving to Firestore
      const firestoreData = Object.fromEntries(
        Object.entries(newCode).filter(([_, v]) => v !== undefined)
      );

      try {
          await setDoc(doc(db, "access_codes", code), firestoreData);
      } catch (e) {
          console.error("Error generating access code:", e);
          setAccessCodes(prev => [...prev, newCode]);
      }
      return code;
  };

  const deleteAccessCode = async (id: string) => {
      setAccessCodes(prev => prev.filter(c => c.id !== id));
      try {
          await deleteDoc(doc(db, "access_codes", id));
      } catch (e) {
          console.error("Error deleting access code:", e);
      }
  };

  const archiveAccessCode = async (id: string) => {
      setAccessCodes(prev => prev.map(c => c.id === id ? { ...c, status: 'archived' } : c));
      try {
          await setDoc(doc(db, "access_codes", id), { status: 'archived' }, { merge: true });
      } catch (e) {
          console.error("Error archiving access code:", e);
      }
  };

  const regenerateMemberAccessCode = async (oldCodeId: string, memberUid: string, memberName: string, role: 'member' | 'officer') => {
      // 1. Generate new code
      const prefix = role === 'officer' ? 'OFF' : 'MEM';
      const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
      const newCodeId = `LEHS-${prefix}-${randomPart}`;

      const newCode: AccessCode = {
          id: newCodeId,
          createdDate: new Date().toISOString(),
          status: 'used',
          role,
          assignedTo: memberName,
          assignedUid: memberUid
      };

      // 2. Optimistic Update
      setAccessCodes(prev => [
          ...prev.filter(c => c.id !== oldCodeId),
          newCode
      ]);
      
      // Update member locally
      setMembers(prev => prev.map(m => m.id === memberUid ? { ...m, memberId: newCodeId } : m));

      try {
          // 3. Firestore Operations
          await Promise.all([
              // Create new code
              setDoc(doc(db, "access_codes", newCodeId), newCode),
              // Update member
              setDoc(doc(db, "members", memberUid), { memberId: newCodeId }, { merge: true }),
              // Delete old code
              deleteDoc(doc(db, "access_codes", oldCodeId))
          ]);
          return newCodeId;
      } catch (e) {
          console.error("Error regenerating access code:", e);
          // Revert optimistic update (simplified, might need full revert logic in real app)
          return null;
      }
  };

  const subscribe = async (email: string) => {
    try {
      // 1. Save to Firestore
      await setDoc(doc(db, "subscribers", email), {
        email,
        dateSubscribed: new Date().toISOString()
      });

      // 2. Call backend to send welcome email
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        console.warn("Subscriber saved to database, but failed to send welcome email.");
      }
    } catch (e) {
      console.error("Error subscribing:", e);
      throw e;
    }
  };

  return (
    <DataContext.Provider value={{ 
      announcements, members, resources, officerNotes, internalDeadlines, siteSettings, competitionInterests, problemReports,
      competitionLinks, updateCompetitionLinks,
      officersList, eventsList, projectsList, galleryList, accessCodes,
      addAnnouncement, updateAnnouncement, deleteAnnouncement,
      updateMemberRole, updateMemberStatus, updateMemberRequirement, deleteMember,
      addResource, updateResource, deleteResource,
      addInternalDeadline, toggleDeadlineStatus,
      updateSiteSettings, submitInterest,
      addProblemReport, updateProblemReport, deleteProblemReport,
      addOfficer, updateOfficer, deleteOfficer,
      addEvent, updateEvent, deleteEvent,
      addProject, updateProject, deleteProject,
      addGalleryItem, deleteGalleryItem,
      generateAccessCode, deleteAccessCode, archiveAccessCode, regenerateMemberAccessCode,
      subscribe
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
