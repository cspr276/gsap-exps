'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const LAB_PILLARS = [
  {
    id: '01',
    category: 'ADVERSARIAL SECURITY',
    title: 'Offensive AI Red-Teamers',
    description:
      'Continuous automated jailbreak synthesis, multi-turn prompt injection defense, and systemic boundary testing against frontier LLMs.',
    image: '/services/reality-01.jpg',
  },
  {
    id: '02',
    category: 'DETERMINISTIC EVALUATION',
    title: 'Distributed Systems Architects',
    description:
      'Isolated sandbox runners, zero-regression drift telemetry, and cryptographic audit ledgers ensuring reproducible verification at scale.',
    image: '/services/hero-datacenter.jpg',
  },
  {
    id: '03',
    category: 'EXPERT HUMAN PANEL',
    title: 'Calibrated Domain Fellows',
    description:
      '1,200+ credentialed clinical, legal, and quantitative specialists scoring multi-step tool calls and domain-specific enterprise reasoning.',
    image: '/cards/card_04.jpg',
  },
];

export default function AboutStickyGridSection() {
  return (
    <section
      id="labs"
      className="relative z-20 w-full bg-white text-neutral-950 border-b border-neutral-200 py-24 sm:py-32 overflow-hidden"
    >
      {/* Subtle Atmospheric Frame with Smooth Scale Zoom (mirrors AboutHero animation) */}
      <motion.div
        initial={{ opacity: 0.35, scale: 1.08 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none origin-center"
      >
        <div className="absolute inset-0 bg-radial-[circle_at_top,_var(--tw-gradient-stops)] from-neutral-100/80 via-white to-white" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-35" />
      </motion.div>

      {/* Main Centered Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Monospace Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-sm bg-neutral-100 border border-neutral-300 backdrop-blur-md mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-700 font-semibold">
            03 // INSIDE EVALIXA LABS
          </span>
        </motion.div>

        {/* Kinetic Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 36, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-neutral-950 tracking-tight leading-[1.08] mb-6 max-w-4xl"
        >
          Built by Security Researchers, ML Engineers & Domain Specialists.
        </motion.h2>

        {/* Lede Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-base sm:text-lg lg:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto mb-14 font-normal"
        >
          Our teams operate at the intersection of offensive AI security, distributed evaluation infrastructure, and human-in-the-loop calibration — turning fragile model outputs into auditable enterprise systems.
        </motion.p>

        {/* 3 Core Capability Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full mb-14 text-left">
          {LAB_PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.85,
                delay: 0.28 + idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative rounded-xl overflow-hidden border border-neutral-200 bg-white shadow-sm hover:shadow-xl hover:border-neutral-400 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card Image Banner */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-950">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center grayscale contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Pill Badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] text-white">
                  <span className="font-semibold px-2 py-0.5 rounded-xs bg-white/20 backdrop-blur-md">
                    {pillar.category}
                  </span>
                  <span className="opacity-80 font-bold">#{pillar.id}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-display font-bold text-xl text-neutral-950 tracking-tight mb-2.5">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-sm text-neutral-600 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/services/ai-agent-evaluation-benchmarking"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-neutral-950 text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-all shadow-xl shadow-neutral-950/15"
          >
            <span>Inspect Our Flagship Engine</span>
            <ArrowUpRight className="w-4 h-4 text-white stroke-[2.5]" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
