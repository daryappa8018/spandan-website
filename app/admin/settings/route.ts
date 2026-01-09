// app/api/admin/settings/route.ts
// API routes for site settings

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET all settings
export async function GET(request: NextRequest) {
  try {
    const settings = await prisma.siteSetting.findMany({
      orderBy: { category: 'asc' },
    });

    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// UPDATE settings
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !['ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Update or create each setting
    const updates = Object.entries(body).map(([key, value]) => {
      const category = key.startsWith('site_') 
        ? 'contact' 
        : key.includes('instagram') || key.includes('linkedin')
        ? 'social'
        : 'general';

      return prisma.siteSetting.upsert({
        where: { key },
        update: { value: String(value) },
        create: {
          key,
          value: String(value),
          category,
        },
      });
    });

    await Promise.all(updates);

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'UPDATE',
        entity: 'site_settings',
        entityId: 'settings',
        changes: JSON.stringify(body),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Settings update error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update settings' },
      { status: 500 }
    );
  }
}