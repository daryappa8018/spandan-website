// app/api/admin/events/[id]/route.ts
// API routes for individual event operations (GET, UPDATE, DELETE)

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET single event
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: params.id },
      include: {
        metrics: { orderBy: { order: 'asc' } },
        details: {
          include: {
            metrics: true,
          },
        },
      },
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}

// UPDATE event
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { metrics, details, ...eventData } = body;

    // Delete existing metrics and details
    await prisma.eventMetric.deleteMany({ where: { eventId: params.id } });
    if (details) {
      await prisma.eventDetail.deleteMany({ where: { eventId: params.id } });
    }

    // Update event with new data
    const event = await prisma.event.update({
      where: { id: params.id },
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
        action: 'UPDATE',
        entity: 'events',
        entityId: event.id,
        changes: JSON.stringify({ before: eventData, after: body }),
      },
    });

    return NextResponse.json(event);
  } catch (error: any) {
    console.error('Event update error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update event' },
      { status: 500 }
    );
  }
}

// DELETE event
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const event = await prisma.event.findUnique({
      where: { id: params.id },
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Delete event (cascade will handle metrics and details)
    await prisma.event.delete({
      where: { id: params.id },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'DELETE',
        entity: 'events',
        entityId: params.id,
        changes: JSON.stringify(event),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Event deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}