'use client';

import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, CheckSquare } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Grainient = dynamic(() => import('@/components/Grainient'), { ssr: false });

interface Pillar {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  specs: string[];
  codePreview: {
    title: string;
    badge: string;
    lines: { label?: string; code: string; tone?: 'neutral' | 'accent' | 'highlight' }[];
  };
}

interface AgreementCell {
  id: string;
  reviewerA: string;
  reviewerB: string;
  kappa: string;
  band: 'high' | 'mid' | 'low';
  title: string;
  diagnostic: string;
  remedy: string;
}

// 100% Monochromatic (Obsidian, Graphite, Slate & Platinum Silvers)
const PILLARS: Pillar[] = [
  {
    id: 'specification',
    category: 'RUBRIC SPEC',
    title: 'Task Specification & Rubric Calibration',
    subtitle: 'Worked examples, decision trees, and diagnostic seed sets',
    description:
      'The rubric, decision boundaries, and worked examples at every grade including difficult edge cases. Before labelling production data, reviewers independently label identical seed sets to verify concordant interpretation.',
    specs: ['Worked edge-case rubrics', 'Multi-grade decision trees', 'Diagnostic seed sets'],
    codePreview: {
      title: 'rubric_spec_clinical_triage.json',
      badge: 'RUBRIC SPEC v2.4',
      lines: [
        { label: 'OBJECTIVE', code: '"Annotate multi-turn clinical triage dialogs with schema tags"' },
        { label: 'CALIBRATION_TARGET', code: '"Cohen\'s κ ≥ 0.85 required before queue access"', tone: 'highlight' },
        { label: 'SEED_CORPUS', code: '{ "items": 150, "edge_case_density": 0.28, "blind_seeded": true }' },
        { label: 'CONCORDANCE_RESULT', code: 'κ = 0.884 across 4 independent specialists', tone: 'accent' },
        { label: 'STATUS', code: 'RUBRIC CERTIFIED — PRODUCTION AUTHORIZED', tone: 'accent' },
      ],
    },
  },
  {
    id: 'production',
    category: 'CALIBRATED SQUAD',
    title: 'Calibrated Domain Production',
    subtitle: 'SME specialists with invisible audit seeds in the live queue',
    description:
      'Vetted domain-matched specialists (clinicians, attorneys, engineers) label against the calibrated specification. Known-answer gold items are seeded invisibly through the queue to maintain a real-time running metric of accuracy.',
    specs: ['Vetted domain SMEs', 'Invisible audit seeds (5%)', 'Real-time drift alerts'],
    codePreview: {
      title: 'production_queue_supervisor.py',
      badge: 'LIVE QUEUE TELEMETRY',
      lines: [
        { code: 'queue = ProductionBatchSupervisor.spawn(batch_id="FIN_Q3_084", squad_size=4)' },
        { code: 'queue.inject_blind_audit_seeds(seed_ratio=0.05, randomize_cadence=True)' },
        { code: 'assert queue.blind_seed_accuracy() >= 0.98, "Drift alert: accuracy under 98%"', tone: 'highlight' },
        { code: 'telemetry = queue.compute_running_agreement(metric="cohens_kappa")', tone: 'highlight' },
        { code: 'STATUS: ACTIVE SLA MAINTAINED [κ = 0.871, SEED ACCURACY = 98.6%]', tone: 'accent' },
      ],
    },
  },
  {
    id: 'adjudication',
    category: 'EXPERT PANEL',
    title: 'Contested Item Adjudication',
    subtitle: 'Senior specialist review for disputed items rather than averaging',
    description:
      'Items where reviewers disagree or confidence scores fall below threshold are never averaged out. They escalate to senior domain specialists who inspect the reasoning trace, resolve the ambiguity, and record explicit rationale.',
    specs: ['Senior SME arbitration', 'Non-consensus escalation', 'Full rationale logging'],
    codePreview: {
      title: 'adjudication_resolution_engine.json',
      badge: 'ARBITRATION PANEL',
      lines: [
        { label: 'CONTESTED_ITEM', code: '"ITEM-9812 (Cross-Jurisdiction Indemnity Scope)"' },
        { label: 'REVIEWER_SPREAD', code: 'Reviewer A: [ACCEPT] | Reviewer B: [AMEND] | Reviewer C: [REJECT]' },
        { label: 'ESCALATION_PATH', code: '"Tier-3 Senior Juris Doctor Arbitration Panel"', tone: 'highlight' },
        { label: 'ARBITRATION_RATIONALE', code: '"Precedence conflict resolved under statutory Swiss caveat"' },
        { label: 'OUTCOME', code: 'ADJUDICATION CERTIFIED — RATIONALE CODIFIED', tone: 'accent' },
      ],
    },
  },
  {
    id: 'refinement',
    category: 'SPEC HARDENING',
    title: 'Continuous Guideline Refinement',
    subtitle: 'Codifying edge cases into permanent gold standards',
    description:
      'Every adjudicated edge case becomes a new canonical worked example. The specification improves continuously over the lifecycle of the programme instead of ossifying at kickoff, separating a real data programme from a simple labelling invoice.',
    specs: ['Dynamic guideline versioning', 'Canonical edge-case indexing', 'Continuous rubric hardening'],
    codePreview: {
      title: 'guideline_version_sync.log',
      badge: 'CONTINUOUS REFINEMENT',
      lines: [
        { label: 'ARTIFACT', code: '"guideline_spec_v2.5_diff.patch"' },
        { label: 'EDGE_CASES_ADDED', code: '+12 adjudicated boundary examples added to Section 4.3' },
        { label: 'RULE_AMENDMENT', code: '"Rule 4.3.8: Explicit precedence rules for conflicting clauses"', tone: 'highlight' },
        { label: 'RETEST_COHORT', code: 'Concordance on revised seed set: κ = 0.92 (+0.07 gain)', tone: 'accent' },
        { label: 'DEPLOYMENT', code: 'UPDATED SPEC DISTRIBUTED TO ALL SME SQUADS', tone: 'accent' },
      ],
    },
  },
];

