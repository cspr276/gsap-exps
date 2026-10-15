'use client';

import { useState, useEffect } from 'react';
import PortalShell from '@/components/portal/PortalShell';
import { getStoredProfile, ContributorProfile } from '@/lib/portal-data';
import { usePortalTheme } from '@/components/portal/PortalThemeContext';

function ProfileContent() {
  const [profile, setProfile] = useState<ContributorProfile>(getStoredProfile);
  const { isDark } = usePortalTheme();

  useEffect(() => {
    setProfile(getStoredProfile());
  }, []);

  const cardClasses = `rounded-xl p-6 sm:p-8 mb-8 shadow-xs border transition-colors ${
    isDark
      ? 'bg-neutral-900/60 border-neutral-800 text-white'
      : 'bg-white border-neutral-200 text-neutral-900'
  }`;

  const subCardClasses = `p-6 rounded-xl shadow-xs border transition-colors ${
    isDark
      ? 'bg-neutral-900/60 border-neutral-800 text-white'
      : 'bg-white border-neutral-200 text-neutral-900'
  }`;

  const borderRowClasses = `flex justify-between py-2 border-b ${
    isDark ? 'border-neutral-800' : 'border-neutral-100'
  }`;

  return (
    <>
      <div className="mb-6">
        <h1
          className={`font-display font-bold text-2xl sm:text-3xl tracking-tight ${
            isDark ? 'text-white' : 'text-neutral-900'
          }`}
        >
          Profile & Credentials
        </h1>
        <p className={`text-sm mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
          Review your verified identity, technical evaluation domains, and legal standing.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className={cardClasses}>
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b ${
            isDark ? 'border-neutral-800' : 'border-neutral-100'
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 rounded-full border flex items-center justify-center font-display font-bold text-2xl ${
                isDark
                  ? 'bg-neutral-800 border-neutral-700 text-white'
                  : 'bg-neutral-100 border-neutral-200 text-neutral-900'
              }`}
            >
              {profile.avatarInitials}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2
                  className={`font-display font-bold text-xl ${
                    isDark ? 'text-white' : 'text-neutral-900'
                  }`}
                >
                  {profile.name}
                </h2>
                <span
                  className={`px-2.5 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider font-semibold border ${
                    isDark
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}
                >
                  {profile.tier}
                </span>
              </div>
              <p className={`text-xs font-mono ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                {profile.email}
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div
              className={`text-xs font-mono uppercase tracking-wider ${
                isDark ? 'text-neutral-500' : 'text-neutral-400'
              }`}
            >
              Total Earnings
            </div>
            <div
              className={`font-display font-bold text-2xl mt-0.5 ${
                isDark ? 'text-white' : 'text-neutral-900'
              }`}
            >
              ${profile.totalEarnings.toLocaleString()}.00
            </div>
            <div
              className={`text-xs font-medium font-sans ${
                isDark ? 'text-emerald-400' : 'text-emerald-700'
              }`}
            >
              ${profile.availableBalance.toLocaleString()}.00 ready for withdrawal
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="pt-6">
          <h3
            className={`text-xs font-mono uppercase tracking-wider font-medium mb-2 ${
              isDark ? 'text-neutral-400' : 'text-neutral-500'
            }`}
          >
            Bio & Technical Focus
          </h3>
          <p
            className={`text-sm leading-relaxed max-w-3xl ${
              isDark ? 'text-neutral-300' : 'text-neutral-700'
            }`}
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
              className={`font-mono text-xs uppercase tracking-wider font-semibold ${
                isDark ? 'text-neutral-400' : 'text-neutral-500'
              }`}
            >
              Verification Record
            </h3>
            <span
              className={`text-[11px] font-mono px-2 py-0.5 rounded font-medium border ${
                isDark
                  ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                  : 'text-emerald-800 bg-emerald-50 border-emerald-200'
              }`}
            >
              Verified Contributor
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className={borderRowClasses}>
              <span className={`font-mono ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                Legal Name:
              </span>
              <span className={`font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                {profile.name}
              </span>
            </div>
            <div className={borderRowClasses}>
              <span className={`font-mono ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                Work Email:
              </span>
              <span className={`font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                {profile.email}
              </span>
            </div>
            <div className={borderRowClasses}>
              <span className={`font-mono ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                Contract Tier:
              </span>
              <span className={`font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                {profile.tier}
              </span>
            </div>
            <div className={borderRowClasses}>
              <span className={`font-mono ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                NDA Status:
              </span>
              <span className={`font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-800'}`}>
                Executed & Signed
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className={`font-mono ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                Payout Settlement:
              </span>
              <span className={`font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Direct Wire Verified
              </span>
            </div>
          </div>
        </div>

        {/* Skills & Domains */}
        <div className={subCardClasses}>
          <div className="flex items-center justify-between mb-4">
            <h3
              className={`font-mono text-xs uppercase tracking-wider font-semibold ${
                isDark ? 'text-neutral-400' : 'text-neutral-500'
              }`}
            >
              Active Evaluation Taxonomies
            </h3>
            <span className={`text-[11px] font-mono ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
              {profile.skills.length} verified skills
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <span
                className={`font-mono block mb-2 ${
                  isDark ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              >
                Verified Skills:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-2.5 py-1 rounded font-mono text-[11px] border ${
                      isDark
                        ? 'bg-neutral-950 border-neutral-800 text-neutral-300'
                        : 'bg-neutral-100 border-neutral-200 text-neutral-800'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span
                className={`font-mono block mb-2 ${
                  isDark ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              >
                Primary Domains:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {profile.domains.map((dom) => (
                  <span
                    key={dom}
                    className={`px-2.5 py-1 rounded font-mono text-[11px] border ${
                      isDark
                        ? 'bg-neutral-950 border-neutral-800 text-neutral-300'
                        : 'bg-neutral-100 border-neutral-200 text-neutral-800'
                    }`}
                  >
                    {dom}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <span
                className={`font-mono block mb-1 ${
                  isDark ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              >
                Languages:
              </span>
              <div className={`text-xs ${isDark ? 'text-neutral-300' : 'text-neutral-800'}`}>
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
  const [profile] = useState<ContributorProfile>(getStoredProfile);

  return (
    <PortalShell profile={profile}>
      <ProfileContent />
    </PortalShell>
  );
}
