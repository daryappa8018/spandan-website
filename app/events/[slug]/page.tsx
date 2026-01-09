// app/events/[slug]/page.tsx
// Individual event detail page - fetches from database

import { prisma } from '@/lib/prisma';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Make this a dynamic route - don't prerender at build time
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const event = await prisma.event.findUnique({
      where: { slug: params.slug },
    }).catch(() => null);

    if (!event) {
      return { title: 'Event Not Found | Spandan' };
    }

    return {
      title: `${event.title} | Spandan`,
      description: event.summary,
    };
  } catch (error) {
    return { title: 'Event | Spandan' };
  }
}

const categoryLabels: Record<string, string> = {
  BLOOD_DONATION: 'Blood Donation Camp',
  VILLAGE_CAMP: 'Village Camp',
  HEALTH_CHECKUP: 'Health Checkup Camp',
  DONATION_DRIVE: 'Donation Drive',
  SHORT_EVENT: 'Short Event',
};

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = await prisma.event.findUnique({
    where: { slug: params.slug, published: true },
    include: {
      metrics: { orderBy: { order: 'asc' } },
      details: { include: { metrics: true } },
    },
  });

  if (!event) {
    notFound();
  }

  const hasDetails = !!event.details;

  return (
    <div className="min-h-screen bg-white">
      <Header currentPath="/events" />

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
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">
            {categoryLabels[event.category] || event.category}
          </p>
          <h1 className="text-3xl font-semibold text-slate-900 mb-4">{event.title}</h1>
          
          <div className="flex flex-wrap gap-6 text-sm text-slate-600">
            <div>
              <span className="text-slate-500">Date:</span> {event.date}
            </div>
            {hasDetails && event.details.location && (
              <div>
                <span className="text-slate-500">Location:</span> {event.details.location}
              </div>
            )}
            {hasDetails && event.details.duration && (
              <div>
                <span className="text-slate-500">Duration:</span> {event.details.duration}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Summary (always shown) */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="max-w-3xl">
          <p className="text-base text-slate-700 leading-relaxed">{event.summary}</p>
          
          {/* Metrics */}
          {event.metrics.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-6">
              {event.metrics.map((metric) => (
                <span key={metric.id} className="text-xs text-slate-600 bg-slate-50 px-3 py-1 rounded">
                  {metric.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Detailed Documentation (conditional) */}
      {hasDetails && event.details && (
        <>
          {/* Objective Section */}
          <section className="max-w-6xl mx-auto px-6 pb-12">
            <div className="max-w-3xl">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Objective</h2>
              
              <div className="space-y-4">
                {event.details.context && (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-700 mb-2">Context</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{event.details.context}</p>
                  </div>
                )}
                
                {event.details.goal && (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-700 mb-2">Goal</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{event.details.goal}</p>
                  </div>
                )}
                
                {event.details.target && (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-700 mb-2">Target</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{event.details.target}</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Execution Section */}
          <section className="border-t border-slate-200 bg-slate-50 py-12">
            <div className="max-w-6xl mx-auto px-6">
              <div className="max-w-3xl">
                <h2 className="text-xl font-semibold text-slate-900 mb-6">Execution</h2>
                
                <div className="space-y-6">
                  {event.details.preparation.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-slate-700 mb-3">Preparation</h3>
                      <ul className="space-y-2">
                        {event.details.preparation.map((item, idx) => (
                          <li key={idx} className="text-sm text-slate-600 leading-relaxed pl-4 relative before:content-['—'] before:absolute before:left-0">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {event.details.process.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-slate-700 mb-3">Process</h3>
                      <ul className="space-y-2">
                        {event.details.process.map((item, idx) => (
                          <li key={idx} className="text-sm text-slate-600 leading-relaxed pl-4 relative before:content-['—'] before:absolute before:left-0">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    {event.details.team && (
                      <div>
                        <h3 className="text-sm font-semibold text-slate-700 mb-1">Team Size</h3>
                        <p className="text-sm text-slate-600">{event.details.team}</p>
                      </div>
                    )}
                    {event.details.volunteers && (
                      <div>
                        <h3 className="text-sm font-semibold text-slate-700 mb-1">Volunteers</h3>
                        <p className="text-sm text-slate-600">{event.details.volunteers}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Outcome Section */}
          <section className="max-w-6xl mx-auto px-6 py-12">
            <div className="max-w-3xl">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Outcome</h2>
              
              <div className="space-y-6">
                {event.details.metrics.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-700 mb-3">Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {event.details.metrics.map((metric) => (
                        <div key={metric.id} className="bg-slate-50 p-4 rounded">
                          <p className="text-xs text-slate-500 mb-1 capitalize">{metric.key.replace(/([A-Z])/g, ' $1').trim()}</p>
                          <p className="text-2xl font-semibold text-slate-900">{metric.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {event.details.impact && (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-700 mb-2">Impact</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{event.details.impact}</p>
                  </div>
                )}
                
                {event.details.challenges && (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-700 mb-2">Challenges</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{event.details.challenges}</p>
                  </div>
                )}
                
                {event.details.learnings && (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-700 mb-2">Learnings</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{event.details.learnings}</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Partners & Documentation */}
          {(event.details.partners.length > 0 || event.details.photosNote || event.details.dataNote) && (
            <section className="border-t border-slate-200 bg-slate-50 py-12">
              <div className="max-w-6xl mx-auto px-6">
                <div className="max-w-3xl">
                  <div className="grid md:grid-cols-2 gap-8">
                    {event.details.partners.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-slate-700 mb-3">Partner Organizations</h3>
                        <ul className="space-y-2">
                          {event.details.partners.map((partner, idx) => (
                            <li key={idx} className="text-sm text-slate-600">{partner}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {(event.details.photosNote || event.details.dataNote) && (
                      <div>
                        <h3 className="text-sm font-semibold text-slate-700 mb-3">Documentation</h3>
                        <div className="space-y-2 text-sm text-slate-600">
                          {event.details.photosNote && <p>{event.details.photosNote}</p>}
                          {event.details.dataNote && <p>{event.details.dataNote}</p>}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Navigation to other events */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="max-w-3xl">
          <a href="/events" className="text-sm text-slate-700 underline hover:text-[#3d3e65]">
            ← Back to all events
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}