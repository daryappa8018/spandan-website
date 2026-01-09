# 📸 Gallery Feature - Google Drive Integration

## Overview
A photo gallery system that uses Google Drive for storage, avoiding Vercel's storage limitations. Photos are stored on Google Drive and only metadata is stored in the database.

## Features
- ✅ Upload photos via Google Drive links
- ✅ Categorize photos (Event, General, Team, Activity, Achievement)
- ✅ Link photos to specific events
- ✅ Sort by date (earliest first)
- ✅ Publish/unpublish control
- ✅ Public gallery page at `/gallery`
- ✅ Admin management UI at `/admin/gallery`

## Storage Strategy
- **Google Drive**: Stores actual image files (15GB free, unlimited with Google Workspace)
- **Database**: Stores only metadata (title, category, Drive ID, dates, etc.)
- **Vercel**: Serves only HTML/API (no file storage used)

## How to Add Photos

### Step 1: Upload to Google Drive
1. Upload your photos to Google Drive
2. Right-click each photo → **Share**
3. Change permissions to **"Anyone with the link can view"**
4. Click **Copy link**

### Step 2: Add to Gallery (Admin Panel)
1. Go to **Admin Panel** → **Photo Gallery**
2. Click **"+ Add Photo"**
3. Fill in the form:
   - **Title**: Description of the photo
   - **Google Drive URL**: Paste the shareable link
   - **Category**: Select appropriate category
   - **Link to Event**: (Optional) Associate with an event
   - **Photo Date**: (Optional) Actual date photo was taken
   - **Publish**: Check to make visible immediately
4. Click **"Add Photo"**

### Supported URL Formats
The system automatically extracts Drive file IDs from:
- `https://drive.google.com/file/d/FILE_ID/view`
- `https://drive.google.com/open?id=FILE_ID`
- Just the `FILE_ID` itself

## Database Schema

```prisma
model GalleryPhoto {
  id              String        @id @default(cuid())
  title           String
  googleDriveId   String        // Google Drive file ID
  googleDriveUrl  String        // Direct image URL
  thumbnailUrl    String?       // Thumbnail URL
  eventId         String?       // Optional link to event
  category        PhotoCategory
  uploadedDate    DateTime      @default(now())
  photoDate       DateTime?     // Actual photo date
  published       Boolean       @default(true)
  order           Int           @default(0)
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
  
  event           Event?
}

enum PhotoCategory {
  EVENT
  GENERAL
  TEAM
  ACTIVITY
  ACHIEVEMENT
}
```

## API Endpoints

### GET `/api/admin/gallery`
List all gallery photos (admin only)
- Returns photos with event details
- Sorted by photoDate (earliest first)

### POST `/api/admin/gallery`
Create new photo (admin only)
```json
{
  "title": "Blood Donation Camp - Group Photo",
  "googleDriveId": "1abc...xyz",
  "googleDriveUrl": "https://drive.google.com/uc?export=view&id=1abc...xyz",
  "thumbnailUrl": "https://drive.google.com/thumbnail?id=1abc...xyz&sz=w400",
  "eventId": "clx123...",
  "category": "EVENT",
  "photoDate": "2024-11-15",
  "published": true
}
```

### PATCH `/api/admin/gallery/[id]`
Update photo metadata (admin only)

### DELETE `/api/admin/gallery/[id]`
Delete photo from database (admin only)
**Note**: This does NOT delete the file from Google Drive

## Public Gallery Page
- URL: `/gallery`
- Shows all published photos
- Grid layout with hover effects
- Click to view full size on Google Drive
- Filter by category
- Shows associated event (if any)

## Admin Gallery Page
- URL: `/admin/gallery`
- Full CRUD operations
- Category filters
- Publish/unpublish toggle
- View/Edit/Delete actions

## Important Notes

### Google Drive Permissions
**CRITICAL**: Photos must be set to "Anyone with the link can view" or they won't display on the public website.

### File Deletion
Deleting a photo from the admin panel only removes it from the website database. The actual file remains on Google Drive. To completely remove a photo:
1. Delete from admin panel
2. Manually delete from Google Drive

### Storage Costs
- Google Drive: 15GB free, then paid plans
- Vercel: No storage used ✅
- Database: ~1KB per photo metadata

### Performance
- Initial load: Fetches thumbnails (400px width)
- Full view: Opens Google Drive direct link
- Fast CDN delivery via Google's infrastructure

## Future Enhancements (Optional)
- [ ] Bulk upload (multiple photos at once)
- [ ] Google Drive Picker integration (select files directly from Drive)
- [ ] Image optimization/compression before upload
- [ ] Photo albums/collections
- [ ] Lightbox gallery view
- [ ] Download original resolution

## Testing Locally
1. Ensure `.env.local` has `DATABASE_URL` configured
2. Run `npx prisma db push` to sync schema
3. Start dev server: `npm run dev`
4. Navigate to `/admin/gallery`
5. Add a test photo using a Google Drive link

## Deployment Checklist
- [x] Database schema updated
- [x] API routes created
- [x] Admin UI implemented
- [x] Public gallery page created
- [x] Navigation links added
- [ ] Test with real photos
- [ ] Deploy to Vercel
- [ ] Verify Google Drive URLs work in production
