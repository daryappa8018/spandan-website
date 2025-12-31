import React from 'react';

// TECH PROJECTS PAGE - Spandan
// Engineering-focused documentation
// Problem → Constraints → Approach → Result
// No marketing fluff, technical clarity

const SpandanTechProjects = () => {
  // DATA REPLACEMENT: Replace with real project data
  const projects = [
    {
      id: 'blood-donor-database',
      title: 'Blood Donor Database System',
      status: 'Active',
      year: '2024',
      problem: 'Blood banks issue urgent requests for specific blood groups, but manually searching through scattered donor lists is time-consuming. Response time matters in emergencies.',
      constraints: [
        'No budget for commercial database software',
        'Must work on basic campus internet infrastructure',
        'Team members have limited database administration experience',
        'Need to maintain donor privacy and data security'
      ],
      approach: 'Built using Google Sheets with Apps Script for automation. Donors categorized by blood group, last donation date, and contact info. Script automatically calculates eligibility based on 3-month donation interval. WhatsApp integration for rapid notification.',
      tech: ['Google Sheets', 'Google Apps Script', 'WhatsApp Business API'],
      result: 'Reduced response time from 4-6 hours to under 30 minutes. Successfully coordinated 3 emergency drives in 2024. Currently tracking 180+ voluntary donors.',
      metrics: {
        donors: '180+',
        responseTime: '<30 min',
        emergencyDrives: '3'
      }
    },
    {
      id: 'health-camp-analytics',
      title: 'Health Camp Data Analysis Pipeline',
      status: 'Active',
      year: '2023-2024',
      problem: 'Village health camps generate screening data (BP, diabetes, BMI) but without analysis, we can\'t identify patterns or improve targeting for future camps.',
      constraints: [
        'Data collected on paper forms in field conditions',
        'Team has basic Python knowledge but no statistics background',
        'Results need to be understandable by non-technical stakeholders',
        'Cannot store individual medical data long-term'
      ],
      approach: 'Python scripts with pandas for data cleaning and basic statistical analysis. Results aggregated to village level to protect individual privacy. Generated simple visualizations showing prevalence rates by age group and location.',
      tech: ['Python', 'pandas', 'matplotlib', 'CSV processing'],
      result: 'Identified high diabetes prevalence (32%) in 45+ age group in 3 villages. Used findings to prioritize education materials about diabetes management. Improved camp planning based on demographic patterns.',
      metrics: {
        campsAnalyzed: '12',
        dataPoints: '800+',
        villages: '8'
      }
    },
    {
      id: 'donation-inventory',
      title: 'Donation Inventory Tracker',
      status: 'Active',
      year: '2024',
      problem: 'During donation drives, tracking hundreds of items manually leads to errors. Need to know what we have, where it came from, and ensure fair distribution.',
      constraints: [
        'Must work offline during collection (unreliable campus WiFi)',
        'Volunteers need minimal training to use system',
        'Need barcode scanning but no budget for special equipment',
        'Should sync when internet available'
      ],
      approach: 'Progressive web app with offline capability. Uses phone camera for barcode scanning (no special hardware). Items categorized by type, size, condition. LocalStorage for offline operation, syncs to Firebase when online.',
      tech: ['React', 'Firebase', 'Service Workers', 'QuaggaJS (barcode)'],
      result: 'Processed 340 items in December 2024 winter clothing drive with zero inventory errors. Reduced sorting time by 40%. Generated distribution lists automatically grouped by size and type.',
      metrics: {
        itemsTracked: '900+',
        timeSaved: '40%',
        accuracy: '100%'
      }
    },
    {
      id: 'event-coordination',
      title: 'Internal Event Coordination Dashboard',
      status: 'Active',
      year: '2023-2024',
      problem: 'Event details scattered across WhatsApp messages, email threads, and handwritten notes. New volunteers struggle to understand their responsibilities.',
      constraints: [
        'Must be simple enough for non-technical team members',
        'Cannot require installation or complex setup',
        'Need mobile access since students are always moving',
        'Should work with existing Google accounts (no new logins)'
      ],
      approach: 'Web dashboard built with Next.js. Google OAuth for authentication using existing college emails. Shows upcoming events, volunteer assignments, required materials, contact lists. Post-event documentation templates.',
      tech: ['Next.js', 'Google OAuth', 'Tailwind CSS', 'Vercel hosting'],
      result: 'Centralized information for 15+ events across 2024. Reduced onboarding time for new volunteers by 60%. Improved post-event documentation completion rate from 40% to 95%.',
      metrics: {
        activeUsers: '28',
        events: '15+',
        docCompletion: '95%'
      }
    },
    {
      id: 'village-mapping',
      title: 'Village Outreach Mapping Tool',
      status: 'In Development',
      year: '2024',
      problem: 'No systematic way to track which villages we\'ve visited, what services were provided, or when follow-up visits are due. Makes planning inefficient.',
      constraints: [
        'Villages lack precise digital addresses',
        'Need to work on mobile devices with intermittent connectivity',
        'Cannot rely on commercial mapping APIs (cost)',
        'Must visualize visit history and service gaps'
      ],
      approach: 'Using OpenStreetMap for base mapping (free). Custom overlay showing visited villages color-coded by recency and service type. Offline map tiles cached for field use. Simple forms for logging visit details.',
      tech: ['React', 'Leaflet.js', 'OpenStreetMap', 'IndexedDB'],
      result: 'Currently in testing phase. Prototype tracks 12 villages with visit history. Plan to deploy before next village camp season (March 2025).',
      metrics: {
        status: 'Beta',
        villagesMapped: '12',
        plannedRelease: 'Mar 2025'
      }
    }
  ];

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
              <a href="/tech-projects" className="text-[#3d3e65] font-medium">Tech Projects</a>
              <a href="/impact" className="text-slate-700 hover:text-[#3d3e65] transition-colors">Impact</a>
              <a href="/team" className="text-slate-700 hover:text-[#3d3e65] transition-colors">Team</a>
              <a href="/contact" className="text-slate-700 hover:text-[#3d3e65] transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <h1 className="text-3xl font-semibold text-slate-900 mb-3">Tech Projects</h1>
        <p className="text-base text-slate-600 max-w-2xl">
          Technical tools we've built to improve operational efficiency, data management, and coordination. Each project addresses a specific constraint we encountered.
        </p>
      </section>

      {/* Projects List */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="space-y-16">
          {projects.map((project, index) => (
            <div key={project.id} className={index > 0 ? 'border-t border-slate-200 pt-16' : ''}>
              <div className="max-w-4xl">
                {/* Project Header */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    <h2 className="text-xl font-semibold text-slate-900">{project.title}</h2>
                    <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{project.year}</p>
                </div>

                {/* Problem Statement */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">Problem</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                {/* Constraints */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Constraints</h3>
                  <ul className="space-y-2">
                    {project.constraints.map((constraint, idx) => (
                      <li key={idx} className="text-sm text-slate-600 pl-4 relative before:content-['—'] before:absolute before:left-0">
                        {constraint}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Approach */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">Approach</h3>
                  <p className="text-sm text-slate-700 leading-relaxed mb-3">
                    {project.approach}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, idx) => (
                      <span key={idx} className="text-xs px-3 py-1 bg-[#3d3e65] text-white rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Result */}
                <div className="bg-slate-50 p-6 rounded">
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Result</h3>
                  <p className="text-sm text-slate-700 leading-relaxed mb-4">
                    {project.result}
                  </p>
                  
                  {/* Metrics */}
                  <div className="flex flex-wrap gap-6">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-xs text-slate-500 mb-1">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-base font-semibold text-slate-900">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DATA REPLACEMENT: Replace projects array at top of component with real data */}
      </section>

      {/* Technical Note */}
      <section className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <h3 className="text-base font-semibold text-slate-900 mb-3">Technical Philosophy</h3>
            <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <p>
                We don't build technology for the sake of technology. Each project exists because it solves a real operational problem we encountered.
              </p>
              <p>
                Our approach prioritizes simplicity and maintainability over sophistication. We choose tools that team members can understand and modify, since technical knowledge varies and members graduate.
              </p>
              <p>
                When possible, we use free or open-source solutions. Our projects run on minimal infrastructure, often just a student's laptop or free hosting tiers. This keeps operations sustainable and independent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contributing Note */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="max-w-3xl">
          <div className="border-l-2 border-slate-200 pl-6">
            <h3 className="text-base font-semibold text-slate-900 mb-2">Want to Contribute?</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">
              If you're a student with technical skills and want to help improve these systems or build new tools, we're open to collaboration.
            </p>
            <a href="/contact" className="text-sm text-[#3d3e65] underline hover:text-slate-900">
              Get in touch →
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

export default SpandanTechProjects;