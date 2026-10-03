'use client';

import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
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
    id: 'discovery',
    category: 'ESTATE DISCOVERY',
    title: 'Full Estate Discovery & Shadow AI Inventory',
    subtitle: 'Accounting for every built, bought, and embedded AI system across cloud and SaaS',
    description:
      'We systematically scan repositories, API gateways, vendor agreements, and network egress logs to assemble a comprehensive registry of all active models and agentic workflows—including rogue shadow deployments.',
    specs: ['Shadow AI Discovery', 'Vendor API Interception', 'Central Asset Registry'],
    codePreview: {
      title: 'estate_inventory_scan.json',
      badge: 'DISCOVERY TELEMETRY',
      lines: [
        { label: 'SCAN_TARGET', code: 'cloud_infra_vpc_us_east_1 + saas_integrations' },
        { label: 'DISCOVERED', code: '42 Active AI Systems (18 Shadow / Unregistered)', tone: 'highlight' },
        { label: 'ROGUE_ENDPOINTS', code: '3 Unapproved Direct Model API Keys Identified', tone: 'highlight' },
        { label: 'ASSET_REGISTER', code: '100% Normalized with Technical Ownership Attributed', tone: 'accent' },
        { label: 'STATUS', code: 'CENTRAL INVENTORY BASELINE COMPILED & SYNCED', tone: 'accent' },
      ],
    },
  },
  {
    id: 'classification',
    category: 'RISK TIERS',
    title: 'Impact & Autonomy Risk Classification',
    subtitle: 'Categorizing systems across Minimal, Limited, High, and Agentic autonomy tiers',
    description:
      'Every discovered system is evaluated along two primary vectors: consequence severity (impact on money, safety, rights, data) and operational autonomy (human-in-the-loop vs fully unattended agent execution).',
    specs: ['Autonomy Vectoring', 'Blast-Radius Scoping', 'EU AI Act Tier Mapping'],
    codePreview: {
      title: 'autonomy_classification_matrix.json',
      badge: 'RISK TIER SPEC',
      lines: [
        { label: 'WORKFLOW_ID', code: '"customer_credit_limit_agent_v3"' },
        { label: 'CONSEQUENCE_AXIS', code: 'High (Direct Impact on Financial Allocation)' },
        { label: 'AUTONOMY_AXIS', code: 'Agentic (Unattended Multi-System Mutations)', tone: 'highlight' },
        { label: 'OBLIGATION_TIER', code: 'EU AI Act High-Risk Annex III + ISO 42001 Section 6', tone: 'accent' },
        { label: 'CLASSIFICATION', code: 'TIER-4 AGENTIC: MANDATORY OVERSIGHT & CIRCUIT BREAKER', tone: 'accent' },
      ],
    },
  },
  {
    id: 'controls',
    category: 'CONTROL GAPS',
    title: 'Technical Control & Permission Gap Analysis',
    subtitle: 'Scoping tool credentials, egress boundaries, and logging posture',
    description:
      'We audit the technical controls that actually hold in code versus what is assumed in policy: per-tool credential scoping, database write restrictions, prompt firewalls, and immutable decision audit logging.',
    specs: ['Credential Least-Privilege', 'Network Egress Firewalls', 'Decision Replay Traces'],
    codePreview: {
      title: 'permission_gap_audit.log',
      badge: 'CONTROL VERIFICATION',
      lines: [
        { code: 'scan_agent_credentials(agent="procurement_bot_prod")' },
        { code: 'WARN: Tool "erp_connector" has unrestricted pg_write access', tone: 'highlight' },
        { code: 'WARN: Egress filter missing for destination *.external-webhooks.io', tone: 'highlight' },
        { code: 'REMEDIATION: Scoped IAM STS policy generated & egress allowlist locked', tone: 'accent' },
        { code: 'RESULT: LEAST-PRIVILEGE CREDENTIAL ENFORCEMENT VERIFIED', tone: 'accent' },
      ],
    },
  },
  {
    id: 'evidence',
    category: 'AUDIT EVIDENCE',
    title: 'Defensible Audit Evidence & Kill-Switch Governance',
    subtitle: 'Implementing hard emergency stop controls and regulatory evidence packs',
    description:
      'Autonomy without an emergency halt switch is uninsurable. We verify circuit breakers, validate manual override hooks, and compile reproducible evidence binders structured for NIST AI RMF, ISO 42001, and EU AI Act audits.',
    specs: ['Deterministic Kill Switches', 'Hardware Circuit Breakers', 'NIST / ISO Defensible Pack'],
    codePreview: {
      title: 'governance_evidence_manifest.json',
      badge: 'AUDIT EVIDENCE',
      lines: [
        { label: 'EVIDENCE_BINDER', code: '"NIST_AI_RMF_1.0_GOVERN_MAP_FINAL.pdf"' },
        { label: 'KILL_SWITCH_STATUS', code: 'Hardware-Isolated Webhook REVOKE [Verified Latency: 42ms]', tone: 'accent' },
        { label: 'AUDIT_TRAIL', code: 'Cryptographically Signed S3 Immutable Bucket (WORM)', tone: 'accent' },
        { label: 'DECISION_RIGHTS', code: 'Named VP Security + Lead Architect Escalation Path' },
        { label: 'AUDIT_READINESS', code: '100% DEFENSIBLE: REGULATORY EVIDENCE ATTESTED', tone: 'accent' },
      ],
    },
  },
];

export default function ReadinessWorkbenchSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const laserLineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

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
          id: 'workbench-pin-readiness',
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

    const st = ScrollTrigger.getById('workbench-pin-readiness');
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
              GOVERNANCE ARCHITECTURE
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
              Engineered for Autonomy. Built for Defensible Oversight.
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
            <div className="relative z-10 p-6 sm:p-7 lg:p-7 flex flex-col justify-center h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPillar.id}
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col justify-center gap-12 h-full"
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
                      <span className="truncate pr-2 text-neutral-300 font-medium">{currentPillar.codePreview.title}</span>
                      <span className="px-2 py-0.5 rounded bg-white/10 text-white border border-white/20 text-[10px] font-bold shrink-0 uppercase tracking-wider">
                        {currentPillar.codePreview.badge}
                      </span>
                    </div>

                    <div className="space-y-2 leading-relaxed overflow-x-auto text-[11px]">
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
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
