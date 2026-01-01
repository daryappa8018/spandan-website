'use client';

import React, { useState } from 'react';

// EVENTS PAGE - Spandan
// Timeline/list-based layout, categorized by type
// Avoid card-heavy UI, use clean list structure

const SpandanEvents = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // DATA REPLACEMENT: Replace with real event data
  const events = [
    {
      id: 'winter-clothing-2024',
      title: 'Winter Clothing Drive',
      category: 'donation-drive',
      date: 'December 2024',
      month: 'Dec',
      year: 2024,
      summary: 'Collected and distributed 340 warm clothing items to residents of Gharaunda and nearby villages ahead of winter season.',
      metrics: ['340 items', '5 villages', '180 families']
    },
    {
      id: 'blood-camp-nov-2024',
      title: 'Blood Donation Camp - Campus',
      category: 'blood-donation',
      date: 'November 2024',
      month: 'Nov',
      year: 2024,
      summary: '82 students and faculty members donated blood in collaboration with District Red Cross Society.',
      metrics: ['82 donors', '82 units', 'Civil Hospital']
    },
    {
      id: 'village-camp-baraut-2024',
      title: 'Village Health Camp - Baraut',
      category: 'village-camp',
      date: 'October 2024',
      month: 'Oct',
      year: 2024,
      summary: 'Conducted basic health screenings for 156 residents. Identified 12 cases requiring follow-up medical attention.',
      metrics: ['156 screened', '12 referrals', '1 day']
    },
    {
      id: 'raksha-bandhan-2024',
      title: 'Raksha Bandhan - Village Visit',
      category: 'short-event',
      date: 'August 2024',
      month: 'Aug',
      year: 2024,
      summary: 'Distributed rakhis and sweets to children in three villages, organized cultural activities.',
      metrics: ['3 villages', '85 children', 'Cultural program']
    },
    {
      id: 'blood-camp-aug-2024',
      title: 'Blood Donation Camp - Emergency Drive',
      category: 'blood-donation',
      date: 'August 2024',
      month: 'Aug',
      year: 2024,
      summary: 'Emergency blood collection drive organized in response to district hospital shortage alert.',
      metrics: ['67 donors', '67 units', 'Emergency response']
    },
    {
      id: 'health-camp-jhajjar-2024',
      title: 'Health Checkup Camp - Jhajjar District',
      category: 'health-checkup',
      date: 'July 2024',
      month: 'Jul',
      year: 2024,
      summary: 'Two-day health screening camp covering diabetes, BP, and BMI assessments in rural areas.',
      metrics: ['203 screened', '18 referrals', '2 days']
    },
    {
      id: 'book-donation-2024',
      title: 'Educational Material Drive',
      category: 'donation-drive',
      date: 'June 2024',
      month: 'Jun',
      year: 2024,
      summary: 'Collected textbooks, notebooks, and stationery for distribution to government school students.',
      metrics: ['450 books', '4 schools', '280 students']
    },
    {
      id: 'village-camp-panipat-2024',
      title: 'Village Camp - Panipat Rural',
      category: 'village-camp',
      date: 'May 2024',
      month: 'May',
      year: 2024,
      summary: 'Three-day comprehensive camp including health education, government scheme awareness, and basic screenings.',
      metrics: ['4 villages', '240 participants', '3 days']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Events' },
    { id: 'blood-donation', label: 'Blood Donation Camps' },
    { id: 'village-camp', label: 'Village Camps' },
    { id: 'health-checkup', label: 'Health Checkup Camps' },
    { id: 'donation-drive', label: 'Donation Drives' },
    { id: 'short-event', label: 'Short Events' }
  ];

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(e => e.category === selectedCategory);

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

      {/* Page Header */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <h1 className="text-3xl font-semibold text-slate-900 mb-3">Events</h1>
        <p className="text-base text-slate-600 max-w-2xl">
          A record of our community work organized by type and date. Each event includes objectives, execution details, and documented outcomes.
        </p>
      </section>

      {/* Category Filter - Simple tabs, not fancy */}
      <section className="max-w-6xl mx-auto px-6 pb-8">
        <div className="border-b border-slate-200">
          <div className="flex gap-6 overflow-x-auto">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`pb-3 px-1 text-sm whitespace-nowrap transition-colors border-b-2 ${
                  selectedCategory === cat.id
                    ? 'border-[#3d3e65] text-[#3d3e65] font-medium'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events List - Timeline style */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="max-w-4xl">
          {filteredEvents.length === 0 ? (
            <p className="text-sm text-slate-500">No events found in this category.</p>
          ) : (
            <div className="space-y-12">
              {filteredEvents.map(event => (
                <div key={event.id} className="flex gap-8">
                  {/* Date column - fixed width */}
                  <div className="w-24 flex-shrink-0 pt-1">
                    <p className="text-sm font-medium text-slate-900">{event.month}</p>
                    <p className="text-xs text-slate-500">{event.year}</p>
                  </div>

                  {/* Content column */}
                  <div className="flex-1 border-l-2 border-slate-200 pl-8 pb-8">
                    <div className="mb-3">
                      <h3 className="text-lg font-semibold text-slate-900 mb-1">
                        {event.title}
                      </h3>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">
                        {categories.find(c => c.id === event.category)?.label}
                      </p>
                    </div>

                    <p className="text-sm text-slate-700 leading-relaxed mb-4">
                      {event.summary}
                    </p>

                    {/* Metrics - simple inline list */}
                    <div className="flex flex-wrap gap-4 mb-4">
                      {event.metrics.map((metric, idx) => (
                        <span key={idx} className="text-xs text-slate-600 bg-slate-50 px-3 py-1 rounded">
                          {metric}
                        </span>
                      ))}
                    </div>

                    <a 
                      href={`/events/${event.id}`}
                      className="text-sm text-[#3d3e65] underline hover:text-slate-900"
                    >
                      View full details →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* DATA REPLACEMENT: Replace events array at top of component with real data */}
      </section>

      {/* Archive Note */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="max-w-4xl border-t border-slate-200 pt-8">
          <p className="text-sm text-slate-600">
            Events from 2023 and earlier are available in our <a href="/impact" className="text-[#3d3e65] underline">impact report</a>.
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

export default SpandanEvents;