// app/gallery/page.tsx
// Public photo gallery page

import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Photo Gallery | Spandan',
  description:
    'Browse photos from our events, activities, and memorable moments at Spandan - Socio-Technical Club',
};

export const dynamic = 'force-dynamic';

type PhotoCategory = 'EVENT' | 'GENERAL' | 'TEAM' | 'ACTIVITY' | 'ACHIEVEMENT';

interface GalleryPhoto {
  id: string;
  title: string;
  googleDriveUrl: string;
  thumbnailUrl: string | null;
  category: PhotoCategory;
  photoDate: Date | null;
  event: {
    title: string;
    slug: string;
  } | null;
}

async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  try {
    const photos = await prisma.galleryPhoto.findMany({
      where: {
        published: true,
      },
      include: {
        event: {
          select: {
            title: true,
            slug: true,
          },
        },
      },
      orderBy: [
        { photoDate: 'asc' }, // Earliest first as requested
        { uploadedDate: 'asc' },
      ],
    });

    return photos;
  } catch (error) {
    console.error('Error fetching gallery photos:', error);
    return [];
  }
}

function formatPhotoDate(date: Date | null): string {
  if (!date) return 'Date Unknown';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getCategoryLabel(category: PhotoCategory): string {
  const labels: Record<PhotoCategory, string> = {
    EVENT: 'Event',
    GENERAL: 'General',
    TEAM: 'Team',
    ACTIVITY: 'Activity',
    ACHIEVEMENT: 'Achievement',
  };
  return labels[category];
}

function getCategoryColor(category: PhotoCategory): string {
  const colors: Record<PhotoCategory, string> = {
    EVENT: 'bg-blue-100 text-blue-800',
    GENERAL: 'bg-gray-100 text-gray-800',
    TEAM: 'bg-purple-100 text-purple-800',
    ACTIVITY: 'bg-green-100 text-green-800',
    ACHIEVEMENT: 'bg-yellow-100 text-yellow-800',
  };
  return colors[category];
}

export default async function GalleryPage() {
  const photos = await getGalleryPhotos();

  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="Photo Gallery"
        description="Capturing moments that matter - our journey through photos"
      />

      <section className="py-16 px-4 max-w-7xl mx-auto">
        {photos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No photos available yet. Check back soon!
            </p>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-8 text-center">
              Showing {photos.length} photo{photos.length !== 1 ? 's' : ''} •
              Sorted by date (earliest first)
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Photo */}
                  <div className="relative h-64 bg-gray-200">
                    <img
                      src={photo.thumbnailUrl || photo.googleDriveUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = '/images/placeholder.jpg';
                      }}
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                      <a
                        href={photo.googleDriveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-4 py-2 rounded-lg font-medium transform scale-90 group-hover:scale-100 transition-all duration-300"
                      >
                        View Full Size
                      </a>
                    </div>

                    {/* Category Badge */}
                    <div
                      className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded ${getCategoryColor(
                        photo.category
                      )}`}
                    >
                      {getCategoryLabel(photo.category)}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {photo.title}
                    </h3>

                    {photo.event && (
                      <a
                        href={`/events/${photo.event.slug}`}
                        className="text-sm text-blue-600 hover:text-blue-700 hover:underline block mb-2"
                      >
                        From: {photo.event.title}
                      </a>
                    )}

                    <p className="text-xs text-gray-500">
                      {formatPhotoDate(photo.photoDate)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Instructions for admins (only visible in dev mode or to admins) */}
      {process.env.NODE_ENV === 'development' && (
        <section className="py-8 px-4 max-w-4xl mx-auto bg-blue-50 rounded-lg mb-16">
          <h3 className="text-lg font-bold text-blue-900 mb-2">
            📸 Admin: How to Add Photos
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
            <li>Upload photos to Google Drive</li>
            <li>
              Right-click photo → Share → Change to "Anyone with the link can
              view"
            </li>
            <li>Copy the shareable link</li>
            <li>Go to Admin Panel → Gallery → Add Photo</li>
            <li>Paste the link and fill in details</li>
          </ol>
        </section>
      )}
    </main>
  );
}
