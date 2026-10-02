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

export default function AboutDualWaveSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const centerThumbRef = useRef<HTMLDivElement>(null);
  const [focusedIdx, setFocusedIdx] = useState<number>(0);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const leftCol = leftColRef.current;
      const rightCol = rightColRef.current;
      const centerThumb = centerThumbRef.current;
      if (!wrapper || !leftCol || !rightCol) return;

      const leftTexts = gsap.utils.toArray<HTMLElement>(
        leftCol.querySelectorAll('.animated-wave-text')
      );
      const rightTexts = gsap.utils.toArray<HTMLElement>(
        rightCol.querySelectorAll('.animated-wave-text')
      );

      if (!leftTexts.length || !rightTexts.length) return;

      // Harmonic wave frequency tailored for 12 items:
      // Math.PI / 4 (~0.785 rad/step) yields an 8-item full wavelength.
      // Across 12 items, this paints 1.5 complete, organic harmonic cycles (crest -> trough -> crest).
      const waveFrequency = Math.PI / 4;
      const waveSpeed = 1.0;

      // Quick-to setters for buttery 60fps tracking
      const leftQuickSetters = leftTexts.map((el) =>
        gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power4.out' })
      );
      const rightQuickSetters = rightTexts.map((el) =>
        gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power4.out' })
      );

      let leftRange = { minX: 0, maxX: 160 };
      let rightRange = { minX: 0, maxX: 160 };

      const calculateRanges = () => {
        const maxLeftW = Math.max(...leftTexts.map((t) => t.offsetWidth));
        const maxRightW = Math.max(...rightTexts.map((t) => t.offsetWidth));

        const leftAvail = leftCol.offsetWidth - maxLeftW;
        const rightAvail = rightCol.offsetWidth - maxRightW;

        // Ensure a healthy, prominent wave amplitude (between 120px and 220px on desktop)
        const targetAmp = Math.min(220, Math.max(80, window.innerWidth * 0.13));
        leftRange = {
          minX: 0,
          maxX: leftAvail > 60 ? Math.min(leftAvail, targetAmp) : targetAmp,
        };
        rightRange = {
          minX: 0,
          maxX: rightAvail > 60 ? Math.min(rightAvail, targetAmp) : targetAmp,
        };
      };

      const calculateWavePosition = (
        index: number,
        progress: number,
        minX: number,
        rangeSize: number
      ) => {
        const phase =
          waveFrequency * index +
          waveSpeed * progress * Math.PI * 2 -
          Math.PI / 2;
        const wave = Math.sin(phase);
        const cycleProgress = (wave + 1) / 2;
        return minX + cycleProgress * rangeSize;
      };

      const setInitialPositions = () => {
        const lSize = leftRange.maxX - leftRange.minX;
        const rSize = rightRange.maxX - rightRange.minX;

        leftTexts.forEach((el, idx) => {
          const x = calculateWavePosition(idx, 0, leftRange.minX, lSize) * 1;
          gsap.set(el, { x });
        });
        rightTexts.forEach((el, idx) => {
          const x = calculateWavePosition(idx, 0, rightRange.minX, rSize) * -1;
          gsap.set(el, { x });
        });
      };

      calculateRanges();
      setInitialPositions();

      const findClosestToViewportCenter = () => {
        const viewportCenter = window.innerHeight / 2;
        let closestIndex = 0;
        let minDistance = Infinity;

        leftTexts.forEach((text, index) => {
          const rect = text.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const distance = Math.abs(elementCenter - viewportCenter);

          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        });

        return closestIndex;
      };

      const scrollTrigger = ScrollTrigger.create({
        trigger: wrapper,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const progress = self.progress;
          const closestIndex = findClosestToViewportCenter();
          setFocusedIdx(closestIndex);

          const lSize = leftRange.maxX - leftRange.minX;
          const rSize = rightRange.maxX - rightRange.minX;

          // Left column: curves inward towards center (multiplier = 1)
          leftTexts.forEach((text, index) => {
            const finalX =
              calculateWavePosition(index, progress, leftRange.minX, lSize) * 1;
            leftQuickSetters[index](finalX);
          });

          // Right column: curves inward towards center (multiplier = -1)
          rightTexts.forEach((text, index) => {
            const finalX =
              calculateWavePosition(index, progress, rightRange.minX, rSize) * -1;
            rightQuickSetters[index](finalX);
          });

          // Smoothly track center thumbnail in viewport center
          if (centerThumb) {
            const wrapperRect = wrapper.getBoundingClientRect();
            const viewportCenter = window.innerHeight / 2;
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

      const handleResize = () => {
        calculateRanges();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        scrollTrigger.kill();
        window.removeEventListener('resize', handleResize);
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

        {/* Column Navigation Indicators (Dedicated Sub-header row for exact row alignment) */}
        <div className="flex flex-row justify-between items-center text-neutral-500 font-mono text-[11px] uppercase tracking-[0.22em] pb-6 mb-6 border-b border-neutral-800/50 select-none">
          <div className="flex items-center gap-2">
            <span className="text-neutral-400">←</span>
            <span>ASSURANCE DISCIPLINES</span>
          </div>
          <div className="hidden lg:block text-neutral-600 text-[10px] tracking-widest">
            // DUAL-WAVE HARMONIC MAPPING
          </div>
          <div className="flex items-center gap-2">
            <span>PRODUCTION DOMAINS</span>
            <span className="text-neutral-400">→</span>
          </div>
        </div>

        {/* Dual-Wave Interactive Canvas */}
        <div
          ref={wrapperRef}
          className="relative w-full flex flex-row justify-between items-start gap-8 lg:gap-[20vw] xl:gap-[24vw] py-4 select-none"
        >
          {/* Left Wave Column: Core Disciplines */}
          <div
            ref={leftColRef}
            className="flex-1 flex flex-col items-start gap-4 sm:gap-6 lg:gap-7 relative z-20"
          >
            {WAVE_PAIRS.map((item, idx) => {
              const isFocused = idx === focusedIdx;
              return (
                <div
                  key={item.id}
                  className={`animated-wave-text w-max whitespace-nowrap h-11 sm:h-12 lg:h-14 flex items-center font-display uppercase tracking-tight leading-none text-base sm:text-2xl lg:text-3xl transition-colors duration-300 will-change-transform ${
                    isFocused
                      ? 'text-white font-extrabold z-10'
                      : 'text-neutral-600 font-medium hover:text-neutral-400'
                  }`}
                >
                  <span
                    className={`font-mono text-[11px] sm:text-xs mr-3 align-middle transition-opacity duration-300 ${
                      isFocused ? 'text-white opacity-100' : 'text-neutral-600 opacity-60'
                    }`}
                  >
                    {item.id}
                  </span>
                  {item.discipline}
                </div>
              );
            })}
          </div>

          {/* Center Floating Visual Poster (Clean Image with Bottom Overlay) */}
          <div
            ref={centerThumbRef}
            className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-[230px] xl:w-[270px] 2xl:w-[290px] aspect-[3/4] z-10 pointer-events-none will-change-transform"
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/15 bg-neutral-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]">
              <Image
                src={activePair.image}
                alt={activePair.discipline}
                fill
                sizes="(max-width: 1280px) 270px, 290px"
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

          {/* Right Wave Column: Enterprise Domains */}
          <div
            ref={rightColRef}
            className="flex-1 flex flex-col items-end text-right gap-4 sm:gap-6 lg:gap-7 relative z-20"
          >
            {WAVE_PAIRS.map((item, idx) => {
              const isFocused = idx === focusedIdx;
              return (
                <div
                  key={item.id}
                  className={`animated-wave-text w-max whitespace-nowrap h-11 sm:h-12 lg:h-14 flex items-center justify-end font-display uppercase tracking-tight leading-none text-base sm:text-2xl lg:text-3xl transition-colors duration-300 will-change-transform ${
                    isFocused
                      ? 'text-white font-extrabold z-10'
                      : 'text-neutral-600 font-medium hover:text-neutral-400'
                  }`}
                >
                  {item.domain}
                  <span
                    className={`font-mono text-[11px] sm:text-xs ml-3 align-middle transition-opacity duration-300 ${
                      isFocused ? 'text-white opacity-100' : 'text-neutral-600 opacity-60'
                    }`}
                  >
                    {item.id}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
