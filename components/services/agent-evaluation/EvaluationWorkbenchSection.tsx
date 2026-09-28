'use client';

import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Dither = dynamic(() => import('@/components/Dither'), { ssr: false });
const Grainient = dynamic(() => import('@/components/Grainient'), { ssr: false });

interface LayerPillar {
  id: string;
  step: string;
  layerNum: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  specs: string[];
  ditherColor: [number, number, number];
  grainientColors: { color1: string; color2: string; color3: string };
  telemetry: {
    file: string;
    badge: string;
    entries: { label: string; value: string; highlight?: boolean }[];
  };
}

const LAYERS: LayerPillar[] = [
  {
    id: 'rubrics',
    step: 'PILLAR 01',
    layerNum: 'LAYER 01 / TOP STRATA',
    title: 'Task Grounding & Domain Rubrics',
    shortTitle: 'Domain Task Rubric Matrix',
    subtitle: 'Extracting realistic evaluation suites from enterprise traffic',
    description:
      'We work with your engineers and domain specialists to construct tasks derived directly from real production logs. Every scenario defines strict acceptance criteria, gold-standard reference responses, and non-negotiable edge cases.',
    specs: ['Task-grounded rubrics', 'Multi-turn branching graphs', 'Gold-standard reference sets'],
    ditherColor: [0.82, 0.84, 0.88],
    grainientColors: { color1: '#09090b', color2: '#18181b', color3: '#27272a' },
    telemetry: {
      file: 'task_rubric_financial_reconciliation.json',
      badge: 'RUBRIC SPEC v2.4',
      entries: [
        { label: 'OBJECTIVE', value: '"Reconcile cross-border transaction discrepancies against ERP"' },
        { label: 'GOLD_STANDARD', value: '{ "variance_threshold": 0.00, "disallow_rounding": true }' },
        { label: 'STATUS', value: 'CALIBRATED BY SENIOR TREASURY SPECIALISTS [CERTIFIED]', highlight: true },
      ],
    },
  },
  {
    id: 'verifiers',
    step: 'PILLAR 02',
    layerNum: 'LAYER 02 / EXECUTION STRATA',
    title: 'Programmatic Sandbox Verifiers',
    shortTitle: 'Deterministic Sandbox Verifiers',
    subtitle: 'Asserting end-state database mutations and environmental invariants',
    description:
      'Subjective judgment is insufficient for mission-critical tooling. Our verifiers execute inside isolated sandboxes to assert programmatic state changes: did the agent update the right database row, maintain transactional integrity, and leave unrelated states intact?',
    specs: ['Isolated Docker/WASM sandboxes', 'End-state invariant checking', 'Idempotency verification'],
    ditherColor: [0.75, 0.78, 0.82],
    grainientColors: { color1: '#0b0c0e', color2: '#191b20', color3: '#2a2d36' },
    telemetry: {
      file: 'verifier_sandbox_runner.py',
      badge: 'ENVIRONMENT RUNNER',
      entries: [
        { label: 'ENVIRONMENT', value: 'IsolatedEnvironment.spawn(snapshot="erp_prod_clone_104")' },
        { label: 'ASSERTION', value: 'sandbox.db.invariants_preserved() == True' },
        { label: 'RESULT', value: 'ALL 14 HARD ASSERTIONS PASSED [0 REGRESSIONS]', highlight: true },
      ],
    },
  },
  {
    id: 'judges',
    step: 'PILLAR 03',
    layerNum: 'LAYER 03 / CONSENSUS STRATA',
    title: 'Calibrated Human-in-the-Loop',
    shortTitle: 'Specialist Adjudication Panel',
    subtitle: 'Vetted domain specialists adjudicating ambiguous reasoning paths',
    description:
      'When outputs cannot be validated deterministically, we deploy a vetted network of domain specialists (attorneys, clinical practitioners, financial analysts). Disagreements are adjudicated and inter-rater agreement is mathematically tracked.',
    specs: ['Krippendorff’s Alpha tracking', 'Triple-blind expert scoring', 'Adjudicated dispute traces'],
    ditherColor: [0.88, 0.88, 0.92],
    grainientColors: { color1: '#0d0d10', color2: '#1b1c22', color3: '#31333d' },
    telemetry: {
      file: 'adjudication_panel_telemetry.json',
      badge: 'INTER-RATER CALIBRATION',
      entries: [
        { label: 'PANEL_SIZE', value: '3 Independent Calibrated Domain Evaluators' },
        { label: 'AGREEMENT', value: 'Krippendorff α = 0.942 [Statistically Certified]', highlight: true },
        { label: 'DISPUTE_TRACE', value: '"Dispute resolved: Ambiguity in regulatory clause 4.2"' },
      ],
    },
  },
  {
    id: 'gates',
    step: 'PILLAR 04',
    layerNum: 'LAYER 04 / BASE STRATA',
    title: 'Automated CI/CD Release Gates',
    shortTitle: 'Continuous CI/CD Release Gate',
    subtitle: 'Continuous regression evaluation on every model and prompt deploy',
    description:
      'Every confirmed failure mode is permanently converted into an automated regression unit test. As foundation models release updates, prompts are refined, or tool schemas evolve, our release gate blocks silent quality degradation.',
    specs: ['Automated PR blocking', 'Statistical regression deltas', 'Production canary monitoring'],
    ditherColor: [0.8, 0.82, 0.85],
    grainientColors: { color1: '#0f1013', color2: '#1e2026', color3: '#363944' },
    telemetry: {
      file: 'evalixa_release_gate_summary.log',
      badge: 'CI/CD RELEASE GATE',
      entries: [
        { label: 'EVAL_RUN', value: 'Candidate: mistral-large-v2-tuned vs Baseline: prod-v1.8' },
        { label: 'DELTA_SECURITY', value: '0.0% prompt-injection escape rate [100% Containment]', highlight: true },
        { label: 'DECISION', value: 'DEPLOYMENT APPROVED — RELEASE GATE PASSED [0 ESCAPES]', highlight: true },
      ],
    },
  },
];

