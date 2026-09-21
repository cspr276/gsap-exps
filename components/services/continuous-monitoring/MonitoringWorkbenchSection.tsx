'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Activity } from 'lucide-react';

const Dither = dynamic(() => import('@/components/Dither'), { ssr: false });
const Grainient = dynamic(() => import('@/components/Grainient'), { ssr: false });

interface CodeLine {
  label?: string;
  code: string;
  tone?: 'neutral' | 'success' | 'warn' | 'accent';
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
  forensicPreview: {
    title: string;
    badge: string;
    lines: CodeLine[];
  };
}

const PILLARS: Pillar[] = [
  {
    id: 'drift',
    step: 'PILLAR 01',
    title: 'Segmented Drift Detection',
    subtitle: 'Tracking input and output distribution shifts by cohort',
    description:
      'Averages mask localized disasters. When an LLM degrades, it almost never degrades across all users uniformly. We track distribution shifts in embedding space and output lengths segmented by user tier, locale, and multi-turn depth.',
    specs: [
      'Wasserstein distance scoring',
      'Segmented cohort sampling',
      'Input/output embedding drift',
      'Turn-depth degradation curves',
    ],
    ditherColor: [0.42, 0.65, 0.9],
    grainientColors: { color1: '#162238', color2: '#253d66', color3: '#3b629e' },
    codePreview: {
      title: 'cohort_drift_analyzer.json',
      badge: 'DISTRIBUTION TELEMETRY',
      lines: [
        { label: 'COHORT', code: '"enterprise_de_DE (Turn Depth >= 7)"' },
        { label: 'SAMPLE_SIZE', code: '1,420 conversations (stratified 10% live slice)' },
        { label: 'INPUT_DRIFT', code: 'Wasserstein Distance = 0.418 [THRESHOLD BREACHED]', tone: 'warn' },
        { label: 'QUALITY_SLIP', code: '-34.2% factual groundedness vs rolling 30d baseline', tone: 'warn' },
        { label: 'DIAGNOSTIC', code: '"Index build 219 introduced ungrounded regional terminology"', tone: 'accent' },
        { label: 'STATUS', code: 'DISPATCHED AUTOMATED ALERT TO RETRIEVAL SQUAD', tone: 'success' },
      ],
    },
    forensicPreview: {
      title: 'cohort_divergence_summary.log',
      badge: 'FORENSIC DELTA',
      lines: [
        { label: 'WINDOW', code: 'Rolling 14-day cohort comparison vs release prod-v2.1' },
        { label: 'GLOBAL_MEAN', code: '94.2% -> 93.8% (looks healthy in executive dashboard)' },
        { label: 'SEGMENT_MEAN', code: '92.0% -> 61.4% (critical localized collapse in German locale)', tone: 'warn' },
        { label: 'DETECTION_LAG', code: '< 45 minutes from index deploy to automated alert', tone: 'success' },
        { label: 'RECOMMENDATION', code: 'Roll back index partition build_219; maintain prompt v38', tone: 'accent' },
      ],
    },
  },
  {
    id: 'traces',
    step: 'PILLAR 02',
    title: 'Structured Execution Traces',
    subtitle: 'Document provenance, tool latency, and prompt versions',
    description:
      'Every single model invocation is logged with absolute provenance. You cannot diagnose a failure if you do not know which prompt template, model checkpoint, retrieval snapshot, and tool call payload produced it.',
    specs: [
      'W3C TraceContext standards',
      'Cryptographic prompt versioning',
      'Untrusted context provenance',
      'Sub-100ms async overhead',
    ],
    ditherColor: [0.32, 0.78, 0.55],
    grainientColors: { color1: '#132e22', color2: '#1e4d3a', color3: '#2e7558' },
    codePreview: {
      title: 'trace_span_8f21c4.json',
      badge: 'STRUCTURED SPAN',
      lines: [
        { label: 'SPAN_ID', code: '"spn_8f21c4e902b" · turn 7 of 11 · locale de-DE' },
        { label: 'VERSIONS', code: 'model: gpt-x@2026-07-14 · prompt: v38 · index: build_219' },
        { label: 'CONTEXT', code: '4 documents retrieved · 1 marked UNTRUSTED (customer upload)', tone: 'warn' },
        { label: 'TOOL_SPANS', code: 'lookup_order() 240ms [200 OK] · refund_policy() 90ms [200 OK]' },
        { label: 'SIGNALS', code: 'quality: 0.42 · groundedness: FAIL · escalated to human', tone: 'warn' },
        { label: 'TRACE_STATUS', code: 'REPRODUCIBLE FORENSIC RECORD COMMITTED TO VAULT', tone: 'success' },
      ],
    },
    forensicPreview: {
      title: 'span_replay_inspection.json',
      badge: 'RECORDED PROVENANCE',
      lines: [
        { label: 'REPLAY_HARNESS', code: 'Spanned context reconstructed in isolated sandbox runner' },
        { label: 'UNTRUSTED_FLAG', code: 'Document #3 flagged untrusted: prompt injection vector detected', tone: 'warn' },
        { label: 'LATENCY_BILL', code: 'Retrieval: 110ms | Model TTFT: 340ms | Tool calls: 330ms' },
        { label: 'MUTATION_CHECK', code: 'Database invariants preserved; transaction safely aborted', tone: 'success' },
        { label: 'ARTIFACT_HASH', code: 'SHA256: 9b2d8e4f... (immutable audit trail stored 90 days)' },
      ],
    },
  },
  {
    id: 'signals',
    step: 'PILLAR 03',
    title: 'Implicit Quality Signals',
    subtitle: 'Escalation, user abandonment, and session retries',
    description:
      'Running an LLM-as-a-judge on 100% of live traffic is cost-prohibitive, and customer support tickets lag by weeks. We aggregate high-frequency implicit behavioral signals: rapid user query rephrasing, human supervisor escalation, and abrupt session abandonment.',
    specs: [
      'Zero extra model invocation cost',
      'Immediate rephrase velocity',
      'Escalation rate correlation',
      'Early warning telemetry',
    ],
    ditherColor: [0.85, 0.62, 0.35],
    grainientColors: { color1: '#362615', color2: '#573d1f', color3: '#825c2e' },
    codePreview: {
      title: 'implicit_signal_telemetry.py',
      badge: 'BEHAVIOR STREAM',
      lines: [
        { code: 'stream = TelemetryEngine.stream(metric="implicit_signals", window="15m")' },
        { label: 'REPHRASE_SPIKE', code: '+18.4% immediate re-prompting detected in Checkout flow', tone: 'warn' },
        { label: 'ESCALATION_RATE', code: 'Human handoff rate surged from 2.1% to 11.8%', tone: 'warn' },
        { label: 'ATTRIBUTION', code: 'Strong statistical correlation (r=0.91) with prompt v41.2 deploy', tone: 'accent' },
        { label: 'CONFIDENCE', code: 'High-confidence early signal detected 19 days before user ticket', tone: 'success' },
        { label: 'STATUS', code: 'CIRCUIT BREAKER TRIGGERED: TRAFFIC DIVERTED TO CANARY', tone: 'warn' },
      ],
    },
    forensicPreview: {
      title: 'behavior_correlation_matrix.json',
      badge: 'CORRELATION ENGINE',
      lines: [
        { label: 'METRIC_1', code: 'Rapid query rephrasing (< 8 seconds between turns): +44%' },
        { label: 'METRIC_2', code: 'Supervisor rejection rate on generated summaries: +29%', tone: 'warn' },
        { label: 'METRIC_3', code: 'Session drop-off at payment intent confirmation: +12%', tone: 'warn' },
        { label: 'ROOT_CAUSE', code: 'System prompt regression omitting discount application rules', tone: 'accent' },
        { label: 'ACTION', code: 'Incident opened automatically before support ticket created', tone: 'success' },
      ],
    },
  },
  {
    id: 'gates',
    step: 'PILLAR 04',
    title: 'CI/CD Automated Regression Gates',
    subtitle: 'Blocking deployments on offline test failures',
    description:
      'The moment a production failure is triaged and resolved, it is automatically sanitized and added to a permanent offline regression suite. Every future PR altering prompts, models, or tool schemas must pass this gate before merge.',
    specs: [
      'GitHub Actions / GitLab CI runner',
      'Blocking release criteria',
      'Deterministic invariant checks',
      'Permanent failure catalog',
    ],
    ditherColor: [0.72, 0.42, 0.92],
    grainientColors: { color1: '#2f1940', color2: '#4e246e', color3: '#7535a6' },
    codePreview: {
      title: 'ci_regression_gate.log',
      badge: 'RELEASE GATE',
      lines: [
        { label: 'PULL_REQUEST', code: 'PR #582 "Refactor order cancellation agent system prompt"' },
        { label: 'REGRESSION_SET', code: '4,820 historical incident cases executed across 12 cohorts' },
        { label: 'FAILURES', code: '0 regressions detected against historical failure catalog', tone: 'success' },
        { label: 'DIFF_ANALYSIS', code: 'Latency delta: -12ms · Groundedness score delta: +1.8%', tone: 'success' },
        { label: 'GATE_STATUS', code: 'ALL GATES PASSED — PULL REQUEST CLEARED FOR MERGE', tone: 'success' },
      ],
    },
    forensicPreview: {
      title: 'regression_suite_report.json',
      badge: 'PERMANENT TEST SUITE',
      lines: [
        { label: 'SUITE_SIZE', code: '4,820 active test cases (100% derived from live incidents)' },
        { label: 'EXECUTION_TIME', code: '3 minutes 12 seconds in parallel distributed CI runner' },
        { label: 'HARD_GATES', code: '0 tolerance on schema violations and prompt-injection escapes', tone: 'accent' },
        { label: 'DRIFT_BOUNDS', code: 'Maximum permissible semantic drift: 0.05% (measured: 0.02%)', tone: 'success' },
        { label: 'DEPLOY_HASH', code: 'git commit 4f1a09e signed by CI gatekeeper [READY]', tone: 'success' },
      ],
    },
  },
];

