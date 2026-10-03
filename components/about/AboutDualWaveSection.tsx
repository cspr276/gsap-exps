'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// PART 1: DIAGONAL ORBITAL IMAGES CONFIGURATION (10 spaced items)
// ─────────────────────────────────────────────────────────────────────────────
interface OrbitItem {
  id: string;
  image: string;
  title: string;
  baseSize: number; // in px
}

const ORBIT_ITEMS: OrbitItem[] = [
  { id: 'o1', image: '/services/reality-01.jpg', title: 'Clinical Diagnostics', baseSize: 88 },
  { id: 'o2', image: '/services/hero-datacenter.jpg', title: 'Compute Clusters', baseSize: 88 },
  { id: 'o3', image: '/cards/card_06.jpg', title: 'Orbital Telemetry', baseSize: 88 },
  { id: 'o4', image: '/services/reality-02.jpg', title: 'Silicon Hardware', baseSize: 88 },
  { id: 'o5', image: '/services/ai-agent-evaluation.webp', title: 'Autonomous Systems', baseSize: 88 },
  { id: 'o6', image: '/cards/card_04.jpg', title: 'Simulation Physics', baseSize: 88 },
  { id: 'o7', image: '/services/reality-03.jpg', title: 'Robotics & Vision', baseSize: 88 },
  { id: 'o8', image: '/cards/card_05.jpg', title: 'Cryptographic Security', baseSize: 88 },
  { id: 'o9', image: '/services/benchmarking-frameworks.webp', title: 'Empirical Metrics', baseSize: 88 },
  { id: 'o10', image: '/cards/card_07.jpg', title: 'WASM Sandboxes', baseSize: 88 },
  { id: 'o11', image: '/cards/card_08.jpg', title: 'Optical Sensors', baseSize: 88 },
  { id: 'o12', image: '/services/hero-bg.webp', title: 'Frontier Neural Models', baseSize: 88 },
];

// ─────────────────────────────────────────────────────────────────────────────
// PART 2: DUAL WAVE MATRIX (Uniform Reduced Height Center Image)
// ─────────────────────────────────────────────────────────────────────────────
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
    image: '/services/hero-bg.webp',
  },
];

// Clean symmetric harmonic curve offsets (in px) for the 12 items.
// Starts and ends at the exact same point (0px), arching inward symmetrically up to 44px.
const CURVE_OFFSETS = [0, 12, 24, 34, 41, 44, 44, 41, 34, 24, 12, 0];

