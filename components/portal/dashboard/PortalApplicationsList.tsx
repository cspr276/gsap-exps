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
          <h2 className="font-display font-bold text-xl sm:text-2xl text-neutral-900 tracking-tight">
            Recent Applications
          </h2>
        </div>

        <Link
          href="/portal/applications"
          className="text-xs font-mono uppercase tracking-wider text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-1"
        >
          <span>See all</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {applications.length === 0 ? (
        <div className="p-8 rounded-xl bg-white border border-neutral-200 text-center">
          <p className="text-sm text-neutral-500 font-sans">No applications submitted yet.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden shadow-xs">
          <div className="divide-y divide-neutral-100">
            {applications.map((app) => {
              const isApproved = app.status === 'approved';
              const isInReview = app.status === 'in_review';
              const isAssessment = app.status === 'assessment';

              return (
                <div
                  key={app.id}
                  className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-neutral-50/70 transition-colors"
                >
                  {/* Left: Project title & metadata */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 font-medium">
                        {app.projectType}
                      </span>
                      <span className="text-neutral-300">•</span>
                      <span className="text-xs text-neutral-500 font-sans">{app.submittedAt}</span>
                    </div>

                    <h3 className="font-display font-bold text-base text-neutral-900 tracking-tight">
                      {app.projectTitle}
                    </h3>

                    <p className="text-xs text-neutral-600 line-clamp-1 max-w-2xl font-sans">
                      {app.notes}
                    </p>
                  </div>

                  {/* Right: Compensation & Status Badge */}
                  <div className="flex items-center justify-between md:justify-end gap-5 flex-shrink-0">
                    <div className="text-right">
                      <div className="font-mono text-sm font-bold text-neutral-900">
                        {app.compensation}
                      </div>
                      <div className="font-mono text-[11px] text-neutral-500">
                        {app.matchScore}% fit
                      </div>
                    </div>

                    {/* Subtle, Clean Status Badge (No glowing dots!) */}
                    <div>
                      {isApproved && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                          {app.statusLabel}
                        </span>
                      )}

                      {isInReview && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200 font-medium">
                          {app.statusLabel}
                        </span>
                      )}

                      {isAssessment && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono uppercase tracking-wider bg-sky-50 text-sky-800 border border-sky-200 font-medium">
                          {app.statusLabel}
                        </span>
                      )}

                      {!isApproved && !isInReview && !isAssessment && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono uppercase tracking-wider bg-neutral-100 text-neutral-700 border border-neutral-200 font-medium">
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
