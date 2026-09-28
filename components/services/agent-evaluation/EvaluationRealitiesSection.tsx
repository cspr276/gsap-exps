'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Terminal } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ChapterData {
  id: string;
  index: string;
  category: string;
  headlineLine1: string;
  headlineLine2: string;
  subtitles: string[];
  diagnosticTag: string;
  diagnosticStatus: string;
  stat: string;
  statLabel: string;
  telemetryLogs: {
    label: string;
    target: string;
    status: string;
    variant: 'pass' | 'ok' | 'warn' | 'fail';
  }[];
  insight: string;
  specs: { label: string; value: string }[];
  image: string;
  slideDirection: 'left' | 'right';
}

const CHAPTERS: ChapterData[] = [
  {
    id: 'compound-drift',
    index: '01',
    category: 'STEPWISE ACCUMULATION',
    headlineLine1: 'SINGLE-TURN',
    headlineLine2: 'COMPOUND DRIFT',
    subtitles: [
      'ISOLATED BENCHMARKS HIDE REALITY',
      '8 CONSECUTIVE TURNS DROP RELIABILITY TO 66%',
      'CASCADING ERROR PROPAGATION IN PRODUCTION',
    ],
    diagnosticTag: 'REALITY AUDIT // DEGRADATION RISK',
    diagnosticStatus: 'COMPOUND DRIFT DETECTED',
    stat: '0.95⁸ ≈ 66%',
    statLabel: 'Multi-Turn Reliability Baseline across 8-turn pipeline',
    telemetryLogs: [
      { label: 'STEP 01', target: 'fetch_client_ledger()', status: '95.2% [PASS]', variant: 'pass' },
      { label: 'STEP 03', target: 'verify_tax_jurisdiction()', status: '90.1% [OK]', variant: 'ok' },
      { label: 'STEP 06', target: 'calculate_fx_hedging()', status: '78.4% [WARN]', variant: 'warn' },
      { label: 'STEP 08', target: 'commit_settlement_ledger()', status: '66.3% [FAIL]', variant: 'fail' },
    ],
    insight:
      'Standard benchmarks measure one turn in isolation. In production, 8 sequential turns drop overall success to 66%. Evalixa evaluates full multi-turn trajectory execution with deterministic step gates.',
    specs: [
      { label: 'EVAL METHOD', value: 'Trajectory Replay' },
      { label: 'CASCADE RISK', value: 'Exponential' },
      { label: 'EVALIXA GATE', value: 'Stepwise Gates' },
    ],
    image: '/services/reality-01.jpg',
    slideDirection: 'right',
  },
  {
    id: 'synthetic-bias',
    index: '02',
    category: 'DOMAIN DISCONNECT',
    headlineLine1: 'PUBLIC BOARDS',
    headlineLine2: 'ZERO DOMAIN FIT',
    subtitles: [
      'GENERIC TRIVIA & SYNTHETIC PUZZLES',
      'ZERO TEST COVERAGE FOR PRIVATE ENTERPRISE SCHEMAS',
      'MULTI-TENANT AUTHORIZATION BLINDSPOTS',
    ],
    diagnosticTag: 'REALITY AUDIT // SCHEMA MISMATCH',
    diagnosticStatus: 'ENTERPRISE PARITY BREAKDOWN',
    stat: '0% Domain Fit',
    statLabel: 'Public Leaderboard Correlation to Enterprise Schemas',
    telemetryLogs: [
      { label: 'PUBLIC', target: 'Synthetic Coding Leaderboard', status: '92.4% [PASS]', variant: 'pass' },
      { label: 'RUNTIME', target: 'Proprietary SAP / Salesforce State', status: '11.8% [FAIL]', variant: 'fail' },
      { label: 'SECURITY', target: 'Multi-Tenant RBAC Boundary Check', status: 'UNAUTHORIZED LEAK', variant: 'fail' },
      { label: 'PARITY', target: 'Synthetic vs Enterprise Schema Fit', status: '0.00% CORRELATION', variant: 'warn' },
    ],
    insight:
      'High scores on public benchmarks provide zero guarantee inside real enterprise environments. Proprietary database structures, ERP state boundaries, and tenant isolation require tailored private test suites.',
    specs: [
      { label: 'SCHEMA TYPE', value: 'Proprietary ERP/CRM' },
      { label: 'PUBLIC OVERLAP', value: '0.00%' },
      { label: 'EVALIXA GATE', value: 'Domain Harness' },
    ],
    image: '/services/reality-02.jpg',
    slideDirection: 'left',
  },
  {
    id: 'measurement-integrity',
    index: '03',
    category: 'MEASUREMENT COLLAPSE',
    headlineLine1: 'UNCALIBRATED JUDGES',
    headlineLine2: 'HALLUCINATED CONSENSUS',
    subtitles: [
      'SEVERE VERBOSITY & SELF-PREFERENCE BIAS',
      'UNCHECKED LLM-AS-A-JUDGE SCORE DRIFT',
      'TRIPLE-BLIND HUMAN GROUND TRUTH DEFICIT',
    ],
    diagnosticTag: 'REALITY AUDIT // JUDGE VARIANCE',
    diagnosticStatus: 'HALLUCINATED CONSENSUS DETECTED',
    stat: '38% Variance',
    statLabel: 'Uncalibrated Automated Judge Score Drift',
    telemetryLogs: [
      { label: 'BIAS 01', target: 'Self-Preference Index (Model judges self)', status: '+24.6% SKEW', variant: 'fail' },
      { label: 'BIAS 02', target: 'Verbosity Exploitation (Length over logic)', status: '+18.2% GAIN', variant: 'warn' },
      { label: 'BIAS 03', target: 'Position Ordering Bias (A/B swaps)', status: '31.4% DISCORD', variant: 'fail' },
      { label: 'GROUND', target: 'Triple-Blind Certified Domain Human', status: 'CERTIFIED TRUTH', variant: 'pass' },
    ],
    insight:
      'Uncalibrated model judges hallucinate agreement and favor verbose responses. Without expert human calibration and deterministic gates, automated evaluation benchmarks drift into arbitrary noise.',
    specs: [
      { label: 'JUDGE DRIFT', value: '±38% Raw' },
      { label: 'ALIGNMENT', value: 'Triple-Blind' },
      { label: 'EVALIXA GATE', value: 'Meta-Evaluator' },
    ],
    image: '/services/reality-03.jpg',
    slideDirection: 'right',
  },
];

