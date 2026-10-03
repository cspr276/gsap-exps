'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Eye, MessageSquareCode, Laptop, FileCheck2 } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Grainient = dynamic(() => import('@/components/Grainient'), { ssr: false });

const STEPS = [
  {
    step: 'STEP 01',
    title: 'Work & Packet Review',
    timing: '2-3 Business Days',
    icon: Eye,
    description:
      'Every application is reviewed directly by an active engineer or domain lead—never an automated keyword parser. We prioritize actual code samples, deployed systems, papers, and demonstrated craft over pedigree.',
    invariant: '100% human-practitioner triage',
  },
  {
    step: 'STEP 02',
    title: 'Technical Discussion',
    timing: '45-60 Minutes',
    icon: MessageSquareCode,
    description:
      'A practical architectural conversation with the team you will work with. We discuss your past projects, edge-case debugging stories, trade-offs in evaluation systems, and how you approach ambiguous engineering challenges.',
    invariant: 'Practical systems discussion',
  },
  {
    step: 'STEP 03',
    title: 'Calibrated Working Trial',
    timing: 'Paid · 3-4 Hours',
    icon: Laptop,
    description:
      'No contrived Leetcode puzzles. Instead, we collaborate on a realistic, bounded exercise that mirrors our daily work—such as auditing an agent trace, writing a test harness, or hardening a Debian environment.',
    invariant: 'Realistic production task',
  },
  {
    step: 'STEP 04',
    title: 'Offer & Transparent Terms',
    timing: 'Sub-48hr Turnaround',
    icon: FileCheck2,
    description:
      'We move decisively. You will receive an offer with clear compensation, equity breakdown, equipment stipend details, and mutual expectations. No artificial negotiating games.',
    invariant: 'Direct terms & fast start',
  },
];

export default function CareersHiringProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;

      const cards = gsap.utils.toArray<HTMLElement>('.eval-step-card', grid);
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0.15 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              end: 'top 58%',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-20 w-full py-24 sm:py-32 bg-[#09090b] text-white border-b border-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-3">
            HOW WE EVALUATE
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-4">
            A Respectful, Deterministic Hiring Process.
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-400 leading-relaxed font-normal">
            We hold our interview process to the same standards we bring to client benchmarks: fast feedback, zero unnecessary bureaucracy, and deep respect for your time.
          </p>
        </div>

        {/* 4-Step Segmented Process Rail: No gap, divide lines, bare icons in same line as top, slight Grainient shaders */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 rounded-md border border-neutral-800 divide-y md:divide-y-0 md:divide-x divide-neutral-800 bg-neutral-950 overflow-hidden shadow-2xl"
        >
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="eval-step-card group relative p-8 sm:p-9 flex flex-col justify-between overflow-hidden will-change-transform hover:bg-neutral-900/30 transition-colors"
              >
                {/* Subtle Monochrome Grainient Shader Background */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-45 group-hover:opacity-70 transition-opacity duration-700">
                  <Grainient
                    color1="#000000"
                    color2="#1e1e22"
                    color3="#3a3a42"
                    saturation={0}
                    timeSpeed={0.14}
                    warpStrength={0.55}
                    grainAmount={0.06}
                    contrast={1.25}
                  />
                </div>

                {/* Dark Vignette Overlay for Readability */}
                <div className="absolute inset-0 z-1 pointer-events-none bg-linear-to-t from-neutral-950/95 via-neutral-950/50 to-neutral-950/75" />

                <div className="relative z-10">
                  {/* Top Line: Step label on left, bare icon on right in the same line */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs uppercase tracking-wider text-neutral-300 font-semibold">
                      {step.step}
                    </span>
                    <Icon className="w-5 h-5 text-neutral-300 group-hover:text-white transition-colors" />
                  </div>

                  <h3 className="font-display font-bold text-xl text-white mb-2 tracking-tight">
                    {step.title}
                  </h3>

                  <span className="font-mono text-xs text-neutral-400 block mb-5">
                    {step.timing}
                  </span>

                  <p className="font-sans text-sm text-neutral-300 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="relative z-10 mt-8 pt-4 border-t border-neutral-800/80 font-mono text-[11px] text-neutral-400">
                  <span>✓ {step.invariant}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
