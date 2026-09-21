'use client';

import React from 'react';
import { motion } from 'framer-motion';

const REALITIES = [
  {
    id: 'compound-drift',
    title: 'Single-Turn Tests Hide Compound Failure Drift',
    description:
      'Standard benchmarks measure one input in isolation. Production agents execute 6 to 14 sequential tool steps. A 95% single-step accuracy degrades exponentially to roughly 66% reliability across an 8-turn enterprise pipeline.',
    stat: '0.95⁸ ≈ 66%',
    statLabel: 'Multi-turn degradation baseline',
  },
  {
    id: 'synthetic-bias',
    title: 'Public Leaderboards Miss Enterprise Schemas',
    description:
      'Public evaluations rank models on generic trivia and synthetic coding challenges. They completely overlook proprietary business schemas, asynchronous state machines, and multi-tenant authorization boundaries.',
    stat: '0% Domain Fit',
    statLabel: 'Public score to workflow correlation',
  },
  {
    id: 'measurement-integrity',
    title: 'Uncalibrated Model Judges Hallucinate Consensus',
    description:
      'Automated LLM-as-a-judge pipelines suffer from severe verbosity bias, position bias, and self-preference drift. Without calibrated human ground truth, evaluation scores become an arbitrary black box.',
    stat: '38% Variance',
    statLabel: 'Uncalibrated automated judge drift',
  },
];

export default function EvaluationRealitiesSection() {
  return (
    <section className="relative w-full py-20 sm:py-28 bg-[#09090b] border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-2.5">
            THE EVALUATION GAP
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
            Why Standard AI Benchmarks Fail Production Workflows.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {REALITIES.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="p-7 rounded-md bg-neutral-900/40 border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight mb-3 leading-snug">
                  {item.title}
                </h3>

                <p className="font-sans text-sm text-neutral-400 leading-relaxed font-normal mb-8">
                  {item.description}
                </p>
              </div>

              <div className="pt-5 border-t border-neutral-800/80">
                <span className="font-mono text-xl sm:text-2xl font-bold text-white block mb-1">
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
