'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, ArrowUpRight } from 'lucide-react';
import { CAREERS_EMAIL } from '@/data/careerRoles';

export default function CareersHero() {
  const scrollToPositions = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('open-positions');
    if (!target) return;
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo(target, { offset: -60, duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative z-10 w-full pt-36 pb-20 sm:pt-44 sm:pb-28 bg-[#09090b] text-white border-b border-neutral-900 overflow-hidden">
      {/* Subtle architectural grid pattern background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold">
              CAREERS AT EVALIXA
            </span>
            <span className="h-px w-8 bg-neutral-700 select-none" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400/90 font-medium">
              ● Actively Hiring
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12] mb-6 drop-shadow-sm"
          >
            Help Us Engineer Deterministic Trust into Autonomous Intelligence.
          </motion.h1>

          {/* Subhead / Thesis */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-base sm:text-lg lg:text-xl text-neutral-300 font-normal leading-relaxed mb-10 max-w-3xl"
          >
            Evalixa hires engineers, researchers, security practitioners, and domain specialists who take AI reliability, safety, and evaluation seriously. Remote-first, high autonomy, senior collaboration, and zero corporate red tape.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 mb-16"
          >
            <a
              href="#open-positions"
              onClick={scrollToPositions}
              className="group px-7 py-3.5 rounded-md bg-white text-neutral-950 font-semibold text-sm tracking-wide inline-flex items-center gap-2 hover:bg-neutral-200 transition-all shadow-xl shadow-black/40 cursor-pointer"
            >
              <span>Explore 9 Open Positions</span>
              <ArrowDown className="w-4 h-4 text-neutral-950 group-hover:translate-y-0.5 transition-transform duration-200" />
            </a>

            <a
              href={`mailto:${CAREERS_EMAIL}`}
              className="group px-7 py-3.5 rounded-md bg-neutral-900/90 hover:bg-neutral-800/90 border border-neutral-800 hover:border-neutral-600 text-white font-semibold text-sm tracking-wide inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
              <span>{CAREERS_EMAIL}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors" />
            </a>
          </motion.div>
        </div>

        {/* Telemetry Strip / Quick Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-neutral-800/80"
        >
          <div className="flex flex-col">
            <span className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              25+
            </span>
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider mt-1">
              Active Openings
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              6 Tracks
            </span>
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider mt-1">
              Hiring Domains
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              Remote-First
            </span>
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider mt-1">
              IST / CET / Global Overlap
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              &lt; 5 Days
            </span>
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider mt-1">
              Application Response SLA
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
