// lib/data/impact.ts
// Impact metrics data for Spandan
// DATA REPLACEMENT: Replace all entries with real impact numbers

import { ImpactData, YearlyImpact } from '../types';

// ==================== IMPACT DATA ====================

export const impactData: ImpactData = {
  summary: {
    yearsActive: 2,
    totalEvents: 28,
    peopleReached: '2,400+',
    volunteers: 45
  },

  byYear: [
    {
      year: 2024,
      bloodDonation: {
        camps: 4,
        donors: 312,
        unitsCollected: 312,
        hospitals: 2
      },
      villageCamps: {
        camps: 6,
        villages: 12,
        participants: 890,
        referrals: 34
      },
      healthCheckups: {
        camps: 5,
        screenings: 654,
        referrals: 28
      },
      donationDrives: {
        drives: 3,
        itemsCollected: 1240,
        familiesBenefited: 420
      },
      shortEvents: {
        events: 4,
        participants: 280
      }
    },
    {
      year: 2023,
      bloodDonation: {
        camps: 2,
        donors: 156,
        unitsCollected: 156,
        hospitals: 1
      },
      villageCamps: {
        camps: 3,
        villages: 6,
        participants: 420,
        referrals: 18
      },
      healthCheckups: {
        camps: 2,
        screenings: 298,
        referrals: 12
      },
      donationDrives: {
        drives: 2,
        itemsCollected: 680,
        familiesBenefited: 240
      },
      shortEvents: {
        events: 2,
        participants: 150
      }
    }
  ],

  partners: [
    'District Red Cross Society, Karnal',
    'Civil Hospital Blood Bank',
    'Government Primary Schools (8 schools)',
    'Village Panchayats (18 villages)',
    'District Health Department'
  ]
};

// ==================== HELPER FUNCTIONS ====================

/**
 * Get impact data for a specific year
 */
export function getImpactByYear(year: number): YearlyImpact | undefined {
  return impactData.byYear.find(data => data.year === year);
}

/**
 * Get all years with impact data
 */
export function getImpactYears(): number[] {
  return impactData.byYear.map(data => data.year).sort((a, b) => b - a);
}

/**
 * Calculate total across all years for a specific metric
 */
export function getTotalMetric(
  category: keyof Omit<YearlyImpact, 'year'>,
  metric: string
): number {
  return impactData.byYear.reduce((total, yearData) => {
    const categoryData = yearData[category] as Record<string, number>;
    return total + (categoryData[metric] || 0);
  }, 0);
}

/**
 * Get cumulative statistics across all years
 */
export function getCumulativeStats() {
  return {
    totalBloodDonors: getTotalMetric('bloodDonation', 'donors'),
    totalBloodUnits: getTotalMetric('bloodDonation', 'unitsCollected'),
    totalVillagesReached: getTotalMetric('villageCamps', 'villages'),
    totalHealthScreenings: getTotalMetric('healthCheckups', 'screenings'),
    totalItemsDonated: getTotalMetric('donationDrives', 'itemsCollected'),
    totalFamiliesBenefited: getTotalMetric('donationDrives', 'familiesBenefited')
  };
}

/**
 * Get latest year's data
 */
export function getLatestYearImpact(): YearlyImpact {
  return impactData.byYear[0]; // Assuming sorted in descending order
}

/**
 * Compare year-over-year growth
 */
export function getYearOverYearGrowth(
  category: keyof Omit<YearlyImpact, 'year'>,
  metric: string
): number | null {
  if (impactData.byYear.length < 2) return null;
  
  const currentYear = impactData.byYear[0][category] as Record<string, number>;
  const previousYear = impactData.byYear[1][category] as Record<string, number>;
  
  const current = currentYear[metric] || 0;
  const previous = previousYear[metric] || 0;
  
  if (previous === 0) return null;
  
  return Math.round(((current - previous) / previous) * 100);
}