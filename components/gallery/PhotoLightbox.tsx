// components/gallery/PhotoLightbox.tsx
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getDriveImageUrl } from '@/lib/google-drive';

interface Photo {
  id: string;
  driveImageUrl: string;
  caption?: string | null;
  referenceName?: string | null;
  year: number;
}

interface PhotoLightboxProps {
  photos: Photo[];
  initialIndex: number;
  onClose: () => void;
}

export default function PhotoLightbox({ photos, initialIndex, onClose }: PhotoLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // Prevent scrolling

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const currentPhoto = photos[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 z-10"
        aria-label="Close lightbox"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Photo counter */}
      <div className="absolute top-4 left-4 text-white text-lg z-10">
        {currentIndex + 1} / {photos.length}
      </div>

      {/* Main image */}
      <div className="relative w-full h-full max-w-7xl max-h-screen p-4 md:p-8 flex flex-col items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={getDriveImageUrl(currentPhoto.driveImageUrl)}
            alt={currentPhoto.caption || `Photo ${currentIndex + 1}`}
            fill
            className="object-contain"
            unoptimized
            priority
          />
        </div>

        {/* Caption */}
        {(currentPhoto.caption || currentPhoto.referenceName) && (
          <div className="mt-4 text-center text-white max-w-2xl">
            <p className="text-lg">{currentPhoto.caption || currentPhoto.referenceName}</p>
            <p className="text-sm text-gray-400 mt-1">{currentPhoto.year}</p>
          </div>
        )}
      </div>

      {/* Navigation arrows */}
      {photos.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-colors"
            aria-label="Previous photo"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-colors"
            aria-label="Next photo"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Click outside to close */}
      <div
        className="absolute inset-0 -z-10"
        onClick={onClose}
      />
    </div>
  );
}
