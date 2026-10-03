'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export default function CaseStudiesHero() {
  const scrollToLedger = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('case-studies-ledger');
    if (!target) return;
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="case-studies-hero"
      className="sticky top-0 z-0 w-full min-h-screen lg:h-screen flex flex-col justify-center items-center overflow-hidden bg-[#09090b] text-white"
    >
      {/* Atmospheric Photographic Frame matching rest of site */}
      <motion.div
        initial={{ opacity: 0.4, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none origin-center"
      >
        <Image
          src="/case-studies/caseStudyBackground.png"
          alt="Evalixa Case Studies"
          fill
          priority
          className="object-cover object-center brightness-[0.38] contrast-[1.12]"
        />
        <div className="absolute inset-0 bg-[#09090b]/50 pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-t from-[#09090b] via-transparent to-[#09090b]/75 pointer-events-none" />
      </motion.div>

      {/* Main Centered Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center flex flex-col items-center justify-center pt-24 pb-16 my-auto">
        {/* Monospace Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-4"
        >
          INSIGHTS // CASE STUDIES
        </motion.span>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 36, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl xl:text-[68px] text-white tracking-tight leading-[1.08] mb-6 max-w-4xl drop-shadow-md"
        >
          What Changes When AI Evaluation{' '}
          <span className="text-neutral-300 font-bold block sm:inline">
            Becomes Traceable.
          </span>
        </motion.h1>

        {/* Lede Statement */}
        <motion.p
          initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-base sm:text-lg lg:text-xl text-neutral-200 leading-relaxed max-w-2xl mx-auto mb-10 font-normal"
        >
          Engagement stories showing how Evalixa turns AI evaluation, adversarial red-teaming, and expert data into decisions teams can defend to boards, auditors, and regulators.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <a
            href="#case-studies-ledger"
            onClick={scrollToLedger}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-all shadow-xl shadow-black/50 cursor-pointer"
          >
            <span>Explore 3 In-Depth Studies</span>
            <ArrowDown className="w-3.5 h-3.5 text-black stroke-[2.5]" />
          </a>

          <Link
            href="/contact?source=case-studies"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 hover:text-white font-mono text-xs uppercase tracking-wider font-medium border border-neutral-700/80 transition-all backdrop-blur-md cursor-pointer"
          >
            <span>Schedule Scoping Call</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
          </Link>
        </motion.div>

        {/* Evidence Pattern Metric Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-neutral-800/80 w-full max-w-3xl"
        >
          <div className="flex flex-col items-center">
            <span className="font-mono text-sm font-bold text-neutral-400">01</span>
            <span className="font-mono text-xs text-neutral-300 uppercase tracking-wider mt-1">
              Risk Surface Mapped
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-mono text-sm font-bold text-neutral-400">02</span>
            <span className="font-mono text-xs text-neutral-300 uppercase tracking-wider mt-1">
              Reviewer Evidence Captured
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-mono text-sm font-bold text-neutral-400">03</span>
            <span className="font-mono text-xs text-neutral-300 uppercase tracking-wider mt-1">
              Regression Suite Handed Over
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
