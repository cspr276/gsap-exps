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
    category: '01 / COGNITIVE INTEGRITY',
    name: 'Reasoning & Faithfulness',
    summary: 'Testing step-by-step logic consistency, premise compliance, and hallucination emergence.',
    grainientColors: { color1: '#09090b', color2: '#18181b', color3: '#272932' },
    criteria: [
      'Multi-hop deduction validation',
      'Premise adherence without hallucinations',
      'Mathematical and logical consistency checks',
      'Contradiction detection across extended dialogs',
    ],
  },
  {
    category: '02 / AGENTIC EXECUTION',
    name: 'Tool & Schema Execution',
    summary: 'Evaluating parameter accuracy, schema adherence, error recovery, and environmental safety.',
    grainientColors: { color1: '#0b0c0e', color2: '#191b20', color3: '#2d303a' },
    criteria: [
      'JSON schema and parameter constraint precision',
      'Graceful error recovery on API 4xx/5xx responses',
      'State mutation verification in mock environments',
      'Idempotency and rate-limit compliance',
    ],
  },
  {
    category: '03 / SYSTEM DEFENSE',
    name: 'Security & Boundary Defense',
    summary: 'Stress-testing agent resilience against adversarial inputs, prompt injection, and data leaks.',
    grainientColors: { color1: '#0d0e11', color2: '#1b1d24', color3: '#313540' },
    criteria: [
      'Direct and indirect prompt injection resistance',
      'Jailbreak mitigation across multi-turn context',
      'Unauthorized data exfiltration prevention',
      'System prompt extraction defense',
    ],
  },
  {
    category: '04 / PRODUCTION OPERATION',
    name: 'Operational Resilience',
    summary: 'Measuring latency budgets, context degradation over long horizons, and token costs.',
    grainientColors: { color1: '#101114', color2: '#1e2027', color3: '#353945' },
    criteria: [
      'Sub-second latency budget conformance',
      'Performance stability across 128k+ token horizons',
      'Token consumption efficiency per completed task',
      'Graceful degradation under degraded network conditions',
    ],
  },
];

function DimensionCard({ dim, idx }: { dim: (typeof DIMENSIONS)[number]; idx: number }) {
  return (
    <div
      className="taxonomy-card relative p-8 rounded-md bg-neutral-900/60 border border-neutral-800 hover:border-neutral-600 transition-colors duration-300 flex flex-col justify-between overflow-hidden group shadow-sm hover:shadow-2xl hover:shadow-black/60 will-change-transform"
    >
      {/* Dynamic monochromatic fluid Grainient as permanent card background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-75 group-hover:opacity-100 transition-opacity duration-500">
        <Grainient
          color1={dim.grainientColors.color1}
          color2={dim.grainientColors.color2}
          color3={dim.grainientColors.color3}
          timeSpeed={0.2}
          warpStrength={0.45}
          grainAmount={0.06}
          contrast={1.15}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/45 to-neutral-950/65 pointer-events-none" />
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

export default function EvaluationTaxonomySection() {
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
                start: 'top bottom+=60px', // Starts early as card enters viewport
                end: 'top 48%',           // Extended travel range for continuous fluid feel
                scrub: 1,
              },
            }
          );
        });
      });

      mm.add('(max-width: 767px)', () => {
        // Mobile: smooth natural fade/slide up starting early
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
            EVALUATION DIMENSIONS
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-4">
            50+ Dimensions. 4 Rigorous Core Pillars.
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-400 leading-relaxed font-normal">
            Every evaluation assesses the complete agent lifecycle across cognitive, agentic, security, and operational criteria.
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
