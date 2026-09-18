'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ShieldAlert, Crosshair, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ThreatPoint {
  id: string;
  label: string;
  x: number; // 0 - 100%
  y: number; // 0 - 100%
  severity: 'CRITICAL' | 'LATENT' | 'NUISANCE' | 'LOW';
  family: string;
  body: string;
  mitigation: string;
  linkedPillarIndex: number; // 0: Auditable evidence, 1: Severity-graded, 2: Calibrated experts
}

const THREAT_POINTS: ThreatPoint[] = [
  {
    id: 't-1',
    label: 'Indirect Prompt Injection',
    x: 82,
    y: 84,
    severity: 'CRITICAL',
    family: 'Adversarial Exploit',
    body: 'Hostile strings embedded in third-party retrieval data compel the agent to override instructions and execute unauthorized tool operations.',
    mitigation: 'Pre-execution adversarial boundary filters + reproducible evaluation suites.',
    linkedPillarIndex: 0
  },
  {
    id: 't-2',
    label: 'Tool Privilege Escalation',
    x: 48,
    y: 90,
    severity: 'CRITICAL',
    family: 'Runtime Execution',
    body: 'Autonomous execution engine invoked with elevated administrative privileges bypassing dual-custody authorization gates.',
    mitigation: 'Severity-banded triage rules isolating high-risk database & payment capabilities.',
    linkedPillarIndex: 1
  },
  {
    id: 't-3',
    label: 'Multi-Turn Jailbreak Chain',
    x: 86,
    y: 62,
    severity: 'CRITICAL',
    family: 'Policy Violation',
    body: 'Sophisticated adversarial persona adoption gradually erodes model safety refusals across an extended conversational context window.',
    mitigation: 'Gold-standard benchmark datasets with calibrated specialist human-in-the-loop scoring.',
    linkedPillarIndex: 2
  },
  {
    id: 't-4',
    label: 'Unbounded Context Drift',
    x: 28,
    y: 68,
    severity: 'LATENT',
    family: 'State Integrity',
    body: 'Subtle semantic degradation across long sessions leading to cumulative factual corruption and unmonitored decision divergence.',
    mitigation: 'Continuous canary evaluations and regression monitoring with delta tracking.',
    linkedPillarIndex: 1
  },
  {
    id: 't-5',
    label: 'System Prompt Exfiltration',
    x: 74,
    y: 36,
    severity: 'NUISANCE',
    family: 'Information Leakage',
    body: 'Carefully engineered probe sequences designed to extract internal governance rules and private context without direct operational compromise.',
    mitigation: 'Output token scrubbers + adversarial red-team prompt testing.',
    linkedPillarIndex: 0
  },
  {
    id: 't-6',
    label: 'Hallucinated Tool Call',
    x: 22,
    y: 28,
    severity: 'LOW',
    family: 'Syntactic Anomaly',
    body: 'Model outputs non-existent API parameters or fictitious functions that fail schema validation before execution.',
    mitigation: 'Schema validation gates and rigorous rubric definition.',
    linkedPillarIndex: 0
  }
];

const EVIDENCE_PILLARS = [
  {
    num: '01',
    title: 'Auditable evidence, not a single score',
    desc: 'Every judgment ships with reviewer notes, agreement scores, and reproducible traces you can inspect and defend.',
    badge: '100% REPRODUCIBLE TRACES',
    icon: Crosshair
  },
  {
    num: '02',
    title: 'Severity-graded findings',
    desc: 'Failures are triaged by risk band and regression delta, so your team fixes what actually matters first.',
    badge: '4-TIER RISK TAXONOMY',
    icon: ShieldAlert
  },
  {
    num: '03',
    title: 'Calibrated domain experts',
    desc: 'Contributors are verified by expertise and calibrated against gold-standard sets before touching production work.',
    badge: 'CALIBRATED HUMAN-IN-THE-LOOP',
    icon: Cpu
  }
];

