'use client';

import React from 'react';
import { Eye, MessageSquareCode, Laptop, FileCheck2 } from 'lucide-react';

const STEPS = [
  {
    step: 'STEP 01',
    title: 'Work & Packet Review',
    timing: '2-3 Business Days',
    icon: Eye,
    description:
      'Every application is reviewed directly by an active engineer or domain lead—never an automated keyword parser. We prioritize actual code samples, deployed systems, papers, and demonstrated craft over pedigree.',
  },
  {
    step: 'STEP 02',
    title: 'Technical Discussion',
    timing: '45-60 Minutes',
    icon: MessageSquareCode,
    description:
      'A practical architectural conversation with the team you will work with. We discuss your past projects, edge-case debugging stories, trade-offs in evaluation systems, and how you approach ambiguous engineering challenges.',
  },
  {
    step: 'STEP 03',
    title: 'Calibrated Working Trial',
    timing: 'Paid · 3-4 Hours',
    icon: Laptop,
    description:
      'No contrived Leetcode puzzles. Instead, we collaborate on a realistic, bounded exercise that mirrors our daily work—such as auditing an agent trace, writing a test harness, or hardening a Debian environment.',
  },
  {
    step: 'STEP 04',
    title: 'Offer & Transparent Terms',
    timing: 'Sub-48hr Turnaround',
    icon: FileCheck2,
    description:
      'We move decisively. You will receive an offer with clear compensation, equity breakdown, equipment stipend details, and mutual expectations. No artificial negotiating games.',
  },
];

export default function CareersHiringProcessSection() {
  return (
    <section className="relative z-20 w-full py-24 sm:py-32 bg-[#09090b] text-white border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-3">
            TRANSPARENT EVALUATION
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-4">
            How We Evaluate Candidates.
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-400 leading-relaxed font-normal">
            We hold our interview process to the same deterministic standards we bring to our client benchmarks: fast feedback, zero unnecessary bureaucracy, and deep respect for your time.
          </p>
        </div>

        {/* 4-Step Process Rail */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="relative p-7 rounded-md bg-neutral-950 border border-neutral-800/90 flex flex-col justify-between hover:border-neutral-700 transition-colors shadow-lg"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                      {step.step}
                    </span>
                    <span className="font-mono text-[11px] text-neutral-500">
                      {step.timing}
                    </span>
                  </div>

                  <div className="w-9 h-9 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white mb-5">
                    <Icon className="w-4 h-4" />
                  </div>

                  <h3 className="font-display font-bold text-xl text-white mb-3 tracking-tight">
                    {step.title}
                  </h3>

                  <p className="font-sans text-sm text-neutral-400 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-900 font-mono text-[11px] text-neutral-400">
                  <span>✓ Direct senior practitioner loop</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
