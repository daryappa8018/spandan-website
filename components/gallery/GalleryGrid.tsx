// components/gallery/GalleryGrid.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { getDriveThumbnail, getDriveImageUrl } from '@/lib/google-drive';
import PhotoLightbox from './PhotoLightbox';

interface Photo {
  id: string;
  driveImageUrl: string;
  caption?: string | null;
  referenceName?: string | null;
  year: number;
}

interface GalleryGridProps {
  photos: Photo[];
  columns?: 2 | 3 | 4;
  showCaptions?: boolean;
}

export default function GalleryGrid({ 
  photos, 
  columns = 3,
  showCaptions = true 
}: GalleryGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!photos || photos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No photos found</p>
      </div>
    );
  }

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  return (
    <>
      <div className={`grid ${gridCols[columns]} gap-4`}>
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            onClick={() => openLightbox(index)}
            className="group relative aspect-square overflow-hidden rounded-lg bg-gray-200 hover:shadow-lg transition-shadow"
          >
            <Image
              src={getDriveThumbnail(photo.driveImageUrl, 'medium')}
              alt={photo.caption || `Photo ${index + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized
            />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors">
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg 
                  className="w-12 h-12 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" 
                  />
                </svg>
              </div>
            </div>

            {/* Caption overlay */}
            {showCaptions && (photo.caption || photo.referenceName) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <p className="text-white text-sm line-clamp-2">
                  {photo.caption || photo.referenceName}
                </p>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox for full-size viewing */}
      {lightboxOpen && (
        <PhotoLightbox
          photos={photos}
          initialIndex={selectedIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
