// app/api/admin/team/[id]/route.ts
// API routes for individual team member operations

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET single team member
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const member = await prisma.teamMember.findUnique({
      where: { id: context.params.id },
    });

    if (!member) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }

    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch team member' },
      { status: 500 }
    );
  }
}

// UPDATE team member
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const member = await prisma.teamMember.update({
      where: { id: context.params.id },
      data: body,
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'UPDATE',
        entity: 'team_members',
        entityId: member.id,
        changes: JSON.stringify(body),
      },
    });

    return NextResponse.json(member);
  } catch (error: any) {
    console.error('Team member update error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update team member' },
      { status: 500 }
    );
  }
}

// DELETE team member
export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const member = await prisma.teamMember.findUnique({
      where: { id: context.params.id },
    });

    if (!member) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }

    await prisma.teamMember.delete({
      where: { id: context.params.id },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'DELETE',
        entity: 'team_members',
        entityId: context.params.id,
        changes: JSON.stringify(member),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Team member deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete team member' },
      { status: 500 }
    );
  }
}