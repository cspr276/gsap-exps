'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ChapterItem {
  id: string;
  index: string;
  headlineLine1: string;
  headlineLine2: string;
  subtitle: string;
  bigNumber: string;
  numberLabel: string;
  secondaryStat: string;
  secondaryLabel: string;
  trace: string;
  image: string;
}

const CHAPTERS: ChapterItem[] = [
  {
    id: 'compound-drift',
    index: '01',
    headlineLine1: 'SINGLE-TURN',
    headlineLine2: 'COMPOUND DRIFT',
    subtitle:
      '8 sequential tool turns reduce a 95% step rate to 66% compound reliability across production pipelines.',
    bigNumber: '66%',
    numberLabel: 'COMPOUND 8-TURN ACCURACY',
    secondaryStat: '0.95⁸',
    secondaryLabel: 'EXPONENTIAL DECAY BASELINE',
    trace: 'TURN 1 [95%] ─── TURN 4 [81%] ─── TURN 8 [66%]',
    image: '/services/reality-01.jpg',
  },
  {
    id: 'synthetic-bias',
    index: '02',
    headlineLine1: 'PUBLIC BOARDS',
    headlineLine2: 'ZERO DOMAIN FIT',
    subtitle:
      'Generic trivia leaderboards provide zero guarantee for proprietary enterprise schemas and asynchronous state machines.',
    bigNumber: '0%',
    numberLabel: 'ENTERPRISE SCHEMA FIT',
    secondaryStat: '92% vs 12%',
    secondaryLabel: 'SYNTHETIC MMLU VS ENTERPRISE SAP',
    trace: 'PUBLIC BENCHMARK [92%] ─── PRIVATE ERP / RBAC [12%]',
    image: '/services/reality-02.jpg',
  },
  {
    id: 'measurement-integrity',
    index: '03',
    headlineLine1: 'UNCALIBRATED',
    headlineLine2: 'MODEL JUDGES',
    subtitle:
      'Automated LLM judges suffer severe verbosity bias and self-preference drift without certified domain ground truth.',
    bigNumber: '±38%',
    numberLabel: 'UNVALIDATED JUDGE DRIFT',
    secondaryStat: '+25% BIAS',
    secondaryLabel: 'SELF-PREFERENCE SCORE INFLATION',
    trace: 'SELF-PREFERENCE [+25%] ─── VERBOSITY SKEW [+18%]',
    image: '/services/reality-03.jpg',
  },
];

