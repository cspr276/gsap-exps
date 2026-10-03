'use client';

import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShieldAlert, Zap, Sliders, Terminal } from 'lucide-react';
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

// 100% Monochromatic (Obsidian, Graphite, Slate & Platinum Silvers)
const PILLARS: Pillar[] = [
  {
    id: 'transport-quota',
    category: 'TRANSPORT GUARD',
    title: 'Transport & Quota Pre-Filtering',
    subtitle: 'Microsecond rate limits and spend caps before token generation',
    description:
      'Authentication, per-tenant rate limits, request payload size guards, and cumulative spend caps. Stops volumetric abuse, denial-of-wallet, and automated token scraping before a single inference token is generated.',
    specs: ['µs-scale rate enforcement', 'Token & spend caps', 'Volumetric DDoS suppression'],
    codePreview: {
      title: 'rate_quota_prefilter.rs',
      badge: 'µs TRANSPORT GUARD',
      lines: [
        { label: 'TENANT_QUOTA', code: 'rate_limiter.acquire(tenant_id, cost_units=12)' },
        { label: 'BURST_WINDOW', code: 'SlidingWindowTracker::evaluate(interval=1000ms)' },
        { label: 'SPEND_CAP', code: '$450.00 / $500.00 daily ceiling [HEALTHY]', tone: 'accent' },
        { label: 'VOLUMETRIC_CHECK', code: 'ZERO_ANOMALY: payload_bytes=4,120 < limit=32,768', tone: 'highlight' },
        { label: 'ACTION', code: 'FORWARDED_TO_STAGE_2 (elapsed: 140µs)', tone: 'accent' },
      ],
    },
  },
  {
    id: 'structural-provenance',
    category: 'CONTEXT ISOLATION',
    title: 'Structural Checks & Provenance Tagging',
    subtitle: 'Sub-millisecond untrusted context isolation and schema validation',
    description:
      'Strict schema validation, content-type and encoding normalization, and cryptographic provenance tagging. Untrusted spans, user-controlled context, and external tool outputs stay explicitly labeled across the entire agent lifecycle.',
    specs: ['Sub-ms schema validation', 'Encoding normalization', 'Taint & provenance tags'],
    codePreview: {
      title: 'provenance_taint_engine.go',
      badge: 'SUB-MS ISOLATION',
      lines: [
        { label: 'NORMALIZER', code: 'UnicodeNFKC::sanitize(input_bytes)' },
        { label: 'SCHEMA_VALIDATION', code: 'validate_json_schema(payload, strict_mode=true)', tone: 'accent' },
        { label: 'PROVENANCE_TAG', code: 'tag_span(source="untrusted_user_input", span_id="0x7fe4")', tone: 'highlight' },
        { label: 'TAINT_TRACKING', code: 'bind_taint_propagation(context, sink_policies=["sql", "shell"])' },
        { label: 'STATUS', code: 'CONTEXT ISOLATED & TAGGED (elapsed: 0.8ms)', tone: 'accent' },
      ],
    },
  },
  {
    id: 'classifiers-egress',
    category: 'INLINE PERIMETER',
    title: 'Fast Inline Classifiers & Egress Allowlists',
    subtitle: 'Low-latency pattern matching, token defenses, and network perimeter controls',
    description:
      'Compact, distilled classifiers trained on known injection heuristics running in milliseconds inline. Combined with strict egress allowlists that constrain which outbound APIs, database schemas, and tools an agent can invoke.',
    specs: ['< 5ms neural classifier', 'Strict egress allowlist', 'Tool execution boundaries'],
    codePreview: {
      title: 'inline_classifier_egress_gate.ts',
      badge: 'INLINE PERIMETER',
      lines: [
        { label: 'FAST_CLASSIFIER', code: 'classifier.infer(tokens, threshold=0.92)', tone: 'accent' },
        { label: 'INJECTION_SCORE', code: '0.014 [PASS - No Known Attack Vector]', tone: 'accent' },
        { label: 'EGRESS_POLICY', code: 'assert_allowed_endpoint(dest="api.internal.erp/v1")', tone: 'highlight' },
        { label: 'TOOL_ALLOWLIST', code: '["read_calendar", "query_inventory"] [RESTRICTED]', tone: 'neutral' },
        { label: 'CONTAINMENT', code: 'NETWORK BOUNDARY VERIFIED (elapsed: 4.2ms)', tone: 'accent' },
      ],
    },
  },
  {
    id: 'async-review-tuning',
    category: 'OUT-OF-BAND TUNER',
    title: 'Asynchronous Model Review & Tuning',
    subtitle: 'Out-of-band deep analysis without user latency',
    description:
      'Heavy model-based judges and expert human reviewers analyze sampled and flagged traffic out of the hot path. Generates continuous drift telemetry, catches subtle multi-turn evasions, and retrains the inline classifiers.',
    specs: ['Out-of-band adjudication', 'Zero user latency impact', 'Continuous threshold tuning'],
    codePreview: {
      title: 'async_adjudication_worker.py',
      badge: 'OUT-OF-BAND TUNER',
      lines: [
        { label: 'QUEUE_CONSUMER', code: 'kafka_consumer.poll(batch_size=50, flag="borderline")' },
        { label: 'DEEP_JUDGE', code: 'evaluator_llm.adjudicate(session_context, full_turns=12)' },
        { label: 'DISCORDANCE', code: 'flagged_novel_paraphrase(confidence=0.982)', tone: 'highlight' },
        { label: 'WEIGHT_EXPORT', code: 'retrain_compact_model.emit_synthetic_weights()', tone: 'accent' },
        { label: 'LATENCY_IMPACT', code: 'HOT PATH PENALTY: 0.00ms [COMPLETELY ASYNC]', tone: 'accent' },
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
    ms: 5,
    description: 'Distilled SLM scoring injection probability inline.',
    isInline: true,
    defaultActive: true,
  },
  {
    id: 'egress',
    name: 'Strict Egress Allowlist',
    ms: 2,
    description: 'Validates outbound URL destination and tool parameter schema.',
    isInline: true,
    defaultActive: true,
  },
  {
    id: 'heavy-llm',
    name: 'Inline Heavy LLM Guard',
    ms: 650,
    description: 'Synchronous frontier model call evaluating complete prompt on hot path.',
    isInline: false,
    defaultActive: false,
    isHeavyWarning: true,
  },
];

export default function DetectionWorkbenchSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const laserLineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeMode, setActiveMode] = useState<'console' | 'simulator'>('console');

  // Latency Simulator state
  const [activeControls, setActiveControls] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    LATENCY_CONTROLS.forEach((c) => {
      initial[c.id] = c.defaultActive;
    });
    return initial;
  });

  const toggleControl = (id: string) => {
    setActiveControls((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const totalLatencyMs = LATENCY_CONTROLS.reduce((sum, item) => {
    return activeControls[item.id] ? sum + item.ms : sum;
  }, 0);

  const budgetCeilingMs = 50;
  const isOverBudget = totalLatencyMs > budgetCeilingMs;

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
          id: 'workbench-pin-detection',
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

    const st = ScrollTrigger.getById('workbench-pin-detection');
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
              TIERED DEFENSE-IN-DEPTH
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
              Sub-Millisecond Guardrails. Zero Blind Spots.
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

          {/* Right Column: Dynamic Inspection Console & Latency Budget Simulator */}
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
                  ENGINE CONSOLE
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
                    key="simulator"
                    initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col justify-between h-full"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                          HOT PATH COST MODEL
                        </span>
                        <span
                          className={`font-mono text-xs font-bold px-2 py-0.5 rounded-sm border ${
                            isOverBudget
                              ? 'bg-neutral-900 border-neutral-700 text-neutral-200'
                              : 'bg-neutral-900 border-neutral-700 text-white'
                          }`}
                        >
                          {isOverBudget ? 'BUDGET EXCEEDED' : 'SLA COMPLIANT'}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight mb-1.5">
                        Interactive Latency Budget Simulator
                      </h3>
                      <p className="font-sans text-xs text-neutral-300 leading-relaxed font-normal mb-3">
                        Toggle defense layers to calculate live request overhead against your platform team’s SLA ceiling.
                      </p>

                      {/* Budget Gauge Bar */}
                      <div className="p-3 rounded-md bg-black/60 border border-neutral-800 mb-3">
                        <div className="flex items-center justify-between font-mono text-xs mb-1.5">
                          <span className="text-neutral-400">Total Added Overhead:</span>
                          <span className={`font-bold ${isOverBudget ? 'text-white' : 'text-neutral-200'}`}>
                            {totalLatencyMs}ms{' '}
                            <span className="text-neutral-500 font-normal">/ {budgetCeilingMs}ms SLA Ceiling</span>
                          </span>
                        </div>

                        <div className="w-full bg-neutral-900 rounded-full h-1.5 overflow-hidden border border-neutral-800">
                          <div
                            className={`h-full transition-all duration-300 ${
                              isOverBudget ? 'bg-white' : 'bg-neutral-400'
                            }`}
                            style={{ width: `${Math.min(100, (totalLatencyMs / budgetCeilingMs) * 100)}%` }}
                          />
                        </div>
                      </div>

                      {/* Toggles */}
                      <div className="space-y-1.5">
                        {LATENCY_CONTROLS.map((control) => {
                          const isActive = !!activeControls[control.id];
                          return (
                            <button
                              key={control.id}
                              type="button"
                              onClick={() => toggleControl(control.id)}
                              className={`w-full flex items-center justify-between p-2 rounded-md border text-left transition-all cursor-pointer ${
                                isActive
                                  ? 'bg-neutral-900/80 border-neutral-700 text-white'
                                  : 'bg-black/30 border-neutral-800/60 text-neutral-400 hover:border-neutral-700'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center border transition-all ${
                                    isActive
                                      ? 'bg-white border-white text-black'
                                      : 'border-neutral-700 bg-neutral-900'
                                  }`}
                                >
                                  {isActive && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                </div>
                                <div>
                                  <div className="font-mono text-xs font-semibold flex items-center gap-1.5">
                                    <span>{control.name}</span>
                                    {control.isHeavyWarning && (
                                      <span className="text-[9px] font-mono px-1 py-0.2 rounded-sm bg-neutral-800 text-neutral-300 border border-neutral-700">
                                        HEAVY JUDGE
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <span className="font-mono text-xs font-bold shrink-0 pl-2 text-neutral-200">
                                +{control.ms}ms
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Advisory Callout */}
                    <div
                      className="rounded-md p-3 border font-mono text-xs flex items-start gap-2 mt-3 bg-neutral-900/60 border-neutral-800 text-neutral-300"
                    >
                      {isOverBudget ? (
                        <ShieldAlert className="w-4 h-4 text-white shrink-0 mt-0.5" />
                      ) : (
                        <Zap className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span className="font-bold block mb-0.5 text-white">
                          {isOverBudget ? 'Warning: Latency SLA Blown' : 'Architecture Balanced for Hot Path'}
                        </span>
                        <p className="font-sans text-[11px] text-neutral-400 leading-relaxed font-normal">
                          {isOverBudget
                            ? 'Adding model-based judges in user request paths adds 600ms+ lag. Move deep evaluation to Pillar 4 (Async Review) to retain full security with 0ms user penalty.'
                            : 'Layered defense: µs rate limits and sub-5ms compact classifiers absorb volumetric threats, leaving deep reasoning to async workers.'}
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
