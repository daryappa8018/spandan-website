# 📸 Photo Gallery System Documentation

## Overview

This photo gallery system is a **Google Drive-based** unified photo management solution for the Spandan website. All images are stored on Google Drive and accessed via public share links - **no paid cloud storage services required**.

---

## ✅ What Has Been Implemented

### 1. **Google Drive Integration**
- **Utility Functions** (`lib/google-drive.ts`)
  - `getDriveImageUrl()` - Converts Google Drive share links to direct image URLs
  - `getDriveThumbnail()` - Gets thumbnail URLs for gallery grids (w200/w400/w800)
  - `extractDriveFileId()` - Extracts file ID from any Drive URL format
  - `isValidDriveUrl()` - Validates Google Drive URLs
  
- **Supported URL Formats:**
  ```
  https://drive.google.com/file/d/FILE_ID/view
  https://drive.google.com/open?id=FILE_ID
  https://drive.google.com/uc?id=FILE_ID
  ```

### 2. **Database Schema** (`prisma/schema.prisma`)
```prisma
model GalleryPhoto {
  id            String        @id @default(cuid())
  driveImageUrl String        // Original Google Drive share link
  category      PhotoCategory // EVENT, TEAM, PROJECT, GENERAL, ACHIEVEMENT, ACTIVITY
  referenceId   String?       // Links to event/team/project ID
  referenceName String?       // Name of linked entity
  year          Int
  caption       String?
  published     Boolean       @default(true)
  order         Int           @default(0)
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
}
```

### 3. **Reusable Components**

#### `<PhotoCarousel />` - components/gallery/PhotoCarousel.tsx
- Full-featured image slideshow
- Manual navigation (prev/next buttons)
- Thumbnail navigation strip
- Photo counter
- Caption display
- Keyboard shortcuts ready
- Mobile responsive

**Usage:**
```tsx
import PhotoCarousel from '@/components/gallery/PhotoCarousel';

<PhotoCarousel 
  photos={photos}
  autoPlay={false}
  showCaptions={true}
/>
```

#### `<GalleryGrid />` - components/gallery/GalleryGrid.tsx
- Responsive grid layout (2/3/4 columns)
- Hover effects
- Click to open lightbox
- Lazy loading
- Thumbnail optimization

**Usage:**
```tsx
import GalleryGrid from '@/components/gallery/GalleryGrid';

<GalleryGrid 
  photos={photos}
  columns={3}
  showCaptions={true}
/>
```

#### `<PhotoLightbox />` - components/gallery/PhotoLightbox.tsx
- Full-screen photo viewer
- Keyboard navigation (Arrow keys, Escape)
- Click outside to close
- Photo counter and captions

#### `<GalleryFilters />` - components/gallery/GalleryFilters.tsx
- Filter by Category
- Filter by Year
- Filter by Reference (Event/Team/Project)
- Client-side filtering (no page reload)
- Reset all filters button

### 4. **Public Gallery Page** (`app/gallery/page.tsx`)
- Displays all published photos
- Multi-filter system
- Real-time stats
- Grid view with lightbox
- Client-side filtering

**URL:** `/gallery`

### 5. **Admin Gallery Management** (`app/admin/gallery/`)

#### Gallery List (`app/admin/gallery/page.tsx`)
- View all photos (published & unpublished)
- Filter by category and status
- Quick publish/unpublish toggle
- Edit and delete actions
- Photo count statistics

**URL:** `/admin/gallery`

#### Add New Photo (`app/admin/gallery/new/page.tsx`)
- Google Drive URL input with validation
- Category selection
- Link to Event/Team/Project
- Year, caption, order
- Live preview
- Publish control

**URL:** `/admin/gallery/new`

#### Edit Photo (`app/admin/gallery/[id]/edit/page.tsx`)
- Update all photo details
- Change Google Drive URL
- Update metadata
- Save changes

**URL:** `/admin/gallery/[photoId]/edit`

### 6. **API Routes**

#### Public API
- `GET /api/gallery` - Fetch published photos (with filters)

#### Admin API
- `GET /api/admin/gallery` - Fetch all photos
- `POST /api/admin/gallery` - Create new photo
- `GET /api/admin/gallery/[id]` - Get single photo
- `PUT /api/admin/gallery/[id]` - Update photo
- `DELETE /api/admin/gallery/[id]` - Delete photo

All admin routes are protected with authentication.

### 7. **Configuration Updates**

#### `next.config.js`
```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'drive.google.com',
      pathname: '/**',
    },
  ],
}
```

#### Navigation (`lib/types.ts`)
- Added "Gallery" to main navigation menu

---

## 📋 How to Use the System

### For Admins: Adding Photos

1. **Prepare Images on Google Drive**
   - Upload images to your Google Drive
   - Right-click → Share → "Anyone with the link can view"
   - Copy the share link

2. **Add to Gallery**
   - Go to `/admin/gallery`
   - Click "Add Photo"
   - Paste Google Drive URL
   - Select category
   - (Optional) Link to Event/Team/Project
   - Add year and caption
   - Click "Add Photo"

3. **Manage Photos**
   - Toggle publish/unpublish status
   - Edit details
   - Delete photos
   - Filter by category/status

### For Users: Viewing Gallery

1. Navigate to `/gallery`
2. Use filters to narrow down photos:
   - By Category (Event, Team, Project, etc.)
   - By Year
   - By specific Event/Team/Project
3. Click any photo to open full-screen lightbox
4. Use arrow keys or buttons to navigate

---

## 🔧 Integration with Existing Pages

### Events Page Integration

