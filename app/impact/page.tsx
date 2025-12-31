import React from 'react';

// IMPACT PAGE - Spandan
// Report-style with simple numeric facts
// No animations, no counters flying in
// Year-wise grouping, clean presentation

const SpandanImpact = () => {
  // DATA REPLACEMENT: Replace with real impact data
  const impactData = {
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

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <header className="border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <a href="/" className="block">
                <h1 className="text-xl font-semibold text-[#3d3e65]">Spandan</h1>
                <p className="text-xs text-slate-500 mt-0.5">Socio-Technical Club</p>
              </a>
            </div>
            <nav className="flex gap-8 text-sm">
              <a href="/about" className="text-slate-700 hover:text-[#3d3e65] transition-colors">About</a>
              <a href="/events" className="text-slate-700 hover:text-[#3d3e65] transition-colors">Events</a>
              <a href="/donation-drives" className="text-slate-700 hover:text-[#3d3e65] transition-colors">Donation Drives</a>
              <a href="/tech-projects" className="text-slate-700 hover:text-[#3d3e65] transition-colors">Tech Projects</a>
              <a href="/impact" className="text-[#3d3e65] font-medium">Impact</a>
              <a href="/team" className="text-slate-700 hover:text-[#3d3e65] transition-colors">Team</a>
              <a href="/contact" className="text-slate-700 hover:text-[#3d3e65] transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <h1 className="text-3xl font-semibold text-slate-900 mb-3">Impact Report</h1>
        <p className="text-base text-slate-600 max-w-2xl">
          A numerical record of our community work since 2023. All figures are documented and verifiable.
        </p>
      </section>

      {/* Overall Summary - Simple grid */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="max-w-4xl">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Overall Summary</h2>
          
          <div className="grid grid-cols-4 gap-6">
            <div className="border border-slate-200 p-6">
              <p className="text-3xl font-semibold text-slate-900 mb-1">
                {impactData.summary.yearsActive}
              </p>
              <p className="text-sm text-slate-600">Years Active</p>
            </div>
            <div className="border border-slate-200 p-6">
              <p className="text-3xl font-semibold text-slate-900 mb-1">
                {impactData.summary.totalEvents}
              </p>
              <p className="text-sm text-slate-600">Total Events</p>
            </div>
            <div className="border border-slate-200 p-6">
              <p className="text-3xl font-semibold text-slate-900 mb-1">
                {impactData.summary.peopleReached}
              </p>
              <p className="text-sm text-slate-600">People Reached</p>
            </div>
            <div className="border border-slate-200 p-6">
              <p className="text-3xl font-semibold text-slate-900 mb-1">
                {impactData.summary.volunteers}
              </p>
              <p className="text-sm text-slate-600">Active Volunteers</p>
            </div>
          </div>
        </div>

        {/* DATA REPLACEMENT: Update summary metrics above */}
      </section>

      {/* Year-wise Breakdown */}
      {impactData.byYear.map((yearData, index) => (
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
                      <p className="text-2xl font-semibold text-[#3d3e65] mb-1">
                        {yearData.bloodDonation.camps}
                      </p>
                      <p className="text-xs text-slate-600">Camps Organized</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-[#3d3e65] mb-1">
                        {yearData.bloodDonation.donors}
                      </p>
                      <p className="text-xs text-slate-600">Voluntary Donors</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-[#3d3e65] mb-1">
                        {yearData.bloodDonation.unitsCollected}
                      </p>
                      <p className="text-xs text-slate-600">Units Collected</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-[#3d3e65] mb-1">
                        {yearData.bloodDonation.hospitals}
                      </p>
                      <p className="text-xs text-slate-600">Partner Hospitals</p>
                    </div>
                  </div>
                </div>

                {/* Village Camps */}
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-4">Village Camps</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <p className="text-2xl font-semibold text-[#3d3e65] mb-1">
                        {yearData.villageCamps.camps}
                      </p>
                      <p className="text-xs text-slate-600">Camps Conducted</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-[#3d3e65] mb-1">
                        {yearData.villageCamps.villages}
                      </p>
                      <p className="text-xs text-slate-600">Villages Reached</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-[#3d3e65] mb-1">
                        {yearData.villageCamps.participants}
                      </p>
                      <p className="text-xs text-slate-600">Participants</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-[#3d3e65] mb-1">
                        {yearData.villageCamps.referrals}
                      </p>
                      <p className="text-xs text-slate-600">Medical Referrals</p>
                    </div>
                  </div>
                </div>

                {/* Health Checkups */}
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-4">Health Checkup Camps</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-2xl font-semibold text-[#3d3e65] mb-1">
                        {yearData.healthCheckups.camps}
                      </p>
                      <p className="text-xs text-slate-600">Camps Held</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-[#3d3e65] mb-1">
                        {yearData.healthCheckups.screenings}
                      </p>
                      <p className="text-xs text-slate-600">Screenings Done</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-[#3d3e65] mb-1">
                        {yearData.healthCheckups.referrals}
                      </p>
                      <p className="text-xs text-slate-600">Referrals Made</p>
                    </div>
                  </div>
                </div>

                {/* Donation Drives */}
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-4">Donation Drives</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-2xl font-semibold text-[#3d3e65] mb-1">
                        {yearData.donationDrives.drives}
                      </p>
                      <p className="text-xs text-slate-600">Drives Organized</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-[#3d3e65] mb-1">
                        {yearData.donationDrives.itemsCollected}
                      </p>
                      <p className="text-xs text-slate-600">Items Collected</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-[#3d3e65] mb-1">
                        {yearData.donationDrives.familiesBenefited}
                      </p>
                      <p className="text-xs text-slate-600">Families Benefited</p>
                    </div>
                  </div>
                </div>

                {/* Short Events */}
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-4">Short Events</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-2xl font-semibold text-[#3d3e65] mb-1">
                        {yearData.shortEvents.events}
                      </p>
                      <p className="text-xs text-slate-600">Events Held</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-[#3d3e65] mb-1">
                        {yearData.shortEvents.participants}
                      </p>
                      <p className="text-xs text-slate-600">Participants</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* DATA REPLACEMENT: Update byYear array with real yearly data */}

      {/* Partner Organizations */}
      <section className="border-t border-slate-200 bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-4xl">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Partner Organizations</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Our work is made possible through collaboration with verified institutions and government bodies.
            </p>
            <ul className="space-y-2">
              {impactData.partners.map((partner, idx) => (
                <li key={idx} className="text-sm text-slate-700 pl-4 relative before:content-['—'] before:absolute before:left-0">
                  {partner}
                </li>
              ))}
            </ul>

            {/* DATA REPLACEMENT: Update partners list above */}
          </div>
        </div>
      </section>

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

      {/* Simple Footer */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-semibold text-slate-900">Spandan</p>
              <p className="text-xs text-slate-500 mt-1">Socio-Technical Club</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-600">
                <a href="/contact" className="hover:text-[#3d3e65] transition-colors">Contact</a>
                {" · "}
                <a href="/team" className="hover:text-[#3d3e65] transition-colors">Team</a>
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Student initiative • Est. 2023
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SpandanImpact;