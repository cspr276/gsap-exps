'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Terminal, Cpu, CheckCircle2, ChevronRight, Activity } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ASSURANCE_PILLARS = [
  {
    id: '01',
    num: '01',
    badge: 'VERIFICATION EVIDENCE',
    title: 'Auditable Evidence, Not a Single Score',
    desc: 'Every model judgment ships with reviewer notes, inter-annotator agreement metrics, and reproducible evaluation traces you can inspect, re-run, and defend.',
    icon: ShieldCheck,
    telemetry: {
      traceId: 'EVX-TR-9081',
      metric: 'Cohen κ = 0.94',
      status: 'VERIFIED',
      checks: [
        'Deterministic verifier: PASS',
        'Inter-rater agreement: 94.2%',
        'Action trace: 14/14 steps logged'
      ]
    }
  },
  {
    id: '02',
    num: '02',
    badge: 'RISK QUANTIFICATION',
    title: 'Severity-Graded Findings (P0–P4)',
    desc: 'Failures are triaged by risk band and regression delta so your engineering team fixes what actually matters first instead of chasing low-impact noise.',
    icon: Terminal,
    telemetry: {
      traceId: 'EVX-RED-3420',
      metric: 'Triage Band: P0',
      status: 'BLOCKED',
      checks: [
        'Indirect prompt injection: MITIGATED',
        'Tool privilege escalation: 0 paths',
        'Data exfiltration probe: BLOCKED'
      ]
    }
  },
  {
    id: '03',
    num: '03',
    badge: 'HUMAN BENCHMARKING',
    title: 'Calibrated Domain Experts',
    desc: 'Contributors are vetted specialists calibrated against gold-standard rubrics before touching production evaluations — no unverified crowd workers.',
    icon: Cpu,
    telemetry: {
      traceId: 'EVX-EXP-1104',
      metric: 'Calibration: 99.1%',
      status: 'CALIBRATED',
      checks: [
        'Domain pool: PhD / Clinical / SecOps',
        'Gold-standard alignment: 99.1%',
        'Dual-rater arbitration: ENABLED'
      ]
    }
  }
];

export default function EvidenceAssuranceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const streamTopRef = useRef<HTMLDivElement>(null);
  const streamBottomRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedPillar, setSelectedPillar] = useState<number>(0);

  useGSAP(
    () => {
      const container = containerRef.current;
      const streamTop = streamTopRef.current;
      const streamBottom = streamBottomRef.current;
      if (!container || !streamTop || !streamBottom) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        // Kinetic Opposing Typography Stream Scrub (anims-refer fx22/fx23 inspired)
        // Top line moves to the right
        gsap.fromTo(
          streamTop,
          { xPercent: -15 },
          {
            xPercent: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8
            }
          }
        );

        // Bottom line moves to the left in opposition
        gsap.fromTo(
          streamBottom,
          { xPercent: 12 },
          {
            xPercent: -12,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8
            }
          }
        );

        // Staggered Entrance of 3 Stage Cards
        cardsRef.current.forEach((card, i) => {
          if (!card) return;
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 40
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });
      });

      mm.add('(max-width: 1023px)', () => {
        cardsRef.current.forEach((card) => {
          if (!card) return;
          gsap.set(card, { opacity: 1, y: 0 });
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-neutral-950 text-white py-28 sm:py-36 overflow-hidden border-t border-neutral-900 selection:bg-neutral-800"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 [background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] [background-size:4rem_4rem]" />

      {/* ========================================================================= */}
      {/* KINETIC OPPOSING TYPOGRAPHY STREAMS (Background Layer)                   */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex flex-col justify-between py-12 select-none opacity-[0.04]">
        {/* Stream 1: Left to Right */}
        <div
          ref={streamTopRef}
          className="whitespace-nowrap font-mono text-7xl sm:text-9xl font-extrabold tracking-tighter uppercase text-white will-change-transform"
        >
          EVALUATION HARNESS • ADVERSARIAL TEST SUITE • REPRODUCIBLE TRACES • PRE-PRODUCTION ASSURANCE •
        </div>

        {/* Stream 2: Right to Left */}
        <div
          ref={streamBottomRef}
          className="whitespace-nowrap font-mono text-7xl sm:text-9xl font-extrabold tracking-tighter uppercase text-white will-change-transform"
        >
          SEVERITY TRIAGE • INTER-RATER AGREEMENT • CALIBRATED EXPERTS • PROMPT INJECTION DEFENSE •
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION CONTENT CONTAINER                                                 */}
      {/* ========================================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        {/* Header Eyebrow & Title */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-neutral-400 uppercase mb-4">
            <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>Assurance & Evidence</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight text-white leading-tight mb-5">
            Decisions backed by evidence,{' '}
            <span className="text-neutral-500">not a single metric.</span>
          </h2>

          <p className="text-neutral-400 text-base sm:text-lg font-normal leading-relaxed">
            Standard benchmarks collapse complex agent behaviours into uninterpretable averages.
            Evalixa delivers auditable evaluation traces, severity-graded vulnerabilities, and calibrated domain scoring.
          </p>
        </div>

        {/* ======================================================================= */}
        {/* 3 ASSURANCE CARDS GRID                                                  */}
        {/* ======================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {ASSURANCE_PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            const isSelected = selectedPillar === index;

            return (
              <div
                key={pillar.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                onClick={() => setSelectedPillar(index)}
                className={`group relative rounded-xl border p-8 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900/80 border-neutral-600 shadow-2xl shadow-black/60'
                    : 'bg-neutral-900/30 hover:bg-neutral-900/60 border-neutral-800/80 hover:border-neutral-700'
                }`}
              >
                {/* Top Metatag & Index */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 transition-colors ${isSelected ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-300'}`} />
                    <span className="text-[11px] font-mono tracking-wider uppercase text-neutral-400">
                      {pillar.badge}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-neutral-500">
                    {pillar.num}
                  </span>
                </div>

                {/* Heading */}
                <h3 className="font-display font-semibold text-xl sm:text-2xl text-white tracking-tight mb-4 leading-snug">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-normal">
                  {pillar.desc}
                </p>

                {/* Interactive Telemetry Indicator */}
                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-500">{pillar.telemetry.metric}</span>
                  <span className={`inline-flex items-center gap-1 font-semibold transition-colors ${isSelected ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-300'}`}>
                    <span>Inspect Trace</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ======================================================================= */}
        {/* INTERACTIVE LIVE TELEMETRY TERMINAL HUD                                */}
        {/* ======================================================================= */}
        <div className="relative rounded-xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-md overflow-hidden">
          {/* Terminal Topbar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-800 bg-neutral-950/60 font-mono text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="text-neutral-200 font-semibold">
                TELEMETRY INSPECTOR: {ASSURANCE_PILLARS[selectedPillar].telemetry.traceId}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider bg-white/10 text-white font-medium">
                {ASSURANCE_PILLARS[selectedPillar].telemetry.status}
              </span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 sm:p-8 font-mono text-xs sm:text-sm leading-relaxed text-neutral-300">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPillar}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="text-neutral-400 text-xs uppercase tracking-wider mb-2">
                  System Verdict: <span className="text-white font-bold">{ASSURANCE_PILLARS[selectedPillar].title}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {ASSURANCE_PILLARS[selectedPillar].telemetry.checks.map((chk, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 p-3 rounded-md bg-neutral-950/70 border border-neutral-800/80 text-neutral-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-xs">{chk}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
