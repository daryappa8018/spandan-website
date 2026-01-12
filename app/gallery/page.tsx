// app/gallery/page.tsx
'use client';

import { useEffect, useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import GalleryFilters, { FilterOptions } from '@/components/gallery/GalleryFilters';

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

export default function GalleryPage() {
  const [allPhotos, setAllPhotos] = useState<Photo[]>([]);
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract unique values for filters
  const categories = [...new Set(allPhotos.map((p) => p.category))];
  const years = [...new Set(allPhotos.map((p) => p.year))];
  const references = allPhotos
    .filter((p) => p.referenceName)
    .map((p) => ({ id: p.referenceId!, name: p.referenceName! }))
    .filter((ref, index, self) => self.findIndex((r) => r.id === ref.id) === index);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/gallery');
      if (!res.ok) throw new Error('Failed to fetch photos');
      const data = await res.json();
      setAllPhotos(data.photos || []);
      setFilteredPhotos(data.photos || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filters: FilterOptions) => {
    let filtered = [...allPhotos];

    if (filters.category !== 'all') {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    if (filters.year !== 'all') {
      filtered = filtered.filter((p) => p.year === parseInt(filters.year));
    }

    if (filters.reference !== 'all') {
      filtered = filtered.filter((p) => p.referenceId === filters.reference);
    }

    setFilteredPhotos(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PageHeader
          title="Photo Gallery"
          description="Capturing memories of our journey"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading photos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PageHeader
          title="Photo Gallery"
          description="Capturing memories of our journey"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Photo Gallery"
        description="Capturing memories of our journey"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-3xl font-bold text-blue-600 mb-1">{allPhotos.length}</div>
            <div className="text-sm text-gray-600">Total Photos</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-3xl font-bold text-green-600 mb-1">{categories.length}</div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-3xl font-bold text-purple-600 mb-1">{years.length}</div>
            <div className="text-sm text-gray-600">Years Covered</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-3xl font-bold text-orange-600 mb-1">{filteredPhotos.length}</div>
            <div className="text-sm text-gray-600">Filtered Results</div>
          </div>
        </div>

        {/* Filters */}
        {allPhotos.length > 0 && (
          <GalleryFilters
            categories={categories}
            years={years}
            references={references}
            onFilterChange={handleFilterChange}
          />
        )}

        {/* Gallery Grid */}
        {filteredPhotos.length > 0 ? (
          <GalleryGrid photos={filteredPhotos} columns={3} />
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">No photos match your filters</p>
            <p className="text-sm text-gray-400 mt-2">Try adjusting your filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
