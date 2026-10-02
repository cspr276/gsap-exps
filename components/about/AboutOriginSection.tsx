'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Scale } from 'lucide-react';

interface ParadigmItem {
  id: string;
  pillar: string;
  legacyTitle: string;
  legacyDesc: string;
  evalixaTitle: string;
  evalixaDesc: string;
  metricLabel: string;
  metricValue: string;
  icon: React.ElementType;
}

const PARADIGM_ITEMS: ParadigmItem[] = [
  {
    id: '01',
    pillar: 'BENCHMARKING FOUNDATIONS',
    legacyTitle: 'Contaminated Academic Leaderboards',
    legacyDesc:
      'Static public datasets (MMLU, GSM8K) bear zero resemblance to enterprise APIs, tool schemas, or dynamic production state.',
    evalixaTitle: 'Task-Grounded Production Invariants',
    evalixaDesc:
      'Deterministic pass/fail test harnesses compiled directly from enterprise workflows, tool execution schemas, and historical edge cases.',
    metricLabel: 'FIDELITY',
    metricValue: '100% Invariant Coverage',
    icon: Cpu,
  },
  {
    id: '02',
    pillar: 'ADVERSARIAL SECURITY',
    legacyTitle: 'Single-Turn Prompt Filters',
    legacyDesc:
      'Surface-level regex and heuristic classifiers that instantly collapse when exposed to multi-turn context hijacking and tool privilege escalation.',
    evalixaTitle: 'Adaptive Multi-Horizon Red-Teaming',
    evalixaDesc:
      'Autonomous exploit chains and credentialed offensive researchers continuously stressing tool-call boundaries in isolated sandboxes.',
    metricLabel: 'CONTAINMENT',
    metricValue: 'Zero Exploit Escapes',
    icon: ShieldCheck,
  },
  {
    id: '03',
    pillar: 'CALIBRATED HUMAN OVERSIGHT',
    legacyTitle: 'Uncalibrated Crowdworkers & LLM Judges',
    legacyDesc:
      'Noisy, non-expert annotators and unverified LLM-as-a-judge pipelines that hallucinate rubrics and drift silently across model iterations.',
    evalixaTitle: 'Triple-Blind Domain Specialists',
    evalixaDesc:
      'Credentialed attorneys, clinicians, and financial analysts adjudicated with mathematical inter-rater agreement and cryptographic ledgers.',
    metricLabel: 'AGREEMENT',
    metricValue: 'Krippendorff α = 0.94',
    icon: Scale,
  },
];

export default function AboutOriginSection() {
  return (
    <section
      id="origin"
      className="relative z-20 w-full bg-white text-neutral-950 py-20 sm:py-28 border-b border-neutral-200 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-12 border-b border-neutral-200 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-sm bg-neutral-950 text-white uppercase tracking-widest">
                01 // ARCHITECTURAL MANIFESTO
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold">
                THE PARADIGM SHIFT
              </span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-neutral-950 tracking-tight leading-tight">
              From Subjective Vibes to Deterministic Proof.
            </h2>
          </motion.div>

          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-mono text-xs text-neutral-400 uppercase tracking-wider hidden sm:block shrink-0"
          >
            [CORE PRINCIPLES]
          </motion.span>
        </div>

        {/* Narrative Manifesto Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mb-16 sm:mb-20"
        >
          <p className="font-display font-medium text-xl sm:text-2xl lg:text-3xl text-neutral-800 leading-snug tracking-tight">
            Foundation models have evolved from passive text generators into autonomous agents capable of mutating databases, executing transactions, and governing critical operations.
            <span className="text-neutral-950 font-bold block mt-2">
              Autonomous systems demand deterministic, adversarial, and human-calibrated proof before they touch production.
            </span>
          </p>
        </motion.div>

        {/* 3 Clean Paradigm Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {PARADIGM_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group rounded-xl border border-neutral-200 bg-[#fafafa] hover:border-neutral-900 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-lg hover:shadow-neutral-950/5"
              >
                <div>
                  {/* Card Top */}
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-200">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-neutral-950 bg-neutral-200/80 px-2 py-0.5 rounded-sm">
                        #{item.id}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-600 font-semibold">
                        {item.pillar}
                      </span>
                    </div>
                    <Icon className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 transition-colors" />
                  </div>

                  {/* Legacy Default */}
                  <div className="mb-5 p-4 rounded-md bg-neutral-100/90 border border-neutral-200/70">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">
                        LEGACY DEFAULT // DEPRECATED
                      </span>
                      <span className="font-mono text-[10px] text-neutral-400">FLAW</span>
                    </div>
                    <h3 className="font-display font-bold text-sm text-neutral-600 line-through decoration-neutral-400 mb-1">
                      {item.legacyTitle}
                    </h3>
                    <p className="font-sans text-xs text-neutral-500 leading-relaxed font-normal">
                      {item.legacyDesc}
                    </p>
                  </div>

                  {/* The Evalixa Standard */}
                  <div className="p-4 rounded-md bg-white border border-neutral-900 shadow-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-950 font-bold">
                        THE EVALIXA STANDARD // ACTIVE
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 animate-pulse" />
                    </div>
                    <h3 className="font-display font-bold text-base text-neutral-950 mb-1.5">
                      {item.evalixaTitle}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                      {item.evalixaDesc}
                    </p>
                  </div>
                </div>

                {/* Footer Metric */}
                <div className="mt-6 pt-4 border-t border-neutral-200 flex items-center justify-between font-mono text-[11px]">
                  <span className="text-neutral-500 uppercase tracking-wider">
                    {item.metricLabel}
                  </span>
                  <span className="font-bold text-neutral-950 bg-white px-2.5 py-1 rounded-sm border border-neutral-300 shadow-xs">
                    {item.metricValue}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
