// INTEGRATION_EXAMPLES.md
# 🔗 Gallery System Integration Examples

## Quick Integration Guide

### 1. Event Detail Pages - Add Photo Carousel

**File:** `app/events/[slug]/page.tsx`

```tsx
import PhotoCarousel from '@/components/gallery/PhotoCarousel';
import { prisma } from '@/lib/prisma';

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  // ... existing event fetch code ...
  
  // Fetch photos for this event
  const eventPhotos = await prisma.galleryPhoto.findMany({
    where: {
      category: 'EVENT',
      referenceId: event.id,
      published: true,
    },
    orderBy: { order: 'asc' },
  });

  return (
    <div>
      {/* ... existing event details ... */}
      
      {/* Add photo section */}
      {eventPhotos.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Event Photos</h2>
          <PhotoCarousel 
            photos={eventPhotos}
            showCaptions={true}
          />
        </section>
      )}
    </div>
  );
}
```

---

### 2. Team Page - Add Team Photos Grid

**File:** `app/team/page.tsx`

```tsx
import GalleryGrid from '@/components/gallery/GalleryGrid';
import { prisma } from '@/lib/prisma';

export default async function TeamPage() {
  // Fetch team photos
  const teamPhotos = await prisma.galleryPhoto.findMany({
    where: {
      category: 'TEAM',
      published: true,
    },
    orderBy: [
      { year: 'desc' },
      { order: 'asc' },
    ],
    take: 12, // Limit to 12 photos
  });

  return (
    <div>
      {/* ... existing team content ... */}
      
      {/* Add team photos section */}
      {teamPhotos.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Team Moments</h2>
          <GalleryGrid 
            photos={teamPhotos}
            columns={4}
            showCaptions={false}
          />
          <div className="text-center mt-6">
            <a 
              href="/gallery?category=TEAM"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View All Team Photos →
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
```

---

### 3. Tech Project Detail - Add Project Carousel

**File:** `app/tech-projects/[slug]/page.tsx`

```tsx
import PhotoCarousel from '@/components/gallery/PhotoCarousel';

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  // ... existing project fetch ...
  
  const projectPhotos = await prisma.galleryPhoto.findMany({
    where: {
      category: 'PROJECT',
      referenceId: project.id,
      published: true,
    },
    orderBy: { order: 'asc' },
  });

  return (
    <div>
      {/* ... existing project details ... */}
      
      {projectPhotos.length > 0 && (
        <section className="mb-12">
          <h3 className="text-xl font-bold mb-4">Project Screenshots</h3>
          <PhotoCarousel photos={projectPhotos} />
        </section>
      )}
    </div>
  );
}
```

---

### 4. Homepage - Featured Photos

**File:** `app/page.tsx`

```tsx
import GalleryGrid from '@/components/gallery/GalleryGrid';

export default async function HomePage() {
  // Get recent highlights
  const featuredPhotos = await prisma.galleryPhoto.findMany({
    where: {
      published: true,
      category: { in: ['EVENT', 'ACHIEVEMENT'] },
    },
    orderBy: { createdAt: 'desc' },
    take: 6,
  });

  return (
    <div>
      {/* ... existing homepage content ... */}
      
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Recent Highlights
          </h2>
          <GalleryGrid 
            photos={featuredPhotos}
            columns={3}
          />
          <div className="text-center mt-8">
            <a 
              href="/gallery"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              View Full Gallery
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

### 5. Donation Drives - Before/After Photos

**File:** `app/donation-drives/page.tsx`

```tsx
import PhotoCarousel from '@/components/gallery/PhotoCarousel';

export default async function DonationDrivesPage() {
  const drivePhotos = await prisma.galleryPhoto.findMany({
    where: {
      category: 'ACTIVITY',
      referenceName: { contains: 'Donation' }, // Filter by name pattern
      published: true,
    },
    orderBy: { year: 'desc' },
  });

  return (
    <div>
      {/* ... existing content ... */}
      
      {drivePhotos.length > 0 && (
        <section>
          <h2>Donation Drive Moments</h2>
          <PhotoCarousel photos={drivePhotos} />
        </section>
      )}
    </div>
  );
}
```

---

## Advanced Patterns

### Pattern 1: Category-Specific Gallery Section

```tsx
async function getCategoryPhotos(category: string, limit = 8) {
  return await prisma.galleryPhoto.findMany({
    where: { category, published: true },
    orderBy: [{ year: 'desc' }, { order: 'asc' }],
    take: limit,
  });
}

// Use in any page
const eventPhotos = await getCategoryPhotos('EVENT');
const teamPhotos = await getCategoryPhotos('TEAM', 12);
```

### Pattern 2: Year-Based Photo Timeline

```tsx
async function getPhotosByYear(year: number) {
  return await prisma.galleryPhoto.findMany({
    where: { year, published: true },
    orderBy: { createdAt: 'desc' },
  });
}

