import React from 'react';

// TEAM PAGE - Spandan
// Simple list layout, no fancy hover effects
// Human, respectful presentation

const SpandanTeam = () => {
  // DATA REPLACEMENT: Replace with real team member data
  const team = {
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
              <a href="/impact" className="text-slate-700 hover:text-[#3d3e65] transition-colors">Impact</a>
              <a href="/team" className="text-[#3d3e65] font-medium">Team</a>
              <a href="/contact" className="text-slate-700 hover:text-[#3d3e65] transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <h1 className="text-3xl font-semibold text-slate-900 mb-3">Team</h1>
        <p className="text-base text-slate-600 max-w-2xl">
          Spandan is run entirely by students. Team membership changes as members graduate, but our commitment to community service remains constant.
        </p>
      </section>

      {/* Leadership */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="max-w-4xl">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Leadership</h2>
          
          <div className="space-y-4">
            {team.leadership.map((member, idx) => (
              <div key={idx} className="border-b border-slate-200 pb-4">
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

          {/* DATA REPLACEMENT: Update leadership array above */}
        </div>
      </section>

      {/* Coordination Team */}
      <section className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-4xl">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Coordination Team</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {team.coordination.map((member, idx) => (
                <div key={idx} className="bg-white border border-slate-200 p-4">
                  <h3 className="text-base font-semibold text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-sm text-slate-600 mb-2">{member.role}</p>
                  <p className="text-xs text-slate-500">{member.year} • {member.department}</p>
                </div>
              ))}
            </div>

            {/* DATA REPLACEMENT: Update coordination array above */}
          </div>
        </div>
      </section>

      {/* Core Members */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="max-w-4xl">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Core Members</h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            {team.coreMembers.map((member, idx) => (
              <div key={idx} className="border border-slate-200 p-4">
                <h3 className="text-sm font-semibold text-slate-900 mb-1">{member.name}</h3>
                <p className="text-xs text-slate-600">{member.year}</p>
                <p className="text-xs text-slate-500">{member.department}</p>
              </div>
            ))}
          </div>

          {/* DATA REPLACEMENT: Update coreMembers array above */}
        </div>
      </section>

      {/* Faculty Advisors */}
      <section className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-4xl">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Faculty Advisors</h2>
            
            <div className="space-y-4">
              {team.advisors.map((advisor, idx) => (
                <div key={idx} className="border-l-2 border-[#3d3e65] pl-4">
                  <h3 className="text-base font-semibold text-slate-900">{advisor.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">{advisor.role}</p>
                  <p className="text-xs text-slate-500 mt-1">{advisor.department}</p>
                </div>
              ))}
            </div>

            {/* DATA REPLACEMENT: Update advisors array above */}
          </div>
        </div>
      </section>

      {/* Volunteers Note */}
      <section className="max-w-6xl mx-auto px-6 py-12">
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

export default SpandanTeam;