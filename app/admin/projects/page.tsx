// app/admin/projects/page.tsx
// Admin projects management - list all tech projects

import { requireEditor } from '@/lib/auth-utils';
import { prisma } from '@/lib/prisma';
import AdminLayout from '@/components/admin/AdminLayout';
import { DeleteProjectButton } from '@/components/admin';

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
  await requireEditor();

  const projects = await prisma.techProject.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      technologies: true,
      constraints: true,
    },
  });

  const projectsByStatus = projects.reduce((acc, project) => {
    if (!acc[project.status]) {
      acc[project.status] = [];
    }
    acc[project.status].push(project);
    return acc;
  }, {} as Record<string, typeof projects>);

  const statusLabels: Record<string, string> = {
    ACTIVE: 'Active',
    IN_DEVELOPMENT: 'In Development',
    COMPLETED: 'Completed',
    ARCHIVED: 'Archived',
  };

  const statusColors: Record<string, string> = {
    ACTIVE: 'bg-green-100 text-green-800',
    IN_DEVELOPMENT: 'bg-blue-100 text-blue-800',
    COMPLETED: 'bg-slate-100 text-slate-800',
    ARCHIVED: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <AdminLayout>
      <div>
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900 mb-2">
              Tech Projects Management
            </h1>
            <p className="text-slate-600">
              Manage all technical projects and their documentation.
            </p>
          </div>
          <a
            href="/admin/projects/new"
            className="bg-[#3d3e65] text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors"
          >
            + Create Project
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-sm text-slate-600 mb-1">Total Projects</p>
            <p className="text-2xl font-semibold text-slate-900">
              {projects.length}
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-sm text-slate-600 mb-1">Active</p>
            <p className="text-2xl font-semibold text-slate-900">
              {projectsByStatus.ACTIVE?.length || 0}
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-sm text-slate-600 mb-1">In Development</p>
            <p className="text-2xl font-semibold text-slate-900">
              {projectsByStatus.IN_DEVELOPMENT?.length || 0}
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-sm text-slate-600 mb-1">Published</p>
            <p className="text-2xl font-semibold text-slate-900">
              {projects.filter((p) => p.published).length}
            </p>
          </div>
        </div>

        {/* Projects List */}
        {projects.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">💻</div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No Projects Yet
            </h3>
            <p className="text-slate-600 mb-6">
              Get started by creating your first tech project.
            </p>
            <a
              href="/admin/projects/new"
              className="inline-block bg-[#3d3e65] text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors"
            >
              Create First Project
            </a>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-lg">
            {/* Projects Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase">
                      Title
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase">
                      Status
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase">
                      Year
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase">
                      Technologies
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase">
                      Published
                    </th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-slate-600 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr
                      key={project.id}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {project.title}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {project.constraints.length} constraints • {project.technologies.length} tech
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                            statusColors[project.status]
                          }`}
                        >
                          {statusLabels[project.status]}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-700">{project.year}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech.id}
                              className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded"
                            >
                              {tech.name}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="text-xs text-slate-500">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {project.published ? (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                            Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-800">
                            No
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`/tech-projects/${project.slug}`}
                            target="_blank"
                            className="text-sm text-slate-600 hover:text-[#3d3e65]"
                            title="View on site"
                          >
                            View
                          </a>
                          <span className="text-slate-300">|</span>
                          <a
                            href={`/admin/projects/${project.id}/edit`}
                            className="text-sm text-[#3d3e65] hover:underline"
                          >
                            Edit
                          </a>
                          <span className="text-slate-300">|</span>
                          <DeleteProjectButton
                            projectId={project.id}
                            projectTitle={project.title}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}