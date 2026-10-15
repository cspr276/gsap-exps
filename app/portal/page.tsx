'use client';

import { useState, useEffect } from 'react';
import PortalShell from '@/components/portal/PortalShell';
import PortalProfileHeader from '@/components/portal/dashboard/PortalProfileHeader';
import PortalMetricBento from '@/components/portal/dashboard/PortalMetricBento';
import PortalProjectGrid from '@/components/portal/dashboard/PortalProjectGrid';
import PortalApplicationsList from '@/components/portal/dashboard/PortalApplicationsList';
import {
  getStoredProfile,
  getStoredProjects,
  getStoredApplications,
  ContributorProfile,
  PortalProject,
  PortalApplication,
} from '@/lib/portal-data';

export default function PortalDashboardPage() {
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
      {/* Editorial Page Header */}
      <PortalProfileHeader profile={profile} />

      {/* Clean Stat Tiles */}
      <PortalMetricBento
        profile={profile}
        activeApplicationsCount={applications.length}
        openProjectsCount={projects.length}
      />

      {/* Recommended Projects Grid */}
      <PortalProjectGrid
        projects={projects}
        appliedProjectIds={appliedProjectIds}
        onApplicationSuccess={refreshData}
      />

      {/* Recent Applications Ledger */}
      <PortalApplicationsList applications={applications} />
    </PortalShell>
  );
}
