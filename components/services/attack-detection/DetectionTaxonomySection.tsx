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
    category: '01 / RATE & VOLUMETRIC ABUSE DEFENSE',
    name: 'Volumetric & DoS Controls',
    summary: 'Preventing denial-of-wallet, token-exhaustion vectors, and distributed agent-loop amplification attacks.',
    criteria: [
      'Sliding-window token & spend quotas',
      'Automated recursive loop detection',
      'IP & tenant behavioral reputation scoring',
      'Circuit breaker tripped on budget bursts',
    ],
  },
  {
    category: '02 / DIRECT & INDIRECT INJECTION GUARDS',
    name: 'Injection & Jailbreak Mitigation',
    summary: 'Detecting adversarial prompts across user input and multi-turn indirect retrieval context.',
    criteria: [
      'Multi-vector prompt injection classifiers',
      'RAG & untrusted context taint analysis',
      'Adversarial suffix & token perturbation shields',
      'System prompt extraction prevention',
    ],
  },
  {
    category: '03 / EGRESS & OUTBOUND EXFILTRATION CONTROLS',
    name: 'Perimeter & Data Egress Allowlisting',
    summary: 'Enforcing strict boundary authorization for external network calls, file systems, and tools.',
    criteria: [
      'Strict domain & API route allowlists',
      'Sensitive data (PII/Secret) exfiltration masking',
      'High-impact tool execution gate (human-in-the-loop)',
      'Cryptographic payload provenance attestation',
    ],
  },
  {
    category: '04 / ASYNC ADJUDICATION & THRESHOLD TUNING',
    name: 'Continuous Drift & Threshold Calibration',
    summary: 'Tuning classification thresholds against your traffic distributions without adding user latency.',
    criteria: [
      'Out-of-band deep LLM judge adjudication',
      'False-positive rate monitoring by attack class',
      'Automated dataset curation for model distillation',
      'Zero-latency regression regression canarying',
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

export default function DetectionTaxonomySection() {
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
            DEFENSE-IN-DEPTH TAXONOMY
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-4">
            Four Calibrated Rings of Defense.
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-400 leading-relaxed font-normal">
            No single guardrail stops every vector. We deploy defense-in-depth across transport, input structure, inference classifiers, and async validation.
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
