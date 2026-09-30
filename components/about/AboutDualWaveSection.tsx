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
    code: 'GOV_AUDIT_2026',
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
    domain: 'Proprietary Foundation Models',
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
  const centerCardRef = useRef<HTMLDivElement>(null);
  const [focusedIdx, setFocusedIdx] = useState<number>(0);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const leftCol = leftColRef.current;
      const rightCol = rightColRef.current;
      const centerCard = centerCardRef.current;
      if (!wrapper || !leftCol || !rightCol) return;

      const leftTexts = gsap.utils.toArray<HTMLElement>(
        leftCol.querySelectorAll('.wave-item-left')
      );
      const rightTexts = gsap.utils.toArray<HTMLElement>(
        rightCol.querySelectorAll('.wave-item-right')
      );

      if (!leftTexts.length || !rightTexts.length) return;

      const waveNumber = 0.65;
      const waveSpeed = 1.25;

      const leftQuickSetters = leftTexts.map((el) =>
        gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power4.out' })
      );
      const rightQuickSetters = rightTexts.map((el) =>
        gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power4.out' })
      );

      let leftRange = { minX: 0, maxX: 120 };
      let rightRange = { minX: 0, maxX: 120 };

      const calculateRanges = () => {
        const maxLeftW = Math.max(...leftTexts.map((t) => t.offsetWidth));
        const maxRightW = Math.max(...rightTexts.map((t) => t.offsetWidth));

        leftRange = {
          minX: 0,
          maxX: Math.max(20, Math.min(180, leftCol.offsetWidth - maxLeftW)),
        };
        rightRange = {
          minX: 0,
          maxX: Math.max(20, Math.min(180, rightCol.offsetWidth - maxRightW)),
        };
      };

      const computeWaveX = (
        index: number,
        progress: number,
        minX: number,
        rangeSize: number
      ) => {
        const phase =
          waveNumber * index + waveSpeed * progress * Math.PI * 2 - Math.PI / 2;
        const wave = Math.sin(phase);
        const cycleProgress = (wave + 1) / 2;
        return minX + cycleProgress * rangeSize;
      };

      const setInitialPositions = () => {
        const lSize = leftRange.maxX - leftRange.minX;
        const rSize = rightRange.maxX - rightRange.minX;

        leftTexts.forEach((el, idx) => {
          gsap.set(el, { x: computeWaveX(idx, 0, leftRange.minX, lSize) });
        });
        rightTexts.forEach((el, idx) => {
          gsap.set(el, { x: -computeWaveX(idx, 0, rightRange.minX, rSize) });
        });
      };

      calculateRanges();
      setInitialPositions();

      const findClosestToCenter = () => {
        const viewportCenter = window.innerHeight / 2;
        let closest = 0;
        let minDist = Infinity;

        leftTexts.forEach((el, idx) => {
          const rect = el.getBoundingClientRect();
          const center = rect.top + rect.height / 2;
          const dist = Math.abs(center - viewportCenter);
          if (dist < minDist) {
            minDist = dist;
            closest = idx;
          }
        });

        return closest;
      };

      const st = ScrollTrigger.create({
        trigger: wrapper,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const progress = self.progress;
          const closest = findClosestToCenter();
          setFocusedIdx(closest);

          const lSize = leftRange.maxX - leftRange.minX;
          const rSize = rightRange.maxX - rightRange.minX;

          leftTexts.forEach((_, idx) => {
            const x = computeWaveX(idx, progress, leftRange.minX, lSize);
            leftQuickSetters[idx](x);
          });

          rightTexts.forEach((_, idx) => {
            const x = -computeWaveX(idx, progress, rightRange.minX, rSize);
            rightQuickSetters[idx](x);
          });

          if (centerCard) {
            const wrapperRect = wrapper.getBoundingClientRect();
            const viewportCenter = window.innerHeight / 2;
            const cardH = centerCard.offsetHeight;
            const wrapperH = wrapper.offsetHeight;

            const idealY = viewportCenter - wrapperRect.top - cardH / 2;
            const minY = 0;
            const maxY = Math.max(0, wrapperH - cardH);
            const clampedY = Math.max(minY, Math.min(maxY, idealY));

            gsap.set(centerCard, { y: clampedY });
          }
        },
      });

      const onResize = () => {
        calculateRanges();
      };
      window.addEventListener('resize', onResize);

      return () => {
        st.kill();
        window.removeEventListener('resize', onResize);
      };
    },
    { scope: sectionRef }
  );

  const activePair = WAVE_PAIRS[focusedIdx] || WAVE_PAIRS[0];

  return (
    <section
      ref={sectionRef}
      className="relative z-20 w-full bg-[#09090b] text-white py-24 sm:py-32 border-b border-neutral-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-10 mb-14 border-b border-neutral-800/80 gap-4">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-2">
              02 // FULL-SPECTRUM COVERAGE
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Core Disciplines Meets Critical Enterprise Domains.
            </h2>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
            <span className="text-white font-bold">
              PAIR {activePair.id}
            </span>
            <span>/</span>
            <span>{String(WAVE_PAIRS.length).padStart(2, '0')}</span>
            <span className="text-neutral-500 ml-1 hidden sm:inline">
              [DUAL-WAVE TELEMETRY]
            </span>
          </div>
        </div>

        {/* Dual-Wave Interactive Wrapper (Adapted from codrops-tutorial-text-animation-main) */}
        <div
          ref={wrapperRef}
          className="relative w-full flex flex-row justify-between items-start gap-6 lg:gap-[24vw] py-10 select-none"
        >
          {/* Left Wave Column: Core Disciplines */}
          <div
            ref={leftColRef}
            className="flex-1 flex flex-col items-start gap-6 sm:gap-8 relative z-20"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500 mb-2 block">
              ← ASSURANCE DISCIPLINES
            </span>
            {WAVE_PAIRS.map((item, idx) => {
              const isFocused = idx === focusedIdx;
              return (
                <div
                  key={item.id}
                  className={`wave-item-left w-max font-display font-extrabold text-lg sm:text-2xl lg:text-3xl uppercase tracking-tight leading-none transition-colors duration-300 will-change-transform ${
                    isFocused ? 'text-white' : 'text-neutral-700 hover:text-neutral-500'
                  }`}
                >
                  <span className="font-mono text-[10px] sm:text-xs mr-2.5 align-middle opacity-60">
                    {item.id}
                  </span>
                  {item.discipline}
                </div>
              );
            })}
          </div>

          {/* Center Synchronized Inspection Card (Desktop) */}
          <div className="hidden lg:flex absolute top-0 left-1/2 -translate-x-1/2 w-[280px] xl:w-[310px] z-10 pointer-events-none justify-center">
            <div
              ref={centerCardRef}
              className="w-full rounded-md border border-white/20 bg-neutral-950/90 backdrop-blur-xl p-4 shadow-2xl shadow-black will-change-transform"
            >
              <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-neutral-800 font-mono text-[10px]">
                <span className="text-neutral-400">{activePair.code}</span>
                <span className="px-1.5 py-0.5 rounded-sm bg-white text-black font-bold">
                  ACTIVE #{activePair.id}
                </span>
              </div>

              <div className="relative w-full h-40 rounded-sm overflow-hidden mb-3.5 border border-neutral-800">
                <Image
                  src={activePair.image}
                  alt={activePair.discipline}
                  fill
                  sizes="310px"
                  className="object-cover object-center grayscale contrast-125 brightness-90 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-300 block">
                    VERIFIED TARGET
                  </span>
                  <span className="font-display font-bold text-sm text-white leading-tight block">
                    {activePair.domain}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 font-mono text-[11px]">
                <span className="text-neutral-500">BENCHMARK:</span>
                <span className="text-white font-semibold">{activePair.metric}</span>
              </div>
            </div>
          </div>

          {/* Right Wave Column: Enterprise Domains */}
          <div
            ref={rightColRef}
            className="flex-1 flex flex-col items-end text-right gap-6 sm:gap-8 relative z-20"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500 mb-2 block">
              PRODUCTION DOMAINS →
            </span>
            {WAVE_PAIRS.map((item, idx) => {
              const isFocused = idx === focusedIdx;
              return (
                <div
                  key={item.id}
                  className={`wave-item-right w-max font-display font-bold text-lg sm:text-2xl lg:text-3xl uppercase tracking-tight leading-none transition-colors duration-300 will-change-transform ${
                    isFocused ? 'text-neutral-200' : 'text-neutral-800 hover:text-neutral-600'
                  }`}
                >
                  {item.domain}
                  <span className="font-mono text-[10px] sm:text-xs ml-2.5 align-middle opacity-60">
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
