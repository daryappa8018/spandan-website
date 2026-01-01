// app/api/admin/team/route.ts
// API routes for team CRUD operations

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// CREATE new team member
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const member = await prisma.teamMember.create({
      data: body,
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'CREATE',
        entity: 'team_members',
        entityId: member.id,
        changes: JSON.stringify(body),
      },
    });

    return NextResponse.json(member, { status: 201 });
  } catch (error: any) {
    console.error('Team member creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create team member' },
      { status: 500 }
    );
  }
}

// GET all team members
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const published = searchParams.get('published');

    const where: any = {};
    if (category) where.category = category;
    if (published !== null) where.published = published === 'true';

    const members = await prisma.teamMember.findMany({
      where,
      orderBy: [{ category: 'asc' }, { order: 'asc' }],
    });

    return NextResponse.json(members);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    );
  }
}

// ================================================================

