'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Sparkles, ArrowRight, ShieldCheck, GitMerge, FileSearch, RefreshCw } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PROCESS_STEPS = [
  {
    number: '01',
    icon: FileSearch,
    title: 'Rubric Design',
    desc: 'We define what "good" means with your domain experts — task-grounded rubrics, scoring criteria, and gold-standard reference sets calibrated against business requirements.',
    detail: 'Gold-Standard Calibrations'
  },
  {
    number: '02',
    icon: ShieldCheck,
    title: 'Adversarial Suite Construction',
    desc: 'We construct custom benchmark and red-team suites: zero-day jailbreaks, prompt injections, and failure taxonomies mapped directly to severity bands.',
    detail: 'P0 - P4 Failure Taxonomies'
  },
  {
    number: '03',
    icon: GitMerge,
    title: 'Expert Review & Adjudication',
    desc: 'Vetted domain specialists score every output against the rubric; disagreements are adjudicated under consensus protocols and inter-rater agreement is recorded.',
    detail: 'Triple-Blind Review Protocol'
  },
  {
    number: '04',
    icon: RefreshCw,
    title: 'Continuous Regression Monitoring',
    desc: 'Evidence-backed attestation reports and severity-graded findings with automated canary runs every time your foundation models, prompts, or weights evolve.',
    detail: '24/7 Automated Delta Tracking'
  }
];

export default function DeliveryProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      // Animate connecting progress line as user scrolls through the steps
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              end: 'bottom 85%',
              scrub: 0.5
            }
          }
        );
      }

      // Stagger in steps
      stepsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative w-full bg-neutral-950 text-white py-28 sm:py-36 px-6 sm:px-12 lg:px-20 border-t border-neutral-800 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-neutral-800/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-3xl mb-16 sm:mb-24">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-neutral-400" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400">
              HOW WE DELIVER
            </span>
          </div>
          <h2 className="font-display font-semibold text-2xl sm:text-3xl md:text-5xl text-white tracking-tight leading-[1.1] mb-5">
            From Discovery to Delivery and Beyond.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
            A battle-tested evaluation framework delivering decision-grade confidence at every phase of your AI system lifecycle.
          </p>
        </div>

        {/* 4 Steps Flow with vertical timeline connection */}
        <div className="relative">
          {/* Vertical connecting line on desktop */}
          <div className="hidden lg:block absolute left-8 top-6 bottom-6 w-px bg-neutral-800 pointer-events-none">
            <div
              ref={lineRef}
              className="w-full h-full bg-gradient-to-b from-white via-neutral-300 to-neutral-600 origin-top will-change-transform"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:pl-20">
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  ref={(el) => {
                    stepsRef.current[idx] = el;
                  }}
                  className="group relative rounded-lg border border-neutral-800/90 bg-[#121215]/90 hover:bg-[#15151a] hover:border-neutral-700 transition-all duration-300 p-7 sm:p-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl shadow-black/40"
                >
                  {/* Step indicator node */}
                  <div className="hidden lg:flex absolute -left-20 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-neutral-700 bg-neutral-900 items-center justify-center text-xs font-mono font-bold text-white group-hover:border-white transition-colors">
                    {step.number}
                  </div>

                  <div className="flex-1 max-w-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="lg:hidden text-xs font-mono font-bold text-neutral-400">
                        STEP {step.number}
                      </span>
                      <span className="lg:hidden w-1.5 h-1.5 rounded-full bg-neutral-600" />
                      <h3 className="font-display font-semibold text-xl sm:text-2xl text-white tracking-tight">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-neutral-400 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>

                  {/* Micro Detail Chip */}
                  <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-neutral-800 bg-neutral-900/80 font-mono text-xs text-neutral-300">
                      <Icon className="w-3.5 h-3.5 text-neutral-400" />
                      {step.detail}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-neutral-800">
          <span className="font-mono text-xs text-neutral-400">
            Have custom models or specialized evaluation requirements?
          </span>
          <Link
            href="#cta"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-wider uppercase text-neutral-300 hover:text-white transition-colors"
          >
            <span>Initiate Evaluation Engagement</span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
