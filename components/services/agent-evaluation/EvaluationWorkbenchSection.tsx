'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

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

const PILLARS: Pillar[] = [
  {
    id: 'rubrics',
    step: 'PILLAR 01',
    title: 'Task Grounding & Domain Rubrics',
    subtitle: 'Extracting realistic evaluation suites from enterprise traffic',
    description:
      'We work with your engineers and domain specialists to construct tasks derived directly from real production logs. Every scenario defines strict acceptance criteria, gold-standard reference responses, and non-negotiable edge cases.',
    specs: ['Task-grounded rubrics', 'Multi-turn branching graphs', 'Gold-standard reference sets'],
    ditherColor: [0.42, 0.65, 0.9],
    grainientColors: { color1: '#162238', color2: '#253d66', color3: '#3b629e' },
    codePreview: {
      title: 'task_rubric_financial_reconciliation.json',
      badge: 'RUBRIC SPEC v2.4',
      lines: [
        { label: 'OBJECTIVE', code: '"Reconcile cross-border transaction discrepancies against ERP"' },
        { label: 'DIMENSIONS', code: '["numerical_accuracy", "compliance_attestation", "audit_trace"]' },
        { label: 'GOLD_STANDARD', code: '{ "variance_threshold": 0.00, "disallow_rounding": true }' },
        { label: 'SEVERITY_BAND', code: '"Tier-1 Blocker (Immediate Release Failure on Mismatch)"', tone: 'accent' },
        { label: 'STATUS', code: 'CALIBRATED BY SENIOR TREASURY SPECIALISTS', tone: 'success' },
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
    ditherColor: [0.32, 0.78, 0.55],
    grainientColors: { color1: '#132e22', color2: '#1e4d3a', color3: '#2e7558' },
    codePreview: {
      title: 'verifier_sandbox_runner.py',
      badge: 'ENVIRONMENT RUNNER',
      lines: [
        { code: 'sandbox = IsolatedEnvironment.spawn(snapshot="erp_prod_clone_104")' },
        { code: 'trace = agent.execute(task_payload, timeout_sec=45.0)' },
        { code: 'assert sandbox.db.invariants_preserved(), "Invariant violation detected!"', tone: 'warn' },
        { code: 'assert sandbox.audit_log.verify_signature(trace.token), "Missing cryptographic trace"', tone: 'warn' },
        { code: 'RESULT: ALL 14 HARD ASSERTIONS PASSED [0 REGRESSIONS]', tone: 'success' },
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
    ditherColor: [0.85, 0.62, 0.35],
    grainientColors: { color1: '#362615', color2: '#573d1f', color3: '#825c2e' },
    codePreview: {
      title: 'adjudication_panel_telemetry.json',
      badge: 'INTER-RATER CALIBRATION',
      lines: [
        { label: 'PANEL_SIZE', code: '3 Independent Calibrated Domain Evaluators' },
        { label: 'AGREEMENT_SCORE', code: 'Krippendorff α = 0.942 (Very High Reliability)', tone: 'success' },
        { label: 'SAMPLE_#849', code: 'Reviewer A: Pass | Reviewer B: Pass | Reviewer C: Dispute' },
        { label: 'ADJUDICATION', code: '"Dispute resolved: Ambiguity in regulatory clause 4.2"', tone: 'neutral' },
        { label: 'OUTCOME', code: 'CONSENSUS CERTIFIED WITH INSPECTION TRACE', tone: 'success' },
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
    ditherColor: [0.72, 0.42, 0.92],
    grainientColors: { color1: '#2f1940', color2: '#4e246e', color3: '#7535a6' },
    codePreview: {
      title: 'evalixa_release_gate_summary.log',
      badge: 'CI/CD RELEASE GATE',
      lines: [
        { label: 'EVAL_RUN', code: 'Candidate: mistral-large-v2-tuned vs Baseline: prod-v1.8' },
        { label: 'TASKS_EVALUATED', code: '1,420 multi-turn scenarios across 50 dimensions' },
        { label: 'DELTA_REASONING', code: '+6.4% improvement on long-horizon tool chains', tone: 'success' },
        { label: 'DELTA_SECURITY', code: '0.0% prompt-injection escape rate [100% Defense]', tone: 'success' },
        { label: 'DECISION', code: 'DEPLOYMENT APPROVED — RELEASE GATE PASSED', tone: 'success' },
      ],
    },
  },
];

export default function EvaluationWorkbenchSection() {
  const [activeTab, setActiveTab] = useState<string>(PILLARS[0].id);

  const currentPillar = PILLARS.find((p) => p.id === activeTab) || PILLARS[0];

  return (
    <section id="workbench" className="relative w-full py-20 sm:py-28 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-2.5">
            EVALUATION ENGINE ARCHITECTURE
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
            Engineered for Precision. Built for Auditable Decisions.
          </h2>
        </div>

        {/* 2-Column Interactive Workbench with less curvy borders (rounded-md) */}
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
          <div className="lg:col-span-7 relative rounded-md border border-neutral-800 bg-neutral-950 overflow-hidden min-h-[500px] shadow-xl shadow-black/80 flex flex-col justify-between">
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

            {/* Ambient subtle vignette overlay to keep text crisp without dimming the waves */}
            <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-t from-neutral-950/70 via-transparent to-neutral-950/40" />

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
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
