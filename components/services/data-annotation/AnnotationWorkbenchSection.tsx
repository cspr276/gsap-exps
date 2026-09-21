'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, CheckSquare } from 'lucide-react';

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
    lines: { label?: string; code: string; tone?: 'neutral' | 'success' | 'warn' | 'accent' }[];
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

const PILLARS: Pillar[] = [
  {
    id: 'specification',
    step: 'PILLAR 01',
    title: 'Task Specification & Rubric Calibration',
    subtitle: 'Worked examples, decision trees, and diagnostic seed sets',
    description:
      'The rubric, decision boundaries, and worked examples at every grade including difficult edge cases. Before labelling production data, reviewers independently label identical seed sets to verify concordant interpretation.',
    specs: ['Worked edge-case rubrics', 'Multi-grade decision trees', 'Diagnostic seed sets'],
    ditherColor: [0.42, 0.65, 0.9],
    grainientColors: { color1: '#162238', color2: '#253d66', color3: '#3b629e' },
    codePreview: {
      title: 'rubric_spec_clinical_triage.json',
      badge: 'RUBRIC SPEC v2.4',
      lines: [
        { label: 'OBJECTIVE', code: '"Annotate multi-turn clinical triage dialogs with schema tags"' },
        { label: 'CALIBRATION_TARGET', code: '"Cohen\'s κ ≥ 0.85 required before queue access"', tone: 'accent' },
        { label: 'SEED_CORPUS', code: '{ "items": 150, "edge_case_density": 0.28, "blind_seeded": true }' },
        { label: 'CONCORDANCE_RESULT', code: 'κ = 0.884 across 4 independent specialists', tone: 'success' },
        { label: 'STATUS', code: 'RUBRIC CERTIFIED — PRODUCTION AUTHORIZED', tone: 'success' },
      ],
    },
  },
  {
    id: 'production',
    step: 'PILLAR 02',
    title: 'Calibrated Domain Production',
    subtitle: 'SME specialists with invisible audit seeds in the live queue',
    description:
      'Vetted domain-matched specialists (clinicians, attorneys, engineers) label against the calibrated specification. Known-answer gold items are seeded invisibly through the queue to maintain a real-time running metric of accuracy.',
    specs: ['Vetted domain SMEs', 'Invisible audit seeds (5%)', 'Real-time drift alerts'],
    ditherColor: [0.32, 0.78, 0.55],
    grainientColors: { color1: '#132e22', color2: '#1e4d3a', color3: '#2e7558' },
    codePreview: {
      title: 'production_queue_supervisor.py',
      badge: 'LIVE QUEUE TELEMETRY',
      lines: [
        { code: 'queue = ProductionBatchSupervisor.spawn(batch_id="FIN_Q3_084", squad_size=4)' },
        { code: 'queue.inject_blind_audit_seeds(seed_ratio=0.05, randomize_cadence=True)' },
        { code: 'assert queue.blind_seed_accuracy() >= 0.98, "Drift alert: accuracy under 98%"', tone: 'warn' },
        { code: 'telemetry = queue.compute_running_agreement(metric="cohens_kappa")', tone: 'accent' },
        { code: 'STATUS: ACTIVE SLA MAINTAINED [κ = 0.871, SEED ACCURACY = 98.6%]', tone: 'success' },
      ],
    },
  },
  {
    id: 'adjudication',
    step: 'PILLAR 03',
    title: 'Contested Item Adjudication',
    subtitle: 'Senior specialist review for disputed items rather than averaging',
    description:
      'Items where reviewers disagree or confidence scores fall below threshold are never averaged out. They escalate to senior domain specialists who inspect the reasoning trace, resolve the ambiguity, and record explicit rationale.',
    specs: ['Senior SME arbitration', 'Non-consensus escalation', 'Full rationale logging'],
    ditherColor: [0.85, 0.62, 0.35],
    grainientColors: { color1: '#362615', color2: '#573d1f', color3: '#825c2e' },
    codePreview: {
      title: 'adjudication_resolution_engine.json',
      badge: 'ARBITRATION PANEL',
      lines: [
        { label: 'CONTESTED_ITEM', code: '"ITEM-9812 (Cross-Jurisdiction Indemnity Scope)"' },
        { label: 'REVIEWER_SPREAD', code: 'Reviewer A: [ACCEPT] | Reviewer B: [AMEND] | Reviewer C: [REJECT]' },
        { label: 'ESCALATION_PATH', code: '"Tier-3 Senior Juris Doctor Arbitration Panel"', tone: 'accent' },
        { label: 'ARBITRATION_RATIONALE', code: '"Precedence conflict resolved under statutory Swiss caveat"' },
        { label: 'OUTCOME', code: 'ADJUDICATION CERTIFIED — RATIONALE CODIFIED', tone: 'success' },
      ],
    },
  },
  {
    id: 'refinement',
    step: 'PILLAR 04',
    title: 'Continuous Guideline Refinement',
    subtitle: 'Codifying edge cases into permanent gold standards',
    description:
      'Every adjudicated edge case becomes a new canonical worked example. The specification improves continuously over the lifecycle of the programme instead of ossifying at kickoff, separating a real data programme from a simple labelling invoice.',
    specs: ['Dynamic guideline versioning', 'Canonical edge-case indexing', 'Continuous rubric hardening'],
    ditherColor: [0.72, 0.42, 0.92],
    grainientColors: { color1: '#2f1940', color2: '#4e246e', color3: '#7535a6' },
    codePreview: {
      title: 'guideline_version_sync.log',
      badge: 'CONTINUOUS REFINEMENT',
      lines: [
        { label: 'ARTIFACT', code: '"guideline_spec_v2.5_diff.patch"' },
        { label: 'EDGE_CASES_ADDED', code: '+12 adjudicated boundary examples added to Section 4.3' },
        { label: 'RULE_AMENDMENT', code: '"Rule 4.3.8: Explicit precedence rules for conflicting clauses"', tone: 'accent' },
        { label: 'RETEST_COHORT', code: 'Concordance on revised seed set: κ = 0.92 (+0.07 gain)', tone: 'success' },
        { label: 'DEPLOYMENT', code: 'UPDATED SPEC DISTRIBUTED TO ALL SME SQUADS', tone: 'success' },
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
    title: 'Systematic Divergence (κ = 0.44)',
    diagnostic: 'Diagnostic signal. Reviewer R4 applied an alternate regional convention not accounted for in the kickoff guideline draft.',
    remedy: 'Caught during seed calibration before production release. R4 realigned on jurisdictional precedence rules.',
  },
  {
    id: 'r2-r3',
    reviewerA: 'R2',
    reviewerB: 'R3',
    kappa: '0.79',
    band: 'high',
    title: 'Acceptable Concordance (κ = 0.79)',
    diagnostic: 'Solid baseline agreement. The same tone-vs-correctness boundary caused slight variance, resolved in calibration review.',
    remedy: 'Minor decision-tree clarification added to Section 3 of the task specification.',
  },
  {
    id: 'r2-r4',
    reviewerA: 'R2',
    reviewerB: 'R4',
    kappa: '0.48',
    band: 'low',
    title: 'Isolated Discrepancy (κ = 0.48)',
    diagnostic: 'Confirms the divergent interpretation is isolated to R4’s jurisdictional assumptions rather than systemic rubric ambiguity.',
    remedy: 'Individual calibration session held with R4 prior to production queue dispatch.',
  },
  {
    id: 'r3-r4',
    reviewerA: 'R3',
    reviewerB: 'R4',
    kappa: '0.52',
    band: 'low',
    title: 'Compound Divergence (κ = 0.52)',
    diagnostic: 'Two reviewers disagreeing with each other and with the broader cohort on multi-attribute boundary cases.',
    remedy: 'Senior specialist arbitration convened. All 6 contested items codified as permanent gold anchor examples.',
  },
];

export default function AnnotationWorkbenchSection() {
  const [activeTab, setActiveTab] = useState<string>(PILLARS[0].id);
  const [activeMode, setActiveMode] = useState<'console' | 'matrix'>('console');
  const [selectedCellId, setSelectedCellId] = useState<string>('r1-r4');

  const currentPillar = PILLARS.find((p) => p.id === activeTab) || PILLARS[0];
  const selectedCell = AGREEMENT_CELLS.find((c) => c.id === selectedCellId) || AGREEMENT_CELLS[2];

  const getCellForPair = (a: string, b: string): AgreementCell | null => {
    if (a === b) return null;
    return (
      AGREEMENT_CELLS.find(
        (c) => (c.reviewerA === a && c.reviewerB === b) || (c.reviewerA === b && c.reviewerB === a)
      ) || null
    );
  };

  const reviewers = ['R1', 'R2', 'R3', 'R4'];

  return (
    <section id="workbench" className="relative w-full py-20 sm:py-28 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-2.5">
            QUALITY SYSTEM WORKBENCH
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
            Engineered for Precision. Governed by Inter-Rater Agreement.
          </h2>
        </div>

        {/* 2-Column Interactive Workbench with clean rectangular borders */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: 4 Pillar Navigation Cards */}
          <div className="lg:col-span-5 space-y-2.5 flex flex-col justify-between">
            {PILLARS.map((pillar) => {
              const isActive = activeTab === pillar.id;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(pillar.id);
                    setActiveMode('console');
                  }}
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

          {/* Right Column: Dynamic Inspection Console & Pairwise Agreement Matrix */}
          <div className="lg:col-span-7 relative rounded-md border border-neutral-800 bg-neutral-950 overflow-hidden min-h-[560px] shadow-xl shadow-black/80 flex flex-col justify-between">
            {/* Ambient Dither Canvas Background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-75">
              <Dither
                waveSpeed={0.04}
                waveFrequency={2.4}
                waveAmplitude={0.3}
                waveColor={activeMode === 'matrix' ? [0.35, 0.65, 0.85] : currentPillar.ditherColor}
                backgroundColor={[0.03, 0.03, 0.05]}
                colorNum={4}
                pixelSize={2}
                enableMouseInteraction={false}
              />
            </div>

            {/* Ambient subtle vignette overlay to keep text crisp */}
            <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-t from-neutral-950/70 via-transparent to-neutral-950/40" />

            {/* Header with Mode Switcher */}
            <div className="relative z-10 p-5 sm:p-6 border-b border-neutral-800/80 flex flex-wrap items-center justify-between gap-3 bg-neutral-950/50 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                  ENGINE CONSOLE
                </span>
              </div>

              {/* Console / Matrix Tabs */}
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
                  <span>PAIRWISE AGREEMENT MATRIX</span>
                </button>
              </div>
            </div>

            {/* Dynamic Content Body */}
            <div className="relative z-10 p-6 sm:p-7 flex flex-col justify-between flex-1">
              <AnimatePresence mode="wait">
                {activeMode === 'console' ? (
                  <motion.div
                    key={currentPillar.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col justify-between gap-6 h-full"
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

                    {/* Dark Inspection Code / Telemetry Console */}
                    <div className="rounded-md bg-black/50 backdrop-blur-sm border border-neutral-800 p-4 font-mono text-xs overflow-hidden shadow-inner mt-4">
                      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-neutral-800/80 text-neutral-400 text-[11px]">
                        <span className="truncate pr-2">{currentPillar.codePreview.title}</span>
                        <span className="text-neutral-400 font-bold shrink-0">
                          {currentPillar.codePreview.badge}
                        </span>
                      </div>
                      <div className="space-y-1.5 leading-relaxed overflow-x-auto">
                        {currentPillar.codePreview.lines.map((line, idx) => (
                          <div key={idx} className="flex gap-2">
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
                  </motion.div>
                ) : (
                  <motion.div
                    key="matrix"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col justify-between gap-6 h-full"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                          INTER-RATER CALIBRATION TELEMETRY
                        </span>
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-sm border bg-emerald-950/60 border-emerald-800 text-emerald-300">
                          COHORT MEAN κ = 0.78
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-xl text-white tracking-tight mb-2">
                        Pairwise Agreement Matrix (Cohen&apos;s κ)
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal mb-4">
                        Select any reviewer pair to inspect root-cause disagreement telemetry. Low agreement marks questions the rubric hasn’t answered yet.
                      </p>

                      {/* Interactive Pairwise Grid */}
                      <div className="p-3.5 rounded-md bg-black/40 border border-neutral-800 mb-4 overflow-x-auto">
                        <table className="w-full text-center font-mono text-xs">
                          <thead>
                            <tr>
                              <th className="p-1.5 text-neutral-500 font-normal text-left">Pairs</th>
                              {reviewers.map((r) => (
                                <th key={r} className="p-1.5 text-neutral-400 font-semibold">
                                  {r}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {reviewers.map((row) => (
                              <tr key={row}>
                                <td className="p-1.5 text-neutral-400 font-semibold text-left">{row}</td>
                                {reviewers.map((col) => {
                                  if (row === col) {
                                    return (
                                      <td key={col} className="p-1.5">
                                        <div className="py-1 px-2 rounded-sm bg-neutral-900/60 text-neutral-600 border border-neutral-800/40 select-none">
                                          1.00
                                        </div>
                                      </td>
                                    );
                                  }
                                  const cellData = getCellForPair(row, col);
                                  if (!cellData) {
                                    return (
                                      <td key={col} className="p-1.5 text-neutral-700">
                                        -
                                      </td>
                                    );
                                  }

                                  const isSelected = selectedCell.id === cellData.id;
                                  const colorClass =
                                    cellData.band === 'high'
                                      ? 'text-emerald-400 border-emerald-800/60 bg-emerald-950/30 hover:bg-emerald-900/40'
                                      : cellData.band === 'mid'
                                      ? 'text-amber-400 border-amber-800/60 bg-amber-950/30 hover:bg-amber-900/40'
                                      : 'text-rose-400 border-rose-800/60 bg-rose-950/30 hover:bg-rose-900/40';

                                  return (
                                    <td key={col} className="p-1.5">
                                      <button
                                        type="button"
                                        onClick={() => setSelectedCellId(cellData.id)}
                                        className={`w-full py-1 px-2 rounded-sm border font-bold transition-all cursor-pointer ${colorClass} ${
                                          isSelected ? 'ring-2 ring-white/80 scale-105 z-10' : ''
                                        }`}
                                      >
                                        {cellData.kappa}
                                      </button>
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Diagnostic Breakdown Card */}
                      <div className="rounded-md bg-black/60 border border-neutral-800 p-4 font-mono text-xs">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800 text-[11px]">
                          <span className="text-white font-bold">
                            PAIR: {selectedCell.reviewerA} ↔ {selectedCell.reviewerB}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-sm uppercase tracking-wider font-bold ${
                              selectedCell.band === 'high'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : selectedCell.band === 'mid'
                                ? 'bg-amber-950 text-amber-400 border border-amber-800'
                                : 'bg-rose-950 text-rose-400 border border-rose-800'
                            }`}
                          >
                            {selectedCell.band === 'high'
                              ? 'CONCORDANT (κ ≥ 0.75)'
                              : selectedCell.band === 'mid'
                              ? 'BORDERLINE (0.60 ≤ κ < 0.75)'
                              : 'DIVERGENCE (κ < 0.60)'}
                          </span>
                        </div>

                        <div className="space-y-2 text-neutral-300 font-sans text-xs">
                          <div>
                            <span className="font-mono text-neutral-400 block text-[10px] uppercase tracking-wider mb-0.5">
                              Diagnostic Signal:
                            </span>
                            <p className="leading-relaxed">{selectedCell.diagnostic}</p>
                          </div>

                          <div className="pt-1 border-t border-neutral-800/80">
                            <span className="font-mono text-neutral-400 block text-[10px] uppercase tracking-wider mb-0.5">
                              Engineering Remedy:
                            </span>
                            <p className="text-emerald-300/90 leading-relaxed">{selectedCell.remedy}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] font-mono text-neutral-400 border-t border-neutral-800/80 pt-3 flex items-center justify-between">
                      <span>Invisible Audit Seed Accuracy: 98.6%</span>
                      <span>Escalated Adjudication: 19.2%</span>
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
