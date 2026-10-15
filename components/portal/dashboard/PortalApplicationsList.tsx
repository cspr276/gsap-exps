'use client';

import Link from 'next/link';
import {
  FileCheck2,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Shield,
  FileText,
} from 'lucide-react';
import { PortalApplication } from '@/lib/portal-data';

interface PortalApplicationsListProps {
  applications: PortalApplication[];
}

export default function PortalApplicationsList({
  applications,
}: PortalApplicationsListProps) {
  return (
    <section className="mb-10">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 mb-1 block">
            VERIFICATION LEDGER
          </span>
          <h2 className="font-display font-bold text-xl sm:text-2xl uppercase tracking-tight text-white">
            Application Pipeline
          </h2>
        </div>

        <Link
          href="/portal/applications"
          className="text-xs font-mono tracking-wider uppercase text-neutral-400 hover:text-white transition-colors flex items-center gap-1"
        >
          <span>View all applications</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {applications.length === 0 ? (
        <div className="p-8 rounded-xl bg-neutral-900/40 border border-neutral-800 text-center">
          <FileText className="w-6 h-6 text-neutral-600 mx-auto mb-2" />
          <p className="text-sm text-neutral-400 font-mono">No active applications currently submitted.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/60 backdrop-blur-sm overflow-hidden">
          <div className="divide-y divide-neutral-800/80">
            {applications.map((app) => {
              const isApproved = app.status === 'approved';
              const isInReview = app.status === 'in_review';
              const isAssessment = app.status === 'assessment';

              return (
                <div
                  key={app.id}
                  className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-neutral-800/30 transition-colors"
                >
                  {/* Left: Project title & metadata */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700/60">
                        {app.projectType}
                      </span>
                      <span className="font-mono text-xs text-neutral-500">•</span>
                      <span className="font-mono text-xs text-neutral-400">Submitted {app.submittedAt}</span>
                    </div>

                    <h3 className="font-display font-bold text-base text-white tracking-tight">
                      {app.projectTitle}
                    </h3>

                    <p className="text-xs text-neutral-400 line-clamp-1 max-w-2xl font-sans">
                      {app.notes}
                    </p>
                  </div>

                  {/* Right: Compensation & Status Badge */}
                  <div className="flex items-center justify-between md:justify-end gap-5 flex-shrink-0">
                    <div className="text-right">
                      <div className="font-mono text-sm font-bold text-white">
                        {app.compensation}
                      </div>
                      <div className="font-mono text-[10px] text-emerald-400">
                        {app.matchScore}% Match Fit
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div>
                      {isApproved && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{app.statusLabel}</span>
                        </span>
                      )}

                      {isInReview && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30 font-medium">
                          <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                          <span>{app.statusLabel}</span>
                        </span>
                      )}

                      {isAssessment && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider bg-sky-500/10 text-sky-300 border border-sky-500/30 font-medium">
                          <Shield className="w-3.5 h-3.5 text-sky-400" />
                          <span>{app.statusLabel}</span>
                        </span>
                      )}

                      {!isApproved && !isInReview && !isAssessment && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider bg-neutral-800 text-neutral-300 border border-neutral-700 font-medium">
                          <FileCheck2 className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{app.statusLabel}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
