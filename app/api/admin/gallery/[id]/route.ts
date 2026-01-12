// app/api/admin/gallery/[id]/route.ts
// Admin API for managing individual gallery photos

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { isValidDriveUrl } from '@/lib/google-drive';

export const dynamic = 'force-dynamic';

// GET single photo
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const photo = await prisma.galleryPhoto.findUnique({
      where: { id: params.id },
    });

    if (!photo) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
    }

    return NextResponse.json({ photo }, { status: 200 });
  } catch (error: any) {
    console.error('Photo fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch photo' },
      { status: 500 }
    );
  }
}

// PUT - Update photo
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Fetch existing photo
    const existingPhoto = await prisma.galleryPhoto.findUnique({
      where: { id: params.id },
    });

    if (!existingPhoto) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
    }

    // Validate Google Drive URL if changed
    if (driveImageUrl && driveImageUrl !== existingPhoto.driveImageUrl) {
      if (!isValidDriveUrl(driveImageUrl)) {
        return NextResponse.json(
          { error: 'Invalid Google Drive URL' },
          { status: 400 }
        );
      }
    }

    // Update photo
    const updateData: any = {};
    if (driveImageUrl !== undefined) updateData.driveImageUrl = driveImageUrl;
    if (category !== undefined) updateData.category = category;
    if (referenceId !== undefined) updateData.referenceId = referenceId || null;
    if (referenceName !== undefined) updateData.referenceName = referenceName || null;
    if (year !== undefined) updateData.year = parseInt(year);
    if (caption !== undefined) updateData.caption = caption || null;
    if (published !== undefined) updateData.published = published;
    if (order !== undefined) updateData.order = order;

    const photo = await prisma.galleryPhoto.update({
      where: { id: params.id },
      data: updateData,
    });

    // Log audit
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'UPDATE',
        entity: 'gallery_photos',
        entityId: photo.id,
        changes: JSON.stringify({ before: existingPhoto, after: photo }),
      },
    });

    return NextResponse.json({ photo }, { status: 200 });
  } catch (error: any) {
    console.error('Photo update error:', error);
    return NextResponse.json(
      { error: 'Failed to update photo' },
      { status: 500 }
    );
  }
}

// DELETE photo
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const photo = await prisma.galleryPhoto.findUnique({
      where: { id: params.id },
    });

    if (!photo) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
    }

    await prisma.galleryPhoto.delete({
      where: { id: params.id },
    });

    // Log audit
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'DELETE',
        entity: 'gallery_photos',
        entityId: params.id,
        changes: JSON.stringify({ deleted: photo }),
      },
    });

    return NextResponse.json(
      { message: 'Photo deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Photo deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete photo' },
      { status: 500 }
    );
  }
}
