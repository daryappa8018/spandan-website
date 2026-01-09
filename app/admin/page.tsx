// app/admin/page.tsx
// Admin dashboard overview page

import { requireAuth } from '@/lib/auth-utils';
import { prisma } from '@/lib/prisma';
import AdminLayout from '@/components/admin/AdminLayout';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  // Require authentication
  const user = await requireAuth();

  // Fetch dashboard statistics
  const [
    totalEvents,
    totalProjects,
    totalTeamMembers,
    recentEvents,
    recentAuditLogs,
  ] = await Promise.all([
    prisma.event.count(),
    prisma.techProject.count(),
    prisma.teamMember.count(),
    prisma.event.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, category: true, createdAt: true },
    }),
    prisma.auditLog.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true, email: true } } },
    }),
  ]);

  return (
    <AdminLayout>
      <div>
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">
            Dashboard
          </h1>
          <p className="text-slate-600">
            Welcome back, {user.name}. Here's an overview of your website.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Events</p>
                <p className="text-3xl font-semibold text-slate-900">
                  {totalEvents}
                </p>
              </div>
              <div className="text-4xl">📅</div>
            </div>
            <a
              href="/admin/events"
              className="text-sm text-[#3d3e65] hover:underline mt-4 inline-block"
            >
              Manage events →
            </a>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Tech Projects</p>
                <p className="text-3xl font-semibold text-slate-900">
                  {totalProjects}
                </p>
              </div>
              <div className="text-4xl">💻</div>
            </div>
            <a
              href="/admin/projects"
              className="text-sm text-[#3d3e65] hover:underline mt-4 inline-block"
            >
              Manage projects →
            </a>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Team Members</p>
                <p className="text-3xl font-semibold text-slate-900">
                  {totalTeamMembers}
                </p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
            <a
              href="/admin/team"
              className="text-sm text-[#3d3e65] hover:underline mt-4 inline-block"
            >
              Manage team →
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Events */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Recent Events
            </h2>
            {recentEvents.length === 0 ? (
              <p className="text-sm text-slate-500">No events yet</p>
            ) : (
              <div className="space-y-3">
                {recentEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start justify-between border-b border-slate-100 pb-3 last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {event.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {event.category.replace('_', ' ')}
                      </p>
                    </div>
                    <a
                      href={`/admin/events/${event.id}/edit`}
                      className="text-xs text-[#3d3e65] hover:underline"
                    >
                      Edit
                    </a>
                  </div>
                ))}
              </div>
            )}
            <a
              href="/admin/events/new"
              className="text-sm text-[#3d3e65] hover:underline mt-4 inline-block"
            >
              + Add new event
            </a>
          </div>

          {/* Recent Activity */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Recent Activity
            </h2>
            {recentAuditLogs.length === 0 ? (
              <p className="text-sm text-slate-500">No recent activity</p>
            ) : (
              <div className="space-y-3">
                {recentAuditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="border-b border-slate-100 pb-3 last:border-0"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-slate-700">
                          <span className="font-medium">{log.user.name}</span>
                          {' '}
                          <span className="text-slate-500">
                            {log.action.toLowerCase()}d
                          </span>
                          {' '}
                          <span className="font-medium">
                            {log.entity.replace('_', ' ')}
                          </span>
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {new Date(log.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 bg-[#3d3e65] bg-opacity-5 border border-[#3d3e65] border-opacity-20 rounded-lg p-6">
          <h3 className="text-base font-semibold text-slate-900 mb-4">
            Quick Links
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href="/admin/events/new"
              className="text-sm text-[#3d3e65] hover:underline"
            >
              + Create Event
            </a>
            <a
              href="/admin/team/new"
              className="text-sm text-[#3d3e65] hover:underline"
            >
              + Add Team Member
            </a>
            <a
              href="/admin/projects/new"
              className="text-sm text-[#3d3e65] hover:underline"
            >
              + New Project
            </a>
            <a
              href="/admin/settings"
              className="text-sm text-[#3d3e65] hover:underline"
            >
              Site Settings
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}