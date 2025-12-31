// lib/data/events.ts
// Sample event data for Spandan
// DATA REPLACEMENT: Replace all entries with real event information

import { Event, EventDetail } from '../types';

// ==================== EVENT LIST DATA ====================
// Used on /events page for listing all events

export const events: Event[] = [
  {
    id: 'winter-clothing-2024',
    title: 'Winter Clothing Drive',
    category: 'donation-drive',
    date: 'December 2024',
    month: 'Dec',
    year: 2024,
    summary: 'Collected and distributed 340 warm clothing items to residents of Gharaunda and nearby villages ahead of winter season.',
    metrics: ['340 items', '5 villages', '180 families']
  },
  {
    id: 'blood-camp-nov-2024',
    title: 'Blood Donation Camp - Campus',
    category: 'blood-donation',
    date: 'November 2024',
    month: 'Nov',
    year: 2024,
    summary: '82 students and faculty members donated blood in collaboration with District Red Cross Society.',
    metrics: ['82 donors', '82 units', 'Civil Hospital']
  },
  {
    id: 'village-camp-baraut-2024',
    title: 'Village Health Camp - Baraut',
    category: 'village-camp',
    date: 'October 2024',
    month: 'Oct',
    year: 2024,
    summary: 'Conducted basic health screenings for 156 residents. Identified 12 cases requiring follow-up medical attention.',
    metrics: ['156 screened', '12 referrals', '1 day']
  },
  {
    id: 'raksha-bandhan-2024',
    title: 'Raksha Bandhan - Village Visit',
    category: 'short-event',
    date: 'August 2024',
    month: 'Aug',
    year: 2024,
    summary: 'Distributed rakhis and sweets to children in three villages, organized cultural activities.',
    metrics: ['3 villages', '85 children', 'Cultural program']
  },
  {
    id: 'blood-camp-aug-2024',
    title: 'Blood Donation Camp - Emergency Drive',
    category: 'blood-donation',
    date: 'August 2024',
    month: 'Aug',
    year: 2024,
    summary: 'Emergency blood collection drive organized in response to district hospital shortage alert.',
    metrics: ['67 donors', '67 units', 'Emergency response']
  },
  {
    id: 'health-camp-jhajjar-2024',
    title: 'Health Checkup Camp - Jhajjar District',
    category: 'health-checkup',
    date: 'July 2024',
    month: 'Jul',
    year: 2024,
    summary: 'Two-day health screening camp covering diabetes, BP, and BMI assessments in rural areas.',
    metrics: ['203 screened', '18 referrals', '2 days']
  },
  {
    id: 'book-donation-2024',
    title: 'Educational Material Drive',
    category: 'donation-drive',
    date: 'June 2024',
    month: 'Jun',
    year: 2024,
    summary: 'Collected textbooks, notebooks, and stationery for distribution to government school students.',
    metrics: ['450 books', '4 schools', '280 students']
  },
  {
    id: 'village-camp-panipat-2024',
    title: 'Village Camp - Panipat Rural',
    category: 'village-camp',
    date: 'May 2024',
    month: 'May',
    year: 2024,
    summary: 'Three-day comprehensive camp including health education, government scheme awareness, and basic screenings.',
    metrics: ['4 villages', '240 participants', '3 days']
  }
];

// ==================== EVENT DETAIL DATA ====================
// Used on /events/[slug] pages for individual event details
// These provide full documentation for each event

