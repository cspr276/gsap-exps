'use client';

import { ContributorProfile } from '@/lib/portal-data';
import { usePortalTheme } from '../PortalThemeContext';

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
  const { isDark } = usePortalTheme();

  const tileClasses = `border rounded-xl p-5 shadow-xs transition-colors ${
    isDark
      ? 'bg-neutral-900/60 border-neutral-800 text-white'
      : 'bg-white border-neutral-200/90 text-neutral-900'
  }`;

  const labelClasses = `font-mono text-xs uppercase tracking-wider font-medium block mb-2 ${
    isDark ? 'text-neutral-400' : 'text-neutral-500'
  }`;

  const numberClasses = `font-display font-bold text-2xl sm:text-3xl tracking-tight ${
    isDark ? 'text-white' : 'text-neutral-900'
  }`;

  const subClasses = `text-xs mt-1.5 font-sans ${
    isDark ? 'text-neutral-400' : 'text-neutral-500'
  }`;

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
