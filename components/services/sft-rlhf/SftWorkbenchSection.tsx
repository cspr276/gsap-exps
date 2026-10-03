'use client';

import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, GitCompare } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Grainient = dynamic(() => import('@/components/Grainient'), { ssr: false });

interface CodeLine {
  label?: string;
  code: string;
  tone?: 'neutral' | 'accent' | 'highlight';
}

interface ComparisonOption {
  label: string;
  text: string;
  verdict: string;
  isWinner?: boolean;
}

interface ComparisonItem {
  prompt: string;
  optionA: ComparisonOption;
  optionB: ComparisonOption;
  note: string;
}

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
    lines: CodeLine[];
  };
  comparisonPreview: ComparisonItem;
}

// 100% Monochromatic (Obsidian, Graphite, Slate & Platinum Silvers)
const PILLARS: Pillar[] = [
  {
    id: 'contract-ruleout',
    category: 'LEVER AUDIT',
    title: 'Task Contract & Retrieval Rule-Out',
    subtitle: 'Checking cheaper prompt and RAG levers first',
    description:
      'Before writing a single training line or curating examples, we systematically audit whether the observed capability gap can be resolved via strict output schema contracts, few-shot decomposition, or chunk-level retrieval augmentation.',
    specs: ['Contract schema specification', 'Retrieval index audit', 'Zero-cost prompt refactoring', 'Reversibility analysis'],
    codePreview: {
      title: 'lever_audit_assessment.json',
      badge: 'LEVER EVALUATION',
      lines: [
        { label: 'LEVER_1_PROMPT', code: 'Refactored unconstrained prompt into strict JSON schema contract' },
        { label: 'SCHEMA_GAIN', code: 'Format adherence rose from 68.2% to 94.1% without training', tone: 'accent' },
        { label: 'LEVER_2_RAG', code: 'Appended chunk-level provenance; factual hallucinations dropped 42%', tone: 'accent' },
        { label: 'RESIDUAL_GAP', code: '"Subtle domain phrasing and multi-turn negative constraint adherence"', tone: 'highlight' },
        { label: 'VERDICT', code: 'CHEAP LEVERS EXHAUSTED: PROCEEDING TO CURATED SFT', tone: 'accent' },
      ],
    },
    comparisonPreview: {
      prompt: 'Extract regulatory filings and format clinical trial phase discrepancies.',
      optionA: {
        label: 'Unconstrained Prompt',
        text: 'The FDA filing mentions Phase 2 cohort metrics, but European EMA records show discrepancies in sample sizes across clinical trials.',
        verdict: 'Freeform text without schema guarantees. Breaks downstream ETL ingestion pipelines.',
        isWinner: false,
      },
      optionB: {
        label: 'Contract-Enforced Schema',
        text: '{"jurisdiction": "FDA vs EMA", "phase": "Phase II", "delta": "Sample variance n=120 vs n=94", "status": "DISCREPANCY_FLAGGED"}',
        verdict: 'Rigid schema contract. Completely deterministic, machine-parsable, and zero maintenance cost.',
        isWinner: true,
      },
      note: 'A simple schema contract closed 80% of the reported defect without adjusting model weights or spending GPU hours.',
    },
  },
  {
    id: 'demonstration-sft',
    category: 'DEMONSTRATION SFT',
    title: 'Curated Demonstration SFT',
    subtitle: 'Teaching structure, format, and house conventions',
    description:
      'Supervised fine-tuning excels at teaching format, institutional tone, and syntactic adherence from curated demonstrations. We curate high-signal, multi-turn gold datasets where domain experts author the exact desired behavior.',
    specs: ['Loss masking on prompt tokens', 'High-density instruction tuning', 'Verified domain demonstrations', 'Syntactic schema fidelity'],
    codePreview: {
      title: 'sft_training_telemetry.log',
      badge: 'SFT PIPELINE v3.2',
      lines: [
        { label: 'DATASET', code: '1,850 curated domain demonstrations (triple-verified gold set)' },
        { label: 'LOSS_MASKING', code: 'Active: gradients calculated strictly on completion tokens', tone: 'accent' },
        { label: 'EPOCH_3_LOSS', code: 'Train Loss: 0.142 | Validation Perplexity: 1.18', tone: 'accent' },
        { label: 'FORMAT_FIDELITY', code: '100.0% JSON syntax validity across 500 held-out stress tests', tone: 'accent' },
        { label: 'UNCERTAINTY_FLAG', code: 'Model successfully taught to emit [UNCERTAIN: NOT IN SOURCE]', tone: 'accent' },
      ],
    },
    comparisonPreview: {
      prompt: 'Summarize clinical note for a 54-year-old presenting with chest discomfort.',
      optionA: {
        label: 'Base Foundation Model',
        text: 'Certainly! Here is a summary of the clinical note. The patient is a 54-year-old presenting with chest discomfort. I hope this helps! Let me know if you would like me to reformat it or add more detail.',
        verdict: 'Excessive conversational filler, unstandardized layout, and smooths over missing clinical details.',
        isWinner: false,
      },
      optionB: {
        label: 'Adapted SFT Checkpoint',
        text: 'IMPRESSION: 54M, exertional chest discomfort, 3-day history.\nFINDINGS: No ST elevation. Troponin pending.\nPLAN: Serial troponin, cardiology review.\n[uncertain: onset date — not stated in source]',
        verdict: 'Teaches institutional shorthand, eliminates conversational fluff, and flags unstated sources explicitly.',
        isWinner: true,
      },
      note: 'Fine-tuning did not make the model smarter; it taught house formatting and the crucial discipline to flag omissions rather than hallucinate.',
    },
  },
  {
    id: 'preference-dpo',
    category: 'PREFERENCE DPO',
    title: 'Expert Preference Optimization / DPO',
    subtitle: 'Aligning subtle domain quality trade-offs',
    description:
      'When outputs cannot be captured by static rules and require nuanced judgment, we deploy Direct Preference Optimization (DPO) on pairwise comparisons scored by calibrated domain specialists.',
    specs: ['Direct Preference Optimization (DPO)', 'Pairwise preference ranking', 'Krippendorff α agreement > 0.88', 'Implicit reward margin loss'],
    codePreview: {
      title: 'dpo_alignment_metrics.json',
      badge: 'DPO CONVERGENCE',
      lines: [
        { label: 'OBJECTIVE', code: 'Direct Preference Optimization (beta=0.10, reference-anchored)' },
        { label: 'PREFERENCE_PAIRS', code: '2,400 expert pairwise comparisons (adjudicated agreement α=0.91)', tone: 'accent' },
        { label: 'IMPLICIT_MARGIN', code: 'Reward delta (chosen - rejected) widened to +2.48', tone: 'accent' },
        { label: 'KL_DIVERGENCE', code: 'KL vs SFT baseline maintained within stable bounds (0.042)', tone: 'highlight' },
        { label: 'OUTCOME', code: 'OPTIMAL TRADEOFF CONVERGENCE: UTILITY PREFERRED OVER FLUENCY', tone: 'accent' },
      ],
    },
    comparisonPreview: {
      prompt: 'A customer writes: "My order still has not arrived and I need it before Friday." Draft a reply.',
      optionA: {
        label: 'Rejected (Naive Model Preference)',
        text: 'I sincerely apologise for the inconvenience caused. Your satisfaction is our highest priority and we are committed to resolving this matter as quickly as possible. Please rest assured that we are looking into it.',
        verdict: 'Fluent, polite, and empty. Commits to no action, states no timeline, leaves the customer stranded.',
        isWinner: false,
      },
      optionB: {
        label: 'Chosen (Expert Preference Gold)',
        text: 'Your order is with the carrier and is scheduled for Thursday. If it has not arrived by Thursday evening, reply here and I will dispatch a courier replacement so you have it before Friday.',
        verdict: 'Direct, actionable, provides clear date and concrete contingency fallback.',
        isWinner: true,
      },
      note: 'Most unaligned models prefer Option A because fluency is easy to optimize. Expert preference data trains models to prioritize utility over politeness.',
    },
  },
  {
    id: 'regression-gate',
    category: 'REGRESSION GATE',
    title: 'Continuous Regression Gate & Model Retirement',
    subtitle: 'Verifying adapted checkpoints against stock baselines',
    description:
      'Adapted models risk catastrophic forgetting or obsolescence as foundational base models update. We evaluate checkpoints against permanent held-out task suites to verify that fine-tuning continuously justifies its maintenance overhead.',
    specs: ['Catastrophic forgetting checks', 'Stock foundation model parity tests', 'Automated CI/CD release gate', 'Model retirement triggers'],
    codePreview: {
      title: 'checkpoint_verification_audit.log',
      badge: 'REGRESSION AUDIT',
      lines: [
        { label: 'CANDIDATE', code: 'mistral-sft-dpo-v4 vs Stock Base Model v2.5' },
        { label: 'DOMAIN_TASK', code: '+18.4% improvement on proprietary schema reconciliation', tone: 'accent' },
        { label: 'FORGETTING_TEST', code: 'General reasoning benchmark delta: -0.2% [PASS: Within tolerance]', tone: 'highlight' },
        { label: 'RETIREMENT_CHECK', code: 'Custom checkpoint maintains 14.1% net advantage over new stock base', tone: 'accent' },
        { label: 'DECISION', code: 'DEPLOYMENT CERTIFIED — RELEASE GATE PASSED', tone: 'accent' },
      ],
    },
    comparisonPreview: {
      prompt: 'Check candidate model against new foundation release (Model Retirement Analysis).',
      optionA: {
        label: 'Stock Foundation v2.5 (New Release)',
        text: 'Evaluated on 500 domain tasks: Format fidelity 89.2% | Latency 380ms | Maintenance cost $0/month.',
        verdict: 'Close to parity on structure, but still misses proprietary institutional edge cases.',
        isWinner: false,
      },
      optionB: {
        label: 'Adapted Checkpoint v4 (Active)',
        text: 'Evaluated on 500 domain tasks: Format fidelity 99.8% | Latency 385ms | Justified maintenance value +10.6%.',
        verdict: 'Maintains decisive advantage on mission-critical constraints. Retirement deferred until next stock generation.',
        isWinner: true,
      },
      note: 'Fine-tuning is a temporary debt: we continuously benchmark against base model releases so you retire custom weights the moment base models catch up.',
    },
  },
];

