# 🚀 Gallery System Quick Start

## For Admins: How to Add Your First Photo

### Step 1: Prepare Image on Google Drive
1. Go to your Google Drive
2. Upload the image you want to add
3. Right-click the image → **Share**
4. Change to **"Anyone with the link"**
5. Set permission to **"Viewer"**
6. Click **Copy link**

### Step 2: Add to Gallery
1. Go to your admin panel: `/admin/gallery`
2. Click **"+ Add Photo"**
3. Paste the Google Drive link
4. Select a category:
   - **Event** - Photos from blood donation camps, village camps, etc.
   - **Team** - Team photos, group pictures
   - **Project** - Tech project screenshots
   - **General** - Miscellaneous photos
   - **Achievement** - Awards, certifications, recognition
   - **Activity** - Day-to-day activities
5. (Optional) Link to a specific Event/Team Member/Project
6. Enter the year (e.g., 2024)
7. Add a caption (optional but recommended)
8. Check "Publish immediately" if ready
9. Click **"Add Photo"**

### Step 3: Verify
1. Go to `/gallery` on your website
2. Your photo should appear in the gallery!
3. Click it to open in full-screen view

---

## For Developers: How to Show Photos on a Page

### Simple Carousel (Server Component)

```tsx
// app/events/[slug]/page.tsx
import { PhotoCarousel } from '@/components/gallery';
import { prisma } from '@/lib/prisma';

export default async function EventPage({ params }) {
  // Get event photos
  const photos = await prisma.galleryPhoto.findMany({
    where: {
      category: 'EVENT',
      referenceId: params.id,
      published: true,
    },
  });

  return (
    <div>
      <h1>Event Details</h1>
      {photos.length > 0 && <PhotoCarousel photos={photos} />}
    </div>
  );
}
```

### Grid View (Server Component)

```tsx
// app/team/page.tsx
import { GalleryGrid } from '@/components/gallery';

export default async function TeamPage() {
  const photos = await prisma.galleryPhoto.findMany({
    where: { category: 'TEAM', published: true },
  });

  return (
    <div>
      <h1>Our Team</h1>
      <GalleryGrid photos={photos} columns={4} />
    </div>
  );
}
```

---

## Common Use Cases

### Show Recent Photos (Homepage)
```tsx
const recentPhotos = await prisma.galleryPhoto.findMany({
  where: { published: true },
  orderBy: { createdAt: 'desc' },
  take: 6,
});
```

### Show Event Photos
```tsx
const eventPhotos = await prisma.galleryPhoto.findMany({
  where: {
    category: 'EVENT',
    published: true,
  },
  orderBy: { year: 'desc' },
});
```

### Show Photos by Year
```tsx
const photos2024 = await prisma.galleryPhoto.findMany({
  where: {
    year: 2024,
    published: true,
  },
});
```

---

## Available Components

### `<PhotoCarousel />`
Beautiful slideshow with navigation
- Next/Previous buttons
- Thumbnail strip
- Captions
- Mobile responsive

### `<GalleryGrid />`
Responsive photo grid
- 2, 3, or 4 columns
- Hover effects
- Click to open lightbox
- Optimized thumbnails

### `<PhotoLightbox />`
Full-screen photo viewer
- Keyboard navigation (arrows, ESC)
- Smooth transitions
- Photo counter

### `<GalleryFilters />`
Filter interface
- Category filter
- Year filter
- Event/Team/Project filter

---

## Tips

### ✅ DO
- Use high-quality images (at least 1200px wide)
- Add descriptive captions
- Organize photos by category
- Link photos to relevant events/projects
- Mark photos as published when ready

### ❌ DON'T
- Don't use Google Drive folders (use individual file links)
- Don't forget to make images public
- Don't upload extremely large files (compress if needed)
- Don't leave published unchecked if you want it visible

---

## Troubleshooting

**Problem:** Image not loading  
**Solution:** Make sure the Google Drive link is shared as "Anyone with the link"

**Problem:** Photo not showing in gallery  
**Solution:** Check that "Published" is checked in admin panel

**Problem:** Wrong category  
**Solution:** Edit the photo in admin panel and change category

**Problem:** Need to reorder photos  
**Solution:** Use the "Order" field - lower numbers appear first

---

## URLs Reference

- **Public Gallery:** `/gallery`
- **Admin Gallery:** `/admin/gallery`
- **Add New Photo:** `/admin/gallery/new`
- **Edit Photo:** `/admin/gallery/[id]/edit`

---

## Example Google Drive URLs

✅ **Correct Format:**
```
https://drive.google.com/file/d/1AbC123DeF456GhI789JkL/view?usp=sharing
```

❌ **Wrong Format:**
```
https://drive.google.com/drive/folders/...  (This is a folder)
https://docs.google.com/...  (This is a document)
```

---

## Need More Help?

- **Full Documentation:** [GALLERY_README.md](GALLERY_README.md)
- **Integration Examples:** [INTEGRATION_EXAMPLES.md](INTEGRATION_EXAMPLES.md)
- **Component Code:** `components/gallery/`
- **API Routes:** `app/api/gallery/` and `app/api/admin/gallery/`

---

**That's it! You're ready to use the gallery system! 🎉**
