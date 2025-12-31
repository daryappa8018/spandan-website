// app/layout.tsx
// Root layout component for Spandan website
// Includes metadata, fonts, and global structure

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

// Font configuration
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Site metadata
// DATA REPLACEMENT: Update with actual site information
export const metadata: Metadata = {
  title: {
    default: 'Spandan - Socio-Technical Club',
    template: '%s | Spandan',
  },
  description:
    'Spandan is a student-run initiative using technology and community organization to address gaps in healthcare access, resource distribution, and rural development.',
  keywords: [
    'Spandan',
    'socio-technical',
    'student organization',
    'community service',
    'blood donation',
    'village camps',
    'health checkups',
    'donation drives',
    'social impact',
  ],
  authors: [{ name: 'Spandan Team' }],
  creator: 'Spandan',
  publisher: 'Spandan',
  
  // Open Graph metadata for social sharing
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://spandan.example.com', // DATA REPLACEMENT: Update with actual URL
    siteName: 'Spandan',
    title: 'Spandan - Socio-Technical Club',
    description:
      'Student-run initiative using technology for social impact through blood donation camps, village outreach, and community service.',
    images: [
      {
        url: '/og-image.jpg', // DATA REPLACEMENT: Add actual OG image
        width: 1200,
        height: 630,
        alt: 'Spandan - Socio-Technical Club',
      },
    ],
  },
  
  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    title: 'Spandan - Socio-Technical Club',
    description:
      'Student-run initiative using technology for social impact.',
    images: ['/og-image.jpg'], // DATA REPLACEMENT: Add actual Twitter image
  },
  
  // Verification tags (optional)
  // verification: {
  //   google: 'your-google-verification-code',
  // },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Icons
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  
  // Manifest
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-white text-slate-900">
        {/* Main content */}
        {children}
        
        {/* Optional: Analytics script placeholder */}
        {/* Add your analytics script here (Google Analytics, Plausible, etc.) */}
      </body>
    </html>
  );
}