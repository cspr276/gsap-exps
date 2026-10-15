'use client';

import { useState, useEffect } from 'react';
import PortalNavbar from '@/components/portal/dashboard/PortalNavbar';
import PortalProjectGrid from '@/components/portal/dashboard/PortalProjectGrid';
import {
  getStoredProfile,
  getStoredProjects,
  getStoredApplications,
  ContributorProfile,
  PortalProject,
  PortalApplication,
} from '@/lib/portal-data';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

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
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-neutral-800 selection:text-white flex flex-col font-sans">
      <PortalNavbar profile={profile} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mb-6">
          <Link
            href="/portal"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        <PortalProjectGrid
          projects={projects}
          appliedProjectIds={appliedProjectIds}
          onApplicationSuccess={refreshData}
        />
      </main>
    </div>
  );
}
