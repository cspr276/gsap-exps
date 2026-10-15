'use client';

import Link from 'next/link';
import {
  DollarSign,
  TrendingUp,
  Award,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ShieldAlert,
  Flame,
  FileCode2,
} from 'lucide-react';
import { ContributorProfile } from '@/lib/portal-data';

interface PortalMetricBentoProps {
  profile: ContributorProfile;
  activeApplicationsCount: number;
  openProjectsCount: number;
}

export default function PortalMetricBento({
  profile,
  activeApplicationsCount,
  openProjectsCount,
}: PortalMetricBentoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* 1. Earnings & Financial Ledger Bento */}
      <div className="relative group overflow-hidden rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700/80 transition-all p-5 backdrop-blur-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">
            Total Earnings
          </span>
          <span className="flex items-center gap-1 font-mono text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
            <TrendingUp className="w-3 h-3" />
            <span>+18.4%</span>
          </span>
        </div>

        <div>
          <div className="font-mono text-3xl font-extrabold text-white tracking-tight">
            ${profile.totalEarnings.toLocaleString()}.00
          </div>
          <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1.5 font-mono">
            <DollarSign className="w-3.5 h-3.5 text-neutral-500" />
            <span>${profile.availableBalance.toLocaleString()}.00 cleared for withdrawal</span>
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-800/60 flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <span>74.5 review hours</span>
          <span className="text-neutral-400">Bi-weekly settlement</span>
        </div>
      </div>

      {/* 2. Review Accuracy & Precision Benchmark */}
      <div className="relative group overflow-hidden rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700/80 transition-all p-5 backdrop-blur-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">
            Benchmark Accuracy
          </span>
          <span className="flex items-center gap-1 font-mono text-[11px] text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded">
            <Award className="w-3 h-3" />
            <span>Tier 1</span>
          </span>
        </div>

        <div>
          <div className="font-mono text-3xl font-extrabold text-white tracking-tight">
            {profile.reviewAccuracy}
          </div>
          <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1.5 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>182 / 183 accepted submissions</span>
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-800/60 flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <span>0.96 agreement score</span>
          <span className="text-neutral-400">Gold Reviewer</span>
        </div>
      </div>

      {/* 3. Open Opportunities & Intake Pipeline */}
      <div className="relative group overflow-hidden rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700/80 transition-all p-5 backdrop-blur-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">
            Marketplace Intake
          </span>
          <span className="flex items-center gap-1 font-mono text-[11px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
            <Flame className="w-3 h-3" />
            <span>High Demand</span>
          </span>
        </div>

        <div>
          <div className="font-mono text-3xl font-extrabold text-white tracking-tight">
            {openProjectsCount} Modules
          </div>
          <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1.5 font-mono">
            <FileCode2 className="w-3.5 h-3.5 text-neutral-500" />
            <span>SWE-bench, RLHF, FrontierMath</span>
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-800/60 flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <span>Up to $90.00 / hr</span>
          <Link
            href="/portal/projects"
            className="text-white hover:text-emerald-400 transition-colors inline-flex items-center gap-0.5"
          >
            <span>Explore</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* 4. Active Review Pipeline & Standing */}
      <div className="relative group overflow-hidden rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700/80 transition-all p-5 backdrop-blur-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">
            Active Applications
          </span>
          <span className="flex items-center gap-1 font-mono text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
            <Clock className="w-3 h-3" />
            <span>Live Audit</span>
          </span>
        </div>

        <div>
          <div className="font-mono text-3xl font-extrabold text-white tracking-tight">
            {activeApplicationsCount} In Queue
          </div>
          <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1.5 font-mono">
            <ShieldAlert className="w-3.5 h-3.5 text-neutral-500" />
            <span>1 active contract, 2 under review</span>
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-800/60 flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <span>Next review: Today</span>
          <Link
            href="/portal/applications"
            className="text-white hover:text-emerald-400 transition-colors inline-flex items-center gap-0.5"
          >
            <span>Ledger</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
