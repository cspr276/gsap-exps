'use client';

import Link from 'next/link';
import { ContributorProfile } from '@/lib/portal-data';

interface PortalProfileHeaderProps {
  profile: ContributorProfile;
}

export default function PortalProfileHeader({ profile }: PortalProfileHeaderProps) {
  const firstName = profile.name.split(' ')[0] || profile.name;

  return (
    <div className="mb-8 pb-6 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 font-medium block mb-1">
          Welcome back, {firstName}
        </span>
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 tracking-tight">
          Contribution Hub
        </h1>
        <p className="text-sm text-neutral-600 mt-1 max-w-xl">
          Projects matched to your expertise, technical benchmarks, and the status of your evaluation work.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/portal/projects"
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-neutral-900 hover:bg-black text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors shadow-xs"
        >
          Browse Projects
        </Link>
      </div>
    </div>
  );
}