// Show all photos from a specific year
const photos2024 = await getPhotosByYear(2024);
```

### Pattern 3: Related Photos Widget

```tsx
// Show photos from the same category
async function getRelatedPhotos(currentPhotoId: string, category: string, limit = 4) {
  return await prisma.galleryPhoto.findMany({
    where: {
      category,
      published: true,
      id: { not: currentPhotoId }, // Exclude current photo
    },
    take: limit,
    orderBy: { createdAt: 'desc' },
  });
}
```

---

## Client Component Pattern

For pages that need interactivity:

```tsx
'use client';

import { useEffect, useState } from 'react';
import PhotoCarousel from '@/components/gallery/PhotoCarousel';

export default function InteractiveGallery({ eventId }: { eventId: string }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/gallery?category=EVENT&referenceId=${eventId}`)
      .then(res => res.json())
      .then(data => {
        setPhotos(data.photos);
        setLoading(false);
      });
  }, [eventId]);

  if (loading) return <div>Loading photos...</div>;
  if (photos.length === 0) return null;

  return <PhotoCarousel photos={photos} />;
}
```

---

## Database Queries Cheat Sheet

```tsx
// Get all published photos
const all = await prisma.galleryPhoto.findMany({
  where: { published: true },
});

// Filter by category
const events = await prisma.galleryPhoto.findMany({
  where: { category: 'EVENT', published: true },
});

// Filter by year
const year2024 = await prisma.galleryPhoto.findMany({
  where: { year: 2024, published: true },
});

// Get photos for specific event
const eventPhotos = await prisma.galleryPhoto.findMany({
  where: {
    category: 'EVENT',
    referenceId: 'event-id-here',
    published: true,
  },
});

// Get recent photos
const recent = await prisma.galleryPhoto.findMany({
  where: { published: true },
  orderBy: { createdAt: 'desc' },
  take: 10,
});

// Count photos by category
const counts = await prisma.galleryPhoto.groupBy({
  by: ['category'],
  _count: { id: true },
  where: { published: true },
});
```

---

## Component Props Reference

### PhotoCarousel
```tsx
interface PhotoCarouselProps {
  photos: Photo[];
  autoPlay?: boolean;        // Default: false
  showCaptions?: boolean;    // Default: true
  className?: string;
}
```

### GalleryGrid
```tsx
interface GalleryGridProps {
  photos: Photo[];
  columns?: 2 | 3 | 4;       // Default: 3
  showCaptions?: boolean;    // Default: true
}
```

### GalleryFilters
```tsx
interface GalleryFiltersProps {
  categories: string[];
  years: number[];
  references: { name: string; id: string }[];
  onFilterChange: (filters: FilterOptions) => void;
  showReferenceFilter?: boolean;  // Default: true
}
```

---

## Styling Tips

### Custom Carousel Height
```tsx
<PhotoCarousel 
  photos={photos}
  className="h-96"  // or h-[500px]
/>
```

### Custom Grid Gap
```tsx
<div className="space-y-12">
  <GalleryGrid photos={section1Photos} />
  <GalleryGrid photos={section2Photos} />
</div>
```

### Dark Mode Support
```tsx
<div className="dark:bg-gray-900">
  <GalleryGrid photos={photos} />
</div>
```

---

## Performance Tips

1. **Limit Initial Load**
   ```tsx
   // Show 6 photos initially, link to full gallery
   const photos = await prisma.galleryPhoto.findMany({
     take: 6,
     // ... other filters
   });
   ```

2. **Lazy Load Sections**
   ```tsx
   import dynamic from 'next/dynamic';
   
   const PhotoCarousel = dynamic(
     () => import('@/components/gallery/PhotoCarousel'),
     { ssr: false }
   );
   ```

3. **Use Thumbnails**
   ```tsx
   // Already handled in GalleryGrid
   // Thumbnails automatically used for grid view
   // Full images only in carousels/lightbox
   ```

---

## Testing Checklist

When integrating photos:

- [ ] Photos display correctly
- [ ] Carousel navigation works
- [ ] Lightbox opens and closes
- [ ] Captions show properly
- [ ] Mobile responsive
- [ ] Loading states handled
- [ ] Empty state (no photos) handled
- [ ] Links to full gallery work
- [ ] Images load from Google Drive

---

## Common Gotchas

1. **Always check for empty array:**
   ```tsx
   {photos.length > 0 && <PhotoCarousel photos={photos} />}
   ```

2. **Use published filter:**
   ```tsx
   where: { published: true }  // Don't forget this!
   ```

3. **Handle async properly:**
   ```tsx
   // Server Components (default)
   const photos = await prisma.galleryPhoto.findMany(...)
   
   // Client Components
   const [photos, setPhotos] = useState([])
   useEffect(() => { /* fetch */ }, [])
   ```

---

Need more examples? Check:
- [GALLERY_README.md](GALLERY_README.md) - Full documentation
- [lib/google-drive.ts](lib/google-drive.ts) - Utility functions
- [components/gallery/](components/gallery/) - Component source code
