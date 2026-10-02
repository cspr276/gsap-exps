'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface LabCard {
  id: string;
  category: string;
  title: string;
  desc: string;
  image: string;
  metricLabel: string;
  metricValue: string;
}

const LAB_CARDS: LabCard[] = [
  {
    id: '01',
    category: 'ISOLATED EXECUTION ENCLAVE',
    title: 'Adversarial Simulation Sandbox',
    desc: 'Hardware-isolated WASM runtimes where autonomous agents are subjected to continuous prompt injection, multi-turn privilege escalation, and tool-call mutation without external network escape.',
    image: '/services/reality-01.jpg',
    metricLabel: 'Containment SLA',
    metricValue: '0.000% Verified Escapes',
  },
  {
    id: '02',
    category: 'DOMAIN SPECIALIST ADJUDICATION',
    title: 'Psychometric Calibration Chamber',
    desc: 'Over 1,200 credentialed physicians, attorneys, and financial analysts score reasoning traces using mathematical inter-annotator statistical agreement, eliminating subjective bias.',
    image: '/cards/card_04.jpg',
    metricLabel: 'Inter-Rater Agreement',
    metricValue: 'Krippendorff α = 0.94',
  },
  {
    id: '03',
    category: 'CRYPTOGRAPHIC AUDIT LEDGER',
    title: 'Deterministic Trace Ledger',
    desc: 'Seed-locked execution snapshots, raw tool calls, and cryptographic hash ledgers record every decision trace for rapid regression triage, enterprise compliance, and forensic replay.',
    image: '/services/reality-02.jpg',
    metricLabel: 'Regression Triage',
    metricValue: '< 24hr Root Cause SLA',
  },
];

export default function AboutStickyGridSection() {
  return (
    <section className="relative z-20 w-full bg-white text-neutral-950 py-20 sm:py-28 border-b border-neutral-200 overflow-hidden">
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
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold block mb-3">
              03 // INSIDE EVALIXA LABS
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-neutral-950 tracking-tight leading-tight">
              Built by Security Researchers, ML Engineers & Domain Specialists.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-sans text-xs sm:text-sm text-neutral-600 max-w-md leading-relaxed"
          >
            Our teams operate at the intersection of offensive AI security, distributed evaluation infrastructure, and human-in-the-loop calibration.
          </motion.p>
        </div>

        {/* 3 Clean Bento Cards matching WhyEvalixaSection style */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-14">
          {LAB_CARDS.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative rounded-md border border-neutral-200/90 bg-neutral-950 p-7 sm:p-8 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl hover:border-neutral-400 transition-all duration-300"
            >
              {/* Background Architectural Image with Dark Gradient Overlay */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="w-full h-full object-cover object-center group-hover:scale-105 opacity-80 group-hover:opacity-90 transition-all duration-700 ease-out contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/35" />
              </div>

              {/* Foreground Card Content */}
              <div className="relative z-10 flex flex-col justify-between h-full min-h-[300px]">
                <div>
                  {/* Top Row: Monospace Index & Category */}
                  <div className="flex items-center justify-between pb-4 mb-5">
                    <span className="font-mono text-xs font-bold tracking-widest text-neutral-200 uppercase">
                      {card.id}
                    </span>
                  </div>

                  {/* Heading */}
                  <h3 className="font-display font-bold text-white tracking-tight mb-3 text-xl sm:text-2xl leading-snug">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-300 font-normal leading-relaxed text-xs sm:text-sm">
                    {card.desc}
                  </p>
                </div>

                {/* Clean Bottom Metric Bar */}
                <div className="pt-5 mt-6 flex items-center justify-between font-mono text-xs text-neutral-400">
                  <span className="uppercase tracking-wider text-[11px]">
                    {card.metricLabel}
                  </span>
                  <span className="font-semibold text-white">
                    {card.metricValue}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center"
        >
          <Link
            href="/services/ai-agent-evaluation-benchmarking"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-neutral-950 text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors shadow-sm"
          >
            <span>Inspect Flagship Evaluation Engine</span>
            <ArrowUpRight className="w-4 h-4 text-white" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
