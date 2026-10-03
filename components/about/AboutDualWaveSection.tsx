'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// PART 1: ORBITAL IMAGES CONFIGURATION (Oval rotation around center headline)
// ─────────────────────────────────────────────────────────────────────────────
interface OrbitItem {
  id: string;
  image: string;
  title: string;
  baseSize: number; // in px on desktop
}

const ORBIT_ITEMS: OrbitItem[] = [
  { id: 'o1', image: '/services/reality-01.jpg', title: 'Clinical Diagnostics', baseSize: 110 },
  { id: 'o2', image: '/services/hero-datacenter.jpg', title: 'Compute Clusters', baseSize: 75 },
  { id: 'o3', image: '/cards/card_06.jpg', title: 'Orbital Telemetry', baseSize: 95 },
  { id: 'o4', image: '/services/reality-02.jpg', title: 'Silicon Hardware', baseSize: 70 },
  { id: 'o5', image: '/services/ai-agent-evaluation.webp', title: 'Autonomous Systems', baseSize: 115 },
  { id: 'o6', image: '/cards/card_04.jpg', title: 'Simulation Physics', baseSize: 85 },
  { id: 'o7', image: '/services/reality-03.jpg', title: 'Robotics & Vision', baseSize: 105 },
  { id: 'o8', image: '/cards/card_05.jpg', title: 'Cryptographic Security', baseSize: 75 },
  { id: 'o9', image: '/services/benchmarking-frameworks.webp', title: 'Empirical Metrics', baseSize: 100 },
  { id: 'o10', image: '/cards/card_07.jpg', title: 'WASM Sandboxes', baseSize: 70 },
  { id: 'o11', image: '/cards/card_08.jpg', title: 'Optical Sensors', baseSize: 90 },
  { id: 'o12', image: '/services/hero-bg.webp', title: 'Frontier Neural Models', baseSize: 80 },
];

// ─────────────────────────────────────────────────────────────────────────────
// PART 2: DUAL WAVE MATRIX WITH VARIABLE IMAGE SIZES
// ─────────────────────────────────────────────────────────────────────────────
interface WavePair {
  id: string;
  discipline: string;
  domain: string;
  code: string;
  metric: string;
  image: string;
  aspectClass: string;
  widthClass: string;
}

const WAVE_PAIRS: WavePair[] = [
  {
    id: '01',
    discipline: 'Agent Benchmarking',
    domain: 'Autonomous ERP & Finance',
    code: 'EVAL_SUITE_v4.2',
    metric: '0.00% Numerical Variance',
    image: '/services/ai-agent-evaluation.webp',
    aspectClass: 'aspect-[16/10]',
    widthClass: 'w-[260px] xl:w-[290px]',
  },
  {
    id: '02',
    discipline: 'Adversarial Red-Team',
    domain: 'Clinical & Healthcare AI',
    code: 'REDTEAM_VECTOR_09',
    metric: '100% Jailbreak Containment',
    image: '/services/reality-01.jpg',
    aspectClass: 'aspect-[3/4]',
    widthClass: 'w-[200px] xl:w-[220px]',
  },
  {
    id: '03',
    discipline: 'Runtime Guardrails',
    domain: 'Legal & Regulatory Ops',
    code: 'INGRESS_SHIELD_LIVE',
    metric: '< 12ms Detection Latency',
    image: '/services/reality-02.jpg',
    aspectClass: 'aspect-square',
    widthClass: 'w-[220px] xl:w-[240px]',
  },
  {
    id: '04',
    discipline: 'Regression Telemetry',
    domain: 'Enterprise DevSecOps',
    code: 'CI_CD_GATE_88',
    metric: 'Zero Silent Drift Escapes',
    image: '/services/benchmarking-frameworks.webp',
    aspectClass: 'aspect-[16/9]',
    widthClass: 'w-[280px] xl:w-[310px]',
  },
  {
    id: '05',
    discipline: 'Calibrated RLHF',
    domain: 'Sovereign Defense Systems',
    code: 'EXPERT_ALIGN_v3',
    metric: 'Krippendorff α = 0.94',
    image: '/cards/card_04.jpg',
    aspectClass: 'aspect-[4/5]',
    widthClass: 'w-[210px] xl:w-[230px]',
  },
  {
    id: '06',
    discipline: 'Gold-Standard Data',
    domain: 'Global Banking & Treasury',
    code: 'CORPUS_CERTIFIED',
    metric: 'Triple-Blind Verified',
    image: '/cards/card_05.jpg',
    aspectClass: 'aspect-square',
    widthClass: 'w-[220px] xl:w-[240px]',
  },
  {
    id: '07',
    discipline: 'Readiness & Risk Audit',
    domain: 'Multi-Agent Swarms',
    code: 'SWARM_GOV_2026',
    metric: '4-Tier Severity Matrix',
    image: '/cards/card_06.jpg',
    aspectClass: 'aspect-[16/9]',
    widthClass: 'w-[280px] xl:w-[310px]',
  },
  {
    id: '08',
    discipline: 'Sandbox Verification',
    domain: 'Cloud Infrastructure',
    code: 'WASM_ISOLATION',
    metric: 'Deterministic State Proof',
    image: '/cards/card_07.jpg',
    aspectClass: 'aspect-[3/4]',
    widthClass: 'w-[200px] xl:w-[220px]',
  },
  {
    id: '09',
    discipline: 'Prompt Injection Defense',
    domain: 'Customer Operations',
    code: 'EXFIL_BLOCK_v2',
    metric: '99.98% Payload Recall',
    image: '/cards/card_08.jpg',
    aspectClass: 'aspect-square',
    widthClass: 'w-[220px] xl:w-[240px]',
  },
  {
    id: '10',
    discipline: 'Schema Execution Audit',
    domain: 'Supply Chain Automation',
    code: 'TOOL_CALL_SPEC',
    metric: '100% Idempotent Calls',
    image: '/services/reality-03.jpg',
    aspectClass: 'aspect-[4/3]',
    widthClass: 'w-[250px] xl:w-[270px]',
  },
  {
    id: '11',
    discipline: 'Long-Horizon Drift',
    domain: 'Quantitative Research',
    code: 'CONTEXT_128K_EVAL',
    metric: 'Multi-Turn Stability',
    image: '/services/hero-datacenter.jpg',
    aspectClass: 'aspect-[16/10]',
    widthClass: 'w-[270px] xl:w-[290px]',
  },
  {
    id: '12',
    discipline: 'Fine-Tuning Loops',
    domain: 'Foundation Models',
    code: 'SFT_PREFERENCE_01',
    metric: '+18.4% Task Pass Rate',
    image: '/services/hero-bg.webp',
    aspectClass: 'aspect-[3/4]',
    widthClass: 'w-[200px] xl:w-[220px]',
  },
];

