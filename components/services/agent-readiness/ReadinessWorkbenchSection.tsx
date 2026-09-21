'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

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
    id: 'discovery',
    step: 'PILLAR 01',
    title: 'Full Estate Discovery & Shadow AI Inventory',
    subtitle: 'Accounting for every built, bought, and embedded AI system across cloud and SaaS',
    description:
      'We systematically scan repositories, API gateways, vendor agreements, and network egress logs to assemble a comprehensive registry of all active models and agentic workflows—including rogue shadow deployments.',
    specs: ['Shadow AI Discovery', 'Vendor API Interception', 'Central Asset Registry'],
    ditherColor: [0.35, 0.65, 0.95],
    grainientColors: { color1: '#122538', color2: '#1e3d5c', color3: '#2d5e8c' },
    codePreview: {
      title: 'estate_inventory_scan.json',
      badge: 'DISCOVERY TELEMETRY',
      lines: [
        { label: 'SCAN_TARGET', code: 'cloud_infra_vpc_us_east_1 + saas_integrations' },
        { label: 'DISCOVERED', code: '42 Active AI Systems (18 Shadow / Unregistered)', tone: 'warn' },
        { label: 'ROGUE_ENDPOINTS', code: '3 Unapproved Direct Model API Keys Identified', tone: 'warn' },
        { label: 'ASSET_REGISTER', code: '100% Normalized with Technical Ownership Attributed', tone: 'success' },
        { label: 'STATUS', code: 'CENTRAL INVENTORY BASELINE COMPILED & SYNCED', tone: 'success' },
      ],
    },
  },
  {
    id: 'classification',
    step: 'PILLAR 02',
    title: 'Impact & Autonomy Risk Classification',
    subtitle: 'Categorizing systems across Minimal, Limited, High, and Agentic autonomy tiers',
    description:
      'Every discovered system is evaluated along two primary vectors: consequence severity (impact on money, safety, rights, data) and operational autonomy (human-in-the-loop vs fully unattended agent execution).',
    specs: ['Autonomy Vectoring', 'Blast-Radius Scoping', 'EU AI Act Tier Mapping'],
    ditherColor: [0.88, 0.58, 0.32],
    grainientColors: { color1: '#382512', color2: '#5c3d1e', color3: '#8c5e2d' },
    codePreview: {
      title: 'autonomy_classification_matrix.json',
      badge: 'RISK TIER SPEC',
      lines: [
        { label: 'WORKFLOW_ID', code: '"customer_credit_limit_agent_v3"' },
        { label: 'CONSEQUENCE_AXIS', code: 'High (Direct Impact on Financial Allocation)' },
        { label: 'AUTONOMY_AXIS', code: 'Agentic (Unattended Multi-System Mutations)', tone: 'warn' },
        { label: 'OBLIGATION_TIER', code: 'EU AI Act High-Risk Annex III + ISO 42001 Section 6', tone: 'accent' },
        { label: 'CLASSIFICATION', code: 'TIER-4 AGENTIC: MANDATORY OVERSIGHT & CIRCUIT BREAKER', tone: 'success' },
      ],
    },
  },
  {
    id: 'controls',
    step: 'PILLAR 03',
    title: 'Technical Control & Permission Gap Analysis',
    subtitle: 'Scoping tool credentials, egress boundaries, and logging posture',
    description:
      'We audit the technical controls that actually hold in code versus what is assumed in policy: per-tool credential scoping, database write restrictions, prompt firewalls, and immutable decision audit logging.',
    specs: ['Credential Least-Privilege', 'Network Egress Firewalls', 'Decision Replay Traces'],
    ditherColor: [0.32, 0.82, 0.58],
    grainientColors: { color1: '#123824', color2: '#1e5c3b', color3: '#2d8c59' },
    codePreview: {
      title: 'permission_gap_audit.log',
      badge: 'CONTROL VERIFICATION',
      lines: [
        { code: 'scan_agent_credentials(agent="procurement_bot_prod")' },
        { code: 'WARN: Tool "erp_connector" has unrestricted pg_write access', tone: 'warn' },
        { code: 'WARN: Egress filter missing for destination *.external-webhooks.io', tone: 'warn' },
        { code: 'REMEDIATION: Scoped IAM STS policy generated & egress allowlist locked', tone: 'accent' },
        { code: 'RESULT: LEAST-PRIVILEGE CREDENTIAL ENFORCEMENT VERIFIED', tone: 'success' },
      ],
    },
  },
  {
    id: 'evidence',
    step: 'PILLAR 04',
    title: 'Defensible Audit Evidence & Kill-Switch Governance',
    subtitle: 'Implementing hard emergency stop controls and regulatory evidence packs',
    description:
      'Autonomy without an emergency halt switch is uninsurable. We verify circuit breakers, validate manual override hooks, and compile reproducible evidence binders structured for NIST AI RMF, ISO 42001, and EU AI Act audits.',
    specs: ['Deterministic Kill Switches', 'Hardware Circuit Breakers', 'NIST / ISO Defensible Pack'],
    ditherColor: [0.75, 0.45, 0.95],
    grainientColors: { color1: '#2d163d', color2: '#4a2463', color3: '#733799' },
    codePreview: {
      title: 'governance_evidence_manifest.json',
      badge: 'AUDIT EVIDENCE',
      lines: [
        { label: 'EVIDENCE_BINDER', code: '"NIST_AI_RMF_1.0_GOVERN_MAP_FINAL.pdf"' },
        { label: 'KILL_SWITCH_STATUS', code: 'Hardware-Isolated Webhook REVOKE [Verified Latency: 42ms]', tone: 'success' },
        { label: 'AUDIT_TRAIL', code: 'Cryptographically Signed S3 Immutable Bucket (WORM)', tone: 'success' },
        { label: 'DECISION_RIGHTS', code: 'Named VP Security + Lead Architect Escalation Path' },
        { label: 'AUDIT_READINESS', code: '100% DEFENSIBLE: REGULATORY EVIDENCE ATTESTED', tone: 'success' },
      ],
    },
  },
];

export default function ReadinessWorkbenchSection() {
  const [activeTab, setActiveTab] = useState<string>(PILLARS[0].id);

  const currentPillar = PILLARS.find((p) => p.id === activeTab) || PILLARS[0];

  return (
    <section id="workbench" className="relative w-full py-20 sm:py-28 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-2.5">
            READINESS AUDIT ARCHITECTURE
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
            Engineered for Governance. Built for Defensible Verification.
          </h2>
        </div>

        {/* 2-Column Interactive Workbench */}
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

            {/* Ambient subtle vignette overlay */}
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