export const eventDetails: Record<string, EventDetail> = {
  'blood-camp-nov-2024': {
    id: 'blood-camp-nov-2024',
    title: 'Blood Donation Camp - Campus',
    category: 'blood-donation',
    date: 'November 15, 2024',
    month: 'Nov',
    year: 2024,
    location: 'College Campus, Main Auditorium',
    duration: '9:00 AM - 4:00 PM',
    summary: '82 students and faculty members donated blood in collaboration with District Red Cross Society.',
    metrics: ['82 donors', '82 units', 'Civil Hospital'],
    
    objective: {
      context: 'The District Red Cross Society issued a notice about declining blood reserves at Civil Hospital, particularly O+ and B+ blood groups needed for ongoing treatments and emergency cases.',
      goal: 'Organize a voluntary blood donation drive on campus to collect at least 60 units within a single day, ensuring proper medical protocols and donor safety.',
      target: '60-80 voluntary donors from student and faculty population'
    },
    
    execution: {
      preparation: [
        'Coordinated with District Red Cross Society 3 weeks in advance',
        'Obtained necessary permissions from college administration',
        'Set up registration desk and medical screening area in main auditorium',
        'Arranged for light refreshments and post-donation rest area',
        'Created volunteer roster for donor assistance and documentation'
      ],
      process: [
        'Registration and basic eligibility screening (age, weight, health status)',
        'Medical examination by Red Cross medical team',
        'Blood collection in sterile environment with trained phlebotomists',
        'Post-donation monitoring period with refreshments',
        'Certificate distribution and donor card updates'
      ],
      team: '12 Spandan members + 8 Red Cross medical staff',
      volunteers: '12 student volunteers'
    },
    
    outcome: {
      metrics: {
        registrations: 94,
        eligibleDonors: 82,
        unitsCollected: 82,
        bloodGroups: 'O+ (28), A+ (24), B+ (18), AB+ (8), O- (2), A- (1), B- (1)',
        timeCompleted: '7 hours'
      },
      impact: 'All 82 units were transported to Civil Hospital blood bank on the same day. According to Red Cross coordination, these units addressed immediate shortages and supported 23 planned surgeries and multiple emergency cases over the following two weeks.',
      challenges: '12 registrants were ineligible due to low hemoglobin levels or recent illness. One donor experienced mild dizziness but recovered after extended rest period.',
      learnings: 'Pre-screening reminders about eligibility criteria (sent 2 days before event) could reduce ineligible registrations. Earlier start time (8 AM instead of 9 AM) would allow more donors to participate before afternoon classes.'
    },
    
    partners: [
      'District Red Cross Society, Karnal',
      'Civil Hospital Blood Bank',
      'College Administration'
    ],
    
    documentation: {
      photosNote: 'Event photographs available with donor consent',
      dataNote: 'Donor database maintained confidentially per medical privacy standards'
    }
  },

  'village-camp-baraut-2024': {
    id: 'village-camp-baraut-2024',
    title: 'Village Health Camp - Baraut',
    category: 'village-camp',
    date: 'October 12-13, 2024',
    month: 'Oct',
    year: 2024,
    location: 'Baraut Village, Community Center',
    duration: '2 days (8:00 AM - 5:00 PM)',
    summary: 'Conducted basic health screenings for 156 residents. Identified 12 cases requiring follow-up medical attention.',
    metrics: ['156 screened', '12 referrals', '1 day'],
    
    objective: {
      context: 'Baraut village has limited access to primary healthcare facilities, with residents traveling 15+ km for basic medical consultations. Village head requested health screening camp for early detection of common conditions.',
      goal: 'Provide basic health screenings including blood pressure, diabetes testing, and BMI assessment. Identify residents requiring medical attention and facilitate referrals to government health centers.',
      target: '150+ village residents, focusing on elderly population and those without recent medical checkups'
    },
    
    execution: {
      preparation: [
        'Coordinated with village panchayat 4 weeks in advance',
        'Arranged medical equipment and testing supplies',
        'Recruited medical student volunteers for basic screening assistance',
        'Created registration forms and health record templates',
        'Set up transportation logistics for equipment'
      ],
      process: [
        'Door-to-door awareness campaign day before event',
        'Registration and basic demographic data collection',
        'Blood pressure measurement and recording',
        'Blood glucose testing (random and fasting)',
        'BMI calculation and weight assessment',
        'One-on-one consultation with supervising physician for concerning cases',
        'Health education session on diabetes and hypertension management'
      ],
      team: '15 Spandan members + 2 doctors + 3 nurses',
      volunteers: '15 students'
    },
    
    outcome: {
      metrics: {
        totalScreened: 156,
        highBP: 23,
        elevatedGlucose: 18,
        referralsMade: 12,
        daysCompleted: 2
      },
      impact: 'Identified 12 residents with concerning health indicators requiring immediate medical attention. All were provided referral letters to government health center with detailed screening results. Village panchayat reported that 9 of 12 followed up within one month.',
      challenges: 'Language barrier with elderly residents required additional volunteer translators. Some residents hesitant about blood testing due to misinformation. Limited medical equipment meant longer wait times than planned.',
      learnings: 'Future camps should include more local language speakers on team. Pre-camp education session via village announcements could address testing concerns. Need to secure additional glucometers for faster processing.'
    },
    
    partners: [
      'Baraut Village Panchayat',
      'District Health Department',
      'Primary Health Center, Baghpat'
    ],
    
    documentation: {
      photosNote: 'Photographs taken with consent, faces not identifiable',
      dataNote: 'Health data maintained confidentially, aggregate reports shared with village administration'
    }
  },

  'winter-clothing-2024': {
    id: 'winter-clothing-2024',
    title: 'Winter Clothing Drive',
    category: 'donation-drive',
    date: 'December 5-12, 2024',
    month: 'Dec',
    year: 2024,
    location: 'Campus Collection Points + Distribution in 5 villages',
    duration: '7-day collection, 2-day distribution',
    summary: 'Collected and distributed 340 warm clothing items to residents of Gharaunda and nearby villages ahead of winter season.',
    metrics: ['340 items', '5 villages', '180 families'],
    
    objective: {
      context: 'Winter temperatures in the region drop to 5-8°C, but many rural families lack adequate warm clothing, particularly for children and elderly members. Previous winters saw increased cold-related illnesses.',
      goal: 'Collect and distribute warm clothing including sweaters, jackets, shawls, and blankets to families in need before peak winter season.',
      target: '300+ wearable winter items distributed to families in 5 villages'
    },
    
    execution: {
      preparation: [
        'Set up 3 collection points on campus (hostel common rooms, academic building)',
        'Created posters and announcements about acceptable items',
        'Coordinated with village administrative bodies to identify recipient families',
        'Organized sorting team and storage space',
        'Arranged transportation for distribution'
      ],
      process: [
        '7-day collection period with daily item logging',
        'Quality check and sorting by type, size, and condition',
        'Washing and cleaning of items where needed',
        'Categorization and packaging by family size requirements',
        'Distribution coordinated with village heads to reach identified families',
        'Documentation of items distributed per family'
      ],
      team: '18 Spandan members',
      volunteers: '25 students participated in collection/sorting'
    },
    
    outcome: {
      metrics: {
        itemsCollected: 340,
        villages: 5,
        familiesBenefited: 180,
        volunteers: 25,
        collectionDays: 7
      },
      impact: 'Distributed warm clothing to 180 families across 5 villages (Gharaunda, Karnal Rural, Assandh, Indri, Nilokheri). Village administrative bodies confirmed items reached intended recipients. Several families received multiple items based on family size.',
      challenges: 'Some donated items were not in wearable condition and had to be rejected. Size mismatches required creative redistribution. Transportation to distant villages required multiple trips.',
      learnings: 'Clearer donation guidelines needed (with photos of acceptable vs unacceptable items). Should coordinate size requirements with villages before collection starts. Consider partnering with local transport services for distant locations.'
    },
    
    partners: [
      'Village Panchayats (5 villages)',
      'College Transport Department',
      'District Administration'
    ],
    
    documentation: {
      photosNote: 'Distribution photos taken with explicit consent, no identifying details shared publicly',
      dataNote: 'Detailed inventory maintained, recipient lists kept confidential'
    }
  }
};

// ==================== HELPER FUNCTIONS ====================

/**
 * Get all events, optionally filtered by category
 */
export function getEvents(category?: string): Event[] {
  if (!category || category === 'all') {
    return events;
  }
  return events.filter(event => event.category === category);
}

/**
 * Get a single event by ID
 */
export function getEventById(id: string): Event | undefined {
  return events.find(event => event.id === id);
}

/**
 * Get detailed information for an event
 */
export function getEventDetail(id: string): EventDetail | undefined {
  return eventDetails[id];
}

/**
 * Get events by year
 */
export function getEventsByYear(year: number): Event[] {
  return events.filter(event => event.year === year);
}

/**
 * Get unique years with events
 */
export function getEventYears(): number[] {
  const years = events.map(event => event.year);
  return Array.from(new Set(years)).sort((a, b) => b - a);
}