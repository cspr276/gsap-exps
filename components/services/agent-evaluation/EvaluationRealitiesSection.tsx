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
  sectionCategory: string;
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
    sectionCategory: 'FAILURE REALITY 01',
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
    sectionCategory: 'FAILURE REALITY 02',
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
    sectionCategory: 'FAILURE REALITY 03',
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
  const ghostContainerRef = useRef<HTMLDivElement>(null);
  const ghostItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const fixedViewportRef = useRef<HTMLDivElement>(null);
  const workItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // =========================================================================
      // DESKTOP: 1:1 REPLICATION OF anims-refer/scrolltrigger-gsap-section
      // =========================================================================
      mm.add('(min-width: 1024px)', () => {
        const workItems = workItemsRef.current.filter((el): el is HTMLDivElement => el !== null);
        const ghostItems = ghostItemsRef.current.filter((el): el is HTMLDivElement => el !== null);
        const ghostContainer = ghostContainerRef.current;
        const fixedViewport = fixedViewportRef.current;

        if (workItems.length < 3 || ghostItems.length < 3 || !ghostContainer || !fixedViewport) {
          return;
        }

        // 1. Initial setup (reference script.js line 30)
        workItems.forEach((element) => {
          gsap.set(element, {
            clipPath: 'inset(100% 0 0% 0)',
          });
        });

        // Hide fixed viewport when scrolled past ghost track
        ScrollTrigger.create({
          trigger: ghostContainer,
          start: 'bottom top',
          onEnter: () => gsap.set(fixedViewport, { autoAlpha: 0 }),
          onLeaveBack: () => gsap.set(fixedViewport, { autoAlpha: 1 }),
        });

        // 2. Setup animations for each work item (reference script.js lines 37-126)
        workItems.forEach((element, index) => {
          const ghost = ghostItems[index];
          if (!ghost) return;

          const lines = element.querySelectorAll('[data-line]');
          const workImage = element.querySelector('[data-work="image"]');
          const numbersTrack = element.querySelector('[data-work="numbers"]');
          const overlay = element.querySelector('[data-work="item-overlay"]');

          // Set initial image scale (reference line 46)
          if (workImage) {
            gsap.set(workImage, {
              scale: 1.4,
              yPercent: 10,
            });
          }

          // Main reveal animations (curtain wipe over previous section / hero)
          // Reference line 51: start: "top bottom", end: "+75vh top", scrub: true
          const stStarting = {
            trigger: ghost,
            scrub: true,
            start: 'top bottom',
            end: '+75vh top',
          };

          gsap.to(element, {
            clipPath: 'inset(0% 0 0 0)',
            scrollTrigger: stStarting,
          });

          if (workImage) {
            gsap.to(workImage, {
              yPercent: 10,
              scale: 1.2,
              scrollTrigger: stStarting,
            });
          }

          // Text lines rise animation (reference line 67)
          if (lines.length > 0) {
            gsap.from(lines, {
              yPercent: 125,
              rotate: 2.5,
              ease: 'power2.inOut',
              duration: 1.25,
              scrollTrigger: {
                trigger: ghost,
                start: 'top 75%',
                toggleActions: 'play reverse restart reverse',
              },
            });
          }

          // Background image blur effect (reference line 79)
          if (workImage) {
            gsap.to(workImage, {
              filter: 'blur(10px)',
              opacity: 0.25,
              ease: 'power2.inOut',
              scrollTrigger: {
                trigger: ghost,
                scrub: true,
                start: '0 top',
                end: '35% top',
              },
            });
          }

          // Numbers container slide in from right to left (reference line 91)
          if (numbersTrack) {
            gsap.from(numbersTrack, {
              x: '100vw',
              scrollTrigger: {
                trigger: ghost,
                scrub: true,
                start: '0 top',
                end: '65% top',
                onLeave: () => {
                  if (overlay) {
                    gsap.set(overlay, {
                      display: 'flex',
                      opacity: 0,
                    });
                  }
                },
              },
            });
          }

          // Final animation / exit transition (reference line 107)
          const stFinal = {
            trigger: ghost,
            scrub: true,
            start: '105% bottom',
            toggleActions: 'play reverse play reverse',
          };

          if (overlay) {
            gsap.fromTo(
              overlay,
              { opacity: 0 },
              {
                opacity: 0.9,
                scrollTrigger: stFinal,
              }
            );
          }

          if (numbersTrack) {
            gsap.to(numbersTrack, {
              yPercent: 15,
              scrollTrigger: stFinal,
            });
          }

          gsap.to(element, {
            filter: 'blur(1px)',
            scrollTrigger: stFinal,
          });
        });
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
      className="relative z-10 w-full bg-black text-white select-none"
    >
      {/* ========================================================================= */}
      {/* DESKTOP GHOST TRACK CONTAINER (3 items x 300vh = 900vh natural scroll runway) */}
      {/* ========================================================================= */}
      <div
        ref={ghostContainerRef}
        className="ghost_work-container hidden lg:block relative w-full pointer-events-none"
      >
        {CHAPTERS.map((item, idx) => (
          <div
            key={`ghost-${item.id}`}
            ref={(el) => {
              ghostItemsRef.current[idx] = el;
            }}
            className="ghost_work-item w-full h-[300vh]"
          />
        ))}
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP FIXED VIEWPORT (Holds the 3 work items fixed at top-0 left-0)     */}
      {/* ========================================================================= */}
      <div
        ref={fixedViewportRef}
        className="fixed-work-viewport hidden lg:block fixed inset-0 w-full h-screen pointer-events-none z-20 overflow-hidden"
      >
        {CHAPTERS.map((item, idx) => (
          <div
            key={`work-item-${item.id}`}
            ref={(el) => {
              workItemsRef.current[idx] = el;
            }}
            data-work="item"
            className="work_item absolute inset-0 w-full h-screen bg-black flex flex-col justify-between py-10 px-8 sm:px-16 lg:px-24 overflow-hidden pointer-events-none"
            style={{
              zIndex: 10 + idx * 10,
              clipPath: 'inset(100% 0 0% 0)',
            }}
          >
            {/* Background Image Wrapper */}
            <div className="work_image-wrapper absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <Image
                data-work="image"
                src={item.image}
                alt={item.headlineLine1}
                fill
                priority={idx === 0}
                className="work_image object-cover object-center grayscale contrast-125 brightness-75 will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/85" />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.85) 90%)',
                }}
              />
            </div>

            {/* Top Bar: Section Context Kicker (Small, elegant, monospace - identifies section) */}
            <div className="relative z-10 w-full flex items-center justify-between pb-6 border-b border-white/10 text-xs font-mono tracking-widest text-neutral-400">
              <div className="flex items-center gap-3">
                <span className="text-white font-semibold tracking-wider">
                  THE EVALUATION GAP
                </span>
                <span className="text-neutral-600">//</span>
                <span className="text-neutral-400">{item.sectionCategory}</span>
              </div>
              <div className="text-neutral-400 font-mono tracking-widest">
                [ {item.index} / 03 ]
              </div>
            </div>

            {/* Middle: Kinetic Numbers Track (Glides right to left across 195vh scroll) */}
            <div
              data-work="numbers"
              className="work_video-wrapper relative z-10 my-auto py-6 will-change-transform overflow-visible"
            >
              <div className="flex items-center gap-12 sm:gap-16 lg:gap-20 whitespace-nowrap">
                {/* Colossal Number */}
                <div className="flex flex-col">
                  <span className="font-mono text-7xl sm:text-9xl lg:text-[11rem] font-black text-white tracking-tighter leading-none drop-shadow-2xl">
                    {item.bigNumber}
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-neutral-400 uppercase tracking-widest font-semibold mt-3">
                    {item.numberLabel}
                  </span>
                </div>

                {/* Hairline Divider */}
                <div className="h-28 w-px bg-white/20 shrink-0" />

                {/* Secondary Stat */}
                <div className="flex flex-col">
                  <span className="font-mono text-4xl sm:text-6xl font-extrabold text-neutral-200 tracking-tight">
                    {item.secondaryStat}
                  </span>
                  <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest font-semibold mt-2">
                    {item.secondaryLabel}
                  </span>
                </div>

                {/* Hairline Divider */}
                <div className="h-28 w-px bg-white/20 shrink-0" />

                {/* Execution Decay Path Trace */}
                <div className="flex flex-col">
                  <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-2 font-semibold">
                    BENCHMARK EXECUTION PATH
                  </span>
                  <div className="font-mono text-sm sm:text-base text-neutral-300 tracking-wider">
                    {item.trace}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom: 1-2 Clean Bold Headings & Single Thesis Sentence */}
            <div className="relative z-10 w-full max-w-5xl">
              <div className="line-wrapper overflow-hidden">
                <h2
                  data-line
                  className="line font-display font-black text-5xl sm:text-7xl lg:text-8xl text-white uppercase tracking-tight leading-[0.92] will-change-transform"
                >
                  {item.headlineLine1}
                </h2>
              </div>
              <div className="line-wrapper overflow-hidden mt-1.5">
                <div
                  data-line
                  className="line font-display font-black text-5xl sm:text-7xl lg:text-8xl text-neutral-400 uppercase tracking-tight leading-[0.92] will-change-transform"
                >
                  {item.headlineLine2}
                </div>
              </div>
              <div className="line-wrapper overflow-hidden mt-5">
                <p
                  data-line
                  className="line font-sans text-base sm:text-xl text-neutral-300 font-normal max-w-2xl leading-relaxed will-change-transform"
                >
                  {item.subtitle}
                </p>
              </div>
            </div>

            {/* Exit Scrim Overlay (darkens slide when next slide wipes over) */}
            <div
              data-work="item-overlay"
              className="work_item-overlay absolute inset-0 bg-black pointer-events-none z-20 opacity-0"
            />
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* MOBILE / TABLET VIEW: CLEAN VERTICAL STACKED CHAPTERS                     */}
      {/* ========================================================================= */}
      <div className="lg:hidden relative z-10 w-full py-20 px-6 sm:px-8">
        <div className="space-y-20 max-w-xl mx-auto">
          {CHAPTERS.map((item) => (
            <div
              key={item.id}
              className="mobile-chapter-block relative pb-16 border-b border-white/10 last:border-b-0"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono tracking-widest text-neutral-400 mb-6">
                <span>THE EVALUATION GAP</span>
                <span>[ {item.index} / 03 ]</span>
              </div>

              <div className="my-6">
                <span className="font-mono text-6xl sm:text-7xl font-black text-white block">
                  {item.bigNumber}
                </span>
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block mt-2 font-semibold">
                  {item.numberLabel}
                </span>
              </div>

              <h3 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mb-2 leading-tight">
                {item.headlineLine1} <br />
                <span className="text-neutral-400">{item.headlineLine2}</span>
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
