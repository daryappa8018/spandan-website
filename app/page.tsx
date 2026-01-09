// app/page.tsx
// Home page - fetches data from database

import { prisma } from '@/lib/prisma';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spandan - Socio-Technical Club',
  description: 'Student-run initiative using technology and community organization for social impact through blood donation camps, village outreach, and community service.',
};

export default async function HomePage() {
  // Fetch recent events
  const recentEvents = await prisma.event.findMany({
    where: { published: true },
    take: 3,
    orderBy: { createdAt: 'desc' },
    include: { metrics: true },
  });

  // Fetch settings
  const settings = await prisma.siteSetting.findMany();
  const settingsMap = settings.reduce((acc, s) => {
    acc[s.key] = s.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="min-h-screen bg-white">
      <Header currentPath="/" />

      {/* Institutional Introduction - Left-aligned, calm */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="max-w-2xl">
          <p className="text-base text-slate-700 leading-relaxed mb-4">
            Spandan is a student-run initiative that uses technology and community organization to address gaps in healthcare access, resource distribution, and rural development.
          </p>
          <p className="text-base text-slate-700 leading-relaxed">
            We conduct blood donation camps, village outreach programs, health checkups, and non-monetary donation drives. Our work is guided by strict ethical principles, including a firm policy against accepting any form of monetary donations.
          </p>
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
        </div>
      </section>

      {/* Recent Activities - Timeline style, from database */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-xl font-semibold text-slate-900 mb-8">Recent Activities</h2>
        
        <div className="space-y-8 max-w-3xl">
          {recentEvents.map((event) => (
            <div key={event.id} className="border-l-2 border-slate-200 pl-6">
              <p className="text-xs text-slate-500 mb-1">{event.date}</p>
              <h3 className="text-base font-semibold text-slate-900 mb-2">{event.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-2">
                {event.summary}
              </p>
              <a href={`/events/${event.slug}`} className="text-sm text-[#3d3e65] underline hover:text-slate-900">View details</a>
            </div>
          ))}
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
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}