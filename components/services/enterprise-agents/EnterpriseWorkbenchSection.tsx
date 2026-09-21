'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, AlertTriangle, CheckCircle2, Lock, Layers } from 'lucide-react';

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
}

const PILLARS: Pillar[] = [
  {
    id: 'pillar-1',
    step: 'PILLAR 01',
    title: 'Identity & Intake Interface',
    subtitle: 'Context assembly with strict provenance tracking',
    description:
      'Where work arrives—via chat, queues, webhooks, or scheduled triggers. Identity is bound at ingress before any planning occurs. Untrusted user inputs, external documents, and tool payloads carry cryptographic provenance tags throughout the agent execution graph.',
    specs: ['Zero-Trust Ingress Identity', 'Provenance Taint Tracking', 'Schema & Encoding Normalization'],
    ditherColor: [0.42, 0.65, 0.9],
    grainientColors: { color1: '#162238', color2: '#253d66', color3: '#3b629e' },
    codePreview: {
      title: 'agent_identity_intake.ts',
      badge: 'PROVENANCE GATEWAY',
      lines: [
        { label: 'INGRESS_AUTH', code: 'jwt.verify(bearerToken, { issuer: "corp.iam.auth" })' },
        { label: 'CALLER_IDENTITY', code: 'ctx.bindCaller({ tenantId: "acme-corp", role: "finance_ops" })' },
        { label: 'UNTRUSTED_INGRESS', code: 'taintTag("src_user_upload", { hash: "0x4e9c8f2b", safe: false })', tone: 'warn' },
        { label: 'CONTEXT_BOUNDARY', code: 'isolateUntrustedSpans(promptBuffer, escapeDelimiter: true)' },
        { label: 'STATUS', code: 'IDENTITY BOUND & PROVENANCE GRAPH INITIALIZED', tone: 'success' },
      ],
    },
  },
  {
    id: 'pillar-2',
    step: 'PILLAR 02',
    title: 'Model-Agnostic Reasoning Engine',
    subtitle: 'Decoupled planning and swappable LLM providers',
    description:
      'The reasoning engine treats foundation models as interchangeable execution backends rather than hardcoded architectural dependencies. If a provider degrades, suffers downtime, or modifies behavior, the system arbitrates to backup models with zero tool contract changes.',
    specs: ['Decoupled Planning Graphs', 'Dynamic Model Fallbacks', 'Deterministic State Handlers'],
    ditherColor: [0.32, 0.78, 0.55],
    grainientColors: { color1: '#132e22', color2: '#1e4d3a', color3: '#2e7558' },
    codePreview: {
      title: 'reasoning_planner_core.rs',
      badge: 'STATE MACHINE RUNNER',
      lines: [
        { label: 'STATE_GRAPH', code: 'ExecutionGraph::new(step_timeout=15000ms, max_turns=8)' },
        { label: 'PRIMARY_REASONER', code: 'ModelProvider::ClaudeSonnet35 { latency_p95: 820ms }' },
        { label: 'FALLBACK_ROUTER', code: 'CircuitBreaker::watchdog(error_threshold=0.03, fallback=GPT4o)', tone: 'accent' },
        { label: 'PLANNING_VERIFIER', code: 'assert_schema_conformance(planner.emit_dag(), schema_v3)', tone: 'success' },
        { label: 'STATUS', code: 'REASONING GRAPH VALIDATED — NO HARD PROVIDER LOCK-IN', tone: 'success' },
      ],
    },
  },
  {
    id: 'pillar-3',
    step: 'PILLAR 03',
    title: 'Tool Execution & Blast Radius Rings',
    subtitle: 'Scoped credentials, idempotency, and confirmation gates',
    description:
      'Where intent converts into tangible environmental consequence. Every tool call is isolated to narrow capability tokens. Irreversible mutations require idempotency verification and cryptographic confirmation gates before execution.',
    specs: ['Least-Privilege Capability Tokens', 'Universal Idempotency Keys', 'Mandatory 2FA Human Gates'],
    ditherColor: [0.85, 0.62, 0.35],
    grainientColors: { color1: '#362615', color2: '#573d1f', color3: '#825c2e' },
    codePreview: {
      title: 'blast_radius_ring_enforcer.go',
      badge: 'CONTAINMENT BARRIER',
      lines: [
        { label: 'RING_POLICY', code: 'enforceBlastRing(tool="database_upsert", requiredRing=Ring2)' },
        { label: 'IDEMPOTENCY_KEY', code: 'acquireKey("tx_9981a", ttl=300s, maxAttempts=1)' },
        { label: 'SCOPE_CHECK', code: 'assertLeastPrivilege(caller="agent_worker", perm="crm:tickets:write")', tone: 'warn' },
        { label: 'IRREVERSIBLE_GATE', code: 'circuitBreaker.requireApprovalIf(mutationClass="financial_spend")', tone: 'accent' },
        { label: 'STATUS', code: 'CONTAINMENT ENFORCED — ALL 5 MUTATION GATES ACTIVE', tone: 'success' },
      ],
    },
  },
  {
    id: 'pillar-4',
    step: 'PILLAR 04',
    title: 'Structured Audit & CI Evaluation',
    subtitle: 'Continuous regression suites wired to production',
    description:
      'Every execution emits structured, queryable OpenTelemetry traces documenting exact model prompts, retrieved documents, tool payloads, and latency costs. Production anomalies automatically seed automated CI regression tests.',
    specs: ['Structured OpenTelemetry Spans', 'Deterministic Replay Engines', 'Automated PR Quality Gates'],
    ditherColor: [0.72, 0.42, 0.92],
    grainientColors: { color1: '#2f1940', color2: '#4e246e', color3: '#7535a6' },
    codePreview: {
      title: 'audit_trace_eval_pipeline.py',
      badge: 'CONTINUOUS REGRESSION',
      lines: [
        { label: 'TRACE_EMISSION', code: 'tracer.span(name="tool_call:erp_sync", span_id="0xaa31e")' },
        { label: 'CRYPTOGRAPHIC_SIG', code: 'sign_execution_envelope(trace, key=KMS_HSM_KEY_PRIMARY)', tone: 'accent' },
        { label: 'CI_REGRESSION_DELTA', code: 'assert_benchmark_suite(eval_dataset="q3_finance_failures")', tone: 'warn' },
        { label: 'DRIFT_METRICS', code: 'ToolAccuracy: 99.4% | HallucinationRate: 0.00% | Latency: 1.4s', tone: 'success' },
        { label: 'DECISION', code: 'AUTOMATED PR GATE CLEARED — ZERO REVERSIBLE ESCAPES', tone: 'success' },
      ],
    },
  },
];

