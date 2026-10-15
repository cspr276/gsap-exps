'use client';

import { useState, useEffect } from 'react';
import PortalNavbar from '@/components/portal/dashboard/PortalNavbar';
import PortalProfileHeader from '@/components/portal/dashboard/PortalProfileHeader';
import { getStoredProfile, ContributorProfile } from '@/lib/portal-data';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Mail, Globe, Award, Sparkles, Key, Check } from 'lucide-react';

export default function PortalProfilePage() {
  const [profile, setProfile] = useState<ContributorProfile>(getStoredProfile);

  useEffect(() => {
    setProfile(getStoredProfile());
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

        <PortalProfileHeader profile={profile} />

        {/* Profile Verification & Security Details Bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Identity & Legal Verification Card */}
          <div className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                Verification Ledger
              </span>
              <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>CRYPTOGRAPHICALLY SIGNED</span>
              </span>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="flex justify-between py-2 border-b border-neutral-800">
                <span className="text-neutral-500">Legal Name:</span>
                <span className="text-white font-medium">{profile.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-neutral-800">
                <span className="text-neutral-500">Registered Email:</span>
                <span className="text-white font-medium">{profile.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-neutral-800">
                <span className="text-neutral-500">Contributor Tier:</span>
                <span className="text-emerald-400 font-bold">{profile.tier}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-neutral-800">
                <span className="text-neutral-500">Agreement Status:</span>
                <span className="text-white">Mutual NDA & Contributor Contract Signed</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-neutral-500">Payout Status:</span>
                <span className="text-emerald-400">Direct Wire (USD / INR) Verified</span>
              </div>
            </div>
          </div>

          {/* Languages & Domain Specialization Card */}
          <div className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                Domain Specialization
              </span>
              <span className="flex items-center gap-1 font-mono text-[10px] text-sky-400 bg-sky-500/10 border border-sky-500/30 px-2 py-0.5 rounded">
                <Globe className="w-3 h-3 text-sky-400" />
                <span>ACTIVE AUDIT DOMAINS</span>
              </span>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <span className="text-neutral-500 block mb-2">Verified Language Proficiencies:</span>
                <div className="flex flex-wrap gap-2">
                  {profile.languages.map((lang) => (
                    <span
                      key={lang}
                      className="px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-neutral-300"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-neutral-500 block mb-2">Target Evaluation Domains:</span>
                <div className="flex flex-wrap gap-2">
                  {profile.domains.map((dom) => (
                    <span
                      key={dom}
                      className="px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-sky-300"
                    >
                      {dom}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <span className="text-neutral-500 block mb-1">Bio Summary:</span>
                <p className="text-neutral-400 font-sans leading-relaxed text-xs">
                  {profile.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
