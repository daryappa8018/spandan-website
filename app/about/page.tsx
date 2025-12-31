import React from 'react';

// ABOUT PAGE - Spandan
// Problem-driven origin story, socio-technical definition, ethical principles
// Formal organization page structure, not startup-style

const SpandanAbout = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header - Reusable across pages */}
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
              <a href="/about" className="text-[#3d3e65] font-medium">About</a>
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

      {/* Page Header - Simple, left-aligned */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <h1 className="text-3xl font-semibold text-slate-900">About Spandan</h1>
      </section>

      {/* Why We Started - Problem-driven narrative */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="max-w-3xl">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Why We Started</h2>
          
          <div className="space-y-4 text-base text-slate-700 leading-relaxed">
            <p>
              Spandan began in 2023 when a group of engineering students noticed a disconnect between the technical skills they were developing and the immediate needs of communities around them.
            </p>
            <p>
              Villages within 20 kilometers of campus lacked regular access to basic health screenings. Blood banks faced recurring shortages. Families struggled to access winter clothing and educational materials. Meanwhile, students had time, organizational capacity, and technical tools that could help address these gaps.
            </p>
            <p>
              Rather than creating another campus club focused on competitions or corporate recruitment, we chose to build an organization that would serve as a bridge—using student energy and technical capability to support community welfare in tangible, measurable ways.
            </p>

            {/* DATA REPLACEMENT: Update origin story paragraphs above */}
          </div>
        </div>
      </section>

      {/* What Socio-Technical Means - Practical definition */}
      <section className="border-t border-slate-200 bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">What "Socio-Technical" Means in Practice</h2>
            
            <div className="space-y-4 text-base text-slate-700 leading-relaxed mb-8">
              <p>
                The term "socio-technical" describes our dual approach: combining social organization with technical tools to create systematic, repeatable solutions.
              </p>
              <p>
                This means we don't just organize one-off volunteer events. We build processes, maintain databases, create coordination systems, and document outcomes—treating community service with the same rigor we apply to engineering projects.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">Social Component</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Coordinating with local authorities, medical professionals, school administrators, and village heads. Building trust through consistent presence and transparent operations. Understanding community needs through direct engagement rather than assumptions.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">Technical Component</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Maintaining participant databases for blood donation camps. Using spreadsheet automation for inventory tracking in donation drives. Creating simple web forms for event registration. Analyzing health screening data to identify patterns and improve outreach targeting.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">Integration</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Technology serves the social mission—not the other way around. We use only tools that genuinely improve efficiency or reach. If a problem can be solved with a phone call and a notebook, we don't force a technical solution.
                </p>
              </div>
            </div>

            {/* DATA REPLACEMENT: Update socio-technical explanation above */}
          </div>
        </div>
      </section>

      {/* How Technology is Used - Concrete examples */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="max-w-3xl">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">How We Actually Use Technology</h2>
          
          <div className="space-y-8">
            <div className="border-l-2 border-[#3d3e65] pl-6">
              <h3 className="text-base font-semibold text-slate-900 mb-2">Blood Donor Database</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-2">
                We maintain records of voluntary donors including blood type, last donation date, and contact information. When blood banks issue urgent requests, we can immediately identify eligible donors and coordinate rapid response.
              </p>
              <p className="text-xs text-slate-500">
                Tool: Google Sheets with automated reminder scripts
              </p>
            </div>

            <div className="border-l-2 border-[#3d3e65] pl-6">
              <h3 className="text-base font-semibold text-slate-900 mb-2">Health Camp Analytics</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-2">
                We track screening results across village camps to identify health trends (diabetes prevalence, hypertension rates). This data helps us tailor education materials and prioritize follow-up visits.
              </p>
              <p className="text-xs text-slate-500">
                Tool: Python scripts for basic statistical analysis
              </p>
            </div>

            <div className="border-l-2 border-[#3d3e65] pl-6">
              <h3 className="text-base font-semibold text-slate-900 mb-2">Donation Inventory System</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-2">
                Simple tracking system for material donations categorized by type, size, and condition. Ensures equitable distribution and prevents duplicate requests from the same families.
              </p>
              <p className="text-xs text-slate-500">
                Tool: Spreadsheet with barcode scanning via mobile app
              </p>
            </div>

            <div className="border-l-2 border-[#3d3e65] pl-6">
              <h3 className="text-base font-semibold text-slate-900 mb-2">Event Coordination Portal</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-2">
                Internal dashboard for team members to view upcoming events, volunteer assignments, required materials, and post-event documentation templates.
              </p>
              <p className="text-xs text-slate-500">
                Tool: Custom web application built with React and Firebase
              </p>
            </div>

            {/* DATA REPLACEMENT: Update technology use cases above */}
          </div>
        </div>
      </section>

      {/* Ethical Principles - Detailed explanation */}
      <section className="border-t border-slate-200 bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Ethical Principles</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-3">No Monetary Donations</h3>
                <p className="text-sm text-slate-700 leading-relaxed mb-2">
                  We do not accept money in any form—cash, bank transfers, UPI, online payments, or cryptocurrency. This is not a temporary policy but a core organizational principle.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  This restriction exists to maintain absolute transparency, eliminate financial management overhead, prevent misuse concerns, and ensure our focus remains on direct service rather than fundraising.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-3">Transparency in Operations</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Every event we conduct includes public documentation: participant numbers, materials distributed, partnering organizations, and outcomes. We publish this information not because we're required to, but because transparency builds trust and accountability.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-3">Consent and Dignity</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We photograph events only with explicit consent. We don't use images of beneficiaries for promotional purposes. People we serve are participants in community health initiatives, not subjects for charity marketing.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-3">Institutional Partnerships</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We work only with verified institutions: government hospitals, recognized blood banks, registered schools, and local administrative bodies. We do not partner with commercial entities or accept corporate sponsorships that could create conflicts of interest.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-3">Student-Led, Not Faculty-Directed</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  While we have faculty advisors, operational decisions and event execution are entirely student-driven. This ensures the club remains responsive to student capacity and maintains authentic peer-to-peer engagement.
                </p>
              </div>

              {/* DATA REPLACEMENT: Update ethical principles above */}
            </div>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="max-w-3xl">
          <p className="text-base text-slate-700 leading-relaxed">
            Spandan exists to demonstrate that technical education and community service are not separate pursuits. The skills we develop as engineering students—systematic thinking, process design, data analysis—are directly applicable to social challenges. Our goal is not to scale indefinitely, but to operate sustainably and effectively within our capacity.
          </p>

          <div className="mt-8">
            <a href="/events" className="text-sm text-[#3d3e65] underline hover:text-slate-900">
              See our work in practice →
            </a>
          </div>

          {/* DATA REPLACEMENT: Update closing statement above */}
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

export default SpandanAbout;