// app/admin/team/page.tsx
// Admin team management - list all team members

import { requireEditor } from '@/lib/auth-utils';
import { prisma } from '@/lib/prisma';
import AdminLayout from '@/components/admin/AdminLayout';
import { DeleteTeamMemberButton } from '@/components/admin/DeleteTeamMemberButton';

export const dynamic = 'force-dynamic';

export default async function AdminTeamPage() {
  await requireEditor();

  const teamMembers = await prisma.teamMember.findMany({
    orderBy: [{ category: 'asc' }, { order: 'asc' }],
  });

  const membersByCategory = teamMembers.reduce((acc, member) => {
    if (!acc[member.category]) {
      acc[member.category] = [];
    }
    acc[member.category].push(member);
    return acc;
  }, {} as Record<string, typeof teamMembers>);

  const categoryLabels: Record<string, string> = {
    LEADERSHIP: 'Leadership',
    COORDINATION: 'Coordination Team',
    CORE_MEMBER: 'Core Members',
    ADVISOR: 'Faculty Advisors',
  };

  const categoryOrder = ['LEADERSHIP', 'COORDINATION', 'CORE_MEMBER', 'ADVISOR'];

  return (
    <AdminLayout>
      <div>
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900 mb-2">
              Team Management
            </h1>
            <p className="text-slate-600">
              Manage team members across all categories.
            </p>
          </div>
          <a
            href="/admin/team/new"
            className="bg-[#3d3e65] text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors"
          >
            + Add Team Member
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-sm text-slate-600 mb-1">Total Members</p>
            <p className="text-2xl font-semibold text-slate-900">
              {teamMembers.length}
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-sm text-slate-600 mb-1">Leadership</p>
            <p className="text-2xl font-semibold text-slate-900">
              {membersByCategory.LEADERSHIP?.length || 0}
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-sm text-slate-600 mb-1">Core Members</p>
            <p className="text-2xl font-semibold text-slate-900">
              {membersByCategory.CORE_MEMBER?.length || 0}
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-sm text-slate-600 mb-1">Published</p>
            <p className="text-2xl font-semibold text-slate-900">
              {teamMembers.filter((m) => m.published).length}
            </p>
          </div>
        </div>

        {/* Team List by Category */}
        {teamMembers.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No Team Members Yet
            </h3>
            <p className="text-slate-600 mb-6">
              Get started by adding your first team member.
            </p>
            <a
              href="/admin/team/new"
              className="inline-block bg-[#3d3e65] text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors"
            >
              Add First Member
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {categoryOrder.map((category) => {
              const members = membersByCategory[category];
              if (!members || members.length === 0) return null;

              return (
                <div
                  key={category}
                  className="bg-white border border-slate-200 rounded-lg"
                >
                  {/* Category Header */}
                  <div className="border-b border-slate-200 px-6 py-4">
                    <h2 className="text-xl font-semibold text-slate-900">
                      {categoryLabels[category]}
                      <span className="text-sm font-normal text-slate-500 ml-3">
                        {members.length} {members.length === 1 ? 'member' : 'members'}
                      </span>
                    </h2>
                  </div>

                  {/* Members Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase">
                            Name
                          </th>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase">
                            Role
                          </th>
                          {category !== 'ADVISOR' && (
                            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase">
                              Year
                            </th>
                          )}
                          <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase">
                            Department
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
                        {members.map((member) => (
                          <tr
                            key={member.id}
                            className="border-b border-slate-100 hover:bg-slate-50"
                          >
                            <td className="px-6 py-4">
                              <p className="text-sm font-medium text-slate-900">
                                {member.name}
                              </p>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-sm text-slate-700">{member.role}</p>
                            </td>
                            {category !== 'ADVISOR' && (
                              <td className="px-6 py-4">
                                <p className="text-sm text-slate-700">{member.year}</p>
                              </td>
                            )}
                            <td className="px-6 py-4">
                              <p className="text-sm text-slate-700">{member.department}</p>
                            </td>
                            <td className="px-6 py-4">
                              {member.published ? (
                                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                                  Published
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-800">
                                  Hidden
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <a
                                  href={`/admin/team/${member.id}/edit`}
                                  className="text-sm text-[#3d3e65] hover:underline"
                                >
                                  Edit
                                </a>
                                <span className="text-slate-300">|</span>
                                <DeleteTeamMemberButton
                                  memberId={member.id}
                                  memberName={member.name}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Reorder Note */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            💡 <strong>Tip:</strong> Team members are displayed in the order you set. 
            Edit a member to change their display order.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}