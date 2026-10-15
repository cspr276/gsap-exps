'use client';

import { ContributorProfile } from '@/lib/portal-data';

interface PortalMetricBentoProps {
  profile: ContributorProfile;
  activeApplicationsCount: number;
  openProjectsCount: number;
}

const tileClasses =
  'border rounded-xl p-5 shadow-xs bg-white dark:bg-neutral-900/60 border-neutral-200/90 dark:border-neutral-800 text-neutral-900 dark:text-white';

const labelClasses =
  'font-mono text-xs uppercase tracking-wider font-medium block mb-2 text-neutral-500 dark:text-neutral-400';

const numberClasses =
  'font-display font-bold text-2xl sm:text-3xl tracking-tight text-neutral-900 dark:text-white';

const subClasses =
  'text-xs mt-1.5 font-sans text-neutral-500 dark:text-neutral-400';

export default function PortalMetricBento({
  profile,
  activeApplicationsCount,
  openProjectsCount,
}: PortalMetricBentoProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* 1. Total Earnings */}
      <div className={tileClasses}>
        <span className={labelClasses}>Total Earnings</span>
        <div className={numberClasses}>
          ${profile.totalEarnings.toLocaleString()}.00
        </div>
        <p className={subClasses}>
          ${profile.availableBalance.toLocaleString()}.00 available to withdraw
        </p>
      </div>

      {/* 2. Available Projects */}
      <div className={tileClasses}>
        <span className={labelClasses}>Available Modules</span>
        <div className={numberClasses}>{openProjectsCount} Modules</div>
        <p className={subClasses}>Across SWE-bench, RLHF, and FrontierMath</p>
      </div>

      {/* 3. Applications In Queue */}
      <div className={tileClasses}>
        <span className={labelClasses}>Applications</span>
        <div className={numberClasses}>{activeApplicationsCount} In Review</div>
        <p className={subClasses}>1 contract active, 2 under review</p>
      </div>

      {/* 4. Review Accuracy */}
      <div className={tileClasses}>
        <span className={labelClasses}>Review Accuracy</span>
        <div className={numberClasses}>{profile.reviewAccuracy}</div>
        <p className={subClasses}>{profile.completedTasks} completed verification tasks</p>
      </div>
    </div>
  );
}
