// app/api/admin/impact/summary/route.ts
// API routes for impact summary

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET summary
export async function GET() {
  try {
    const summary = await prisma.impactSummary.findMany();
    return NextResponse.json(summary);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch summary' }, { status: 500 });
  }
}

// UPDATE summary
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const summary = await prisma.impactSummary.upsert({
      where: { id: 'default' },
      update: body,
      create: { id: 'default', ...body },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'UPDATE',
        entity: 'impact_summary',
        entityId: 'default',
        changes: JSON.stringify(body),
      },
    });

    return NextResponse.json(summary);
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update summary' }, { status: 500 });
  }
}

// ================================================================

// app/api/admin/impact/years/route.ts
// API routes for yearly impact data

// GET all years
export async function GETYears() {
  try {
    const years = await prisma.impactYear.findMany({
      orderBy: { year: 'desc' },
    });
    return NextResponse.json(years);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch years' }, { status: 500 });
  }
}

// UPDATE/CREATE year data
export async function PUTYears(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { year, ...data } = body;

    const yearData = await prisma.impactYear.upsert({
      where: { year },
      update: data,
      create: { year, ...data },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'UPDATE',
        entity: 'impact_years',
        entityId: String(year),
        changes: JSON.stringify(body),
      },
    });

    return NextResponse.json(yearData);
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update year data' }, { status: 500 });
  }
}