To add a photo carousel to an event detail page:

```tsx
// app/events/[slug]/page.tsx

import PhotoCarousel from '@/components/gallery/PhotoCarousel';

// Inside your component
const eventPhotos = await prisma.galleryPhoto.findMany({
  where: {
    category: 'EVENT',
    referenceId: event.id,
    published: true,
  },
  orderBy: { order: 'asc' },
});

// In JSX
{eventPhotos.length > 0 && (
  <section>
    <h2>Event Photos</h2>
    <PhotoCarousel photos={eventPhotos} />
  </section>
)}
```

### Team Page Integration

```tsx
// app/team/page.tsx

import GalleryGrid from '@/components/gallery/GalleryGrid';

const teamPhotos = await prisma.galleryPhoto.findMany({
  where: {
    category: 'TEAM',
    published: true,
  },
  orderBy: [{ year: 'desc' }, { order: 'asc' }],
});

// In JSX
<GalleryGrid photos={teamPhotos} columns={4} />
```

### Tech Projects Integration

```tsx
// app/tech-projects/[slug]/page.tsx

const projectPhotos = await prisma.galleryPhoto.findMany({
  where: {
    category: 'PROJECT',
    referenceId: project.id,
    published: true,
  },
});

<PhotoCarousel photos={projectPhotos} showCaptions={true} />
```

---

## ⚙️ Technical Details

### Google Drive Rate Limits

**Important:** Google Drive has rate limits on direct image access. To avoid issues:

1. **Use Thumbnails for Grids**
   - Always use `getDriveThumbnail()` for gallery grids
   - Only load full-size images in carousels/lightboxes

2. **Lazy Loading**
   - Components use Next.js Image lazy loading by default
   - Images load as they come into viewport

3. **Caching**
   - Browser caches Google Drive URLs
   - Set appropriate cache headers if needed

### Performance Optimization

1. **Thumbnails:** Use `getDriveThumbnail(url, 'small'|'medium'|'large')`
   - Small: 200px (mobile thumbnails)
   - Medium: 400px (desktop grids)
   - Large: 800px (carousels)

2. **Unoptimized Images:**
   - Google Drive images use `unoptimized={true}` in Next.js Image
   - This prevents Next.js from trying to optimize Drive images
   - Reduces build time and server load

3. **Client-Side Filtering:**
   - All gallery filtering happens in the browser
   - No server round-trips for filter changes
   - Fast, responsive user experience

### URL Structure

**Google Drive Direct URL:**
```
https://drive.google.com/uc?id=FILE_ID
```

**Google Drive Thumbnail URL:**
```
https://drive.google.com/thumbnail?id=FILE_ID&sz=w400
```

### Security

- Admin routes protected with NextAuth
- All photo mutations logged in audit logs
- Public API only serves published photos
- Google Drive permissions handled by Drive sharing settings

---

## 🎨 Customization

### Styling

All components use Tailwind CSS and can be customized:

```tsx
<GalleryGrid 
  photos={photos}
  columns={3}
  className="custom-class"  // Add custom styles
/>
```

### Adding New Categories

1. Update `PhotoCategory` enum in `prisma/schema.prisma`
2. Run `npx prisma generate && npx prisma db push`
3. Update form dropdowns in admin pages

### Changing Grid Layout

```tsx
<GalleryGrid columns={4} />  // 4 columns
<GalleryGrid columns={3} />  // 3 columns (default)
<GalleryGrid columns={2} />  // 2 columns
```

---

## 🐛 Troubleshooting

### "Failed to load image" Error

**Cause:** Image not publicly shared on Google Drive

**Solution:**
1. Open the Drive file
2. Click Share → Change to "Anyone with the link"
3. Ensure permission is "Viewer"

### Invalid URL Error

**Cause:** Wrong URL format

**Solution:** Use the full shareable link from Google Drive:
```
✅ https://drive.google.com/file/d/ABC123.../view
❌ https://drive.google.com/drive/folders/...
```

### Images Not Loading in Gallery

**Cause:** Photos not marked as published

**Solution:** Go to `/admin/gallery` and toggle "Published" status

### Slow Loading

**Cause:** Using full-size images in grids

**Solution:** System automatically uses thumbnails, but verify:
```tsx
// In GalleryGrid component
getDriveThumbnail(photo.driveImageUrl, 'medium')
```

---

## 📊 Database Migration

Run these commands to apply the photo schema:

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Seed with sample photos
# Add seed data to prisma/seed.ts first
npm run db:seed
```

---

## 🚀 Deployment Checklist

- [ ] Run `npx prisma generate`
- [ ] Verify `next.config.js` has Google Drive in `remotePatterns`
- [ ] Test photo upload in admin panel
- [ ] Verify public gallery loads correctly
- [ ] Check mobile responsiveness
- [ ] Test filters and lightbox
- [ ] Ensure admin authentication works

---

## 📝 Future Enhancements (Optional)

1. **Bulk Upload:** Upload multiple photos at once
2. **Auto-Tagging:** AI-based photo categorization
3. **Download Feature:** Allow users to download photos
4. **Photo Comments:** Let users comment on photos
5. **Social Sharing:** Share individual photos on social media
6. **Albums:** Group photos into custom albums
7. **Search:** Full-text search in captions

---

## 🆘 Support

For issues or questions:
1. Check this documentation
2. Review component source code
3. Check browser console for errors
4. Verify Google Drive sharing permissions
5. Contact development team

---

**System Version:** 1.0  
**Last Updated:** January 2026  
**Maintained By:** Spandan Development Team
