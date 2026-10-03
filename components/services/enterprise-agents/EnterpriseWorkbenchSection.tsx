'use client';

import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Layers } from 'lucide-react';
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
}

// 100% Monochromatic (Obsidian, Graphite, Slate & Platinum Silvers)
const PILLARS: Pillar[] = [
  {
    id: 'pillar-1',
    category: 'INTAKE & IDENTITY',
    title: 'Identity & Intake Interface',
    subtitle: 'Context assembly with strict provenance tracking',
    description:
      'Where work arrives—via chat, queues, webhooks, or scheduled triggers. Identity is bound at ingress before any planning occurs. Untrusted user inputs, external documents, and tool payloads carry cryptographic provenance tags throughout the agent execution graph.',
    specs: ['Zero-Trust Ingress Identity', 'Provenance Taint Tracking', 'Schema & Encoding Normalization'],
    codePreview: {
      title: 'agent_identity_intake.ts',
      badge: 'PROVENANCE GATEWAY',
      lines: [
        { label: 'INGRESS_AUTH', code: 'jwt.verify(bearerToken, { issuer: "corp.iam.auth" })' },
        { label: 'CALLER_IDENTITY', code: 'ctx.bindCaller({ tenantId: "acme-corp", role: "finance_ops" })' },
        { label: 'UNTRUSTED_INGRESS', code: 'taintTag("src_user_upload", { hash: "0x4e9c8f2b", safe: false })', tone: 'highlight' },
        { label: 'CONTEXT_BOUNDARY', code: 'isolateUntrustedSpans(promptBuffer, escapeDelimiter: true)' },
        { label: 'STATUS', code: 'IDENTITY BOUND & PROVENANCE GRAPH INITIALIZED', tone: 'accent' },
      ],
    },
  },
  {
    id: 'pillar-2',
    category: 'REASONING ENGINE',
    title: 'Model-Agnostic Reasoning Engine',
    subtitle: 'Decoupled planning and swappable LLM providers',
    description:
      'The reasoning engine treats foundation models as interchangeable execution backends rather than hardcoded architectural dependencies. If a provider degrades, suffers downtime, or modifies behavior, the system arbitrates to backup models with zero tool contract changes.',
    specs: ['Decoupled Planning Graphs', 'Dynamic Model Fallbacks', 'Deterministic State Handlers'],
    codePreview: {
      title: 'reasoning_planner_core.rs',
      badge: 'STATE MACHINE RUNNER',
      lines: [
        { label: 'STATE_GRAPH', code: 'ExecutionGraph::new(step_timeout=15000ms, max_turns=8)' },
        { label: 'PRIMARY_REASONER', code: 'ModelProvider::ClaudeSonnet35 { latency_p95: 820ms }' },
        { label: 'FALLBACK_ROUTER', code: 'CircuitBreaker::watchdog(error_threshold=0.03, fallback=GPT4o)', tone: 'accent' },
        { label: 'PLANNING_VERIFIER', code: 'assert_schema_conformance(planner.emit_dag(), schema_v3)', tone: 'accent' },
        { label: 'STATUS', code: 'REASONING GRAPH VALIDATED — NO HARD PROVIDER LOCK-IN', tone: 'accent' },
      ],
    },
  },
  {
    id: 'pillar-3',
    category: 'BLAST RADIUS',
    title: 'Tool Execution & Blast Radius Rings',
    subtitle: 'Scoped credentials, idempotency, and confirmation gates',
    description:
      'Where intent converts into tangible environmental consequence. Every tool call is isolated to narrow capability tokens. Irreversible mutations require idempotency verification and cryptographic confirmation gates before execution.',
    specs: ['Least-Privilege Capability Tokens', 'Universal Idempotency Keys', 'Mandatory 2FA Human Gates'],
    codePreview: {
      title: 'blast_radius_ring_enforcer.go',
      badge: 'CONTAINMENT BARRIER',
      lines: [
        { label: 'RING_POLICY', code: 'enforceBlastRing(tool="database_upsert", requiredRing=Ring2)' },
        { label: 'IDEMPOTENCY_KEY', code: 'acquireKey("tx_9981a", ttl=300s, maxAttempts=1)' },
        { label: 'SCOPE_CHECK', code: 'assertLeastPrivilege(caller="agent_worker", perm="crm:tickets:write")', tone: 'highlight' },
        { label: 'IRREVERSIBLE_GATE', code: 'circuitBreaker.requireApprovalIf(mutationClass="financial_spend")', tone: 'accent' },
        { label: 'STATUS', code: 'CONTAINMENT ENFORCED — ALL 5 MUTATION GATES ACTIVE', tone: 'accent' },
      ],
    },
  },
  {
    id: 'pillar-4',
    category: 'AUDIT & CI GATE',
    title: 'Structured Audit & CI Evaluation',
    subtitle: 'Continuous regression suites wired to production',
    description:
      'Every execution emits structured, queryable OpenTelemetry traces documenting exact model prompts, retrieved documents, tool payloads, and latency costs. Production anomalies automatically seed automated CI regression tests.',
    specs: ['Structured OpenTelemetry Spans', 'Deterministic Replay Engines', 'Automated PR Quality Gates'],
    codePreview: {
      title: 'audit_trace_eval_pipeline.py',
      badge: 'CONTINUOUS REGRESSION',
      lines: [
        { label: 'TRACE_EMISSION', code: 'tracer.span(name="tool_call:erp_sync", span_id="0xaa31e")' },
        { label: 'CRYPTOGRAPHIC_SIG', code: 'sign_execution_envelope(trace, key=KMS_HSM_KEY_PRIMARY)', tone: 'accent' },
        { label: 'CI_REGRESSION_DELTA', code: 'assert_benchmark_suite(eval_dataset="q3_finance_failures")', tone: 'highlight' },
        { label: 'DRIFT_METRICS', code: 'ToolAccuracy: 99.4% | HallucinationRate: 0.00% | Latency: 1.4s', tone: 'accent' },
        { label: 'DECISION', code: 'AUTOMATED PR GATE CLEARED — ZERO REVERSIBLE ESCAPES', tone: 'accent' },
      ],
    },
  },
];

