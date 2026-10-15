'use client';

import { useState, useEffect } from 'react';
import PortalShell from '@/components/portal/PortalShell';
import PortalApplicationsList from '@/components/portal/dashboard/PortalApplicationsList';
import {
  getStoredProfile,
  getStoredApplications,
  ContributorProfile,
  PortalApplication,
} from '@/lib/portal-data';
import { usePortalTheme } from '@/components/portal/PortalThemeContext';

function ApplicationsContent() {
  const [applications, setApplications] = useState<PortalApplication[]>(getStoredApplications);
  const { isDark } = usePortalTheme();

  useEffect(() => {
    setApplications(getStoredApplications());
  }, []);

  const tileClasses = `p-4 rounded-xl border shadow-xs transition-colors ${
    isDark
      ? 'bg-neutral-900/60 border-neutral-800 text-white'
      : 'bg-white border-neutral-200 text-neutral-900'
  }`;

  return (
    <>
      <div className="mb-6">
        <h1
          className={`font-display font-bold text-2xl sm:text-3xl tracking-tight ${
            isDark ? 'text-white' : 'text-neutral-900'
          }`}
        >
          Application Pipeline
        </h1>
        <p className={`text-sm mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
          Review the status of your submitted applications and assigned verification tasks.
        </p>
      </div>

      {/* Clean Status Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className={tileClasses}>
          <div
            className={`text-xs font-mono uppercase tracking-wider font-medium mb-1 ${
              isDark ? 'text-neutral-400' : 'text-neutral-500'
            }`}
          >
            Active Contracts
          </div>
          <div className="font-display font-bold text-2xl">1 Module</div>
          <p className={`text-xs mt-1 font-sans ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
            20 hrs/week allocated
          </p>
        </div>

        <div className={tileClasses}>
          <div
            className={`text-xs font-mono uppercase tracking-wider font-medium mb-1 ${
              isDark ? 'text-neutral-400' : 'text-neutral-500'
            }`}
          >
            Under Review
          </div>
          <div className="font-display font-bold text-2xl">1 Submission</div>
          <p className={`text-xs mt-1 font-sans ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Evaluation in progress
          </p>
        </div>

        <div className={tileClasses}>
          <div
            className={`text-xs font-mono uppercase tracking-wider font-medium mb-1 ${
              isDark ? 'text-neutral-400' : 'text-neutral-500'
            }`}
          >
            Verification Tasks
          </div>
          <div className="font-display font-bold text-2xl">1 Assigned</div>
          <p className={`text-xs mt-1 font-sans ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Lead sign-off pending
          </p>
        </div>
      </div>

      <PortalApplicationsList applications={applications} />
    </>
  );
}

export default function PortalApplicationsPage() {
  const [profile] = useState<ContributorProfile>(getStoredProfile);

  return (
    <PortalShell profile={profile}>
      <ApplicationsContent />
    </PortalShell>
  );
}
