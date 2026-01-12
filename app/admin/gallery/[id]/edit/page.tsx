// app/admin/gallery/[id]/edit/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isValidDriveUrl, getDriveImageUrl } from '@/lib/google-drive';
import Image from 'next/image';

export default function EditGalleryPhotoPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [events, setEvents] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    driveImageUrl: '',
    category: 'GENERAL',
    referenceId: '',
    referenceName: '',
    year: new Date().getFullYear(),
    caption: '',
    published: true,
    order: 0,
  });

  useEffect(() => {
    fetchPhoto();
    fetchReferences();
  }, []);

  const fetchPhoto = async () => {
    try {
      const res = await fetch(`/api/admin/gallery/${params.id}`);
      if (!res.ok) throw new Error('Failed to fetch photo');
      const data = await res.json();
      setFormData({
        driveImageUrl: data.photo.driveImageUrl,
        category: data.photo.category,
        referenceId: data.photo.referenceId || '',
        referenceName: data.photo.referenceName || '',
        year: data.photo.year,
        caption: data.photo.caption || '',
        published: data.photo.published,
        order: data.photo.order,
      });
      setPreviewUrl(getDriveImageUrl(data.photo.driveImageUrl));
    } catch (err) {
      alert('Failed to load photo');
      router.push('/admin/gallery');
    } finally {
      setLoading(false);
    }
  };

  const fetchReferences = async () => {
    try {
      const [eventsRes, projectsRes, teamRes] = await Promise.all([
        fetch('/api/admin/events'),
        fetch('/api/admin/projects'),
        fetch('/api/admin/team'),
      ]);

      if (eventsRes.ok) {
        const eventsData = await eventsRes.json();
        setEvents(eventsData.events || []);
      }
      if (projectsRes.ok) {
        const projectsData = await projectsRes.json();
        setProjects(projectsData.projects || []);
      }
      if (teamRes.ok) {
        const teamData = await teamRes.json();
        setTeamMembers(teamData.members || []);
      }
    } catch (err) {
      console.error('Error fetching references:', err);
    }
  };

  const handleDriveUrlChange = (url: string) => {
    setFormData({ ...formData, driveImageUrl: url });
    if (isValidDriveUrl(url)) {
      setPreviewUrl(getDriveImageUrl(url));
    } else {
      setPreviewUrl('');
    }
  };

  const handleReferenceChange = (referenceId: string) => {
    let referenceName = '';
    
    if (referenceId) {
      if (formData.category === 'EVENT') {
        const event = events.find(e => e.id === referenceId);
        referenceName = event?.title || '';
      } else if (formData.category === 'PROJECT') {
        const project = projects.find(p => p.id === referenceId);
        referenceName = project?.title || '';
      } else if (formData.category === 'TEAM') {
        const member = teamMembers.find(m => m.id === referenceId);
        referenceName = member?.name || '';
      }
    }

    setFormData({ ...formData, referenceId, referenceName });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidDriveUrl(formData.driveImageUrl)) {
      alert('Please enter a valid Google Drive URL');
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(`/api/admin/gallery/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to update photo');
      }

      router.push('/admin/gallery');
    } catch (err: any) {
      alert(err.message);
      setSaving(false);
    }
  };

  const getReferenceOptions = () => {
    switch (formData.category) {
      case 'EVENT':
        return events.map(e => ({ id: e.id, name: e.title }));
      case 'PROJECT':
        return projects.map(p => ({ id: p.id, name: p.title }));
      case 'TEAM':
        return teamMembers.map(m => ({ id: m.id, name: m.name }));
      default:
        return [];
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading photo...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900 mb-4"
        >
          ← Back to Gallery
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Edit Photo</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Google Drive URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Google Drive Image URL *
              </label>
              <input
                type="url"
                value={formData.driveImageUrl}
                onChange={(e) => handleDriveUrlChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value, referenceId: '', referenceName: '' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="GENERAL">General</option>
                <option value="EVENT">Event</option>
                <option value="TEAM">Team</option>
                <option value="PROJECT">Project</option>
                <option value="ACHIEVEMENT">Achievement</option>
                <option value="ACTIVITY">Activity</option>
              </select>
            </div>

            {/* Reference Selection */}
            {['EVENT', 'PROJECT', 'TEAM'].includes(formData.category) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link to {formData.category}
                </label>
                <select
                  value={formData.referenceId}
                  onChange={(e) => handleReferenceChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">None</option>
                  {getReferenceOptions().map((ref) => (
                    <option key={ref.id} value={ref.id}>
                      {ref.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year *
              </label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                min="2000"
                max="2100"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Caption */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Caption
              </label>
              <textarea
                value={formData.caption}
                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Order */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Published */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="published" className="ml-2 text-sm text-gray-700">
                Published
              </label>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
          {previewUrl && (
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
