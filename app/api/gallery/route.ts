// app/api/gallery/route.ts
// Public API for fetching gallery photos

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const year = searchParams.get('year');
    const referenceId = searchParams.get('referenceId');

    // Build filter conditions
    const where: any = {
      published: true,
    };

    if (category && category !== 'all') {
      where.category = category;
    }

    if (year && year !== 'all') {
      where.year = parseInt(year);
    }

    if (referenceId && referenceId !== 'all') {
      where.referenceId = referenceId;
    }

    // Fetch photos
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
    console.error('Gallery fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery photos' },
      { status: 500 }
    );
  }
}
