'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Grainient = dynamic(() => import('@/components/Grainient'), { ssr: false });

const DIMENSIONS = [
  {
    category: '01 / OUTPUT SCHEMA & STRUCTURAL PRECISION',
    name: 'Schema Adherence & Contract Precision',
    summary: 'Enforcing strict structural formatting, deterministic JSON keys, and zero syntax deviation under extreme token loads.',
    criteria: [
      'Deterministic JSON schema constraint enforcement',
      'Elimination of unsolicited conversational preamble',
      'Nested parameter and type invariant adherence',
      'Explicit flag emission for unstated source attributes',
    ],
  },
  {
    category: '02 / DOMAIN TONE & CONVENTION CONFORMANCE',
    name: 'Domain Tone & House Conventions',
    summary: 'Embedding specialized institutional vocabulary, conciseness invariants, and compliance phrasing directly into model weights.',
    criteria: [
      'Institutional vernacular and notation alignment',
      'Brevity and conciseness enforcement under context pressure',
      'Elimination of repetitive assistant apologetic fluff',
      'Consistent clinical and financial convention compliance',
    ],
  },
  {
    category: '03 / SUBJECTIVE REASONING & PREFERENCE ALIGNMENT',
    name: 'Subjective Reasoning & Preference Alignment',
    summary: 'Aligning nuanced judgment where multiple plausible answers exist through pairwise preference modeling and expert adjudication.',
    criteria: [
      'Calibrated expert preference margins (Krippendorff α > 0.88)',
      'Complex multi-stakeholder trade-off resolution',
      'Grounded multi-turn reasoning consistency',
      'Adjudicated dispute telemetry integration',
    ],
  },
  {
    category: '04 / BOUNDARY DEFENSE & REFUSAL CALIBRATION',
    name: 'Boundary Defense & Refusal Calibration',
    summary: 'Calibrating explicit refusal boundaries for out-of-domain asks without triggering defensive false-positive refusals on benign inputs.',
    criteria: [
      'False-refusal rate minimization on benign queries',
      'Adversarial prompt boundary resilience',
      'Explicit ungrounded premise rejection',
      'Graceful degradation on out-of-distribution inputs',
    ],
  },
];

function DimensionCard({ dim, idx }: { dim: (typeof DIMENSIONS)[number]; idx: number }) {
  return (
    <div
      className="taxonomy-card relative p-8 rounded-md bg-neutral-950/40 border border-neutral-800 hover:border-neutral-600 transition-colors duration-300 flex flex-col justify-between overflow-hidden group shadow-sm hover:shadow-2xl hover:shadow-black/60 will-change-transform"
    >
      {/* High-visibility pure monochromatic B&W fluid Grainient background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-90 group-hover:opacity-100 transition-opacity duration-500">
        <Grainient
          color1="#000000"
          color2="#303030"
          color3="#808080"
          saturation={0}
          timeSpeed={0.2}
          warpStrength={0.55}
          grainAmount={0.065}
          contrast={1.35}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/90 via-[#09090b]/35 to-[#09090b]/55 pointer-events-none" />
      </div>

      {/* Card Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-neutral-800 group-hover:border-neutral-700 transition-colors">
          <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 group-hover:text-neutral-200 transition-colors font-semibold">
            {dim.category}
          </span>
          <span className="font-mono text-xs text-neutral-500 group-hover:text-neutral-400">
            0{idx + 1}
          </span>
        </div>

        <h3 className="font-display font-bold text-xl text-white mb-2">
          {dim.name}
        </h3>
        <p className="font-sans text-sm text-neutral-300 mb-6 leading-relaxed">
          {dim.summary}
        </p>
      </div>

      <div className="relative z-10 space-y-2.5 pt-4 transition-colors">
        {dim.criteria.map((item) => (
          <div key={item} className="flex items-start gap-2.5 text-xs text-neutral-300 font-sans">
            <span className="text-neutral-500 font-mono text-[11px] select-none pt-0.5 shrink-0">—</span>
            <span className="font-medium">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SftTaxonomySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;

      const cards = gsap.utils.toArray<HTMLElement>('.taxonomy-card');
      if (!cards.length) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        // Desktop / tablet: Left cards slide from left, right cards slide from right with to-and-fro scroll scrub
        cards.forEach((card, idx) => {
          const isLeft = idx % 2 === 0;
          gsap.fromTo(
            card,
            {
              x: isLeft ? -110 : 110,
              opacity: 0.1,
            },
            {
              x: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom+=60px',
                end: 'top 48%',
                scrub: 1,
              },
            }
          );
        });
      });

      mm.add('(max-width: 767px)', () => {
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 40, opacity: 0.15 },
            {
              y: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom+=40px',
                end: 'top 55%',
                scrub: 0.8,
              },
            }
          );
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 bg-[#09090b] text-white border-t border-neutral-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-3">
            ADAPTATION TAXONOMY
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-4">
            Four Dimensions of Specialized Adaptation.
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-400 leading-relaxed font-normal">
            We target post-training adjustments surgically across output structure, institutional conventions, preference optimization, and boundary guardrails.
          </p>
        </div>

        {/* 2-column grid with to-and-fro lateral scroll scrub */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DIMENSIONS.map((dim, idx) => (
            <DimensionCard key={dim.name} dim={dim} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
