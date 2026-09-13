'use client';

import React from 'react';
import ScrollTypography from './ScrollTypography';

export default function ManifestoSection() {
  return (
    <section
      id="manifesto"
      className="relative w-full bg-neutral-950 text-white py-36 px-6 sm:px-12 lg:px-24 border-t border-neutral-900 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-start">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500 mb-8 block">
          SYSTEM MANIFESTO
        </span>

        {/* Big editorial quote with fx16 title tilt & word-by-word scroll scrub */}
        <ScrollTypography
          tag="h2"
          text="WE ARE BUILDING FOR THE ERA WHERE SOFTWARE AUTONOMOUSLY EVOLVES, HEALS, AND EXPANDS BEYOND HUMAN BOUNDARIES."
          tilt={true}
          className="font-display font-black text-3xl sm:text-5xl lg:text-7xl uppercase tracking-tighter text-white leading-[1.05] mb-12 max-w-5xl"
          wordClassName="hover:text-white transition-colors"
        />

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-neutral-800 text-xs font-mono text-neutral-400">
          <div>
            <span className="text-neutral-200 block mb-2 font-semibold">01 / DETERMINISTIC RIGOR</span>
            <p className="leading-relaxed text-neutral-500 font-sans text-sm">
              Zero tolerance for hallucinations. Every inference output is bounded by cryptographic verification and zero-knowledge mathematical proofs.
            </p>
          </div>
          <div>
            <span className="text-neutral-200 block mb-2 font-semibold">02 / SILICON COMPILATION</span>
            <p className="leading-relaxed text-neutral-500 font-sans text-sm">
              We eliminate traditional virtualization runtimes. Agent compute graphs compile directly into bare-metal GPU kernels.
            </p>
          </div>
          <div>
            <span className="text-neutral-200 block mb-2 font-semibold">03 / CONTINUOUS SCALE</span>
            <p className="leading-relaxed text-neutral-500 font-sans text-sm">
              Built from the ground up for infinite horizontal concurrency across globally partitioned edge mesh clusters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
