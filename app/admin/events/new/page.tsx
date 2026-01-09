// app/admin/events/new/page.tsx
// Create new event form

'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { FormField } from '@/components/admin/FormField';

export default function NewEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Basic event info
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: '',
    month: '',
    year: new Date().getFullYear(),
    summary: '',
    slug: '',
    published: true,
  });

  // Metrics (simple list)
  const [metrics, setMetrics] = useState<string[]>(['']);

  // Event details (optional)
  const [hasDetails, setHasDetails] = useState(false);
  const [details, setDetails] = useState({
    location: '',
    duration: '',
    context: '',
    goal: '',
    target: '',
    preparation: [''],
    process: [''],
    team: '',
    volunteers: '',
    impact: '',
    challenges: '',
    learnings: '',
    partners: [''],
    photosNote: '',
    dataNote: '',
  });

  const [outcomeMetrics, setOutcomeMetrics] = useState<Array<{ key: string; value: string }>>([
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

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const addArrayField = (field: 'metrics' | 'preparation' | 'process' | 'partners') => {
    if (field === 'metrics') {
      setMetrics([...metrics, '']);
    } else {
      setDetails((prev) => ({
        ...prev,
        [field]: [...prev[field], ''],
      }));
    }
  };

  const updateArrayField = (
    field: 'metrics' | 'preparation' | 'process' | 'partners',
    index: number,
    value: string
  ) => {
    if (field === 'metrics') {
      const newMetrics = [...metrics];
      newMetrics[index] = value;
      setMetrics(newMetrics);
    } else {
      setDetails((prev) => {
        const newArray = [...prev[field]];
        newArray[index] = value;
        return { ...prev, [field]: newArray };
      });
    }
  };

  const removeArrayField = (field: 'metrics' | 'preparation' | 'process' | 'partners', index: number) => {
    if (field === 'metrics') {
      setMetrics(metrics.filter((_, i) => i !== index));
    } else {
      setDetails((prev) => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index),
      }));
    }
  };

  const addOutcomeMetric = () => {
    setOutcomeMetrics([...outcomeMetrics, { key: '', value: '' }]);
  };

  const updateOutcomeMetric = (index: number, field: 'key' | 'value', value: string) => {
    const newMetrics = [...outcomeMetrics];
    newMetrics[index][field] = value;
    setOutcomeMetrics(newMetrics);
  };

  const removeOutcomeMetric = (index: number) => {
    setOutcomeMetrics(outcomeMetrics.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        metrics: metrics.filter((m) => m.trim()),
        details: hasDetails
          ? {
              ...details,
              preparation: details.preparation.filter((p) => p.trim()),
              process: details.process.filter((p) => p.trim()),
              partners: details.partners.filter((p) => p.trim()),
              outcomeMetrics: outcomeMetrics
                .filter((m) => m.key && m.value)
                .reduce((acc, m) => ({ ...acc, [m.key]: m.value }), {}),
            }
          : null,
      };

      const response = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create event');
      }

      router.push('/admin/events');
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
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">Create New Event</h1>
          <p className="text-slate-600">Add a new event to the website.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Basic Information</h2>
              <div className="space-y-4">
                <FormField
                  label="Event Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Blood Donation Camp - Campus"
                />

                <FormField
                  label="Category"
                  name="category"
                  type="select"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  options={[
                    { value: 'BLOOD_DONATION', label: 'Blood Donation Camp' },
                    { value: 'VILLAGE_CAMP', label: 'Village Camp' },
                    { value: 'HEALTH_CHECKUP', label: 'Health Checkup Camp' },
                    { value: 'DONATION_DRIVE', label: 'Donation Drive' },
                    { value: 'SHORT_EVENT', label: 'Short Event' },
                  ]}
                />

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    label="Date (display)"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    placeholder="e.g., November 2024"
                  />
                  <FormField
                    label="Month (short)"
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Nov"
                  />
                  <FormField
                    label="Year"
                    name="year"
                    type="number"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  />
                </div>

                <FormField
                  label="Summary"
                  name="summary"
                  type="textarea"
                  value={formData.summary}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="Brief description for event listing..."
                />

                <FormField
                  label="URL Slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  helpText="Auto-generated from title. Used in URL: /events/your-slug"
                />

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="published" className="text-sm text-slate-700">
                    Publish immediately
                  </label>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-base font-semibold text-slate-900 mb-4">Metrics (Quick Stats)</h3>
              <div className="space-y-2">
                {metrics.map((metric, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={metric}
                      onChange={(e) => updateArrayField('metrics', index, e.target.value)}
                      placeholder="e.g., 82 donors"
                      className="flex-1 px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3d3e65]"
                    />
                    {metrics.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField('metrics', index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField('metrics')}
                  className="text-sm text-[#3d3e65] hover:underline"
                >
                  + Add Metric
                </button>
              </div>
            </div>

            {/* Detailed Documentation Toggle */}
            <div className="border-t border-slate-200 pt-6">
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  id="hasDetails"
                  checked={hasDetails}
                  onChange={(e) => setHasDetails(e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="hasDetails" className="text-base font-semibold text-slate-900">
                  Add Detailed Documentation (Optional)
                </label>
              </div>
              <p className="text-sm text-slate-600">
                Include full event details: objectives, execution, outcomes, partners, etc.
              </p>
            </div>

            {/* Detailed Documentation (conditional) */}
            {hasDetails && (
              <div className="space-y-6 border-t border-slate-200 pt-6">
                <h2 className="text-lg font-semibold text-slate-900">Detailed Documentation</h2>

                {/* Location & Duration */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="Location"
                    name="location"
                    value={details.location}
                    onChange={handleDetailsChange}
                    placeholder="e.g., College Campus, Main Auditorium"
                  />
                  <FormField
                    label="Duration"
                    name="duration"
                    value={details.duration}
                    onChange={handleDetailsChange}
                    placeholder="e.g., 9:00 AM - 4:00 PM"
                  />
                </div>

                {/* Objective */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">Objective</h3>
                  <div className="space-y-4">
                    <FormField
                      label="Context"
                      name="context"
                      type="textarea"
                      value={details.context}
                      onChange={handleDetailsChange}
                      rows={3}
                    />
                    <FormField
                      label="Goal"
                      name="goal"
                      type="textarea"
                      value={details.goal}
                      onChange={handleDetailsChange}
                      rows={2}
                    />
                    <FormField
                      label="Target"
                      name="target"
                      value={details.target}
                      onChange={handleDetailsChange}
                    />
                  </div>
                </div>

                {/* Execution - Preparation */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">Execution - Preparation Steps</h3>
                  <div className="space-y-2">
                    {details.preparation.map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => updateArrayField('preparation', index, e.target.value)}
                          placeholder="Preparation step..."
                          className="flex-1 px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3d3e65]"
                        />
                        {details.preparation.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayField('preparation', index)}
                            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayField('preparation')}
                      className="text-sm text-[#3d3e65] hover:underline"
                    >
                      + Add Step
                    </button>
                  </div>
                </div>

                {/* Execution - Process */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">Execution - Process</h3>
                  <div className="space-y-2">
                    {details.process.map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => updateArrayField('process', index, e.target.value)}
                          placeholder="Process step..."
                          className="flex-1 px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3d3e65]"
                        />
                        {details.process.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayField('process', index)}
                            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayField('process')}
                      className="text-sm text-[#3d3e65] hover:underline"
                    >
                      + Add Step
                    </button>
                  </div>
                </div>

                {/* Team Info */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="Team"
                    name="team"
                    value={details.team}
                    onChange={handleDetailsChange}
                    placeholder="e.g., 12 Spandan members + 8 medical staff"
                  />
                  <FormField
                    label="Volunteers"
                    name="volunteers"
                    value={details.volunteers}
                    onChange={handleDetailsChange}
                    placeholder="e.g., 12 student volunteers"
                  />
                </div>

                {/* Outcome Metrics */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">Outcome Metrics</h3>
                  <div className="space-y-2">
                    {outcomeMetrics.map((metric, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={metric.key}
                          onChange={(e) => updateOutcomeMetric(index, 'key', e.target.value)}
                          placeholder="Key (e.g., registrations)"
                          className="w-1/3 px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3d3e65]"
                        />
                        <input
                          type="text"
                          value={metric.value}
                          onChange={(e) => updateOutcomeMetric(index, 'value', e.target.value)}
                          placeholder="Value (e.g., 94)"
                          className="flex-1 px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3d3e65]"
                        />
                        {outcomeMetrics.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeOutcomeMetric(index)}
                            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addOutcomeMetric}
                      className="text-sm text-[#3d3e65] hover:underline"
                    >
                      + Add Metric
                    </button>
                  </div>
                </div>

                {/* Outcome Text Fields */}
                <FormField
                  label="Impact"
                  name="impact"
                  type="textarea"
                  value={details.impact}
                  onChange={handleDetailsChange}
                  rows={3}
                />
                <FormField
                  label="Challenges"
                  name="challenges"
                  type="textarea"
                  value={details.challenges}
                  onChange={handleDetailsChange}
                  rows={2}
                />
                <FormField
                  label="Learnings"
                  name="learnings"
                  type="textarea"
                  value={details.learnings}
                  onChange={handleDetailsChange}
                  rows={2}
                />

                {/* Partners */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">Partner Organizations</h3>
                  <div className="space-y-2">
                    {details.partners.map((partner, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={partner}
                          onChange={(e) => updateArrayField('partners', index, e.target.value)}
                          placeholder="Partner organization name..."
                          className="flex-1 px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3d3e65]"
                        />
                        {details.partners.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayField('partners', index)}
                            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayField('partners')}
                      className="text-sm text-[#3d3e65] hover:underline"
                    >
                      + Add Partner
                    </button>
                  </div>
                </div>

                {/* Documentation Notes */}
                <FormField
                  label="Photos Note"
                  name="photosNote"
                  type="textarea"
                  value={details.photosNote}
                  onChange={handleDetailsChange}
                  rows={2}
                  placeholder="e.g., Event photographs available with donor consent"
                />
                <FormField
                  label="Data Note"
                  name="dataNote"
                  type="textarea"
                  value={details.dataNote}
                  onChange={handleDetailsChange}
                  rows={2}
                  placeholder="e.g., Donor database maintained confidentially"
                />
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6 border-t border-slate-200">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-[#3d3e65] text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Event'}
              </button>
              <a
                href="/admin/events"
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