'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  FileCheck,
  Users,
  Bell,
  LogOut,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';
import { authApi } from '@/lib/portal-auth';
import { ModeToggle } from '@/components/mode-toggle';

interface AdminSidebarProps {
  urgentCount?: number;
  onCloseMobile?: () => void;
}

const ADMIN_NAV_ITEMS = [
  { href: '/portal/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/portal/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/portal/admin/applications', label: 'Applications', icon: FileCheck },
  { href: '/portal/admin/users', label: 'Users & ECs', icon: Users },
  { href: '/portal/admin/notifications', label: 'Requests', icon: Bell, badgeKey: 'urgent' },
];

export default function AdminSidebar({ urgentCount = 0, onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await authApi.logout();
    router.push('/portal/login');
  };

  return (
    <aside
      className="w-full h-full flex flex-col justify-between p-4 sm:p-5 border-r select-none bg-white dark:bg-[#0d0f12] border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white"
    >
      {/* Top Branding & Admin Tag */}
      <div>
        <div className="flex items-center justify-between pb-5 border-b border-neutral-100 dark:border-neutral-800">
          <Link href="/portal/admin" className="flex items-center gap-2 group transition-opacity hover:opacity-85">
            <Image
              src="/logo.png"
              alt="Evalixa AI"
              width={112}
              height={28}
              className="h-6 w-auto object-contain dark:hidden"
              priority
            />
            <Image
              src="/logo-negative.png"
              alt="Evalixa AI"
              width={112}
              height={28}
              className="h-6 w-auto object-contain hidden dark:block"
              priority
            />
          </Link>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md font-mono text-[10px] uppercase tracking-wider font-semibold bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs">
            <ShieldAlert className="w-3 h-3" />
            <span>Admin</span>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="mt-5 space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-wider px-3 mb-2 font-medium text-neutral-400 dark:text-neutral-500">
            Operations Console
          </div>
          {ADMIN_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact ? pathname === item.href : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono tracking-wide transition-all group ${
                  isActive
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-105 ${
                      isActive ? 'text-white dark:text-neutral-900' : 'text-neutral-500 dark:text-neutral-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badgeKey === 'urgent' && urgentCount > 0 && (
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-white/20 dark:bg-black/20 text-white dark:text-black'
                        : 'bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900'
                    }`}
                  >
                    {urgentCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>


      </div>

      {/* Bottom: Theme Toggle & Admin User Card */}
      <div className="pt-5 border-t border-neutral-100 dark:border-neutral-800 space-y-2.5">
        {/* Theme Dropdown Row */}
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

        {/* Admin Profile Info */}
        <div className="px-3 py-2.5 rounded-lg border bg-neutral-50 dark:bg-neutral-900/90 border-neutral-200/80 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 bg-neutral-900 dark:bg-white text-white dark:text-neutral-950">
              SA
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-neutral-900 dark:text-white truncate">
                  Security Admin
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono uppercase font-bold bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                  ROOT
                </span>
              </div>
              <p className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 truncate">
                web-admin@evalixa.com
              </p>
            </div>
          </div>
        </div>

        {/* Sign Out Action */}
        <button
          type="button"
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono tracking-wider uppercase text-neutral-500 hover:text-red-600 dark:text-neutral-400 dark:hover:text-red-400 hover:bg-red-50/60 dark:hover:bg-red-950/20 transition-all cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
