
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Announcement, User, ResourceLink, OfficerNote, InternalDeadline, SiteSettings, CompetitionInterest, Officer, Event, Project, GalleryItem, AccessCode } from '../types';
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
        category: 'Competition',
        accessLevel: 'member',
        description: 'The official rulebook for all events.',
        dateAdded: '2024-09-01'
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
  
  // NEW: Dynamic Competition Resources Map
  competitionLinks: Record<string, string>;
  updateCompetitionLink: (compId: string, url: string) => void;

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
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State Initialization with Mock Data
  const [announcements, setAnnouncements] = useState<Announcement[]>(MOCK_ANNOUNCEMENTS);
  const [members, setMembers] = useState<User[]>([]);
  const [resources, setResources] = useState<ResourceLink[]>(MOCK_RESOURCES);
  const [officerNotes, setOfficerNotes] = useState<OfficerNote[]>([]);
  const [internalDeadlines, setInternalDeadlines] = useState<InternalDeadline[]>([]);
  const [competitionInterests, setCompetitionInterests] = useState<CompetitionInterest[]>([]);
  
  // NEW: State for Competition Links
  const [competitionLinks, setCompetitionLinks] = useState<Record<string, string>>({
    'webmaster': 'https://tsaweb.org/competitions',
    'coding': 'https://tsaweb.org/competitions'
  });
  
  const [officersList, setOfficersList] = useState<Officer[]>(MOCK_OFFICERS);
  const [eventsList, setEventsList] = useState<Event[]>(MOCK_EVENTS);
  const [projectsList, setProjectsList] = useState<Project[]>(MOCK_PROJECTS);
  const [galleryList, setGalleryList] = useState<GalleryItem[]>(MOCK_GALLERY);
  const [accessCodes, setAccessCodes] = useState<AccessCode[]>([]);

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
    successFundLink: 'https://www.successfund.com/INSERT_YOUR_LINK'
  });

  const { user } = useAuth();

  /* --- MOCK ACTIONS --- */

  const addAnnouncement = (newAnnouncement: Omit<Announcement, 'id' | 'date' | 'author'>) => {
    const item: Announcement = {
        ...newAnnouncement,
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        author: user?.name || 'Officer'
    };
    setAnnouncements(prev => [item, ...prev]);
  };

  const updateAnnouncement = (id: string, data: Partial<Announcement>) => {
    setAnnouncements(prev => prev.map(item => item.id === id ? { ...item, ...data } : item));
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(item => item.id !== id));
  };

  const updateMemberRole = (id: string, role: User['role']) => {
      setMembers(prev => prev.map(m => m.id === id ? { ...m, role } : m));
  };

  const updateMemberStatus = (id: string, status: User['status']) => {
      setMembers(prev => prev.map(m => m.id === id ? { ...m, status } : m));
  };

  const updateMemberRequirement = (id: string, field: 'duesPaid' | 'appCompleted' | 'remindJoined', value: boolean) => {
      setMembers(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const deleteMember = async (id: string) => {
      setMembers(prev => prev.filter(m => m.id !== id));
  };

  const addResource = (newResource: Omit<ResourceLink, 'id' | 'dateAdded'>) => {
      const item: ResourceLink = {
          ...newResource,
          id: Date.now().toString(),
          dateAdded: new Date().toISOString().split('T')[0]
      };
      setResources(prev => [item, ...prev]);
  };

  const updateResource = (id: string, data: Partial<ResourceLink>) => {
      setResources(prev => prev.map(r => r.id === id ? { ...r, ...data } : r));
  };

  const deleteResource = (id: string) => {
      setResources(prev => prev.filter(r => r.id !== id));
  };

  const addInternalDeadline = (deadline: Omit<InternalDeadline, 'id'>) => {
      setInternalDeadlines(prev => [...prev, { ...deadline, id: Date.now().toString() }]);
  };

  const toggleDeadlineStatus = (id: string) => {
      setInternalDeadlines(prev => prev.map(d => d.id === id ? { ...d, status: d.status === 'Completed' ? 'Pending' : 'Completed' } : d));
  };

  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
      setSiteSettings(prev => ({ ...prev, ...settings }));
  };

  const submitInterest = async (interest: Omit<CompetitionInterest, 'timestamp'>) => {
      const item: CompetitionInterest = { ...interest, timestamp: new Date().toISOString() };
      setCompetitionInterests(prev => [...prev, item]);
  };

  // NEW: Update Competition Link Action
  const updateCompetitionLink = (compId: string, url: string) => {
      setCompetitionLinks(prev => ({ ...prev, [compId]: url }));
  };

  const addOfficer = (officer: Omit<Officer, 'id'>) => setOfficersList(prev => [...prev, { ...officer, id: Date.now().toString() }]);
  const updateOfficer = (id: string, data: Partial<Officer>) => setOfficersList(prev => prev.map(o => o.id === id ? { ...o, ...data } : o));
  const deleteOfficer = (id: string) => setOfficersList(prev => prev.filter(o => o.id !== id));

  const addEvent = (event: Omit<Event, 'id'>) => setEventsList(prev => [...prev, { ...event, id: Date.now().toString() }]);
  const updateEvent = (id: string, data: Partial<Event>) => setEventsList(prev => prev.map(e => e.id === id ? { ...e, ...data } : e));
  const deleteEvent = (id: string) => setEventsList(prev => prev.filter(e => e.id !== id));

  const addProject = (project: Omit<Project, 'id'>) => setProjectsList(prev => [...prev, { ...project, id: Date.now().toString() }]);
  const updateProject = (id: string, data: Partial<Project>) => setProjectsList(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  const deleteProject = (id: string) => setProjectsList(prev => prev.filter(p => p.id !== id));

  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => setGalleryList(prev => [...prev, { ...item, id: Date.now().toString() }]);
  const deleteGalleryItem = (id: string) => setGalleryList(prev => prev.filter(g => g.id !== id));

  const generateAccessCode = async (role: 'member' | 'officer' = 'member', assignedName?: string): Promise<string> => {
      const code = `MOCK-${Math.floor(Math.random()*1000)}`;
      setAccessCodes(prev => [...prev, { id: code, createdDate: new Date().toISOString(), status: 'unused', role, assignedTo: assignedName }]);
      return code;
  };

  const deleteAccessCode = async (id: string) => setAccessCodes(prev => prev.filter(c => c.id !== id));

  return (
    <DataContext.Provider value={{ 
      announcements, members, resources, officerNotes, internalDeadlines, siteSettings, competitionInterests,
      competitionLinks, updateCompetitionLink,
      officersList, eventsList, projectsList, galleryList, accessCodes,
      addAnnouncement, updateAnnouncement, deleteAnnouncement,
      updateMemberRole, updateMemberStatus, updateMemberRequirement, deleteMember,
      addResource, updateResource, deleteResource,
      addInternalDeadline, toggleDeadlineStatus,
      updateSiteSettings, submitInterest,
      addOfficer, updateOfficer, deleteOfficer,
      addEvent, updateEvent, deleteEvent,
      addProject, updateProject, deleteProject,
      addGalleryItem, deleteGalleryItem,
      generateAccessCode, deleteAccessCode
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
