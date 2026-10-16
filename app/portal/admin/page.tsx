'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import AdminShell from '@/components/portal/admin/AdminShell';
import {
  getAdminOverviewMetrics,
  getStoredAuditLogs,
  getStoredAdminRequests,
  exportVerifiedEcsAsCsv,
  INITIAL_ADMIN_OVERVIEW_STATS,
  INITIAL_AUDIT_LOGS,
  INITIAL_ADMIN_REQUESTS,
  AdminOverviewStats,
  AdminAuditLogItem,
  AdminPortalRequestItem,
} from '@/lib/portal-admin-data';

export default function AdminOverviewPage() {
  const [metrics, setMetrics] = useState<AdminOverviewStats>(INITIAL_ADMIN_OVERVIEW_STATS);
  const [logs, setLogs] = useState<AdminAuditLogItem[]>(INITIAL_AUDIT_LOGS);
  const [requests, setRequests] = useState<AdminPortalRequestItem[]>(INITIAL_ADMIN_REQUESTS);
  const [exported, setExported] = useState(false);

  const refreshData = () => {
    setMetrics(getAdminOverviewMetrics());
    setLogs(getStoredAuditLogs());
    setRequests(getStoredAdminRequests());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const urgentRequests = requests.filter(
    (r) => r.status === 'submitted' || r.status === 'in_review'
  );

  const handleExportVerifiedEcs = () => {
    const csvContent = exportVerifiedEcsAsCsv();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `evalixa-verified-ecs-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  return (
    <AdminShell urgentCount={urgentRequests.length}>
      {/* Editorial Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[11px] tracking-wider uppercase text-neutral-500 dark:text-neutral-400">
              Operations Center
            </span>
            <span className="inline-block w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            <span className="font-mono text-[11px] tracking-wider uppercase text-emerald-600 dark:text-emerald-400 font-semibold">
              Live Marketplace
            </span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight">
            Portal Overview
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-xl">
            Real-time platform health across benchmark projects, contributor applications, and urgent operations.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={handleExportVerifiedEcs}
            className="px-3.5 py-2 rounded-lg text-xs font-mono font-medium border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors shadow-xs cursor-pointer"
          >
            {exported ? 'Exported CSV' : 'Export Verified ECs'}
          </button>

          <Link
            href="/portal/admin/projects"
            className="px-3.5 py-2 rounded-lg text-xs font-mono font-semibold bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 transition-colors shadow-xs"
          >
            Post Project
          </Link>
        </div>
      </div>

      {/* Urgent Operational Alerts */}
      {urgentRequests.length > 0 && (
        <section className="mt-6 p-4 rounded-xl border border-amber-300/80 dark:border-amber-900/60 bg-amber-50/70 dark:bg-amber-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in-50 duration-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-700 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-sm font-semibold text-amber-900 dark:text-amber-200">
                {urgentRequests.length} Urgent Request{urgentRequests.length === 1 ? '' : 's'} Needing Review
              </h2>
              <p className="text-xs text-amber-800/90 dark:text-amber-300/80 mt-0.5">
                Pending internship certificate issuance and quit job handover notifications require administrative sign-off.
              </p>
            </div>
          </div>
          <Link
            href="/portal/admin/notifications"
            className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-amber-900 hover:bg-amber-950 dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-neutral-950 transition-colors self-start sm:self-auto flex-shrink-0"
          >
            Review Requests
          </Link>
        </section>
      )}

      {/* Bento Metric Tiles - Clean typography without icon clutter */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6">
        {/* Tile 1: Total Users */}
        <div className="p-4 sm:p-5 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 flex flex-col justify-between shadow-[0_2px_8px_rgb(0,0,0,0.02)]">
          <span className="font-mono text-[11px] tracking-wider uppercase font-medium text-neutral-400 dark:text-neutral-500 mb-2">
            Total Users
          </span>
          <div>
            <div className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight">
              {metrics.totalUsers}
            </div>
            <p className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
              {metrics.ecsCount} ECs • {metrics.employersCount} Employers
            </p>
          </div>
        </div>

        {/* Tile 2: Open Projects */}
        <div className="p-4 sm:p-5 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 flex flex-col justify-between shadow-[0_2px_8px_rgb(0,0,0,0.02)]">
          <span className="font-mono text-[11px] tracking-wider uppercase font-medium text-neutral-400 dark:text-neutral-500 mb-2">
            Open Projects
          </span>
          <div>
            <div className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight">
              {metrics.openProjectsCount}
            </div>
            <p className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
              {metrics.totalProjects} posted across platform
            </p>
          </div>
        </div>

        {/* Tile 3: Applications */}
        <div className="p-4 sm:p-5 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 flex flex-col justify-between shadow-[0_2px_8px_rgb(0,0,0,0.02)]">
          <span className="font-mono text-[11px] tracking-wider uppercase font-medium text-neutral-400 dark:text-neutral-500 mb-2">
            Applications
          </span>
          <div>
            <div className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight">
              {metrics.totalApplications}
            </div>
            <p className="font-mono text-[11px] text-amber-600 dark:text-amber-400 mt-1 font-semibold">
              {metrics.pendingReviewsCount} pending review
            </p>
          </div>
        </div>

        {/* Tile 4: Active Assignments */}
        <div className="p-4 sm:p-5 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 flex flex-col justify-between shadow-[0_2px_8px_rgb(0,0,0,0.02)]">
          <span className="font-mono text-[11px] tracking-wider uppercase font-medium text-neutral-400 dark:text-neutral-500 mb-2">
            Assignments
          </span>
          <div>
            <div className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight">
              {metrics.activeAssignmentsCount}
            </div>
            <p className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
              {metrics.completedDeliverablesCount} verified deliverables
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation Panels */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Link
          href="/portal/admin/projects"
          className="p-5 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 hover:border-neutral-400 dark:hover:border-neutral-700 transition-all group"
        >
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">
            Benchmark Projects
          </div>
          <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
            Manage Projects
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
            Create new client benchmark contracts, update task criteria, change status, and monitor intake capacities.
          </p>
        </Link>

        <Link
          href="/portal/admin/applications"
          className="p-5 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 hover:border-neutral-400 dark:hover:border-neutral-700 transition-all group"
        >
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">
            Applicant Ledger
          </div>
          <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
            Review Applications
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
            Review contributor proposals, evaluate technical match scores, shortlist candidates, and approve work allocations.
          </p>
        </Link>

        <Link
          href="/portal/admin/users"
          className="p-5 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 hover:border-neutral-400 dark:hover:border-neutral-700 transition-all group"
        >
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">
            Contributors & Roles
          </div>
          <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
            Users & EC Verification
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
            Verify expert contributor profiles, audit background credentials, enforce account status, and manage platform roles.
          </p>
        </Link>
      </section>

      {/* Audit Log / Recent Activity */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">
              Platform Audit Activity
            </h2>
            <span className="font-mono text-[11px] text-neutral-400">
              ({logs.length} logged events)
            </span>
          </div>
          <span className="font-mono text-[11px] text-neutral-400">Real-time</span>
        </div>

        <div className="rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 overflow-hidden divide-y divide-neutral-100 dark:divide-neutral-800/80 shadow-[0_2px_8px_rgb(0,0,0,0.02)]">
          {logs.slice(0, 7).map((log) => (
            <div
              key={log.id}
              className="px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-neutral-50/60 dark:hover:bg-neutral-800/30 transition-colors"
            >
              <div className="flex items-start sm:items-center gap-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex-shrink-0 mt-0.5 sm:mt-0">
                  {log.action}
                </span>
                <span className="text-xs text-neutral-900 dark:text-neutral-200 font-medium">
                  {log.target}
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-400 dark:text-neutral-500 self-end sm:self-auto">
                <span>{log.actor}</span>
                <span>•</span>
                <span>{log.at}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AdminShell>
  );
}
