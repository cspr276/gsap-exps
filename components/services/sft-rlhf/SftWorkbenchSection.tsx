'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, GitCompare } from 'lucide-react';

const Dither = dynamic(() => import('@/components/Dither'), { ssr: false });
const Grainient = dynamic(() => import('@/components/Grainient'), { ssr: false });

interface CodeLine {
  label?: string;
  code: string;
  tone?: 'neutral' | 'success' | 'warn' | 'accent';
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
    lines: CodeLine[];
  };
  comparisonPreview: ComparisonItem;
}

const PILLARS: Pillar[] = [
  {
    id: 'contract-ruleout',
    step: 'PILLAR 01',
    title: 'Task Contract & Retrieval Rule-Out',
    subtitle: 'Checking cheaper prompt and RAG levers first',
    description:
      'Before writing a single training line or curating examples, we systematically audit whether the observed capability gap can be resolved via strict output schema contracts, few-shot decomposition, or chunk-level retrieval augmentation.',
    specs: ['Contract schema specification', 'Retrieval index audit', 'Zero-cost prompt refactoring', 'Reversibility analysis'],
    ditherColor: [0.42, 0.65, 0.9],
    grainientColors: { color1: '#162238', color2: '#253d66', color3: '#3b629e' },
    codePreview: {
      title: 'lever_audit_assessment.json',
      badge: 'LEVER EVALUATION',
      lines: [
        { label: 'LEVER_1_PROMPT', code: 'Refactored unconstrained prompt into strict JSON schema contract' },
        { label: 'SCHEMA_GAIN', code: 'Format adherence rose from 68.2% to 94.1% without training', tone: 'success' },
        { label: 'LEVER_2_RAG', code: 'Appended chunk-level provenance; factual hallucinations dropped 42%', tone: 'success' },
        { label: 'RESIDUAL_GAP', code: '"Subtle domain phrasing and multi-turn negative constraint adherence"', tone: 'warn' },
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
    step: 'PILLAR 02',
    title: 'Curated Demonstration SFT',
    subtitle: 'Teaching structure, format, and house conventions',
    description:
      'Supervised fine-tuning excels at teaching format, institutional tone, and syntactic adherence from curated demonstrations. We curate high-signal, multi-turn gold datasets where domain experts author the exact desired behavior.',
    specs: ['Loss masking on prompt tokens', 'High-density instruction tuning', 'Verified domain demonstrations', 'Syntactic schema fidelity'],
    ditherColor: [0.32, 0.78, 0.55],
    grainientColors: { color1: '#132e22', color2: '#1e4d3a', color3: '#2e7558' },
    codePreview: {
      title: 'sft_training_telemetry.log',
      badge: 'SFT PIPELINE v3.2',
      lines: [
        { label: 'DATASET', code: '1,850 curated domain demonstrations (triple-verified gold set)' },
        { label: 'LOSS_MASKING', code: 'Active: gradients calculated strictly on completion tokens', tone: 'accent' },
        { label: 'EPOCH_3_LOSS', code: 'Train Loss: 0.142 | Validation Perplexity: 1.18', tone: 'success' },
        { label: 'FORMAT_FIDELITY', code: '100.0% JSON syntax validity across 500 held-out stress tests', tone: 'success' },
        { label: 'UNCERTAINTY_FLAG', code: 'Model successfully taught to emit [UNCERTAIN: NOT IN SOURCE]', tone: 'success' },
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
    step: 'PILLAR 03',
    title: 'Expert Preference Optimization / DPO',
    subtitle: 'Aligning subtle domain quality trade-offs',
    description:
      'When outputs cannot be captured by static rules and require nuanced judgment, we deploy Direct Preference Optimization (DPO) on pairwise comparisons scored by calibrated domain specialists.',
    specs: ['Direct Preference Optimization (DPO)', 'Pairwise preference ranking', 'Krippendorff α agreement > 0.88', 'Implicit reward margin loss'],
    ditherColor: [0.85, 0.62, 0.35],
    grainientColors: { color1: '#362615', color2: '#573d1f', color3: '#825c2e' },
    codePreview: {
      title: 'dpo_alignment_metrics.json',
      badge: 'DPO CONVERGENCE',
      lines: [
        { label: 'OBJECTIVE', code: 'Direct Preference Optimization (beta=0.10, reference-anchored)' },
        { label: 'PREFERENCE_PAIRS', code: '2,400 expert pairwise comparisons (adjudicated agreement α=0.91)', tone: 'accent' },
        { label: 'IMPLICIT_MARGIN', code: 'Reward delta (chosen - rejected) widened to +2.48', tone: 'success' },
        { label: 'KL_DIVERGENCE', code: 'KL vs SFT baseline maintained within stable bounds (0.042)', tone: 'success' },
        { label: 'OUTCOME', code: 'OPTIMAL TRADEOFF CONVERGENCE: UTILITY PREFERRED OVER FLUENCY', tone: 'success' },
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
    step: 'PILLAR 04',
    title: 'Continuous Regression Gate & Model Retirement',
    subtitle: 'Verifying adapted checkpoints against stock baselines',
    description:
      'Adapted models risk catastrophic forgetting or obsolescence as foundational base models update. We evaluate checkpoints against permanent held-out task suites to verify that fine-tuning continuously justifies its maintenance overhead.',
    specs: ['Catastrophic forgetting checks', 'Stock foundation model parity tests', 'Automated CI/CD release gate', 'Model retirement triggers'],
    ditherColor: [0.72, 0.42, 0.92],
    grainientColors: { color1: '#2f1940', color2: '#4e246e', color3: '#7535a6' },
    codePreview: {
      title: 'checkpoint_verification_audit.log',
      badge: 'REGRESSION AUDIT',
      lines: [
        { label: 'CANDIDATE', code: 'mistral-sft-dpo-v4 vs Stock Base Model v2.5' },
        { label: 'DOMAIN_TASK', code: '+18.4% improvement on proprietary schema reconciliation', tone: 'success' },
        { label: 'FORGETTING_TEST', code: 'General reasoning benchmark delta: -0.2% [PASS: Within tolerance]', tone: 'success' },
        { label: 'RETIREMENT_CHECK', code: 'Custom checkpoint maintains 14.1% net advantage over new stock base', tone: 'accent' },
        { label: 'DECISION', code: 'DEPLOYMENT CERTIFIED — RELEASE GATE PASSED', tone: 'success' },
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
      note: 'Maintaining a fine-tuned model means continuously validating whether stock models have caught up. When they do, we retire the custom weights.',
    },
  },
];

export default function SftWorkbenchSection() {
  const [activeTab, setActiveTab] = useState<string>(PILLARS[0].id);
  const [viewMode, setViewMode] = useState<'telemetry' | 'comparison'>('telemetry');

  const currentPillar = PILLARS.find((p) => p.id === activeTab) || PILLARS[0];

  return (
    <section id="workbench" className="relative w-full py-20 sm:py-28 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-2.5">
            ADAPTATION WORKBENCH ARCHITECTURE
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
            Engineered for Precision. Governed by Rigorous Baselines.
          </h2>
        </div>

        {/* 2-Column Interactive Workbench with rectangular borders (rounded-md) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: 4 Pillar Navigation Cards */}
          <div className="lg:col-span-5 space-y-2.5 flex flex-col justify-start">
            {PILLARS.map((pillar) => {
              const isActive = activeTab === pillar.id;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => setActiveTab(pillar.id)}
                  className={`relative overflow-hidden w-full text-left p-4 sm:p-5 rounded-md border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'border-neutral-600 bg-neutral-900/90 shadow-lg shadow-black/60 text-white'
                      : 'bg-neutral-900/30 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/50 text-neutral-300'
                  }`}
                >
                  {/* Active fluid grain shader background */}
                  {isActive && (
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-85">
                      <Grainient
                        color1={pillar.grainientColors.color1}
                        color2={pillar.grainientColors.color2}
                        color3={pillar.grainientColors.color3}
                        timeSpeed={0.25}
                        warpStrength={0.5}
                        grainAmount={0.06}
                        contrast={1.15}
                      />
                      <div className="absolute inset-0 bg-black/25 pointer-events-none" />
                    </div>
                  )}

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 font-bold">
                        {pillar.step}
                      </span>
                    </div>
                    <h3
                      className={`font-display font-bold text-base mb-1 transition-colors ${
                        isActive ? 'text-white' : 'text-neutral-200'
                      }`}
                    >
                      {pillar.title}
                    </h3>
                    <p
                      className={`font-sans text-xs line-clamp-2 leading-relaxed font-normal transition-colors ${
                        isActive ? 'text-neutral-200' : 'text-neutral-400'
                      }`}
                    >
                      {pillar.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Inspection Console & Details */}
          <div className="lg:col-span-7 relative rounded-md border border-neutral-800 bg-neutral-950 overflow-hidden min-h-[540px] shadow-xl shadow-black/80 flex flex-col justify-between">
            {/* Ambient Dither Canvas Background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-75">
              <Dither
                waveSpeed={0.04}
                waveFrequency={2.4}
                waveAmplitude={0.3}
                waveColor={currentPillar.ditherColor}
                backgroundColor={[0.03, 0.03, 0.05]}
                colorNum={4}
                pixelSize={2}
                enableMouseInteraction={false}
              />
            </div>

            {/* Ambient subtle vignette overlay */}
            <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-t from-neutral-950/75 via-transparent to-neutral-950/40" />

            {/* Dynamic Content */}
            <div className="relative z-10 p-6 sm:p-7 flex flex-col justify-between h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPillar.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col justify-center gap-8 h-full"
                >
                  <div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight mb-3">
                      {currentPillar.title}
                    </h3>

                    <p className="font-sans text-sm text-neutral-300 leading-relaxed font-normal mb-5">
                      {currentPillar.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {currentPillar.specs.map((spec) => (
                        <span
                          key={spec}
                          className="font-mono text-[11px] text-neutral-300 bg-neutral-900/40 backdrop-blur-sm border border-neutral-700/80 px-2.5 py-1 rounded-sm"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Console with Mode Toggle Tabs */}
                  <div className="rounded-md bg-black/65 backdrop-blur-md border border-neutral-800 p-4 font-mono text-xs overflow-hidden shadow-inner mt-4">
                    {/* Console Header */}
                    <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-neutral-800 text-[11px]">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setViewMode('telemetry')}
                          className={`flex items-center gap-1.5 px-2 py-1 rounded-sm cursor-pointer transition-colors ${
                            viewMode === 'telemetry'
                              ? 'bg-neutral-800 text-white font-semibold'
                              : 'text-neutral-400 hover:text-neutral-200'
                          }`}
                        >
                          <Terminal className="w-3.5 h-3.5" />
                          <span>Training Telemetry</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setViewMode('comparison')}
                          className={`flex items-center gap-1.5 px-2 py-1 rounded-sm cursor-pointer transition-colors ${
                            viewMode === 'comparison'
                              ? 'bg-neutral-800 text-white font-semibold'
                              : 'text-neutral-400 hover:text-neutral-200'
                          }`}
                        >
                          <GitCompare className="w-3.5 h-3.5" />
                          <span>Preference / Output Pair</span>
                        </button>
                      </div>

                      <span className="text-neutral-400 font-bold shrink-0 text-[10px]">
                        {viewMode === 'telemetry'
                          ? currentPillar.codePreview.badge
                          : 'PAIRWISE COMPARISON'}
                      </span>
                    </div>

                    {/* Mode Content */}
                    {viewMode === 'telemetry' ? (
                      <div>
                        <div className="text-neutral-500 mb-2 pb-1 text-[11px] border-b border-neutral-900">
                          {currentPillar.codePreview.title}
                        </div>
                        <div className="space-y-1.5 leading-relaxed overflow-x-auto">
                          {currentPillar.codePreview.lines.map((line, idx) => (
                            <div key={idx} className="flex gap-2 text-xs">
                              {line.label && (
                                <span className="text-neutral-400 shrink-0 select-none">
                                  {line.label}:
                                </span>
                              )}
                              <span
                                className={
                                  line.tone === 'success'
                                    ? 'text-emerald-400 font-medium'
                                    : line.tone === 'warn'
                                    ? 'text-amber-400 font-medium'
                                    : line.tone === 'accent'
                                    ? 'text-white font-bold'
                                    : 'text-neutral-300'
                                }
                              >
                                {line.code}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 font-sans text-xs">
                        <div className="p-2.5 rounded-sm bg-neutral-900/60 border border-neutral-800">
                          <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">
                            Prompt Input:
                          </span>
                          <p className="text-neutral-200 text-xs italic">
                            &quot;{currentPillar.comparisonPreview.prompt}&quot;
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Option A */}
                          <div className={`p-3 rounded-sm border ${
                            currentPillar.comparisonPreview.optionA.isWinner
                              ? 'border-emerald-700/80 bg-emerald-950/20'
                              : 'border-neutral-800 bg-neutral-900/40'
                          }`}>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="font-mono text-[10px] font-semibold text-neutral-300 uppercase">
                                {currentPillar.comparisonPreview.optionA.label}
                              </span>
                              {currentPillar.comparisonPreview.optionA.isWinner && (
                                <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-wider font-bold">
                                  CHOSEN
                                </span>
                              )}
                            </div>
                            <p className="font-mono text-[11px] text-neutral-300 whitespace-pre-wrap leading-relaxed mb-2">
                              {currentPillar.comparisonPreview.optionA.text}
                            </p>
                            <p className="text-[11px] text-neutral-400 leading-snug">
                              {currentPillar.comparisonPreview.optionA.verdict}
                            </p>
                          </div>

                          {/* Option B */}
                          <div className={`p-3 rounded-sm border ${
                            currentPillar.comparisonPreview.optionB.isWinner
                              ? 'border-emerald-700/80 bg-emerald-950/20'
                              : 'border-neutral-800 bg-neutral-900/40'
                          }`}>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="font-mono text-[10px] font-semibold text-neutral-300 uppercase">
                                {currentPillar.comparisonPreview.optionB.label}
                              </span>
                              {currentPillar.comparisonPreview.optionB.isWinner && (
                                <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-wider font-bold">
                                  CHOSEN
                                </span>
                              )}
                            </div>
                            <p className="font-mono text-[11px] text-neutral-300 whitespace-pre-wrap leading-relaxed mb-2">
                              {currentPillar.comparisonPreview.optionB.text}
                            </p>
                            <p className="text-[11px] text-neutral-400 leading-snug">
                              {currentPillar.comparisonPreview.optionB.verdict}
                            </p>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-neutral-800/80 text-[11px] text-neutral-400 italic">
                          {currentPillar.comparisonPreview.note}
                        </div>
                      </div>
                    )}
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
