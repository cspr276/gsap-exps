'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

const Grainient = dynamic(() => import('@/components/Grainient'), { ssr: false });

interface Dimension {
  category: string;
  name: string;
  summary: string;
  grainientColors: { color1: string; color2: string; color3: string };
  criteria: string[];
}

const DIMENSIONS: Dimension[] = [
  {
    category: '01 / LATENCY & INFRASTRUCTURE TELEMETRY',
    name: 'System Health & Throughput',
    summary:
      'Tracking cold-start latency, token generation velocity, time-to-first-token (TTFT), and upstream API rate caps.',
    grainientColors: { color1: '#142542', color2: '#233d6b', color3: '#365d9c' },
    criteria: [
      'P95 / P99 time-to-first-token (TTFT)',
      'Per-token generation velocity across providers',
      'Upstream error rate and exponential backoff telemetry',
      'Token budget consumption and cost per completed flow',
    ],
  },
  {
    category: '02 / REASONING & OUTPUT ACCURACY DRIFT',
    name: 'Semantic Fidelity & Output Drift',
    summary:
      'Detecting semantic drift, output format schema violations, hallucination emergence, and answer distribution shifts.',
    grainientColors: { color1: '#123829', color2: '#1c543e', color3: '#2a7d5c' },
    criteria: [
      'Distributional shifts in output token length and vocabulary',
      'Groundedness and factual hallucination rates',
      'JSON schema and tool argument formatting compliance',
      'Tone, safety boundary, and policy alignment stability',
    ],
  },
  {
    category: '03 / CONTEXT & RETRIEVAL PROVENANCE',
    name: 'RAG & Document Provenance',
    summary:
      'Monitoring retrieval relevance, document freshness, untrusted source tagging, and context stuffing degradations.',
    grainientColors: { color1: '#3d1633', color2: '#5c224e', color3: '#873173' },
    criteria: [
      'Embedding distance and retrieval recall across index builds',
      'Untrusted context tagging (prompt injection isolation)',
      'Document chunk freshness and staleness alerts',
      'Context window compression degradation over multi-turn sessions',
    ],
  },
  {
    category: '04 / HUMAN INTERVENTION & FALLBACK METRICS',
    name: 'Intervention & Implicit Feedback',
    summary:
      'Quantifying human handoff velocity, supervisor overrides, session abandonment, and rapid user query reformulations.',
    grainientColors: { color1: '#3d2c14', color2: '#5c431e', color3: '#87622c' },
    criteria: [
      'Human operator escalation rate and intervention reasons',
      'Immediate query rephrasing and rage-click behaviors',
      'Task completion rate vs drop-off turn depth',
      'Supervisor corrective edits and downstream feedback loops',
    ],
  },
];

function DimensionCard({ dim, idx }: { dim: Dimension; idx: number }) {
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
        <p className="font-sans text-sm text-neutral-300 mb-6 leading-relaxed">
          {dim.summary}
        </p>
      </div>

      <div className="relative z-10 space-y-2.5 pt-4 border-t border-neutral-800 group-hover:border-neutral-700 transition-colors">
        {dim.criteria.map((item) => (
          <div key={item} className="flex items-start gap-2.5 text-xs text-neutral-300 font-sans">
            <span className="font-mono text-neutral-500 group-hover:text-neutral-400 transition-colors shrink-0 select-none">
              —
            </span>
            <span className="font-medium">{item}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function MonitoringTaxonomySection() {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#09090b] text-white border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-3">
            MONITORING TAXONOMY
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-4">
            4 Core Dimensions. Complete Observability.
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-400 leading-relaxed font-normal">
            True production quality signals span infrastructure health, output correctness, retrieval provenance, and human intervention.
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
