'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CASE_STUDIES } from '@/data/caseStudies';
import { TOCMinimap, TOCItemType } from '@/components/toc-minimap';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HANDOVER_STANDARDS = [
  'Reviewer notes & contributor traces',
  'Inter-rater agreement (α > 0.90)',
  'Deterministic replay test cases',
  'Severity-ranked regression blockers',
];

const TOC_ITEMS: TOCItemType[] = [
  {
    title: 'Audit Methodology',
    url: '#audit-methodology',
    depth: 2,
  },
  {
    title: 'Fintech Agent Evaluation',
    url: '#case-01',
    depth: 2,
  },
  {
    title: 'Refund Hallucinations',
    url: '#case-01-problem',
    depth: 3,
  },
  {
    title: 'Task-Grounded Rubrics',
    url: '#case-01-approach',
    depth: 3,
  },
  {
    title: 'Board Authorization',
    url: '#case-01-outcome',
    depth: 3,
  },
  {
    title: 'Model Red-Teaming',
    url: '#case-02',
    depth: 2,
  },
  {
    title: 'Static Suite Gaps',
    url: '#case-02-problem',
    depth: 3,
  },
  {
    title: 'Adaptive Injections',
    url: '#case-02-approach',
    depth: 3,
  },
  {
    title: 'Automated CI Gate',
    url: '#case-02-outcome',
    depth: 3,
  },
  {
    title: 'Clinical Alignment & RLHF',
    url: '#case-03',
    depth: 2,
  },
  {
    title: 'Diagnostic Omissions',
    url: '#case-03-problem',
    depth: 3,
  },
  {
    title: 'Credentialed MDs',
    url: '#case-03-approach',
    depth: 3,
  },
  {
    title: 'Regulatory Ledger',
    url: '#case-03-outcome',
    depth: 3,
  },
  {
    title: 'Reporting Standards',
    url: '#handover-reporting',
    depth: 2,
  },
];

export default function CaseStudiesLedgerSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLElement | null)[]>([]);

  useGSAP(
    () => {
      rowRefs.current.forEach((row, index) => {
        if (!row) return;
        gsap.fromTo(
          row,
          { y: 35, opacity: 0.15 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              id: `case-row-${index}`,
              trigger: row,
              start: 'top 90%',
              end: 'top 55%',
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
      <div className="max-w-7xl mx-auto flex items-start gap-8 lg:gap-14">
        {/* Left Sticky TOC Minimap Rail spanning the entire ledger */}
        <aside className="hidden md:flex flex-col items-start w-16 shrink-0 sticky top-28 self-start z-30 pt-1">
          <TOCMinimap items={TOC_ITEMS} className="w-full ml-0" />
        </aside>

        {/* Main Content Stream */}
        <div className="flex-1 min-w-0 space-y-16">
          {/* Natural Header Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pb-16 border-b border-neutral-800">
            {/* Main Title & Lede */}
            <div className="lg:col-span-7 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block">
                AUDIT LEDGER // IN-DEPTH ENGAGEMENTS
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                Verified outcomes from production audits.
              </h2>
              <p className="font-sans text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl">
                Each study follows the same verification structure: the failure mode the team brought us, the approach we engineered, and what changed as a result. Figures are illustrative of outcomes these programmes produce — every number in a live engagement is reproduced from the evaluation traces we hand over, not from a marketing summary.
              </p>
            </div>

            {/* Natural Handover Standards List */}
            <div className="lg:col-span-5 space-y-6 pt-2 lg:pt-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-300 font-semibold block mb-3">
                  Audit Handover Deliverables Standard
                </span>
                <ul className="space-y-2 text-sm text-neutral-400">
                  {HANDOVER_STANDARDS.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="text-neutral-500 font-mono text-xs">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <span className="text-xs text-neutral-400">Have a model in staging?</span>
                <Link
                  href="/contact?source=case-studies"
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-white hover:text-neutral-300 transition-colors underline underline-offset-4"
                >
                  <span>Scope Evaluation</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Natural Case Studies Rows */}
          <div className="divide-y divide-neutral-800">
            {CASE_STUDIES.map((study, idx) => (
              <article
                key={study.id}
                id={study.id}
                ref={(el) => {
                  rowRefs.current[idx] = el;
                }}
                className="py-16 sm:py-20 first:pt-0 last:pb-0 space-y-8 scroll-mt-28"
              >
                {/* Meta Row: Large Index + Domain + Context */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-3xl sm:text-4xl font-extrabold text-neutral-300">
                      {study.index}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                      {study.focus}
                    </span>
                    <span className="text-neutral-600 hidden sm:inline">/</span>
                    <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                      {study.domain}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-neutral-400">
                    {study.clientContext}
                  </span>
                </div>

                {/* Title & Core Summary */}
                <div className="max-w-4xl space-y-3">
                  <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-snug">
                    {study.headline}
                  </h3>
                  <p className="font-sans text-base sm:text-lg text-neutral-300 leading-relaxed">
                    {study.summary}
                  </p>
                </div>

                {/* 3-Column Progression (Problem -> Approach -> Outcome) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
                  {study.phases.map((phase, pIdx) => {
                    const phaseId = `${study.id}-${phase.label.toLowerCase()}`;
                    return (
                      <div
                        key={phase.label}
                        id={phaseId}
                        className="space-y-2.5 scroll-mt-32"
                      >
                        <span className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-400 block">
                          {String(pIdx + 1).padStart(2, '0')} // {phase.label}
                        </span>
                        <strong className="font-display font-semibold text-base text-white block">
                          {phase.title}
                        </strong>
                        <p className="font-sans text-sm text-neutral-400 leading-relaxed">
                          {phase.text}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Metrics & Deliverables Ledger Line */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-8 border-t border-neutral-800/80 items-start">
                  {/* 3 Telemetry Metrics */}
                  <div className="lg:col-span-5 grid grid-cols-3 gap-4">
                    {study.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="space-y-1">
                        <div className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                          {m.value}
                        </div>
                        <div className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider leading-tight">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Handover Deliverables */}
                  <div className="lg:col-span-7 flex flex-col justify-center space-y-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                      Handover Deliverables:
                    </span>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-300 font-mono">
                      {study.deliverables.map((d, dIdx) => (
                        <span key={dIdx} className="inline-flex items-center gap-1.5">
                          <span className="text-neutral-500">•</span>
                          <span>{d}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