interface BlastRing {
  id: string;
  name: string;
  badge: string;
  tone: 'green' | 'amber' | 'red';
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
    tone: 'green',
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
    tone: 'green',
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
    tone: 'amber',
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
    tone: 'amber',
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
    tone: 'red',
    allowedScopes: ['stripe:charge_customer', 'iam:mutate_policy', 'db:drop_table'],
    gateType: 'Mandatory 2FA cryptographic approval — NEVER executed unattended',
    impactDesc: 'Direct financial drain, data deletion, or regulatory compliance breach from single injected instruction.',
    simulatedAction: 'Authorize payment disbursement of $14,850.00 via Stripe Connect',
    simulatedTerminal: {
      command: 'EXECUTE: tool.disburse_funds({ amount_cents: 1485000, recipient: "ACC-309" })',
      result: 'BLOCK_TRIGGERED: Irreversible financial transaction requires hardware 2FA token',
      status: 'CIRCUIT_BREAKER_HALT',
      guardrailOutcome: 'BLOCKED — Action halted at Ring-4 hardware confirmation gate',
    },
  },
];

export default function EnterpriseWorkbenchSection() {
  const [activeTab, setActiveTab] = useState<string>(PILLARS[0].id);
  const [activeMode, setActiveMode] = useState<'console' | 'simulator'>('console');
  const [selectedRingId, setSelectedRingId] = useState<string>('ring-2');

  const currentPillar = PILLARS.find((p) => p.id === activeTab) || PILLARS[0];
  const currentRing = BLAST_RINGS.find((r) => r.id === selectedRingId) || BLAST_RINGS[2];

  return (
    <section id="workbench" className="relative w-full py-20 sm:py-28 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-2.5">
            ENTERPRISE AGENT ARCHITECTURE
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
            Engineered for Containment. Governed for Production.
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

          {/* Right Column: Dynamic Inspection Console & Blast Radius Simulator */}
          <div className="lg:col-span-7 relative rounded-md border border-neutral-800 bg-neutral-950 overflow-hidden min-h-[580px] shadow-xl shadow-black/80 flex flex-col justify-between">
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
            <div className="relative z-10 p-4 sm:p-5 border-b border-neutral-800/80 flex flex-wrap items-center justify-between gap-3 bg-neutral-950/50 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                  SYSTEM CONSOLE
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
                  <Layers className="w-3.5 h-3.5" />
                  <span>BLAST RADIUS SIMULATOR</span>
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
                            className="font-mono text-[11px] text-neutral-300 bg-neutral-900/50 backdrop-blur-sm border border-neutral-700/80 px-2.5 py-1 rounded-sm"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Dark Inspection Code / Telemetry Console */}
                    <div className="rounded-md bg-black/60 backdrop-blur-md border border-neutral-800 p-4 font-mono text-xs overflow-hidden shadow-inner mt-4">
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
                                  ? 'text-cyan-300 font-bold'
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
                    key="blast-simulator"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col justify-between gap-5 h-full"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                          BLAST RADIUS CONTAINMENT RINGS
                        </span>
                        <span
                          className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm ${
                            currentRing.tone === 'green'
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                              : currentRing.tone === 'amber'
                              ? 'bg-amber-950/80 text-amber-300 border border-amber-800'
                              : 'bg-red-950/80 text-red-300 border border-red-800'
                          }`}
                        >
                          {currentRing.badge}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-xl text-white tracking-tight mb-2">
                        {currentRing.name}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
                        {currentRing.impactDesc}
                      </p>

                      {/* Interactive 5-Ring Selector Tabs */}
                      <div className="grid grid-cols-5 gap-1.5 p-1 rounded-md bg-black/40 border border-neutral-800 mb-4">
                        {BLAST_RINGS.map((ring, idx) => {
                          const isSelected = selectedRingId === ring.id;
                          return (
                            <button
                              key={ring.id}
                              type="button"
                              onClick={() => setSelectedRingId(ring.id)}
                              className={`py-2 px-1 text-center rounded-sm font-mono text-[11px] transition-all cursor-pointer ${
                                isSelected
                                  ? ring.tone === 'red'
                                    ? 'bg-red-900/60 text-white border border-red-600 font-bold'
                                    : ring.tone === 'amber'
                                    ? 'bg-amber-900/60 text-white border border-amber-600 font-bold'
                                    : 'bg-emerald-900/60 text-white border border-emerald-600 font-bold'
                                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40'
                              }`}
                            >
                              Ring {idx}
                            </button>
                          );
                        })}
                      </div>

                      {/* Permissions & Gate Specs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 text-xs">
                        <div className="p-3 rounded-md bg-neutral-900/50 border border-neutral-800">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block mb-1">
                            ALLOWED CAPABILITY SCOPES
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {currentRing.allowedScopes.map((scope) => (
                              <span
                                key={scope}
                                className="font-mono text-[10px] text-neutral-300 bg-neutral-950 px-2 py-0.5 rounded-sm border border-neutral-800"
                              >
                                {scope}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="p-3 rounded-md bg-neutral-900/50 border border-neutral-800">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block mb-1">
                            ACTIVE ENFORCEMENT GATE
                          </span>
                          <span className="font-sans text-xs text-neutral-200 block leading-snug">
                            {currentRing.gateType}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Agent Execution Terminal Simulation */}
                    <div className="rounded-md bg-black/70 backdrop-blur-md border border-neutral-800 p-4 font-mono text-xs overflow-hidden shadow-inner">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800/80 text-neutral-400 text-[11px]">
                        <span className="flex items-center gap-1.5">
                          <Terminal className="w-3 h-3 text-neutral-400" />
                          <span>agent_execution_runtime.log</span>
                        </span>
                        <span className="text-neutral-400 font-bold">
                          {currentRing.simulatedTerminal.status}
                        </span>
                      </div>

                      <div className="space-y-1.5 leading-relaxed overflow-x-auto text-[11px]">
                        <div className="text-neutral-300">
                          <span className="text-neutral-400 select-none">&gt; </span>
                          <span className="text-cyan-300 font-semibold">ACTION:</span>{' '}
                          {currentRing.simulatedAction}
                        </div>
                        <div className="text-neutral-400">
                          <span className="text-neutral-400 select-none">&gt; </span>
                          {currentRing.simulatedTerminal.command}
                        </div>
                        <div className="text-neutral-300">
                          <span className="text-neutral-400 select-none">&gt; </span>
                          <span className="text-neutral-400">RESULT:</span>{' '}
                          {currentRing.simulatedTerminal.result}
                        </div>
                        <div className="pt-1.5 flex items-center gap-2">
                          {currentRing.tone === 'red' ? (
                            <Lock className="w-3.5 h-3.5 text-red-400 shrink-0" />
                          ) : currentRing.tone === 'amber' ? (
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          ) : (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          )}
                          <span
                            className={`font-semibold ${
                              currentRing.tone === 'red'
                                ? 'text-red-400'
                                : currentRing.tone === 'amber'
                                ? 'text-amber-400'
                                : 'text-emerald-400'
                            }`}
                          >
                            {currentRing.simulatedTerminal.guardrailOutcome}
                          </span>
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
