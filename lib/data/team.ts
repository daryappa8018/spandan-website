// lib/data/team.ts
// Sample team member data for Spandan
// DATA REPLACEMENT: Replace all entries with real team member information

import { Team, TeamMember, FacultyAdvisor } from '../types';

// ==================== TEAM DATA ====================

export const team: Team = {
  leadership: [
    {
      name: 'Rahul Sharma',
      role: 'President',
      year: 'B.Tech 4th Year',
      department: 'Computer Science'
    },
    {
      name: 'Priya Verma',
      role: 'Vice President',
      year: 'B.Tech 3rd Year',
      department: 'Information Technology'
    },
    {
      name: 'Amit Kumar',
      role: 'Secretary',
      year: 'B.Tech 3rd Year',
      department: 'Electronics & Communication'
    }
  ],

  coordination: [
    {
      name: 'Neha Singh',
      role: 'Event Coordinator',
      year: 'B.Tech 3rd Year',
      department: 'Computer Science'
    },
    {
      name: 'Vikram Patel',
      role: 'Technical Lead',
      year: 'B.Tech 4th Year',
      department: 'Computer Science'
    },
    {
      name: 'Anjali Gupta',
      role: 'Communications Lead',
      year: 'B.Tech 2nd Year',
      department: 'Information Technology'
    },
    {
      name: 'Rohan Desai',
      role: 'Logistics Coordinator',
      year: 'B.Tech 3rd Year',
      department: 'Mechanical Engineering'
    }
  ],

  coreMembers: [
    {
      name: 'Kavya Reddy',
      role: 'Core Member',
      year: 'B.Tech 3rd Year',
      department: 'Computer Science'
    },
    {
      name: 'Arjun Malhotra',
      role: 'Core Member',
      year: 'B.Tech 2nd Year',
      department: 'Information Technology'
    },
    {
      name: 'Sneha Joshi',
      role: 'Core Member',
      year: 'B.Tech 3rd Year',
      department: 'Electronics & Communication'
    },
    {
      name: 'Karan Mehta',
      role: 'Core Member',
      year: 'B.Tech 2nd Year',
      department: 'Computer Science'
    },
    {
      name: 'Ishita Khanna',
      role: 'Core Member',
      year: 'B.Tech 2nd Year',
      department: 'Information Technology'
    },
    {
      name: 'Siddharth Nair',
      role: 'Core Member',
      year: 'B.Tech 3rd Year',
      department: 'Civil Engineering'
    },
    {
      name: 'Pooja Sharma',
      role: 'Core Member',
      year: 'B.Tech 3rd Year',
      department: 'Computer Science'
    },
    {
      name: 'Aditya Rao',
      role: 'Core Member',
      year: 'B.Tech 2nd Year',
      department: 'Information Technology'
    },
    {
      name: 'Meera Iyer',
      role: 'Core Member',
      year: 'B.Tech 3rd Year',
      department: 'Electronics & Communication'
    }
  ],

  advisors: [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Faculty Advisor',
      department: 'Computer Science & Engineering'
    },
    {
      name: 'Dr. Sunita Agarwal',
      role: 'Faculty Advisor',
      department: 'Electronics & Communication Engineering'
    }
  ]
};

// ==================== HELPER FUNCTIONS ====================

/**
 * Get all team members (excluding advisors)
 */
export function getAllTeamMembers(): TeamMember[] {
  return [
    ...team.leadership,
    ...team.coordination,
    ...team.coreMembers
  ];
}

/**
 * Get team member by name
 */
export function getTeamMemberByName(name: string): TeamMember | FacultyAdvisor | undefined {
  const allMembers = getAllTeamMembers();
  const member = allMembers.find(m => m.name === name);
  if (member) return member;
  
  return team.advisors.find(a => a.name === name);
}

/**
 * Get team members by department
 */
export function getTeamMembersByDepartment(department: string): TeamMember[] {
  return getAllTeamMembers().filter(member => 
    member.department.toLowerCase().includes(department.toLowerCase())
  );
}

/**
 * Get team members by year
 */
export function getTeamMembersByYear(year: string): TeamMember[] {
  return getAllTeamMembers().filter(member => member.year === year);
}

/**
 * Get team member count by role category
 */
export function getTeamCountByCategory(): Record<string, number> {
  return {
    leadership: team.leadership.length,
    coordination: team.coordination.length,
    coreMembers: team.coreMembers.length,
    advisors: team.advisors.length,
    total: getAllTeamMembers().length + team.advisors.length
  };
}

/**
 * Get all unique departments
 */
export function getAllDepartments(): string[] {
  const departments = getAllTeamMembers().map(member => member.department);
  return Array.from(new Set(departments)).sort();
}

/**
 * Get leadership team only
 */
export function getLeadership(): TeamMember[] {
  return team.leadership;
}

/**
 * Get coordination team only
 */
export function getCoordination(): TeamMember[] {
  return team.coordination;
}

/**
 * Get core members only
 */
export function getCoreMembers(): TeamMember[] {
  return team.coreMembers;
}

/**
 * Get faculty advisors
 */
export function getAdvisors(): FacultyAdvisor[] {
  return team.advisors;
}