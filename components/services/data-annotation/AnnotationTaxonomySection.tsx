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
  bestStructure: string;
  criteria: string[];
}

const DIMENSIONS: DimensionItem[] = [
  {
    category: '01 / OBJECTIVE CATEGORIZATION & SCHEMA TAGGING',
    name: 'Deterministic Schema & Entity Tagging',
    summary:
      'Extracting entities, validating structured schemas, and taxonomic indexing where ground truth is verifiable against objective constraints.',
    bestStructure: 'Single Pass + Audit Sample',
    criteria: [
      'Multi-label entity extraction and bounding span verification',
      'Complex JSON schema and relational database attribute typing',
      'Automated pre-filtering of corrupt and duplicate payloads',
      'Statistically sampled single-pass audits for precision verification',
    ],
  },
  {
    category: '02 / SUBJECTIVE QUALITY & PAIRWISE PREFERENCE',
    name: 'Pairwise Preference & Comparative Alignment',
    summary:
      'Side-by-side preference ranking for RLHF and DPO. Eliminates subjective scoring drift and captures fine-grained nuances in model reasoning.',
    bestStructure: 'Pairwise Comparison',
    criteria: [
      'Side-by-side model response preference judgements (A vs B)',
      'Multi-criteria quality rubrics (grounding, conciseness, tone)',
      'Granular rationale logging explaining annotator preference choices',
      'Elimination of intra-session and inter-rater scale compression drift',
    ],
  },
  {
    category: '03 / MULTI-REVIEW & ADJUDICATED CONSENSUS',
    name: 'Multi-Expert Review & Dispute Adjudication',
    summary:
      'Independent multi-pass review with senior domain arbitration for ambiguous domains where genuine expert disagreement surfaces rubric gaps.',
    bestStructure: 'Multi-Review + Adjudication',
    criteria: [
      'Triple-blind review across domain-matched specialists',
      'Continuous Cohen\'s κ and Krippendorff\'s α concordance tracking',
      'Automated escalation routing for contested item adjudication',
      'Senior specialist arbitration panels with codified decision logs',
    ],
  },
  {
    category: '04 / SAFETY & BOUNDARY GOLD STANDARDS',
    name: 'Safety Boundaries & High-Assurance Gold Sets',
    summary:
      'Curating authoritative benchmark datasets for safety filters, policy constraints, and red-team boundaries where false positives carry high liability.',
    bestStructure: 'Consensus + Senior Sign-Off',
    criteria: [
      'Adversarial jailbreak and indirect prompt injection edge cases',
      'Regulatory policy compliance and PII leakage boundary sets',
      'Zero-tolerance consensus validation with dual senior sign-off',
      'Cryptographic data lineage and immutable audit documentation',
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

export default function AnnotationTaxonomySection() {
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
            ANNOTATION TAXONOMY
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-4">
            Four Calibrated Review Structures.
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-400 leading-relaxed font-normal">
            Different data types demand different review topologies. We architect tailored human pipelines spanning deterministic tagging, pairwise preference, and multi-pass adjudication.
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
