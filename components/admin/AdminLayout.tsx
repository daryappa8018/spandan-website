// components/admin/AdminLayout.tsx
// Admin dashboard layout with sidebar navigation

'use client';

import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { data: session } = useSession();
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'Events', href: '/admin/events', icon: '📅' },
    { name: 'Gallery', href: '/admin/gallery', icon: '📸' },
    { name: 'Team', href: '/admin/team', icon: '👥' },
    { name: 'Tech Projects', href: '/admin/projects', icon: '💻' },
    { name: 'Impact Data', href: '/admin/impact', icon: '📈' },
    { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2 hover:opacity-80">
              <span className="text-lg font-semibold text-[#3d3e65]">Spandan</span>
              <span className="text-xs bg-slate-100 px-2 py-1 rounded">Admin</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">{session?.user?.name}</p>
              <p className="text-xs text-slate-500">{session?.user?.role}</p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="text-sm text-slate-600 hover:text-slate-900 px-4 py-2 border border-slate-300 rounded hover:bg-slate-50 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 fixed left-0 bottom-0 top-16 overflow-y-auto">
          <nav className="p-4 space-y-1">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                  isActive(item.href)
                    ? 'bg-[#3d3e65] text-white font-medium'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </a>
            ))}
          </nav>

          {/* Quick Actions */}
          <div className="p-4 border-t border-slate-200 mt-4">
            <p className="text-xs font-semibold text-slate-500 uppercase mb-3">
              Quick Actions
            </p>
            <div className="space-y-2">
              <a
                href="/admin/events/new"
                className="block text-sm text-[#3d3e65] hover:underline"
              >
                + New Event
              </a>
              <a
                href="/admin/gallery/new"
                className="block text-sm text-[#3d3e65] hover:underline"
              >
                + Add Photo
              </a>
              <a
                href="/admin/team/new"
                className="block text-sm text-[#3d3e65] hover:underline"
              >
                + Add Team Member
              </a>
              <a
                href="/admin/projects/new"
                className="block text-sm text-[#3d3e65] hover:underline"
              >
                + New Project
              </a>
            </div>
          </div>

          {/* View Site */}
          <div className="p-4 border-t border-slate-200">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#3d3e65]"
            >
              <span>🌐</span>
              <span>View Public Site</span>
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
