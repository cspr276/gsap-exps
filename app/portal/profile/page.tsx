'use client';

import { useState, useEffect } from 'react';
import PortalShell from '@/components/portal/PortalShell';
import { getStoredProfile, DEFAULT_CONTRIBUTOR, ContributorProfile } from '@/lib/portal-data';

const cardClasses =
  'rounded-xl p-6 sm:p-8 mb-8 shadow-xs border bg-white dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white';

const subCardClasses =
  'p-6 rounded-xl shadow-xs border bg-white dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white';

const borderRowClasses =
  'flex justify-between py-2 border-b border-neutral-100 dark:border-neutral-800';

function ProfileContent() {
  const [profile, setProfile] = useState<ContributorProfile>(DEFAULT_CONTRIBUTOR);

  useEffect(() => {
    setProfile(getStoredProfile());
  }, []);

  return (
    <>
      <div className="mb-6">
        <h1
          className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-neutral-900 dark:text-white"
        >
          Profile & Credentials
        </h1>
        <p className="text-sm mt-1 text-neutral-600 dark:text-neutral-400">
          Review your verified identity, technical evaluation domains, and legal standing.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className={cardClasses}>
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-neutral-100 dark:border-neutral-800"
        >
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-full border flex items-center justify-center font-display font-bold text-2xl bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white"
            >
              {profile.avatarInitials}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2
                  className="font-display font-bold text-xl text-neutral-900 dark:text-white"
                >
                  {profile.name}
                </h2>
                <span
                  className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider font-semibold border bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30"
                >
                  {profile.tier}
                </span>
              </div>
              <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                {profile.email}
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div
              className="text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500"
            >
              Total Earnings
            </div>
            <div
              className="font-display font-bold text-2xl mt-0.5 text-neutral-900 dark:text-white"
            >
              ${profile.totalEarnings.toLocaleString()}.00
            </div>
            <div
              className="text-xs font-medium font-sans text-emerald-700 dark:text-emerald-400"
            >
              ${profile.availableBalance.toLocaleString()}.00 ready for withdrawal
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="pt-6">
          <h3
            className="text-xs font-mono uppercase tracking-wider font-medium mb-2 text-neutral-500 dark:text-neutral-400"
          >
            Bio & Technical Focus
          </h3>
          <p
            className="text-sm leading-relaxed max-w-3xl text-neutral-700 dark:text-neutral-300"
          >
            {profile.bio}
          </p>
        </div>
      </div>

      {/* Verification Ledger & Taxonomies Bento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Verification Ledger */}
        <div className={subCardClasses}>
          <div className="flex items-center justify-between mb-4">
            <h3
              className="font-mono text-xs uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400"
            >
              Verification Record
            </h3>
            <span
              className="text-[11px] font-mono px-2 py-0.5 rounded font-medium border text-emerald-800 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-500/30"
            >
              Verified Contributor
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className={borderRowClasses}>
              <span className="font-mono text-neutral-500 dark:text-neutral-400">
                Legal Name:
              </span>
              <span className="font-medium text-neutral-900 dark:text-white">
                {profile.name}
              </span>
            </div>
            <div className={borderRowClasses}>
              <span className="font-mono text-neutral-500 dark:text-neutral-400">
                Work Email:
              </span>
              <span className="font-medium text-neutral-900 dark:text-white">
                {profile.email}
              </span>
            </div>
            <div className={borderRowClasses}>
              <span className="font-mono text-neutral-500 dark:text-neutral-400">
                Contract Tier:
              </span>
              <span className="font-medium text-neutral-900 dark:text-white">
                {profile.tier}
              </span>
            </div>
            <div className={borderRowClasses}>
              <span className="font-mono text-neutral-500 dark:text-neutral-400">
                NDA Status:
              </span>
              <span className="font-medium text-emerald-800 dark:text-emerald-400">
                Executed & Signed
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-mono text-neutral-500 dark:text-neutral-400">
                Payout Settlement:
              </span>
              <span className="font-medium text-neutral-900 dark:text-white">
                Direct Wire Verified
              </span>
            </div>
          </div>
        </div>

        {/* Skills & Domains */}
        <div className={subCardClasses}>
          <div className="flex items-center justify-between mb-4">
            <h3
              className="font-mono text-xs uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400"
            >
              Active Evaluation Taxonomies
            </h3>
            <span className="text-[11px] font-mono text-neutral-500">
              {profile.skills.length} verified skills
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <span
                className="font-mono block mb-2 text-neutral-500 dark:text-neutral-400"
              >
                Verified Skills:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded font-mono text-[11px] border bg-neutral-100 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span
                className="font-mono block mb-2 text-neutral-500 dark:text-neutral-400"
              >
                Primary Domains:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {profile.domains.map((dom) => (
                  <span
                    key={dom}
                    className="px-2.5 py-1 rounded font-mono text-[11px] border bg-neutral-100 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-300"
                  >
                    {dom}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <span
                className="font-mono block mb-1 text-neutral-500 dark:text-neutral-400"
              >
                Languages:
              </span>
              <div className="text-xs text-neutral-800 dark:text-neutral-300">
                {profile.languages.join(', ')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function PortalProfilePage() {
  const [profile, setProfile] = useState<ContributorProfile>(DEFAULT_CONTRIBUTOR);

  useEffect(() => {
    setProfile(getStoredProfile());
  }, []);

  return (
    <PortalShell profile={profile}>
      <ProfileContent />
    </PortalShell>
  );
}
