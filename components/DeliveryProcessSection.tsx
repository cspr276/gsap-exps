'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Rubric Design',
    desc: 'We define what "good" means alongside your domain experts — task-grounded rubrics, scoring criteria, and gold-standard reference sets.',
    tagline: 'Task-grounded criteria & reference sets',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
  },
  {
    num: '02',
    title: 'Adversarial Suite',
    desc: 'We construct benchmark and red-team suites: edge cases, prompt injection, jailbreaks, and failure taxonomies mapped to severity bands.',
    tagline: 'Exhaustive red-team & exploit coverage',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80'
  },
  {
    num: '03',
    title: 'Expert Review',
    desc: 'Vetted contributors score every item against the rubric; disagreements are adjudicated and inter-rater agreement is tracked.',
    tagline: 'Calibrated specialist human judgment',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80'
  },
  {
    num: '04',
    title: 'Regression Monitoring',
    desc: 'Evidence-backed reports and severity-graded findings, with continuous regression runs as your models and prompts change.',
    tagline: 'Automated delta alerts & permanent gates',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80'
  }
];

export default function DeliveryProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const stepItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState<number>(0);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const leftCol = leftColRef.current;
      const rightCol = rightColRef.current;
      const progressBar = progressBarRef.current;
      if (!section || !leftCol || !rightCol) return;

      const mm = gsap.matchMedia();

      // Desktop layout: Pinned Left Column with ScrollTrigger
      mm.add('(min-width: 1024px)', () => {
        // Pin the inner left column while the right cards scroll through
        ScrollTrigger.create({
          trigger: section,
          start: 'top 96px',
          endTrigger: rightCol,
          end: 'bottom bottom',
          pin: leftCol,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true
        });

        // Vertical laser progress bar tied to the right column scroll progression
        if (progressBar) {
          gsap.fromTo(
            progressBar,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top 96px',
                endTrigger: rightCol,
                end: 'bottom bottom',
                scrub: 0.3
              }
            }
          );
        }

        // Highlight active step as each card crosses the middle of the viewport
        stepItemsRef.current.forEach((stepEl, idx) => {
          if (!stepEl) return;

          ScrollTrigger.create({
            trigger: stepEl,
            start: 'top 60%',
            end: 'bottom 40%',
            onEnter: () => setActiveStep(idx),
            onEnterBack: () => setActiveStep(idx)
          });
        });
      });

      // Mobile / Tablet fallback animations
      mm.add('(max-width: 1023px)', () => {
        stepItemsRef.current.forEach((stepEl) => {
          if (!stepEl) return;
          gsap.fromTo(
            stepEl,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
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
    { scope: sectionRef }
  );

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative w-full bg-neutral-950 text-white border-t border-neutral-800/80"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-24 lg:py-32">
        {/* Mobile Section Header */}
        <div className="lg:hidden mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 mb-2 block">
            HOW WE DELIVER
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
            From Discovery to Continuous Assurance
          </h2>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ================================================================= */}
          {/* LEFT COLUMN: Outer grid item preserves 5-col width permanently     */}
          {/* ================================================================= */}
          <div className="hidden lg:block lg:col-span-5 relative self-stretch">
            <div
              ref={leftColRef}
              className="w-full flex flex-col justify-between h-[calc(100vh-160px)] max-h-[580px] pointer-events-auto"
            >
              {/* Top Eyebrow & Headline (No glowing dot) */}
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 mb-3 block">
                  HOW WE DELIVER
                </span>
                <h2 className="font-display font-bold text-3xl xl:text-4xl text-white tracking-tight leading-[1.2] mb-4">
                  From discovery to continuous assurance.
                </h2>
                <p className="text-neutral-400 text-sm xl:text-base leading-relaxed font-normal max-w-sm">
                  A structured 4-step delivery pipeline engineered to surface critical AI failures in evaluation, before your users do.
                </p>
              </div>

              {/* Middle: Interactive Step Indicator Rail */}
              <div className="relative pl-7 my-auto">
                {/* Vertical Track Background */}
                <div className="absolute left-1 top-2 bottom-2 w-px bg-neutral-800" />
                {/* Scrubbed Progress Laser Line */}
                <div
                  ref={progressBarRef}
                  className="absolute left-1 top-2 bottom-2 w-px bg-white origin-top will-change-transform shadow-[0_0_8px_rgba(255,255,255,0.7)]"
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
                          className={`absolute -left-7 w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                            isActive
                              ? 'bg-white border-white shadow-[0_0_8px_rgba(255,255,255,0.8)] scale-110'
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
          </div>

          {/* ================================================================= */}
          {/* RIGHT COLUMN: Scrolling Step Cards (Matching Services Card Style)  */}
          {/* ================================================================= */}
          <div
            ref={rightColRef}
            className="lg:col-span-7 space-y-8 sm:space-y-10 lg:space-y-12"
          >
            {PROCESS_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;

              return (
                <div
                  key={step.num}
                  ref={(el) => {
                    stepItemsRef.current[idx] = el;
                  }}
                >
                  <SpotlightCard
                    spotlightColor="rgba(255, 255, 255, 0.08)"
                    className={`group/card relative rounded-md border p-8 sm:p-9 transition-all duration-500 overflow-hidden cursor-default min-h-[340px] sm:min-h-[360px] flex flex-col justify-between ${
                      isActive
                        ? 'border-neutral-700 bg-[#121212] shadow-2xl shadow-black/80'
                        : 'border-neutral-800/80 bg-[#121212]/90 opacity-80 lg:opacity-60 hover:opacity-100 hover:border-neutral-700'
                    }`}
                  >
                    {/* Background Image Layer with Dark Overlay & Subtle Zoom */}
                    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover object-center group-hover/card:scale-105 opacity-25 group-hover/card:opacity-35 transition-all duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#101012] via-[#101012]/80 to-[#101012]/50" />
                    </div>

                    {/* Foreground Card Content (Matching Horizontal Services Card Hierarchy) */}
                    <div className="relative z-10 flex flex-col justify-between h-full">
                      <div className="flex flex-col">
                        {/* 1. Top Number */}
                        <div className="mb-4 sm:mb-6">
                          <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-white uppercase">
                            {step.num}
                          </span>
                        </div>

                        {/* 2. Heading below number */}
                        <h3 className="font-display font-bold text-xl sm:text-2xl text-white uppercase tracking-tight mb-3 sm:mb-4 leading-snug">
                          {step.title}
                        </h3>

                        {/* 3. Content below heading */}
                        <p className="text-neutral-300 text-xs sm:text-sm sm:text-[15px] leading-relaxed font-normal">
                          {step.desc}
                        </p>
                      </div>

                      {/* 4. Link below with hover rotation from -45deg to 0deg */}
                      <div className="pt-6 sm:pt-8">
                        <Link
                          href="/contact"
                          className="group/link inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-wider uppercase text-neutral-300 group-hover/card:text-white font-semibold transition-colors"
                        >
                          <span>Explore stage</span>
                          <ArrowRight className="w-4 h-4 text-neutral-400 -rotate-45 group-hover/card:rotate-0 group-hover/card:text-white group-hover/card:translate-x-0.5 transition-all duration-300 ease-out origin-center" />
                        </Link>
                      </div>
                    </div>
                  </SpotlightCard>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
