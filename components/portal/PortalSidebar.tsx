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
  Sun,
  Moon,
} from 'lucide-react';
import { authApi } from '@/lib/portal-auth';
import { ContributorProfile } from '@/lib/portal-data';
import { usePortalTheme } from './PortalThemeContext';

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
  const { isDark, toggleTheme } = usePortalTheme();

  const handleSignOut = async () => {
    await authApi.logout();
    router.push('/portal/login');
  };

  return (
    <aside
      className={`w-64 h-full border-r flex flex-col justify-between p-5 select-none transition-colors duration-150 ${
        isDark
          ? 'bg-[#0d0f12] border-neutral-800 text-white'
          : 'bg-white border-neutral-200 text-neutral-900'
      }`}
    >
      {/* Top: Logo & Nav Links */}
      <div>
        {/* Brand Logo */}
        <div className={`pb-6 border-b ${isDark ? 'border-neutral-800' : 'border-neutral-100'}`}>
          <Link
            href="/portal"
            onClick={onCloseMobile}
            className="flex items-center gap-2 group transition-opacity hover:opacity-85"
          >
            <Image
              src={isDark ? '/logo-negative.png' : '/logo.png'}
              alt="Evalixa AI"
              width={125}
              height={30}
              className="h-7 w-auto object-contain"
              priority
            />
          </Link>
          <div
            className={`font-mono text-[10px] uppercase tracking-wider mt-2 font-medium ${
              isDark ? 'text-neutral-500' : 'text-neutral-400'
            }`}
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
                    ? isDark
                      ? 'bg-neutral-800 text-white font-semibold'
                      : 'bg-neutral-100 text-neutral-900 font-semibold'
                    : isDark
                    ? 'text-neutral-400 hover:text-white hover:bg-neutral-800/40'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive
                      ? isDark
                        ? 'text-white'
                        : 'text-neutral-900'
                      : isDark
                      ? 'text-neutral-500'
                      : 'text-neutral-400'
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom: User Card, Theme Toggle & Actions */}
      <div className={`pt-5 border-t space-y-2.5 ${isDark ? 'border-neutral-800' : 'border-neutral-100'}`}>
        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={toggleTheme}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
            isDark
              ? 'bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
              : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border border-neutral-200'
          }`}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        >
          <div className="flex items-center gap-2">
            {isDark ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-neutral-600" />
            )}
            <span>Theme</span>
          </div>
          <span className={`font-semibold ${isDark ? 'text-amber-400' : 'text-neutral-900'}`}>
            {isDark ? 'Dark' : 'Light'}
          </span>
        </button>

        {/* Public Website Link */}
        <Link
          href="/"
          className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors ${
            isDark
              ? 'text-neutral-400 hover:text-white hover:bg-neutral-800/40'
              : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
          }`}
        >
          <span>Main Website</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>

        {/* Contributor Profile Info */}
        <div
          className={`px-3 py-2.5 rounded-lg border ${
            isDark
              ? 'bg-neutral-900/90 border-neutral-800'
              : 'bg-neutral-50 border-neutral-200/80'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 ${
                isDark
                  ? 'bg-neutral-800 text-white border border-neutral-700'
                  : 'bg-neutral-200 text-neutral-800'
              }`}
            >
              {profile.avatarInitials}
            </div>
            <div className="truncate">
              <div
                className={`text-xs font-semibold truncate ${
                  isDark ? 'text-white' : 'text-neutral-900'
                }`}
              >
                {profile.name}
              </div>
              <div
                className={`text-[11px] font-mono truncate ${
                  isDark ? 'text-neutral-500' : 'text-neutral-500'
                }`}
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
