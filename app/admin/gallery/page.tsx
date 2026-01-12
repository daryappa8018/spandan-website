// app/admin/gallery/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getDriveThumbnail } from '@/lib/google-drive';

interface Photo {
  id: string;
  driveImageUrl: string;
  category: string;
  referenceId: string | null;
  referenceName: string | null;
  year: number;
  caption: string | null;
  published: boolean;
  order: number;
  createdAt: string;
}

export default function AdminGalleryPage() {
  const router = useRouter();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [publishedFilter, setPublishedFilter] = useState('all');

  useEffect(() => {
    fetchPhotos();
  }, [categoryFilter, publishedFilter]);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (categoryFilter !== 'all') params.set('category', categoryFilter);
      if (publishedFilter !== 'all') params.set('published', publishedFilter);
      
      const res = await fetch(`/api/admin/gallery?${params}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setPhotos(data.photos || []);
    } catch (err) {
      console.error('Error fetching photos:', err);
    } finally {
      setLoading(false);
    }
  };

  const togglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !currentStatus }),
      });

      if (!res.ok) throw new Error('Failed to update');
      fetchPhotos();
    } catch (err) {
      alert('Failed to update photo status');
    }
  };

  const deletePhoto = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;

    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete');
      fetchPhotos();
    } catch (err) {
      alert('Failed to delete photo');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gallery Management</h1>
        <button
          onClick={() => router.push('/admin/gallery/new')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add Photo
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Categories</option>
              <option value="EVENT">Event</option>
              <option value="TEAM">Team</option>
              <option value="PROJECT">Project</option>
              <option value="GENERAL">General</option>
              <option value="ACHIEVEMENT">Achievement</option>
              <option value="ACTIVITY">Activity</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={publishedFilter}
              onChange={(e) => setPublishedFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All</option>
              <option value="true">Published</option>
              <option value="false">Unpublished</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-blue-600">{photos.length}</div>
          <div className="text-sm text-gray-600">Total Photos</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-green-600">
            {photos.filter(p => p.published).length}
          </div>
          <div className="text-sm text-gray-600">Published</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-orange-600">
            {photos.filter(p => !p.published).length}
          </div>
          <div className="text-sm text-gray-600">Unpublished</div>
        </div>
      </div>

      {/* Photos Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
        </div>
      ) : photos.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No photos found</p>
          <button
            onClick={() => router.push('/admin/gallery/new')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add First Photo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div key={photo.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={getDriveThumbnail(photo.driveImageUrl, 'medium')}
                  alt={photo.caption || 'Photo'}
                  fill
                  className="object-cover"
                  unoptimized
                />
                {!photo.published && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                    Unpublished
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500">
                    {photo.category}
                  </span>
                  <span className="text-xs text-gray-500">{photo.year}</span>
                </div>
                {photo.referenceName && (
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    {photo.referenceName}
                  </p>
                )}
                {photo.caption && (
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {photo.caption}
                  </p>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/admin/gallery/${photo.id}/edit`)}
                    className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => togglePublished(photo.id, photo.published)}
                    className={`flex-1 px-3 py-2 rounded text-sm ${
                      photo.published
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                    }`}
                  >
                    {photo.published ? 'Published' : 'Publish'}
                  </button>
                  <button
                    onClick={() => deletePhoto(photo.id)}
                    className="px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
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
  );
}
