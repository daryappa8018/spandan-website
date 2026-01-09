// app/admin/events/page.tsx
// Admin events management - list all events

import { requireEditor } from '@/lib/auth-utils';
import { prisma } from '@/lib/prisma';
import AdminLayout from '@/components/admin/AdminLayout';
import { EventCategoryBadge, DeleteEventButton } from '@/components/admin';

export const dynamic = 'force-dynamic';

export default async function AdminEventsPage() {
  await requireEditor();

  const events = await prisma.event.findMany({
    orderBy: [{ year: 'desc' }, { createdAt: 'desc' }],
    include: {
      metrics: true,
      details: true,
    },
  });

  const eventsByYear = events.reduce((acc, event) => {
    if (!acc[event.year]) {
      acc[event.year] = [];
    }
    acc[event.year].push(event);
    return acc;
  }, {} as Record<number, typeof events>);

  const years = Object.keys(eventsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <AdminLayout>
      <div>
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900 mb-2">
              Events Management
            </h1>
            <p className="text-slate-600">
              Manage all events, create new ones, and edit existing entries.
            </p>
          </div>
          <a
            href="/admin/events/new"
            className="bg-[#3d3e65] text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors"
          >
            + Create Event
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-sm text-slate-600 mb-1">Total Events</p>
            <p className="text-2xl font-semibold text-slate-900">
              {events.length}
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-sm text-slate-600 mb-1">Published</p>
            <p className="text-2xl font-semibold text-slate-900">
              {events.filter((e) => e.published).length}
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-sm text-slate-600 mb-1">With Details</p>
            <p className="text-2xl font-semibold text-slate-900">
              {events.filter((e) => e.details).length}
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-sm text-slate-600 mb-1">Years Active</p>
            <p className="text-2xl font-semibold text-slate-900">
              {years.length}
            </p>
          </div>
        </div>

        {/* Events List by Year */}
        {years.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No Events Yet
            </h3>
            <p className="text-slate-600 mb-6">
              Get started by creating your first event.
            </p>
            <a
              href="/admin/events/new"
              className="inline-block bg-[#3d3e65] text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors"
            >
              Create First Event
            </a>
          </div>
        ) : (
          <div className="space-y-8">
            {years.map((year) => (
              <div key={year} className="bg-white border border-slate-200 rounded-lg">
                {/* Year Header */}
                <div className="border-b border-slate-200 px-6 py-4">
                  <h2 className="text-xl font-semibold text-slate-900">
                    {year}
                    <span className="text-sm font-normal text-slate-500 ml-3">
                      {eventsByYear[year].length} events
                    </span>
                  </h2>
                </div>

                {/* Events Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase">
                          Title
                        </th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase">
                          Category
                        </th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase">
                          Date
                        </th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase">
                          Status
                        </th>
                        <th className="text-right px-6 py-3 text-xs font-semibold text-slate-600 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {eventsByYear[year].map((event) => (
                        <tr
                          key={event.id}
                          className="border-b border-slate-100 hover:bg-slate-50"
                        >
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-sm font-medium text-slate-900">
                                {event.title}
                              </p>
                              {event.details && (
                                <p className="text-xs text-slate-500 mt-1">
                                  Has detailed documentation
                                </p>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <EventCategoryBadge category={event.category} />
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-slate-700">{event.date}</p>
                          </td>
                          <td className="px-6 py-4">
                            {event.published ? (
                              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                                Published
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-800">
                                Draft
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <a
                                href={`/events/${event.slug}`}
                                target="_blank"
                                className="text-sm text-slate-600 hover:text-[#3d3e65]"
                                title="View on site"
                              >
                                View
                              </a>
                              <span className="text-slate-300">|</span>
                              <a
                                href={`/admin/events/${event.id}/edit`}
                                className="text-sm text-[#3d3e65] hover:underline"
                              >
                                Edit
                              </a>
                              <span className="text-slate-300">|</span>
                              <DeleteEventButton eventId={event.id} eventTitle={event.title} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}