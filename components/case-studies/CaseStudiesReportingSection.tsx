'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FileText, Cpu, GitCommit, ShieldAlert } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Grainient = dynamic(() => import('@/components/Grainient'), { ssr: false });

const REPORTING_PILLARS = [
  {
    index: '01',
    title: 'Reviewer Notes & Trace IDs',
    icon: FileText,
    desc: 'Full qualitative rationales captured directly from licensed practitioners, security operators, and domain fellows—establishing an unbroken audit trail.',
    invariant: 'Cryptographic Contributor Trace',
  },
  {
    index: '02',
    title: 'Statistical Agreement (Alpha)',
    icon: Cpu,
    desc: 'Rigorous calculation of Krippendorff’s Alpha and Cohen’s Kappa across double-blind reviews, guaranteeing your release gate is immune to subjective bias.',
    invariant: 'Alpha > 0.90 Target Standard',
  },
  {
    index: '03',
    title: 'Seed-Locked Test Baselines',
    icon: GitCommit,
    desc: 'Deterministic test cases, API payloads, and exploit replay vectors handed over directly into your private repository so regressions never slip past CI.',
    invariant: 'Deterministic CI/CD Integration',
  },
  {
    index: '04',
    title: 'Severity-Ranked Findings',
    icon: ShieldAlert,
    desc: 'Vulnerabilities and hallucination bands classified by deployment liability and exploitability, ordering remediation sprints by risk rather than convenience.',
    invariant: 'CVSS & OWASP Aligned',
  },
];

export default function CaseStudiesReportingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;

      gsap.fromTo(
        grid,
        { y: 40, opacity: 0.15 },
        {
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: grid,
            start: 'top 92%',
            end: 'top 55%',
            scrub: 1,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-20 bg-[#09090b] text-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-b border-neutral-800"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-neutral-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold">
              EVALUATION REPORTING // AUDIT INTEGRITY
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-6">
            How we report outcomes to boards and regulators.
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-400 leading-relaxed">
            Every engagement ends with reviewer notes, agreement scores, and reproducible traces you can inspect, re-run, and defend. Findings are graded by severity and regression delta so fixes are ordered by risk, not convenience.
          </p>
        </div>

        {/* 4-Item Segmented Grid with Ambient Grainient */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/40 divide-y md:divide-y-0 md:divide-x divide-neutral-800 backdrop-blur-sm"
        >
          {REPORTING_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.index}
                className="relative p-7 sm:p-8 flex flex-col justify-between group overflow-hidden"
              >
                {/* Subtle Grainient Shader on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
                  <Grainient
                    color1="#18181b"
                    color2="#27272a"
                    color3="#09090b"
                    grainAmount={0.06}
                  />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-xs font-bold text-neutral-400 tracking-widest">
                      {pillar.index}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center text-neutral-300">
                      <Icon className="w-4 h-4 stroke-[1.8]" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white tracking-tight mb-3">
                    {pillar.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                    {pillar.desc}
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                    Standard
                  </span>
                  <span className="font-mono text-xs font-semibold text-neutral-300">
                    {pillar.invariant}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
