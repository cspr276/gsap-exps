'use client';

import { useState, useEffect } from 'react';
import PortalShell from '@/components/portal/PortalShell';
import PortalProjectGrid from '@/components/portal/dashboard/PortalProjectGrid';
import {
  getStoredProfile,
  getStoredProjects,
  getStoredApplications,
  DEFAULT_CONTRIBUTOR,
  INITIAL_PROJECTS,
  INITIAL_APPLICATIONS,
  ContributorProfile,
  PortalProject,
  PortalApplication,
} from '@/lib/portal-data';

function ProjectsContent() {
  const [projects, setProjects] = useState<PortalProject[]>(INITIAL_PROJECTS);
  const [applications, setApplications] = useState<PortalApplication[]>(INITIAL_APPLICATIONS);

  const refreshData = () => {
    setProjects(getStoredProjects());
    setApplications(getStoredApplications());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const appliedProjectIds = new Set(applications.map((a) => a.projectId));

  return (
    <>
      <div className="mb-6">
        <h1
          className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-neutral-900 dark:text-white"
        >
          Find Projects
        </h1>
        <p className="text-sm mt-1 text-neutral-600 dark:text-neutral-400">
          Explore all active benchmarking and evaluation opportunities open for application.
        </p>
      </div>

      <PortalProjectGrid
        projects={projects}
        appliedProjectIds={appliedProjectIds}
        onApplicationSuccess={refreshData}
      />
    </>
  );
}

export default function PortalProjectsPage() {
  const [profile, setProfile] = useState<ContributorProfile>(DEFAULT_CONTRIBUTOR);

  useEffect(() => {
    setProfile(getStoredProfile());
  }, []);

  return (
    <PortalShell profile={profile}>
      <ProjectsContent />
    </PortalShell>
  );
}