export default function WhyEvalixaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);
  const [activeThreatId, setActiveThreatId] = useState<string>('t-1');
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(0);

  const activeThreat = THREAT_POINTS.find((t) => t.id === activeThreatId) || THREAT_POINTS[0];

  useGSAP(
    () => {
      const section = sectionRef.current;
      const matrix = matrixRef.current;
      if (!section || !matrix) return;

      // Animate matrix coordinate dots on enter
      gsap.fromTo(
        '.matrix-dot',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: matrix,
            start: 'top 80%'
          }
        }
      );

      // Animate pillars stagger
      gsap.fromTo(
        '.evidence-pillar-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%'
          }
        }
      );
    },
    { scope: sectionRef }
  );

  // When a pillar is hovered, activate its first linked threat point
  const handlePillarHover = (index: number) => {
    setHoveredPillar(index);
    const linkedThreat = THREAT_POINTS.find((t) => t.linkedPillarIndex === index);
    if (linkedThreat) {
      setActiveThreatId(linkedThreat.id);
    }
  };

  return (
    <section
      id="why-evalixa"
      ref={sectionRef}
      className="relative w-full bg-neutral-950 text-white border-t border-neutral-800/80"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-24 lg:py-32">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 mb-3 block">
            WHY EVALIXA
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15] mb-6">
            AI security, evaluation, and intelligent system delivery — shaped by real outcomes.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base lg:text-lg leading-relaxed font-normal">
            Evalixa AI combines adversarial testing, real-time defense, structured evaluation, and expert data annotation into a unified delivery model. We measure AI where it meets the real world.
          </p>
        </div>

        {/* 2-Column Split: Evidence Pillars vs 2D Risk Matrix HUD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* ================================================================= */}
          {/* LEFT COLUMN: 3 Core Evidence Pillars                              */}
          {/* ================================================================= */}
          <div className="lg:col-span-5 flex flex-col space-y-5 sm:space-y-6">
            <div className="mb-2">
              <span className="font-mono text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                ASSURANCE ARCHITECTURE
              </span>
            </div>

            {EVIDENCE_PILLARS.map((pillar, idx) => {
              const isSelected = hoveredPillar === idx;
              const Icon = pillar.icon;

              return (
                <div
                  key={pillar.num}
                  onMouseEnter={() => handlePillarHover(idx)}
                  onClick={() => handlePillarHover(idx)}
                  className={`evidence-pillar-card group relative p-6 sm:p-7 rounded-md border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#121212] border-neutral-600 shadow-xl shadow-black/80 ring-1 ring-white/10'
                      : 'bg-[#121212]/60 border-neutral-800/80 hover:border-neutral-700 hover:bg-[#121212]'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-white tracking-widest">
                        {pillar.num}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-neutral-700" />
                      <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                        {pillar.badge}
                      </span>
                    </div>
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isSelected ? 'text-white' : 'text-neutral-600 group-hover:text-neutral-400'
                      }`}
                    />
                  </div>

                  <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight mb-2 leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                    {pillar.desc}
                  </p>

                  <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                      {isSelected ? 'ACTIVE FOCUS IN RADAR' : 'HOVER TO CALIBRATE'}
                    </span>
                    <ArrowRight
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        isSelected ? 'translate-x-1 text-white' : 'text-neutral-600'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================================================================= */}
          {/* RIGHT COLUMN: Interactive 2D Risk Matrix & Telemetry HUD          */}
          {/* ================================================================= */}
          <div className="lg:col-span-7">
            <SpotlightCard
              spotlightColor="rgba(255, 255, 255, 0.05)"
              className="relative rounded-md border border-neutral-800/90 bg-[#121212] p-6 sm:p-8 overflow-hidden shadow-2xl shadow-black/80"
            >
              {/* HUD Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-neutral-800/80 mb-6">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 block mb-1">
                    THREAT VECTOR MODELING
                  </span>
                  <h4 className="font-mono text-sm font-semibold text-white tracking-tight">
                    Attacker Influence vs. Action Privilege Matrix
                  </h4>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-400 self-start sm:self-auto bg-neutral-900/80 px-3 py-1.5 rounded-md border border-neutral-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span>LIVE COORD TELEMETRY</span>
                </div>
              </div>

              {/* Matrix Plot Container */}
              <div ref={matrixRef} className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[440px] my-4">
                {/* 4 Quadrants Visual Grid */}
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 rounded border border-neutral-800 pointer-events-none">
                  {/* Top Left: Latent Risk */}
                  <div className="border-r border-b border-neutral-800/70 p-3 flex flex-col justify-start bg-neutral-950/20">
                    <span className="font-mono text-[10px] tracking-wider text-neutral-500 uppercase font-semibold">
                      LATENT RISK
                    </span>
                    <span className="font-mono text-[9px] text-neutral-600 mt-0.5">
                      Low Input Control · High Privilege
                    </span>
                  </div>

                  {/* Top Right: Critical Impact */}
                  <div className="border-b border-neutral-800/70 p-3 flex flex-col justify-start bg-white/[0.02]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] tracking-wider text-white uppercase font-bold">
                        CRITICAL SEVERITY
                      </span>
                      <span className="font-mono text-[9px] px-1.5 py-0.5 bg-neutral-800 text-white rounded">
                        TIER 1
                      </span>
                    </div>
                    <span className="font-mono text-[9px] text-neutral-400 mt-0.5">
                      High Input Control · High Privilege
                    </span>
                  </div>

                  {/* Bottom Left: Low Impact */}
                  <div className="border-r border-neutral-800/70 p-3 flex flex-col justify-end bg-neutral-950/40">
                    <span className="font-mono text-[10px] tracking-wider text-neutral-600 uppercase">
                      LOW IMPACT
                    </span>
                    <span className="font-mono text-[9px] text-neutral-700 mt-0.5">
                      Contained · Schema Gate Discard
                    </span>
                  </div>

                  {/* Bottom Right: Nuisance */}
                  <div className="p-3 flex flex-col justify-end bg-neutral-950/20">
                    <span className="font-mono text-[10px] tracking-wider text-neutral-500 uppercase font-semibold">
                      NUISANCE
                    </span>
                    <span className="font-mono text-[9px] text-neutral-600 mt-0.5">
                      High Input Control · Read-Only Context
                    </span>
                  </div>
                </div>

                {/* Subtle Coordinate Axis Crosshairs */}
                <div className="absolute inset-x-0 top-1/2 h-px bg-neutral-800/40 border-t border-dashed border-neutral-800 pointer-events-none" />
                <div className="absolute inset-y-0 left-1/2 w-px bg-neutral-800/40 border-l border-dashed border-neutral-800 pointer-events-none" />

                {/* Coordinate Points */}
                {THREAT_POINTS.map((threat) => {
                  const isCurrent = activeThreatId === threat.id;
                  const isLinkedToPillar = hoveredPillar !== null && threat.linkedPillarIndex === hoveredPillar;

                  return (
                    <div
                      key={threat.id}
                      style={{
                        left: `${threat.x}%`,
                        bottom: `${threat.y}%`
                      }}
                      className="matrix-dot absolute -translate-x-1/2 translate-y-1/2 z-20"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveThreatId(threat.id)}
                        onMouseEnter={() => setActiveThreatId(threat.id)}
                        aria-label={threat.label}
                        className={`group/point relative flex items-center justify-center transition-all duration-300 ${
                          isCurrent
                            ? 'scale-125 z-30'
                            : isLinkedToPillar
                            ? 'scale-110'
                            : 'opacity-80 hover:opacity-100 hover:scale-110'
                        }`}
                      >
                        {/* Radar Pulse Ring for Critical Active Threats */}
                        {isCurrent && threat.severity === 'CRITICAL' && (
                          <span className="absolute w-8 h-8 rounded-full bg-white/20 animate-ping pointer-events-none" />
                        )}

                        {/* Core Dot */}
                        <span
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all duration-300 ${
                            isCurrent
                              ? 'bg-white border-white shadow-[0_0_12px_rgba(255,255,255,0.9)]'
                              : isLinkedToPillar
                              ? 'bg-neutral-200 border-white'
                              : 'bg-neutral-800 border-neutral-600'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isCurrent ? 'bg-black' : 'bg-neutral-400'
                            }`}
                          />
                        </span>

                        {/* Floating Point Tag */}
                        <span
                          className={`absolute left-5 font-mono text-[10px] tracking-tight whitespace-nowrap px-2 py-0.5 rounded border transition-all duration-200 pointer-events-none ${
                            isCurrent
                              ? 'bg-white text-black border-white font-bold opacity-100 shadow-lg'
                              : 'bg-neutral-900/90 text-neutral-300 border-neutral-700/80 opacity-0 sm:opacity-75 group-hover/point:opacity-100'
                          }`}
                        >
                          {threat.label}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Axis Orientation Indicators */}
              <div className="flex justify-between items-center text-neutral-500 font-mono text-[10px] tracking-wider mt-4 pt-2 border-t border-neutral-800/80">
                <span>0% ATTACKER INFLUENCE</span>
                <span className="uppercase text-neutral-400">Attacker influence over the input →</span>
                <span>100% MAXIMUM SURFACE</span>
              </div>

              {/* Threat Detail & Mitigation Inspector Card */}
              <div className="mt-6 p-5 rounded-md bg-neutral-900/90 border border-neutral-800 transition-all duration-300">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-neutral-800">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
                      INSPECTED THREAT
                    </span>
                    <span className="w-1 h-1 rounded-full bg-neutral-700" />
                    <span className="font-mono text-[10px] font-semibold text-neutral-300 uppercase">
                      {activeThreat.family}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[10px]">
                    <span className="text-neutral-500">SEVERITY:</span>
                    <span
                      className={`font-bold px-2 py-0.5 rounded border ${
                        activeThreat.severity === 'CRITICAL'
                          ? 'border-white bg-white text-black'
                          : 'border-neutral-700 text-neutral-300 bg-neutral-800'
                      }`}
                    >
                      {activeThreat.severity}
                    </span>
                  </div>
                </div>

                <h5 className="font-display font-bold text-base sm:text-lg text-white mb-2">
                  {activeThreat.label}
                </h5>

                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-4">
                  {activeThreat.body}
                </p>

                {/* Evalixa Mitigation Protocol */}
                <div className="pt-3 border-t border-neutral-800/80 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 block mb-0.5">
                      EVALIXA INTERVENTION
                    </span>
                    <span className="text-xs text-neutral-200 font-mono">
                      {activeThreat.mitigation}
                    </span>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
