// lib/types.ts
// TypeScript interfaces for Spandan website
// Defines data structures for events, projects, team, and impact

// ==================== EVENT TYPES ====================

export type EventCategory = 
  | 'blood-donation'
  | 'village-camp'
  | 'health-checkup'
  | 'donation-drive'
  | 'short-event';

export interface Event {
  id: string;
  title: string;
  category: EventCategory;
  date: string; // e.g., "November 2024"
  month: string; // e.g., "Nov"
  year: number;
  summary: string;
  metrics: string[]; // e.g., ["82 donors", "82 units"]
}

export interface EventDetail extends Event {
  location: string;
  duration: string; // e.g., "9:00 AM - 4:00 PM"
  objective: {
    context: string;
    goal: string;
    target: string;
  };
  execution: {
    preparation: string[];
    process: string[];
    team: string;
    volunteers: string;
  };
  outcome: {
    metrics: Record<string, string | number>; // flexible key-value pairs
    impact: string;
    challenges: string;
    learnings: string;
  };
  partners: string[];
  documentation: {
    photosNote: string;
    dataNote: string;
  };
}

// ==================== TECH PROJECT TYPES ====================

export type ProjectStatus = 'Active' | 'In Development' | 'Completed' | 'Archived';

export interface TechProject {
  id: string;
  title: string;
  status: ProjectStatus;
  year: string;
  problem: string;
  constraints: string[];
  approach: string;
  tech: string[]; // Technologies used
  result: string;
  metrics: Record<string, string | number>;
}

// ==================== TEAM TYPES ====================

export interface TeamMember {
  name: string;
  role: string;
  year: string; // e.g., "B.Tech 3rd Year"
  department: string;
}

export interface FacultyAdvisor {
  name: string;
  role: string;
  department: string;
}

export interface Team {
  leadership: TeamMember[];
  coordination: TeamMember[];
  coreMembers: TeamMember[];
  advisors: FacultyAdvisor[];
}

// ==================== IMPACT TYPES ====================

export interface YearlyImpact {
  year: number;
  bloodDonation: {
    camps: number;
    donors: number;
    unitsCollected: number;
    hospitals: number;
  };
  villageCamps: {
    camps: number;
    villages: number;
    participants: number;
    referrals: number;
  };
  healthCheckups: {
    camps: number;
    screenings: number;
    referrals: number;
  };
  donationDrives: {
    drives: number;
    itemsCollected: number;
    familiesBenefited: number;
  };
  shortEvents: {
    events: number;
    participants: number;
  };
}

export interface ImpactData {
  summary: {
    yearsActive: number;
    totalEvents: number;
    peopleReached: string; // e.g., "2,400+"
    volunteers: number;
  };
  byYear: YearlyImpact[];
  partners: string[];
}

// ==================== CONTACT TYPES ====================

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactSubject = 
  | 'general'
  | 'donation'
  | 'volunteer'
  | 'partnership'
  | 'media'
  | 'other';

// ==================== NAVIGATION TYPES ====================

export interface NavItem {
  label: string;
  href: string;
}

export const mainNavigation: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Events', href: '/events' },
  { label: 'Donation Drives', href: '/donation-drives' },
  { label: 'Tech Projects', href: '/tech-projects' },
  { label: 'Impact', href: '/impact' },
  { label: 'Team', href: '/team' },
  { label: 'Contact', href: '/contact' },
];

// ==================== UTILITY TYPES ====================

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  email: string;
  phone: string;
  location: {
    address: string;
    city: string;
    state: string;
  };
  social: {
    instagram?: string;
    linkedin?: string;
  };
  foundedYear: number;
}