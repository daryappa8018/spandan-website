// app/events/page.tsx
// Events listing page - fetches from database

import { prisma } from '@/lib/prisma';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EventCard from '@/components/events/EventCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events | Spandan',
  description: 'View all our community events including blood donation camps, village outreach, and health checkups.',
};

const categories = [
  { id: 'all', label: 'All Events' },
  { id: 'BLOOD_DONATION', label: 'Blood Donation Camps' },
  { id: 'VILLAGE_CAMP', label: 'Village Camps' },
  { id: 'HEALTH_CHECKUP', label: 'Health Checkup Camps' },
  { id: 'DONATION_DRIVE', label: 'Donation Drives' },
  { id: 'SHORT_EVENT', label: 'Short Events' },
];

export default async function EventsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const selectedCategory = searchParams.category || 'all';

  // Fetch events from database
  const events = await prisma.event.findMany({
    where: {
      published: true,
      ...(selectedCategory !== 'all' && { category: selectedCategory }),
    },
    orderBy: [{ year: 'desc' }, { createdAt: 'desc' }],
    include: { metrics: { orderBy: { order: 'asc' } } },
  });

  const getCategoryLabel = (categoryId: string): string => {
    const cat = categories.find((c) => c.id === categoryId);
    return cat?.label || categoryId;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header currentPath="/events" />

      {/* Page Header */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <h1 className="text-3xl font-semibold text-slate-900 mb-3">Events</h1>
        <p className="text-base text-slate-600 max-w-2xl">
          A record of our community work organized by type and date. Each event includes objectives, execution details, and documented outcomes.
        </p>
      </section>

      {/* Category Filter - Simple tabs */}
      <section className="max-w-6xl mx-auto px-6 pb-8">
        <div className="border-b border-slate-200">
          <div className="flex gap-6 overflow-x-auto">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={cat.id === 'all' ? '/events' : `/events?category=${cat.id}`}
                className={`pb-3 px-1 text-sm whitespace-nowrap transition-colors border-b-2 ${
                  selectedCategory === cat.id
                    ? 'border-[#3d3e65] text-[#3d3e65] font-medium'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Events List - Timeline style */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="max-w-4xl">
          {events.length === 0 ? (
            <p className="text-sm text-slate-500">No events found in this category.</p>
          ) : (
            <div className="space-y-12">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={{
                    id: event.id,
                    title: event.title,
                    category: event.category,
                    date: event.date,
                    month: event.month,
                    year: event.year,
                    summary: event.summary,
                    metrics: event.metrics.map((m) => m.label),
                  }}
                  categoryLabel={getCategoryLabel(event.category)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Archive Note */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="max-w-4xl border-t border-slate-200 pt-8">
          <p className="text-sm text-slate-600">
            Events from earlier years are available in our <a href="/impact" className="text-[#3d3e65] underline">impact report</a>.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}