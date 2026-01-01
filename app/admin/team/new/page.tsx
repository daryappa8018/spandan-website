// app/admin/team/new/page.tsx
// Add new team member form

'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '../../AdminLayout';
import { FormField } from '../../EventCategoryBadge';

export default function NewTeamMemberPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    category: '',
    year: '',
    department: '',
    order: 1,
    published: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          order: parseInt(String(formData.order)),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create team member');
      }

      router.push('/admin/team');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const isFaculty = formData.category === 'ADVISOR';

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">
            Add Team Member
          </h1>
          <p className="text-slate-600">
            Add a new member to your team.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="space-y-6">
            <FormField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Rahul Sharma"
            />

            <FormField
              label="Category"
              name="category"
              type="select"
              value={formData.category}
              onChange={handleChange}
              required
              options={[
                { value: 'LEADERSHIP', label: 'Leadership' },
                { value: 'COORDINATION', label: 'Coordination Team' },
                { value: 'CORE_MEMBER', label: 'Core Member' },
                { value: 'ADVISOR', label: 'Faculty Advisor' },
              ]}
            />

            <FormField
              label="Role/Position"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              placeholder={isFaculty ? 'e.g., Faculty Advisor' : 'e.g., President'}
              helpText={
                isFaculty
                  ? 'Title for faculty members'
                  : 'Position within the organization'
              }
            />

            {!isFaculty && (
              <FormField
                label="Year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required={!isFaculty}
                placeholder="e.g., B.Tech 3rd Year"
                helpText="Current academic year and program"
              />
            )}

            <FormField
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              placeholder={
                isFaculty
                  ? 'e.g., Computer Science & Engineering'
                  : 'e.g., Computer Science'
              }
            />

            <FormField
              label="Display Order"
              name="order"
              type="number"
              value={formData.order}
              onChange={handleChange}
              required
              helpText="Lower numbers appear first. Use this to control the order within the category."
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
                Display on website
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6 border-t border-slate-200">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-[#3d3e65] text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add Team Member'}
              </button>
              <a
                href="/admin/team"
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