'use client';

import React from 'react';
import { ArrowRight, MessageSquare, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section id="cta" className="relative w-full bg-[#0a0a0c] py-28 sm:py-36 px-6 sm:px-12 lg:px-20 border-t border-neutral-800 overflow-hidden">
      {/* Dynamic ambient background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[350px] bg-neutral-700/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-5xl mx-auto rounded-2xl border border-neutral-800 bg-[#121216]/90 backdrop-blur-2xl p-8 sm:p-14 text-center shadow-2xl shadow-black/80">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-neutral-900 border border-neutral-700/80 text-xs font-mono text-neutral-300 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>ENGAGEMENT DISCOVERY</span>
        </div>

        <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-6 leading-tight">
          Find out where your AI fails — <br className="hidden sm:inline" />
          before your users do.
        </h2>

        <p className="text-neutral-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Talk to our team about an evaluation, red-team, or expert-review engagement for your foundation models and agent swarms.
        </p>

        {/* Action Buttons without pill styling */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-white text-neutral-950 font-semibold text-sm hover:bg-neutral-200 transition-all duration-300 shadow-xl shadow-white/5 group"
          >
            <MessageSquare className="w-4 h-4 text-neutral-900" />
            <span>Start a Conversation</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="#manifesto"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-neutral-900 border border-neutral-700 text-neutral-300 font-medium text-sm hover:bg-neutral-800 hover:text-white transition-all duration-300"
          >
            <span>Explore Case Studies</span>
          </Link>
        </div>

        {/* Reassurances */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-neutral-400">
          <span>✓ Task-grounded rubrics</span>
          <span>✓ Reproducible traces & audit logs</span>
          <span>✓ Calibrated expert network</span>
        </div>
      </div>
    </section>
  );
}
