'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import { ShieldCheck, AlertCircle, FileText, Download, ExternalLink, ArrowLeft } from 'lucide-react';

const CERTIFICATE_ID_RE = /^EAI-INT-\d{4}-\d{4}-\d{2}$/;
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.evalixa.com';

function formatDate(value?: string) {
  if (!value) return '';
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return value;
  return new Intl.DateTimeFormat('en', { day: '2-digit', month: 'long', year: 'numeric' })
    .format(new Date(Date.UTC(year, month - 1, day)));
}

interface CertificateData {
  certificateId: string;
  candidateName: string;
  candidateRole?: string;
  title?: string;
  issuedDate?: string;
  periodStart?: string;
  periodEnd?: string;
}

export default function InternshipCertificatePage({
  params,
}: {
  params: Promise<{ certificateId: string }>;
}) {
  const resolvedParams = use(params);
  const certificateId = decodeURIComponent(resolvedParams.certificateId || '').trim();

  const [state, setState] = useState<{
    status: 'loading' | 'ready' | 'error';
    certificate: CertificateData | null;
    error: string;
  }>({
    status: 'loading',
    certificate: null,
    error: '',
  });

  const [preview, setPreview] = useState<{ url: string; error: string }>({
    url: '',
    error: '',
  });

  useEffect(() => {
    let cancelled = false;

    if (!CERTIFICATE_ID_RE.test(certificateId)) {
      setState({
        status: 'error',
        certificate: null,
        error: 'Invalid certificate ID format. Expected format: EAI-INT-YYYY-NNNN-NN.',
      });
      return () => {
        cancelled = true;
      };
    }

    setState({ status: 'loading', certificate: null, error: '' });

    fetch(`${API_BASE}/api/internship-certificates/${encodeURIComponent(certificateId)}`)
      .then(async (res) => {
        const data = await res.json().catch(() => null);
        if (!res.ok) throw new Error(data?.error || 'Certificate not found in registry.');
        return data;
      })
      .then((certificate) => {
        if (!cancelled) setState({ status: 'ready', certificate, error: '' });
      })
      .catch((err) => {
        if (!cancelled) {
          setState({
            status: 'error',
            certificate: null,
            error: err.message || 'Certificate verification unavailable or not found.',
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [certificateId]);

  const certificate = state.certificate;
  const pdfPath = certificate?.certificateId
    ? `${API_BASE}/api/internship-certificates/${encodeURIComponent(certificate.certificateId)}/pdf`
    : '';

  useEffect(() => {
    const controller = new AbortController();
    let objectUrl = '';
    setPreview({ url: '', error: '' });

    if (pdfPath) {
      fetch(pdfPath, { signal: controller.signal })
        .then(async (response) => {
          if (!response.ok) throw new Error('Preview unavailable. Use the Open PDF button.');
          const blob = await response.blob();
          if (controller.signal.aborted) return;
          objectUrl = URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
          setPreview({ url: objectUrl, error: '' });
        })
        .catch(() => {
          if (!controller.signal.aborted) {
            setPreview({ url: '', error: 'Preview unavailable. Use the Open PDF button.' });
          }
        });
    }

    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [pdfPath]);

  const issuedDate = formatDate(certificate?.issuedDate);
  const period =
    certificate?.periodStart && certificate?.periodEnd
      ? `${formatDate(certificate.periodStart)} – ${formatDate(certificate.periodEnd)}`
      : '';

  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#09090b] text-neutral-300 selection:bg-neutral-800 selection:text-white">
        <Navbar />

        <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* Header Card */}
          <div className="rounded-2xl border border-neutral-800 bg-[#0d0e12] p-8 sm:p-10 mb-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/80 pb-6 mb-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-1">
                  Evalixa AI Certificate Registry
                </span>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Internship Completion Certificate
                </h1>
              </div>
              <div className="text-left sm:text-right font-mono text-xs">
                <span className="text-neutral-500 block">Record ID</span>
                <span className="text-white font-semibold text-sm">{certificateId}</span>
              </div>
            </div>

            {/* State Handling */}
            {state.status === 'loading' && (
              <div className="py-12 text-center font-mono text-xs text-neutral-400">
                <div className="inline-block w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mb-3" />
                <p>Verifying credentials against the cryptographic registry...</p>
              </div>
            )}

            {state.status === 'error' && (
              <div className="p-6 rounded-xl border border-red-900/40 bg-red-950/20 text-neutral-300">
                <div className="flex items-center gap-3 text-red-400 font-medium mb-2">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>Certificate Unavailable</span>
                </div>
                <p className="text-sm text-neutral-400 font-normal leading-relaxed mb-4">
                  {state.error}
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white hover:underline"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Homepage</span>
                </Link>
              </div>
            )}

            {state.status === 'ready' && certificate && (
              <div className="space-y-8">
                {/* Verified Candidate Summary */}
                <div className="flex items-start justify-between flex-wrap gap-4 p-6 rounded-xl bg-neutral-900/60 border border-neutral-800">
                  <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-800/80 text-emerald-400 font-mono text-[11px] mb-3">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified Active Record</span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">
                      {certificate.candidateName}
                    </h2>
                    <p className="text-sm text-neutral-400 font-normal">
                      {certificate.candidateRole || certificate.title || 'Technical Intern'}
                    </p>
                  </div>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-xl bg-neutral-900/30 border border-neutral-800/80 text-xs">
                  <div>
                    <span className="text-neutral-500 font-mono uppercase tracking-wider block mb-1">
                      Issued Date
                    </span>
                    <span className="text-white font-medium">{issuedDate || '—'}</span>
                  </div>
                  {period && (
                    <div>
                      <span className="text-neutral-500 font-mono uppercase tracking-wider block mb-1">
                        Tenure Period
                      </span>
                      <span className="text-white font-medium">{period}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-neutral-500 font-mono uppercase tracking-wider block mb-1">
                      Status
                    </span>
                    <span className="text-emerald-400 font-medium">Published & Verified</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 font-mono uppercase tracking-wider block mb-1">
                      Registry ID
                    </span>
                    <span className="text-white font-mono">{certificate.certificateId}</span>
                  </div>
                </div>

                {/* PDF Viewer & Download Actions */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                      Document Preview
                    </span>
                    <div className="flex items-center gap-2">
                      <a
                        href={pdfPath}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs font-mono text-neutral-200 hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Open PDF</span>
                      </a>
                      <a
                        href={pdfPath}
                        download
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-white text-black hover:bg-neutral-200 text-xs font-mono font-semibold transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </a>
                    </div>
                  </div>

                  <div className="w-full h-[500px] rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden flex items-center justify-center">
                    {preview.url ? (
                      <iframe
                        src={`${preview.url}#view=FitH`}
                        title={`Certificate ${certificate.certificateId}`}
                        className="w-full h-full border-0"
                      />
                    ) : (
                      <p className="text-xs font-mono text-neutral-500">
                        {preview.error || 'Loading PDF preview...'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
