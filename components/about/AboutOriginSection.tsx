'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ParadigmItem {
  id: string;
  category: string;
  headline: string;
  desc: string;
  metricLabel: string;
  metricValue: string;
}

const MANIFESTO_PART1 =
  'Foundation models have evolved from passive text generators into autonomous agents capable of mutating databases, executing transactions, and governing critical operations.';

const MANIFESTO_PART2 =
  'Autonomous systems demand deterministic, adversarial, and human-calibrated proof before they touch production.';

const PARADIGM_ITEMS: ParadigmItem[] = [
  {
    id: '01',
    category: 'INVARIANT BENCHMARKING',
    headline: 'Deterministic Verification Replaces Static Academic Benchmarks.',
    desc: 'Static public datasets like MMLU or GSM8K bear zero resemblance to enterprise APIs or production workflows. We compile deterministic pass/fail harnesses directly from live tool schemas, state transitions, and historical edge cases.',
    metricLabel: 'Coverage',
    metricValue: '100% Invariant Verification',
  },
  {
    id: '02',
    category: 'ADVERSARIAL RED-TEAMING',
    headline: 'Multi-Turn Exploit Chains Expose Deep Systemic Vulnerabilities.',
    desc: 'Surface-level prompt filters collapse under complex multi-turn context attacks. Our autonomous exploit engines and credentialed offensive researchers continuously stress tool-call boundaries, jailbreak vectors, and privilege escalation in isolated sandboxes.',
    metricLabel: 'Containment',
    metricValue: 'Zero Exploit Escapes',
  },
  {
    id: '03',
    category: 'HUMAN-IN-THE-LOOP CALIBRATION',
    headline: 'Triple-Blind Domain Specialists Ground Ambiguous Decisions.',
    desc: 'Uncalibrated crowdworkers and self-judging LLMs suffer from silent rubric drift. Credentialed attorneys, clinicians, and financial analysts adjudicate complex agent reasoning traces with verified mathematical inter-rater agreement.',
    metricLabel: 'Agreement',
    metricValue: 'Krippendorff α = 0.94',
  },
];

export default function AboutOriginSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);

  const wordsPart1 = MANIFESTO_PART1.split(' ');
  const wordsPart2 = MANIFESTO_PART2.split(' ');

  useGSAP(
    () => {
      const el = manifestoRef.current;
      if (!el) return;

      const words = el.querySelectorAll('.manifesto-word');
      const mm = gsap.matchMedia();

      // Progressive scrubbed word illumination (inspired by OnScrollTypographyAnimations Fx16)
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          words,
          {
            opacity: 0.18,
            y: 5,
          },
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            stagger: 0.04,
            scrollTrigger: {
              trigger: el,
              start: 'top 82%',
              end: 'bottom 45%',
              scrub: 0.5,
            },
          }
        );
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(words, { opacity: 1, y: 0 });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="origin"
      className="relative z-20 w-full bg-white text-neutral-950 py-20 sm:py-28 border-b border-neutral-200 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-4xl pb-8 mb-12 border-b border-neutral-200">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold block mb-3">
              01 // ARCHITECTURAL MANIFESTO
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-neutral-950 tracking-tight leading-tight">
              From Subjective Vibes to Deterministic Proof.
            </h2>
          </motion.div>
        </div>

        {/* Narrative Manifesto Statement with Fx16 Progressive Scroll Illumination */}
        <div ref={manifestoRef} className="max-w-4xl mb-14 sm:mb-16 select-none">
          <p className="font-display font-medium text-xl sm:text-2xl lg:text-[28px] text-neutral-800 leading-[1.38] tracking-tight">
            {wordsPart1.map((word, i) => (
              <span
                key={`p1-${i}`}
                className="manifesto-word inline-block mr-[0.28em] will-change-[transform,opacity]"
              >
                {word}
              </span>
            ))}
            <span className="block mt-3 text-neutral-950 font-bold">
              {wordsPart2.map((word, i) => (
                <span
                  key={`p2-${i}`}
                  className="manifesto-word inline-block mr-[0.28em] will-change-[transform,opacity]"
                >
                  {word}
                </span>
              ))}
            </span>
          </p>
        </div>

        {/* 3 Clean Editorial Cards matching ManifestoSection style */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {PARADIGM_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-md border border-neutral-200/90 bg-[#fafafa] hover:bg-white hover:border-neutral-400 hover:shadow-md transition-all duration-300 p-7 sm:p-8 flex flex-col justify-between shadow-xs"
            >
              <div>
                {/* Clean Top Row: Index + Category */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-neutral-200">
                  <span className="font-mono text-xs font-bold text-neutral-900">
                    {item.id}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 font-semibold">
                    {item.category}
                  </span>
                </div>

                {/* Headline */}
                <h3 className="font-display font-bold text-base sm:text-lg text-neutral-950 tracking-tight leading-snug mb-3">
                  {item.headline}
                </h3>

                {/* Description */}
                <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              {/* Clean Metric Baseline (No nested boxes, no pills) */}
              <div className="mt-8 pt-4 border-t border-neutral-200/80 flex items-center justify-between font-mono text-xs">
                <span className="text-neutral-500 uppercase tracking-wider text-[11px]">
                  {item.metricLabel}
                </span>
                <span className="font-semibold text-neutral-950">
                  {item.metricValue}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
