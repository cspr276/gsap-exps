'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CASE_STUDIES } from '@/data/caseStudies';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HANDOVER_STANDARDS = [
  'Reviewer notes & contributor traces',
  'Inter-rater agreement (α > 0.90)',
  'Deterministic replay test cases',
  'Severity-ranked regression blockers',
];

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
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header & Suitable Top Placement for Orientation / Handover Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-12 border-b border-neutral-800/80">
          {/* Left Column: Heading & How to Read These Studies */}
          <div className="lg:col-span-7 space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block">
              AUDIT LEDGER // IN-DEPTH ENGAGEMENTS
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Verified outcomes from production audits.
            </h2>
            <p className="font-sans text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl">
              Each study follows the same verification structure: the failure mode the team brought us, the approach we engineered, and what changed as a result. Figures are illustrative of outcomes these programmes produce — every number in a live engagement is reproduced from the evaluation traces we hand over, not from a marketing summary.
            </p>
          </div>

          {/* Right Column: Handover Standard Checklist & Direct Scope Action */}
          <div className="lg:col-span-5 bg-neutral-900/60 border border-neutral-800 rounded-lg p-6 flex flex-col justify-between gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-300 font-semibold block mb-3">
                Audit Handover Deliverables Standard:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-400">
                {HANDOVER_STANDARDS.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-4">
              <span className="text-xs text-neutral-400">Have a model in staging?</span>
              <Link
                href="/contact?source=case-studies"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-xs uppercase tracking-wider font-medium border border-neutral-700 transition-colors"
              >
                <span>Scope Evaluation</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
              </Link>
            </div>
          </div>
        </div>

        {/* Full-Width Case Studies Cards */}
        <div className="space-y-12">
          {CASE_STUDIES.map((study, idx) => (
            <article
              key={study.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6 sm:p-9 backdrop-blur-sm hover:border-neutral-700 transition-colors"
            >
              {/* Card Header: Index, Domain, Focus */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-800/80">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-neutral-300 px-2.5 py-1 rounded bg-neutral-800/80 border border-neutral-700/60">
                    CASE // {study.index}
                  </span>
                  <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider">
                    {study.domain}
                  </span>
                </div>
                <span className="font-mono text-xs text-neutral-300">
                  {study.categoryLabel}
                </span>
              </div>

              {/* Title & Context */}
              <div className="max-w-4xl mb-6">
                <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider block mb-2">
                  Context: {study.clientContext}
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight mb-3">
                  {study.headline}
                </h3>
                <p className="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {study.summary}
                </p>
              </div>

              {/* 3-Column Horizontal Flow for Problem -> Approach -> Outcome */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-neutral-800/80">
                {study.phases.map((phase, pIdx) => (
                  <div key={phase.label} className="space-y-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                      {String(pIdx + 1).padStart(2, '0')} // {phase.label}
                    </span>
                    <strong className="font-display font-semibold text-sm text-neutral-100 block">
                      {phase.title}
                    </strong>
                    <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed">
                      {phase.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Card Footer: Metrics & Deliverables in Clean Horizontal Bar */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 mt-6 border-t border-neutral-800/80 items-center">
                {/* Telemetry Metrics */}
                <div className="lg:col-span-6 grid grid-cols-3 gap-3">
                  {study.metrics.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="bg-neutral-950/60 border border-neutral-800/70 rounded-md p-3"
                    >
                      <div className="font-display font-bold text-lg sm:text-xl text-white tracking-tight">
                        {m.value}
                      </div>
                      <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Handover Deliverables */}
                <div className="lg:col-span-6 flex flex-wrap gap-2 lg:justify-end">
                  {study.deliverables.map((d, dIdx) => (
                    <span
                      key={dIdx}
                      className="font-mono text-[11px] text-neutral-400 bg-neutral-950/80 border border-neutral-800 px-2.5 py-1 rounded"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
