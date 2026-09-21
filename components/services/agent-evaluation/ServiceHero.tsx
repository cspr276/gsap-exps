'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';

export default function ServiceHero() {
  return (
    <section className="relative w-full min-h-[82vh] flex flex-col justify-center pt-28 sm:pt-36 pb-20 overflow-hidden">
      {/* Ambient hero background with reduced overlay so image is crisp and clearly visible */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/services/ai-agent-evaluation.webp"
          alt="AI Agent Evaluation Architecture"
          fill
          priority
          className="object-cover object-center brightness-[0.72] contrast-[1.02]"
        />
        {/* Lighter, subtle gradient overlays preserving image visibility while keeping text legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/45 to-[#09090b]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090b]/85 via-transparent to-[#09090b]/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Main Headline (Reduced text size, bold display typography, no serif) */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.12] mb-5"
          >
            Decision-Grade AI Agent Evaluation.{' '}
            <span className="text-neutral-300 font-bold block sm:inline">
              Benchmarked by Domain Experts.
            </span>
          </motion.h1>

          {/* Reduced lede prose */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-base sm:text-lg text-neutral-200 leading-relaxed max-w-xl mb-8 font-normal drop-shadow-sm"
          >
            We construct empirical, reproducible benchmark suites for enterprise AI workflows — exposing compound error drift, multi-turn hallucinations, and security regressions before production release.
          </motion.p>

          {/* High-Contrast Action CTAs with less curvy borders (rounded-md) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3.5"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-all shadow-lg shadow-black/40"
            >
              <span>Scope an Evaluation</span>
              <ArrowUpRight className="w-4 h-4 text-black stroke-[2.5]" />
            </Link>

            <a
              href="#workbench"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 hover:text-white font-mono text-xs uppercase tracking-wider font-medium border border-neutral-700/80 transition-all backdrop-blur-md"
            >
              <span>Explore Benchmark Engine</span>
              <ArrowDown className="w-3.5 h-3.5 text-neutral-400" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
