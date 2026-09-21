'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShieldAlert, Zap, Sliders, Terminal } from 'lucide-react';

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
    id: 'transport-quota',
    step: 'PILLAR 01',
    title: 'Transport & Quota Pre-Filtering',
    subtitle: 'Microsecond rate limits and spend caps before token generation',
    description:
      'Authentication, per-tenant rate limits, request payload size guards, and cumulative spend caps. Stops volumetric abuse, denial-of-wallet, and automated token scraping before a single inference token is generated.',
    specs: ['µs-scale rate enforcement', 'Token & spend caps', 'Volumetric DDoS suppression'],
    ditherColor: [0.32, 0.78, 0.55],
    grainientColors: { color1: '#132e22', color2: '#1e4d3a', color3: '#2e7558' },
    codePreview: {
      title: 'rate_quota_prefilter.rs',
      badge: 'µs TRANSPORT GUARD',
      lines: [
        { label: 'TENANT_QUOTA', code: 'rate_limiter.acquire(tenant_id, cost_units=12)' },
        { label: 'BURST_WINDOW', code: 'SlidingWindowTracker::evaluate(interval=1000ms)' },
        { label: 'SPEND_CAP', code: '$450.00 / $500.00 daily ceiling [HEALTHY]', tone: 'success' },
        { label: 'VOLUMETRIC_CHECK', code: 'ZERO_ANOMALY: payload_bytes=4,120 < limit=32,768', tone: 'success' },
        { label: 'ACTION', code: 'FORWARDED_TO_STAGE_2 (elapsed: 140µs)', tone: 'success' },
      ],
    },
  },
  {
    id: 'structural-provenance',
    step: 'PILLAR 02',
    title: 'Structural Checks & Provenance Tagging',
    subtitle: 'Sub-millisecond untrusted context isolation and schema validation',
    description:
      'Strict schema validation, content-type and encoding normalization, and cryptographic provenance tagging. Untrusted spans, user-controlled context, and external tool outputs stay explicitly labeled across the entire agent lifecycle.',
    specs: ['Sub-ms schema validation', 'Encoding normalization', 'Taint & provenance tags'],
    ditherColor: [0.42, 0.65, 0.9],
    grainientColors: { color1: '#162238', color2: '#253d66', color3: '#3b629e' },
    codePreview: {
      title: 'provenance_taint_engine.go',
      badge: 'SUB-MS ISOLATION',
      lines: [
        { label: 'NORMALIZER', code: 'UnicodeNFKC::sanitize(input_bytes)' },
        { label: 'SCHEMA_VALIDATION', code: 'validate_json_schema(payload, strict_mode=true)', tone: 'success' },
        { label: 'PROVENANCE_TAG', code: 'tag_span(source="untrusted_user_input", span_id="0x7fe4")', tone: 'accent' },
        { label: 'TAINT_TRACKING', code: 'bind_taint_propagation(context, sink_policies=["sql", "shell"])' },
        { label: 'STATUS', code: 'CONTEXT ISOLATED & TAGGED (elapsed: 0.8ms)', tone: 'success' },
      ],
    },
  },
  {
    id: 'classifiers-egress',
    step: 'PILLAR 03',
    title: 'Fast Inline Classifiers & Egress Allowlists',
    subtitle: 'Low-latency pattern matching, token defenses, and network perimeter controls',
    description:
      'Compact, distilled classifiers trained on known injection heuristics running in milliseconds inline. Combined with strict egress allowlists that constrain which outbound APIs, database schemas, and tools an agent can invoke.',
    specs: ['< 5ms neural classifier', 'Strict egress allowlist', 'Tool execution boundaries'],
    ditherColor: [0.85, 0.62, 0.35],
    grainientColors: { color1: '#362615', color2: '#573d1f', color3: '#825c2e' },
    codePreview: {
      title: 'inline_classifier_egress_gate.ts',
      badge: 'INLINE PERIMETER',
      lines: [
        { label: 'FAST_CLASSIFIER', code: 'classifier.infer(tokens, threshold=0.92)', tone: 'success' },
        { label: 'INJECTION_SCORE', code: '0.014 [PASS - No Known Attack Vector]', tone: 'success' },
        { label: 'EGRESS_POLICY', code: 'assert_allowed_endpoint(dest="api.internal.erp/v1")', tone: 'warn' },
        { label: 'TOOL_ALLOWLIST', code: '["read_calendar", "query_inventory"] [RESTRICTED]', tone: 'neutral' },
        { label: 'CONTAINMENT', code: 'NETWORK BOUNDARY VERIFIED (elapsed: 4.2ms)', tone: 'success' },
      ],
    },
  },
  {
    id: 'async-review-tuning',
    step: 'PILLAR 04',
    title: 'Asynchronous Model Review & Tuning',
    subtitle: 'Out-of-band deep analysis without user latency',
    description:
      'Heavy model-based judges and expert human reviewers analyze sampled and flagged traffic out of the hot path. Generates continuous drift telemetry, catches subtle multi-turn evasions, and retrains the inline classifiers.',
    specs: ['Out-of-band adjudication', 'Zero user latency impact', 'Continuous threshold tuning'],
    ditherColor: [0.72, 0.42, 0.92],
    grainientColors: { color1: '#2f1940', color2: '#4e246e', color3: '#7535a6' },
    codePreview: {
      title: 'async_adjudication_worker.py',
      badge: 'OUT-OF-BAND TUNER',
      lines: [
        { label: 'QUEUE_CONSUMER', code: 'kafka_consumer.poll(batch_size=50, flag="borderline")' },
        { label: 'DEEP_JUDGE', code: 'evaluator_llm.adjudicate(session_context, full_turns=12)' },
        { label: 'DISCORDANCE', code: 'flagged_novel_paraphrase(confidence=0.982)', tone: 'warn' },
        { label: 'WEIGHT_EXPORT', code: 'retrain_compact_model.emit_synthetic_weights()', tone: 'accent' },
        { label: 'LATENCY_IMPACT', code: 'HOT PATH PENALTY: 0.00ms [COMPLETELY ASYNC]', tone: 'success' },
      ],
    },
  },
];