const AGREEMENT_CELLS: AgreementCell[] = [
  {
    id: 'r1-r2',
    reviewerA: 'R1',
    reviewerB: 'R2',
    kappa: '0.86',
    band: 'high',
    title: 'High Concordance (κ = 0.86)',
    diagnostic: 'Healthy. Both reviewers interpret the rubric identically. Guideline definitions are unambiguous for this domain slice.',
    remedy: 'Rubric validated. Reviewers certified for high-velocity production batching.',
  },
  {
    id: 'r1-r3',
    reviewerA: 'R1',
    reviewerB: 'R3',
    kappa: '0.61',
    band: 'mid',
    title: 'Borderline Agreement (κ = 0.61)',
    diagnostic: 'Borderline. Discrepancies traced to one undefined edge case: a partially-correct response delivered in an authoritative, confident tone.',
    remedy: 'Resolved by appending a canonical worked example to the rubric, not by retraining annotator R3.',
  },
  {
    id: 'r1-r4',
    reviewerA: 'R1',
    reviewerB: 'R4',
    kappa: '0.44',
    band: 'low',
    title: 'Low Agreement (κ = 0.44)',
    diagnostic: 'Critical failure. Reviewer R4 uses a different decision boundary for regulatory boundary clauses than the rest of the squad.',
    remedy: 'R4 removed from live queue until recalibrated; all 84 items reviewed by R4 routed to senior adjudication.',
  },
  {
    id: 'r2-r3',
    reviewerA: 'R2',
    reviewerB: 'R3',
    kappa: '0.78',
    band: 'high',
    title: 'Robust Concordance (κ = 0.78)',
    diagnostic: 'Strong alignment. Minor variations occur exclusively on borderline stylistic tone scoring rather than factual criteria.',
    remedy: 'Guideline clause 3.2 refined with positive and negative counter-examples.',
  },
  {
    id: 'r2-r4',
    reviewerA: 'R2',
    reviewerB: 'R4',
    kappa: '0.52',
    band: 'mid',
    title: 'Moderate Discordance (κ = 0.52)',
    diagnostic: 'Moderate gap. Reviewer R4 consistently awards higher partial-credit to speculative reasoning than Reviewer R2.',
    remedy: 'Rubric decision tree updated to clarify that speculative deductions must receive a penalty tag.',
  },
  {
    id: 'r3-r4',
    reviewerA: 'R3',
    reviewerB: 'R4',
    kappa: '0.49',
    band: 'low',
    title: 'Severe Divergence (κ = 0.49)',
    diagnostic: 'Acute discrepancy. Neither reviewer shares an aligned definition for multi-jurisdiction compliance exceptions.',
    remedy: 'Senior specialist adjudication panel convened to codify jurisdictional hierarchy rules.',
  },
];

