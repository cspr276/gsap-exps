'use client';

import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Activity } from 'lucide-react';
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
  forensicPreview: {
    title: string;
    badge: string;
    lines: CodeLine[];
  };
}

// 100% Monochromatic (Obsidian, Graphite, Slate & Platinum Silvers)
const PILLARS: Pillar[] = [
  {
    id: 'drift',
    category: 'DRIFT DETECTION',
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
    codePreview: {
      title: 'cohort_drift_analyzer.json',
      badge: 'DISTRIBUTION TELEMETRY',
      lines: [
        { label: 'COHORT', code: '"enterprise_de_DE (Turn Depth >= 7)"' },
        { label: 'SAMPLE_SIZE', code: '1,420 conversations (stratified 10% live slice)' },
        { label: 'INPUT_DRIFT', code: 'Wasserstein Distance = 0.418 [THRESHOLD BREACHED]', tone: 'highlight' },
        { label: 'QUALITY_SLIP', code: '-34.2% factual groundedness vs rolling 30d baseline', tone: 'highlight' },
        { label: 'DIAGNOSTIC', code: '"Index build 219 introduced ungrounded regional terminology"', tone: 'accent' },
        { label: 'STATUS', code: 'DISPATCHED AUTOMATED ALERT TO RETRIEVAL SQUAD', tone: 'accent' },
      ],
    },
    forensicPreview: {
      title: 'cohort_divergence_summary.log',
      badge: 'FORENSIC DELTA',
      lines: [
        { label: 'WINDOW', code: 'Rolling 14-day cohort comparison vs release prod-v2.1' },
        { label: 'GLOBAL_MEAN', code: '94.2% -> 93.8% (looks healthy in executive dashboard)' },
        { label: 'SEGMENT_MEAN', code: '92.0% -> 61.4% (critical localized collapse in German locale)', tone: 'highlight' },
        { label: 'DETECTION_LAG', code: '< 45 minutes from index deploy to automated alert', tone: 'accent' },
        { label: 'RECOMMENDATION', code: 'Roll back index partition build_219; maintain prompt v38', tone: 'accent' },
      ],
    },
  },
  {
    id: 'traces',
    category: 'EXECUTION TRACE',
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
    codePreview: {
      title: 'trace_span_8f21c4.json',
      badge: 'STRUCTURED SPAN',
      lines: [
        { label: 'SPAN_ID', code: '"spn_8f21c4e902b" · turn 7 of 11 · locale de-DE' },
        { label: 'VERSIONS', code: 'model: gpt-x@2026-07-14 · prompt: v38 · index: build_219' },
        { label: 'CONTEXT', code: '4 documents retrieved · 1 marked UNTRUSTED (customer upload)', tone: 'highlight' },
        { label: 'TOOL_SPANS', code: 'lookup_order() 240ms [200 OK] · refund_policy() 90ms [200 OK]' },
        { label: 'SIGNALS', code: 'quality: 0.42 · groundedness: FAIL · escalated to human', tone: 'highlight' },
        { label: 'TRACE_STATUS', code: 'REPRODUCIBLE FORENSIC RECORD COMMITTED TO VAULT', tone: 'accent' },
      ],
    },
    forensicPreview: {
      title: 'span_replay_inspection.json',
      badge: 'RECORDED PROVENANCE',
      lines: [
        { label: 'REPLAY_HARNESS', code: 'Spanned context reconstructed in isolated sandbox runner' },
        { label: 'UNTRUSTED_FLAG', code: 'Document #3 flagged untrusted: prompt injection vector detected', tone: 'highlight' },
        { label: 'LATENCY_BILL', code: 'Retrieval: 110ms | Model TTFT: 340ms | Tool calls: 330ms' },
        { label: 'MUTATION_CHECK', code: 'Database invariants preserved; transaction safely aborted', tone: 'accent' },
        { label: 'ARTIFACT_HASH', code: 'SHA256: 9b2d8e4f... (immutable audit trail stored 90 days)' },
      ],
    },
  },
  {
    id: 'signals',
    category: 'IMPLICIT SIGNALS',
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
    codePreview: {
      title: 'implicit_signal_telemetry.py',
      badge: 'BEHAVIOR STREAM',
      lines: [
        { code: 'stream = TelemetryEngine.stream(metric="implicit_signals", window="15m")' },
        { label: 'REPHRASE_SPIKE', code: '+18.4% immediate re-prompting detected in Checkout flow', tone: 'highlight' },
        { label: 'ESCALATION_RATE', code: 'Human handoff rate surged from 2.1% to 11.8%', tone: 'highlight' },
        { label: 'ATTRIBUTION', code: 'Strong statistical correlation (r=0.91) with prompt v41.2 deploy', tone: 'accent' },
        { label: 'CONFIDENCE', code: 'High-confidence early signal detected 19 days before user ticket', tone: 'accent' },
        { label: 'STATUS', code: 'CIRCUIT BREAKER TRIGGERED: TRAFFIC DIVERTED TO CANARY', tone: 'highlight' },
      ],
    },
    forensicPreview: {
      title: 'behavior_correlation_matrix.json',
      badge: 'CORRELATION ENGINE',
      lines: [
        { label: 'METRIC_1', code: 'Rapid query rephrasing (< 8 seconds between turns): +44%' },
        { label: 'METRIC_2', code: 'Supervisor rejection rate on generated summaries: +29%', tone: 'highlight' },
        { label: 'METRIC_3', code: 'Session drop-off at payment intent confirmation: +12%', tone: 'highlight' },
        { label: 'ROOT_CAUSE', code: 'System prompt regression omitting discount application rules', tone: 'accent' },
        { label: 'ACTION', code: 'Incident opened automatically before support ticket created', tone: 'accent' },
      ],
    },
  },
  {
    id: 'gates',
    category: 'RELEASE GATE',
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
    codePreview: {
      title: 'ci_regression_gate.log',
      badge: 'RELEASE GATE',
      lines: [
        { label: 'PULL_REQUEST', code: 'PR #582 "Refactor order cancellation agent system prompt"' },
        { label: 'REGRESSION_SET', code: '4,820 historical incident cases executed across 12 cohorts' },
        { label: 'FAILURES', code: '0 regressions detected against historical failure catalog', tone: 'accent' },
        { label: 'DIFF_ANALYSIS', code: 'Latency delta: -12ms · Groundedness score delta: +1.8%', tone: 'accent' },
        { label: 'GATE_STATUS', code: 'ALL GATES PASSED — PULL REQUEST CLEARED FOR MERGE', tone: 'accent' },
      ],
    },
    forensicPreview: {
      title: 'regression_suite_report.json',
      badge: 'PERMANENT TEST SUITE',
      lines: [
        { label: 'SUITE_SIZE', code: '4,820 active test cases (100% derived from live incidents)' },
        { label: 'EXECUTION_TIME', code: '3 minutes 12 seconds in parallel distributed CI runner' },
        { label: 'HARD_GATES', code: '0 tolerance on schema violations and prompt-injection escapes', tone: 'accent' },
        { label: 'DRIFT_BOUNDS', code: 'Maximum permissible semantic drift: 0.05% (measured: 0.02%)', tone: 'accent' },
        { label: 'DEPLOY_HASH', code: 'git commit 4f1a09e signed by CI gatekeeper [READY]', tone: 'accent' },
      ],
    },
  },
];

