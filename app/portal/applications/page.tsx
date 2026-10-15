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

export default function PortalApplicationsPage() {
  const [profile, setProfile] = useState<ContributorProfile>(getStoredProfile);
  const [applications, setApplications] = useState<PortalApplication[]>(getStoredApplications);

  useEffect(() => {
    setProfile(getStoredProfile());
    setApplications(getStoredApplications());
  }, []);

  return (
    <PortalShell profile={profile}>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 tracking-tight">
          Application Pipeline
        </h1>
        <p className="text-sm text-neutral-600 mt-1">
          Review the status of your submitted applications and assigned verification tasks.
        </p>
      </div>

      {/* Clean Status Tiles (Light Theme) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-xs">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-medium mb-1">
            Active Contracts
          </div>
          <div className="font-display font-bold text-2xl text-neutral-900">1 Module</div>
          <p className="text-xs text-neutral-500 mt-1 font-sans">20 hrs/week allocated</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-xs">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-medium mb-1">
            Under Review
          </div>
          <div className="font-display font-bold text-2xl text-neutral-900">1 Submission</div>
          <p className="text-xs text-neutral-500 mt-1 font-sans">Evaluation in progress</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-xs">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-medium mb-1">
            Verification Tasks
          </div>
          <div className="font-display font-bold text-2xl text-neutral-900">1 Assigned</div>
          <p className="text-xs text-neutral-500 mt-1 font-sans">Lead sign-off pending</p>
        </div>
      </div>

      <PortalApplicationsList applications={applications} />
    </PortalShell>
  );
}
