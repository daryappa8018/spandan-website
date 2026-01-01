// app/admin/events/[id]/edit/page.tsx
// Edit existing event

import { requireEditor } from '@/lib/auth-utils';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
// import EventEditForm from '@/components/admin/EventEditForm'; // TODO: Create this component

export const dynamic = 'force-dynamic';

export default async function EditEventPage({
  params,
}: {
  params: { id: string };
}) {
  await requireEditor();

  const event = await prisma.event.findUnique({
    where: { id: params.id },
    include: {
      metrics: true,
      details: {
        include: {
          metrics: true,
        },
      },
    },
  });

  if (!event) {
    notFound();
  }

  return <div>TODO: EventEditForm component - event ID: {event.id}</div>;
}