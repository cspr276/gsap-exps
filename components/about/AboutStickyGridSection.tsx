'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Users, Lock } from 'lucide-react';

interface LabCard {
  id: string;
  code: string;
  title: string;
  tagline: string;
  desc: string;
  image: string;
  metricLabel: string;
  metricValue: string;
  icon: React.ElementType;
}

const LAB_CARDS: LabCard[] = [
  {
    id: '01',
    code: 'LAB_ENV // SANDBOX_01',
    title: 'The Adversarial Simulation Sandbox',
    tagline: 'HARDWARE-ISOLATED EXECUTION ENCLAVE',
    desc: 'Hardware-isolated WASM runtimes where autonomous agents are subjected to continuous prompt injection, multi-turn privilege escalation, and tool-call mutation without external network escape.',
    image: '/services/reality-01.jpg',
    metricLabel: 'ESCAPE CONTAINMENT',
    metricValue: '0.000% Verified',
    icon: ShieldCheck,
  },
  {
    id: '02',
    code: 'LAB_ENV // CALIBRATION_02',
    title: 'The Psychometric Calibration Chamber',
    tagline: 'TRIPLE-BLIND DOMAIN EXPERT ADJUDICATION',
    desc: 'Over 1,200 credentialed physicians, attorneys, and financial analysts score reasoning traces using mathematical inter-annotator statistical agreement, eliminating subjective bias.',
    image: '/cards/card_04.jpg',
    metricLabel: 'INTER-RATER AGREEMENT',
    metricValue: 'Krippendorff α = 0.94',
    icon: Users,
  },
  {
    id: '03',
    code: 'LAB_ENV // LEDGER_03',
    title: 'The Cryptographic Trace Ledger',
    tagline: 'IMMUTABLE AUDITABILITY & ROOT-CAUSE TRIAGE',
    desc: 'Seed-locked execution snapshots, raw tool calls, and cryptographic hash ledgers record every decision trace for rapid regression triage, enterprise compliance, and forensic replay.',
    image: '/services/reality-02.jpg',
    metricLabel: 'REGRESSION SLA',
    metricValue: '< 24hr Root Cause',
    icon: Lock,
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
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-sm bg-neutral-950 text-white uppercase tracking-widest">
                03 // INSIDE EVALIXA LABS
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold">
                INFRASTRUCTURE & METHODOLOGY
              </span>
            </div>
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

        {/* 3 Clean Lab Environment Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-14">
          {LAB_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group rounded-xl border border-neutral-200 bg-[#fafafa] hover:border-neutral-900 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-lg hover:shadow-neutral-950/5"
              >
                <div>
                  {/* Card Visual Header */}
                  <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-neutral-900">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 400px"
                      className="object-cover object-center grayscale contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/40 to-transparent" />
                    
                    {/* Floating Monospace Tag inside Image */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="font-mono text-[10px] text-white/90 font-bold bg-neutral-950/80 backdrop-blur-xs px-2.5 py-1 rounded-sm border border-white/15 uppercase tracking-wider">
                        {card.code}
                      </span>
                      <div className="w-7 h-7 rounded-sm bg-neutral-950/80 backdrop-blur-xs border border-white/15 flex items-center justify-center text-white">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-300 block">
                        {card.tagline}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7">
                    <h3 className="font-display font-bold text-lg sm:text-xl text-neutral-950 tracking-tight leading-snug mb-3">
                      {card.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                      {card.desc}
                    </p>
                  </div>
                </div>

                {/* Card Footer Metric */}
                <div className="p-6 sm:p-7 pt-0 border-t border-neutral-200 mt-2 flex items-center justify-between font-mono text-[11px]">
                  <span className="text-neutral-500 uppercase tracking-wider text-[10px]">
                    {card.metricLabel}
                  </span>
                  <span className="font-bold text-neutral-950 bg-white px-2.5 py-1 rounded-sm border border-neutral-300 shadow-xs">
                    {card.metricValue}
                  </span>
                </div>
              </motion.div>
            );
          })}
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
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-neutral-950 text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-all shadow-md shadow-neutral-950/15"
          >
            <span>Inspect Our Flagship Evaluation Engine</span>
            <ArrowUpRight className="w-4 h-4 text-white" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
