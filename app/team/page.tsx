// app/team/page.tsx
// Team page - fetches from database

import { prisma } from '@/lib/prisma';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Team | Spandan',
  description: 'Meet the student team behind Spandan.',
};

const categoryLabels: Record<string, string> = {
  LEADERSHIP: 'Leadership',
  COORDINATION: 'Coordination Team',
  CORE_MEMBER: 'Core Members',
  ADVISOR: 'Faculty Advisors',
};

const categoryOrder = ['LEADERSHIP', 'COORDINATION', 'CORE_MEMBER', 'ADVISOR'];

export default async function TeamPage() {
  // Fetch published team members
  const teamMembers = await prisma.teamMember.findMany({
    where: { published: true },
    orderBy: [{ category: 'asc' }, { order: 'asc' }],
  });

  const membersByCategory = teamMembers.reduce((acc, member) => {
    if (!acc[member.category]) {
      acc[member.category] = [];
    }
    acc[member.category].push(member);
    return acc;
  }, {} as Record<string, typeof teamMembers>);

  return (
    <div className="min-h-screen bg-white">
      <Header currentPath="/team" />

      {/* Page Header */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <h1 className="text-3xl font-semibold text-slate-900 mb-3">Team</h1>
        <p className="text-base text-slate-600 max-w-2xl">
          Spandan is run entirely by students. Team membership changes as members graduate, but our commitment to community service remains constant.
        </p>
      </section>

      {/* Team Members by Category */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        {categoryOrder.map((category) => {
          const members = membersByCategory[category];
          if (!members || members.length === 0) return null;

          return (
            <section key={category} className="mb-12">
              <div className="max-w-4xl">
                <h2 className="text-xl font-semibold text-slate-900 mb-6">
                  {categoryLabels[category]}
                </h2>

                {/* Leadership & Coordination - Detailed cards */}
                {(category === 'LEADERSHIP' || category === 'COORDINATION') && (
                  <div className="space-y-4">
                    {members.map((member) => (
                      <div key={member.id} className="border-b border-slate-200 pb-4">
                        <div className="flex justify-between items-baseline">
                          <div>
                            <h3 className="text-base font-semibold text-slate-900">{member.name}</h3>
                            <p className="text-sm text-slate-600 mt-1">{member.role}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-slate-600">{member.year}</p>
                            <p className="text-xs text-slate-500">{member.department}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Core Members - Grid layout */}
                {category === 'CORE_MEMBER' && (
                  <div className="grid md:grid-cols-3 gap-4">
                    {members.map((member) => (
                      <div key={member.id} className="border border-slate-200 p-4">
                        <h3 className="text-sm font-semibold text-slate-900 mb-1">{member.name}</h3>
                        <p className="text-xs text-slate-600">{member.year}</p>
                        <p className="text-xs text-slate-500">{member.department}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Faculty Advisors - Simple list */}
                {category === 'ADVISOR' && (
                  <div className="space-y-4">
                    {members.map((member) => (
                      <div key={member.id} className="border-l-2 border-[#3d3e65] pl-4">
                        <h3 className="text-base font-semibold text-slate-900">{member.name}</h3>
                        <p className="text-sm text-slate-600 mt-1">{member.role}</p>
                        <p className="text-xs text-slate-500 mt-1">{member.department}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>

      {/* Volunteers Note */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="max-w-4xl">
          <div className="border-l-2 border-slate-200 pl-6">
            <h3 className="text-base font-semibold text-slate-900 mb-3">Active Volunteers</h3>
            <p className="text-sm text-slate-700 leading-relaxed mb-2">
              Beyond the core team, approximately 30 students actively participate in events throughout the year. Their contributions make our work possible.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              We don't maintain a formal volunteer roster since participation varies by event type and academic schedule. Students join events based on their availability and interest.
            </p>
          </div>
        </div>
      </section>

      {/* Join Note */}
      <section className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-4xl">
            <h3 className="text-base font-semibold text-slate-900 mb-3">Want to Join?</h3>
            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              Spandan welcomes students who want to contribute to community service through organization, execution, or technical work. We recruit new members at the beginning of each academic year.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Requirements are simple: consistent availability, willingness to work in team settings, and genuine interest in social impact over resume building.
            </p>
            <a href="/contact" className="text-sm text-[#3d3e65] underline hover:text-slate-900">
              Get in touch to learn more →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}