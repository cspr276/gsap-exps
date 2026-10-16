'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  User,
  LogOut,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';
import { authApi } from '@/lib/portal-auth';
import { ContributorProfile } from '@/lib/portal-data';
import { ModeToggle } from '@/components/mode-toggle';

interface PortalSidebarProps {
  profile: ContributorProfile;
  onCloseMobile?: () => void;
}

const NAV_ITEMS = [
  { href: '/portal', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/portal/projects', label: 'Find projects', icon: FolderKanban },
  { href: '/portal/applications', label: 'Applications', icon: FileText },
  { href: '/portal/profile', label: 'Profile', icon: User },
];

export default function PortalSidebar({ profile, onCloseMobile }: PortalSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await authApi.logout();
    router.push('/portal/login');
  };

  return (
    <aside
      className="w-64 h-full border-r flex flex-col justify-between p-5 select-none bg-white dark:bg-[#0d0f12] border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white"
    >
      {/* Top: Logo & Nav Links */}
      <div>
        {/* Brand Logo with pure CSS dark/light swap to prevent any flash */}
        <div className="pb-6 border-b border-neutral-100 dark:border-neutral-800">
          <Link
            href="/portal"
            onClick={onCloseMobile}
            className="flex items-center gap-2 group transition-opacity hover:opacity-85"
          >
            <Image
              src="/logo.png"
              alt="Evalixa AI"
              width={125}
              height={30}
              className="h-7 w-auto object-contain dark:hidden"
              priority
            />
            <Image
              src="/logo-negative.png"
              alt="Evalixa AI"
              width={125}
              height={30}
              className="h-7 w-auto object-contain hidden dark:block"
              priority
            />
          </Link>
          <div
            className="font-mono text-[10px] uppercase tracking-wider mt-2 font-medium text-neutral-400 dark:text-neutral-500"
          >
            Evaluation Portal
          </div>
        </div>

        {/* Navigation List */}
        <nav className="mt-6 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive
                      ? 'text-neutral-900 dark:text-white'
                      : 'text-neutral-400 dark:text-neutral-500'
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom: User Card, Theme Toggle & Actions */}
      <div className="pt-5 border-t border-neutral-100 dark:border-neutral-800 space-y-2.5">
        {/* Theme Dropdown */}
        <div className="flex items-center justify-between px-3 py-2 rounded-lg border bg-neutral-50 dark:bg-neutral-900/60 border-neutral-200/80 dark:border-neutral-800">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-medium">
            Theme
          </span>
          <ModeToggle />
        </div>


        {/* Public Website Link */}
        <Link
          href="/"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/40"
        >
          <span>Main Website</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>

        {/* Contributor Profile Info */}
        <div
          className="px-3 py-2.5 rounded-lg border bg-neutral-50 dark:bg-neutral-900/90 border-neutral-200/80 dark:border-neutral-800"
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-white border border-transparent dark:border-neutral-700"
            >
              {profile.avatarInitials}
            </div>
            <div className="truncate">
              <div
                className="text-xs font-semibold truncate text-neutral-900 dark:text-white"
              >
                {profile.name}
              </div>
              <div
                className="text-[11px] font-mono truncate text-neutral-500 dark:text-neutral-500"
              >
                {profile.email}
              </div>
            </div>
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          type="button"
          onClick={handleSignOut}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-neutral-500 hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
