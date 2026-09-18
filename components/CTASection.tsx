'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Aurora from './Aurora';

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-neutral-950 text-white py-32 sm:py-40 lg:py-48 flex items-center justify-center border-t border-neutral-900"
    >
      {/* Aurora Background Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-85">
        <Aurora
          colorStops={['#10b981', '#3b82f6', '#8b5cf6']}
          amplitude={1.2}
          blend={0.65}
          speed={0.6}
        />
        {/* Soft Vignette Overlay to blend smoothly with top and bottom borders */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950 pointer-events-none" />
        <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-[1px] pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-12 text-center flex flex-col items-center">
        {/* Monospace Tag / Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-300">
            EVALUATION & ADVERSARIAL ASSURANCE
          </span>
        </div>

        {/* Clean Headline */}
        <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight text-white leading-[1.15] mb-6 max-w-3xl">
          Find out where your AI fails —{' '}
          <span className="text-neutral-300">before your users do.</span>
        </h2>

        {/* Descriptive Body */}
        <p className="text-neutral-400 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mb-10">
          Talk to our team about an evaluation, red-team, or expert-review engagement for your models and agentic workflows.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/contact"
            className="group w-full sm:w-auto px-8 py-4 rounded-md bg-white text-neutral-950 font-semibold text-sm tracking-wide inline-flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all shadow-xl shadow-black/40 cursor-pointer"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="w-4 h-4 text-neutral-950 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>

          <Link
            href="/insights/case-studies"
            className="group w-full sm:w-auto px-8 py-4 rounded-md bg-neutral-900/80 hover:bg-neutral-900 border border-neutral-700/80 hover:border-neutral-500 text-white font-semibold text-sm tracking-wide inline-flex items-center justify-center gap-2 backdrop-blur-md transition-all cursor-pointer"
          >
            <span>Explore Case Studies</span>
            <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
          </Link>
        </div>
      </div>
    </section>
  );
}
