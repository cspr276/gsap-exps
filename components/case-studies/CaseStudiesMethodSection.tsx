'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { AlertCircle, Scale, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PRINCIPLES = [
  {
    step: '01',
    phase: 'Problem Isolation',
    icon: AlertCircle,
    title: 'Masked Failure Modes',
    desc: 'Off-the-shelf single LLM judges and aggregate vibe metrics mask catastrophic edge-case failures. We isolate the exact operational boundary conditions where models fail.',
    metric: 'Zero hidden variance',
  },
  {
    step: '02',
    phase: 'Targeted Engineering',
    icon: Scale,
    title: 'Task-Grounded Rubrics',
    desc: 'We replace subjective scores with task-grounded criteria evaluated by credentialed domain specialists, enforcing statistically proven inter-rater agreement before any score is certified.',
    metric: '> 0.90 Krippendorff Alpha',
  },
  {
    step: '03',
    phase: 'Auditable Handover',
    icon: ShieldCheck,
    title: 'Reproducible CI Baselines',
    desc: 'Findings are severity-ranked with reproducible cryptographic execution traces. We deliver pre-merge regression harnesses directly into your engineering pipeline.',
    metric: '100% Deterministic Replay',
  },
];

export default function CaseStudiesMethodSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = cardsRef.current;
      if (!cards) return;

      gsap.fromTo(
        cards.children,
        { y: 35, opacity: 0.1 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'none',
          scrollTrigger: {
            trigger: cards,
            start: 'top 88%',
            end: 'top 52%',
            scrub: 1,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative z-20 bg-[#fbfbfb] text-neutral-900 border-b border-neutral-300 py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-neutral-900" />
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-600 font-semibold">
              Evaluation Methodology // Verification Invariants
            </span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-neutral-950 tracking-tight leading-[1.12] mb-6">
            Traceable evidence, not marketing post-mortems.
          </h2>

          <p className="font-sans text-base sm:text-lg text-neutral-600 leading-relaxed">
            Each study follows the exact same verification structure: the failure mode the engineering team brought us, the evaluation approach we engineered, and the auditable outcome that changed as a result. Figures are reproduced directly from evaluation traces we hand over—never from speculative estimations.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {PRINCIPLES.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.step}
                className="bg-white border border-neutral-200/90 rounded-xl p-8 flex flex-col justify-between shadow-xs hover:border-neutral-400 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold text-neutral-400 tracking-wider">
                      {p.step} // {p.phase}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-800">
                      <Icon className="w-4 h-4 stroke-[2]" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-xl text-neutral-950 tracking-tight mb-3">
                    {p.title}
                  </h3>

                  <p className="font-sans text-sm text-neutral-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-6 mt-8 border-t border-neutral-100 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider">
                    Invariant
                  </span>
                  <span className="font-mono text-xs font-semibold text-neutral-900 bg-neutral-100 px-2.5 py-1 rounded">
                    {p.metric}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
