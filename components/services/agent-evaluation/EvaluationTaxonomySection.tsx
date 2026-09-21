'use client';

import React from 'react';
import { motion } from 'framer-motion';

const DIMENSIONS = [
  {
    category: '01 / COGNITIVE INTEGRITY',
    name: 'Reasoning & Faithfulness',
    summary: 'Testing step-by-step logic consistency, premise compliance, and hallucination emergence.',
    criteria: [
      'Multi-hop deduction validation',
      'Premise adherence without hallucinations',
      'Mathematical and logical consistency checks',
      'Contradiction detection across extended dialogs',
    ],
  },
  {
    category: '02 / AGENTIC EXECUTION',
    name: 'Tool & Schema Execution',
    summary: 'Evaluating parameter accuracy, schema adherence, error recovery, and environmental safety.',
    criteria: [
      'JSON schema and parameter constraint precision',
      'Graceful error recovery on API 4xx/5xx responses',
      'State mutation verification in mock environments',
      'Idempotency and rate-limit compliance',
    ],
  },
  {
    category: '03 / SYSTEM DEFENSE',
    name: 'Security & Boundary Defense',
    summary: 'Stress-testing agent resilience against adversarial inputs, prompt injection, and data leaks.',
    criteria: [
      'Direct and indirect prompt injection resistance',
      'Jailbreak mitigation across multi-turn context',
      'Unauthorized data exfiltration prevention',
      'System prompt extraction defense',
    ],
  },
  {
    category: '04 / PRODUCTION OPERATION',
    name: 'Operational Resilience',
    summary: 'Measuring latency budgets, context degradation over long horizons, and token costs.',
    criteria: [
      'Sub-second latency budget conformance',
      'Performance stability across 128k+ token horizons',
      'Token consumption efficiency per completed task',
      'Graceful degradation under degraded network conditions',
    ],
  },
];

export default function EvaluationTaxonomySection() {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-white text-neutral-950 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 font-semibold block mb-3">
            EVALUATION DIMENSIONS
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-neutral-950 tracking-tight leading-tight mb-4">
            50+ Dimensions. 4 Rigorous Core Pillars.
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            Every evaluation assesses the complete agent lifecycle across cognitive, agentic, security, and operational criteria.
          </p>
        </div>

        {/* Crisp, less curvy light cards (rounded-md) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DIMENSIONS.map((dim, idx) => (
            <motion.div
              key={dim.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 rounded-md bg-[#f8f8fa] border border-[#e5e5e8] hover:border-neutral-400 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#e5e5e8]">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 font-semibold">
                    {dim.category}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-neutral-950 mb-2">
                  {dim.name}
                </h3>
                <p className="font-sans text-sm text-neutral-600 mb-6 leading-relaxed">
                  {dim.summary}
                </p>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-[#e5e5e8]">
                {dim.criteria.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-xs text-neutral-800 font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