export default function MonitoringWorkbenchSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const laserLineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'telemetry' | 'forensics'>('telemetry');

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
          id: 'workbench-pin-monitoring',
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

    const st = ScrollTrigger.getById('workbench-pin-monitoring');
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
              CONTINUOUS OBSERVABILITY ARCHITECTURE
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
              Engineered for Live Quality Signals. Built for Permanent Regressions.
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

          {/* Right Column: Dynamic Inspection Console & Details */}
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

            {/* Dynamic Content */}
            <div className="relative z-10 p-6 sm:p-7 lg:p-7 flex flex-col justify-between h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPillar.id}
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col justify-center gap-6 h-full"
                >
                  <div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-white tracking-tight mb-2.5">
                      {currentPillar.title}
                    </h3>

                    <p className="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed font-normal mb-4 max-w-2xl">
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

                  {/* Dark Monochromatic Inspection Code / Telemetry Console */}
                  <div className="rounded-md bg-black/75 backdrop-blur-md border border-neutral-800 p-4 sm:p-5 font-mono text-xs overflow-hidden shadow-2xl">
                    <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-neutral-800 text-neutral-400 text-[11px]">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveTab('telemetry')}
                          className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                            activeTab === 'telemetry'
                              ? 'bg-neutral-800 text-white font-bold'
                              : 'text-neutral-500 hover:text-neutral-300'
                          }`}
                        >
                          <Terminal className="w-3 h-3" />
                          <span>TELEMETRY</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveTab('forensics')}
                          className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                            activeTab === 'forensics'
                              ? 'bg-neutral-800 text-white font-bold'
                              : 'text-neutral-500 hover:text-neutral-300'
                          }`}
                        >
                          <Activity className="w-3 h-3" />
                          <span>FORENSICS</span>
                        </button>
                      </div>

                      <span className="px-2 py-0.5 rounded bg-white/10 text-white border border-white/20 text-[10px] font-bold shrink-0 uppercase tracking-wider">
                        {activeTab === 'telemetry' ? currentPillar.codePreview.badge : currentPillar.forensicPreview.badge}
                      </span>
                    </div>

                    <div className="space-y-2 leading-relaxed overflow-x-auto text-[11px]">
                      {(activeTab === 'telemetry' ? currentPillar.codePreview.lines : currentPillar.forensicPreview.lines).map(
                        (line, idx) => (
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
                        )
                      )}
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