interface LatencyControl {
  id: string;
  name: string;
  ms: number;
  description: string;
  isInline: boolean;
  defaultActive: boolean;
  isHeavyWarning?: boolean;
}

const LATENCY_CONTROLS: LatencyControl[] = [
  {
    id: 'quota',
    name: 'Rate & Spend Limits',
    ms: 1,
    description: 'µs rate windows and spend caps. Completely immune to token cost.',
    isInline: true,
    defaultActive: true,
  },
  {
    id: 'struct',
    name: 'Structural & Provenance',
    ms: 3,
    description: 'Schema normalizer and taint tracking tags.',
    isInline: true,
    defaultActive: true,
  },
  {
    id: 'pattern',
    name: 'Pattern Matching Heuristics',
    ms: 2,
    description: 'Catches known signatures and lazy injection payloads.',
    isInline: true,
    defaultActive: true,
  },
  {
    id: 'clf',
    name: 'Fast Compact Classifier',
    ms: 24,
    description: 'Distilled neural classifier running inline on token sequences.',
    isInline: true,
    defaultActive: true,
  },
  {
    id: 'egress',
    name: 'Policy & Egress Allowlist',
    ms: 4,
    description: 'Enforces tool, database, and outbound endpoint boundary constraints.',
    isInline: true,
    defaultActive: true,
  },
  {
    id: 'judge',
    name: 'Model-as-a-Judge (Inline)',
    ms: 600,
    description: 'Heavy multi-billion parameter model evaluation in the hot path.',
    isInline: true,
    defaultActive: false,
    isHeavyWarning: true,
  },
];

