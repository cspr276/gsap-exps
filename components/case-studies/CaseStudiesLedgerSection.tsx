'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CASE_STUDIES, CaseStudy } from '@/data/caseStudies';
import { CheckCircle2, ArrowUpRight, ShieldCheck, Terminal, Filter } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CATEGORIES = [
  { id: 'all', label: 'All Studies', count: 3 },
  { id: 'agent-evaluation', label: 'Agent Evaluation', count: 1 },
  { id: 'red-teaming', label: 'Adversarial Security', count: 1 },
  { id: 'expert-data', label: 'Expert Alignment', count: 1 },
];

export default function CaseStudiesLedgerSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filteredStudies =
    activeCategory === 'all'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((s) => s.category === activeCategory);

  useGSAP(
    () => {
      // Clean up previous triggers if any
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.id?.startsWith('case-card-')) {
          st.kill();
        }
      });

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 40, opacity: 0.2 },
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
    { dependencies: [activeCategory], scope: containerRef }
  );

  return (
    <section
      id="case-studies-ledger"
      ref={containerRef}
      className="relative z-20 bg-[#09090b] text-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-b border-neutral-800"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                AUDIT LEDGER // IN-DEPTH ENGAGEMENTS
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Verified outcomes from production audits.
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-neutral-400 max-w-md">
            Client names are withheld under NDA. Engagements reflect real deployment audits with cryptographic replay traces and reproducible regressions.
          </p>
        </div>

        {/* 12-Column Layout: Sticky Rail Left + Cards Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Pinned Rail */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6 self-start">
            {/* Filter Box */}
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-5 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-4 text-neutral-400 font-mono text-xs uppercase tracking-wider font-semibold">
                <Filter className="w-3.5 h-3.5 text-neutral-400" />
                <span>Filter By Domain</span>
              </div>
              <div className="space-y-1.5">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-mono transition-all text-left cursor-pointer ${
                        isActive
                          ? 'bg-white text-black font-semibold shadow-xs'
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`text-[11px] px-1.5 py-0.5 rounded ${
                          isActive
                            ? 'bg-neutral-200 text-neutral-900 font-bold'
                            : 'bg-neutral-800 text-neutral-400'
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Audit Handover Standard Invariants */}
            <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3 text-neutral-300 font-mono text-xs uppercase tracking-wider font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Handover Package Standard</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Every Evalixa engagement delivers reproducible deliverables your engineering team can run directly in CI:
              </p>
              <ul className="space-y-2.5 text-xs text-neutral-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                  <span>Reviewer notes with cryptographic contributor IDs</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                  <span>Inter-rater agreement scores (Krippendorff α)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                  <span>Reproducible multi-turn replay test cases</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                  <span>Severity-ranked regression blockers for CI/CD</span>
                </li>
              </ul>
            </div>

            {/* Direct Scoping Callout */}
            <div className="bg-linear-to-b from-neutral-900/90 to-neutral-950 border border-neutral-800 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2 text-neutral-300 font-mono text-xs uppercase tracking-wider font-semibold">
                <Terminal className="w-3.5 h-3.5 text-neutral-400" />
                <span>Have a Model in Staging?</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Bring one high-risk workflow you are unsure about. We will scope an evaluation harness and identify masked vulnerabilities before launch.
              </p>
              <Link
                href="/contact?source=case-studies"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-xs uppercase tracking-wider font-medium border border-neutral-700 transition-colors"
              >
                <span>Scope Your Evaluation</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
              </Link>
            </div>
          </div>

          {/* Right Column: Case Studies Cards */}
          <div className="lg:col-span-8 space-y-12">
            {filteredStudies.map((study, idx) => (
              <div
                key={study.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm hover:border-neutral-700 transition-colors"
              >
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-5 border-b border-neutral-800/80">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-neutral-400 px-2.5 py-1 rounded bg-neutral-800">
                      CASE // {study.index}
                    </span>
                    <span className="font-mono text-xs text-neutral-400 tracking-wider uppercase">
                      {study.domain}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-white bg-neutral-800/80 px-3 py-1 rounded-full border border-neutral-700">
                    {study.categoryLabel}
                  </span>
                </div>

                {/* Client Context Eyebrow */}
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block mb-2">
                  Context: {study.clientContext}
                </span>

                {/* Headline */}
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight mb-4">
                  {study.headline}
                </h3>

                {/* Summary */}
                <p className="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed mb-8">
                  {study.summary}
                </p>

                {/* 3-Phase Progression (Problem -> Approach -> Outcome) */}
                <div className="space-y-4 mb-8">
                  {study.phases.map((phase) => {
                    const isProblem = phase.label === 'Problem';
                    const isApproach = phase.label === 'Approach';
                    const isOutcome = phase.label === 'Outcome';

                    const badgeColor = isProblem
                      ? 'text-amber-400 border-amber-500/30 bg-amber-500/10'
                      : isApproach
                      ? 'text-neutral-300 border-neutral-600 bg-neutral-800/80'
                      : 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';

                    return (
                      <div
                        key={phase.label}
                        className="p-5 rounded-xl bg-neutral-950/70 border border-neutral-850"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className={`font-mono text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${badgeColor}`}
                          >
                            {phase.label}
                          </span>
                          <span className="font-display font-semibold text-sm sm:text-base text-white">
                            {phase.title}
                          </span>
                        </div>
                        <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed pl-1">
                          {phase.text}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Impact Metrics Telemetry Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {study.metrics.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="bg-neutral-950 border border-neutral-800/80 rounded-xl p-4 text-center sm:text-left"
                    >
                      <div className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight mb-1">
                        {m.value}
                      </div>
                      <div className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Handover Deliverables */}
                <div className="pt-6 border-t border-neutral-800/80">
                  <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 block mb-3">
                    Deliverables Handed Over:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {study.deliverables.map((d, dIdx) => (
                      <span
                        key={dIdx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800/70 border border-neutral-700/60 font-mono text-xs text-neutral-300"
                      >
                        <CheckCircle2 className="w-3 h-3 text-neutral-400" />
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
