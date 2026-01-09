// lib/prisma.ts
// Prisma client singleton for Next.js
// Prevents multiple instances in development

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Create a function to get Prisma client lazily
function getPrismaClient() {
  if (!process.env.DATABASE_URL) {
    console.warn('DATABASE_URL not set, Prisma client not initialized');
    return null as any;
  }
  
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  }
  
  return globalForPrisma.prisma;
}

// Export a proxy that lazily initializes Prisma
export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop) {
    const client = getPrismaClient();
    if (!client) {
      throw new Error('Prisma client not available - DATABASE_URL not configured');
    }
    return (client as any)[prop];
  }
});

export default prisma;