// components/gallery/PhotoCarousel.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { getDriveImageUrl } from '@/lib/google-drive';

interface Photo {
  id: string;
  driveImageUrl: string;
  caption?: string | null;
}

interface PhotoCarouselProps {
  photos: Photo[];
  autoPlay?: boolean;
  showCaptions?: boolean;
  className?: string;
}

export default function PhotoCarousel({ 
  photos, 
  autoPlay = false,
  showCaptions = true,
  className = ''
}: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!photos || photos.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No photos available</p>
      </div>
    );
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentPhoto = photos[currentIndex];

  return (
    <div className={`relative w-full ${className}`}>
      {/* Main Image */}
      <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
        <Image
          src={getDriveImageUrl(currentPhoto.driveImageUrl)}
          alt={currentPhoto.caption || `Photo ${currentIndex + 1}`}
          fill
          className="object-cover"
          unoptimized // Google Drive images work better unoptimized
          priority={currentIndex === 0}
        />

        {/* Navigation Arrows */}
        {photos.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
              aria-label="Previous photo"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
              aria-label="Next photo"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Photo Counter */}
        {photos.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {photos.length}
          </div>
        )}
      </div>

      {/* Caption */}
      {showCaptions && currentPhoto.caption && (
        <div className="mt-3 text-center text-gray-600">
          <p className="text-sm">{currentPhoto.caption}</p>
        </div>
      )}

      {/* Thumbnail Navigation */}
      {photos.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              onClick={() => goToSlide(index)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? 'border-blue-600 ring-2 ring-blue-200'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <Image
                src={getDriveImageUrl(photo.driveImageUrl)}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
