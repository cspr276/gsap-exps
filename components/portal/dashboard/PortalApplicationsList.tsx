'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
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
          <h2
            className="font-display font-bold text-xl sm:text-2xl tracking-tight text-neutral-900 dark:text-white"
          >
            Recent Applications
          </h2>
        </div>

        <Link
          href="/portal/applications"
          className="text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
        >
          <span>See all</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {applications.length === 0 ? (
        <div
          className="p-8 rounded-xl border text-center bg-white dark:bg-neutral-900/40 border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400"
        >
          <p className="text-sm font-sans">No applications submitted yet.</p>
        </div>
      ) : (
        <div
          className="rounded-xl border overflow-hidden shadow-xs bg-white dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-800"
        >
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {applications.map((app) => {
              const isApproved = app.status === 'approved';
              const isInReview = app.status === 'in_review';
              const isAssessment = app.status === 'assessment';

              return (
                <div
                  key={app.id}
                  className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-800/30"
                >
                  {/* Left: Project title & metadata */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="font-mono text-[10px] uppercase tracking-wider font-medium text-neutral-500 dark:text-neutral-400"
                      >
                        {app.projectType}
                      </span>
                      <span className="text-neutral-300 dark:text-neutral-700">•</span>
                      <span className="text-xs font-sans text-neutral-500">
                        {app.submittedAt}
                      </span>
                    </div>

                    <h3
                      className="font-display font-bold text-base tracking-tight text-neutral-900 dark:text-white"
                    >
                      {app.projectTitle}
                    </h3>

                    <p className="text-xs line-clamp-1 max-w-2xl font-sans text-neutral-600 dark:text-neutral-400">
                      {app.notes}
                    </p>
                  </div>

                  {/* Right: Compensation & Status Badge */}
                  <div className="flex items-center justify-between md:justify-end gap-5 flex-shrink-0">
                    <div className="text-right">
                      <div
                        className="font-mono text-sm font-bold text-neutral-900 dark:text-white"
                      >
                        {app.compensation}
                      </div>
                      <div className="font-mono text-[11px] text-neutral-500">
                        {app.matchScore}% fit
                      </div>
                    </div>

                    {/* Subtle Status Badge */}
                    <div>
                      {isApproved && (
                        <span
                          className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono uppercase tracking-wider font-medium border bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30"
                        >
                          {app.statusLabel}
                        </span>
                      )}

                      {isInReview && (
                        <span
                          className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono uppercase tracking-wider font-medium border bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/30"
                        >
                          {app.statusLabel}
                        </span>
                      )}

                      {isAssessment && (
                        <span
                          className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono uppercase tracking-wider font-medium border bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/30"
                        >
                          {app.statusLabel}
                        </span>
                      )}

                      {!isApproved && !isInReview && !isAssessment && (
                        <span
                          className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono uppercase tracking-wider font-medium border bg-neutral-100 text-neutral-700 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700"
                        >
                          {app.statusLabel}
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