export default function SftWorkbenchSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const laserLineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeMode, setActiveMode] = useState<'console' | 'diff'>('console');

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
          id: 'workbench-pin-sft',
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

    const st = ScrollTrigger.getById('workbench-pin-sft');
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
              ADAPTATION ARCHITECTURE
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
              Surgical Interventions. Auditable Improvements.
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

          {/* Right Column: Dynamic Inspection Console & Output Diff Inspector */}
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
                  ADAPTATION ENGINE
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
                  onClick={() => setActiveMode('diff')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm transition-all cursor-pointer ${
                    activeMode === 'diff'
                      ? 'bg-neutral-800 text-white font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <GitCompare className="w-3.5 h-3.5" />
                  <span>OUTPUT DIFF INSPECTOR</span>
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
                    key="diff"
                    initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col justify-between h-full"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                          PAIRWISE OUTPUT ARTIFACT
                        </span>
                        <span className="font-mono text-xs font-bold text-neutral-300">
                          {currentPillar.category}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight mb-1.5">
                        Ground Truth Output Comparison
                      </h3>
                      <div className="p-2.5 rounded-md bg-black/60 border border-neutral-800 text-xs font-mono text-neutral-300 mb-3">
                        <span className="text-neutral-500 block text-[10px] uppercase font-bold mb-0.5">Evaluation Task Prompt</span>
                        &ldquo;{currentPillar.comparisonPreview.prompt}&rdquo;
                      </div>

                      {/* Side-by-Side Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                        {/* Option A */}
                        <div
                          className={`p-3 rounded-md border font-mono text-xs flex flex-col justify-between ${
                            currentPillar.comparisonPreview.optionA.isWinner
                              ? 'bg-neutral-900 border-neutral-700 text-white'
                              : 'bg-black/60 border-neutral-800 text-neutral-400'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-neutral-800">
                              <span className="font-bold text-[11px] text-neutral-300">
                                {currentPillar.comparisonPreview.optionA.label}
                              </span>
                              <span
                                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                  currentPillar.comparisonPreview.optionA.isWinner
                                    ? 'bg-white text-black'
                                    : 'bg-neutral-800 text-neutral-400'
                                }`}
                              >
                                {currentPillar.comparisonPreview.optionA.isWinner ? 'ACCEPTED' : 'REJECTED'}
                              </span>
                            </div>
                            <p className="text-[11px] leading-relaxed mb-3 whitespace-pre-line text-neutral-300">
                              {currentPillar.comparisonPreview.optionA.text}
                            </p>
                          </div>
                          <p className="text-[10px] text-neutral-400 pt-1.5 border-t border-neutral-800/80">
                            {currentPillar.comparisonPreview.optionA.verdict}
                          </p>
                        </div>

                        {/* Option B */}
                        <div
                          className={`p-3 rounded-md border font-mono text-xs flex flex-col justify-between ${
                            currentPillar.comparisonPreview.optionB.isWinner
                              ? 'bg-neutral-900 border-neutral-700 text-white'
                              : 'bg-black/60 border-neutral-800 text-neutral-400'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-neutral-800">
                              <span className="font-bold text-[11px] text-neutral-300">
                                {currentPillar.comparisonPreview.optionB.label}
                              </span>
                              <span
                                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                  currentPillar.comparisonPreview.optionB.isWinner
                                    ? 'bg-white text-black'
                                    : 'bg-neutral-800 text-neutral-400'
                                }`}
                              >
                                {currentPillar.comparisonPreview.optionB.isWinner ? 'ACCEPTED' : 'REJECTED'}
                              </span>
                            </div>
                            <p className="text-[11px] leading-relaxed mb-3 whitespace-pre-line text-neutral-300">
                              {currentPillar.comparisonPreview.optionB.text}
                            </p>
                          </div>
                          <p className="text-[10px] text-neutral-400 pt-1.5 border-t border-neutral-800/80">
                            {currentPillar.comparisonPreview.optionB.verdict}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Educational Footnote */}
                    <div className="rounded-md p-3 border border-neutral-800 bg-neutral-900/60 font-mono text-xs text-neutral-300">
                      <span className="text-white font-bold block mb-0.5">ENGINEERING TAKEAWAY:</span>
                      <p className="font-sans text-[11px] text-neutral-300 leading-relaxed font-normal">
                        {currentPillar.comparisonPreview.note}
                      </p>
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
