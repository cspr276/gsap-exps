'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { AlertTriangle, Users, FileCheck2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ASSURANCE_ITEMS = [
  {
    icon: FileCheck2,
    tag: 'AUDITABLE TRACES',
    title: 'Auditable evidence, not a single score',
    desc: 'Every judgment ships with reviewer notes, agreement scores, and reproducible traces you can inspect and defend before regulatory bodies and leadership.',
    metric: '100% Trace Reproducibility',
    badge: 'Zero Black Boxes',
    simulatedTrace: [
      { label: 'Evaluation Trace ID', val: 'EVX-9082-ATT' },
      { label: 'Reviewer Agreement', val: 'κ = 0.94 (Near-Perfect)' },
      { label: 'Adjudication Protocol', val: 'Triple-Blind Consensus' }
    ]
  },
  {
    icon: AlertTriangle,
    tag: 'RISK STRATIFICATION',
    title: 'Severity-graded findings',
    desc: 'Failures are triaged by risk band and regression delta, so your engineering team fixes critical vulnerabilities and exploits before addressing cosmetic flaws.',
    metric: 'Severity Banding (P0 to P4)',
    badge: 'Triage Delta Engine',
    simulatedTrace: [
      { label: 'Exploit Vector', val: 'Prompt Injection / Jailbreak' },
      { label: 'Severity Classification', val: 'P0 - Immediate Block' },
      { label: 'Automated Canary Action', val: 'Traffic Quarantined' }
    ]
  },
  {
    icon: Users,
    tag: 'EXPERT NETWORK',
    title: 'Calibrated domain experts',
    desc: 'Contributors are verified by deep technical expertise and calibrated against gold-standard benchmark sets before they ever evaluate production model outputs.',
    metric: 'Pre-Calibrated Specialists',
    badge: 'Domain Calibration',
    simulatedTrace: [
      { label: 'Specialist Cohort', val: 'PhD & Systems Architects' },
      { label: 'Gold-Standard Alignment', val: '99.2% Calibration Pass' },
      { label: 'Continuous Re-Validation', val: 'Bi-Weekly Drift Checks' }
    ]
  }
];

export default function EvidenceAssuranceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="evidence"
      ref={containerRef}
      className="relative w-full bg-[#0d0d10] text-white py-28 sm:py-36 px-6 sm:px-12 lg:px-20 border-t border-neutral-800/80 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-neutral-800/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-neutral-400" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400">
              EVIDENCE & ASSURANCE
            </span>
          </div>
          <h2 className="font-display font-semibold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-tight mb-5">
            AI security, evaluation, and intelligent system delivery — shaped by real outcomes.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
            Evalixa AI combines adversarial testing, real-time defense, structured evaluation, and expert data annotation into a unified delivery model. Every judgment is grounded in auditable telemetry.
          </p>
        </div>

        {/* 3 Interactive Telemetry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {ASSURANCE_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.tag}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className="group/card rounded-lg border border-neutral-800/90 bg-[#121216]/90 p-7 sm:p-8 flex flex-col justify-between hover:border-neutral-700 transition-all duration-300 shadow-xl shadow-black/40 hover:shadow-black/70 relative overflow-hidden"
              >
                {/* Subtle card top glow */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-neutral-600/40 to-transparent" />

                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between text-xs font-mono mb-6">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-neutral-300" />
                      <span className="text-neutral-300 font-semibold tracking-wider">
                        {item.tag}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-neutral-400 tracking-wider">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="font-display font-semibold text-lg sm:text-xl text-white tracking-tight mb-3 group-hover/card:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    {item.desc}
                  </p>
                </div>

                {/* Simulated Live Telemetry HUD */}
                <div className="rounded-md border border-neutral-800/80 bg-black/40 p-4 font-mono text-[11px] space-y-2 mt-2">
                  <div className="text-neutral-300 text-[10px] tracking-wider uppercase pb-1 border-b border-neutral-800 flex items-center justify-between">
                    <span>Telemetry Inspector</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      LIVE
                    </span>
                  </div>
                  {item.simulatedTrace.map((row) => (
                    <div key={row.label} className="flex items-center justify-between text-neutral-400">
                      <span className="text-neutral-400">{row.label}</span>
                      <span className="text-neutral-200 font-medium">{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Link below */}
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-neutral-800/80">
          <p className="text-xs sm:text-sm font-mono text-neutral-400">
            Engineered for enterprise AI teams requiring compliance-grade attestation.
          </p>
          <Link
            href="#manifesto"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-wider uppercase text-neutral-300 hover:text-white transition-colors"
          >
            <span>Read System Manifesto</span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
