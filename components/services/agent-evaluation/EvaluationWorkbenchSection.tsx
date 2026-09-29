'use client';

import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Dither = dynamic(() => import('@/components/Dither'), { ssr: false });
const Grainient = dynamic(() => import('@/components/Grainient'), { ssr: false });

interface Pillar {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  description: string;
  specs: string[];
  ditherColor: [number, number, number];
  grainientColors: { color1: string; color2: string; color3: string };
  codePreview: {
    title: string;
    badge: string;
    lines: { label?: string; code: string; tone?: 'neutral' | 'accent' | 'highlight' }[];
  };
}

// 100% Monochromatic (Obsidian, Graphite, Slate & Platinum Silvers)
const PILLARS: Pillar[] = [
  {
    id: 'rubrics',
    step: 'PILLAR 01',
    title: 'Task Grounding & Domain Rubrics',
    subtitle: 'Extracting realistic evaluation suites from enterprise traffic',
    description:
      'We work with your engineers and domain specialists to construct tasks derived directly from real production logs. Every scenario defines strict acceptance criteria, gold-standard reference responses, and non-negotiable edge cases.',
    specs: ['Task-grounded rubrics', 'Multi-turn branching graphs', 'Gold-standard reference sets'],
    ditherColor: [0.82, 0.84, 0.88], // Platinum Silver
    grainientColors: { color1: '#0b0d12', color2: '#1a202b', color3: '#2d3748' },
    codePreview: {
      title: 'task_rubric_financial_reconciliation.json',
      badge: 'RUBRIC SPEC v2.4',
      lines: [
        { label: 'OBJECTIVE', code: '"Reconcile cross-border transaction discrepancies against ERP"' },
        { label: 'DIMENSIONS', code: '["numerical_accuracy", "compliance_attestation", "audit_trace"]' },
        { label: 'GOLD_STANDARD', code: '{ "variance_threshold": 0.00, "disallow_rounding": true }' },
        { label: 'SEVERITY_BAND', code: '"Tier-1 Blocker (Immediate Release Failure on Mismatch)"', tone: 'highlight' },
        { label: 'STATUS', code: 'CALIBRATED BY SENIOR TREASURY SPECIALISTS [CERTIFIED]', tone: 'accent' },
      ],
    },
  },
  {
    id: 'verifiers',
    step: 'PILLAR 02',
    title: 'Programmatic Sandbox Verifiers',
    subtitle: 'Asserting end-state database mutations and environmental invariants',
    description:
      'Subjective judgment is insufficient for mission-critical tooling. Our verifiers execute inside isolated sandboxes to assert programmatic state changes: did the agent update the right database row, maintain transactional integrity, and leave unrelated states intact?',
    specs: ['Isolated Docker/WASM sandboxes', 'End-state invariant checking', 'Idempotency verification'],
    ditherColor: [0.75, 0.78, 0.82], // Titanium Zinc
    grainientColors: { color1: '#0c0f13', color2: '#19222c', color3: '#2a394a' },
    codePreview: {
      title: 'verifier_sandbox_runner.py',
      badge: 'ENVIRONMENT RUNNER',
      lines: [
        { code: 'sandbox = IsolatedEnvironment.spawn(snapshot="erp_prod_clone_104")' },
        { code: 'trace = agent.execute(task_payload, timeout_sec=45.0)' },
        { code: 'assert sandbox.db.invariants_preserved(), "Invariant violation detected!"', tone: 'neutral' },
        { code: 'assert sandbox.audit_log.verify_signature(trace.token), "Missing cryptographic trace"', tone: 'neutral' },
        { code: 'RESULT: ALL 14 HARD ASSERTIONS PASSED [0 REGRESSIONS RECORDED]', tone: 'accent' },
      ],
    },
  },
  {
    id: 'judges',
    step: 'PILLAR 03',
    title: 'Calibrated Human-in-the-Loop',
    subtitle: 'Vetted domain specialists adjudicating ambiguous reasoning paths',
    description:
      'When outputs cannot be validated deterministically, we deploy a vetted network of domain specialists (attorneys, clinical practitioners, financial analysts). Disagreements are adjudicated and inter-rater agreement is mathematically tracked.',
    specs: ['Krippendorff’s Alpha tracking', 'Triple-blind expert scoring', 'Adjudicated dispute traces'],
    ditherColor: [0.88, 0.88, 0.92], // Pure Platinum
    grainientColors: { color1: '#0e0e14', color2: '#1d1e29', color3: '#323447' },
    codePreview: {
      title: 'adjudication_panel_telemetry.json',
      badge: 'INTER-RATER CALIBRATION',
      lines: [
        { label: 'PANEL_SIZE', code: '3 Independent Calibrated Domain Evaluators' },
        { label: 'AGREEMENT_SCORE', code: 'Krippendorff α = 0.942 (Statistically Certified)', tone: 'accent' },
        { label: 'SAMPLE_#849', code: 'Reviewer A: Pass | Reviewer B: Pass | Reviewer C: Dispute' },
        { label: 'ADJUDICATION', code: '"Dispute resolved: Ambiguity in regulatory clause 4.2"', tone: 'neutral' },
        { label: 'OUTCOME', code: 'CONSENSUS CERTIFIED WITH CRYPTOGRAPHIC AUDIT TRACE', tone: 'accent' },
      ],
    },
  },
  {
    id: 'gates',
    step: 'PILLAR 04',
    title: 'Automated CI/CD Release Gates',
    subtitle: 'Continuous regression evaluation on every model and prompt deploy',
    description:
      'Every confirmed failure mode is permanently converted into an automated regression unit test. As foundation models release updates, prompts are refined, or tool schemas evolve, our release gate blocks silent quality degradation.',
    specs: ['Automated PR blocking', 'Statistical regression deltas', 'Production canary monitoring'],
    ditherColor: [0.8, 0.82, 0.85], // Slate Steel
    grainientColors: { color1: '#0f1115', color2: '#1f2229', color3: '#353a47' },
    codePreview: {
      title: 'evalixa_release_gate_summary.log',
      badge: 'CI/CD RELEASE GATE',
      lines: [
        { label: 'EVAL_RUN', code: 'Candidate: mistral-large-v2-tuned vs Baseline: prod-v1.8' },
        { label: 'TASKS_EVALUATED', code: '1,420 multi-turn scenarios across 50 dimensions' },
        { label: 'DELTA_REASONING', code: '+6.4% improvement on long-horizon tool chains', tone: 'accent' },
        { label: 'DELTA_SECURITY', code: '0.0% prompt-injection escape rate [100% Containment]', tone: 'accent' },
        { label: 'DECISION', code: 'DEPLOYMENT APPROVED — RELEASE GATE PASSED [0 ESCAPES]', tone: 'accent' },
      ],
    },
  },
];

