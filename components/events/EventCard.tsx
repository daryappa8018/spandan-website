// components/events/EventCard.tsx
// Timeline-style event card component
// Used on events listing page

import { EventData, EventCategory } from '@/lib/types';

interface EventCardProps {
  event: EventData;
  categoryLabel: string;
}

export default function EventCard({ event, categoryLabel }: EventCardProps) {
  return (
    <div className="flex gap-8">
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
            {categoryLabel}
          </p>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          {event.summary}
        </p>

        {/* Metrics - simple inline list */}
        <div className="flex flex-wrap gap-4 mb-4">
          {event.metrics.map((metric, idx) => (
            <span
              key={idx}
              className="text-xs text-slate-600 bg-slate-50 px-3 py-1 rounded"
            >
              {metric}
            </span>
          ))}
        </div>

        <a
          href={`/events/${event.id}`}
          className="text-sm text-[#3d3e65] underline hover:text-slate-900 transition-colors"
        >
          View full details →
        </a>
      </div>
    </div>
  );
}

// ================================================================

// components/events/EventList.tsx
// Container for multiple event cards with category filtering

interface EventListProps {
  events: EventData[];
  selectedCategory?: EventCategory | 'all';
  onCategoryChange?: (category: EventCategory | 'all') => void;
}

export function EventList({
  events,
  selectedCategory = 'all',
  onCategoryChange
}: EventListProps) {
  const categories = [
    { id: 'all', label: 'All Events' },
    { id: 'blood-donation', label: 'Blood Donation Camps' },
    { id: 'village-camp', label: 'Village Camps' },
    { id: 'health-checkup', label: 'Health Checkup Camps' },
    { id: 'donation-drive', label: 'Donation Drives' },
    { id: 'short-event', label: 'Short Events' }
  ];

  const getCategoryLabel = (categoryId: string): string => {
    return categories.find(c => c.id === categoryId)?.label || categoryId;
  };

  return (
    <div>
      {/* Category Filter - Simple tabs */}
      {onCategoryChange && (
        <div className="border-b border-slate-200 mb-12">
          <div className="flex gap-6 overflow-x-auto">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id as EventCategory | 'all')}
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
      )}

      {/* Events List */}
      {events.length === 0 ? (
        <p className="text-sm text-slate-500">No events found in this category.</p>
      ) : (
        <div className="space-y-12">
          {events.map(event => (
            <EventCard
              key={event.id}
              event={event}
              categoryLabel={getCategoryLabel(event.category)}
            />
          ))}
        </div>
      )}
    </div>
  );
}