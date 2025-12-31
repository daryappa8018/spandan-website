import React from 'react';

// EVENT DETAIL PAGE - Spandan
// Individual event page with objective, execution, outcome
// Clean documentation style, not promotional

const SpandanEventDetail = () => {
  // DATA REPLACEMENT: This would come from dynamic route params in real implementation
  // Example event: Blood Donation Camp - November 2024
  
  const event = {
    id: 'blood-camp-nov-2024',
    title: 'Blood Donation Camp - Campus',
    category: 'Blood Donation Camp',
    date: 'November 15, 2024',
    location: 'College Campus, Main Auditorium',
    duration: '9:00 AM - 4:00 PM',
    
    objective: {
      context: 'The District Red Cross Society issued a notice about declining blood reserves at Civil Hospital, particularly O+ and B+ blood groups needed for ongoing treatments and emergency cases.',
      goal: 'Organize a voluntary blood donation drive on campus to collect at least 60 units within a single day, ensuring proper medical protocols and donor safety.',
      target: '60-80 voluntary donors from student and faculty population'
    },
    
    execution: {
      preparation: [
        'Coordinated with District Red Cross Society 3 weeks in advance',
        'Obtained necessary permissions from college administration',
        'Set up registration desk and medical screening area in main auditorium',
        'Arranged for light refreshments and post-donation rest area',
        'Created volunteer roster for donor assistance and documentation'
      ],
      process: [
        'Registration and basic eligibility screening (age, weight, health status)',
        'Medical examination by Red Cross medical team',
        'Blood collection in sterile environment with trained phlebotomists',
        'Post-donation monitoring period with refreshments',
        'Certificate distribution and donor card updates'
      ],
      team: '12 Spandan members + 8 Red Cross medical staff',
      volunteers: '12 student volunteers'
    },
    
    outcome: {
      metrics: {
        registrations: 94,
        eligibleDonors: 82,
        unitsCollected: 82,
        bloodGroups: 'O+ (28), A+ (24), B+ (18), AB+ (8), O- (2), A- (1), B- (1)',
        timeCompleted: '7 hours'
      },
      impact: 'All 82 units were transported to Civil Hospital blood bank on the same day. According to Red Cross coordination, these units addressed immediate shortages and supported 23 planned surgeries and multiple emergency cases over the following two weeks.',
      challenges: '12 registrants were ineligible due to low hemoglobin levels or recent illness. One donor experienced mild dizziness but recovered after extended rest period.',
      learnings: 'Pre-screening reminders about eligibility criteria (sent 2 days before event) could reduce ineligible registrations. Earlier start time (8 AM instead of 9 AM) would allow more donors to participate before afternoon classes.'
    },
    
    partners: [
      'District Red Cross Society, Karnal',
      'Civil Hospital Blood Bank',
      'College Administration'
    ],
    
    documentation: {
      photosNote: 'Event photographs available with donor consent',
      dataNote: 'Donor database maintained confidentially per medical privacy standards'
    }
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
              <a href="/events" className="text-[#3d3e65] font-medium">Events</a>
              <a href="/donation-drives" className="text-slate-700 hover:text-[#3d3e65] transition-colors">Donation Drives</a>
              <a href="/tech-projects" className="text-slate-700 hover:text-[#3d3e65] transition-colors">Tech Projects</a>
              <a href="/impact" className="text-slate-700 hover:text-[#3d3e65] transition-colors">Impact</a>
              <a href="/team" className="text-slate-700 hover:text-[#3d3e65] transition-colors">Team</a>
              <a href="/contact" className="text-slate-700 hover:text-[#3d3e65] transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <section className="max-w-6xl mx-auto px-6 pt-8">
        <p className="text-sm text-slate-500">
          <a href="/events" className="hover:text-[#3d3e65]">Events</a>
          {" / "}
          <span className="text-slate-700">{event.title}</span>
        </p>
      </section>

      {/* Event Header */}
      <section className="max-w-6xl mx-auto px-6 pt-6 pb-12">
        <div className="max-w-3xl">
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">{event.category}</p>
          <h1 className="text-3xl font-semibold text-slate-900 mb-4">{event.title}</h1>
          
          <div className="flex flex-wrap gap-6 text-sm text-slate-600">
            <div>
              <span className="text-slate-500">Date:</span> {event.date}
            </div>
            <div>
              <span className="text-slate-500">Location:</span> {event.location}
            </div>
            <div>
              <span className="text-slate-500">Duration:</span> {event.duration}
            </div>
          </div>
        </div>
      </section>

      {/* Objective Section */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="max-w-3xl">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Objective</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-2">Context</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {event.objective.context}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-2">Goal</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {event.objective.goal}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-2">Target</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {event.objective.target}
              </p>
            </div>
          </div>

          {/* DATA REPLACEMENT: Update objective section above */}
        </div>
      </section>

      {/* Execution Section */}
      <section className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Execution</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Preparation</h3>
                <ul className="space-y-2">
                  {event.execution.preparation.map((item, idx) => (
                    <li key={idx} className="text-sm text-slate-600 leading-relaxed pl-4 relative before:content-['—'] before:absolute before:left-0">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Process</h3>
                <ul className="space-y-2">
                  {event.execution.process.map((item, idx) => (
                    <li key={idx} className="text-sm text-slate-600 leading-relaxed pl-4 relative before:content-['—'] before:absolute before:left-0">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-1">Team Size</h3>
                  <p className="text-sm text-slate-600">{event.execution.team}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-1">Volunteers</h3>
                  <p className="text-sm text-slate-600">{event.execution.volunteers}</p>
                </div>
              </div>
            </div>

            {/* DATA REPLACEMENT: Update execution section above */}
          </div>
        </div>
      </section>

      {/* Outcome Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="max-w-3xl">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Outcome</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded">
                  <p className="text-xs text-slate-500 mb-1">Registrations</p>
                  <p className="text-2xl font-semibold text-slate-900">{event.outcome.metrics.registrations}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded">
                  <p className="text-xs text-slate-500 mb-1">Eligible Donors</p>
                  <p className="text-2xl font-semibold text-slate-900">{event.outcome.metrics.eligibleDonors}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded">
                  <p className="text-xs text-slate-500 mb-1">Units Collected</p>
                  <p className="text-2xl font-semibold text-slate-900">{event.outcome.metrics.unitsCollected}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded">
                  <p className="text-xs text-slate-500 mb-1">Time Completed</p>
                  <p className="text-2xl font-semibold text-slate-900">{event.outcome.metrics.timeCompleted}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-slate-500 mb-1">Blood Groups Distribution</p>
                <p className="text-sm text-slate-600">{event.outcome.metrics.bloodGroups}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-2">Impact</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {event.outcome.impact}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-2">Challenges</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {event.outcome.challenges}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-2">Learnings</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {event.outcome.learnings}
              </p>
            </div>
          </div>

          {/* DATA REPLACEMENT: Update outcome section above */}
        </div>
      </section>

      {/* Partners & Documentation */}
      <section className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Partner Organizations</h3>
                <ul className="space-y-2">
                  {event.partners.map((partner, idx) => (
                    <li key={idx} className="text-sm text-slate-600">
                      {partner}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Documentation</h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <p>{event.documentation.photosNote}</p>
                  <p>{event.documentation.dataNote}</p>
                </div>
              </div>
            </div>

            {/* DATA REPLACEMENT: Update partners and documentation notes above */}
          </div>
        </div>
      </section>

      {/* Navigation to other events */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="max-w-3xl">
          <a href="/events" className="text-sm text-slate-700 underline hover:text-[#3d3e65]">
            ← Back to all events
          </a>
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

export default SpandanEventDetail;