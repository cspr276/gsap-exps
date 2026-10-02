'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface WavePair {
  id: string;
  discipline: string;
  domain: string;
  code: string;
  metric: string;
  image: string;
}

const WAVE_PAIRS: WavePair[] = [
  {
    id: '01',
    discipline: 'Agent Benchmarking',
    domain: 'Autonomous ERP & Finance',
    code: 'EVAL_SUITE_v4.2',
    metric: '0.00% Numerical Variance',
    image: '/services/ai-agent-evaluation.webp',
  },
  {
    id: '02',
    discipline: 'Adversarial Red-Team',
    domain: 'Clinical & Healthcare AI',
    code: 'REDTEAM_VECTOR_09',
    metric: '100% Jailbreak Containment',
    image: '/services/reality-01.jpg',
  },
  {
    id: '03',
    discipline: 'Runtime Guardrails',
    domain: 'Legal & Regulatory Ops',
    code: 'INGRESS_SHIELD_LIVE',
    metric: '< 12ms Detection Latency',
    image: '/services/reality-02.jpg',
  },
  {
    id: '04',
    discipline: 'Regression Telemetry',
    domain: 'Enterprise DevSecOps',
    code: 'CI_CD_GATE_88',
    metric: 'Zero Silent Drift Escapes',
    image: '/services/benchmarking-frameworks.webp',
  },
  {
    id: '05',
    discipline: 'Calibrated RLHF',
    domain: 'Sovereign Defense Systems',
    code: 'EXPERT_ALIGN_v3',
    metric: 'Krippendorff α = 0.94',
    image: '/cards/card_04.jpg',
  },
  {
    id: '06',
    discipline: 'Gold-Standard Data',
    domain: 'Global Banking & Treasury',
    code: 'CORPUS_CERTIFIED',
    metric: 'Triple-Blind Verified',
    image: '/cards/card_05.jpg',
  },
  {
    id: '07',
    discipline: 'Readiness & Risk Audit',
    domain: 'Multi-Agent Swarms',
    code: 'SWARM_GOV_2026',
    metric: '4-Tier Severity Matrix',
    image: '/cards/card_06.jpg',
  },
  {
    id: '08',
    discipline: 'Sandbox Verification',
    domain: 'Cloud Infrastructure',
    code: 'WASM_ISOLATION',
    metric: 'Deterministic State Proof',
    image: '/cards/card_07.jpg',
  },
  {
    id: '09',
    discipline: 'Prompt Injection Defense',
    domain: 'Customer Operations',
    code: 'EXFIL_BLOCK_v2',
    metric: '99.98% Payload Recall',
    image: '/cards/card_08.jpg',
  },
  {
    id: '10',
    discipline: 'Schema Execution Audit',
    domain: 'Supply Chain Automation',
    code: 'TOOL_CALL_SPEC',
    metric: '100% Idempotent Calls',
    image: '/services/reality-03.jpg',
  },
  {
    id: '11',
    discipline: 'Long-Horizon Drift',
    domain: 'Quantitative Research',
    code: 'CONTEXT_128K_EVAL',
    metric: 'Multi-Turn Stability',
    image: '/services/hero-datacenter.jpg',
  },
  {
    id: '12',
    discipline: 'Fine-Tuning Loops',
    domain: 'Foundation Models',
    code: 'SFT_PREFERENCE_01',
    metric: '+18.4% Task Pass Rate',
    image: '/services/ai-agent-evaluation.webp',
  },
];

// Clean harmonic curve offsets (in px) for the 12 items.
// Maximum displacement is bounded to 45px so text never encroaches into the center column.
const CURVE_OFFSETS = [0, 8, 26, 41, 44, 32, 13, 2, 5, 20, 38, 45];

