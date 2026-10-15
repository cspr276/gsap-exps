'use client';

import { useState, useEffect } from 'react';
import PortalShell from '@/components/portal/PortalShell';
import PortalProjectGrid from '@/components/portal/dashboard/PortalProjectGrid';
import {
  getStoredProfile,
  getStoredProjects,
  getStoredApplications,
  ContributorProfile,
  PortalProject,
  PortalApplication,
} from '@/lib/portal-data';

export default function PortalProjectsPage() {
  const [profile, setProfile] = useState<ContributorProfile>(getStoredProfile);
  const [projects, setProjects] = useState<PortalProject[]>(getStoredProjects);
  const [applications, setApplications] = useState<PortalApplication[]>(getStoredApplications);

  const refreshData = () => {
    setProfile(getStoredProfile());
    setProjects(getStoredProjects());
    setApplications(getStoredApplications());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const appliedProjectIds = new Set(applications.map((a) => a.projectId));

  return (
    <PortalShell profile={profile}>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 tracking-tight">
          Find Projects
        </h1>
        <p className="text-sm text-neutral-600 mt-1">
          Explore all active benchmarking and evaluation opportunities open for application.
        </p>
      </div>

      <PortalProjectGrid
        projects={projects}
        appliedProjectIds={appliedProjectIds}
        onApplicationSuccess={refreshData}
      />
    </PortalShell>
  );
}
