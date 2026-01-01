// app/tech-projects/[slug]/page.tsx
// Tech project detail page

import { notFound } from 'next/navigation';

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  // TODO: Implement project detail page with database query
  notFound();
}