// components/layout/Header.tsx
// Shared header component used across all pages
// Simple, institutional design - no fancy effects

'use client';

import { mainNavigation } from '@/lib/types';

interface HeaderProps {
  currentPath?: string;
}

export default function Header({ currentPath = '/' }: HeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <div>
            <a href="/" className="block hover:opacity-80 transition-opacity">
              <h1 className="text-xl font-semibold text-[#3d3e65]">Spandan</h1>
              <p className="text-xs text-slate-500 mt-0.5">Socio-Technical Club</p>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 text-sm">
            {mainNavigation.map((item) => {
              const isActive = currentPath === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`transition-colors ${
                    isActive
                      ? 'text-[#3d3e65] font-medium'
                      : 'text-slate-700 hover:text-[#3d3e65]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-700 hover:text-[#3d3e65]"
            aria-label="Toggle menu"
            onClick={() => {
              // In real implementation, this would toggle mobile menu
              console.log('Toggle mobile menu');
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Mobile Navigation - Hidden by default */}
        {/* In real implementation, this would be controlled by state */}
        <nav className="hidden md:hidden mt-4 pt-4 border-t border-slate-200">
          <div className="flex flex-col gap-3">
            {mainNavigation.map((item) => {
              const isActive = currentPath === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`text-sm py-2 transition-colors ${
                    isActive
                      ? 'text-[#3d3e65] font-medium'
                      : 'text-slate-700 hover:text-[#3d3e65]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}