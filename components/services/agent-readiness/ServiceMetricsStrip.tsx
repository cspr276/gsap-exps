'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MetricItem {
  value: string;
  label: string;
  detail: string;
}

const METRICS: MetricItem[] = [
  {
    value: '100%',
    label: 'Estate Inventory Discovery',
    detail: 'Comprehensive accounting of built, bought, and embedded AI across all SaaS and cloud tools.',
  },
  {
    value: '4 Tiers',
    label: 'Risk Classification',
    detail: 'Minimal, Limited, High, and Agentic autonomy tiering tied directly to regulatory obligations.',
  },
  {
    value: 'EU AI Act & NIST',
    label: 'Framework Aligned',
    detail: 'Direct technical mapping to EU AI Act, NIST AI RMF 1.0, and ISO/IEC 42001 governance standards.',
  },
  {
    value: '0',
    label: 'Unaccounted Shadow Agents',
    detail: 'Zero unmonitored agentic pipelines, rogue API integrations, or untracked credentials.',
  },
];

export default function ServiceMetricsStrip() {
  return (
    <section className="relative w-full bg-white text-neutral-950 border-t border-b border-neutral-200 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-neutral-200">
          {METRICS.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-between lg:px-8 first:lg:pl-0 last:lg:pr-0"
            >
              <div>
                <span className="font-display font-extrabold text-4xl sm:text-5xl text-neutral-950 tracking-tight block mb-2">
                  {metric.value}
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 font-bold block mb-2">
                  {metric.label}
                </span>
                <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  {metric.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
