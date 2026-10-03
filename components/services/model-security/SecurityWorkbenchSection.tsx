'use client';

import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

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
    id: 'threat-modeling',
    step: 'PILLAR 01',
    title: 'Threat Modeling & Surface Mapping',
    subtitle: 'Enumerate every untrusted context path, ingestion vector, and tool sink',
    description:
      'We catalog every boundary where untrusted text reaches a context window — user inputs, retrieved RAG chunks, third-party webhook payloads, and tool returns. We map asset sensitivity against tool authorization scopes to define the true attack surface.',
    specs: ['Untrusted context mapping', 'Tool credential audit', 'Ingestion vector analysis'],
    ditherColor: [0.92, 0.32, 0.32],
    grainientColors: { color1: '#361515', color2: '#571f1f', color3: '#822e2e' },
    codePreview: {
      title: 'threat_surface_manifest.json',
      badge: 'SURFACE MAP v3.2',
      lines: [
        { label: 'INGESTION_VECTOR', code: '"s3://support-attachments/*.pdf -> RAG vector store"' },
        { label: 'CONTEXT_BOUNDARY', code: 'UNFILTERED (raw parsed strings concatenated into prompt)', tone: 'warn' },
        { label: 'TOOL_CREDENTIAL', code: '"send_email" -> OAuth scope: [mail.send, mail.read_all]', tone: 'warn' },
        { label: 'EGRESS_POLICY', code: 'ALLOW_ANY (*.destination, unconstrained outbound HTTP)', tone: 'accent' },
        { label: 'CLASSIFICATION', code: 'CRITICAL PATH DISCOVERED: UNTRUSTED RAG TO TOOL EGRESS', tone: 'accent' },
      ],
    },
  },
  {
    id: 'indirect-injection',
    step: 'PILLAR 02',
    title: 'Indirect Injection & Kill Chain Probes',
    subtitle: 'Multi-turn staged prompt injection and delimiter evasion testing',
    description:
      'Adversarial probes test how models behave when hostile directives are embedded inside benign data. We probe cross-boundary execution, multi-turn state grooming, and markdown rendering exploits that trigger unauthorized outbound requests.',
    specs: ['Multi-turn staged injection', 'Delimiter & encoding evasion', 'Covert exfiltration channels'],
    ditherColor: [0.95, 0.62, 0.22],
    grainientColors: { color1: '#3d2510', color2: '#5f3a18', color3: '#8b5622' },
    codePreview: {
      title: 'exploit_probe_kill_chain.py',
      badge: 'KILL CHAIN REPLAY',
      lines: [
        { code: 'probe = MultiTurnAdversarialProbe(target="enterprise-crm-agent")' },
        { code: 'payload = probe.generate_staged_payload(evasion="unicode_bidi_wrap")' },
        { code: 'step_1 = target.send_untrusted_doc(payload.stage1_persona_hijack)' },
        { code: 'step_2 = target.prompt("Summarize document and notify account rep")' },
        { code: 'ALERT: Agent executed unapproved tool call "exfiltrate_customer_pii()"', tone: 'warn' },
        { code: 'RESULT: INJECTION CONFIRMED — KILL CHAIN STAGE 4 EXECUTED', tone: 'accent' },
      ],
    },
  },
  {
    id: 'blast-radius',
    step: 'PILLAR 03',
    title: 'Tool Privilege & Blast Radius Containment',
    subtitle: 'Checking credential scopes, egress allowlists, and execution boundaries',
    description:
      'We evaluate what tools can actually accomplish with their runtime credentials. We test database mutation boundaries, sandbox breakout vulnerabilities, lateral API pivoting, and outbound network egress allowlists to ensure containment holds even when a model fails.',
    specs: ['Credential scoping audit', 'Egress allowlist enforcement', 'Human confirmation gates'],
    ditherColor: [0.35, 0.65, 0.95],
    grainientColors: { color1: '#142542', color2: '#233d6b', color3: '#365d9c' },
    codePreview: {
      title: 'blast_radius_containment_audit.log',
      badge: 'CONTAINMENT AUDIT',
      lines: [
        { label: 'TOOL_NAME', code: '"execute_sql_query"' },
        { label: 'SANDBOX_BOUNDARY', code: 'WASM isolate with read-only transaction mode [ENFORCED]', tone: 'success' },
        { label: 'EGRESS_ALLOWLIST', code: 'Strict CIDR block [10.4.0.0/16] — 14 outbound probes blocked', tone: 'success' },
        { label: 'CONFIRMATION_GATE', code: 'Missing HMAC signature on high-value transfer tool', tone: 'warn' },
        { label: 'REMEDIATION', code: 'Privilege dropped to least-authority role: EVX-SEC-204 applied', tone: 'success' },
      ],
    },
  },
  {
    id: 'exploit-gate',
    step: 'PILLAR 04',
    title: 'Continuous Regression Exploit Gate',
    subtitle: 'Permanent CI/CD regression tests for confirmed exploits and bypasses',
    description:
      'Every validated vulnerability, prompt jailbreak, and privilege escalation is translated into a permanent automated test in your CI/CD pipeline. When models are updated, prompts tuned, or tools modified, regressions are blocked immediately.',
    specs: ['Automated PR blocking', 'Permanent exploit regression suites', 'Canary injection verification'],
    ditherColor: [0.4, 0.85, 0.55],
    grainientColors: { color1: '#11291b', color2: '#1a422c', color3: '#2a6344' },
    codePreview: {
      title: 'ci_cd_security_gate_report.log',
      badge: 'RELEASE GATE',
      lines: [
        { label: 'RUN_ID', code: 'evalixa-sec-pipeline-v4.12 // commit: #a89f30e' },
        { label: 'TEST_SUITE', code: '428 active adversarial probe vectors executed' },
        { label: 'REGRESSION_STATUS', code: '0 ESCAPES CONFIRMED — ALL 428 PAYLOADS CONTAINED', tone: 'success' },
        { label: 'BLAST_CONTAINMENT', code: 'Outbound egress blocked at perimeter (100% containment)', tone: 'success' },
        { label: 'GATE_DECISION', code: 'SECURITY GATE PASSED — ARTIFACT SIGNED & APPROVED', tone: 'success' },
      ],
    },
  },
];

