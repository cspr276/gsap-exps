'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, ArrowUpRight } from 'lucide-react';
import Aurora from '@/components/Aurora';
import { CAREERS_EMAIL } from '@/data/careerRoles';

export default function CareersCTASection() {
  return (
    <section className="relative w-full overflow-hidden bg-neutral-950 text-white py-32 sm:py-40 flex items-center justify-center border-t border-neutral-900">
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
        {/* Headline */}
        <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight text-white leading-[1.15] mb-6 max-w-3xl">
          Don&apos;t see your specific role?
        </h2>

        {/* Descriptive Body */}
        <p className="text-neutral-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mb-10">
          We are always keen to speak with exceptional systems engineers, red-teamers, and credentialed domain fellows. If you build with rigor, write to us directly.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10">
          <a
            href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(
              'General Engineering / Research Inquiry'
            )}`}
            className="group w-full sm:w-auto px-8 py-4 rounded-md bg-white text-neutral-950 font-semibold text-sm tracking-wide inline-flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all shadow-xl shadow-black/40 cursor-pointer"
          >
            <Mail className="w-4 h-4 text-neutral-950" />
            <span>Email {CAREERS_EMAIL}</span>
          </a>

          <Link
            href="/contact?source=contributor-network"
            className="group w-full sm:w-auto px-8 py-4 rounded-md bg-neutral-900/80 hover:bg-neutral-900 border border-neutral-700/80 hover:border-neutral-500 text-white font-semibold text-sm tracking-wide inline-flex items-center justify-center gap-2 backdrop-blur-md transition-all cursor-pointer"
          >
            <span>Apply as Domain Fellow</span>
            <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-neutral-400 font-mono text-xs uppercase tracking-wider pt-2 border-t border-neutral-800/80">
          <span>✓ 100% Practitioner Review</span>
          <span>✓ Response in &lt; 5 Days</span>
          <span>✓ Remote-First Worldwide</span>
        </div>
      </div>
    </section>
  );
}