export default function EvaluationRealitiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: Slow, Luxurious Curtain-Wipe with Numbers Gliding Right-to-Left
      mm.add('(min-width: 1024px)', () => {
        const slides = gsap.utils.toArray<HTMLElement>('.curtain-slide');
        if (slides.length < 3) return;

        // Slide 0 starts visible; slides 1 and 2 start clipped at bottom
        gsap.set(slides[0], { clipPath: 'inset(0% 0 0 0)' });
        gsap.set(slides.slice(1), { clipPath: 'inset(100% 0 0 0)' });

        // Background imagery initial subtle zoom
        slides.forEach((slide) => {
          const bgImg = slide.querySelector('.slide-bg-img');
          if (bgImg) {
            gsap.set(bgImg, { scale: 1.3, yPercent: 4 });
          }
        });

        // Slide 0 elements
        const slide0 = slides[0];
        const slide0Lines = slide0.querySelectorAll('.masked-line');
        const slide0Numbers = slide0.querySelector('.numbers-track');
        const slide0Bg = slide0.querySelector('.slide-bg-img');
        const slide0Overlay = slide0.querySelector('.slide-overlay');

        // Slide 1 elements
        const slide1 = slides[1];
        const slide1Lines = slide1.querySelectorAll('.masked-line');
        const slide1Numbers = slide1.querySelector('.numbers-track');
        const slide1Bg = slide1.querySelector('.slide-bg-img');
        const slide1Overlay = slide1.querySelector('.slide-overlay');

        // Slide 2 elements
        const slide2 = slides[2];
        const slide2Lines = slide2.querySelectorAll('.masked-line');
        const slide2Numbers = slide2.querySelector('.numbers-track');
        const slide2Bg = slide2.querySelector('.slide-bg-img');

        // Master Timeline pinned with generous 650vh scroll runway
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=650vh',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        // CHAPTER 01: Numbers slide from right to left as user scrolls
        masterTl
          .fromTo(
            slide0Lines,
            { yPercent: 120, rotate: 2 },
            { yPercent: 0, rotate: 0, duration: 1, ease: 'power3.out', stagger: 0.08 },
            0
          )
          .fromTo(
            slide0Numbers,
            { x: '75vw' },
            { x: '-25vw', ease: 'none', duration: 4 },
            0
          )
          .to(slide0Bg, { scale: 1.1, duration: 3.5, ease: 'power2.out' }, 0)

          // ==========================================
          // TRANSITION: CHAPTER 01 -> CHAPTER 02
          // ==========================================
          .to(slide0Bg, { filter: 'blur(8px)', opacity: 0.15, duration: 1.2 }, 3.5)
          .to(slide0Overlay, { opacity: 0.85, duration: 1.2 }, 3.5)
          // Curtain wipe Slide 1 over Slide 0
          .to(
            slide1,
            {
              clipPath: 'inset(0% 0 0 0)',
              duration: 1.6,
              ease: 'power2.inOut',
            },
            3.5
          )
          .fromTo(
            slide1Lines,
            { yPercent: 120, rotate: 2 },
            { yPercent: 0, rotate: 0, duration: 1.2, ease: 'power3.out', stagger: 0.08 },
            3.8
          )
          // CHAPTER 02: Numbers slide from right to left
          .fromTo(
            slide1Numbers,
            { x: '75vw' },
            { x: '-25vw', ease: 'none', duration: 4 },
            3.8
          )
          .to(slide1Bg, { scale: 1.1, duration: 3.5, ease: 'power2.out' }, 3.8)

          // ==========================================
          // TRANSITION: CHAPTER 02 -> CHAPTER 03
          // ==========================================
          .to(slide1Bg, { filter: 'blur(8px)', opacity: 0.15, duration: 1.2 }, 7.5)
          .to(slide1Overlay, { opacity: 0.85, duration: 1.2 }, 7.5)
          // Curtain wipe Slide 2 over Slide 1
          .to(
            slide2,
            {
              clipPath: 'inset(0% 0 0 0)',
              duration: 1.6,
              ease: 'power2.inOut',
            },
            7.5
          )
          .fromTo(
            slide2Lines,
            { yPercent: 120, rotate: -2 },
            { yPercent: 0, rotate: 0, duration: 1.2, ease: 'power3.out', stagger: 0.08 },
            7.8
          )
          // CHAPTER 03: Numbers slide from right to left
          .fromTo(
            slide2Numbers,
            { x: '75vw' },
            { x: '-25vw', ease: 'none', duration: 4 },
            7.8
          )
          .to(slide2Bg, { scale: 1.1, duration: 3.5, ease: 'power2.out' }, 7.8)

          // Hold Chapter 03 until end
          .to({}, { duration: 1 });
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
      id="evaluation-realities"
      ref={sectionRef}
      className="relative z-20 w-full bg-black text-white select-none overflow-hidden shadow-[0_-30px_90px_rgba(0,0,0,0.95)]"
    >
      {/* ========================================================================= */}
      {/* DESKTOP VIEW: CLEAN AIRY CURTAIN-WIPE WITH HORIZONTAL NUMBERS SLIDE       */}
      {/* ========================================================================= */}
      <div className="hidden lg:block relative w-full h-screen overflow-hidden">
        {CHAPTERS.map((item, idx) => (
          <div
            key={item.id}
            className={`curtain-slide absolute inset-0 w-full h-full overflow-hidden bg-black flex flex-col justify-between py-16 lg:py-20 px-8 sm:px-16 lg:px-24 ${
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
                className="slide-bg-img object-cover object-center grayscale contrast-125 brightness-75 opacity-35 will-change-transform"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/75 to-black/85" />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.85) 90%)',
                }}
              />
              {/* Fade scrim on chapter exit */}
              <div className="slide-overlay absolute inset-0 bg-black opacity-0 pointer-events-none" />
            </div>

            {/* UPPER / MIDDLE AREA: Numbers Thing Sliding from Right to Left */}
            <div className="relative z-10 w-full overflow-hidden my-auto py-4">
              <div className="numbers-track flex items-center gap-12 sm:gap-20 whitespace-nowrap will-change-transform">
                {/* Primary Colossal Stat */}
                <div className="flex items-baseline gap-5">
                  <span className="font-mono text-7xl sm:text-9xl lg:text-[11rem] font-black text-white tracking-tighter leading-none drop-shadow-2xl">
                    {item.bigNumber}
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-neutral-400 uppercase tracking-widest font-semibold">
                    {item.numberLabel}
                  </span>
                </div>

                <div className="h-20 w-px bg-white/20 shrink-0" />

                {/* Secondary Stat Block */}
                <div className="flex flex-col">
                  <span className="font-mono text-4xl sm:text-6xl font-extrabold text-neutral-200 tracking-tight">
                    {item.secondaryStat}
                  </span>
                  <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-widest mt-1 font-semibold">
                    {item.secondaryLabel}
                  </span>
                </div>

                <div className="h-20 w-px bg-white/20 shrink-0" />

                {/* Step Trace Line */}
                <div className="font-mono text-sm text-neutral-300 tracking-wider">
                  {item.trace}
                </div>
              </div>
            </div>

            {/* LOWER AREA: 1-2 Clean Bold Headings & Single Subtitle (Zero attached clutter) */}
            <div className="relative z-10 w-full max-w-5xl">
              <div className="overflow-hidden">
                <h2 className="masked-line font-display font-black text-5xl sm:text-7xl lg:text-8xl text-white uppercase tracking-tight leading-[0.92] will-change-transform">
                  {item.headlineLine1}
                </h2>
              </div>
              <div className="overflow-hidden mt-1.5">
                <div className="masked-line font-display font-black text-5xl sm:text-7xl lg:text-8xl text-neutral-400 uppercase tracking-tight leading-[0.92] will-change-transform">
                  {item.headlineLine2}
                </div>
              </div>
              <p className="font-sans text-base sm:text-xl text-neutral-300 font-normal mt-5 max-w-2xl leading-relaxed">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* MOBILE / TABLET VIEW: CLEAN VERTICAL STACKED CHAPTERS                     */}
      {/* ========================================================================= */}
      <div className="lg:hidden relative w-full py-20 px-6 sm:px-8">
        <div className="space-y-20 max-w-xl mx-auto">
          {CHAPTERS.map((item) => (
            <div
              key={item.id}
              className="mobile-chapter-block relative pb-16 border-b border-white/10 last:border-b-0"
            >
              <div className="my-6">
                <span className="font-mono text-6xl sm:text-7xl font-black text-white block">
                  {item.bigNumber}
                </span>
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block mt-2 font-semibold">
                  {item.numberLabel}
                </span>
              </div>

              <h3 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mb-4 leading-tight">
                {item.headlineLine1} {item.headlineLine2}
              </h3>

              <p className="font-sans text-base text-neutral-300 leading-relaxed mb-6 font-normal">
                {item.subtitle}
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