export default function AboutDualWaveSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const centerThumbRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [focusedIdx, setFocusedIdx] = useState<number>(0);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const centerThumb = centerThumbRef.current;
      if (!wrapper) return;

      const scrollTrigger = ScrollTrigger.create({
        trigger: wrapper,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: () => {
          const viewportCenter = window.innerHeight / 2;
          let closestIndex = 0;
          let minDistance = Infinity;

          // Find which row is closest to viewport center
          rowRefs.current.forEach((el, idx) => {
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const rowCenter = rect.top + rect.height / 2;
            const dist = Math.abs(rowCenter - viewportCenter);
            if (dist < minDistance) {
              minDistance = dist;
              closestIndex = idx;
            }
          });

          setFocusedIdx(closestIndex);

          // Smoothly track center thumbnail so it stays centered in viewport alongside active row
          if (centerThumb) {
            const wrapperRect = wrapper.getBoundingClientRect();
            const thumbHeight = centerThumb.offsetHeight;
            const wrapperHeight = wrapper.offsetHeight;

            const idealY = viewportCenter - wrapperRect.top - thumbHeight / 2;
            const minY = 0;
            const maxY = Math.max(0, wrapperHeight - thumbHeight);
            const clampedY = Math.max(minY, Math.min(maxY, idealY));

            gsap.set(centerThumb, { y: clampedY });
          }
        },
      });

      return () => {
        scrollTrigger.kill();
      };
    },
    { scope: sectionRef }
  );

  const activePair = WAVE_PAIRS[focusedIdx] || WAVE_PAIRS[0];

  return (
    <section
      ref={sectionRef}
      className="relative z-20 w-full bg-[#09090b] text-white py-20 sm:py-28 border-b border-neutral-900 overflow-hidden"
    >
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-10 border-b border-neutral-800/80 gap-4">
          <div className="max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-2">
              02 // FULL-SPECTRUM COVERAGE
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Core Disciplines Meets Critical Enterprise Domains.
            </h2>
          </div>
        </div>

        {/* Column Navigation Sub-header (Row-Aligned) */}
        <div className="grid grid-cols-2 lg:grid-cols-12 items-center text-neutral-500 font-mono text-[11px] uppercase tracking-[0.22em] pb-6 mb-6 border-b border-neutral-800/50 select-none">
          <div className="col-span-1 lg:col-span-5 flex items-center gap-2">
            <span className="text-neutral-400">←</span>
            <span>ASSURANCE DISCIPLINES</span>
          </div>
          <div className="hidden lg:block lg:col-span-2 text-center text-neutral-600 text-[10px] tracking-widest">
            // DUAL-WAVE MAPPING
          </div>
          <div className="col-span-1 lg:col-span-5 flex items-center justify-end gap-2">
            <span>PRODUCTION DOMAINS</span>
            <span className="text-neutral-400">→</span>
          </div>
        </div>

        {/* Dual-Wave Synchronized Rows Container */}
        <div
          ref={wrapperRef}
          className="relative w-full flex flex-col gap-4 sm:gap-6 lg:gap-7 py-4 select-none"
        >
          {WAVE_PAIRS.map((item, idx) => {
            const isFocused = idx === focusedIdx;
            const curveOffset = CURVE_OFFSETS[idx] || 0;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  rowRefs.current[idx] = el;
                }}
                className="grid grid-cols-2 lg:grid-cols-12 items-center w-full min-h-[44px] sm:min-h-[50px] lg:min-h-[56px]"
              >
                {/* Left Discipline Column: curves inward towards center (bounded to 45px, safely clear of center image) */}
                <div className="col-span-1 lg:col-span-5 flex items-center justify-start overflow-visible pr-2 sm:pr-4">
                  <div
                    className={`whitespace-nowrap font-display uppercase tracking-tight text-sm sm:text-xl lg:text-2xl xl:text-3xl transition-all duration-300 will-change-transform ${
                      isFocused
                        ? 'text-white font-extrabold scale-[1.02] drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]'
                        : 'text-neutral-500 font-medium opacity-50 hover:opacity-80'
                    }`}
                    style={{ transform: `translateX(${curveOffset}px)` }}
                  >
                    <span
                      className={`font-mono text-[11px] sm:text-xs mr-2 sm:mr-3 align-middle transition-opacity duration-300 ${
                        isFocused ? 'text-white opacity-100' : 'text-neutral-600 opacity-60'
                      }`}
                    >
                      {item.id}
                    </span>
                    {item.discipline}
                  </div>
                </div>

                {/* Center Column Spacer: Reserved space for the floating portrait poster */}
                <div className="hidden lg:block lg:col-span-2 pointer-events-none" />

                {/* Right Domain Column: curves inward towards center (bounded to -45px, safely clear of center image) */}
                <div className="col-span-1 lg:col-span-5 flex items-center justify-end overflow-visible pl-2 sm:pr-4">
                  <div
                    className={`whitespace-nowrap font-display uppercase tracking-tight text-sm sm:text-xl lg:text-2xl xl:text-3xl transition-all duration-300 will-change-transform ${
                      isFocused
                        ? 'text-white font-extrabold scale-[1.02] drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]'
                        : 'text-neutral-500 font-medium opacity-50 hover:opacity-80'
                    }`}
                    style={{ transform: `translateX(${-curveOffset}px)` }}
                  >
                    {item.domain}
                    <span
                      className={`font-mono text-[11px] sm:text-xs ml-2 sm:ml-3 align-middle transition-opacity duration-300 ${
                        isFocused ? 'text-white opacity-100' : 'text-neutral-600 opacity-60'
                      }`}
                    >
                      {item.id}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Center Floating Visual Poster (Dedicated Center Zone with Safe Clearance) */}
          <div
            ref={centerThumbRef}
            className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-[220px] xl:w-[250px] aspect-[3/4] z-10 pointer-events-none will-change-transform"
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/15 bg-neutral-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]">
              <Image
                src={activePair.image}
                alt={activePair.discipline}
                fill
                sizes="(max-width: 1280px) 220px, 250px"
                className="object-cover object-center grayscale contrast-125 brightness-90 transition-opacity duration-300"
              />
              {/* Sleek bottom gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

              {/* Minimal overlaid telemetry label inside image */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1 pointer-events-none">
                <div className="flex items-center justify-between font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
                  <span>{activePair.code}</span>
                  <span className="text-white/80 font-bold">#{activePair.id}</span>
                </div>
                <span className="font-display font-bold text-sm text-white leading-tight block truncate">
                  {activePair.domain}
                </span>
                <span className="font-mono text-[11px] text-neutral-300 block">
                  {activePair.metric}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
