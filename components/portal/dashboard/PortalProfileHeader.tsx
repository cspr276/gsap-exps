'use client';

import Link from 'next/link';
import { ContributorProfile } from '@/lib/portal-data';

interface PortalProfileHeaderProps {
  profile: ContributorProfile;
}

export default function PortalProfileHeader({ profile }: PortalProfileHeaderProps) {
  const firstName = profile.name.split(' ')[0] || profile.name;

  return (
    <div
      className="mb-8 pb-6 border-b border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
    >
      <div>
        <span
          className="font-mono text-xs uppercase tracking-wider font-medium block mb-1 text-neutral-500"
        >
          Welcome back, {firstName}
        </span>
        <h1
          className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-neutral-900 dark:text-white"
        >
          Contribution Hub
        </h1>
        <p className="text-sm mt-1 max-w-xl text-neutral-600 dark:text-neutral-400">
          Projects matched to your expertise, technical benchmarks, and the status of your evaluation work.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/portal/projects"
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition-colors shadow-xs bg-neutral-900 hover:bg-black dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 text-white"
        >
          Browse Projects
        </Link>
      </div>
    </div>
  );
}
