'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import AdminShell from '@/components/portal/admin/AdminShell';
import {
  getStoredAdminRequests,
  resolveAdminRequest,
  INITIAL_ADMIN_REQUESTS,
  AdminPortalRequestItem,
} from '@/lib/portal-admin-data';

export default function AdminNotificationsPage() {
  const [requests, setRequests] = useState<AdminPortalRequestItem[]>(INITIAL_ADMIN_REQUESTS);
  const [activeTab, setActiveTab] = useState<'pending' | 'resolved' | 'all'>('pending');

  // Certificate issuance modal state
  const [issuingRequestId, setIssuingRequestId] = useState<string | null>(null);
  const [certCandidateName, setCertCandidateName] = useState('');
  const [certPeriodStart, setCertPeriodStart] = useState('2026-06-01');
  const [certPeriodEnd, setCertPeriodEnd] = useState('2026-09-30');
  const [certRole, setCertRole] = useState('AI Evaluation Intern');
  const [successNotice, setSuccessNotice] = useState<{ id: string; certId: string } | null>(null);

  const refreshRequests = () => {
    setRequests(getStoredAdminRequests());
  };

  useEffect(() => {
    refreshRequests();
  }, []);

  const handleResolve = (requestId: string, status: 'approved' | 'rejected' | 'resolved') => {
    resolveAdminRequest(requestId, status);
    refreshRequests();
  };

  const handleOpenCertificateModal = (req: AdminPortalRequestItem) => {
    setIssuingRequestId(req.id);
    setCertCandidateName(req.requesterName);
    setSuccessNotice(null);
  };

  const handleIssueCertificateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issuingRequestId) return;

    // Generate compliant certificate ID format EAI-INT-YYYY-XXXX-01
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const generatedCertId = `EAI-INT-2026-${randNum}-01`;

    resolveAdminRequest(issuingRequestId, 'approved', generatedCertId);
    setSuccessNotice({ id: issuingRequestId, certId: generatedCertId });
    setIssuingRequestId(null);
    refreshRequests();
  };

  const filteredRequests = requests.filter((r) => {
    if (activeTab === 'pending') return r.status === 'submitted' || r.status === 'in_review';
    if (activeTab === 'resolved') return r.status === 'approved' || r.status === 'rejected' || r.status === 'resolved';
    return true;
  });

  const urgentPendingCount = requests.filter(
    (r) => r.status === 'submitted' || r.status === 'in_review'
  ).length;

  return (
    <AdminShell urgentCount={urgentPendingCount}>
      {/* Editorial Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[11px] tracking-wider uppercase text-neutral-500 dark:text-neutral-400">
              Administrative Workflows
            </span>
            <span className="inline-block w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            <span className="font-mono text-[11px] tracking-wider uppercase text-neutral-500 dark:text-neutral-400">
              {urgentPendingCount} Actionable Items
            </span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight">
            Requests & Notifications
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-xl">
            Audit contributor requests, authorize job departures, and generate cryptographically verified internship certificates.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg border bg-neutral-100/80 dark:bg-neutral-900/90 border-neutral-200 dark:border-neutral-800 self-start sm:self-auto font-mono text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('pending')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              activeTab === 'pending'
                ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold shadow-xs'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Pending ({urgentPendingCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('resolved')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              activeTab === 'resolved'
                ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold shadow-xs'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Resolved
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              activeTab === 'all'
                ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold shadow-xs'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            All History
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {successNotice && (
        <div className="mt-6 p-4 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/80 dark:bg-emerald-950/30 flex items-center justify-between gap-3 animate-in fade-in-50 duration-200">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-emerald-900 dark:text-emerald-200">
                Internship Certificate Generated Successfully!
              </p>
              <p className="text-xs font-mono text-emerald-800 dark:text-emerald-300 mt-0.5">
                Certificate ID: <span className="font-bold">{successNotice.certId}</span>
              </p>
            </div>
          </div>
          <Link
            href={`/internship-certificate/${successNotice.certId}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-emerald-700 hover:bg-emerald-800 text-white transition-colors flex-shrink-0"
          >
            <span>View Certificate</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Requests List */}
      <div className="mt-6 space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/90">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
              No requests in this view
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              All contributor requests have been processed.
            </p>
          </div>
        ) : (
          filteredRequests.map((req) => {
            const isCert = req.requestType === 'internship_certificate';
            const isPending = req.status === 'submitted' || req.status === 'in_review';

            return (
              <div
                key={req.id}
                className="p-5 sm:p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow-[0_2px_8px_rgb(0,0,0,0.02)]"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap mb-1">
                      <span className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-white">
                        {req.requestTypeLabel}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                          req.status === 'approved' || req.status === 'resolved'
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                            : req.status === 'rejected'
                            ? 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300'
                            : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                        }`}
                      >
                        {req.status}
                      </span>
                    </div>

                    <div className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                      Requester: <span className="font-semibold text-neutral-900 dark:text-white">{req.requesterName}</span> ({req.requesterEmail})
                    </div>

                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed bg-neutral-50 dark:bg-neutral-950/60 p-3 rounded-lg border border-neutral-100 dark:border-neutral-800">
                      {req.details}
                    </p>

                    {/* Certificate link if already issued */}
                    {req.certificateId && (
                      <div className="mt-3 flex items-center gap-2 font-mono text-xs text-emerald-700 dark:text-emerald-400">
                        <span>Certificate Issued:</span>
                        <Link
                          href={`/internship-certificate/${req.certificateId}`}
                          target="_blank"
                          className="font-semibold underline underline-offset-2 hover:text-emerald-900 dark:hover:text-emerald-200"
                        >
                          {req.certificateId}
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Actions Column */}
                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100 dark:border-neutral-800 flex-shrink-0">
                    {isPending && isCert && (
                      <button
                        type="button"
                        onClick={() => handleOpenCertificateModal(req)}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 transition-colors shadow-xs cursor-pointer"
                      >
                        Issue Certificate
                      </button>
                    )}

                    {isPending && !isCert && (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleResolve(req.id, 'approved')}
                          className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer shadow-xs"
                        >
                          Acknowledge & Release
                        </button>
                        <button
                          type="button"
                          onClick={() => handleResolve(req.id, 'rejected')}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-mono text-neutral-500 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Certificate Issuance Modal Dialog */}
      {issuingRequestId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIssuingRequestId(null)}
          />
          <div className="relative w-full max-w-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-7 shadow-2xl z-10">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-1">
              Issue Internship Completion Certificate
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-5">
              Verify credentials and generate a public verification record.
            </p>

            <form onSubmit={handleIssueCertificateSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Candidate Full Name
                </label>
                <input
                  type="text"
                  value={certCandidateName}
                  onChange={(e) => setCertCandidateName(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Internship Designation
                </label>
                <input
                  type="text"
                  value={certRole}
                  onChange={(e) => setCertRole(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Period Start
                  </label>
                  <input
                    type="date"
                    value={certPeriodStart}
                    onChange={(e) => setCertPeriodStart(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Period End
                  </label>
                  <input
                    type="date"
                    value={certPeriodEnd}
                    onChange={(e) => setCertPeriodEnd(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIssuingRequestId(null)}
                  className="px-3.5 py-2 rounded-lg text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-mono font-semibold bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 shadow-xs cursor-pointer"
                >
                  Authorize & Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
