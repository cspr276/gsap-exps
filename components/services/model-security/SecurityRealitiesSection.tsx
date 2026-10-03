'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ExecutionStep {
  label: string;
  value: string;
  isTerminal?: boolean;
}

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
  traceTitle: string;
  traceSteps: ExecutionStep[];
  image: string;
}

const CHAPTERS: ChapterItem[] = [
  {
    id: 'indirect-injection',
    index: '01',
    sectionCategory: 'FAILURE REALITY 01',
    headlineLine1: 'INDIRECT PROMPT',
    headlineLine2: 'INJECTION ESCAPES',
    subtitle:
      'Untrusted inputs embedded in retrieved documents, PDFs, or external web context bypass perimeter filters and execute in agent runtime.',
    bigNumber: '0%',
    numberLabel: 'PERIMETER FILTER VISIBILITY',
    secondaryStat: '100% SHARED',
    secondaryLabel: 'DATA & INSTRUCTION CHANNEL',
    traceTitle: 'INDIRECT EXPLOIT CHAIN',
    traceSteps: [
      { label: 'INGESTION', value: 'UNTRUSTED PDF' },
      { label: 'RAG CHUNK', value: 'TOKEN STREAM' },
      { label: 'EXPLOIT', value: 'SYSTEM HIJACK', isTerminal: true },
    ],
    image: '/services/reality-01.jpg',
  },
  {
    id: 'excessive-agency',
    index: '02',
    sectionCategory: 'FAILURE REALITY 02',
    headlineLine1: 'OVER-PRIVILEGED',
    headlineLine2: 'TOOL BLAST RADIUS',
    subtitle:
      'Unbounded tool credentials and permissive egress turn a single prompt injection into catastrophic database corruption and data exfiltration.',
    bigNumber: '3.8×',
    numberLabel: 'EXCESSIVE RUNTIME PRIVILEGE',
    secondaryStat: '0 GATES',
    secondaryLabel: 'INTERMEDIATE MUTATION CONFIRMATION',
    traceTitle: 'LATERAL MOVEMENT TRACE',
    traceSteps: [
      { label: 'INJECTION', value: 'PAYLOAD' },
      { label: 'SQL ACCESS', value: 'UNRESTRICTED' },
      { label: 'EGRESS', value: 'EXFILTRATED', isTerminal: true },
    ],
    image: '/services/reality-02.jpg',
  },
  {
    id: 'system-prompt-brittleness',
    index: '03',
    sectionCategory: 'FAILURE REALITY 03',
    headlineLine1: 'SYSTEM PROMPTS',
    headlineLine2: 'ARE NOT BOUNDARIES',
    subtitle:
      'Natural language instructions compete on equal footing with attacker directives, collapsing under persona grooming and delimiter shifts.',
    bigNumber: '0',
    numberLabel: 'ARCHITECTURAL ISOLATION GUARANTEE',
    secondaryStat: '88% BYPASS',
    secondaryLabel: 'MULTI-TURN PERSONA GROOMING',
    traceTitle: 'DELIMITER COLLAPSE SKEW',
    traceSteps: [
      { label: 'GUARD PROMPT', value: 'STANDBY' },
      { label: 'DELIMITER SHIFT', value: 'TRIGGERED' },
      { label: 'BOUNDARY BREAK', value: 'JAILBREAK', isTerminal: true },
    ],
    image: '/services/reality-03.jpg',
  },
];

