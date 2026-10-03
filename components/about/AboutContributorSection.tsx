'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Award, ShieldCheck, Scale } from 'lucide-react';

const CONTRIBUTOR_PILLARS = [
  {
    num: '01',
    icon: Award,
    title: 'Credentialed Domain Specialists',
    desc: 'We recruit certified clinicians, attorneys, financial analysts, and security researchers. Every contributor undergoes rigorous calibration against gold-standard rubrics before scoring production data.',
    metric: '1,200+ Verified Fellows',
  },
  {
    num: '02',
    icon: Scale,
    title: 'High-Horizon Reasoning Adjudication',
    desc: 'Automated judges hallucinate on nuanced domain workflows. Our specialists evaluate multi-step tool calls, regulatory compliance boundaries, and multi-turn reasoning traces with granular failure categorization.',
    metric: 'Krippendorff α ≥ 0.90',
  },
  {
    num: '03',
    icon: ShieldCheck,
    title: 'Deterministic Trace Auditing',
    desc: 'Every annotation, rubric score, and adjudication dispute is stamped with cryptographic hashes and reviewer provenance, ensuring auditable traceability for enterprise release gates.',
    metric: '100% Auditable Traces',
  },
];

export default function AboutContributorSection() {
  return (
    <section className="relative z-20 w-full py-24 sm:py-32 bg-[#09090b] text-white border-b border-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-8 mb-14 border-b border-neutral-900 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold block mb-3">
              06 // THE CONTRIBUTOR NETWORK
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              Grounding Autonomous Reasoning in Verified Human Truth.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-sans text-xs sm:text-sm text-neutral-400 max-w-md leading-relaxed"
          >
            We connect frontier AI laboratories with calibrated specialists across healthcare, finance, law, and cybersecurity to eliminate hallucinations and drift.
          </motion.p>
        </div>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {CONTRIBUTOR_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group rounded-md border border-neutral-800/80 bg-neutral-950/70 hover:border-neutral-700 hover:bg-neutral-900/50 p-7 sm:p-8 flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-neutral-800">
                    <span className="font-mono text-xs font-bold text-neutral-400">
                      {pillar.num}
                    </span>
                    <Icon className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                  </div>

                  <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight leading-snug mb-3">
                    {pillar.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-800 flex items-center justify-between font-mono text-xs">
                  <span className="text-neutral-500 uppercase tracking-wider text-[11px]">
                    Benchmark
                  </span>
                  <span className="font-semibold text-white">
                    {pillar.metric}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Callout Box */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-md border border-neutral-800 bg-neutral-950/80 p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
        >
          <div>
            <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-widest block mb-1">
              Contribute Your Expertise
            </span>
            <h4 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">
              Are you a credentialed domain specialist?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
              Join our calibrated network of attorneys, physicians, researchers, and engineers working on high-impact milestone evaluation projects.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Link
              href="/contact?source=contributor"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-white text-neutral-950 font-mono text-xs uppercase tracking-wider font-bold hover:bg-neutral-200 transition-colors shadow-sm"
            >
              <span>Apply as Expert Contributor</span>
              <ArrowUpRight className="w-4 h-4 text-neutral-950" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
