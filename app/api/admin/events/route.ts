// app/api/admin/events/route.ts
// API routes for event CRUD operations

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// CREATE new event
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { metrics, details, ...eventData } = body;

    // Create event with metrics
    const event = await prisma.event.create({
      data: {
        ...eventData,
        metrics: {
          create: metrics.map((label: string, index: number) => ({
            label,
            order: index,
          })),
        },
        ...(details && {
          details: {
            create: {
              location: details.location,
              duration: details.duration,
              context: details.context,
              goal: details.goal,
              target: details.target,
              preparation: details.preparation,
              process: details.process,
              team: details.team,
              volunteers: details.volunteers,
              impact: details.impact,
              challenges: details.challenges,
              learnings: details.learnings,
              partners: details.partners,
              photosNote: details.photosNote,
              dataNote: details.dataNote,
              metrics: {
                create: Object.entries(details.outcomeMetrics || {}).map(([key, value]) => ({
                  key,
                  value: String(value),
                })),
              },
            },
          },
        }),
      },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'CREATE',
        entity: 'events',
        entityId: event.id,
        changes: JSON.stringify(eventData),
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error: any) {
    console.error('Event creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create event' },
      { status: 500 }
    );
  }
}

// GET all events (with filtering)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const year = searchParams.get('year');
    const published = searchParams.get('published');

    const where: any = {};
    if (category) where.category = category;
    if (year) where.year = parseInt(year);
    if (published !== null) where.published = published === 'true';

    const events = await prisma.event.findMany({
      where,
      include: {
        metrics: true,
        details: true,
      },
      orderBy: [{ year: 'desc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json(events);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}