// app/not-found.tsx
// Custom 404 page

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header currentPath="" />
      
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <div className="text-6xl mb-6">🔍</div>
          <h1 className="text-3xl font-semibold text-slate-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-base text-slate-600 mb-8">
            The page you're looking for doesn't exist or may have been moved.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/"
              className="px-6 py-3 bg-[#3d3e65] text-white rounded-lg font-medium hover:bg-slate-700 transition-colors"
            >
              Go Home
            </a>
            <a
              href="/events"
              className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
            >
              View Events
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}