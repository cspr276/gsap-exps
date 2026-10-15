'use client';

import { ContributorProfile } from '@/lib/portal-data';

interface PortalMetricBentoProps {
  profile: ContributorProfile;
  activeApplicationsCount: number;
  openProjectsCount: number;
}

export default function PortalMetricBento({
  profile,
  activeApplicationsCount,
  openProjectsCount,
}: PortalMetricBentoProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* 1. Total Earnings */}
      <div className="bg-white border border-neutral-200/90 rounded-xl p-5 shadow-xs">
        <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 font-medium block mb-2">
          Total Earnings
        </span>
        <div className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 tracking-tight">
          ${profile.totalEarnings.toLocaleString()}.00
        </div>
        <p className="text-xs text-neutral-500 mt-1.5 font-sans">
          ${profile.availableBalance.toLocaleString()}.00 available to withdraw
        </p>
      </div>

      {/* 2. Available Projects */}
      <div className="bg-white border border-neutral-200/90 rounded-xl p-5 shadow-xs">
        <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 font-medium block mb-2">
          Available Modules
        </span>
        <div className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 tracking-tight">
          {openProjectsCount} Modules
        </div>
        <p className="text-xs text-neutral-500 mt-1.5 font-sans">
          Across SWE-bench, RLHF, and FrontierMath
        </p>
      </div>

      {/* 3. Applications In Queue */}
      <div className="bg-white border border-neutral-200/90 rounded-xl p-5 shadow-xs">
        <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 font-medium block mb-2">
          Applications
        </span>
        <div className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 tracking-tight">
          {activeApplicationsCount} In Review
        </div>
        <p className="text-xs text-neutral-500 mt-1.5 font-sans">
          1 contract active, 2 under review
        </p>
      </div>

      {/* 4. Review Accuracy */}
      <div className="bg-white border border-neutral-200/90 rounded-xl p-5 shadow-xs">
        <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 font-medium block mb-2">
          Review Accuracy
        </span>
        <div className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 tracking-tight">
          {profile.reviewAccuracy}
        </div>
        <p className="text-xs text-neutral-500 mt-1.5 font-sans">
          {profile.completedTasks} completed verification tasks
        </p>
      </div>
    </div>
  );
}
