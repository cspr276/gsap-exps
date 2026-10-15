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

const tileClasses =
  'p-4 rounded-xl border shadow-xs bg-white dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white';

function ApplicationsContent() {
  const [applications, setApplications] = useState<PortalApplication[]>(getStoredApplications);

  useEffect(() => {
    setApplications(getStoredApplications());
  }, []);

  return (
    <>
      <div className="mb-6">
        <h1
          className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-neutral-900 dark:text-white"
        >
          Application Pipeline
        </h1>
        <p className="text-sm mt-1 text-neutral-600 dark:text-neutral-400">
          Review the status of your submitted applications and assigned verification tasks.
        </p>
      </div>

      {/* Clean Status Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className={tileClasses}>
          <div
            className="text-xs font-mono uppercase tracking-wider font-medium mb-1 text-neutral-500 dark:text-neutral-400"
          >
            Active Contracts
          </div>
          <div className="font-display font-bold text-2xl">1 Module</div>
          <p className="text-xs mt-1 font-sans text-neutral-500 dark:text-neutral-400">
            20 hrs/week allocated
          </p>
        </div>

        <div className={tileClasses}>
          <div
            className="text-xs font-mono uppercase tracking-wider font-medium mb-1 text-neutral-500 dark:text-neutral-400"
          >
            Under Review
          </div>
          <div className="font-display font-bold text-2xl">1 Submission</div>
          <p className="text-xs mt-1 font-sans text-neutral-500 dark:text-neutral-400">
            Evaluation in progress
          </p>
        </div>

        <div className={tileClasses}>
          <div
            className="text-xs font-mono uppercase tracking-wider font-medium mb-1 text-neutral-500 dark:text-neutral-400"
          >
            Verification Tasks
          </div>
          <div className="font-display font-bold text-2xl">1 Assigned</div>
          <p className="text-xs mt-1 font-sans text-neutral-500 dark:text-neutral-400">
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
