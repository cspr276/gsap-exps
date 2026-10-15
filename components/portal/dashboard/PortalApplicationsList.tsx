'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PortalApplication } from '@/lib/portal-data';
import { usePortalTheme } from '../PortalThemeContext';

interface PortalApplicationsListProps {
  applications: PortalApplication[];
}

export default function PortalApplicationsList({
  applications,
}: PortalApplicationsListProps) {
  const { isDark } = usePortalTheme();

  return (
    <section className="mb-10">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2
            className={`font-display font-bold text-xl sm:text-2xl tracking-tight ${
              isDark ? 'text-white' : 'text-neutral-900'
            }`}
          >
            Recent Applications
          </h2>
        </div>

        <Link
          href="/portal/applications"
          className={`text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1 ${
            isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <span>See all</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {applications.length === 0 ? (
        <div
          className={`p-8 rounded-xl border text-center ${
            isDark ? 'bg-neutral-900/40 border-neutral-800 text-neutral-400' : 'bg-white border-neutral-200 text-neutral-500'
          }`}
        >
          <p className="text-sm font-sans">No applications submitted yet.</p>
        </div>
      ) : (
        <div
          className={`rounded-xl border overflow-hidden shadow-xs transition-colors ${
            isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-neutral-200'
          }`}
        >
          <div className={`divide-y ${isDark ? 'divide-neutral-800' : 'divide-neutral-100'}`}>
            {applications.map((app) => {
              const isApproved = app.status === 'approved';
              const isInReview = app.status === 'in_review';
              const isAssessment = app.status === 'assessment';

              return (
                <div
                  key={app.id}
                  className={`p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                    isDark ? 'hover:bg-neutral-800/30' : 'hover:bg-neutral-50/70'
                  }`}
                >
                  {/* Left: Project title & metadata */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono text-[10px] uppercase tracking-wider font-medium ${
                          isDark ? 'text-neutral-400' : 'text-neutral-500'
                        }`}
                      >
                        {app.projectType}
                      </span>
                      <span className={isDark ? 'text-neutral-700' : 'text-neutral-300'}>•</span>
                      <span className={`text-xs font-sans ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
                        {app.submittedAt}
                      </span>
                    </div>

                    <h3
                      className={`font-display font-bold text-base tracking-tight ${
                        isDark ? 'text-white' : 'text-neutral-900'
                      }`}
                    >
                      {app.projectTitle}
                    </h3>

                    <p className={`text-xs line-clamp-1 max-w-2xl font-sans ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      {app.notes}
                    </p>
                  </div>

                  {/* Right: Compensation & Status Badge */}
                  <div className="flex items-center justify-between md:justify-end gap-5 flex-shrink-0">
                    <div className="text-right">
                      <div
                        className={`font-mono text-sm font-bold ${
                          isDark ? 'text-white' : 'text-neutral-900'
                        }`}
                      >
                        {app.compensation}
                      </div>
                      <div className={`font-mono text-[11px] ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
                        {app.matchScore}% fit
                      </div>
                    </div>

                    {/* Subtle Status Badge */}
                    <div>
                      {isApproved && (
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono uppercase tracking-wider font-medium border ${
                            isDark
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          }`}
                        >
                          {app.statusLabel}
                        </span>
                      )}

                      {isInReview && (
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono uppercase tracking-wider font-medium border ${
                            isDark
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}
                        >
                          {app.statusLabel}
                        </span>
                      )}

                      {isAssessment && (
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono uppercase tracking-wider font-medium border ${
                            isDark
                              ? 'bg-sky-500/10 text-sky-400 border-sky-500/30'
                              : 'bg-sky-50 text-sky-800 border-sky-200'
                          }`}
                        >
                          {app.statusLabel}
                        </span>
                      )}

                      {!isApproved && !isInReview && !isAssessment && (
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono uppercase tracking-wider font-medium border ${
                            isDark
                              ? 'bg-neutral-800 text-neutral-300 border-neutral-700'
                              : 'bg-neutral-100 text-neutral-700 border-neutral-200'
                          }`}
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