export default function MonitoringWorkbenchSection() {
  const [activeTab, setActiveTab] = useState<string>(PILLARS[0].id);
  const [viewMode, setViewMode] = useState<'telemetry' | 'forensics'>('telemetry');

  const currentPillar = PILLARS.find((p) => p.id === activeTab) || PILLARS[0];

  return (
    <section id="workbench" className="relative w-full py-20 sm:py-28 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-2.5">
            CONTINUOUS OBSERVABILITY ARCHITECTURE
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
            Engineered for Live Quality Signals. Built for Permanent Regressions.
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
          <div className="lg:col-span-7 relative rounded-md border border-neutral-800 bg-neutral-950 overflow-hidden min-h-[520px] shadow-xl shadow-black/80 flex flex-col justify-between">
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

                  {/* Interactive Telemetry / Trace Replay Terminal */}
                  <div className="rounded-md bg-black/60 backdrop-blur-md border border-neutral-800 p-4 font-mono text-xs overflow-hidden shadow-inner mt-4">
                    {/* Console Header with Mode Toggle Tabs */}
                    <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-neutral-800 text-[11px]">
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
                          <Activity className="w-3.5 h-3.5" />
                          <span>Live Telemetry</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setViewMode('forensics')}
                          className={`flex items-center gap-1.5 px-2 py-1 rounded-sm cursor-pointer transition-colors ${
                            viewMode === 'forensics'
                              ? 'bg-neutral-800 text-white font-semibold'
                              : 'text-neutral-400 hover:text-neutral-200'
                          }`}
                        >
                          <Terminal className="w-3.5 h-3.5" />
                          <span>Forensic Trace</span>
                        </button>
                      </div>

                      <span className="text-neutral-400 font-bold shrink-0">
                        {viewMode === 'telemetry'
                          ? currentPillar.codePreview.badge
                          : currentPillar.forensicPreview.badge}
                      </span>
                    </div>

                    {/* Console Title Sub-Header */}
                    <div className="text-[10px] text-neutral-400 mb-2 truncate">
                      File:{' '}
                      {viewMode === 'telemetry'
                        ? currentPillar.codePreview.title
                        : currentPillar.forensicPreview.title}
                    </div>

                    {/* Output Code Stream */}
                    <div className="space-y-1.5 leading-relaxed overflow-x-auto min-h-[140px]">
                      {(viewMode === 'telemetry'
                        ? currentPillar.codePreview.lines
                        : currentPillar.forensicPreview.lines
                      ).map((line, idx) => (
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
