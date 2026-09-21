'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';

export default function ServiceHero() {
  const handleScrollToWorkbench = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('workbench');
    if (!target) return;

    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo(target, {
        offset: -40,
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center pt-28 sm:pt-36 pb-20 overflow-hidden bg-[#09090b]">
      {/* Authentic tech infrastructure background */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/services/hero-datacenter.jpg"
          alt="Enterprise AI Computing Infrastructure"
          fill
          priority
          className="object-cover object-center brightness-[0.38] contrast-[1.05]"
        />
        {/* Dark radial and vertical gradient overlays for optimal text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/50 to-[#09090b]/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090b]/80 via-transparent to-[#09090b]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center flex flex-col items-center justify-center my-auto">
        <div className="max-w-4xl mx-auto">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center mb-5"
          >
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-neutral-400 font-semibold px-3 py-1 rounded-md bg-neutral-900/80 border border-neutral-800">
              SUPERVISED FINE-TUNING & RLHF
            </span>
          </motion.div>

          {/* Centered Main Headline (Display typography, bold, no serif) */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12] mb-6"
          >
            Fine-Tuning Is the Fourth Thing to Try,{' '}
            <span className="text-neutral-300 font-bold block sm:inline">
              Not the First.
            </span>
          </motion.h1>

          {/* Centered lede prose */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-base sm:text-lg text-neutral-200 leading-relaxed max-w-2xl mx-auto mb-10 font-normal drop-shadow-sm"
          >
            Teams reach for training because it feels like the serious option. Often the same gap closes with better retrieval, a clearer task definition, or a prompt that stops asking for two things at once — for a fraction of the cost and none of the maintenance. When training genuinely is the answer, the data decides the outcome, not the algorithm.
          </motion.p>

          {/* Centered High-Contrast Action CTAs with clean rectangular borders (rounded-md) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-all shadow-xl shadow-black/50 cursor-pointer"
            >
              <span>Scope Model Adaptation</span>
              <ArrowUpRight className="w-4 h-4 text-black stroke-[2.5]" />
            </Link>

            <a
              href="#workbench"
              onClick={handleScrollToWorkbench}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 hover:text-white font-mono text-xs uppercase tracking-wider font-medium border border-neutral-700/80 transition-all backdrop-blur-md cursor-pointer"
            >
              <span>Explore Adaptation Workbench</span>
              <ArrowDown className="w-3.5 h-3.5 text-neutral-400" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
