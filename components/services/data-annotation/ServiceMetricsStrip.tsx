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
    value: "0.85+ Cohen's κ",
    label: 'Agreement Threshold',
    detail: 'Strict statistical concordance required before any batch passes from calibration to production.',
  },
  {
    value: '100%',
    label: 'Domain-Matched Reviewers',
    detail: 'Clinicians, attorneys, engineers, and financial analysts aligned to actual task complexity.',
  },
  {
    value: '20%',
    label: 'Adjudicated Escalation',
    detail: 'Contested edge cases routed directly to senior specialists rather than silently averaged out.',
  },
  {
    value: '0',
    label: 'Uncalibrated Headcount',
    detail: 'Zero unvetted reviewers. Every annotator completes blind seed testing before production queue access.',
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
