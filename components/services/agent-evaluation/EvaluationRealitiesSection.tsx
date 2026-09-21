'use client';

import React from 'react';
import { motion } from 'framer-motion';

const REALITIES = [
  {
    num: '01',
    tag: 'COMPOUND ERROR RISK',
    title: 'Single-Turn Tests Hide Compound Failure Drift',
    description:
      'Standard benchmarks measure one input in isolation. Production agents execute 6 to 14 sequential tool steps. A 95% single-step accuracy degrades exponentially to roughly 66% reliability across an 8-turn enterprise pipeline.',
    stat: '0.95⁸ ≈ 66%',
    statLabel: 'Multi-turn degradation baseline',
  },
  {
    num: '02',
    tag: 'SYNTHETIC BIAS',
    title: 'Public Leaderboards Miss Enterprise Schemas',
    description:
      'Public evaluations rank models on generic trivia and synthetic coding challenges. They completely overlook proprietary business schemas, asynchronous state machines, and multi-tenant authorization boundaries.',
    stat: '0% Domain Fit',
    statLabel: 'Public score to workflow correlation',
  },
  {
    num: '03',
    tag: 'MEASUREMENT INTEGRITY',
    title: 'Uncalibrated Model Judges Hallucinate Consensus',
    description:
      'Automated LLM-as-a-judge pipelines suffer from severe verbosity bias, position bias, and self-preference drift. Without calibrated human ground truth, evaluation scores become an arbitrary black box.',
    stat: '38% Variance',
    statLabel: 'Uncalibrated automated judge drift',
  },
];

export default function EvaluationRealitiesSection() {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#09090b] border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-3">
            THE EVALUATION GAP
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            Why Standard AI Benchmarks Fail Production Workflows.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {REALITIES.map((item, idx) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 hover:border-neutral-700/80 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-800/80">
                  <span className="font-mono text-xl font-bold text-neutral-500 group-hover:text-white transition-colors">
                    {item.num}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 font-semibold px-2 py-1 rounded bg-neutral-800/60 border border-neutral-700/60">
                    {item.tag}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-white tracking-tight mb-4 leading-snug">
                  {item.title}
                </h3>

                <p className="font-sans text-sm text-neutral-400 leading-relaxed font-normal mb-8">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-800/60">
                <span className="font-mono text-2xl font-bold text-white block mb-1">
                  {item.stat}
                </span>
                <span className="font-mono text-[11px] text-neutral-500 uppercase tracking-wider">
                  {item.statLabel}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
