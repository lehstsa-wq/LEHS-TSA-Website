
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
}

// Auth & Portal Types
export type UserRole = 'guest' | 'member' | 'officer' | 'advisor';

export interface User {
  id: string;
  memberId: string; // The unique ID used for login (e.g., LEHS-25-A1B2)
  name: string;
  email: string; // Contact email
  role: UserRole;
  grade?: string;
  avatar?: string;
  status?: 'active' | 'pending' | 'suspended' | 'archived';
  joinDate?: string;
  interests?: string[];
  
  // Membership Requirements
  duesPaid?: boolean;
  appCompleted?: boolean;
  remindJoined?: boolean;
}

export interface AccessCode {
  id: string; // The actual code string
  createdDate: string;
  status: 'unused' | 'used';
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
}

export interface CompetitionInterest {
  userId: string;
  userName: string;
  competitionId: string;
  competitionName: string;
  skills: string[]; // coding, design, building, writing, presenting
  notes: string;
  timestamp: string;
}