interface BlastRing {
  id: string;
  name: string;
  badge: string;
  allowedScopes: string[];
  gateType: string;
  impactDesc: string;
  simulatedAction: string;
  simulatedTerminal: {
    command: string;
    result: string;
    status: string;
    guardrailOutcome: string;
  };
}

const BLAST_RINGS: BlastRing[] = [
  {
    id: 'ring-0',
    name: 'Ring 0: Read-Only Scoped',
    badge: 'SAFE / UNATTENDED',
    allowedScopes: ['kb:search', 'doc:read_metadata', 'sql:select_restricted'],
    gateType: 'No confirmation needed — zero mutation capability',
    impactDesc: 'A wrong answer or missed retrieval. Fully recoverable and visible to the immediate caller only.',
    simulatedAction: 'Query knowledge base for policy documentation',
    simulatedTerminal: {
      command: 'EXECUTE: tool.search_knowledge_base({ query: "payout_schedule_2026" })',
      result: 'RECORDS_RETRIEVED: 3 matching policy documents (SHA256 verified)',
      status: 'READ_ONLY_ACCESS_GRANTED',
      guardrailOutcome: 'PASSED — Zero system state change detected',
    },
  },
  {
    id: 'ring-1',
    name: 'Ring 1: Draft & Suggest',
    badge: 'CONTROLLED / STAGED',
    allowedScopes: ['draft:create_text', 'pr:stage_diff', 'ticket:compose_reply'],
    gateType: 'Human review queue — nothing leaves the system boundary unattended',
    impactDesc: 'Wasted human review time. The failure mode is productivity friction, not external legal liability.',
    simulatedAction: 'Compose draft customer reply and queue for team lead review',
    simulatedTerminal: {
      command: 'EXECUTE: tool.stage_draft_reply({ ticket_id: "TICK-4820", body_len: 284 })',
      result: 'DRAFT_STAGED: Pushed to reviewer queue #dispatch_tier2',
      status: 'AWAITING_HUMAN_DISPATCH',
      guardrailOutcome: 'PASSED — Action quarantined until human authorization',
    },
  },
  {
    id: 'ring-2',
    name: 'Ring 2: Write Internal Systems',
    badge: 'MONITORED / IDEMPOTENT',
    allowedScopes: ['crm:update_ticket', 'db:upsert_record', 'queue:publish_event'],
    gateType: 'Scoped credentials + Idempotency keys + Audit log recording',
    impactDesc: 'Corrupted internal records that could propagate. Recoverable only via deterministic rollback traces.',
    simulatedAction: 'Update internal ERP ticket status and append audit metadata',
    simulatedTerminal: {
      command: 'EXECUTE: tool.upsert_erp_record({ record_id: "INV-902", status: "VERIFIED" })',
      result: 'STATE_MUTATION: 1 row modified in staging schema [tx_id: 0x9f1a8c]',
      status: 'IDEMPOTENCY_VERIFIED',
      guardrailOutcome: 'WARNING — Monitored mutation logged to immutable audit ledger',
    },
  },
  {
    id: 'ring-3',
    name: 'Ring 3: External Send',
    badge: 'ELEVATED RISK',
    allowedScopes: ['smtp:send_email', 'webhook:trigger_partner', 'slack:notify_channel'],
    gateType: 'Rate limit ceiling + Destination allowlist + Policy checkpoint',
    impactDesc: 'Incorrect or unauthorized communication leaves the enterprise boundary. No undo exists.',
    simulatedAction: 'Send automated shipment notification email to external customer',
    simulatedTerminal: {
      command: 'EXECUTE: tool.send_external_email({ to: "procurement@client.com" })',
      result: 'EGRESS_CHECK: Destination matches authorized domain whitelist (*.client.com)',
      status: 'EGRESS_GATEWAY_INSPECTED',
      guardrailOutcome: 'AUTHORIZED — Outbound payload passed DLP inspection',
    },
  },
  {
    id: 'ring-4',
    name: 'Ring 4: Financial & Irreversible',
    badge: 'CRITICAL / HARD GATE',
    allowedScopes: ['stripe:charge_card', 'db:drop_partition', 'wire:authorize_transfer'],
    gateType: 'Mandatory 2FA human supervisor approval + HMAC signature',
    impactDesc: 'Direct, permanent financial loss or destructive database corruption. Completely unrecoverable without operator intervention.',
    simulatedAction: 'Authorize $24,500 vendor invoice wire transfer',
    simulatedTerminal: {
      command: 'EXECUTE: tool.authorize_wire_transfer({ amount_usd: 24500, vendor_id: "V-91" })',
      result: 'EXECUTION_HALTED: Action requires cryptographic supervisor signature',
      status: 'BLOCKED_PENDING_SUPERVISOR_KEY',
      guardrailOutcome: 'HARD_CIRCUIT_BREAKER — Agent cannot execute unilateral transactions > $500',
    },
  },
];

export default function EnterpriseWorkbenchSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const laserLineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeMode, setActiveMode] = useState<'console' | 'simulator'>('console');
  const [selectedRingId, setSelectedRingId] = useState<string>('ring-0');

  const currentPillar = PILLARS[activeIndex] || PILLARS[0];
  const currentRing = BLAST_RINGS.find((r) => r.id === selectedRingId) || BLAST_RINGS[0];

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
          id: 'workbench-pin-enterprise',
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

    const st = ScrollTrigger.getById('workbench-pin-enterprise');
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
              AGENT SYSTEM ARCHITECTURE
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
              Four Pillars of Enterprise Agentic Runtime.
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

          {/* Right Column: Dynamic Inspection Console & Blast Radius Rings */}
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
                  AGENT RUNTIME
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
                  <Layers className="w-3.5 h-3.5" />
                  <span>BLAST RADIUS SIMULATOR</span>
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
                          LEAST-PRIVILEGE TOOL ISOLATION
                        </span>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded border uppercase font-bold bg-neutral-900 border-neutral-700 text-white">
                          {currentRing.badge}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight mb-1.5">
                        Blast Radius Containment Rings
                      </h3>
                      <p className="font-sans text-xs text-neutral-300 leading-relaxed font-normal mb-3">
                        Select a privilege ring to inspect authority boundaries, confirmation gates, and real-time execution defense.
                      </p>

                      {/* Ring Selector Tabs */}
                      <div className="grid grid-cols-5 gap-1.5 mb-3">
                        {BLAST_RINGS.map((ring) => {
                          const isSel = selectedRingId === ring.id;
                          return (
                            <button
                              key={ring.id}
                              type="button"
                              onClick={() => setSelectedRingId(ring.id)}
                              className={`p-2 rounded border text-left transition-all cursor-pointer ${
                                isSel
                                  ? 'bg-neutral-800 border-white text-white shadow-md'
                                  : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white'
                              }`}
                            >
                              <span className="font-mono text-[10px] font-bold block">{ring.id.replace('ring-', 'R-')}</span>
                              <span className="font-sans text-[10px] truncate block opacity-80">{ring.name.split(':')[1]?.trim() || ring.name}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Ring Details */}
                      <div className="p-3 rounded-md bg-neutral-900/80 border border-neutral-800 mb-3 space-y-2 font-mono text-xs">
                        <div className="flex items-start gap-2">
                          <span className="text-neutral-500 text-[10px] uppercase font-bold shrink-0 mt-0.5">Gate Type:</span>
                          <span className="text-neutral-200">{currentRing.gateType}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-neutral-500 text-[10px] uppercase font-bold shrink-0 mt-0.5">Impact:</span>
                          <span className="text-neutral-300 font-sans">{currentRing.impactDesc}</span>
                        </div>
                      </div>
                    </div>

                    {/* Terminal Simulation */}
                    <div className="rounded-md bg-black/75 backdrop-blur-md border border-neutral-800 p-3 font-mono text-xs overflow-hidden shadow-2xl">
                      <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-neutral-800 text-[10px] text-neutral-400">
                        <span>SIMULATED AGENT TOOL INVOCATION</span>
                        <span className="text-white font-bold">
                          {currentRing.simulatedTerminal.status}
                        </span>
                      </div>
                      <div className="space-y-1 text-[11px] leading-relaxed">
                        <div className="text-neutral-200 font-medium">{currentRing.simulatedTerminal.command}</div>
                        <div className="text-neutral-400">{currentRing.simulatedTerminal.result}</div>
                        <div className="text-neutral-300 pt-1 border-t border-neutral-800/80 text-[10px]">
                          {currentRing.simulatedTerminal.guardrailOutcome}
                        </div>
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
