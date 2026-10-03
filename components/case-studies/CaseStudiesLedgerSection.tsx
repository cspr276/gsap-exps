'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CASE_STUDIES } from '@/data/caseStudies';
import { CheckCircle2, ArrowUpRight, ShieldCheck, Terminal } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ACCENT_COLORS = {
  'case-01': {
    border: 'border-l-blue-500',
    hoverBorder: 'hover:border-blue-500/40',
    indexText: 'text-blue-400',
    phaseText: 'text-blue-400',
  },
  'case-02': {
    border: 'border-l-red-500',
    hoverBorder: 'hover:border-red-500/40',
    indexText: 'text-red-400',
    phaseText: 'text-red-400',
  },
  'case-03': {
    border: 'border-l-emerald-500',
    hoverBorder: 'hover:border-emerald-500/40',
    indexText: 'text-emerald-400',
    phaseText: 'text-emerald-400',
  },
};

export default function CaseStudiesLedgerSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useGSAP(
    () => {
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 35, opacity: 0.2 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              id: `case-card-${index}`,
              trigger: card,
              start: 'top 92%',
              end: 'top 60%',
              scrub: 1,
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="case-studies-ledger"
      ref={containerRef}
      className="relative z-20 bg-[#09090b] text-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-b border-neutral-800"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header - Clean, no circle dot */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-3">
              AUDIT LEDGER // IN-DEPTH ENGAGEMENTS
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Verified outcomes from production audits.
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-neutral-400 max-w-md">
            Client names are withheld under NDA. Engagements reflect real deployment audits with cryptographic replay traces and reproducible regressions.
          </p>
        </div>

        {/* 12-Column Layout: Left Sticky Rail + Right Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Pinned Rail */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6 self-start">
            {/* How to Read These Studies */}
            <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-lg p-6 backdrop-blur-md">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-3">
                How to Read These Studies
              </span>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                Each study follows the same structure: the problem the team brought us, the approach we took, and what changed as a result. Engagements are described by sector and system type. Every number is reproduced from the evaluation traces we hand over, not from marketing estimates.
              </p>

              {/* Deliverables Checklist */}
              <div className="pt-4 border-t border-neutral-800/80">
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-300 font-semibold block mb-3">
                  Audit Handover Deliverables:
                </span>
                <ul className="space-y-2 text-xs text-neutral-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span>Reviewer notes with contributor traces</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span>Agreement scores (Krippendorff &alpha; &gt; 0.90)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span>Reproducible execution traces</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span>Severity-ranked regression blockers</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Direct Scoping Callout */}
            <div className="bg-linear-to-b from-neutral-900/90 to-neutral-950 border border-neutral-800 rounded-lg p-6">
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-300 font-semibold block mb-2">
                Have a Model in Staging?
              </span>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Bring one high-risk workflow you are unsure about. We will scope an evaluation harness and identify masked vulnerabilities before launch.
              </p>
              <Link
                href="/contact?source=case-studies"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-xs uppercase tracking-wider font-medium border border-neutral-700 transition-colors"
              >
                <span>Scope Your Evaluation</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
              </Link>
            </div>
          </div>

          {/* Right Column: Case Studies Rows matching original site */}
          <div className="lg:col-span-8 space-y-8">
            {CASE_STUDIES.map((study, idx) => {
              const accent = ACCENT_COLORS[study.id as keyof typeof ACCENT_COLORS] || ACCENT_COLORS['case-01'];

              return (
                <article
                  key={study.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  className={`bg-neutral-900/60 border border-neutral-800 border-l-4 ${accent.border} rounded-lg p-6 sm:p-8 backdrop-blur-sm transition-colors ${accent.hoverBorder}`}
                >
                  {/* Top Row: Index + Meta */}
                  <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
                    <div className="flex items-baseline gap-3">
                      <span className={`font-mono text-2xl sm:text-3xl font-black ${accent.indexText}`}>
                        {study.index}
                      </span>
                      <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest font-semibold">
                        {study.focus}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider">
                      {study.domain}
                    </span>
                  </div>

                  {/* Headline & Context */}
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight mb-2">
                    {study.headline}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6 font-medium">
                    {study.clientContext}
                  </p>

                  <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                    {study.summary}
                  </p>

                  {/* The Flow: Problem -> Approach -> Outcome (Clean lines, NO nested boxes) */}
                  <div className="space-y-4 pt-2 mb-6">
                    {study.phases.map((phase) => (
                      <div
                        key={phase.label}
                        className="grid grid-cols-1 sm:grid-cols-[90px_1fr] gap-2 sm:gap-4 pt-4 border-t border-neutral-800/80"
                      >
                        <span className={`font-mono text-xs font-bold uppercase tracking-wider ${accent.phaseText}`}>
                          {phase.label}
                        </span>
                        <div>
                          <strong className="font-display font-semibold text-sm text-white block mb-1">
                            {phase.title}
                          </strong>
                          <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed">
                            {phase.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Telemetry Strip: Compact Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-5 border-t border-neutral-800/80 mb-5">
                    {study.metrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="bg-neutral-950/60 border border-neutral-800/60 rounded-md p-3"
                      >
                        <div className="font-display font-bold text-lg sm:text-xl text-white tracking-tight">
                          {m.value}
                        </div>
                        <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Deliverables tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {study.deliverables.map((d, dIdx) => (
                      <span
                        key={dIdx}
                        className="font-mono text-[11px] text-neutral-400 bg-neutral-950/80 border border-neutral-800 px-2.5 py-1 rounded"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
