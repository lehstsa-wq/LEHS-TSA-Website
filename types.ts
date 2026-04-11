
export interface Officer {
  id: string;
  name: string;
  role: string;
  grade: string;
  bio: string;
  imageUrl?: string; // Optional URL
  email?: string;
  linkedin?: string;
  instagram?: string;
  category: 'Executive' | 'Committee' | 'Advisor';
  order: number; // For sorting
}

export interface Event {
  id: string;
  title: string;
  date: string; // ISO string YYYY-MM-DD
  time: string;
  location: string;
  description: string;
  category: 'Meeting' | 'Competition' | 'Workshop' | 'Social' | 'Fundraiser';
  status: 'Upcoming' | 'Past' | 'Cancelled';
  rsvpLink?: string; // Optional external link
}

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  imageUrl?: string;
  award?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  date: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ResourceLink {
  id: string;
  title: string;
  url: string; // Or file path
  type: string; // Changed to string to allow custom types
  category: string; // Changed to string to allow custom categories
  accessLevel: 'member' | 'officer';
  description: string;
  dateAdded: string;
  pinned?: boolean;
  downloadCount?: number;
}

// Auth & Portal Types
export type UserRole = 'guest' | 'member' | 'officer' | 'advisor';

export interface User {
  id: string;
  memberId: string; // The unique ID used for login (e.g., LEHS-25-A1B2)
  name: string;
  email: string; // Contact email
  phone?: string;
  role: UserRole;
  grade?: string;
  avatar?: string;
  status?: 'active' | 'pending' | 'suspended' | 'archived';
  joinDate?: string;
  bio?: string;
  interests?: string[];
  skills?: string[];
  achievements?: string;
  avatarColor?: string;
  
  // Membership Requirements
  duesPaid?: boolean;
  appCompleted?: boolean;
  remindJoined?: boolean;
}

export interface AccessCode {
  id: string; // The actual code string
  createdDate: string;
  status: 'unused' | 'used' | 'archived';
  role: 'member' | 'officer'; // Determines what role the user gets
  assignedTo?: string; // Name of user once registered
  assignedUid?: string; // Firebase UID once registered
}

export interface AnnouncementAttachment {
  name: string;
  url: string;
  type: 'file' | 'link';
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  type: 'Meeting' | 'Competition' | 'Deadline' | 'Fundraiser' | 'General';
  isPinned?: boolean;
  visibility?: 'public' | 'officer';
  imageUrl?: string;
  attachments?: AnnouncementAttachment[];
}

export interface OfficerNote {
  id: string;
  title: string;
  content: string;
  lastUpdated: string;
  category: 'Handoff' | 'Procedure' | 'Meeting';
}

export interface InternalDeadline {
  id: string;
  title: string;
  date: string;
  status: 'Pending' | 'Completed' | 'Overdue';
  assignedTo?: string;
}

export interface SiteSettings {
  id: string;
  primaryColor: string; // Hex
  fontFamily: string;
  remindLink: string;
  jotformLink: string;
  districtAppLink: string;
  successFundLink: string;
  instagramLink?: string;
  twitterLink?: string;
  nextEventTitle?: string;
  nextEventDate?: string; // ISO string
  stats?: {
    members: string;
    wins: string;
    yearsActive: string;
  };
}

export interface Subscriber {
  email: string;
  dateSubscribed: string;
}

export interface CompetitionInterest {
  id?: string;
  userId: string;
  userName: string;
  competitionId: string;
  competitionName: string;
  skills: string[]; // coding, design, building, writing, presenting
  notes: string;
  teamMembers?: string[]; // Optional full team members
  timestamp: string;
}

export interface ProblemReport {
  id: string;
  reporterName: string;
  reporterEmail: string;
  category: 'Website Bug' | 'Account Issue' | 'Competition Issue' | 'General Inquiry' | 'Other';
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Resolved';
  submittedDate: string;
}

export interface CompetitionResult {
  id: string;
  competition: string;
  placement: string; // '1st Place', '2nd Place', 'State Qualifier', 'Nationals Qualifier', etc.
  level: 'Regional' | 'State' | 'National';
  year: string;
  members: string[];
  notes?: string;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description?: string;
  pin: string; // 4–6 digit check-in PIN
  attendees: string[]; // user IDs who checked in
  type: 'General' | 'Officer' | 'Competition' | 'Workshop';
}

export interface Team {
  id: string;
  name: string;
  competitionId: string;
  competitionName: string;
  leaderId: string;
  leaderName: string;
  memberIds: string[];
  memberNames: string[];
  maxSize: number;
  status: 'open' | 'full' | 'closed';
  description?: string;
  createdAt: string;
}

export type OpportunityType = 'Scholarship' | 'Internship' | 'Program' | 'Competition' | 'Workshop' | 'Fellowship';

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  description: string;
  type: OpportunityType;
  deadline?: string;
  link?: string;
  tags?: string[];
  featured?: boolean;
  postedDate: string;
}
