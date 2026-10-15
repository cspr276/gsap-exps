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
} from 'lucide-react';
import { authApi } from '@/lib/portal-auth';
import { ContributorProfile } from '@/lib/portal-data';

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
    <aside className="w-64 h-full bg-white border-r border-neutral-200 flex flex-col justify-between p-5 select-none">
      {/* Top: Logo & Nav Links */}
      <div>
        {/* Brand Logo */}
        <div className="pb-6 border-b border-neutral-100">
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
              className="h-7 w-auto object-contain"
              priority
            />
          </Link>
          <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 mt-2 font-medium">
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
                    ? 'bg-neutral-100 text-neutral-900 font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-neutral-900' : 'text-neutral-400'
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom: User Card & Actions */}
      <div className="pt-5 border-t border-neutral-100 space-y-3">
        {/* Public Website Link */}
        <Link
          href="/"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
        >
          <span>Main Website</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>

        {/* Contributor Profile Info */}
        <div className="px-3 py-2.5 rounded-lg bg-neutral-50 border border-neutral-200/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-neutral-200 text-neutral-800 flex items-center justify-center font-mono text-xs font-bold flex-shrink-0">
              {profile.avatarInitials}
            </div>
            <div className="truncate">
              <div className="text-xs font-semibold text-neutral-900 truncate">
                {profile.name}
              </div>
              <div className="text-[11px] text-neutral-500 font-mono truncate">
                {profile.email}
              </div>
            </div>
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          type="button"
          onClick={handleSignOut}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-neutral-600 hover:text-red-600 hover:bg-red-50/50 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
