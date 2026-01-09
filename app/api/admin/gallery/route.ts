// app/api/admin/gallery/route.ts
// Gallery management API - List and create photos

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET /api/admin/gallery - List all photos
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const photos = await prisma.galleryPhoto.findMany({
      include: {
        event: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: [
        { photoDate: 'asc' }, // Earliest first
        { uploadedDate: 'asc' },
      ],
    });

    return NextResponse.json({ photos });
  } catch (error: any) {
    console.error('Error fetching gallery photos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch photos' },
      { status: 500 }
    );
  }
}

// POST /api/admin/gallery - Create new photo
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.googleDriveId || !body.googleDriveUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create photo
    const photo = await prisma.galleryPhoto.create({
      data: {
        title: body.title,
        googleDriveId: body.googleDriveId,
        googleDriveUrl: body.googleDriveUrl,
        thumbnailUrl: body.thumbnailUrl || null,
        eventId: body.eventId || null,
        category: body.category || 'GENERAL',
        photoDate: body.photoDate ? new Date(body.photoDate) : null,
        published: body.published ?? true,
        order: body.order ?? 0,
      },
      include: {
        event: {
          select: {
            title: true,
          },
        },
      },
    });

    return NextResponse.json({ photo }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating photo:', error);
    return NextResponse.json(
      { error: 'Failed to create photo' },
      { status: 500 }
    );
  }
}
