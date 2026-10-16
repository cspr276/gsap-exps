'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ShieldAlert } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import { ModeToggle } from '@/components/mode-toggle';

interface AdminShellProps {
  urgentCount?: number;
  children: React.ReactNode;
}

export default function AdminShell({ urgentCount = 0, children }: AdminShellProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div
      className="min-h-screen font-sans flex flex-col md:flex-row bg-[#F8FAFC] dark:bg-[#09090b] text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white dark:selection:bg-neutral-800"
    >
      {/* Desktop Sticky Left Sidebar */}
      <div className="hidden md:block fixed top-0 left-0 bottom-0 z-30 w-64">
        <AdminSidebar urgentCount={urgentCount} />
      </div>

      {/* Mobile Top Navigation Bar */}
      <div
        className="md:hidden sticky top-0 z-30 w-full h-14 border-b px-4 flex items-center justify-between bg-white dark:bg-[#0d0f12] border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white"
      >
        <Link href="/portal/admin" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Evalixa AI"
            width={100}
            height={24}
            className="h-6 w-auto object-contain dark:hidden"
          />
          <Image
            src="/logo-negative.png"
            alt="Evalixa AI"
            width={100}
            height={24}
            className="h-6 w-auto object-contain hidden dark:block"
          />
          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 ml-1">
            Admin
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Mobile Mode Toggle */}
          <ModeToggle />

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1.5 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
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
            <AdminSidebar
              urgentCount={urgentCount}
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
          className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-6 border-t text-xs font-mono flex flex-col sm:flex-row items-center justify-between gap-3 border-neutral-200/80 dark:border-neutral-800 text-neutral-400 dark:text-neutral-500"
        >
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-3.5 h-3.5 text-neutral-500" />
            <span>Evalixa Operations Console • Privileged Session</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/portal"
              className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
            >
              Contributor Portal
            </Link>
            <Link
              href="/"
              className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
            >
              Public Platform
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