export default function SecurityRealitiesSection() {
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

        // 1. Initial setup
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

        // 2. Setup animations for each work item
        workItems.forEach((element, index) => {
          const ghost = ghostItems[index];
          if (!ghost) return;

          const lines = element.querySelectorAll('[data-line]');
          const workImage = element.querySelector('[data-work="image"]');
          const numbersTrack = element.querySelector('[data-work="numbers"]');
          const overlay = element.querySelector('[data-work="item-overlay"]');

          if (workImage) {
            gsap.set(workImage, {
              scale: 1.4,
              yPercent: 10,
            });
          }

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
      id="security-realities"
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
            className="work_item absolute inset-0 w-full h-screen bg-black flex flex-col justify-between py-8 sm:py-10 px-6 sm:px-10 lg:px-14 xl:px-16 overflow-hidden pointer-events-none"
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

            {/* Top Bar: Section Context Kicker */}
            <div className="relative z-10 w-full flex items-center justify-between pb-5 border-b border-white/10 text-xs font-mono tracking-widest text-neutral-400">
              <div className="flex items-center gap-3">
                <span className="text-white font-semibold tracking-wider">
                  THE ATTACK SURFACE
                </span>
                <span className="text-neutral-600">//</span>
                <span className="text-neutral-400">{item.sectionCategory}</span>
              </div>
              <div className="text-neutral-400 font-mono tracking-widest">
                [ {item.index} / 03 ]
              </div>
            </div>

            {/* Middle: Kinetic Numbers Track */}
            <div
              data-work="numbers"
              className="work_video-wrapper relative z-10 my-auto py-4 will-change-transform overflow-visible"
            >
              <div className="flex items-center gap-6 sm:gap-8 lg:gap-10 xl:gap-12 whitespace-nowrap">
                {/* Colossal Number */}
                <div className="flex flex-col">
                  <span className="font-mono text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-white tracking-tighter leading-none drop-shadow-2xl">
                    {item.bigNumber}
                  </span>
                  <span className="font-mono text-[11px] sm:text-xs text-neutral-400 uppercase tracking-widest font-semibold mt-2.5">
                    {item.numberLabel}
                  </span>
                </div>

                {/* Hairline Divider */}
                <div className="h-16 lg:h-20 w-px bg-white/20 shrink-0" />

                {/* Secondary Stat */}
                <div className="flex flex-col">
                  <span className="font-mono text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-neutral-200 tracking-tight">
                    {item.secondaryStat}
                  </span>
                  <span className="font-mono text-[11px] sm:text-xs text-neutral-400 uppercase tracking-widest font-semibold mt-2">
                    {item.secondaryLabel}
                  </span>
                </div>

                {/* Hairline Divider */}
                <div className="h-16 lg:h-20 w-px bg-white/20 shrink-0" />

                {/* Execution Steps */}
                <div className="flex flex-col justify-center">
                  <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-400 mb-2 font-semibold">
                    {item.traceTitle}
                  </span>
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    {item.traceSteps.map((step, sIdx) => (
                      <React.Fragment key={step.label}>
                        <div
                          className={`flex items-center gap-2 px-2.5 py-1.5 rounded border text-xs font-mono ${
                            step.isTerminal
                              ? 'bg-rose-500/10 border-rose-500/30 text-rose-200'
                              : 'bg-white/[0.05] border-white/15 text-neutral-200'
                          }`}
                        >
                          <span className="text-[10px] text-neutral-400 tracking-wider uppercase font-medium">
                            {step.label}
                          </span>
                          <span className="font-bold text-white">
                            {step.value}
                          </span>
                        </div>
                        {sIdx < item.traceSteps.length - 1 && (
                          <ArrowRight className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom: Clean Bold Headings */}
            <div className="relative z-10 w-full max-w-5xl">
              <div className="line-wrapper overflow-hidden">
                <h2
                  data-line
                  className="line font-display font-black text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-white uppercase tracking-tight leading-[0.92] will-change-transform"
                >
                  {item.headlineLine1}
                </h2>
              </div>
              <div className="line-wrapper overflow-hidden mt-1.5">
                <div
                  data-line
                  className="line font-display font-black text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-neutral-400 uppercase tracking-tight leading-[0.92] will-change-transform"
                >
                  {item.headlineLine2}
                </div>
              </div>
              <div className="line-wrapper overflow-hidden mt-4">
                <p
                  data-line
                  className="line font-sans text-sm sm:text-lg text-neutral-300 font-normal max-w-2xl leading-relaxed will-change-transform"
                >
                  {item.subtitle}
                </p>
              </div>
            </div>

            {/* Exit Scrim Overlay */}
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
                <span>THE ATTACK SURFACE</span>
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

              <div className="pt-4 border-t border-white/10">
                <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest font-semibold block mb-2">
                  {item.traceTitle}
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  {item.traceSteps.map((step, sIdx) => (
                    <React.Fragment key={step.label}>
                      <div
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs font-mono ${
                          step.isTerminal
                            ? 'bg-rose-500/10 border-rose-500/30 text-rose-200'
                            : 'bg-white/[0.05] border-white/15 text-neutral-200'
                        }`}
                      >
                        <span className="text-[10px] text-neutral-400 tracking-wider uppercase">
                          {step.label}
                        </span>
                        <span className="font-bold text-white">
                          {step.value}
                        </span>
                      </div>
                      {sIdx < item.traceSteps.length - 1 && (
                        <ArrowRight className="w-3 h-3 text-neutral-500 shrink-0" />
                      )}
                    </React.Fragment>
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
