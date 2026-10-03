'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Grainient = dynamic(() => import('@/components/Grainient'), { ssr: false });

interface DimensionItem {
  category: string;
  name: string;
  summary: string;
  decidingFactor: string;
  criteria: string[];
}

const DIMENSIONS: DimensionItem[] = [
  {
    category: '01 / TRIAGE & ROUTING ARCHITECTURE',
    name: 'Deterministic Ingress & Intent Routing',
    summary: 'High-volume request classification, context enrichment from read-only datastores, and routing to specialized teams or automated pipelines.',
    decidingFactor: 'Mistakes are cheap and immediately visible to the downstream human in the chain.',
    criteria: [
      'Sub-millisecond intent and schema classification',
      'Bounded read-only context enrichment across internal datastores',
      'Automatic escalation triggers for ambiguous or low-confidence intents',
      'Zero destructive mutation privileges granted at ingress',
    ],
  },
  {
    category: '02 / HUMAN-IN-THE-LOOP DRAFTING',
    name: 'Co-Pilot Workflows & Suggestion Engines',
    summary: 'Composing customer responses, contract redlines, and technical summaries where domain specialists review and authorize every artifact.',
    decidingFactor: 'A person is already in the loop, so the failure mode is review friction, not systemic damage.',
    criteria: [
      'Context-grounded draft synthesis with transparent citations',
      'Direct integration into existing employee approval queues',
      'Continuous style and compliance policy conformance',
      'Complete quarantine preventing unattended external transmission',
    ],
  },
  {
    category: '03 / ASYNCHRONOUS RESEARCH & EXTRACTION',
    name: 'Deep Long-Horizon Knowledge Synthesis',
    summary: 'Ingesting unstructured documentation corpora, cross-referencing multi-system ERP data, and producing verifiable intelligence reports.',
    decidingFactor: 'High latency tolerance allows rigorous multi-step verification and provenance preservation.',
    criteria: [
      'Multi-hop cross-referencing across structured and unstructured records',
      'Cryptographic provenance tracking preserved down to chunk level',
      'Isolated sandboxed retrieval preventing indirect prompt injection',
      'Provable citations tied directly to immutable source hashes',
    ],
  },
  {
    category: '04 / TRANSACTIONAL & IRREVERSIBLE GATING',
    name: 'Governed System-of-Record Mutations',
    summary: 'Automating high-impact operational workflows that mutate ledgers, initiate payouts, or update production configurations under strict circuit breakers.',
    decidingFactor: 'Actions cannot be recalled; mandatory confirmation gates, spend ceilings, and idempotency are mandatory.',
    criteria: [
      'Mandatory two-man rule and cryptographic confirmation gates',
      'Strict idempotency keys preventing duplicate execution on retry',
      'Hard spending ceilings and anomalous rate-limit circuit breakers',
      'Immutable audit records written synchronously prior to state changes',
    ],
  },
];

function DimensionCard({ dim, idx }: { dim: DimensionItem; idx: number }) {
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

export default function EnterpriseTaxonomySection() {
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
            DEPLOYMENT TAXONOMY
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-4">
            Four Enterprise Autonomy Tiers.
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-400 leading-relaxed font-normal">
            Every agent archetype operates within strict authority boundaries. We deploy tiered patterns spanning triage routing, co-pilot drafting, deep research, and transaction gates.
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
