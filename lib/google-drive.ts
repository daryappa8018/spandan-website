// lib/google-drive.ts
// Google Drive URL utilities for photo gallery system

/**
 * Converts a Google Drive share URL to a direct image URL
 * 
 * Input formats supported:
 * - https://drive.google.com/file/d/FILE_ID/view
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID (already direct)
 * 
 * Output: https://drive.google.com/uc?id=FILE_ID
 * 
 * For thumbnails: https://drive.google.com/thumbnail?id=FILE_ID&sz=w400
 */
export function getDriveImageUrl(driveUrl: string, thumbnail = false): string {
  if (!driveUrl) return '';

  // Extract FILE_ID from various Google Drive URL formats
  let fileId = '';

  // Format 1: https://drive.google.com/file/d/FILE_ID/view
  const fileMatch = driveUrl.match(/\/file\/d\/([^/]+)/);
  if (fileMatch) {
    fileId = fileMatch[1];
  }

  // Format 2: https://drive.google.com/open?id=FILE_ID
  const openMatch = driveUrl.match(/[?&]id=([^&]+)/);
  if (openMatch && !fileId) {
    fileId = openMatch[1];
  }

  // Format 3: Already in uc format
  const ucMatch = driveUrl.match(/\/uc\?id=([^&]+)/);
  if (ucMatch && !fileId) {
    fileId = ucMatch[1];
  }

  if (!fileId) {
    console.error('Invalid Google Drive URL:', driveUrl);
    return driveUrl; // Return original if can't parse
  }

  // Return thumbnail or full-size URL
  if (thumbnail) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`;
  }
  
  return `https://drive.google.com/uc?id=${fileId}`;
}

/**
 * Get thumbnail URL for gallery grids
 */
export function getDriveThumbnail(driveUrl: string, size: 'small' | 'medium' | 'large' = 'medium'): string {
  if (!driveUrl) return '';

  const fileId = extractDriveFileId(driveUrl);
  if (!fileId) return driveUrl;

  const sizeMap = {
    small: 'w200',
    medium: 'w400',
    large: 'w800',
  };

  return `https://drive.google.com/thumbnail?id=${fileId}&sz=${sizeMap[size]}`;
}

/**
 * Extract file ID from any Google Drive URL format
 */
export function extractDriveFileId(driveUrl: string): string | null {
  if (!driveUrl) return null;

  // Try various patterns
  const patterns = [
    /\/file\/d\/([^/]+)/,
    /[?&]id=([^&]+)/,
    /\/uc\?id=([^&]+)/,
    /\/thumbnail\?id=([^&]+)/,
  ];

  for (const pattern of patterns) {
    const match = driveUrl.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

/**
 * Validate if a URL is a valid Google Drive URL
 */
export function isValidDriveUrl(url: string): boolean {
  if (!url) return false;
  return url.includes('drive.google.com') && extractDriveFileId(url) !== null;
}

/**
 * Photo data type for gallery system
 */
export interface PhotoData {
  id: string;
  driveImageUrl: string;
  category: 'EVENT' | 'TEAM' | 'PROJECT' | 'GENERAL' | 'ACHIEVEMENT' | 'ACTIVITY';
  referenceId?: string | null;
  referenceName?: string | null;
  year: number;
  caption?: string | null;
  published: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Get direct image URL for Next.js Image component
 */
export function getNextImageUrl(driveUrl: string): string {
  return getDriveImageUrl(driveUrl, false);
}

/**
 * IMPORTANT NOTES:
 * 
 * 1. Google Drive Rate Limits:
 *    - Avoid fetching images via API
 *    - Use direct public links only
 *    - Images must be shared as "Anyone with the link → Viewer"
 * 
 * 2. Next.js Image Component:
 *    - Add 'drive.google.com' to next.config.js domains
 *    - Or use unoptimized={true} for Drive images
 * 
 * 3. Thumbnail Strategy:
 *    - Use thumbnail URLs (w400) for gallery grids
 *    - Use full-size URLs for carousels/lightboxes
 *    - This improves loading performance significantly
 * 
 * 4. Caching:
 *    - Google Drive URLs are stable and can be cached
 *    - Consider adding browser caching headers
 */
