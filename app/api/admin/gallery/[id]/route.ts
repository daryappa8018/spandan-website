// app/api/admin/gallery/[id]/route.ts
// Gallery management API - Update and delete individual photos

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// PATCH /api/admin/gallery/[id] - Update photo
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id } = params;

    // Update photo
    const photo = await prisma.galleryPhoto.update({
      where: { id },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.googleDriveId !== undefined && { googleDriveId: body.googleDriveId }),
        ...(body.googleDriveUrl !== undefined && { googleDriveUrl: body.googleDriveUrl }),
        ...(body.thumbnailUrl !== undefined && { thumbnailUrl: body.thumbnailUrl }),
        ...(body.eventId !== undefined && { eventId: body.eventId || null }),
        ...(body.category !== undefined && { category: body.category }),
        ...(body.photoDate !== undefined && {
          photoDate: body.photoDate ? new Date(body.photoDate) : null,
        }),
        ...(body.published !== undefined && { published: body.published }),
        ...(body.order !== undefined && { order: body.order }),
      },
      include: {
        event: {
          select: {
            title: true,
          },
        },
      },
    });

    return NextResponse.json({ photo });
  } catch (error: any) {
    console.error('Error updating photo:', error);
    return NextResponse.json(
      { error: 'Failed to update photo' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/gallery/[id] - Delete photo
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    // Delete photo (note: this doesn't delete from Google Drive)
    await prisma.galleryPhoto.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting photo:', error);
    return NextResponse.json(
      { error: 'Failed to delete photo' },
      { status: 500 }
    );
  }
}
