// app/about/page.tsx
// About page - static content (can be made dynamic via CMS later)

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Spandan',
  description: 'Learn about Spandan, our mission, and how we use technology for social impact.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header currentPath="/about" />

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
          </div>
        </div>
      </section>

      {/* How Technology is Used - Link to tech projects */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="max-w-3xl">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">How We Actually Use Technology</h2>
          
          <p className="text-base text-slate-700 leading-relaxed mb-6">
            We've developed several technical systems to support our work—from blood donor databases to health camp analytics. Each tool addresses a specific operational need.
          </p>

          <a href="/tech-projects" className="text-sm text-[#3d3e65] underline hover:text-slate-900">
            See our tech projects →
          </a>
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
        </div>
      </section>

      <Footer />
    </div>
  );
}