export default function AboutDualWaveSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const orbitItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const centerThumbRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [focusedIdx, setFocusedIdx] = useState<number>(0);

  // Responsive radii for diagonal ellipse closely framing headline
  const [orbitRadii, setOrbitRadii] = useState({ rx: 495, ry: 240 });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setOrbitRadii({ rx: 185, ry: 145 });
      } else if (width < 1024) {
        setOrbitRadii({ rx: 355, ry: 185 });
      } else {
        setOrbitRadii({ rx: 495, ry: 240 });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Continuous, smooth orbital rotation decoupled completely from scroll
  useEffect(() => {
    let reqId: number;
    let angle = 0;
    let lastTime = performance.now();
    const totalItems = ORBIT_ITEMS.length;

    // Diagonal tilt: -18 degrees (slanted diagonally from bottom-left up to top-right like reference image)
    const TILT_RAD = (-18 * Math.PI) / 180;
    const cosTilt = Math.cos(TILT_RAD);
    const sinTilt = Math.sin(TILT_RAD);

    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      // Slightly increased angular velocity: ~0.13 rad/s for fluid, responsive orbit
      angle += dt * 0.13;

      const { rx, ry } = orbitRadii;

      orbitItemsRef.current.forEach((el, index) => {
        if (!el) return;

        const baseAngle = (index / totalItems) * Math.PI * 2;
        const theta = baseAngle + angle;

        // Position on horizontal ellipse
        const x0 = rx * Math.cos(theta);
        const y0 = ry * Math.sin(theta);

        // Rotate by diagonal tilt
        const x = x0 * cosTilt - y0 * sinTilt;
        const y = x0 * sinTilt + y0 * cosTilt;

        // Perspective sizing:
        // Comparatively large at left side (x < 0), decreasing as it goes to right (x > 0),
        // and increasing as it comes back to left.
        const nx = Math.max(-1, Math.min(1, x / rx));
        const progress = (1 - nx) / 2; // 1.0 at far left, 0.0 at far right

        // Scale: from 0.46x (small on right) up to 1.04x (harmonious on left with generous clearance)
        const scale = 0.46 + progress * 0.58;
        const opacity = 0.65 + progress * 0.35;
        const zIndex = Math.round(progress * 30) + 1;

        el.style.transform = `translate3d(calc(-50% + ${x.toFixed(1)}px), calc(-50% + ${y.toFixed(1)}px), 0px) scale(${scale.toFixed(3)})`;
        el.style.opacity = `${opacity.toFixed(2)}`;
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
          PART 1: DIAGONAL OVAL ROTATION SECTION
          Balanced height, 10 spaced images, relevant 2-line heading
          ───────────────────────────────────────────────────────────── */}
      <div className="relative w-full min-h-[86vh] sm:min-h-[92vh] lg:min-h-[96vh] flex items-center justify-center overflow-hidden py-24 sm:py-32 border-b border-neutral-900/60">
        {/* Subtle radial ambient spotlight */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)]" />

        {/* Orbit Track Container: Images revolve smoothly on a diagonal elliptical path */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {ORBIT_ITEMS.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                orbitItemsRef.current[index] = el;
              }}
              className="absolute top-1/2 left-1/2 will-change-transform pointer-events-auto"
            >
              <div
                style={{
                  width: `${Math.round(item.baseSize * (orbitRadii.rx / 495))}px`,
                  height: `${Math.round(item.baseSize * (orbitRadii.rx / 495))}px`,
                }}
                className="relative rounded-lg overflow-hidden bg-neutral-900 shadow-[0_12px_28px_rgba(0,0,0,0.7)] transition-transform duration-200"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="160px"
                  className="object-cover object-center"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Center Content: Strictly 2-line headline directly contextualizing the matrix */}
        <div className="relative z-30 max-w-4xl mx-auto px-4 text-center pointer-events-auto">
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-[50px] text-white tracking-tight leading-[1.16] drop-shadow-md">
            <span className="block whitespace-nowrap">Autonomous Systems Assurance</span>
            <span className="block whitespace-nowrap text-neutral-400 font-bold mt-1.5">
              Verified Across Production Domains
            </span>
          </h2>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          PART 2: DUAL WAVE SYNCHRONIZED MATRIX (Reduced Image Height)
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

                  {/* Center Column Spacer: Reserved space for the floating poster */}
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

            {/* Center Floating Visual Poster (Reduced Height aspect-[4/3]) */}
            <div
              ref={centerThumbRef}
              className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-[220px] xl:w-[240px] aspect-[4/3] z-10 pointer-events-none will-change-transform"
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/15 bg-neutral-950 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9)]">
                <Image
                  src={activePair.image}
                  alt={activePair.discipline}
                  fill
                  sizes="(max-width: 1280px) 220px, 240px"
                  className="object-cover object-center brightness-90 transition-opacity duration-300"
                />
                {/* Sleek bottom gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

                {/* Minimal overlaid telemetry label inside image */}
                <div className="absolute bottom-3 left-3.5 right-3.5 flex flex-col gap-0.5 pointer-events-none">
                  <span className="font-display font-bold text-xs sm:text-sm text-white leading-tight block truncate">
                    {activePair.domain}
                  </span>
                  <span className="font-mono text-[10px] sm:text-[11px] text-neutral-300 block">
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