export default function EvaluationRealitiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: Standout GSAP Curtain-Wipe Highlight Animation
      mm.add('(min-width: 1024px)', () => {
        const slides = gsap.utils.toArray<HTMLElement>('.curtain-slide');
        if (slides.length < 3) return;

        // Slide 0 starts fully visible; slides 1 and 2 start clipped out at the bottom
        gsap.set(slides[0], { clipPath: 'inset(0% 0 0 0)' });
        gsap.set(slides.slice(1), { clipPath: 'inset(100% 0 0 0)' });

        // Set initial scale & position for background imagery
        slides.forEach((slide) => {
          const bgImg = slide.querySelector('.slide-bg-img');
          if (bgImg) {
            gsap.set(bgImg, { scale: 1.35, yPercent: 6 });
          }
        });

        // Set initial state for slide 0's headline lines and telemetry card
        const slide0 = slides[0];
        const slide0Lines = slide0.querySelectorAll('.masked-line');
        const slide0Card = slide0.querySelector('.telemetry-card');
        const slide0Bg = slide0.querySelector('.slide-bg-img');
        const slide0Overlay = slide0.querySelector('.slide-overlay');

        const slide1 = slides[1];
        const slide1Lines = slide1.querySelectorAll('.masked-line');
        const slide1Card = slide1.querySelector('.telemetry-card');
        const slide1Bg = slide1.querySelector('.slide-bg-img');
        const slide1Overlay = slide1.querySelector('.slide-overlay');

        const slide2 = slides[2];
        const slide2Lines = slide2.querySelectorAll('.masked-line');
        const slide2Card = slide2.querySelector('.telemetry-card');
        const slide2Bg = slide2.querySelector('.slide-bg-img');

        // Master Scrub Timeline pinned to sectionRef
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=270%',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress;
              if (p < 0.35) {
                setActiveChapterIndex(0);
              } else if (p < 0.7) {
                setActiveChapterIndex(1);
              } else {
                setActiveChapterIndex(2);
              }
            },
          },
        });

        // Chapter 01 reveal as section hits pin
        masterTl
          .fromTo(
            slide0Lines,
            { yPercent: 120, rotate: 2 },
            { yPercent: 0, rotate: 0, duration: 0.8, ease: 'power3.out', stagger: 0.05 },
            0
          )
          .fromTo(
            slide0Card,
            { xPercent: 120, opacity: 0.4 },
            { xPercent: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
            0
          )
          .to(slide0Bg, { scale: 1.15, yPercent: 0, duration: 0.8, ease: 'power2.out' }, 0)

          // Hold Chapter 01
          .to({}, { duration: 0.5 })

          // ==========================================
          // CHAPTER 02 CURTAIN WIPE REVEAL
          // ==========================================
          // Fade/blur Chapter 01 underneath
          .to(slide0Bg, { filter: 'blur(8px)', opacity: 0.2, duration: 0.8 }, 'step1')
          .to(slide0Overlay, { opacity: 0.85, duration: 0.8 }, 'step1')
          .to(slide0Card, { yPercent: 10, opacity: 0.3, duration: 0.8 }, 'step1')

          // Wipe in Chapter 02 from bottom to top
          .to(
            slide1,
            {
              clipPath: 'inset(0% 0 0 0)',
              duration: 1.2,
              ease: 'power2.inOut',
            },
            'step1'
          )
          // Parallax scale on background
          .to(
            slide1Bg,
            {
              scale: 1.12,
              yPercent: 0,
              duration: 1.2,
              ease: 'power2.inOut',
            },
            'step1'
          )
          // Rise masked lines
          .fromTo(
            slide1Lines,
            { yPercent: 120, rotate: 2 },
            { yPercent: 0, rotate: 0, duration: 1.0, ease: 'power3.out', stagger: 0.05 },
            'step1+=0.2'
          )
          // Horizontal slide in from left for card
          .fromTo(
            slide1Card,
            { xPercent: -120, opacity: 0.4 },
            { xPercent: 0, opacity: 1, duration: 1.1, ease: 'power3.out' },
            'step1+=0.15'
          )

          // Hold Chapter 02
          .to({}, { duration: 0.5 })

          // ==========================================
          // CHAPTER 03 CURTAIN WIPE REVEAL
          // ==========================================
          // Fade/blur Chapter 02 underneath
          .to(slide1Bg, { filter: 'blur(8px)', opacity: 0.2, duration: 0.8 }, 'step2')
          .to(slide1Overlay, { opacity: 0.85, duration: 0.8 }, 'step2')
          .to(slide1Card, { yPercent: 10, opacity: 0.3, duration: 0.8 }, 'step2')

          // Wipe in Chapter 03 from bottom to top
          .to(
            slide2,
            {
              clipPath: 'inset(0% 0 0 0)',
              duration: 1.2,
              ease: 'power2.inOut',
            },
            'step2'
          )
          // Parallax scale on background
          .to(
            slide2Bg,
            {
              scale: 1.12,
              yPercent: 0,
              duration: 1.2,
              ease: 'power2.inOut',
            },
            'step2'
          )
          // Rise masked lines
          .fromTo(
            slide2Lines,
            { yPercent: 120, rotate: -2 },
            { yPercent: 0, rotate: 0, duration: 1.0, ease: 'power3.out', stagger: 0.05 },
            'step2+=0.2'
          )
          // Horizontal slide in from right for card
          .fromTo(
            slide2Card,
            { xPercent: 120, opacity: 0.4 },
            { xPercent: 0, opacity: 1, duration: 1.1, ease: 'power3.out' },
            'step2+=0.15'
          )

          // Final hold before unpinning
          .to({}, { duration: 0.6 });
      });

      // Mobile/Tablet Fallback: Natural stacked scrub
      mm.add('(max-width: 1023px)', () => {
        const mobileCards = gsap.utils.toArray<HTMLElement>('.mobile-chapter-block');
        mobileCards.forEach((block) => {
          gsap.fromTo(
            block,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: block,
                start: 'top 85%',
                end: 'center 60%',
                scrub: 0.5,
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
      className="relative w-full bg-black text-white select-none overflow-hidden"
    >
      {/* ========================================================================= */}
      {/* DESKTOP VIEW: PINNED CURTAIN-WIPE NARRATIVE STAGE                        */}
      {/* ========================================================================= */}
      <div className="hidden lg:block relative w-full h-screen overflow-hidden">
        {CHAPTERS.map((item, idx) => {
          const isReversed = item.slideDirection === 'left';

          return (
            <div
              key={item.id}
              className={`curtain-slide absolute inset-0 w-full h-full overflow-hidden bg-black flex flex-col justify-between ${
                idx === 0 ? 'z-10' : idx === 1 ? 'z-20' : 'z-30'
              }`}
            >
              {/* Background Image with Monochromatic Grading & Parallax */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <Image
                  src={item.image}
                  alt={item.headlineLine1}
                  fill
                  priority={idx === 0}
                  className="slide-bg-img object-cover object-center grayscale contrast-125 brightness-75 opacity-55 will-change-transform"
                />
                {/* Monochromatic Dark Film Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/75 to-black/85" />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.85) 90%)',
                  }}
                />
                {/* Chapter Exit Fade Overlay */}
                <div className="slide-overlay absolute inset-0 bg-black opacity-0 pointer-events-none" />
              </div>

              {/* Slide Content Frame */}
              <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col justify-between py-8">
                {/* Top Architectural Header */}
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/15">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                        THE EVALUATION GAP // BENCHMARK REALITY
                      </span>
                      <span className="font-mono text-[10px] text-neutral-400">|</span>
                      <span className="font-mono text-xs uppercase tracking-widest text-neutral-300 font-medium">
                        {item.category}
                      </span>
                    </div>

                    <div className="font-mono text-xs tracking-widest text-neutral-300 font-semibold">
                      [ {item.index} / 03 ]
                    </div>
                  </div>
                </div>

                {/* Central Stage: Masked Typography + Alternating Diagnostic Console */}
                <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
                  {/* Headline & Narrative Column */}
                  <div
                    className={`${
                      isReversed
                        ? 'col-span-6 xl:col-span-7 order-2'
                        : 'col-span-6 xl:col-span-7 order-1'
                    }`}
                  >
                    <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-3">
                      CHAPTER {item.index} // ROOT FAILURE MODE
                    </span>

                    {/* Masked Kinetic Display Typography */}
                    <div className="overflow-hidden">
                      <h2 className="masked-line font-display font-extrabold text-4xl sm:text-6xl xl:text-7xl text-white tracking-tight uppercase leading-[0.95] will-change-transform">
                        {item.headlineLine1}
                      </h2>
                    </div>
                    <div className="overflow-hidden mt-1">
                      <div className="masked-line font-display font-extrabold text-4xl sm:text-6xl xl:text-7xl text-neutral-400 tracking-tight uppercase leading-[0.95] will-change-transform">
                        {item.headlineLine2}
                      </div>
                    </div>

                    {/* Masked Kinetic Subtitle Specs */}
                    <div className="mt-8 space-y-2.5 border-l-2 border-white/20 pl-4">
                      {item.subtitles.map((sub, sIdx) => (
                        <div key={sIdx} className="overflow-hidden">
                          <p className="masked-line font-mono text-xs sm:text-sm text-neutral-300 tracking-wider uppercase font-medium will-change-transform">
                            {sub}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* High-Precision Floating Telemetry Diagnostic Console */}
                  <div
                    className={`${
                      isReversed
                        ? 'col-span-6 xl:col-span-5 order-1'
                        : 'col-span-6 xl:col-span-5 order-2'
                    }`}
                  >
                    <div className="telemetry-card relative w-full rounded-md bg-[#0a0a0c]/90 border border-neutral-700/80 shadow-2xl p-6 sm:p-7 backdrop-blur-xl will-change-transform">
                      {/* Console Header Bar */}
                      <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-5">
                        <div className="flex items-center gap-2">
                          <Terminal className="w-3.5 h-3.5 text-neutral-300" />
                          <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
                            {item.diagnosticTag}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-neutral-300 font-semibold tracking-wider">
                          {item.diagnosticStatus}
                        </span>
                      </div>

                      {/* Primary Diagnostic Metric */}
                      <div className="mb-5">
                        <span className="font-mono text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white block">
                          {item.stat}
                        </span>
                        <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider block mt-1">
                          {item.statLabel}
                        </span>
                      </div>

                      {/* Log Diagnostics Simulator */}
                      <div className="bg-black/90 border border-neutral-800 rounded p-3 mb-5 space-y-1.5 font-mono text-[11px]">
                        {item.telemetryLogs.map((log, lIdx) => (
                          <div
                            key={lIdx}
                            className="flex items-center justify-between text-neutral-300 gap-2"
                          >
                            <span className="text-neutral-400 font-semibold shrink-0">
                              {log.label}
                            </span>
                            <span className="text-neutral-400 truncate">{log.target}</span>
                            <span
                              className={`shrink-0 font-medium ${
                                log.variant === 'fail'
                                  ? 'text-white'
                                  : log.variant === 'warn'
                                  ? 'text-neutral-300'
                                  : 'text-neutral-400'
                              }`}
                            >
                              {log.status}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Explanatory Narrative */}
                      <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed mb-5 font-normal">
                        {item.insight}
                      </p>

                      {/* System Spec Matrix */}
                      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 font-mono text-[10px]">
                        {item.specs.map((spec, spIdx) => (
                          <div key={spIdx}>
                            <span className="text-neutral-400 uppercase block">
                              {spec.label}
                            </span>
                            <span className="text-neutral-200 font-semibold block mt-0.5">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Chapter Progress Bar */}
                <div className="pt-4 border-t border-white/10">
                  <div className="grid grid-cols-3 gap-4">
                    {CHAPTERS.map((c, cIdx) => (
                      <div key={c.id} className="flex flex-col">
                        <div className="flex items-center justify-between mb-1.5 font-mono text-[11px]">
                          <span
                            className={`font-semibold transition-colors duration-300 ${
                              activeChapterIndex === cIdx
                                ? 'text-white'
                                : 'text-neutral-400'
                            }`}
                          >
                            {c.index} // {c.headlineLine1} {c.headlineLine2}
                          </span>
                          <span
                            className={`transition-colors duration-300 ${
                              activeChapterIndex === cIdx
                                ? 'text-neutral-200'
                                : 'text-neutral-400'
                            }`}
                          >
                            {activeChapterIndex === cIdx ? 'ACTIVE' : 'QUEUED'}
                          </span>
                        </div>
                        <div className="w-full h-0.5 bg-neutral-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${
                              activeChapterIndex === cIdx
                                ? 'w-full bg-white'
                                : activeChapterIndex > cIdx
                                ? 'w-full bg-neutral-600'
                                : 'w-0'
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* MOBILE / TABLET VIEW: CLEAN VERTICAL STACKED CHAPTERS                     */}
      {/* ========================================================================= */}
      <div className="lg:hidden relative w-full py-16 px-4 sm:px-6">
        <div className="max-w-xl mx-auto mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-2">
            THE EVALUATION GAP // SYSTEMIC FAILURE MODES
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight uppercase">
            Why Standard AI Benchmarks Fail Production Workflows.
          </h2>
        </div>

        <div className="space-y-12 max-w-xl mx-auto">
          {CHAPTERS.map((item) => (
            <div
              key={item.id}
              className="mobile-chapter-block relative rounded-md bg-[#0a0a0c] border border-neutral-800 overflow-hidden p-6 sm:p-8"
            >
              {/* Background with Original Opacity & Dark Gradient */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <Image
                  src={item.image}
                  alt={item.headlineLine1}
                  fill
                  className="object-cover object-center grayscale contrast-125 opacity-40"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-black/90" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
                    CHAPTER {item.index} // {item.category}
                  </span>
                  <span className="font-mono text-[11px] text-neutral-300 font-bold">
                    [ {item.index} / 03 ]
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-white uppercase tracking-tight mb-2">
                  {item.headlineLine1} {item.headlineLine2}
                </h3>

                <div className="my-5 pt-3 border-t border-white/10">
                  <span className="font-mono text-3xl font-bold text-white block">
                    {item.stat}
                  </span>
                  <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider block mt-1">
                    {item.statLabel}
                  </span>
                </div>

                {/* Log Diagnostics Simulator */}
                <div className="bg-black/90 border border-neutral-800 rounded p-3 mb-5 space-y-1.5 font-mono text-[11px]">
                  {item.telemetryLogs.map((log, lIdx) => (
                    <div
                      key={lIdx}
                      className="flex items-center justify-between text-neutral-300 gap-2"
                    >
                      <span className="text-neutral-400 font-semibold shrink-0">
                        {log.label}
                      </span>
                      <span className="text-neutral-400 truncate">{log.target}</span>
                      <span className="shrink-0 text-white font-medium">{log.status}</span>
                    </div>
                  ))}
                </div>

                <p className="font-sans text-sm text-neutral-300 leading-relaxed mb-6 font-normal">
                  {item.insight}
                </p>

                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 font-mono text-[10px]">
                  {item.specs.map((spec, spIdx) => (
                    <div key={spIdx}>
                      <span className="text-neutral-400 uppercase block">{spec.label}</span>
                      <span className="text-neutral-200 font-semibold block mt-0.5">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
