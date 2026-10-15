'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  Briefcase,
  Layers,
  FileCheck2,
  User,
  ArrowUpRight,
  LogOut,
  ChevronDown,
  Menu,
  X,
  CreditCard,
  ShieldCheck,
} from 'lucide-react';
import { authApi } from '@/lib/portal-auth';
import { ContributorProfile } from '@/lib/portal-data';

interface PortalNavbarProps {
  profile: ContributorProfile;
}

const NAV_ITEMS = [
  { href: '/portal', label: 'Overview', icon: Layers, exact: true },
  { href: '/portal/projects', label: 'Projects', icon: Briefcase },
  { href: '/portal/applications', label: 'Applications', icon: FileCheck2 },
  { href: '/portal/profile', label: 'Profile', icon: User },
];

export default function PortalNavbar({ profile }: PortalNavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await authApi.logout();
    router.push('/portal/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/85 backdrop-blur-md border-b border-neutral-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
        {/* Left: Brand Logo & Hub Tag */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/logo-negative.png"
              alt="Evalixa AI"
              width={120}
              height={30}
              className="h-6 sm:h-7 w-auto object-contain transition-opacity group-hover:opacity-85"
              priority
            />
          </Link>

          {/* Divider */}
          <div className="hidden sm:block h-4 w-px bg-neutral-800" />

          {/* Hub Label with Pulsing Live Indicator */}
          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-neutral-400 uppercase tracking-widest bg-neutral-900/80 border border-neutral-800 rounded-md px-2.5 py-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-white font-semibold">EC HUB</span>
            <span className="text-neutral-500">//</span>
            <span className="text-neutral-400">BENCHMARK LAB</span>
          </div>
        </div>

        {/* Center: Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-neutral-900/60 border border-neutral-800/90 rounded-lg p-1">
          {NAV_ITEMS.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-mono tracking-wider uppercase transition-all ${
                  isActive
                    ? 'bg-neutral-800 text-white font-semibold shadow-xs'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-neutral-500'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Controls: Balance, User Profile Dropdown, Back to site */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Earnings / Balance Badge */}
          <div className="hidden lg:flex items-center gap-2 font-mono text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-lg">
            <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
            <span>${profile.availableBalance.toLocaleString()}.00 Available</span>
          </div>

          {/* User Menu Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2.5 p-1 sm:px-2.5 sm:py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer"
              aria-expanded={profileDropdownOpen}
            >
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-mono text-xs font-bold">
                {profile.avatarInitials}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-medium text-white truncate max-w-[110px]">
                  {profile.name}
                </div>
                <div className="text-[10px] font-mono text-neutral-400 leading-none">
                  {profile.tier}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setProfileDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-64 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl py-2 z-40 animate-in fade-in-50 zoom-in-95 duration-100">
                  <div className="px-4 py-2.5 border-b border-neutral-800">
                    <p className="text-xs font-semibold text-white">{profile.name}</p>
                    <p className="text-[11px] font-mono text-neutral-400 truncate">{profile.email}</p>
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-emerald-950/80 border border-emerald-800/60 text-emerald-300">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>{profile.verificationStatus.toUpperCase()} CONTRIBUTOR</span>
                    </div>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/portal/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-neutral-300 hover:text-white hover:bg-neutral-800/70 transition-colors"
                    >
                      <User className="w-4 h-4 text-neutral-400" />
                      <span>View Profile & Verification</span>
                    </Link>
                    <Link
                      href="/"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-neutral-300 hover:text-white hover:bg-neutral-800/70 transition-colors"
                    >
                      <ArrowUpRight className="w-4 h-4 text-neutral-400" />
                      <span>Public Platform Website</span>
                    </Link>
                  </div>

                  <div className="pt-1 border-t border-neutral-800">
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-800 bg-neutral-950 px-4 py-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-mono uppercase tracking-wider ${
                  isActive
                    ? 'bg-neutral-800 text-white font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-neutral-500'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