export default function SecurityWorkbenchSection() {
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

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const totalPillars = PILLARS.length;
        const scrollDistance = 2400; // 600px of scroll per pillar

        // Pin the entire workbench section while user scrolls through the 4 pillars
        const st = ScrollTrigger.create({
          id: 'workbench-pin',
          trigger: section,
          start: 'top top',
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;

            // Animate laser track line
            if (laser) {
              gsap.set(laser, { scaleY: p });
            }

            // Calculate active pillar index based on scroll position
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

    const st = ScrollTrigger.getById('workbench-pin');
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
        {/* Section Header with balanced compact spacing */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-6 gap-3">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-1.5">
              SECURITY ENGINE ARCHITECTURE
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
              Offensive Red-Teaming. Architectural Containment.
            </h2>
          </div>

          {/* Desktop Scroll Progress Indicator */}
          <div className="hidden lg:flex items-center gap-2 text-neutral-400 font-mono text-xs pb-1">
            <span className="text-white font-bold">PILLAR {String(activeIndex + 1).padStart(2, '0')}</span>
            <span>/</span>
            <span>04</span>
            <span className="text-neutral-500 ml-2 text-[11px]">(Scroll to step through)</span>
          </div>
        </div>

        {/* 2-Column Interactive Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: 4 Pillar Navigation Cards with Vertical Laser Rail */}
          <div ref={leftColRef} className="lg:col-span-5 relative flex flex-col gap-3 sm:gap-3.5 lg:h-[530px]">
            {/* Ambient Background Track for Laser Line (Desktop) */}
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
                  className={`relative overflow-hidden w-full text-left p-4 sm:p-4.5 rounded-md border transition-all duration-300 cursor-pointer flex-1 flex flex-col justify-center ${
                    isActive
                      ? 'border-neutral-500 bg-neutral-900/90 shadow-xl shadow-black/60 text-white'
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
                    <div className="flex items-center justify-between mb-1">
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
          <div className="lg:col-span-7 relative rounded-md border border-neutral-800 bg-neutral-950 overflow-hidden min-h-[500px] lg:h-[530px] shadow-xl shadow-black/80 flex flex-col justify-between">
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
                  className="flex flex-col justify-between h-full"
                >
                  <div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight mb-2.5">
                      {currentPillar.title}
                    </h3>

                    <p className="font-sans text-sm text-neutral-300 leading-relaxed font-normal mb-4">
                      {currentPillar.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {currentPillar.specs.map((spec) => (
                        <span
                          key={spec}
                          className="font-mono text-[11px] text-neutral-300 bg-neutral-900/60 backdrop-blur-sm border border-neutral-700/80 px-2.5 py-1 rounded-sm"
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
                                ? 'text-rose-400 font-bold'
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