export default function AnnotationWorkbenchSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const laserLineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeMode, setActiveMode] = useState<'console' | 'matrix'>('console');
  const [selectedCellId, setSelectedCellId] = useState<string>('r1-r2');

  const reviewers = ['R1', 'R2', 'R3', 'R4'];

  const getCellForPair = (rA: string, rB: string): AgreementCell | null => {
    if (rA === rB) return null;
    return (
      AGREEMENT_CELLS.find(
        (c) =>
          (c.reviewerA === rA && c.reviewerB === rB) ||
          (c.reviewerA === rB && c.reviewerB === rA)
      ) || null
    );
  };

  const selectedCell =
    AGREEMENT_CELLS.find((c) => c.id === selectedCellId) || AGREEMENT_CELLS[0];

  const currentPillar = PILLARS[activeIndex] || PILLARS[0];

  useGSAP(
    () => {
      const section = sectionRef.current;
      const laser = laserLineRef.current;
      if (!section) return;

      // Ensure fresh scroll position and active index on mount
      if (typeof window !== 'undefined' && !window.location.hash) {
        if ('scrollRestoration' in history) {
          history.scrollRestoration = 'manual';
        }
        if (window.__lenis) {
          window.__lenis.scrollTo(0, { immediate: true });
        }
        window.scrollTo(0, 0);
        ScrollTrigger.clearScrollMemory?.();
        ScrollTrigger.update();
      }

      setActiveIndex(0);
      if (laser) {
        gsap.set(laser, { scaleY: 0 });
      }

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const totalPillars = PILLARS.length;
        const scrollDistance = 2400;

        const st = ScrollTrigger.create({
          id: 'workbench-pin-annotation',
          trigger: section,
          start: 'top top',
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Guard: Guarantee Pillar 1 if inactive at start
            if (!self.isActive && self.progress === 0) {
              setActiveIndex(0);
              if (laser) gsap.set(laser, { scaleY: 0 });
              return;
            }

            const p = self.progress;

            if (laser) {
              gsap.set(laser, { scaleY: p });
            }

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

    const st = ScrollTrigger.getById('workbench-pin-annotation');
    if (st) {
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
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-6 gap-3">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-1.5">
              CALIBRATION ARCHITECTURE
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
              Calibrated Domain Expertise. Measurable Quality Invariants.
            </h2>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-neutral-400 font-mono text-xs pb-1">
            <span className="text-white font-bold">PILLAR {String(activeIndex + 1).padStart(2, '0')}</span>
            <span>/</span>
            <span>04</span>
            <span className="text-neutral-500 ml-2 text-[11px]">(Scroll to step through)</span>
          </div>
        </div>

        {/* 2-Column Interactive Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: 4 Pillar Navigation Cards */}
          <div ref={leftColRef} className="lg:col-span-5 relative flex flex-col gap-3 sm:gap-3.5 lg:h-[530px]">
            <div className="hidden lg:block absolute left-[-14px] top-2 bottom-2 w-[2px] bg-neutral-800 rounded-full overflow-hidden pointer-events-none">
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
                  className={`group relative overflow-hidden w-full flex-1 min-h-0 text-left px-4 py-3 sm:px-5 sm:py-3.5 rounded-md border transition-all duration-300 cursor-pointer flex flex-col justify-center ${
                    isActive
                      ? 'border-white/40 bg-neutral-900/90 shadow-xl shadow-black/80 text-white'
                      : 'bg-neutral-900/30 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/60 text-neutral-400'
                  }`}
                >
                  {/* Monochromatic Fluid Grain Shader Background on Active Card */}
                  {isActive && (
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-85">
                      <Grainient
                        color1="#000000"
                        color2="#2c2c2c"
                        color3="#6c6c6c"
                        saturation={0}
                        timeSpeed={0.2}
                        warpStrength={0.5}
                        grainAmount={0.07}
                        contrast={1.3}
                      />
                      <div className="absolute inset-0 bg-neutral-950/40 pointer-events-none" />
                    </div>
                  )}

                  <div className="relative z-10 flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2.5 mb-1">
                        <span className="font-mono text-xs font-bold text-neutral-400">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={`font-mono text-[10px] uppercase tracking-wider font-semibold transition-colors ${
                            isActive ? 'text-neutral-200' : 'text-neutral-500 group-hover:text-neutral-400'
                          }`}
                        >
                          {pillar.category}
                        </span>
                      </div>
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
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Inspection Console & Pairwise Agreement Matrix */}
          <div className="lg:col-span-7 relative rounded-md border border-neutral-800 bg-[#0c0d10] overflow-hidden min-h-[460px] lg:h-[530px] shadow-2xl shadow-black flex flex-col justify-between">
            {/* Ambient Monochromatic Fluid Grain Shader Background on Console */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-85">
              <Grainient
                color1="#000000"
                color2="#2c2c2c"
                color3="#6c6c6c"
                saturation={0}
                timeSpeed={0.2}
                warpStrength={0.5}
                grainAmount={0.07}
                contrast={1.3}
              />
            </div>

            <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-t from-neutral-950/85 via-neutral-950/30 to-neutral-950/50" />

            {/* Header with Mode Switcher */}
            <div className="relative z-10 p-4 sm:p-5 border-b border-neutral-800/80 flex flex-wrap items-center justify-between gap-3 bg-neutral-950/60 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                  QUALITY ENGINE
                </span>
              </div>

              <div className="flex items-center gap-1.5 p-1 rounded-md bg-neutral-900/90 border border-neutral-800 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setActiveMode('console')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm transition-all cursor-pointer ${
                    activeMode === 'console'
                      ? 'bg-neutral-800 text-white font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>PILLAR TELEMETRY</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveMode('matrix')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm transition-all cursor-pointer ${
                    activeMode === 'matrix'
                      ? 'bg-neutral-800 text-white font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <CheckSquare className="w-3.5 h-3.5" />
                  <span>AGREEMENT MATRIX</span>
                </button>
              </div>
            </div>

            {/* Dynamic Content Body */}
            <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-between flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {activeMode === 'console' ? (
                  <motion.div
                    key={currentPillar.id}
                    initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col justify-center gap-6 h-full"
                  >
                    <div>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight mb-2">
                        {currentPillar.title}
                      </h3>

                      <p className="font-sans text-sm text-neutral-300 leading-relaxed font-normal mb-4">
                        {currentPillar.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
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

                    <div className="rounded-md bg-black/75 backdrop-blur-md border border-neutral-800 p-4 font-mono text-xs overflow-hidden shadow-2xl">
                      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-neutral-800 text-neutral-400 text-[11px]">
                        <span className="truncate pr-2 text-neutral-300 font-medium">{currentPillar.codePreview.title}</span>
                        <span className="px-2 py-0.5 rounded bg-white/10 text-white border border-white/20 text-[10px] font-bold shrink-0 uppercase tracking-wider">
                          {currentPillar.codePreview.badge}
                        </span>
                      </div>
                      <div className="space-y-1.5 leading-relaxed overflow-x-auto text-[11px]">
                        {currentPillar.codePreview.lines.map((line, idx) => (
                          <div key={idx} className="flex gap-2.5">
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
                ) : (
                  <motion.div
                    key="matrix"
                    initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col justify-between h-full"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                          INTER-ANNOTATOR CONCORDANCE
                        </span>
                        <span className="font-mono text-xs font-bold text-neutral-300">
                          COHEN&apos;S KAPPA HEATMAP
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight mb-1.5">
                        Pairwise Agreement Calibration Matrix
                      </h3>
                      <p className="font-sans text-xs text-neutral-300 leading-relaxed font-normal mb-3">
                        Select a reviewer pair to diagnose underlying rubric alignment or jurisdictional discrepancies.
                      </p>

                      {/* Interactive 4x4 Grid */}
                      <div className="p-3 rounded-md bg-black/60 border border-neutral-800 mb-3 overflow-x-auto">
                        <div className="min-w-[280px]">
                          <div className="grid grid-cols-5 gap-1.5 text-center font-mono text-xs mb-1.5 text-neutral-400">
                            <div></div>
                            {reviewers.map((r) => (
                              <div key={r} className="font-bold py-0.5">{r}</div>
                            ))}
                          </div>

                          {reviewers.map((row) => (
                            <div key={row} className="grid grid-cols-5 gap-1.5 mb-1.5 items-center">
                              <div className="font-mono text-xs font-bold text-neutral-400 text-center">{row}</div>
                              {reviewers.map((col) => {
                                const cell = getCellForPair(row, col);
                                if (!cell) {
                                  return (
                                    <div
                                      key={`${row}-${col}`}
                                      className="h-8 rounded bg-neutral-900/40 border border-neutral-800/40 flex items-center justify-center font-mono text-neutral-600 text-[11px]"
                                    >
                                      —
                                    </div>
                                  );
                                }
                                const isSelected = selectedCell.id === cell.id;
                                return (
                                  <button
                                    key={`${row}-${col}`}
                                    type="button"
                                    onClick={() => setSelectedCellId(cell.id)}
                                    className={`h-8 rounded border font-mono text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                                      isSelected
                                        ? 'ring-2 ring-white scale-105 z-10'
                                        : 'hover:scale-102'
                                    } ${
                                      cell.band === 'high'
                                        ? 'bg-neutral-800 border-neutral-600 text-white'
                                        : cell.band === 'mid'
                                        ? 'bg-neutral-900 border-neutral-700 text-neutral-300'
                                        : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                                    }`}
                                  >
                                    {cell.kappa}
                                  </button>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Diagnostic Callout */}
                    <div className="rounded-md p-3 border border-neutral-800 bg-neutral-900/60 font-mono text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-white">{selectedCell.title}</span>
                        <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
                          Pair: {selectedCell.reviewerA} ↔ {selectedCell.reviewerB}
                        </span>
                      </div>
                      <p className="font-sans text-[11px] text-neutral-300 leading-relaxed font-normal mb-1.5">
                        {selectedCell.diagnostic}
                      </p>
                      <div className="text-[10px] text-neutral-400 pt-1 border-t border-neutral-800 flex items-center gap-1.5">
                        <span className="text-white font-bold">REMEDY:</span>
                        <span>{selectedCell.remedy}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
