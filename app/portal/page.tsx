'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PortalNavbar from '@/components/portal/dashboard/PortalNavbar';
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
import { ShieldCheck, Cpu, Terminal, ArrowUpRight } from 'lucide-react';

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
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-neutral-800 selection:text-white flex flex-col font-sans">
      {/* Sleek Dark Portal Navigation */}
      <PortalNavbar profile={profile} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Contributor Profile Header & Credential Strip */}
        <PortalProfileHeader profile={profile} />

        {/* Bento Grid Metrics */}
        <PortalMetricBento
          profile={profile}
          activeApplicationsCount={applications.length}
          openProjectsCount={projects.length}
        />

        {/* Interactive Available Benchmark Projects Grid */}
        <PortalProjectGrid
          projects={projects}
          appliedProjectIds={appliedProjectIds}
          onApplicationSuccess={refreshData}
        />

        {/* Real-Time Applications Ledger */}
        <PortalApplicationsList applications={applications} />
      </main>

      {/* Portal Dark Footer Matching Main Website */}
      <footer className="border-t border-neutral-800/80 bg-neutral-950/90 py-8 px-4 sm:px-8 text-neutral-500 font-mono text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-white font-semibold uppercase tracking-wider">
              EVALIXA BENCHMARK PORTAL
            </span>
            <span className="text-neutral-700">|</span>
            <span className="text-neutral-400">ENCLAVE SECURE v2.8.4</span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/terms-of-service"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/"
              className="hover:text-white transition-colors inline-flex items-center gap-1"
            >
              <span>Platform Main Site</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
