// app/api/admin/impact/years/route.ts
// API routes for yearly impact data

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET all years
export async function GET() {
  try {
    const years = await prisma.impactYear.findMany({
      orderBy: { year: 'desc' },
    }).catch(() => []);
    return NextResponse.json(years);
  } catch (error) {
    console.error('Impact years fetch error:', error);
    return NextResponse.json([]);
  }
}

// UPDATE/CREATE year data
export async function PUT(request: NextRequest) {
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
    }).catch((error) => {
      console.error('Database upsert error:', error);
      throw error;
    });

    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'UPDATE',
        entity: 'impact_years',
        entityId: String(year),
        changes: JSON.stringify(body),
      },
    }).catch((error) => {
      console.error('Audit log error:', error);
      // Don't fail the request if audit log fails
    });

    return NextResponse.json(yearData);
  } catch (error: any) {
    console.error('Impact year update error:', error);
    return NextResponse.json({ error: 'Failed to update year data' }, { status: 500 });
  }
}
