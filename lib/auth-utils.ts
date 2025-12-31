// lib/auth-utils.ts
// Authentication utility functions

import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';

/**
 * Get current session (server-side)
 */
export async function getCurrentSession() {
  return await getServerSession(authOptions);
}

/**
 * Get current user or redirect to login
 */
export async function requireAuth() {
  const session = await getCurrentSession();
  
  if (!session?.user) {
    redirect('/admin/login');
  }
  
  return session.user;
}

/**
 * Check if user has specific role
 */
export async function requireRole(allowedRoles: string[]) {
  const user = await requireAuth();
  
  if (!allowedRoles.includes(user.role)) {
    redirect('/admin');
  }
  
  return user;
}

/**
 * Check if user is admin
 */
export async function requireAdmin() {
  return await requireRole(['ADMIN']);
}

/**
 * Check if user can edit content
 */
export async function requireEditor() {
  return await requireRole(['ADMIN', 'EDITOR']);
}

/**
 * Hash password
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

/**
 * Verify password
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

/**
 * Generate random password
 */
export function generatePassword(length: number = 12): string {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  
  return password;
}

/**
 * Check password strength
 */
export function isStrongPassword(password: string): {
  isStrong: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isStrong: errors.length === 0,
    errors,
  };
}