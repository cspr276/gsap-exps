'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Grainient = dynamic(() => import('@/components/Grainient'), { ssr: false });

const TENETS = [
  {
    code: '01 / EVIDENCE OVER VIBES',
    title: 'Deterministic Reproducibility',
    summary:
      'Every evaluation judgment ships with complete input/output execution traces, tool-call payloads, reviewer score sheets, and statistical confidence bounds.',
    invariants: [
      'Seed-locked environment snapshots',
      'Cryptographic trace verification',
      'Zero black-box summary scores',
      'Exportable audit bundles for regulators',
    ],
  },
  {
    code: '02 / ADVERSARIAL BY DEFAULT',
    title: 'Worst-Case Exploit Coverage',
    summary:
      'Production agents fail at the margins. We stress-test systems against adaptive multi-turn jailbreaks, indirect prompt injection, and privilege escalation.',
    invariants: [
      'Multi-turn context poisoning suites',
      'Tool-call & SQL/API injection vectors',
      'Data exfiltration boundary probes',
      'Severity-graded remediation backlogs',
    ],
  },
  {
    code: '03 / HUMAN-EXPERT GROUNDING',
    title: 'Calibrated Specialist Panels',
    summary:
      'Automated verifiers are only as trustworthy as the human ground truth that anchors them. Our domain fellows adjudicate every ambiguous reasoning trace.',
    invariants: [
      'Triple-blind domain specialist scoring',
      'Krippendorff’s Alpha ≥ 0.90 enforcement',
      'Continuous judge-to-human alignment checks',
      'Structured dispute adjudication protocols',
    ],
  },
  {
    code: '04 / DEPLOYMENT VELOCITY',
    title: 'Continuous CI/CD Release Gates',
    summary:
      'Assurance cannot be a quarterly bottleneck. Every discovered failure mode compiles directly into an automated regression test inside your deployment pipeline.',
    invariants: [
      'Automated pull-request blocking gates',
      'Model & prompt swap delta reports',
      '24/7 live production canary monitoring',
      'Sub-24hr regression triage SLAs',
    ],
  },
];

export default function AboutTenetsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // Staggered 3D Grid Card Animations (from Staggered3DGridAnimations-main)
      const cards = gsap.utils.toArray<HTMLElement>('.tenet-card');
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        cards.forEach((card, idx) => {
          const isLeft = idx % 2 === 0;
          gsap.fromTo(
            card,
            {
              x: isLeft ? -100 : 100,
              y: 60,
              rotateX: 18,
              rotateZ: isLeft ? -2 : 2,
              opacity: 0.1,
            },
            {
              x: 0,
              y: 0,
              rotateX: 0,
              rotateZ: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom+=60px',
                end: 'top 50%',
                scrub: 1,
              },
            }
          );
        });
      });

      mm.add('(max-width: 767px)', () => {
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 40, opacity: 0.15 },
            {
              y: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom+=30px',
                end: 'top 60%',
                scrub: 0.8,
              },
            }
          );
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-20 w-full py-24 sm:py-32 bg-[#09090b] text-white border-b border-neutral-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-3">
            04 // OPERATING TENETS
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-4">
            Four Non-Negotiable Engineering Principles.
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-400 leading-relaxed font-normal">
            Every benchmark suite, red-team operation, and annotation pipeline we deliver is governed by four foundational invariants.
          </p>
        </div>

        {/* 2x2 Staggered 3D Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
          style={{ perspective: '1200px' }}
        >
          {TENETS.map((tenet) => (
            <div
              key={tenet.code}
              className="tenet-card group relative p-7 sm:p-9 rounded-md bg-neutral-950 border border-neutral-800/90 hover:border-white/30 transition-colors duration-500 flex flex-col justify-between overflow-hidden shadow-2xl shadow-black will-change-transform"
            >
              {/* High-Contrast B/W Grainient Shader */}
              <div className="absolute inset-0 z-0 pointer-events-none opacity-80 group-hover:opacity-95 transition-opacity duration-500">
                <Grainient
                  color1="#000000"
                  color2="#303030"
                  color3="#808080"
                  saturation={0}
                  timeSpeed={0.18}
                  warpStrength={0.65}
                  grainAmount={0.07}
                  contrast={1.35}
                />
              </div>

              <div className="absolute inset-0 z-1 pointer-events-none bg-linear-to-t from-neutral-950/90 via-neutral-950/45 to-neutral-950/60" />

              <div className="relative z-10">
                <div className="flex items-center justify-between pb-4 mb-5 ">
                  <span className="font-mono text-xs uppercase tracking-widest text-neutral-200 font-semibold">
                    {tenet.code}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-3 tracking-tight">
                  {tenet.title}
                </h3>

                <p className="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed mb-6 font-normal">
                  {tenet.summary}
                </p>
              </div>

              <div className="relative z-10 pt-5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 block mb-3">
                  ENFORCED INVARIANTS:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {tenet.invariants.map((inv) => (
                    <li
                      key={inv}
                      className="flex items-start gap-2 text-xs sm:text-sm text-neutral-200 font-sans"
                    >
                      <span className="font-mono text-white text-xs mt-0.5 select-none">
                        →
                      </span>
                      <span>{inv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
