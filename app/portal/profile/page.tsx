'use client';

import { useState, useEffect } from 'react';
import PortalShell from '@/components/portal/PortalShell';
import { getStoredProfile, ContributorProfile } from '@/lib/portal-data';

export default function PortalProfilePage() {
  const [profile, setProfile] = useState<ContributorProfile>(getStoredProfile);

  useEffect(() => {
    setProfile(getStoredProfile());
  }, []);

  return (
    <PortalShell profile={profile}>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 tracking-tight">
          Profile & Credentials
        </h1>
        <p className="text-sm text-neutral-600 mt-1">
          Review your verified identity, technical evaluation domains, and legal standing.
        </p>
      </div>

      {/* Profile Overview Card (Light Theme) */}
      <div className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 mb-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-neutral-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-neutral-100 text-neutral-900 border border-neutral-200 flex items-center justify-center font-display font-bold text-2xl">
              {profile.avatarInitials}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-display font-bold text-xl text-neutral-900">
                  {profile.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                  {profile.tier}
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-mono">{profile.email}</p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Total Earnings
            </div>
            <div className="font-display font-bold text-2xl text-neutral-900 mt-0.5">
              ${profile.totalEarnings.toLocaleString()}.00
            </div>
            <div className="text-xs text-emerald-700 font-medium font-sans">
              ${profile.availableBalance.toLocaleString()}.00 ready for withdrawal
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="pt-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-medium mb-2">
            Bio & Technical Focus
          </h3>
          <p className="text-sm text-neutral-700 leading-relaxed max-w-3xl">
            {profile.bio}
          </p>
        </div>
      </div>

      {/* Verification Ledger & Taxonomies Bento (Light Theme) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Verification Ledger */}
        <div className="p-6 rounded-xl bg-white border border-neutral-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 font-semibold">
              Verification Record
            </h3>
            <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-medium">
              Verified Contributor
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-500 font-mono">Legal Name:</span>
              <span className="text-neutral-900 font-medium">{profile.name}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-500 font-mono">Work Email:</span>
              <span className="text-neutral-900 font-medium">{profile.email}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-500 font-mono">Contract Tier:</span>
              <span className="text-neutral-900 font-medium">{profile.tier}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-500 font-mono">NDA Status:</span>
              <span className="text-emerald-800 font-medium">Executed & Signed</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-neutral-500 font-mono">Payout Settlement:</span>
              <span className="text-neutral-900 font-medium">Direct Wire Verified</span>
            </div>
          </div>
        </div>

        {/* Skills & Domains */}
        <div className="p-6 rounded-xl bg-white border border-neutral-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 font-semibold">
              Active Evaluation Taxonomies
            </h3>
            <span className="text-[11px] font-mono text-neutral-500">
              {profile.skills.length} verified skills
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <span className="text-neutral-500 font-mono block mb-2">Verified Skills:</span>
              <div className="flex flex-wrap gap-1.5">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded bg-neutral-100 border border-neutral-200 text-neutral-800 font-mono text-[11px]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-neutral-500 font-mono block mb-2">Primary Domains:</span>
              <div className="flex flex-wrap gap-1.5">
                {profile.domains.map((dom) => (
                  <span
                    key={dom}
                    className="px-2.5 py-1 rounded bg-neutral-100 border border-neutral-200 text-neutral-800 font-mono text-[11px]"
                  >
                    {dom}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <span className="text-neutral-500 font-mono block mb-1">Languages:</span>
              <div className="text-neutral-800 text-xs">
                {profile.languages.join(', ')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
