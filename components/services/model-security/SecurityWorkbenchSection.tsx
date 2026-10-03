'use client';

import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
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
    id: 'threat-modeling',
    category: 'SURFACE MAP',
    title: 'Threat Modeling & Surface Mapping',
    subtitle: 'Enumerate every untrusted context path, ingestion vector, and tool sink',
    description:
      'We catalog every boundary where untrusted text reaches a context window — user inputs, retrieved RAG chunks, third-party webhook payloads, and tool returns. We map asset sensitivity against tool authorization scopes to define the true attack surface.',
    specs: ['Untrusted context mapping', 'Tool credential audit', 'Ingestion vector analysis'],
    codePreview: {
      title: 'threat_surface_manifest.json',
      badge: 'SURFACE MAP v3.2',
      lines: [
        { label: 'INGESTION_VECTOR', code: '"s3://support-attachments/*.pdf -> RAG vector store"' },
        { label: 'CONTEXT_BOUNDARY', code: 'UNFILTERED (raw parsed strings concatenated into prompt)', tone: 'highlight' },
        { label: 'TOOL_CREDENTIAL', code: '"send_email" -> OAuth scope: [mail.send, mail.read_all]', tone: 'highlight' },
        { label: 'EGRESS_POLICY', code: 'ALLOW_ANY (*.destination, unconstrained outbound HTTP)', tone: 'accent' },
        { label: 'CLASSIFICATION', code: 'CRITICAL PATH DISCOVERED: UNTRUSTED RAG TO TOOL EGRESS', tone: 'accent' },
      ],
    },
  },
  {
    id: 'indirect-injection',
    category: 'KILL CHAIN',
    title: 'Indirect Injection & Kill Chain Probes',
    subtitle: 'Multi-turn staged prompt injection and delimiter evasion testing',
    description:
      'Adversarial probes test how models behave when hostile directives are embedded inside benign data. We probe cross-boundary execution, multi-turn state grooming, and markdown rendering exploits that trigger unauthorized outbound requests.',
    specs: ['Multi-turn staged injection', 'Delimiter & encoding evasion', 'Covert exfiltration channels'],
    codePreview: {
      title: 'exploit_probe_kill_chain.py',
      badge: 'KILL CHAIN REPLAY',
      lines: [
        { code: 'probe = MultiTurnAdversarialProbe(target="enterprise-crm-agent")' },
        { code: 'payload = probe.generate_staged_payload(evasion="unicode_bidi_wrap")' },
        { code: 'step_1 = target.send_untrusted_doc(payload.stage1_persona_hijack)' },
        { code: 'step_2 = target.prompt("Summarize document and notify account rep")' },
        { code: 'ALERT: Agent executed unapproved tool call "exfiltrate_customer_pii()"', tone: 'highlight' },
        { code: 'RESULT: INJECTION CONFIRMED — KILL CHAIN STAGE 4 EXECUTED', tone: 'accent' },
      ],
    },
  },
  {
    id: 'blast-radius',
    category: 'CONTAINMENT',
    title: 'Tool Privilege & Blast Radius Containment',
    subtitle: 'Checking credential scopes, egress allowlists, and execution boundaries',
    description:
      'We evaluate what tools can actually accomplish with their runtime credentials. We test database mutation boundaries, sandbox breakout vulnerabilities, lateral API pivoting, and outbound network egress allowlists to ensure containment holds even when a model fails.',
    specs: ['Credential scoping audit', 'Egress allowlist enforcement', 'Human confirmation gates'],
    codePreview: {
      title: 'blast_radius_containment_audit.log',
      badge: 'CONTAINMENT AUDIT',
      lines: [
        { label: 'TOOL_NAME', code: '"execute_sql_query"' },
        { label: 'SANDBOX_BOUNDARY', code: 'WASM isolate with read-only transaction mode [ENFORCED]', tone: 'accent' },
        { label: 'EGRESS_ALLOWLIST', code: 'Strict CIDR block [10.4.0.0/16] — 14 outbound probes blocked', tone: 'accent' },
        { label: 'CONFIRMATION_GATE', code: 'Missing HMAC signature on high-value transfer tool', tone: 'highlight' },
        { label: 'REMEDIATION', code: 'Privilege dropped to least-authority role: EVX-SEC-204 applied', tone: 'accent' },
      ],
    },
  },
  {
    id: 'exploit-gates',
    category: 'SECURITY GATE',
    title: 'Automated CI Security Regression Gates',
    subtitle: 'Block vulnerabilities from reappearing in subsequent model and prompt updates',
    description:
      'Every validated attack vector and prompt injection proof-of-concept is codified into an automated regression unit test. As models are retrained, prompt templates tweaked, or tool definitions updated, our CI gates block silent security regressions.',
    specs: ['Automated PR security blocking', 'Exploit PoC regression suite', 'Production canary probing'],
    codePreview: {
      title: 'evalixa_security_gate_summary.log',
      badge: 'SECURITY GATE',
      lines: [
        { label: 'GATE_RUN', code: 'Target: finance-copilot:v2.4-rc1 vs Baseline: v2.3-prod' },
        { label: 'EXPLOIT_SUITE', code: '1,280 adversarial test payloads across OWASP LLM Top 10' },
        { label: 'INDIRECT_INJECTION', code: '0/340 bypasses [100% BLOCKED]', tone: 'accent' },
        { label: 'UNTRUSTED_EGRESS', code: '0/120 exfiltration attempts succeeded [100% BLOCKED]', tone: 'accent' },
        { label: 'VERDICT', code: 'PIPELINE PASSED — ZERO REGRESSIONS RECORDED', tone: 'accent' },
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
        const scrollDistance = 2400; // 600px of scroll per pillar

        // Pin the entire workbench section while user scrolls through the 4 pillars
        const st = ScrollTrigger.create({
          id: 'workbench-pin-security',
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

    const st = ScrollTrigger.getById('workbench-pin-security');
    if (st) {
      // Scroll to the exact position within the pinned range
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
              OFFENSIVE SECURITY ARCHITECTURE
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
              Engineered for Adversaries. Built for Verification.
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

            {/* Ambient vignette overlay to keep text crisp without washing out the waves */}
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
