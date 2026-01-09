// next.config.js
// Next.js configuration for Spandan website

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Disable static generation for API routes and dynamic pages during build
  experimental: {
    isrMemoryCacheSize: 0,
  },
  
  // Image optimization configuration
  images: {
    formats: ['image/avif', 'image/webp'],
    // Add domains if loading external images
    // domains: ['example.com'],
  },
  
  // Environment variables that should be available on the client side
  // env: {
  //   NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  // },
  
  // Redirects (if needed)
  // async redirects() {
  //   return [
  //     {
  //       source: '/old-path',
  //       destination: '/new-path',
  //       permanent: true,
  //     },
  //   ];
  // },
  
  // Headers (security and caching)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;