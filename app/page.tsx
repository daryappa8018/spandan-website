import React from 'react';

// HOME PAGE - Spandan
// No generic hero section, institutional approach
// Using standard <a> tags instead of Next.js Link for artifact demo

const SpandanHome = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header - Clean, institutional */}
      <header className="border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-[#3d3e65]">Spandan</h1>
              <p className="text-xs text-slate-500 mt-0.5">Socio-Technical Club</p>
            </div>
            <nav className="flex gap-8 text-sm">
              <a href="/about" className="text-slate-700 hover:text-[#3d3e65] transition-colors">About</a>
              <a href="/events" className="text-slate-700 hover:text-[#3d3e65] transition-colors">Events</a>
              <a href="/donation-drives" className="text-slate-700 hover:text-[#3d3e65] transition-colors">Donation Drives</a>
              <a href="/tech-projects" className="text-slate-700 hover:text-[#3d3e65] transition-colors">Tech Projects</a>
              <a href="/impact" className="text-slate-700 hover:text-[#3d3e65] transition-colors">Impact</a>
              <a href="/team" className="text-slate-700 hover:text-[#3d3e65] transition-colors">Team</a>
              <a href="/contact" className="text-slate-700 hover:text-[#3d3e65] transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Institutional Introduction - Left-aligned, calm */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="max-w-2xl">
          <p className="text-base text-slate-700 leading-relaxed mb-4">
            Spandan is a student-run initiative that uses technology and community organization to address gaps in healthcare access, resource distribution, and rural development.
          </p>
          <p className="text-base text-slate-700 leading-relaxed">
            We conduct blood donation camps, village outreach programs, health checkups, and non-monetary donation drives. Our work is guided by strict ethical principles, including a firm policy against accepting any form of monetary donations.
          </p>
          
          {/* DATA REPLACEMENT: Update introduction text here */}
        </div>
      </section>

      {/* Quiet CTA - Not a button, just a link */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="max-w-2xl">
          <p className="text-sm text-slate-600">
            <a href="/about" className="text-[#3d3e65] underline hover:text-slate-900">Learn more about our approach</a> or <a href="/events" className="text-[#3d3e65] underline hover:text-slate-900">view our recent work</a>.
          </p>
        </div>
      </section>

      {/* Types of Work - Simple grid, no cards */}
      <section className="border-t border-slate-200 bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-8">What We Do</h2>
          
          <div className="grid grid-cols-2 gap-x-16 gap-y-10 max-w-4xl">
            <div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Blood Donation Camps</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Organizing voluntary blood donation drives in collaboration with regional blood banks to address critical shortages during emergencies and regular hospital needs.
              </p>
            </div>
            
            <div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Village Camps</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Multi-day outreach programs in underserved rural areas providing health education, basic medical screenings, and connection to government welfare schemes.
              </p>
            </div>
            
            <div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Health Checkup Camps</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Free basic health screening services including blood pressure, diabetes, and BMI assessments, with referrals to medical facilities when needed.
              </p>
            </div>
            
            <div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Donation Drives</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Collection and distribution of clothing, books, stationery, and essential supplies. We do not accept monetary donations under any circumstances.
              </p>
            </div>
          </div>

          {/* DATA REPLACEMENT: Update activity descriptions in the grid above */}
        </div>
      </section>

      {/* Recent Activities - Timeline style, not cards */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-xl font-semibold text-slate-900 mb-8">Recent Activities</h2>
        
        <div className="space-y-8 max-w-3xl">
          <div className="border-l-2 border-slate-200 pl-6">
            <p className="text-xs text-slate-500 mb-1">December 2024</p>
            <h3 className="text-base font-semibold text-slate-900 mb-2">Winter Clothing Drive</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-2">
              Collected and distributed 340 warm clothing items to residents of Gharaunda and nearby villages ahead of winter season.
            </p>
            <a href="/events/winter-clothing-2024" className="text-sm text-[#3d3e65] underline hover:text-slate-900">View details</a>
          </div>

          <div className="border-l-2 border-slate-200 pl-6">
            <p className="text-xs text-slate-500 mb-1">November 2024</p>
            <h3 className="text-base font-semibold text-slate-900 mb-2">Blood Donation Camp - Campus</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-2">
              82 students and faculty members donated blood in collaboration with District Red Cross Society. All units dispatched to Civil Hospital blood bank.
            </p>
            <a href="/events/blood-camp-nov-2024" className="text-sm text-[#3d3e65] underline hover:text-slate-900">View details</a>
          </div>

          <div className="border-l-2 border-slate-200 pl-6">
            <p className="text-xs text-slate-500 mb-1">October 2024</p>
            <h3 className="text-base font-semibold text-slate-900 mb-2">Village Health Camp - Baraut</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-2">
              Conducted basic health screenings for 156 residents. Identified 12 cases requiring follow-up medical attention and provided referrals.
            </p>
            <a href="/events/village-camp-baraut-2024" className="text-sm text-[#3d3e65] underline hover:text-slate-900">View details</a>
          </div>

          {/* DATA REPLACEMENT: Replace activities above with real event data */}
        </div>

        <div className="mt-10">
          <a href="/events" className="text-sm text-slate-700 underline hover:text-[#3d3e65]">View all events →</a>
        </div>
      </section>

      {/* Ethical Stance - Critical section, calm but firm */}
      <section className="border-t border-slate-200 bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Our Ethical Framework</h2>
            
            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p>
                Spandan operates on a principle of transparency and direct action. We do not accept monetary donations of any kind—no cash, no online transfers, no UPI payments.
              </p>
              <p>
                This policy exists to maintain trust, eliminate financial complexity, and ensure that our work remains focused on direct community service rather than fund management.
              </p>
              <p>
                We accept only material donations (clothing, books, supplies) and coordinate with verified institutions for specialized needs like blood donation and medical camps.
              </p>
            </div>

            <div className="mt-6">
              <a href="/donation-drives" className="text-sm text-[#3d3e65] underline hover:text-slate-900">
                Read our complete donation policy
              </a>
            </div>

            {/* DATA REPLACEMENT: Update ethical framework text if needed */}
          </div>
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
                {/* DATA REPLACEMENT: Add institution name below */}
                Student initiative • Est. 2023
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SpandanHome;