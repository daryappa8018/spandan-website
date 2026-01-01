// app/api/admin/projects/route.ts
// API routes for project CRUD operations

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// CREATE new project
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { constraints, technologies, metrics, ...projectData } = body;

    const project = await prisma.techProject.create({
      data: {
        ...projectData,
        constraints: {
          create: constraints.map((text: string, index: number) => ({
            text,
            order: index,
          })),
        },
        technologies: {
          create: technologies.map((name: string) => ({ name })),
        },
        metrics: {
          create: Object.entries(metrics || {}).map(([key, value]) => ({
            key,
            value: String(value),
          })),
        },
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'CREATE',
        entity: 'tech_projects',
        entityId: project.id,
        changes: JSON.stringify(projectData),
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    console.error('Project creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create project' },
      { status: 500 }
    );
  }
}

// GET all projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const published = searchParams.get('published');

    const where: any = {};
    if (status) where.status = status;
    if (published !== null) where.published = published === 'true';

    const projects = await prisma.techProject.findMany({
      where,
      include: {
        constraints: { orderBy: { order: 'asc' } },
        technologies: true,
        metrics: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(projects);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
