// middleware.ts
// Protect admin routes and handle redirects

import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Admin routes protection
    if (req.nextUrl.pathname.startsWith('/admin')) {
      const token = req.nextauth.token;
      
      // Redirect to login if not authenticated
      if (!token) {
        return NextResponse.redirect(new URL('/admin/login', req.url));
      }

      // Check if user has required role
      const userRole = token.role as string;
      if (!['ADMIN', 'EDITOR', 'VIEWER'].includes(userRole)) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to login page without authentication
        if (req.nextUrl.pathname === '/admin/login') {
          return true;
        }

        // Require authentication for all other admin routes
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return !!token;
        }

        // Public routes don't require authentication
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
  ],
};