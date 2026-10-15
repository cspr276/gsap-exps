'use client';

import { useState, useEffect } from 'react';
import PortalNavbar from '@/components/portal/dashboard/PortalNavbar';
import PortalApplicationsList from '@/components/portal/dashboard/PortalApplicationsList';
import {
  getStoredProfile,
  getStoredApplications,
  ContributorProfile,
  PortalApplication,
} from '@/lib/portal-data';
import Link from 'next/link';
import { ArrowLeft, Clock, CheckCircle2, Shield } from 'lucide-react';

export default function PortalApplicationsPage() {
  const [profile, setProfile] = useState<ContributorProfile>(getStoredProfile);
  const [applications, setApplications] = useState<PortalApplication[]>(getStoredApplications);

  useEffect(() => {
    setProfile(getStoredProfile());
    setApplications(getStoredApplications());
  }, []);

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

        {/* Status Pipeline Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Active Contracts</span>
            </div>
            <div className="font-mono text-2xl font-bold text-white">1 Module</div>
            <p className="text-xs text-neutral-400 mt-1">20 hrs/week allocated</p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-300 uppercase tracking-wider mb-1">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Under Review</span>
            </div>
            <div className="font-mono text-2xl font-bold text-white">1 Submission</div>
            <p className="text-xs text-neutral-400 mt-1">Response expected in 24h</p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <div className="flex items-center gap-2 text-xs font-mono text-sky-300 uppercase tracking-wider mb-1">
              <Shield className="w-4 h-4 text-sky-400" />
              <span>Verification Tasks</span>
            </div>
            <div className="font-mono text-2xl font-bold text-white">1 Assigned</div>
            <p className="text-xs text-neutral-400 mt-1">Lead sign-off pending</p>
          </div>
        </div>

        <PortalApplicationsList applications={applications} />
      </main>
    </div>
  );
}
