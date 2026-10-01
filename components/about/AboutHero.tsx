'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';

const HERO_STATS = [
  { value: '50+', label: 'Evaluation Dimensions', code: 'DIM_COVERAGE' },
  { value: '1,200+', label: 'Calibrated Domain Experts', code: 'EXPERT_PANEL' },
  { value: '100%', label: 'Reproducible Audit Traces', code: 'TRACE_INTEGRITY' },
  { value: '< 24hr', label: 'Regression Triage SLA', code: 'DELTA_ALERT' },
];

export default function AboutHero() {
  const handleScrollToOrigin = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('origin');
    if (!target) return;

    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo(target, {
        offset: 0,
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="about-hero"
      className="sticky top-0 z-0 w-full min-h-screen lg:h-screen flex flex-col justify-between overflow-hidden bg-[#09090b] text-white"
    >
      {/* Dynamic Atmospheric Frame */}
      <motion.div
        initial={{ opacity: 0.4, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none origin-center"
      >
        <Image
          src="/services/hero-bg.webp"
          alt="Evalixa Engineering Architecture"
          fill
          priority
          className="object-cover object-center brightness-[0.42] contrast-[1.08]"
        />
        <div className="absolute inset-0 bg-[#09090b]/45 pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-t from-[#09090b] via-transparent to-[#09090b]/70 pointer-events-none" />
      </motion.div>

      {/* Main Centered Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center flex flex-col items-center justify-center pt-32 pb-12 my-auto">

        {/* Kinetic Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 36, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl xl:text-[68px] text-white tracking-tight leading-[1.08] mb-6 max-w-4xl drop-shadow-md"
        >
          Engineering Trust Into{' '}
          <span className="text-neutral-300 font-bold block sm:inline">
            Autonomous Intelligence.
          </span>
        </motion.h1>

        {/* Lede Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-base sm:text-lg lg:text-xl text-neutral-200 leading-relaxed max-w-2xl mx-auto mb-10 font-normal"
        >
          We exist to close the gap between promising AI prototypes and mission-critical production systems — uniting adversarial security testing, deterministic evaluation benchmarks, and calibrated domain specialists.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-all shadow-xl shadow-black/50"
          >
            <span>Partner With Us</span>
            <ArrowUpRight className="w-4 h-4 text-black stroke-[2.5]" />
          </Link>

          <a
            href="#origin"
            onClick={handleScrollToOrigin}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 hover:text-white font-mono text-xs uppercase tracking-wider font-medium border border-neutral-700/80 transition-all backdrop-blur-md cursor-pointer"
          >
            <span>Read Our Thesis</span>
            <ArrowDown className="w-3.5 h-3.5 text-neutral-400" />
          </a>
        </motion.div>
      </div>

      {/* Bottom Institutional Telemetry Bar */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full  bg-[#09090b]/80 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-white/10">
            {HERO_STATS.map((stat) => (
              <div
                key={stat.code}
                className="flex flex-col justify-between lg:px-8 first:lg:pl-0 last:lg:pr-0 text-center"
              >
                <div className="mb-1">
                  <span className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight tabular-nums">
                    {stat.value}
                  </span>
                </div>
                <span className="font-sans text-xs sm:text-sm text-neutral-400 font-normal">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
