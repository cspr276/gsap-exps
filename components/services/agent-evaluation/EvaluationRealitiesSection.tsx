'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ChapterItem {
  id: string;
  index: string;
  category: string;
  headlineLine1: string;
  headlineLine2: string;
  thesis: string;
  stat: string;
  statLabel: string;
  trace: string;
  image: string;
}

const CHAPTERS: ChapterItem[] = [
  {
    id: 'compound-drift',
    index: '01',
    category: 'STEPWISE ACCUMULATION',
    headlineLine1: 'SINGLE-TURN',
    headlineLine2: 'COMPOUND DRIFT',
    thesis:
      '8 sequential tool calls reduce a 95% step rate to roughly 66% compound reliability across production pipelines.',
    stat: '0.95⁸ ≈ 66%',
    statLabel: 'MULTI-TURN COMPOUND ACCURACY',
    trace: 'TURN 1 (95%) ─── TURN 4 (81%) ─── TURN 8 (66%)',
    image: '/services/reality-01.jpg',
  },
  {
    id: 'synthetic-bias',
    index: '02',
    category: 'DOMAIN DISCONNECT',
    headlineLine1: 'PUBLIC BOARDS',
    headlineLine2: 'ZERO DOMAIN FIT',
    thesis:
      'Generic trivia leaderboards provide zero guarantee for proprietary enterprise schemas, state machines, and RBAC boundaries.',
    stat: '0%',
    statLabel: 'ENTERPRISE SCHEMA CORRELATION',
    trace: 'SYNTHETIC MMLU (92%) ─── SAP / SALESFORCE ERP (12%)',
    image: '/services/reality-02.jpg',
  },
  {
    id: 'measurement-integrity',
    index: '03',
    category: 'MEASUREMENT COLLAPSE',
    headlineLine1: 'UNCALIBRATED',
    headlineLine2: 'MODEL JUDGES',
    thesis:
      'Automated LLM judges suffer severe verbosity bias and self-preference drift without certified domain ground truth.',
    stat: '±38%',
    statLabel: 'UNVALIDATED JUDGE SCORE DRIFT',
    trace: 'SELF-PREFERENCE (+25%) ─── VERBOSITY SKEW (+18%)',
    image: '/services/reality-03.jpg',
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
            gsap.set(bgImg, { scale: 1.3, yPercent: 4 });
          }
        });

        const slide0 = slides[0];
        const slide0Lines = slide0.querySelectorAll('.masked-line');
        const slide0Metric = slide0.querySelector('.metric-block');
        const slide0Bg = slide0.querySelector('.slide-bg-img');
        const slide0Overlay = slide0.querySelector('.slide-overlay');

        const slide1 = slides[1];
        const slide1Lines = slide1.querySelectorAll('.masked-line');
        const slide1Metric = slide1.querySelector('.metric-block');
        const slide1Bg = slide1.querySelector('.slide-bg-img');
        const slide1Overlay = slide1.querySelector('.slide-overlay');

        const slide2 = slides[2];
        const slide2Lines = slide2.querySelectorAll('.masked-line');
        const slide2Metric = slide2.querySelector('.metric-block');
        const slide2Bg = slide2.querySelector('.slide-bg-img');

        // Master Scrub Timeline pinned to sectionRef
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=240%',
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

        // Chapter 01 reveal as section hits top
        masterTl
          .fromTo(
            slide0Lines,
            { yPercent: 120, rotate: 2 },
            { yPercent: 0, rotate: 0, duration: 0.8, ease: 'power3.out', stagger: 0.05 },
            0
          )
          .fromTo(
            slide0Metric,
            { y: 40, opacity: 0.3 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
            0
          )
          .to(slide0Bg, { scale: 1.12, yPercent: 0, duration: 0.8, ease: 'power2.out' }, 0)

          // Hold Chapter 01
          .to({}, { duration: 0.5 })

          // ==========================================
          // CHAPTER 02 CURTAIN WIPE REVEAL
          // ==========================================
          .to(slide0Bg, { filter: 'blur(8px)', opacity: 0.2, duration: 0.8 }, 'step1')
          .to(slide0Overlay, { opacity: 0.85, duration: 0.8 }, 'step1')
          .to(slide0Metric, { y: -20, opacity: 0.2, duration: 0.8 }, 'step1')

          .to(
            slide1,
            {
              clipPath: 'inset(0% 0 0 0)',
              duration: 1.2,
              ease: 'power2.inOut',
            },
            'step1'
          )
          .to(
            slide1Bg,
            {
              scale: 1.1,
              yPercent: 0,
              duration: 1.2,
              ease: 'power2.inOut',
            },
            'step1'
          )
          .fromTo(
            slide1Lines,
            { yPercent: 120, rotate: 2 },
            { yPercent: 0, rotate: 0, duration: 1.0, ease: 'power3.out', stagger: 0.05 },
            'step1+=0.2'
          )
          .fromTo(
            slide1Metric,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out' },
            'step1+=0.2'
          )

          // Hold Chapter 02
          .to({}, { duration: 0.5 })

          // ==========================================
          // CHAPTER 03 CURTAIN WIPE REVEAL
          // ==========================================
          .to(slide1Bg, { filter: 'blur(8px)', opacity: 0.2, duration: 0.8 }, 'step2')
          .to(slide1Overlay, { opacity: 0.85, duration: 0.8 }, 'step2')
          .to(slide1Metric, { y: -20, opacity: 0.2, duration: 0.8 }, 'step2')

          .to(
            slide2,
            {
              clipPath: 'inset(0% 0 0 0)',
              duration: 1.2,
              ease: 'power2.inOut',
            },
            'step2'
          )
          .to(
            slide2Bg,
            {
              scale: 1.1,
              yPercent: 0,
              duration: 1.2,
              ease: 'power2.inOut',
            },
            'step2'
          )
          .fromTo(
            slide2Lines,
            { yPercent: 120, rotate: -2 },
            { yPercent: 0, rotate: 0, duration: 1.0, ease: 'power3.out', stagger: 0.05 },
            'step2+=0.2'
          )
          .fromTo(
            slide2Metric,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out' },
            'step2+=0.2'
          )

          // Final hold before unpinning
          .to({}, { duration: 0.6 });
      });

      // Mobile/Tablet Fallback: Natural stacked scrub
      mm.add('(max-width: 1023px)', () => {
        const mobileBlocks = gsap.utils.toArray<HTMLElement>('.mobile-chapter-block');
        mobileBlocks.forEach((block) => {
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
      className="relative z-10 w-full bg-black text-white select-none overflow-hidden shadow-[0_-30px_90px_rgba(0,0,0,0.95)]"
    >
      {/* ========================================================================= */}
      {/* DESKTOP VIEW: PINNED CURTAIN-WIPE STAGE (VAST BREATHING ROOM, ZERO CARDS)  */}
      {/* ========================================================================= */}
      <div className="hidden lg:block relative w-full h-screen overflow-hidden">
        {CHAPTERS.map((item, idx) => (
          <div
            key={item.id}
            className={`curtain-slide absolute inset-0 w-full h-full overflow-hidden bg-black flex flex-col justify-between py-10 lg:py-14 px-6 sm:px-12 lg:px-20 ${
              idx === 0 ? 'z-10' : idx === 1 ? 'z-20' : 'z-30'
            }`}
          >
            {/* Background Image with Monochromatic Dark Film */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <Image
                src={item.image}
                alt={item.headlineLine1}
                fill
                priority={idx === 0}
                className="slide-bg-img object-cover object-center grayscale contrast-125 brightness-75 opacity-40 will-change-transform"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-black/90" />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.85) 90%)',
                }}
              />
              {/* Chapter Exit Fade Scrim */}
              <div className="slide-overlay absolute inset-0 bg-black opacity-0 pointer-events-none" />
            </div>

            {/* Header Line */}
            <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                  THE EVALUATION GAP // BENCHMARK REALITY
                </span>
                <span className="font-mono text-[10px] text-neutral-600">/</span>
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-300 font-medium">
                  {item.category}
                </span>
              </div>

              <div className="font-mono text-xs tracking-widest text-neutral-300 font-semibold">
                [ {item.index} / 03 ]
              </div>
            </div>

            {/* Central Stage: Pure Typographic Statement with Vast Breathing Space */}
            <div className="relative z-10 w-full max-w-7xl mx-auto my-auto py-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                {/* Display Headline Column */}
                <div className="lg:col-span-7">
                  <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-4">
                    CHAPTER {item.index} // ROOT FAILURE MODE
                  </span>

                  {/* Masked Kinetic Display Typography */}
                  <div className="overflow-hidden">
                    <h2 className="masked-line font-display font-extrabold text-4xl sm:text-6xl xl:text-7xl 2xl:text-8xl text-white tracking-tight uppercase leading-[0.92] will-change-transform">
                      {item.headlineLine1}
                    </h2>
                  </div>
                  <div className="overflow-hidden mt-1">
                    <div className="masked-line font-display font-extrabold text-4xl sm:text-6xl xl:text-7xl 2xl:text-8xl text-neutral-400 tracking-tight uppercase leading-[0.92] will-change-transform">
                      {item.headlineLine2}
                    </div>
                  </div>

                  {/* Single Razor-Sharp Thesis Statement */}
                  <p className="font-sans text-base sm:text-lg lg:text-xl text-neutral-300 font-normal mt-8 max-w-xl leading-relaxed">
                    {item.thesis}
                  </p>
                </div>

                {/* Stark Colossal Metric Column (Floating in Open Space - Zero Card Box!) */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="metric-block will-change-transform">
                    <span className="font-mono text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter text-white block leading-none drop-shadow-2xl">
                      {item.stat}
                    </span>
                    <span className="font-mono text-xs sm:text-sm text-neutral-400 uppercase tracking-widest block mt-4 font-semibold">
                      {item.statLabel}
                    </span>

                    {/* Minimalist Monochromatic Trace Line */}
                    <div className="mt-8 pt-6 border-t border-white/10">
                      <span className="font-mono text-[11px] sm:text-xs text-neutral-300 tracking-wider block">
                        {item.trace}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Progress Bar */}
            <div className="relative z-10 w-full max-w-7xl mx-auto pt-4 border-t border-white/10">
              <div className="grid grid-cols-3 gap-6 sm:gap-10">
                {CHAPTERS.map((c, cIdx) => (
                  <div key={c.id} className="flex flex-col">
                    <div className="flex items-center justify-between mb-2 font-mono text-[11px]">
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
        ))}
      </div>

      {/* ========================================================================= */}
      {/* MOBILE / TABLET VIEW: CLEAN VERTICAL STACKED CHAPTERS                     */}
      {/* ========================================================================= */}
      <div className="lg:hidden relative w-full py-20 px-6 sm:px-8">
        <div className="max-w-xl mx-auto mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-3">
            THE EVALUATION GAP // SYSTEMIC FAILURE MODES
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight uppercase leading-tight">
            Why Standard AI Benchmarks Fail Production Workflows.
          </h2>
        </div>

        <div className="space-y-16 max-w-xl mx-auto">
          {CHAPTERS.map((item) => (
            <div
              key={item.id}
              className="mobile-chapter-block relative pb-12 border-b border-white/10 last:border-b-0"
            >
              <div className="flex items-center justify-between pb-3 mb-4 font-mono text-xs text-neutral-400">
                <span>CHAPTER {item.index} // {item.category}</span>
                <span>[ {item.index} / 03 ]</span>
              </div>

              <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight mb-4 leading-tight">
                {item.headlineLine1} {item.headlineLine2}
              </h3>

              <div className="my-6">
                <span className="font-mono text-5xl sm:text-6xl font-bold text-white block">
                  {item.stat}
                </span>
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block mt-2 font-semibold">
                  {item.statLabel}
                </span>
              </div>

              <p className="font-sans text-base text-neutral-300 leading-relaxed mb-6 font-normal">
                {item.thesis}
              </p>

              <div className="pt-4 border-t border-white/10 font-mono text-xs text-neutral-400 tracking-wider">
                {item.trace}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