export default function EvaluationWorkbenchSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const laserLineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const currentPillar = PILLARS[activeIndex] || PILLARS[0];

  useGSAP(
    () => {
      const section = sectionRef.current;
      const laser = laserLineRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const totalPillars = PILLARS.length;
        const scrollDistance = 2400; // 600px of scroll per pillar

        // Pin the entire workbench section while user scrolls through the 4 pillars
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

            // Animate laser track line
            if (laser) {
              gsap.set(laser, { scaleY: p });
            }

            // Calculate active pillar index based on scroll position
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
      // Scroll to the exact position within the pinned range
      const stepProgress = (index + 0.15) / PILLARS.length;
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
      className="relative z-30 w-full min-h-screen lg:h-screen flex flex-col justify-center py-10 sm:py-12 lg:py-6 bg-[#09090b] text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center my-auto">
        {/* Section Header with balanced compact spacing */}
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
            <span className="text-white font-bold">PILLAR {String(activeIndex + 1).padStart(2, '0')}</span>
            <span>/</span>
            <span>04</span>
            <span className="text-neutral-500 ml-2 text-[11px]">(Scroll to step through)</span>
          </div>
        </div>

        {/* 2-Column Interactive Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
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

            {PILLARS.map((pillar, idx) => {
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
                  {/* Monochromatic Dither Canvas Background on Active Card */}
                  {isActive && (
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-75">
                      <Dither
                        waveSpeed={0.03}
                        waveFrequency={2.5}
                        waveAmplitude={0.22}
                        waveColor={pillar.ditherColor}
                        backgroundColor={[0.04, 0.04, 0.05]}
                        colorNum={4}
                        pixelSize={2}
                        enableMouseInteraction={false}
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
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Inspection Console & Details */}
          <div className="lg:col-span-7 relative rounded-md border border-neutral-800 bg-[#0c0d10] overflow-hidden min-h-[440px] sm:min-h-[470px] shadow-2xl shadow-black flex flex-col justify-between">
            {/* Ambient Monochromatic Fluid Grain Shader Background on Console */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-85">
              <Grainient
                color1={currentPillar.grainientColors.color1}
                color2={currentPillar.grainientColors.color2}
                color3={currentPillar.grainientColors.color3}
                timeSpeed={0.2}
                warpStrength={0.45}
                grainAmount={0.07}
                contrast={1.15}
              />
            </div>

            {/* Ambient vignette overlay to keep text crisp without washing out the waves */}
            <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-t from-neutral-950/85 via-neutral-950/30 to-neutral-950/50" />

            {/* Dynamic Content */}
            <div className="relative z-10 p-5 sm:p-6 lg:p-7 flex flex-col justify-between h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPillar.id}
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col justify-center gap-5 h-full"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 font-mono text-[11px] uppercase tracking-wider text-neutral-400">
                      <span className="text-white font-bold">{currentPillar.step}</span>
                      <span>/</span>
                      <span>INSPECTION CONSOLE</span>
                    </div>

                    <h3 className="font-display font-bold text-lg sm:text-xl lg:text-2xl text-white tracking-tight mb-2">
                      {currentPillar.title}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal mb-4">
                      {currentPillar.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {currentPillar.specs.map((spec) => (
                        <span
                          key={spec}
                          className="font-mono text-[10px] sm:text-[11px] text-neutral-200 bg-neutral-900/70 backdrop-blur-md border border-neutral-700/80 px-2.5 py-1 rounded-sm shadow-sm"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Dark Monochromatic Inspection Code / Telemetry Console */}
                  <div className="rounded-md bg-black/70 backdrop-blur-md border border-neutral-800 p-3.5 sm:p-4 font-mono text-xs overflow-hidden shadow-2xl">
                    <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-neutral-800 text-neutral-400 text-[11px]">
                      <span className="truncate pr-2 text-neutral-300">{currentPillar.codePreview.title}</span>
                      <span className="px-2 py-0.5 rounded bg-white/10 text-white border border-white/20 text-[10px] font-bold shrink-0 uppercase tracking-wider">
                        {currentPillar.codePreview.badge}
                      </span>
                    </div>

                    <div className="space-y-1.5 leading-relaxed overflow-x-auto text-[11px]">
                      {currentPillar.codePreview.lines.map((line, idx) => (
                        <div key={idx} className="flex gap-2">
                          {line.label && (
                            <span className="text-neutral-500 shrink-0 select-none">
                              {line.label}:
                            </span>
                          )}
                          <span
                            className={
                              line.tone === 'accent'
                                ? 'text-white font-semibold'
                                : line.tone === 'highlight'
                                ? 'text-neutral-200 font-medium'
                                : 'text-neutral-400'
                            }
                          >
                            {line.code}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
