// app/admin/gallery/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type PhotoCategory = 'EVENT' | 'GENERAL' | 'TEAM' | 'ACTIVITY' | 'ACHIEVEMENT';

interface GalleryPhoto {
  id: string;
  title: string;
  googleDriveId: string;
  googleDriveUrl: string;
  thumbnailUrl: string | null;
  eventId: string | null;
  category: PhotoCategory;
  uploadedDate: string;
  photoDate: string | null;
  published: boolean;
  order: number;
  event?: {
    title: string;
  };
}

interface Event {
  id: string;
  title: string;
}

export default function AdminGalleryPage() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState<'all' | PhotoCategory>('all');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    googleDriveUrl: '',
    eventId: '',
    category: 'GENERAL' as PhotoCategory,
    photoDate: '',
    published: true,
  });

  useEffect(() => {
    fetchPhotos();
    fetchEvents();
  }, []);

  const fetchPhotos = async () => {
    try {
      const res = await fetch('/api/admin/gallery');
      const data = await res.json();
      setPhotos(data.photos || []);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/admin/events');
      const data = await res.json();
      setEvents(data.events || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const extractDriveId = (url: string): string | null => {
    // Extract Google Drive file ID from various URL formats
    const patterns = [
      /\/file\/d\/([a-zA-Z0-9_-]+)/,
      /id=([a-zA-Z0-9_-]+)/,
      /\/open\?id=([a-zA-Z0-9_-]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }

    // Check if it's already just an ID
    if (url.match(/^[a-zA-Z0-9_-]+$/)) return url;

    return null;
  };

  const getDirectImageUrl = (driveId: string): string => {
    // Convert to direct image URL
    return `https://drive.google.com/uc?export=view&id=${driveId}`;
  };

  const getThumbnailUrl = (driveId: string): string => {
    return `https://drive.google.com/thumbnail?id=${driveId}&sz=w400`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const driveId = extractDriveId(formData.googleDriveUrl);
    if (!driveId) {
      alert('Invalid Google Drive URL. Please use a shareable link.');
      return;
    }

    try {
      const payload = {
        title: formData.title,
        googleDriveId: driveId,
        googleDriveUrl: getDirectImageUrl(driveId),
        thumbnailUrl: getThumbnailUrl(driveId),
        eventId: formData.eventId || null,
        category: formData.category,
        photoDate: formData.photoDate || null,
        published: formData.published,
      };

      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('Photo added successfully!');
        setShowAddForm(false);
        setFormData({
          title: '',
          googleDriveUrl: '',
          eventId: '',
          category: 'GENERAL',
          photoDate: '',
          published: true,
        });
        fetchPhotos();
      } else {
        const error = await res.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error adding photo:', error);
      alert('Failed to add photo');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;

    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('Photo deleted successfully!');
        fetchPhotos();
      } else {
        alert('Failed to delete photo');
      }
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  const togglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !currentStatus }),
      });

      if (res.ok) {
        fetchPhotos();
      }
    } catch (error) {
      console.error('Error updating photo:', error);
    }
  };

  const filteredPhotos = photos.filter(
    (photo) => filter === 'all' || photo.category === filter
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading gallery...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
            <p className="text-gray-600 mt-2">
              {photos.length} photo{photos.length !== 1 ? 's' : ''} in gallery
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            {showAddForm ? 'Cancel' : '+ Add Photo'}
          </button>
        </div>

        {/* Add Photo Form */}
        {showAddForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold mb-4">Add New Photo</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title / Description *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="e.g., Blood Donation Camp - Group Photo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Google Drive URL *</label>
                <input
                  type="text"
                  value={formData.googleDriveUrl}
                  onChange={(e) => setFormData({ ...formData, googleDriveUrl: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Paste Google Drive shareable link or file ID"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Make sure the file is set to "Anyone with the link can view"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as PhotoCategory })}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="GENERAL">General</option>
                    <option value="EVENT">Event</option>
                    <option value="TEAM">Team</option>
                    <option value="ACTIVITY">Activity</option>
                    <option value="ACHIEVEMENT">Achievement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Link to Event (Optional)</label>
                  <select
                    value={formData.eventId}
                    onChange={(e) => setFormData({ ...formData, eventId: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="">-- No Event --</option>
                    {events.map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Photo Date (Optional)</label>
                  <input
                    type="date"
                    value={formData.photoDate}
                    onChange={(e) => setFormData({ ...formData, photoDate: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="mr-2"
                  />
                  <label htmlFor="published" className="text-sm font-medium">
                    Publish immediately
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Add Photo
              </button>
            </form>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {['all', 'EVENT', 'GENERAL', 'TEAM', 'ACTIVITY', 'ACHIEVEMENT'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as typeof filter)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                filter === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat === 'all' ? 'All' : cat.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500">No photos found. Add your first photo!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo) => (
              <div key={photo.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={photo.thumbnailUrl || photo.googleDriveUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/images/placeholder.jpg';
                    }}
                  />
                  {!photo.published && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                      Unpublished
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{photo.title}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Category:</span> {photo.category}
                    </p>
                    {photo.event && (
                      <p>
                        <span className="font-medium">Event:</span> {photo.event.title}
                      </p>
                    )}
                    {photo.photoDate && (
                      <p>
                        <span className="font-medium">Date:</span>{' '}
                        {new Date(photo.photoDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => window.open(photo.googleDriveUrl, '_blank')}
                      className="flex-1 bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200"
                    >
                      View
                    </button>
                    <button
                      onClick={() => togglePublished(photo.id, photo.published)}
                      className={`flex-1 px-3 py-1 rounded text-sm ${
                        photo.published
                          ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {photo.published ? 'Hide' : 'Publish'}
                    </button>
                    <button
                      onClick={() => handleDelete(photo.id)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
