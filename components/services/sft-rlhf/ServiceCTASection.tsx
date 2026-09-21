'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Aurora from '@/components/Aurora';

export default function ServiceCTASection() {
  return (
    <section className="relative w-full overflow-hidden bg-neutral-950 text-white py-32 sm:py-40 lg:py-48 flex items-center justify-center border-t border-neutral-900">
      {/* WebGL Aurora Background Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Aurora
          colorStops={['#a7a8ff', '#9096fe', '#a892ff']}
          blend={0.5}
          amplitude={0.5}
          speed={1}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-12 text-center flex flex-col items-center">
        {/* Eyebrow Label */}
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-4">
          ADAPT WITH CERTAINTY
        </span>

        {/* Service-Specific Headline */}
        <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight text-white leading-[1.15] mb-6 max-w-3xl">
          Fine-tune when it earns its place.{' '}
          <span className="text-neutral-300">Measure what it actually changes.</span>
        </h2>

        {/* Service-Specific Descriptive Body */}
        <p className="text-neutral-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mb-10">
          Talk to our engineering team about ruling out cheap levers, curating gold domain demonstrations, and aligning models through calibrated expert preference data.
        </p>

        {/* CTA Buttons with crisp rounded-md borders */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10">
          <Link
            href="/contact"
            className="group w-full sm:w-auto px-8 py-4 rounded-md bg-white text-neutral-950 font-semibold text-sm tracking-wide inline-flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all shadow-xl shadow-black/40 cursor-pointer"
          >
            <span>Schedule Scoping Call</span>
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

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-neutral-400 font-mono text-xs uppercase tracking-wider pt-2 border-t border-neutral-800/80">
          <span>✓ Evaluation-First Baseline</span>
          <span className="hidden sm:inline text-neutral-600">•</span>
          <span>✓ Domain-Calibrated Annotators</span>
          <span className="hidden sm:inline text-neutral-600">•</span>
          <span>✓ Zero Unmeasured Regressions</span>
        </div>
      </div>
    </section>
  );
}
