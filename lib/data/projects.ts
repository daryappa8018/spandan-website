// lib/data/projects.ts
// Sample tech project data for Spandan
// DATA REPLACEMENT: Replace all entries with real project information

import { TechProject } from '../types';

// ==================== TECH PROJECTS DATA ====================

export const projects: TechProject[] = [
  {
    id: 'blood-donor-database',
    title: 'Blood Donor Database System',
    status: 'ACTIVE',
    year: '2024',
    problem: 'Blood banks issue urgent requests for specific blood groups, but manually searching through scattered donor lists is time-consuming. Response time matters in emergencies.',
    constraints: [
      'No budget for commercial database software',
      'Must work on basic campus internet infrastructure',
      'Team members have limited database administration experience',
      'Need to maintain donor privacy and data security'
    ],
    approach: 'Built using Google Sheets with Apps Script for automation. Donors categorized by blood group, last donation date, and contact info. Script automatically calculates eligibility based on 3-month donation interval. WhatsApp integration for rapid notification.',
    tech: ['Google Sheets', 'Google Apps Script', 'WhatsApp Business API'],
    result: 'Reduced response time from 4-6 hours to under 30 minutes. Successfully coordinated 3 emergency drives in 2024. Currently tracking 180+ voluntary donors.',
    metrics: {
      donors: '180+',
      responseTime: '<30 min',
      emergencyDrives: 3
    }
  },
  
  {
    id: 'health-camp-analytics',
    title: 'Health Camp Data Analysis Pipeline',
    status: 'ACTIVE',
    year: '2023-2024',
    problem: 'Village health camps generate screening data (BP, diabetes, BMI) but without analysis, we can\'t identify patterns or improve targeting for future camps.',
    constraints: [
      'Data collected on paper forms in field conditions',
      'Team has basic Python knowledge but no statistics background',
      'Results need to be understandable by non-technical stakeholders',
      'Cannot store individual medical data long-term'
    ],
    approach: 'Python scripts with pandas for data cleaning and basic statistical analysis. Results aggregated to village level to protect individual privacy. Generated simple visualizations showing prevalence rates by age group and location.',
    tech: ['Python', 'pandas', 'matplotlib', 'CSV processing'],
    result: 'Identified high diabetes prevalence (32%) in 45+ age group in 3 villages. Used findings to prioritize education materials about diabetes management. Improved camp planning based on demographic patterns.',
    metrics: {
      campsAnalyzed: 12,
      dataPoints: '800+',
      villages: 8
    }
  },
  
  {
    id: 'donation-inventory',
    title: 'Donation Inventory Tracker',
    status: 'ACTIVE',
    year: '2024',
    problem: 'During donation drives, tracking hundreds of items manually leads to errors. Need to know what we have, where it came from, and ensure fair distribution.',
    constraints: [
      'Must work offline during collection (unreliable campus WiFi)',
      'Volunteers need minimal training to use system',
      'Need barcode scanning but no budget for special equipment',
      'Should sync when internet available'
    ],
    approach: 'Progressive web app with offline capability. Uses phone camera for barcode scanning (no special hardware). Items categorized by type, size, condition. LocalStorage for offline operation, syncs to Firebase when online.',
    tech: ['React', 'Firebase', 'Service Workers', 'QuaggaJS (barcode)'],
    result: 'Processed 340 items in December 2024 winter clothing drive with zero inventory errors. Reduced sorting time by 40%. Generated distribution lists automatically grouped by size and type.',
    metrics: {
      itemsTracked: '900+',
      timeSaved: '40%',
      accuracy: '100%'
    }
  },
  
  {
    id: 'event-coordination',
    title: 'Internal Event Coordination Dashboard',
    status: 'ACTIVE',
    year: '2023-2024',
    problem: 'Event details scattered across WhatsApp messages, email threads, and handwritten notes. New volunteers struggle to understand their responsibilities.',
    constraints: [
      'Must be simple enough for non-technical team members',
      'Cannot require installation or complex setup',
      'Need mobile access since students are always moving',
      'Should work with existing Google accounts (no new logins)'
    ],
    approach: 'Web dashboard built with Next.js. Google OAuth for authentication using existing college emails. Shows upcoming events, volunteer assignments, required materials, contact lists. Post-event documentation templates.',
    tech: ['Next.js', 'Google OAuth', 'Tailwind CSS', 'Vercel hosting'],
    result: 'Centralized information for 15+ events across 2024. Reduced onboarding time for new volunteers by 60%. Improved post-event documentation completion rate from 40% to 95%.',
    metrics: {
      activeUsers: 28,
      events: '15+',
      docCompletion: '95%'
    }
  },
  
  {
    id: 'village-mapping',
    title: 'Village Outreach Mapping Tool',
    status: 'IN_DEVELOPMENT',
    year: '2024',
    problem: 'No systematic way to track which villages we\'ve visited, what services were provided, or when follow-up visits are due. Makes planning inefficient.',
    constraints: [
      'Villages lack precise digital addresses',
      'Need to work on mobile devices with intermittent connectivity',
      'Cannot rely on commercial mapping APIs (cost)',
      'Must visualize visit history and service gaps'
    ],
    approach: 'Using OpenStreetMap for base mapping (free). Custom overlay showing visited villages color-coded by recency and service type. Offline map tiles cached for field use. Simple forms for logging visit details.',
    tech: ['React', 'Leaflet.js', 'OpenStreetMap', 'IndexedDB'],
    result: 'Currently in testing phase. Prototype tracks 12 villages with visit history. Plan to deploy before next village camp season (March 2025).',
    metrics: {
      status: 'BETA',
      villagesMapped: 12,
      plannedRelease: 'Mar 2025'
    }
  },

  {
    id: 'sms-notification',
    title: 'SMS Notification System for Village Camps',
    status: 'ACTIVE',
    year: '2023',
    problem: 'Village residents often miss camp announcements due to limited smartphone usage and internet access. Traditional methods like posters have limited reach.',
    constraints: [
      'Many villagers have basic phones without internet',
      'SMS service costs need to be minimal',
      'Must handle multiple languages (Hindi, Haryanvi)',
      'Need delivery confirmation for planning purposes'
    ],
    approach: 'Integration with bulk SMS provider using their API. Template messages created in local languages. Automated sending scheduled 3 days and 1 day before camps. Delivery reports tracked for follow-up.',
    tech: ['Node.js', 'SMS Gateway API', 'Cron jobs'],
    result: 'Increased camp attendance by 35% compared to poster-only announcements. Delivery rate of 92%. Successfully notified 400+ residents across multiple villages in 2023-2024.',
    metrics: {
      messagesDelivered: '2,800+',
      attendanceIncrease: '35%',
      deliveryRate: '92%'
    }
  }
];

// ==================== HELPER FUNCTIONS ====================

/**
 * Get all projects, optionally filtered by status
 */
export function getProjects(status?: string): TechProject[] {
  if (!status || status === 'all') {
    return projects;
  }
  return projects.filter(project => project.status === status);
}

/**
 * Get a single project by ID
 */
export function getProjectById(id: string): TechProject | undefined {
  return projects.find(project => project.id === id);
}

/**
 * Get active projects
 */
export function getActiveProjects(): TechProject[] {
  return projects.filter(project => project.status === 'ACTIVE');
}

/**
 * Get projects by technology
 */
export function getProjectsByTech(tech: string): TechProject[] {
  return projects.filter(project => 
    project.tech.some(t => t.toLowerCase().includes(tech.toLowerCase()))
  );
}

/**
 * Get all unique technologies used across projects
 */
export function getAllTechnologies(): string[] {
  const techs = projects.flatMap(project => project.tech);
  return Array.from(new Set(techs)).sort();
}

/**
 * Get project count by status
 */
export function getProjectCountByStatus(): Record<string, number> {
  const counts: Record<string, number> = {};
  projects.forEach(project => {
    counts[project.status] = (counts[project.status] || 0) + 1;
  });
  return counts;
}
