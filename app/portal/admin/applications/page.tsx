'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search } from 'lucide-react';
import AdminShell from '@/components/portal/admin/AdminShell';
import {
  getStoredAdminApplications,
  updateAdminApplicationStatus,
  INITIAL_ADMIN_APPLICATIONS,
  AdminApplicationItem,
} from '@/lib/portal-admin-data';

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<AdminApplicationItem[]>(INITIAL_ADMIN_APPLICATIONS);
  const [projectFilter, setProjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const refreshApplications = () => {
    setApplications(getStoredAdminApplications());
  };

  useEffect(() => {
    refreshApplications();
  }, []);

  const uniqueProjects = useMemo(() => {
    const map = new Map<string, string>();
    applications.forEach((a) => {
      if (a.projectId) map.set(a.projectId, a.projectTitle);
    });
    return Array.from(map.entries());
  }, [applications]);

  const handleUpdateStatus = (appId: string, status: AdminApplicationItem['status']) => {
    updateAdminApplicationStatus(appId, status);
    refreshApplications();
  };

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesProject = projectFilter === 'all' || app.projectId === projectFilter;
      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
      const matchesSearch =
        searchQuery === '' ||
        app.ecName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.ecEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesProject && matchesStatus && matchesSearch;
    });
  }, [applications, projectFilter, statusFilter, searchQuery]);

  return (
    <AdminShell>
      {/* Editorial Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[11px] tracking-wider uppercase text-neutral-500 dark:text-neutral-400">
              Evaluation Marketplace
            </span>
            <span className="inline-block w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            <span className="font-mono text-[11px] tracking-wider uppercase text-neutral-500 dark:text-neutral-400">
              {applications.length} Submissions
            </span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight">
            All Applications
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-xl">
            Review incoming expert contributor proposals, verify benchmark match scores, and issue contracts.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search applicant name, email, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg text-xs font-mono bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-400 transition-colors"
          />
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5 pointer-events-none" />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Project Filter */}
          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="px-3 py-2 rounded-lg text-xs font-mono bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white focus:outline-none cursor-pointer"
          >
            <option value="all">All Projects ({applications.length})</option>
            {uniqueProjects.map(([id, title]) => (
              <option key={id} value={id}>
                {title.length > 32 ? title.slice(0, 32) + '...' : title}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg text-xs font-mono bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white focus:outline-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="submitted">Submitted</option>
            <option value="in_review">In Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications List */}
      <div className="mt-6 space-y-3.5">
        {filteredApplications.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/90">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">No applications match criteria</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Select &ldquo;All Projects&rdquo; or reset status filters to view historical submissions.
            </p>
          </div>
        ) : (
          filteredApplications.map((app) => {
            const statusBadgeStyles = {
              submitted: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700',
              in_review: 'bg-amber-50 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border-amber-200 dark:border-amber-800',
              shortlisted: 'bg-blue-50 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border-blue-200 dark:border-blue-800',
              selected: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
              approved: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
              rejected: 'bg-red-50 text-red-800 dark:bg-red-950/70 dark:text-red-300 border-red-200 dark:border-red-800',
            };

            return (
              <div
                key={app.id}
                className="p-5 sm:p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow-[0_2px_8px_rgb(0,0,0,0.02)]"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  {/* Candidate Profile info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-mono text-xs font-bold text-neutral-800 dark:text-white">
                          {app.ecName
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .slice(0, 2)}
                        </div>
                        <span className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-white">
                          {app.ecName}
                        </span>
                      </div>

                      <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500">
                        {app.ecEmail}
                      </span>

                      {/* Status Badge */}
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider border ${
                          statusBadgeStyles[app.status]
                        }`}
                      >
                        {app.status.replace('_', ' ')}
                      </span>
                    </div>

                    {/* Project Application Title */}
                    <div className="text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200 mt-1">
                      Applied for:{' '}
                      <span className="text-neutral-950 dark:text-white font-semibold underline underline-offset-2">
                        {app.projectTitle}
                      </span>
                    </div>

                    {/* Proposal Notes */}
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed bg-neutral-50/80 dark:bg-neutral-950/60 p-3 rounded-lg border border-neutral-200/60 dark:border-neutral-800/80">
                      &ldquo;{app.notes}&rdquo;
                    </p>

                    {/* Candidate Skills */}
                    <div className="flex items-center gap-1.5 flex-wrap mt-3">
                      {app.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right side: Match score & Decision buttons */}
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-neutral-100 dark:border-neutral-800 flex-shrink-0">
                    {/* Match Meter Score */}
                    <div className="text-left md:text-right">
                      <div className="font-mono text-xs font-bold text-neutral-900 dark:text-white">
                        <span>{app.matchScore}% Technical Fit</span>
                      </div>
                      <div className="w-24 h-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 mt-1 overflow-hidden">
                        <div
                          className="h-full bg-neutral-900 dark:bg-white rounded-full"
                          style={{ width: `${app.matchScore}%` }}
                        />
                      </div>
                    </div>

                    {/* Operational Actions */}
                    <div className="flex items-center gap-2">
                      {app.status !== 'approved' && (
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(app.id, 'approved')}
                          className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer shadow-xs"
                        >
                          Approve
                        </button>
                      )}

                      {app.status !== 'in_review' && app.status !== 'approved' && (
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(app.id, 'in_review')}
                          className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
                        >
                          In Review
                        </button>
                      )}

                      {app.status !== 'rejected' && (
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(app.id, 'rejected')}
                          className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 border border-transparent dark:border-transparent transition-colors cursor-pointer"
                        >
                          Reject
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </AdminShell>
  );
}