export default function DetectionWorkbenchSection() {
  const [activeTab, setActiveTab] = useState<string>(PILLARS[0].id);
  const [activeMode, setActiveMode] = useState<'console' | 'simulator'>('console');
  const [activeControls, setActiveControls] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    LATENCY_CONTROLS.forEach((c) => {
      initial[c.id] = c.defaultActive;
    });
    return initial;
  });

  const currentPillar = PILLARS.find((p) => p.id === activeTab) || PILLARS[0];

  const toggleControl = (id: string) => {
    setActiveControls((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const totalLatencyMs = LATENCY_CONTROLS.reduce((sum, item) => {
    return activeControls[item.id] ? sum + item.ms : sum;
  }, 0);

  const budgetCeilingMs = 120;
  const isOverBudget = totalLatencyMs > budgetCeilingMs;
  const budgetPercentage = Math.min(100, Math.round((totalLatencyMs / budgetCeilingMs) * 100));

  return (
    <section id="workbench" className="relative w-full py-20 sm:py-28 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-2.5">
            DEFENSE WORKBENCH & LATENCY ENGINE
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
            Layered Runtime Defenses. Sized for Real-World Latency.
          </h2>
        </div>

        {/* 2-Column Interactive Workbench with clean rectangular borders (rounded-md) */}
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

          {/* Right Column: Dynamic Inspection Console & Latency Budget Simulator */}
          <div className="lg:col-span-7 relative rounded-md border border-neutral-800 bg-neutral-950 overflow-hidden min-h-[560px] shadow-xl shadow-black/80 flex flex-col justify-between">
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

            {/* Ambient subtle vignette overlay to keep text crisp */}
            <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-t from-neutral-950/70 via-transparent to-neutral-950/40" />

            {/* Header with Mode Switcher */}
            <div className="relative z-10 p-5 sm:p-6 border-b border-neutral-800/80 flex flex-wrap items-center justify-between gap-3 bg-neutral-950/50 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                  ENGINE CONSOLE
                </span>
              </div>

              {/* Console / Simulator Tabs */}
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
                  onClick={() => setActiveMode('simulator')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm transition-all cursor-pointer ${
                    activeMode === 'simulator'
                      ? 'bg-neutral-800 text-white font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>LATENCY BUDGET SIMULATOR</span>
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
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                          {currentPillar.step} ARCHITECTURE
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight mb-2">
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
                    <div className="rounded-md bg-black/60 backdrop-blur-sm border border-neutral-800 p-4 font-mono text-xs overflow-hidden shadow-inner mt-4">
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
                    key="simulator"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col justify-between gap-6 h-full"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                          HOT PATH COST MODEL
                        </span>
                        <span
                          className={`font-mono text-xs font-bold px-2 py-0.5 rounded-sm border ${
                            isOverBudget
                              ? 'bg-rose-950/60 border-rose-800 text-rose-300'
                              : 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
                          }`}
                        >
                          {isOverBudget ? 'BUDGET EXCEEDED' : 'SLA COMPLIANT'}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-xl text-white tracking-tight mb-2">
                        Interactive Latency Budget Simulator
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal mb-4">
                        Toggle defense layers to calculate live request overhead. A defense that exceeds your platform team’s SLA will be turned off in production.
                      </p>

                      {/* Budget Gauge Bar */}
                      <div className="p-3.5 rounded-md bg-black/40 border border-neutral-800 mb-5">
                        <div className="flex items-center justify-between font-mono text-xs mb-2">
                          <span className="text-neutral-400">Total Added Overhead:</span>
                          <span className={`font-bold ${isOverBudget ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {totalLatencyMs}ms{' '}
                            <span className="text-neutral-500 font-normal">/ {budgetCeilingMs}ms SLA Ceiling</span>
                          </span>
                        </div>

                        <div className="w-full bg-neutral-900 rounded-full h-2 overflow-hidden border border-neutral-800">
                          <div
                            className={`h-full transition-all duration-300 ${
                              isOverBudget ? 'bg-rose-500' : 'bg-emerald-400'
                            }`}
                            style={{ width: `${Math.min(100, (totalLatencyMs / budgetCeilingMs) * 100)}%` }}
                          />
                        </div>
                      </div>

                      {/* Toggles */}
                      <div className="space-y-2">
                        {LATENCY_CONTROLS.map((control) => {
                          const isActive = !!activeControls[control.id];
                          return (
                            <button
                              key={control.id}
                              type="button"
                              onClick={() => toggleControl(control.id)}
                              className={`w-full flex items-center justify-between p-2.5 rounded-md border text-left transition-all cursor-pointer ${
                                isActive
                                  ? control.isHeavyWarning
                                    ? 'bg-rose-950/30 border-rose-800/80 text-white'
                                    : 'bg-neutral-900/80 border-neutral-700 text-white'
                                  : 'bg-black/30 border-neutral-800/60 text-neutral-400 hover:border-neutral-700'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <div
                                  className={`w-4 h-4 rounded-sm flex items-center justify-center border transition-all ${
                                    isActive
                                      ? control.isHeavyWarning
                                        ? 'bg-rose-500 border-rose-400 text-white'
                                        : 'bg-white border-white text-black'
                                      : 'border-neutral-700 bg-neutral-900'
                                  }`}
                                >
                                  {isActive && <Check className="w-3 h-3 stroke-[3]" />}
                                </div>
                                <div>
                                  <div className="font-mono text-xs font-semibold flex items-center gap-2">
                                    <span>{control.name}</span>
                                    {control.isHeavyWarning && (
                                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-sm bg-rose-900/60 text-rose-300 border border-rose-800">
                                        HEAVY INLINE JUDGE
                                      </span>
                                    )}
                                  </div>
                                  <p className="font-sans text-[11px] text-neutral-400 leading-tight">
                                    {control.description}
                                  </p>
                                </div>
                              </div>
                              <span className="font-mono text-xs font-bold shrink-0 pl-2">
                                +{control.ms}ms
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Advisory Callout */}
                    <div
                      className={`rounded-md p-3.5 border font-mono text-xs flex items-start gap-2.5 ${
                        isOverBudget
                          ? 'bg-rose-950/40 border-rose-800 text-rose-200'
                          : 'bg-neutral-900/60 border-neutral-800 text-neutral-300'
                      }`}
                    >
                      {isOverBudget ? (
                        <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      ) : (
                        <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span className="font-bold block mb-0.5">
                          {isOverBudget ? 'Warning: Latency SLA Blown' : 'Architecture Balanced for Hot Path'}
                        </span>
                        <p className="font-sans text-[11px] text-neutral-400 leading-relaxed font-normal">
                          {isOverBudget
                            ? 'Adding model-based judges directly in the user request path adds 600ms+ of user-facing lag. Move deep evaluation to Pillar 4 (Async Review) to retain full security coverage with 0ms user penalty.'
                            : 'Layered defense: µs rate limits and sub-5ms compact classifiers absorb volumetric and known threats, leaving deep reasoning to asynchronous background workers.'}
                        </p>
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