export default function EvaluationWorkbenchSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const laserLineRef = useRef<HTMLDivElement>(null);
  const stackStageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Standard vertical spacing coordinates for 3D stack explosion
  const baseZValues = [150, 50, -50, -150];

  useGSAP(
    () => {
      const section = sectionRef.current;
      const laser = laserLineRef.current;
      const stackStage = stackStageRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const totalPillars = LAYERS.length;
        const scrollDistance = 2400; // 600px of scroll per layer

        // Pin the workbench section while user scrolls through the 4 3D layers
        const st = ScrollTrigger.create({
          id: 'workbench-pin',
          trigger: section,
          start: 'top top',
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;

            // Animate laser track line on the left
            if (laser) {
              gsap.set(laser, { scaleY: p });
            }

            // Subtle 3D breathing rotation for the stack as you scroll
            if (stackStage) {
              const rotX = 52 + p * 6; // 52deg -> 58deg
              const rotZ = -26 + p * 4; // -26deg -> -22deg
              gsap.set(stackStage, {
                transform: `rotateX(${rotX}deg) rotateZ(${rotZ}deg)`,
              });
            }

            // Calculate active layer index based on scroll position
            const newIndex = Math.min(totalPillars - 1, Math.floor(p * totalPillars));
            setActiveIndex(newIndex);
          },
        });

        return () => {
          st.kill();
        };
      });
    },
    { scope: sectionRef }
  );

  const handlePillarClick = (index: number) => {
    setActiveIndex(index);

    const st = ScrollTrigger.getById('workbench-pin');
    if (st) {
      const stepProgress = (index + 0.15) / LAYERS.length;
      const targetScroll = st.start + stepProgress * (st.end - st.start);
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.scrollTo(targetScroll, { duration: 1.0 });
      } else {
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="workbench"
      className="relative w-full min-h-screen lg:h-screen flex flex-col justify-center py-10 sm:py-12 lg:py-6 bg-[#09090b] text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center my-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-6 gap-3">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-1.5">
              EVALUATION ENGINE ARCHITECTURE
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
              Engineered for Precision. Built for Auditable Decisions.
            </h2>
          </div>

          {/* Desktop Scroll Progress Indicator */}
          <div className="hidden lg:flex items-center gap-2 text-neutral-400 font-mono text-xs pb-1">
            <span className="text-white font-bold">LAYER {String(activeIndex + 1).padStart(2, '0')}</span>
            <span>/</span>
            <span>04</span>
            <span className="text-neutral-500 ml-2 text-[11px]">(Scroll to explode architecture)</span>
          </div>
        </div>

        {/* 2-Column Layout: Left Navigation + Right 3D Exploded Layer Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: 4 Pillar Navigation Cards with Vertical Laser Rail */}
          <div ref={leftColRef} className="lg:col-span-5 relative flex flex-col justify-between space-y-2">
            {/* Ambient Background Track for Laser Line (Desktop) */}
            <div className="hidden lg:block absolute left-[-14px] top-2 bottom-2 w-[2px] bg-neutral-800 rounded-full overflow-hidden">
              <div
                ref={laserLineRef}
                className="w-full h-full bg-white origin-top"
                style={{ transform: 'scaleY(0)' }}
              />
            </div>

            {LAYERS.map((pillar, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => handlePillarClick(idx)}
                  className={`group relative overflow-hidden w-full text-left p-3.5 sm:p-4 rounded-md border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'border-white/40 bg-neutral-900/90 shadow-xl shadow-black/80 text-white'
                      : 'bg-neutral-900/30 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/60 text-neutral-400'
                  }`}
                >
                  {/* Monochromatic Fluid Grain Shader Background on Active Card */}
                  {isActive && (
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-90">
                      <Grainient
                        color1={pillar.grainientColors.color1}
                        color2={pillar.grainientColors.color2}
                        color3={pillar.grainientColors.color3}
                        timeSpeed={0.2}
                        warpStrength={0.45}
                        grainAmount={0.07}
                        contrast={1.12}
                      />
                      <div className="absolute inset-0 bg-neutral-950/40 pointer-events-none" />
                    </div>
                  )}

                  <div className="relative z-10 flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <span
                        className={`font-mono text-[10px] uppercase tracking-wider font-bold block mb-1 transition-colors ${
                          isActive ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-400'
                        }`}
                      >
                        {pillar.step}
                      </span>
                      <h3
                        className={`font-display font-bold text-sm sm:text-base mb-0.5 transition-colors ${
                          isActive ? 'text-white' : 'text-neutral-300 group-hover:text-white'
                        }`}
                      >
                        {pillar.title}
                      </h3>
                      <p
                        className={`font-sans text-xs line-clamp-2 leading-relaxed transition-colors ${
                          isActive ? 'text-neutral-200' : 'text-neutral-400'
                        }`}
                      >
                        {pillar.subtitle}
                      </p>
                    </div>

                    <div className="shrink-0 pt-0.5 font-mono text-[11px] text-neutral-500">
                      0{idx + 1}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: 3D Exploded Architecture Layer Stack (Centerpiece Animation) */}
          <div className="lg:col-span-7 relative rounded-md border border-neutral-800 bg-[#0c0d10] overflow-hidden min-h-[460px] sm:min-h-[500px] lg:min-h-[520px] shadow-2xl shadow-black flex items-center justify-center p-4 sm:p-6 lg:p-8">
            {/* Ambient Monochromatic Dither Background Canvas */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
              <Dither
                waveSpeed={0.03}
                waveFrequency={2.2}
                waveAmplitude={0.25}
                waveColor={LAYERS[activeIndex].ditherColor}
                backgroundColor={[0.04, 0.04, 0.05]}
                colorNum={4}
                pixelSize={2}
                enableMouseInteraction={false}
              />
            </div>

            {/* Depth vignette */}
            <div className="absolute inset-0 z-[1] pointer-events-none bg-radial-gradient from-transparent via-neutral-950/40 to-neutral-950/90" />

            {/* Top HUD Overlay within Chassis */}
            <div className="absolute top-4 left-5 right-5 z-20 flex items-center justify-between pointer-events-none text-[11px] font-mono border-b border-white/10 pb-2 text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">3D ARCHITECTURAL STRATA</span>
                <span>/</span>
                <span className="text-neutral-400">{LAYERS[activeIndex].shortTitle}</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-white/10 text-white border border-white/20 text-[10px] font-bold">
                {LAYERS[activeIndex].telemetry.badge}
              </span>
            </div>

            {/* 3D Isometric Viewport */}
            <div
              className="relative z-10 w-full h-[380px] sm:h-[420px] flex items-center justify-center select-none"
              style={{ perspective: '1100px' }}
            >
              {/* Master 3D Rotational Chassis */}
              <div
                ref={stackStageRef}
                className="relative w-[340px] sm:w-[440px] lg:w-[480px] h-[180px] sm:h-[200px] transition-transform duration-700 ease-out"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'rotateX(52deg) rotateZ(-26deg)',
                }}
              >
                {/* Central Laser Telemetry Axis passing vertically through all 4 plates */}
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-[340px] bg-gradient-to-t from-white/10 via-white to-white/10 pointer-events-none origin-center"
                  style={{
                    transform: 'rotateX(90deg) translateY(-50%)',
                    transformStyle: 'preserve-3d',
                  }}
                />

                {/* The 4 3D Floating Plates */}
                {LAYERS.map((layer, idx) => {
                  const isActive = activeIndex === idx;
                  const baseZ = baseZValues[idx];
                  // When active, the plate elevates forward in 3D relief toward camera
                  const currentZ = isActive ? baseZ + 45 : baseZ;
                  const scale = isActive ? 1.04 : 0.98;

                  return (
                    <div
                      key={layer.id}
                      onClick={() => handlePillarClick(idx)}
                      className={`absolute inset-0 rounded-md border transition-all duration-500 ease-out cursor-pointer flex flex-col justify-between p-4 sm:p-5 ${
                        isActive
                          ? 'border-white/90 bg-[#16171b]/95 shadow-[0_0_40px_rgba(255,255,255,0.2)] opacity-100'
                          : 'border-white/15 bg-[#0e0f12]/80 backdrop-blur-md opacity-45 hover:opacity-75 hover:border-white/40'
                      }`}
                      style={{
                        transform: `translate3d(0, 0, ${currentZ}px) scale(${scale})`,
                        transformStyle: 'preserve-3d',
                        zIndex: isActive ? 40 : 10 + idx,
                      }}
                    >
                      {/* Plate Top Bar */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-mono text-[10px] sm:text-[11px] font-bold tracking-wider ${
                              isActive ? 'text-white' : 'text-neutral-400'
                            }`}
                          >
                            {layer.layerNum}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-neutral-400 uppercase">
                          {layer.step}
                        </span>
                      </div>

                      {/* Plate Main Title & Telemetry Payload */}
                      <div className="my-1.5 sm:my-2">
                        <h4
                          className={`font-display font-bold text-sm sm:text-base tracking-tight mb-1 ${
                            isActive ? 'text-white' : 'text-neutral-300'
                          }`}
                        >
                          {layer.shortTitle}
                        </h4>

                        {/* Live Telemetry Rows: Expanded when active */}
                        {isActive ? (
                          <div className="space-y-1 font-mono text-[10px] sm:text-[11px] bg-black/60 rounded p-2 border border-white/10 mt-2">
                            {layer.telemetry.entries.map((entry, eIdx) => (
                              <div key={eIdx} className="flex items-center gap-2 truncate">
                                <span className="text-neutral-500 shrink-0">{entry.label}:</span>
                                <span
                                  className={`truncate ${
                                    entry.highlight ? 'text-white font-bold' : 'text-neutral-300'
                                  }`}
                                >
                                  {entry.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="font-sans text-[11px] text-neutral-400 line-clamp-1">
                            {layer.subtitle}
                          </p>
                        )}
                      </div>

                      {/* Plate Bottom Footer */}
                      <div className="flex items-center justify-between pt-1.5 border-t border-white/10 text-[10px] font-mono text-neutral-400">
                        <div className="flex items-center gap-1.5">
                          <span className="text-neutral-500">—</span>
                          <span className="truncate">{layer.specs[0]}</span>
                        </div>
                        <span className={isActive ? 'text-white font-bold' : 'text-neutral-500'}>
                          {isActive ? '[ACTIVE TELEMETRY]' : '[INSPECT]'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
