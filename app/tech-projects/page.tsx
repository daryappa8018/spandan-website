// app/tech-projects/page.tsx
// Tech projects page - fetches from database

import { prisma } from '@/lib/prisma';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tech Projects | Spandan',
  description: 'Technical tools and systems we\'ve built to support our community work.',
};

export default async function TechProjectsPage() {
  // Fetch published projects from database
  const projects = await prisma.techProject.findMany({
    where: { published: true },
    include: {
      constraints: { orderBy: { order: 'asc' } },
      technologies: true,
      metrics: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-white">
      <Header currentPath="/tech-projects" />

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
                      {project.status.replace('_', ' ')}
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
                    {project.constraints.map((constraint) => (
                      <li key={constraint.id} className="text-sm text-slate-600 pl-4 relative before:content-['—'] before:absolute before:left-0">
                        {constraint.text}
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
                    {project.technologies.map((tech) => (
                      <span key={tech.id} className="text-xs px-3 py-1 bg-[#3d3e65] text-white rounded">
                        {tech.name}
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
                  {project.metrics.length > 0 && (
                    <div className="flex flex-wrap gap-6">
                      {project.metrics.map((metric) => (
                        <div key={metric.id}>
                          <p className="text-xs text-slate-500 mb-1 capitalize">
                            {metric.key.replace(/([A-Z])/g, ' $1').trim()}
                          </p>
                          <p className="text-base font-semibold text-slate-900">{metric.value}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
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

      <Footer />
    </div>
  );
}