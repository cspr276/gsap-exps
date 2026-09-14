'use client';

import React from 'react';
import ShinyText from './ShinyText';
import { ArrowRight, Sparkles, Terminal } from 'lucide-react';

export default function CTASection() {
  return (
    <section id="cta" className="relative w-full bg-neutral-950 py-28 px-6 sm:px-12 lg:px-20 overflow-hidden">
      {/* Dynamic Aurora-like background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[350px] bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-indigo-500/15 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-5xl mx-auto rounded-3xl border border-white/15 bg-neutral-900/60 backdrop-blur-2xl p-8 sm:p-14 text-center shadow-2xl shadow-black/80">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-emerald-400 mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>START DEPLOYING TODAY</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
          Ready to supercharge your <br />
          <ShinyText
            text="Autonomous Architecture?"
            speed={2}
            color="#d4d4d8"
            shineColor="#ffffff"
          />
        </h2>

        <p className="text-neutral-400 text-sm sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Spin up zero-latency agent clusters, low-latency vector meshes, and self-healing pipelines in under three minutes with our unified SDK.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-neutral-950 font-semibold text-sm hover:bg-neutral-200 transition-all duration-300 shadow-xl shadow-white/10 group"
          >
            <span>Get Started with Evalixa</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <button className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.04] border border-white/15 text-neutral-300 font-medium text-sm hover:bg-white/[0.08] hover:text-white transition-all duration-300 backdrop-blur-md">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>npm i @evalixa/core</span>
          </button>
        </div>

        {/* Minimal guarantee */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-neutral-500">
          <span>✓ Zero configuration required</span>
          <span>✓ Open telemetry compliant</span>
          <span>✓ SOC-2 Type II Certified</span>
        </div>
      </div>
    </section>
  );
}
