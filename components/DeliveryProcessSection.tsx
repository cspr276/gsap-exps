'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PROCESS_STEPS = [
  {
    num: '01',
    label: 'DISCOVERY & RUBRICS',
    title: 'Rubric Design',
    desc: 'We define what "good" means alongside your domain experts — establishing task-grounded rubrics, explicit scoring criteria, inter-annotator guidelines, and gold-standard reference sets tailored to your specific application.',
    tagline: 'Task-grounded criteria & reference sets',
    specs: ['Gold-standard calibration', 'Domain-specific edge taxonomies', 'Inter-annotator rubrics']
  },
  {
    num: '02',
    label: 'BENCHMARK CONSTRUCTION',
    title: 'Adversarial Suite',
    desc: 'We construct exhaustive benchmark and red-team suites: edge cases, multi-turn prompt injections, jailbreaks, data exfiltration vectors, and complex tool-calling scenarios mapped rigorously to severity bands.',
    tagline: 'Exhaustive red-team & exploit coverage',
    specs: ['Indirect injection vectors', 'Tool privilege escalation', 'Reproducible test harnesses']
  },
  {
    num: '03',
    label: 'EXPERT SCORING',
    title: 'Expert Review',
    desc: 'Vetted domain specialists score every item against the rubric. Disagreements are adjudicated through multi-rater arbitration, and statistical inter-rater agreement (Cohen κ) is tracked and verified before trusting any judgment.',
    tagline: 'Calibrated specialist human judgment',
    specs: ['Credentialed domain reviewers', 'Multi-rater adjudication', 'Inter-rater agreement tracking']
  },
  {
    num: '04',
    label: 'CONTINUOUS ASSURANCE',
    title: 'Regression Monitoring',
    desc: 'Evidence-backed decision reports and severity-graded findings are handed over with automated regression suites that re-run continuously as your foundation models, prompts, tools, or dependencies evolve.',
    tagline: 'Automated delta alerts & permanent gates',
    specs: ['Severity-graded risk bands (P0–P4)', 'Automated CI/CD regressions', 'Production drift detection']
  }
];

export default function DeliveryProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const stepItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState<number>(0);

  useGSAP(
    () => {
      const container = containerRef.current;
      const progressBar = progressBarRef.current;
      if (!container) return;

      const mm = gsap.matchMedia();

      // Desktop layout (Pinned 2-column rail)
      mm.add('(min-width: 1024px)', () => {
        // Vertical laser progress bar tied to container scroll
        if (progressBar) {
          gsap.fromTo(
            progressBar,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.3
              }
            }
          );
        }

        // Each step on the right highlights as it crosses center
        stepItemsRef.current.forEach((stepEl, idx) => {
          if (!stepEl) return;

          ScrollTrigger.create({
            trigger: stepEl,
            start: 'top 55%',
            end: 'bottom 45%',
            onEnter: () => setActiveStep(idx),
            onEnterBack: () => setActiveStep(idx)
          });
        });
      });

      // Mobile fallback: simple entrance
      mm.add('(max-width: 1023px)', () => {
        stepItemsRef.current.forEach((stepEl, idx) => {
          if (!stepEl) return;
          gsap.fromTo(
            stepEl,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: stepEl,
                start: 'top 85%'
              }
            }
          );
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative w-full bg-neutral-950 text-white border-t border-neutral-800/80"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-24 lg:py-32">
        {/* Mobile Header (visible only on mobile) */}
        <div className="lg:hidden mb-16">
          <div className="flex items-center gap-2.5 text-xs font-mono tracking-widest text-neutral-400 uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>HOW WE DELIVER</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
            From Discovery to Continuous Assurance
          </h2>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ================================================================= */}
          {/* LEFT COLUMN: Sticky Stage & Laser Rail (Desktop)                  */}
          {/* ================================================================= */}
          <div
            ref={leftColRef}
            className="hidden lg:flex lg:col-span-5 flex-col justify-between sticky top-28 h-[calc(100vh-10rem)] py-4"
          >
            {/* Top Eyebrow & Headline */}
            <div>
              <div className="flex items-center gap-2.5 text-xs font-mono tracking-widest text-neutral-400 uppercase mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>HOW WE DELIVER</span>
              </div>
              <h2 className="font-display font-bold text-3xl xl:text-4xl text-white tracking-tight leading-[1.2] mb-4">
                From discovery to continuous assurance.
              </h2>
              <p className="text-neutral-400 text-sm xl:text-base leading-relaxed font-normal max-w-sm">
                A rigorous 4-step delivery pipeline engineered to surface critical AI failures in evaluation, before your users do.
              </p>
            </div>

            {/* Middle: Interactive Step Indicator List */}
            <div className="relative pl-7 my-auto">
              {/* Vertical Track Background */}
              <div className="absolute left-1 top-2 bottom-2 w-px bg-neutral-800" />
              {/* Scrubbed Progress Laser Line */}
              <div
                ref={progressBarRef}
                className="absolute left-1 top-2 bottom-2 w-px bg-emerald-400 origin-top will-change-transform shadow-[0_0_8px_rgba(52,211,153,0.8)]"
              />

              <div className="space-y-6">
                {PROCESS_STEPS.map((step, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <div
                      key={step.num}
                      className={`relative flex items-center gap-3 transition-all duration-300 ${
                        isActive ? 'text-white' : 'text-neutral-500'
                      }`}
                    >
                      {/* Node Bullet */}
                      <span
                        className={`absolute -left-7 w-3 h-3 rounded-full border transition-all duration-300 ${
                          isActive
                            ? 'bg-emerald-400 border-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.8)] scale-110'
                            : 'bg-neutral-900 border-neutral-700'
                        }`}
                      />
                      <span className="font-mono text-xs font-semibold tracking-wider">
                        {step.num}
                      </span>
                      <span className="font-heading text-sm tracking-tight font-medium">
                        {step.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom: Current Phase Snapshot */}
            <div className="pt-6 border-t border-neutral-800/80">
              <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 block mb-1">
                CURRENT PHASE • {PROCESS_STEPS[activeStep].num} / 04
              </span>
              <span className="text-xs text-neutral-300 font-mono">
                {PROCESS_STEPS[activeStep].tagline}
              </span>
            </div>
          </div>

          {/* ================================================================= */}
          {/* RIGHT COLUMN: Scrolling Step Cards                                */}
          {/* ================================================================= */}
          <div className="lg:col-span-7 space-y-16 lg:space-y-36 lg:py-16">
            {PROCESS_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;

              return (
                <div
                  key={step.num}
                  ref={(el) => {
                    stepItemsRef.current[idx] = el;
                  }}
                  className={`relative rounded-xl border p-8 sm:p-10 lg:p-12 transition-all duration-500 ${
                    isActive
                      ? 'bg-neutral-900/90 border-neutral-700 shadow-2xl shadow-black/80'
                      : 'bg-neutral-900/30 border-neutral-800/60 opacity-60 lg:opacity-40 hover:opacity-80'
                  }`}
                >
                  {/* Top Bar: Step Number & Label */}
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-800">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-white tracking-widest">
                        PHASE {step.num}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                      <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                        {step.label}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-neutral-500">
                      0{idx + 1} of 04
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight mb-4 leading-snug">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-normal mb-8">
                    {step.desc}
                  </p>

                  {/* Technical Specs Deliverables */}
                  <div className="space-y-2.5 pt-6 border-t border-neutral-800">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 block mb-3">
                      VERIFIABLE DELIVERABLES
                    </span>
                    {step.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
