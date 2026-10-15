'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, Sun, Moon } from 'lucide-react';
import PortalSidebar from './PortalSidebar';
import { ContributorProfile } from '@/lib/portal-data';
import { PortalThemeProvider, usePortalTheme } from './PortalThemeContext';

interface PortalShellProps {
  profile: ContributorProfile;
  children: React.ReactNode;
}

function PortalShellInner({ profile, children }: PortalShellProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { isDark, toggleTheme } = usePortalTheme();

  return (
    <div
      className={`min-h-screen font-sans flex flex-col md:flex-row transition-colors duration-150 ${
        isDark
          ? 'bg-[#09090b] text-neutral-100 selection:bg-neutral-800 selection:text-white'
          : 'bg-[#F8FAFC] text-neutral-900 selection:bg-neutral-900 selection:text-white'
      }`}
    >
      {/* Desktop Sticky Left Sidebar */}
      <div className="hidden md:block fixed top-0 left-0 bottom-0 z-30 w-64">
        <PortalSidebar profile={profile} />
      </div>

      {/* Mobile Top Navigation Bar */}
      <div
        className={`md:hidden sticky top-0 z-30 w-full h-14 border-b px-4 flex items-center justify-between transition-colors ${
          isDark
            ? 'bg-[#0d0f12] border-neutral-800 text-white'
            : 'bg-white border-neutral-200 text-neutral-900'
        }`}
      >
        <Link href="/portal" className="flex items-center gap-2">
          <Image
            src={isDark ? '/logo-negative.png' : '/logo.png'}
            alt="Evalixa AI"
            width={100}
            height={24}
            className="h-6 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-2">
          {/* Mobile Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className={`p-1.5 rounded-lg border transition-colors ${
              isDark
                ? 'bg-neutral-900 border-neutral-800 text-amber-400 hover:text-white'
                : 'bg-neutral-100 border-neutral-200 text-neutral-700 hover:text-neutral-900'
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className={`p-1.5 rounded-lg transition-colors ${
              isDark
                ? 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
            aria-label="Toggle navigation"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Off-Canvas Drawer */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-64 max-w-[80%] h-full z-10 shadow-2xl">
            <PortalSidebar
              profile={profile}
              onCloseMobile={() => setMobileSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen">
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
          {children}
        </main>

        {/* Minimal Footer */}
        <footer
          className={`w-full max-w-6xl mx-auto px-4 sm:px-8 py-6 border-t text-xs font-mono flex flex-col sm:flex-row items-center justify-between gap-3 transition-colors ${
            isDark
              ? 'border-neutral-800 text-neutral-500'
              : 'border-neutral-200/80 text-neutral-400'
          }`}
        >
          <div>Evalixa AI Evaluation Lab • All Rights Reserved</div>
          <div className="flex items-center gap-4">
            <Link
              href="/terms-of-service"
              className={isDark ? 'hover:text-neutral-300' : 'hover:text-neutral-700'}
            >
              Terms
            </Link>
            <Link
              href="/privacy-policy"
              className={isDark ? 'hover:text-neutral-300' : 'hover:text-neutral-700'}
            >
              Privacy
            </Link>
            <Link
              href="/"
              className={isDark ? 'hover:text-neutral-300' : 'hover:text-neutral-700'}
            >
              Platform Site
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function PortalShell({ profile, children }: PortalShellProps) {
  return (
    <PortalThemeProvider>
      <PortalShellInner profile={profile}>{children}</PortalShellInner>
    </PortalThemeProvider>
  );
}
