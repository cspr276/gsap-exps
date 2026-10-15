'use client';

import {
  ShieldCheck,
  CheckCircle,
  Download,
  Settings,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { ContributorProfile } from '@/lib/portal-data';

interface PortalProfileHeaderProps {
  profile: ContributorProfile;
}

export default function PortalProfileHeader({ profile }: PortalProfileHeaderProps) {
  return (
    <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-6 sm:p-8 backdrop-blur-sm mb-8 relative overflow-hidden">
      {/* Subtle Ambient Radial Highlight */}
      <div
        className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        {/* Left: Avatar & Contributor Info */}
        <div className="flex items-start sm:items-center gap-4 sm:gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-neutral-950 border border-neutral-800 text-emerald-400 flex items-center justify-center font-display font-black text-2xl sm:text-3xl shadow-md flex-shrink-0">
            {profile.avatarInitials}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
              <h1 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight uppercase">
                {profile.name}
              </h1>

              {/* Verified Badge */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{profile.tier}</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
              {profile.headline}
            </p>

            {/* Micro stats strip */}
            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-1.5 text-white">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>{profile.completedTasks} Tasks Completed</span>
              </span>
              <span className="text-neutral-700">•</span>
              <span className="text-neutral-300">{profile.hoursLogged} Hours Logged</span>
              <span className="text-neutral-700">•</span>
              <span className="text-emerald-400">{profile.reviewAccuracy} Agreement</span>
            </div>
          </div>
        </div>

        {/* Right: Quick Action Buttons */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              alert('Downloading official cryptographic verification transcript for ' + profile.name);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Certificate</span>
          </button>

          <a
            href="/services/ai-agent-evaluation-benchmarking"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black hover:bg-neutral-200 text-xs font-mono uppercase tracking-wider font-semibold transition-colors shadow-xs"
          >
            <span>Lab Specs</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Verified Skills Taxonomy Strip */}
      <div className="mt-6 pt-5 border-t border-neutral-800/80 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider mr-2 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-neutral-500" />
          <span>Active Taxonomies:</span>
        </span>
        {profile.skills.map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-1 rounded text-[11px] font-mono bg-neutral-950 border border-neutral-800/90 text-neutral-300 hover:border-neutral-700 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
