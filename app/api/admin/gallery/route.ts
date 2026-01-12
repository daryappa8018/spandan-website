// app/api/admin/gallery/route.ts
// Admin API for managing gallery photos

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { isValidDriveUrl } from '@/lib/google-drive';

export const dynamic = 'force-dynamic';

// GET all photos (admin view - includes unpublished)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const published = searchParams.get('published');

    const where: any = {};
    if (category && category !== 'all') where.category = category;
    if (published !== null && published !== 'all') {
      where.published = published === 'true';
    }

    const photos = await prisma.galleryPhoto.findMany({
      where,
      orderBy: [
        { year: 'desc' },
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json({ photos }, { status: 200 });
  } catch (error: any) {
    console.error('Admin gallery fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch photos' },
      { status: 500 }
    );
  }
}

// POST - Create new photo
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      driveImageUrl,
      category,
      referenceId,
      referenceName,
      year,
      caption,
      published,
      order,
    } = body;

    // Validation
    if (!driveImageUrl || !category || !year) {
      return NextResponse.json(
        { error: 'Missing required fields: driveImageUrl, category, year' },
        { status: 400 }
      );
    }

    if (!isValidDriveUrl(driveImageUrl)) {
      return NextResponse.json(
        { error: 'Invalid Google Drive URL' },
        { status: 400 }
      );
    }

    const validCategories = ['EVENT', 'TEAM', 'PROJECT', 'GENERAL', 'ACHIEVEMENT', 'ACTIVITY'];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    // Create photo
    const photo = await prisma.galleryPhoto.create({
      data: {
        driveImageUrl,
        category,
        referenceId: referenceId || null,
        referenceName: referenceName || null,
        year: parseInt(year),
        caption: caption || null,
        published: published !== false,
        order: order || 0,
      },
    });

    // Log audit
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'CREATE',
        entity: 'gallery_photos',
        entityId: photo.id,
        changes: JSON.stringify({ created: photo }),
      },
    });

    return NextResponse.json({ photo }, { status: 201 });
  } catch (error: any) {
    console.error('Photo creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create photo' },
      { status: 500 }
    );
  }
}