// Clean symmetric harmonic curve offsets (in px) for the 12 items.
// Starts and ends at the exact same point (0px), peaking symmetrically at 44px in the center.
const CURVE_OFFSETS = [0, 12, 24, 34, 41, 44, 44, 41, 34, 24, 12, 0];

export default function AboutDualWaveSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const orbitItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const centerThumbRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [focusedIdx, setFocusedIdx] = useState<number>(0);

  // Responsive ellipse radii for generous clearance around center headline
  const [orbitRadii, setOrbitRadii] = useState({ rx: 560, ry: 250 });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setOrbitRadii({ rx: 185, ry: 155 });
      } else if (width < 1024) {
        setOrbitRadii({ rx: 360, ry: 195 });
      } else {
        setOrbitRadii({ rx: 560, ry: 250 });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Continuous, smooth orbital rotation (Completely independent of scroll)
  useEffect(() => {
    let reqId: number;
    let angle = 0;
    let lastTime = performance.now();
    const totalItems = ORBIT_ITEMS.length;

    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      // Constant rotational velocity: 0.085 radians per second
      angle += dt * 0.085;

      const { rx, ry } = orbitRadii;

      orbitItemsRef.current.forEach((el, index) => {
        if (!el) return;

        const baseAngle = (index / totalItems) * Math.PI * 2;
        const theta = baseAngle + angle;

        const x = rx * Math.cos(theta);
        const y = ry * Math.sin(theta);

        // Depth perspective based on vertical position
        // When in front (sin > 0), larger scale & opacity. When in back (sin < 0), smaller.
        const depth = (Math.sin(theta) + 1) / 2; // 0 (back) to 1 (front)
        const scale = 0.75 + depth * 0.42; // 0.75 to 1.17
        const opacity = 0.6 + depth * 0.4;
        const zIndex = Math.round(depth * 30);

        el.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0px) scale(${scale})`;
        el.style.opacity = `${opacity}`;
        el.style.zIndex = `${zIndex}`;
      });

      reqId = requestAnimationFrame(tick);
    };

    reqId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(reqId);
  }, [orbitRadii]);

  // Dual Wave scroll tracking & vertical thumbnail alignment
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

          // Track center thumbnail vertically so it stays centered with the active row
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
      className="relative z-20 w-full bg-[#09090b] text-white border-b border-neutral-900 overflow-hidden select-none"
    >
      {/* ─────────────────────────────────────────────────────────────
          PART 1: ELLIPTICAL ORBIT HEADER (Continuous Idle Rotation)
          ───────────────────────────────────────────────────────────── */}
      <div className="relative w-full min-h-[85vh] sm:min-h-[92vh] flex items-center justify-center overflow-hidden py-24 sm:py-32 border-b border-neutral-900/60">
        {/* Subtle radial ambient spotlight */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,transparent_68%)]" />

        {/* Orbit Track Container: Images revolve smoothly on an elliptical path */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {ORBIT_ITEMS.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                orbitItemsRef.current[index] = el;
              }}
              className="absolute top-1/2 left-1/2 will-change-transform pointer-events-auto group cursor-pointer"
            >
              <div
                style={{
                  width: `${Math.round(item.baseSize * (orbitRadii.rx / 560))}px`,
                  height: `${Math.round(item.baseSize * (orbitRadii.rx / 560))}px`,
                }}
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-neutral-900 shadow-[0_16px_36px_rgba(0,0,0,0.85)] transition-all duration-300 group-hover:scale-110 group-hover:border-white/40 group-hover:shadow-black"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="130px"
                  className="object-cover object-center brightness-[0.88] group-hover:brightness-105 transition-[filter] duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Center Content: Headline & Action */}
        <div className="relative z-30 max-w-2xl mx-auto px-4 text-center pointer-events-auto">
          <span className="font-mono text-xs uppercase tracking-[0.28em] text-neutral-400 font-semibold block mb-4">
            FRONTIER INTELLIGENCE &bull; ASSURANCE SUITE
          </span>

          <h2 className="font-display font-medium text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[1.08] mb-6">
            Autonomous Systems
            <br />
            <span className="font-sans font-medium text-white">Verified in </span>
            <span className="font-serif italic font-normal text-[#c7af93]">Production</span>
          </h2>

          <p className="font-sans text-xs sm:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed mb-8">
            From regulated banking and healthcare to sovereign defense and distributed swarms — explore how Evalixa benchmarks and secures autonomous agents.
          </p>

          <a
            href="#wave-matrix"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-xl hover:scale-105 cursor-pointer"
          >
            <span>Explore Matrix</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          PART 2: DUAL WAVE SYNCHRONIZED MATRIX WITH VARIABLE IMAGE SIZES
          ───────────────────────────────────────────────────────────── */}
      <div id="wave-matrix" className="w-full py-20 sm:py-28">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12">
          {/* Sub-header Navigation Bar */}
          <div className="flex justify-between items-center text-neutral-500 font-mono text-[11px] uppercase tracking-[0.22em] pb-6 mb-8 border-b border-neutral-800/60 select-none">
            <div className="flex items-center gap-2">
              <span className="text-neutral-400">&larr;</span>
              <span>ASSURANCE DISCIPLINES</span>
            </div>
            <div className="flex items-center justify-end gap-2">
              <span>PRODUCTION DOMAINS</span>
              <span className="text-neutral-400">&rarr;</span>
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
                  {/* Left Discipline Column: curves inward symmetrically */}
                  <div className="col-span-1 lg:col-span-5 flex items-center justify-start overflow-visible pr-2 sm:pr-4">
                    <div
                      className={`whitespace-nowrap font-display uppercase tracking-tight text-sm sm:text-xl lg:text-2xl xl:text-3xl transition-all duration-300 will-change-transform ${
                        isFocused
                          ? 'text-white font-extrabold scale-[1.02] drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]'
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

                  {/* Center Column Spacer for Floating Variable-Size Poster */}
                  <div className="hidden lg:block lg:col-span-2 pointer-events-none" />

                  {/* Right Domain Column: curves inward symmetrically */}
                  <div className="col-span-1 lg:col-span-5 flex items-center justify-end overflow-visible pl-2 sm:pr-4">
                    <div
                      className={`whitespace-nowrap font-display uppercase tracking-tight text-sm sm:text-xl lg:text-2xl xl:text-3xl transition-all duration-300 will-change-transform ${
                        isFocused
                          ? 'text-white font-extrabold scale-[1.02] drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]'
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

            {/* Center Floating Variable-Size Poster (Adapts dimensions per active item) */}
            <div
              ref={centerThumbRef}
              className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none will-change-transform transition-all duration-300 ease-out"
            >
              <div
                className={`relative rounded-xl overflow-hidden border border-white/15 bg-neutral-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] transition-all duration-300 ${activePair.widthClass} ${activePair.aspectClass}`}
              >
                <Image
                  src={activePair.image}
                  alt={activePair.discipline}
                  fill
                  sizes="340px"
                  className="object-cover object-center brightness-90 transition-opacity duration-300"
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                {/* Overlaid telemetry label */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex flex-col gap-0.5 pointer-events-none">
                  <span className="font-display font-bold text-xs sm:text-sm text-white leading-tight truncate">
                    {activePair.domain}
                  </span>
                  <span className="font-mono text-[10px] text-neutral-300 block">
                    {activePair.metric}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
