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
        offset: -20,
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="service-hero"
      className="sticky top-0 z-0 w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-[#09090b]"
    >
      {/* Dynamic Floating Frame / Chassis */}
      <motion.div
        initial={{ opacity: 0.5, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none origin-center border border-white/5"
      >
        <Image
          src="/services/hero-datacenter.jpg"
          alt="Enterprise AI Computing Infrastructure"
          fill
          priority
          className="object-cover object-center brightness-[0.45] contrast-[1.05]"
        />
        {/* Scrim Overlay */}
        <div className="absolute inset-0 bg-[#09090b]/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-[#09090b]/60 pointer-events-none" />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center flex flex-col items-center justify-center pt-28 pb-16 my-auto">
        <div className="max-w-4xl mx-auto">
          {/* Centered Main Headline (Animated with enhanced motion matching other services) */}
          <motion.h1
            initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.14] mb-6 drop-shadow-md"
          >
            Decision-Grade AI Agent Evaluation.{' '}
            <span className="text-neutral-300 font-bold block sm:inline">
              Benchmarked by Domain Experts.
            </span>
          </motion.h1>

          {/* Centered lede prose */}
          <motion.p
            initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-base sm:text-lg text-neutral-200 leading-relaxed max-w-2xl mx-auto mb-10 font-normal drop-shadow-sm"
          >
            We construct empirical, reproducible benchmark suites for enterprise AI workflows — exposing compound error drift, multi-turn hallucinations, and security regressions before production release.
          </motion.p>

          {/* Centered High-Contrast Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-all shadow-xl shadow-black/50"
            >
              <span>Scope an Evaluation</span>
              <ArrowUpRight className="w-4 h-4 text-black stroke-[2.5]" />
            </Link>

            <a
              href="#workbench"
              onClick={handleScrollToWorkbench}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 hover:text-white font-mono text-xs uppercase tracking-wider font-medium border border-neutral-700/80 transition-all backdrop-blur-md cursor-pointer"
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
