'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface MetricItem {
  targetValue: number;
  prefix?: string;
  suffix?: string;
  formatComma?: boolean;
  label: string;
  detail: string;
  code: string;
}

const METRICS: MetricItem[] = [
  {
    targetValue: 50,
    suffix: '+',
    label: 'Evaluation Dimensions',
    detail: 'Multi-turn reasoning, tool execution, safety boundaries, and latency budgets.',
    code: 'DIM_COVERAGE',
  },
  {
    targetValue: 1200,
    suffix: '+',
    formatComma: true,
    label: 'Calibrated Domain Experts',
    detail: 'Credentialed specialists scoring and verifying enterprise reasoning traces.',
    code: 'EXPERT_PANEL',
  },
  {
    targetValue: 100,
    suffix: '%',
    label: 'Auditability & Traces',
    detail: 'Seed-locked environment snapshots, raw tool calls, and cryptographic ledgers.',
    code: 'TRACE_INTEGRITY',
  },
  {
    targetValue: 24,
    prefix: '< ',
    suffix: 'hr',
    label: 'Regression Triage SLA',
    detail: 'Automated delta alerts when models or system prompt templates drift.',
    code: 'DELTA_ALERT',
  },
];

export default function AboutMetricsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const laserRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const laser = laserRef.current;
      if (!section) return;

      // Laser line sweep across top border
      if (laser) {
        gsap.fromTo(
          laser,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Odometer counter roll-up animation
      const countObj = { c0: 0, c1: 0, c2: 0, c3: 0 };
      gsap.to(countObj, {
        c0: METRICS[0].targetValue,
        c1: METRICS[1].targetValue,
        c2: METRICS[2].targetValue,
        c3: METRICS[3].targetValue,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          setCounts([
            Math.round(countObj.c0),
            Math.round(countObj.c1),
            Math.round(countObj.c2),
            Math.round(countObj.c3),
          ]);
        },
      });

      // Stagger metric columns upward
      gsap.fromTo(
        '.about-metric-col',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="metrics"
      ref={sectionRef}
      className="relative z-20 w-full bg-white text-neutral-950 border-t border-b border-neutral-200 py-12 sm:py-16 shadow-[0_-30px_70px_rgba(0,0,0,0.85)] overflow-hidden"
    >
      {/* Laser line sweep along top border */}
      <div
        ref={laserRef}
        className="absolute top-0 left-0 right-0 h-[2px] bg-neutral-950 origin-left"
        style={{ transform: 'scaleX(0)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-neutral-200">
          {METRICS.map((metric, idx) => {
            const formattedVal = metric.formatComma
              ? counts[idx].toLocaleString()
              : counts[idx];

            return (
              <div
                key={metric.label}
                className="about-metric-col flex flex-col justify-between lg:px-8 first:lg:pl-0 last:lg:pr-0"
              >
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-display font-extrabold text-4xl sm:text-5xl text-neutral-950 tracking-tight tabular-nums">
                      {metric.prefix || ''}
                      {formattedVal}
                      {metric.suffix || ''}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest hidden sm:inline">
                      {metric.code}
                    </span>
                  </div>

                  <span className="font-mono text-xs uppercase tracking-wider text-neutral-900 font-bold block mb-2">
                    {metric.label}
                  </span>

                  <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                    {metric.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
