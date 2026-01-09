// app/admin/team/[id]/edit/page.tsx
// Edit existing team member

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { FormField } from '@/components/admin/FormField';

export default function EditTeamMemberPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
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

  // Fetch existing member data
  useEffect(() => {
    fetch(`/api/admin/team/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          name: data.name,
          role: data.role,
          category: data.category,
          year: data.year || '',
          department: data.department,
          order: data.order,
          published: data.published,
        });
        setFetching(false);
      })
      .catch(() => {
        setError('Failed to load team member');
        setFetching(false);
      });
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/admin/team/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          order: parseInt(String(formData.order)),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update team member');
      }

      router.push('/admin/team');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const isFaculty = formData.category === 'ADVISOR';

  if (fetching) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-slate-600">Loading...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">
            Edit Team Member
          </h1>
          <p className="text-slate-600">
            Update team member information.
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
            />

            {!isFaculty && (
              <FormField
                label="Year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required={!isFaculty}
                placeholder="e.g., B.Tech 3rd Year"
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
              helpText="Lower numbers appear first"
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
                {loading ? 'Saving...' : 'Save Changes'}
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