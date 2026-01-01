// app/admin/projects/new/page.tsx
// Create new tech project form

'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '../../AdminLayout';
import { FormField } from '../../EventCategoryBadge';

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    status: '',
    year: new Date().getFullYear().toString(),
    problem: '',
    approach: '',
    result: '',
    slug: '',
    published: true,
  });

  const [constraints, setConstraints] = useState<string[]>(['']);
  const [technologies, setTechnologies] = useState<string[]>(['']);
  const [metrics, setMetrics] = useState<Array<{ key: string; value: string }>>([
    { key: '', value: '' },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const addConstraint = () => {
    setConstraints([...constraints, '']);
  };

  const updateConstraint = (index: number, value: string) => {
    const newConstraints = [...constraints];
    newConstraints[index] = value;
    setConstraints(newConstraints);
  };

  const removeConstraint = (index: number) => {
    setConstraints(constraints.filter((_, i) => i !== index));
  };

  const addTechnology = () => {
    setTechnologies([...technologies, '']);
  };

  const updateTechnology = (index: number, value: string) => {
    const newTech = [...technologies];
    newTech[index] = value;
    setTechnologies(newTech);
  };

  const removeTechnology = (index: number) => {
    setTechnologies(technologies.filter((_, i) => i !== index));
  };

  const addMetric = () => {
    setMetrics([...metrics, { key: '', value: '' }]);
  };

  const updateMetric = (index: number, field: 'key' | 'value', value: string) => {
    const newMetrics = [...metrics];
    newMetrics[index][field] = value;
    setMetrics(newMetrics);
  };

  const removeMetric = (index: number) => {
    setMetrics(metrics.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        constraints: constraints.filter((c) => c.trim()),
        technologies: technologies.filter((t) => t.trim()),
        metrics: metrics
          .filter((m) => m.key && m.value)
          .reduce((acc, m) => ({ ...acc, [m.key]: m.value }), {}),
      };

      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create project');
      }

      router.push('/admin/projects');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">
            Create Tech Project
          </h1>
          <p className="text-slate-600">
            Document a new technical project with problem, approach, and results.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="space-y-6">
            {/* Basic Info */}
            <FormField
              label="Project Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., Blood Donor Database System"
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Status"
                name="status"
                type="select"
                value={formData.status}
                onChange={handleChange}
                required
                options={[
                  { value: 'ACTIVE', label: 'Active' },
                  { value: 'IN_DEVELOPMENT', label: 'In Development' },
                  { value: 'COMPLETED', label: 'Completed' },
                  { value: 'ARCHIVED', label: 'Archived' },
                ]}
              />
              <FormField
                label="Year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                placeholder="e.g., 2024 or 2023-2024"
              />
            </div>

            <FormField
              label="Problem Statement"
              name="problem"
              type="textarea"
              value={formData.problem}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Describe the problem this project solves..."
            />

            {/* Constraints */}
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3">
                Constraints <span className="text-red-500">*</span>
              </h3>
              <div className="space-y-2">
                {constraints.map((constraint, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={constraint}
                      onChange={(e) => updateConstraint(index, e.target.value)}
                      placeholder="Enter a constraint..."
                      className="flex-1 px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3d3e65]"
                    />
                    {constraints.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeConstraint(index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addConstraint}
                  className="text-sm text-[#3d3e65] hover:underline"
                >
                  + Add Constraint
                </button>
              </div>
            </div>

            <FormField
              label="Technical Approach"
              name="approach"
              type="textarea"
              value={formData.approach}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Describe how you approached solving the problem..."
            />

            {/* Technologies */}
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3">
                Technologies Used <span className="text-red-500">*</span>
              </h3>
              <div className="space-y-2">
                {technologies.map((tech, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) => updateTechnology(index, e.target.value)}
                      placeholder="e.g., React, Python, Firebase"
                      className="flex-1 px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3d3e65]"
                    />
                    {technologies.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTechnology(index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addTechnology}
                  className="text-sm text-[#3d3e65] hover:underline"
                >
                  + Add Technology
                </button>
              </div>
            </div>

            <FormField
              label="Result & Impact"
              name="result"
              type="textarea"
              value={formData.result}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Describe the results and impact of the project..."
            />

            {/* Metrics */}
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3">
                Metrics (Key-Value Pairs)
              </h3>
              <div className="space-y-2">
                {metrics.map((metric, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={metric.key}
                      onChange={(e) => updateMetric(index, 'key', e.target.value)}
                      placeholder="Key (e.g., donors)"
                      className="w-1/3 px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3d3e65]"
                    />
                    <input
                      type="text"
                      value={metric.value}
                      onChange={(e) => updateMetric(index, 'value', e.target.value)}
                      placeholder="Value (e.g., 180+)"
                      className="flex-1 px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3d3e65]"
                    />
                    {metrics.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMetric(index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addMetric}
                  className="text-sm text-[#3d3e65] hover:underline"
                >
                  + Add Metric
                </button>
              </div>
            </div>

            <FormField
              label="URL Slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              helpText="Auto-generated from title. Used in URL: /tech-projects/your-slug"
            />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) =>
                  setFormData({ ...formData, published: e.target.checked })
                }
                className="w-4 h-4"
              />
              <label htmlFor="published" className="text-sm text-slate-700">
                Publish immediately
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6 border-t border-slate-200">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-[#3d3e65] text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Project'}
              </button>
              <a
                href="/admin/projects"
                className="px-6 py-3 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </a>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}