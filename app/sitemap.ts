// app/sitemap.ts
// Generate sitemap.xml for SEO

import { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spandan-website.vercel.app';

  let events: { slug: string; updatedAt: Date }[] = [];
  let projects: { slug: string; updatedAt: Date }[] = [];

  try {
    // Only fetch from database in production/runtime, not during build
    if (process.env.DATABASE_URL && process.env.NODE_ENV !== 'production') {
      const { prisma } = await import('@/lib/prisma');
      
      events = await prisma.event.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }).catch(() => []);

      projects = await prisma.techProject.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }).catch(() => []);
    }
  } catch (error) {
    console.log('Sitemap: Using static URLs only (database not available during build)');
  }

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/donation-drives`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tech-projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/impact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ];

  // Event pages
  const eventPages = events.map((event) => ({
    url: `${baseUrl}/events/${event.slug}`,
    lastModified: event.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Project pages (if you add detail pages later)
  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/tech-projects/${project.slug}`,
    lastModified: project.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...eventPages, ...projectPages];
}