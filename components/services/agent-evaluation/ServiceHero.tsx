'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';

const METRICS = [
  {
    value: '50+',
    label: 'Evaluation Dimensions',
    detail: 'Reasoning, tool execution, safety, and operational latency.',
  },
  {
    value: '3×',
    label: 'Expert Adjudication',
    detail: 'Independent domain reviewers on every ambiguous failure.',
  },
  {
    value: '100%',
    label: 'Auditability & Traces',
    detail: 'Complete input/output traces, logs, and reviewer notes.',
  },
  {
    value: '< 24hr',
    label: 'Regression Triage',
    detail: 'Automated delta alerts when models or prompts drift.',
  },
];

export default function ServiceHero() {
  return (
    <section className="relative w-full min-h-[92vh] flex flex-col justify-between pt-32 sm:pt-40 pb-16 overflow-hidden">
      {/* Full-bleed ambient hero background with smooth gradient vignette (no boxy borders) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/services/ai-agent-evaluation.webp"
          alt="AI Agent Evaluation Architecture"
          fill
          priority
          className="object-cover object-center brightness-[0.28] contrast-[1.05]"
        />
        {/* Multi-stage dark gradient overlays for seamless canvas blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/60 to-[#09090b]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090b]/90 via-[#09090b]/40 to-[#09090b]/90" />
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,_transparent_20%,_#09090b_75%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-12">
        <div className="max-w-4xl">
          {/* Main Headline (Bold display typography, no serif) */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.06] mb-6"
          >
            Decision-Grade AI Agent Evaluation.{' '}
            <span className="text-neutral-400 font-bold block sm:inline">
              Benchmarked by Domain Experts.
            </span>
          </motion.h1>

          {/* Lede Prose */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-lg sm:text-xl text-neutral-300 leading-relaxed max-w-2xl mb-10 font-normal"
          >
            We construct empirical, reproducible benchmark suites for enterprise AI workflows — exposing compound error drift, multi-turn hallucinations, and security regressions before production release.
          </motion.p>

          {/* High-Contrast Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-all shadow-lg shadow-white/5"
            >
              <span>Scope an Evaluation</span>
              <ArrowUpRight className="w-4 h-4 text-black stroke-[2.5]" />
            </Link>

            <a
              href="#workbench"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-wider font-medium border border-neutral-800 transition-all backdrop-blur-sm"
            >
              <span>Explore Benchmark Engine</span>
              <ArrowDown className="w-3.5 h-3.5 text-neutral-400" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Metric Strip (Clean architectural cards) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {METRICS.map((metric) => (
            <div
              key={metric.label}
              className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-md hover:border-neutral-700/80 transition-colors"
            >
              <span className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight block mb-2">
                {metric.value}
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-200 font-semibold block mb-1">
                {metric.label}
              </span>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                {metric.detail}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
