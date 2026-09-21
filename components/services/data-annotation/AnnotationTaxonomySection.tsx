'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

const Grainient = dynamic(() => import('@/components/Grainient'), { ssr: false });

interface DimensionItem {
  category: string;
  name: string;
  summary: string;
  bestStructure: string;
  grainientColors: { color1: string; color2: string; color3: string };
  criteria: string[];
}

const DIMENSIONS: DimensionItem[] = [
  {
    category: '01 / OBJECTIVE CATEGORIZATION & SCHEMA TAGGING',
    name: 'Deterministic Schema & Entity Tagging',
    summary:
      'Extracting entities, validating structured schemas, and taxonomic indexing where ground truth is verifiable against objective constraints.',
    bestStructure: 'Single Pass + Audit Sample',
    grainientColors: { color1: '#142542', color2: '#233d6b', color3: '#365d9c' },
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
    grainientColors: { color1: '#123829', color2: '#1c543e', color3: '#2a7d5c' },
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
    grainientColors: { color1: '#3d2c14', color2: '#5c431e', color3: '#87622c' },
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
    grainientColors: { color1: '#3d1633', color2: '#5c224e', color3: '#873173' },
    criteria: [
      'Adversarial jailbreak and indirect prompt injection edge cases',
      'Regulatory policy compliance and PII leakage boundary sets',
      'Zero-tolerance consensus validation with dual senior sign-off',
      'Cryptographic data lineage and immutable audit documentation',
    ],
  },
];

function DimensionCard({ dim, idx }: { dim: DimensionItem; idx: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative p-8 rounded-md bg-neutral-900/40 border border-neutral-800 hover:border-neutral-600 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-sm hover:shadow-xl hover:shadow-black/50"
    >
      {/* Ambient dynamic fluid Grainient on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
          >
            <Grainient
              color1={dim.grainientColors.color1}
              color2={dim.grainientColors.color2}
              color3={dim.grainientColors.color3}
              timeSpeed={0.2}
              warpStrength={0.5}
              grainAmount={0.06}
              contrast={1.15}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/65 via-transparent to-neutral-950/40 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card Header Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-neutral-800 group-hover:border-neutral-700 transition-colors">
          <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 group-hover:text-neutral-300 transition-colors font-semibold">
            {dim.category}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 group-hover:text-neutral-400 transition-colors font-medium border border-neutral-800 px-2 py-0.5 rounded-sm">
            {dim.bestStructure}
          </span>
        </div>

        <h3 className="font-display font-bold text-xl text-white mb-2">
          {dim.name}
        </h3>
        <p className="font-sans text-sm text-neutral-300 mb-6 leading-relaxed">
          {dim.summary}
        </p>
      </div>

      {/* Criteria list with clean rectangular layout - NO circular indicator dots */}
      <div className="relative z-10 space-y-2.5 pt-4 border-t border-neutral-800 group-hover:border-neutral-700 transition-colors">
        {dim.criteria.map((item) => (
          <div
            key={item}
            className="border-l-2 border-neutral-800 group-hover:border-neutral-600 transition-colors pl-3 py-0.5 text-xs text-neutral-300 font-sans"
          >
            <span className="font-medium">{item}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function AnnotationTaxonomySection() {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#09090b] text-white border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-3">
            METHODOLOGY TAXONOMY
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-4">
            Matching Annotation Structure to Human Judgement.
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-400 leading-relaxed font-normal">
            Annotation is not one uniform activity. The pipeline architecture must reflect what you are asking human specialists to decide.
          </p>
        </div>

        {/* 4 Dimension cards with clean rectangular borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DIMENSIONS.map((dim, idx) => (
            <DimensionCard key={dim.name} dim={dim} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
