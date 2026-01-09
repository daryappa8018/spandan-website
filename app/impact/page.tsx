// app/impact/page.tsx
// Impact report page - fetches data from database

import { prisma } from '@/lib/prisma';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impact Report | Spandan',
  description: 'Numerical record of our community work and social impact since 2023.',
};

export default async function ImpactPage() {
  // Fetch impact data
  const [summary, yearlyData, partners] = await Promise.all([
    prisma.impactSummary.findFirst(),
    prisma.impactYear.findMany({ orderBy: { year: 'desc' } }),
    prisma.partner.findMany({ orderBy: { order: 'asc' } }),
  ]);

  return (
    <div className="min-h-screen bg-white">
      <Header currentPath="/impact" />

      {/* Page Header */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <h1 className="text-3xl font-semibold text-slate-900 mb-3">Impact Report</h1>
        <p className="text-base text-slate-600 max-w-2xl">
          A numerical record of our community work since 2023. All figures are documented and verifiable.
        </p>
      </section>

      {/* Overall Summary - Simple grid */}
      {summary && (
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <div className="max-w-4xl">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Overall Summary</h2>
            
            <div className="grid grid-cols-4 gap-6">
              <div className="border border-slate-200 p-6">
                <p className="text-3xl font-semibold text-slate-900 mb-1">
                  {summary.yearsActive}
                </p>
                <p className="text-sm text-slate-600">Years Active</p>
              </div>
              <div className="border border-slate-200 p-6">
                <p className="text-3xl font-semibold text-slate-900 mb-1">
                  {summary.totalEvents}
                </p>
                <p className="text-sm text-slate-600">Total Events</p>
              </div>
              <div className="border border-slate-200 p-6">
                <p className="text-3xl font-semibold text-slate-900 mb-1">
                  {summary.peopleReached}
                </p>
                <p className="text-sm text-slate-600">People Reached</p>
              </div>
              <div className="border border-slate-200 p-6">
                <p className="text-3xl font-semibold text-slate-900 mb-1">
                  {summary.volunteers}
                </p>
                <p className="text-sm text-slate-600">Active Volunteers</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Year-wise Breakdown */}
      {yearlyData.map((yearData, index) => (
        <section
          key={yearData.year}
          className={`${index > 0 ? 'border-t' : ''} border-slate-200 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'} py-16`}
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl">
              <h2 className="text-2xl font-semibold text-slate-900 mb-8">{yearData.year}</h2>
              
              <div className="space-y-10">
                {/* Blood Donation */}
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-4">Blood Donation Camps</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <p className="text-2xl font-semibold text-[#3d3e65] mb-1">{yearData.bdCamps}</p>
                      <p className="text-xs text-slate-600">Camps Organized</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-[#3d3e65] mb-1">{yearData.bdDonors}</p>
                      <p className="text-xs text-slate-600">Voluntary Donors</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-[#3d3e65] mb-1">{yearData.bdUnits}</p>
                      <p className="text-xs text-slate-600">Units Collected</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-[#3d3e65] mb-1">{yearData.bdHospitals}</p>
                      <p className="text-xs text-slate-600">Partner Hospitals</p>
                    </div>
                  </div>
                </div>

                {/* Village Camps */}
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-4">Village Camps</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <p className="text-2xl font-semibold text-[#3d3e65] mb-1">{yearData.vcCamps}</p>
                      <p className="text-xs text-slate-600">Camps Conducted</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-[#3d3e65] mb-1">{yearData.vcVillages}</p>
                      <p className="text-xs text-slate-600">Villages Reached</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-[#3d3e65] mb-1">{yearData.vcParticipants}</p>
                      <p className="text-xs text-slate-600">Participants</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-[#3d3e65] mb-1">{yearData.vcReferrals}</p>
                      <p className="text-xs text-slate-600">Medical Referrals</p>
                    </div>
                  </div>
                </div>

                {/* Health Checkups */}
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-4">Health Checkup Camps</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-2xl font-semibold text-[#3d3e65] mb-1">{yearData.hcCamps}</p>
                      <p className="text-xs text-slate-600">Camps Held</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-[#3d3e65] mb-1">{yearData.hcScreenings}</p>
                      <p className="text-xs text-slate-600">Screenings Done</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-[#3d3e65] mb-1">{yearData.hcReferrals}</p>
                      <p className="text-xs text-slate-600">Referrals Made</p>
                    </div>
                  </div>
                </div>

                {/* Donation Drives */}
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-4">Donation Drives</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-2xl font-semibold text-[#3d3e65] mb-1">{yearData.ddDrives}</p>
                      <p className="text-xs text-slate-600">Drives Organized</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-[#3d3e65] mb-1">{yearData.ddItems}</p>
                      <p className="text-xs text-slate-600">Items Collected</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-[#3d3e65] mb-1">{yearData.ddFamilies}</p>
                      <p className="text-xs text-slate-600">Families Benefited</p>
                    </div>
                  </div>
                </div>

                {/* Short Events */}
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-4">Short Events</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-2xl font-semibold text-[#3d3e65] mb-1">{yearData.seEvents}</p>
                      <p className="text-xs text-slate-600">Events Held</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-[#3d3e65] mb-1">{yearData.seParticipants}</p>
                      <p className="text-xs text-slate-600">Participants</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Partner Organizations */}
      {partners.length > 0 && (
        <section className="border-t border-slate-200 bg-white py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-4xl">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Partner Organizations</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Our work is made possible through collaboration with verified institutions and government bodies.
              </p>
              <ul className="space-y-2">
                {partners.map((partner) => (
                  <li key={partner.id} className="text-sm text-slate-700 pl-4 relative before:content-['—'] before:absolute before:left-0">
                    {partner.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Methodology Note */}
      <section className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-4xl">
            <h3 className="text-base font-semibold text-slate-900 mb-3">About These Numbers</h3>
            <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <p>
                All figures are based on documented event records, registration logs, and partner institution confirmations. We do not estimate or project numbers.
              </p>
              <p>
                "People reached" counts direct participants in events—individuals who attended camps, received screenings, or benefited from donation distributions. It does not include indirect beneficiaries.
              </p>
              <p>
                Medical referrals indicate cases where our basic screenings identified health concerns requiring professional medical attention. We provided facility information and encouraged follow-up but cannot track actual treatment outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Link to Events */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="max-w-4xl">
          <p className="text-sm text-slate-600">
            For detailed information about specific events, visit our <a href="/events" className="text-[#3d3e65] underline hover:text-slate-900">events page</a>.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}