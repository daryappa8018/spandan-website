// app/loading.tsx
// Global loading state

import Header from '@/components/layout/Header';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <Header currentPath="" />
      
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#3d3e65] border-r-transparent mb-4"></div>
          <p className="text-sm text-slate-600">Loading...</p>
        </div>
      </div>
    </div>
  );
}