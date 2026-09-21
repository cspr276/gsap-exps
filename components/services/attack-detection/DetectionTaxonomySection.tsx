'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

const Grainient = dynamic(() => import('@/components/Grainient'), { ssr: false });

const DIMENSIONS = [
  {
    category: '01 / RATE & VOLUMETRIC ABUSE DEFENSE',
    name: 'Volumetric & DoS Controls',
    summary: 'Preventing denial-of-wallet, token-exhaustion vectors, and distributed agent-loop amplification attacks.',
    grainientColors: { color1: '#123829', color2: '#1c543e', color3: '#2a7d5c' },
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
    grainientColors: { color1: '#142542', color2: '#233d6b', color3: '#365d9c' },
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
    grainientColors: { color1: '#3d1633', color2: '#5c224e', color3: '#873173' },
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
    grainientColors: { color1: '#3d2c14', color2: '#5c431e', color3: '#87622c' },
    criteria: [
      'Out-of-band deep LLM judge adjudication',
      'False-positive rate monitoring by attack class',
      'Automated dataset curation for model distillation',
      'Zero-latency regression regression canarying',
    ],
  },
];

function DimensionCard({ dim, idx }: { dim: (typeof DIMENSIONS)[number]; idx: number }) {
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
        <p className="font-sans text-sm text-neutral-300 mb-6 leading-relaxed font-normal">
          {dim.summary}
        </p>
      </div>

      <div className="relative z-10 space-y-2.5 pt-4 border-t border-neutral-800 group-hover:border-neutral-700 transition-colors">
        {dim.criteria.map((item, itemIdx) => (
          <div key={item} className="flex items-start gap-2.5 text-xs text-neutral-300 font-sans">
            <span className="font-mono text-[10px] text-neutral-500 group-hover:text-neutral-400 select-none pt-0.5 shrink-0">
              0{itemIdx + 1}
            </span>
            <span className="font-medium">{item}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function DetectionTaxonomySection() {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#09090b] text-white border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-3">
            DEFENSE TAXONOMY
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-4">
            4 Coordinated Defense Dimensions.
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-400 leading-relaxed font-normal">
            Every attack class requires a dedicated defensive mechanism sized to its specific latency and precision envelope.
          </p>
        </div>

        {/* Crisp rectangular cards (rounded-md) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DIMENSIONS.map((dim, idx) => (
            <DimensionCard key={dim.name} dim={dim} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
