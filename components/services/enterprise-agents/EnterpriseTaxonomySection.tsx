'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

const Grainient = dynamic(() => import('@/components/Grainient'), { ssr: false });

interface DimensionItem {
  category: string;
  name: string;
  summary: string;
  decidingFactor: string;
  grainientColors: { color1: string; color2: string; color3: string };
  criteria: string[];
}

const DIMENSIONS: DimensionItem[] = [
  {
    category: '01 / TRIAGE & ROUTING ARCHITECTURE',
    name: 'Deterministic Ingress & Intent Routing',
    summary: 'High-volume request classification, context enrichment from read-only datastores, and routing to specialized teams or automated pipelines.',
    decidingFactor: 'Mistakes are cheap and immediately visible to the downstream human in the chain.',
    grainientColors: { color1: '#142542', color2: '#233d6b', color3: '#365d9c' },
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
    grainientColors: { color1: '#123829', color2: '#1c543e', color3: '#2a7d5c' },
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
    grainientColors: { color1: '#3d1633', color2: '#5c224e', color3: '#873173' },
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
    grainientColors: { color1: '#3d2c14', color2: '#5c431e', color3: '#87622c' },
    criteria: [
      'Mandatory two-man rule and cryptographic confirmation gates',
      'Strict idempotency keys preventing duplicate execution on retry',
      'Hard spending ceilings and anomalous rate-limit circuit breakers',
      'Immutable audit records written synchronously prior to state changes',
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
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-neutral-950/40 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-neutral-800 group-hover:border-neutral-700 transition-colors">
          <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 group-hover:text-neutral-300 transition-colors font-semibold">
            {dim.category}
          </span>
        </div>

        <h3 className="font-display font-bold text-xl text-white mb-2">
          {dim.name}
        </h3>
        <p className="font-sans text-sm text-neutral-300 mb-4 leading-relaxed font-normal">
          {dim.summary}
        </p>

        <div className="p-3 rounded-md bg-neutral-950/60 border border-neutral-800/80 mb-6">
          <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block mb-1">
            DECIDING FACTOR
          </span>
          <span className="font-sans text-xs text-neutral-300 font-normal">
            {dim.decidingFactor}
          </span>
        </div>
      </div>

      {/* Criteria list with clean rectangular bar indicator (NO circular dots) */}
      <div className="relative z-10 space-y-2.5 pt-4 border-t border-neutral-800 group-hover:border-neutral-700 transition-colors">
        {dim.criteria.map((item) => (
          <div key={item} className="flex items-start gap-3 text-xs text-neutral-300 font-sans">
            <span className="w-2.5 h-0.5 bg-neutral-600 group-hover:bg-neutral-400 mt-2 shrink-0 transition-colors rounded-none" />
            <span className="font-medium leading-relaxed">{item}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function EnterpriseTaxonomySection() {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#09090b] text-white border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-3">
            AGENT ARCHITECTURAL TAXONOMY
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-4">
            4 Core Architectures. Engineered for Enterprise Fit.
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-400 leading-relaxed font-normal">
            Honest scoping saves millions. We design agent autonomy around workflow risk, reversibility, and verified human oversight.
          </p>
        </div>

        {/* Crisp cards with rectangular borders (rounded-md) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DIMENSIONS.map((dim, idx) => (
            <DimensionCard key={dim.name} dim={dim} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
