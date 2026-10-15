'use client';

import Link from 'next/link';
import { ContributorProfile } from '@/lib/portal-data';
import { usePortalTheme } from '../PortalThemeContext';

interface PortalProfileHeaderProps {
  profile: ContributorProfile;
}

export default function PortalProfileHeader({ profile }: PortalProfileHeaderProps) {
  const firstName = profile.name.split(' ')[0] || profile.name;
  const { isDark } = usePortalTheme();

  return (
    <div
      className={`mb-8 pb-6 border-b flex flex-col sm:flex-row sm:items-end justify-between gap-4 transition-colors ${
        isDark ? 'border-neutral-800' : 'border-neutral-200'
      }`}
    >
      <div>
        <span
          className={`font-mono text-xs uppercase tracking-wider font-medium block mb-1 ${
            isDark ? 'text-neutral-500' : 'text-neutral-500'
          }`}
        >
          Welcome back, {firstName}
        </span>
        <h1
          className={`font-display font-bold text-2xl sm:text-3xl tracking-tight ${
            isDark ? 'text-white' : 'text-neutral-900'
          }`}
        >
          Contribution Hub
        </h1>
        <p className={`text-sm mt-1 max-w-xl ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
          Projects matched to your expertise, technical benchmarks, and the status of your evaluation work.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/portal/projects"
          className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition-colors shadow-xs ${
            isDark
              ? 'bg-white text-black hover:bg-neutral-200'
              : 'bg-neutral-900 hover:bg-black text-white'
          }`}
        >
          Browse Projects
        </Link>
      </div>
    </div>
  );
}
