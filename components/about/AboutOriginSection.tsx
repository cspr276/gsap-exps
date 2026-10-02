'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, ShieldCheck, Cpu, Scale } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ParadigmSlab {
  id: string;
  pillar: string;
  legacyTitle: string;
  legacyDesc: string;
  evalixaTitle: string;
  evalixaDesc: string;
  metricLabel: string;
  metricValue: string;
  icon: React.ElementType;
}

const PARADIGM_SLABS: ParadigmSlab[] = [
  {
    id: '01',
    pillar: 'BENCHMARKING FOUNDATIONS',
    legacyTitle: 'Contaminated Academic Leaderboards',
    legacyDesc:
      'Static public datasets (MMLU, GSM8K) bear zero resemblance to enterprise APIs, dynamic database schemas, or multi-turn stateful tool executions.',
    evalixaTitle: 'Task-Grounded Production Invariants',
    evalixaDesc:
      'Deterministic pass/fail test harnesses compiled directly from real enterprise logs, tool execution schemas, and long-horizon failure modes.',
    metricLabel: 'DETERMINISTIC FIDELITY',
    metricValue: '100% Invariant Coverage',
    icon: Cpu,
  },
  {
    id: '02',
    pillar: 'ADVERSARIAL SECURITY',
    legacyTitle: 'Single-Turn Prompt Filters',
    legacyDesc:
      'Surface-level regex and heuristic classifiers that instantly collapse when confronted with multi-turn context manipulation, indirect injection, and privilege escalation.',
    evalixaTitle: 'Adaptive Multi-Horizon Red-Teaming',
    evalixaDesc:
      'Autonomous exploit chains and credentialed offensive researchers continuously stressing tool-call boundaries inside isolated execution sandboxes.',
    metricLabel: 'THREAT CONTAINMENT',
    metricValue: 'Zero Exploit Escapes',
    icon: ShieldCheck,
  },
  {
    id: '03',
    pillar: 'CALIBRATED HUMAN OVERSIGHT',
    legacyTitle: 'Uncalibrated Crowdworkers & LLM Judges',
    legacyDesc:
      'Noisy, non-expert annotators and unverified LLM-as-a-judge pipelines that hallucinate rubrics and drift silently across model checkpoint iterations.',
    evalixaTitle: 'Triple-Blind Domain Specialists',
    evalixaDesc:
      'Credentialed attorneys, clinicians, and quantitative analysts adjudicated with rigorous mathematical inter-rater agreement and cryptographic trace ledgers.',
    metricLabel: 'INTER-RATER AGREEMENT',
    metricValue: 'Krippendorff α = 0.94',
    icon: Scale,
  },
];

export default function AboutOriginSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const getScrollDistance = () => {
          const cards = track.children;
          if (cards.length > 1) {
            const lastCard = cards[cards.length - 1] as HTMLElement;
            return lastCard.offsetLeft - 60;
          }
          return 1800;
        };

        gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: 'top top',
            end: () => `+=${getScrollDistance()}`,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="origin"
      ref={sectionRef}
      className="relative z-20 w-full min-h-screen bg-white text-neutral-950 pt-16 sm:pt-20 lg:pt-24 pb-12 flex flex-col justify-between overflow-hidden border-b border-neutral-200"
    >
      {/* Section Header */}
      <div className="px-4 sm:px-8 lg:px-16 max-w-5xl flex-shrink-0">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-sm bg-neutral-950 text-white uppercase tracking-widest">
            01 // ARCHITECTURAL MANIFESTO
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold">
            THE PARADIGM SHIFT
          </span>
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl text-neutral-950 tracking-tight leading-tight mb-2">
          From Subjective Vibes to Deterministic Proof.
        </h2>
        <p className="font-sans text-xs sm:text-sm lg:text-base text-neutral-600 max-w-2xl leading-relaxed">
          Autonomous intelligence demands an assurance layer grounded in strict invariants, not subjective optimism. Pan through our three foundational paradigm shifts.
        </p>
      </div>

      {/* Horizontal Pinned Track */}
      <div className="relative w-full overflow-x-auto lg:overflow-visible pl-4 sm:pl-8 lg:pl-16 mt-8 sm:mt-10 pb-6 flex-1 flex items-center">
        <div
          ref={trackRef}
          className="flex flex-row items-stretch gap-6 sm:gap-8 will-change-transform w-fit pr-16"
        >
          {PARADIGM_SLABS.map((slab) => {
            const Icon = slab.icon;
            return (
              <div
                key={slab.id}
                className="w-[88vw] sm:w-[540px] lg:w-[600px] h-[480px] sm:h-[500px] flex-shrink-0 rounded-xl border border-neutral-200 bg-[#fafafa] p-7 sm:p-8 flex flex-col justify-between shadow-sm hover:border-neutral-900 transition-all duration-300"
              >
                <div>
                  {/* Slab Header */}
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-200">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-neutral-950 bg-neutral-200/80 px-2 py-0.5 rounded-sm">
                        #{slab.id}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-600 font-semibold">
                        {slab.pillar}
                      </span>
                    </div>
                    <Icon className="w-4 h-4 text-neutral-400" />
                  </div>

                  {/* Legacy Industry Flaw */}
                  <div className="mb-5 p-4 rounded-md bg-neutral-100/90 border border-neutral-200/70">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">
                        LEGACY DEFAULT // DEPRECATED
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                    </div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-neutral-600 line-through decoration-neutral-400 mb-1">
                      {slab.legacyTitle}
                    </h3>
                    <p className="font-sans text-xs text-neutral-500 leading-relaxed">
                      {slab.legacyDesc}
                    </p>
                  </div>

                  {/* The Evalixa Standard */}
                  <div className="p-4 rounded-md bg-white border border-neutral-900 shadow-sm">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-950 font-bold">
                        THE EVALIXA STANDARD // ACTIVE
                      </span>
                      <span className="w-2 h-2 rounded-full bg-neutral-950 animate-pulse" />
                    </div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-neutral-950 mb-1.5">
                      {slab.evalixaTitle}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                      {slab.evalixaDesc}
                    </p>
                  </div>
                </div>

                {/* Bottom Assurance Metric Bar */}
                <div className="pt-4 border-t border-neutral-200 flex items-center justify-between font-mono text-[11px]">
                  <span className="text-neutral-500 uppercase tracking-wider">
                    {slab.metricLabel}
                  </span>
                  <span className="font-bold text-neutral-950 bg-white px-3 py-1 rounded-sm border border-neutral-300 shadow-xs">
                    {slab.metricValue}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Anchor Manifesto Slab */}
          <div className="w-[88vw] sm:w-[500px] lg:w-[540px] h-[480px] sm:h-[500px] flex-shrink-0 rounded-xl border border-neutral-900 bg-neutral-950 text-white p-7 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-800">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                  CORE ENGINEERING CONVICTION
                </span>
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              </div>

              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.2em] block mb-2">
                ASSURANCE INVARIANT #00
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-tight mb-4">
                "If an autonomous system can execute actions in the physical or financial world, its safety boundary must be mathematically verifiable."
              </h3>
              <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                Academic benchmarks score average answers. Evalixa certifies worst-case exploit resilience across high-stakes autonomous operations.
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between font-mono text-xs">
              <span className="text-neutral-400 uppercase tracking-wider">REGRESSION SLA</span>
              <span className="text-white font-bold bg-neutral-900 px-3 py-1 rounded-sm border border-neutral-700">
                &lt; 24hr Triage
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
