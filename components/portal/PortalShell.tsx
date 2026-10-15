'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import PortalSidebar from './PortalSidebar';
import { ContributorProfile } from '@/lib/portal-data';

interface PortalShellProps {
  profile: ContributorProfile;
  children: React.ReactNode;
}

export default function PortalShell({ profile, children }: PortalShellProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white flex flex-col md:flex-row">
      {/* Desktop Sticky Left Sidebar */}
      <div className="hidden md:block fixed top-0 left-0 bottom-0 z-30 w-64">
        <PortalSidebar profile={profile} />
      </div>

      {/* Mobile Top Navigation Bar */}
      <div className="md:hidden sticky top-0 z-30 w-full h-14 bg-white border-b border-neutral-200 px-4 flex items-center justify-between">
        <Link href="/portal" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Evalixa AI"
            width={100}
            height={24}
            className="h-6 w-auto object-contain"
          />
        </Link>

        <button
          type="button"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-1.5 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
          aria-label="Toggle navigation"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Off-Canvas Drawer */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-64 max-w-[80%] h-full z-10 shadow-xl">
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
        <footer className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-6 border-t border-neutral-200/80 text-xs font-mono text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>Evalixa AI Evaluation Lab • All Rights Reserved</div>
          <div className="flex items-center gap-4">
            <Link href="/terms-of-service" className="hover:text-neutral-700 transition-colors">
              Terms
            </Link>
            <Link href="/privacy-policy" className="hover:text-neutral-700 transition-colors">
              Privacy
            </Link>
            <Link href="/" className="hover:text-neutral-700 transition-colors">
              Platform Site
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
