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
import { usePortalTheme } from '@/components/portal/PortalThemeContext';

function ProjectsContent() {
  const [projects, setProjects] = useState<PortalProject[]>(getStoredProjects);
  const [applications, setApplications] = useState<PortalApplication[]>(getStoredApplications);
  const { isDark } = usePortalTheme();

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
          className={`font-display font-bold text-2xl sm:text-3xl tracking-tight ${
            isDark ? 'text-white' : 'text-neutral-900'
          }`}
        >
          Find Projects
        </h1>
        <p className={`text-sm mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
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
  const [profile] = useState<ContributorProfile>(getStoredProfile);

  return (
    <PortalShell profile={profile}>
      <ProjectsContent />
    </PortalShell>
  );
}
