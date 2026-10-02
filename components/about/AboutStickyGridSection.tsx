'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, ShieldCheck, Users, Lock, ChevronRight } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface LabSlide {
  id: string;
  code: string;
  title: string;
  tagline: string;
  desc: string;
  image: string;
  hud: { label: string; value: string }[];
  icon: React.ElementType;
}

const LAB_SLIDES: LabSlide[] = [
  {
    id: '01',
    code: 'LAB_ENV // SANDBOX_01',
    title: 'The Adversarial Simulation Sandbox',
    tagline: 'HARDWARE-ISOLATED EXECUTION ENCLAVE',
    desc: 'Autonomous frontier agents are subjected to continuous prompt injection, multi-turn privilege escalation, and tool-call poisoning within strictly virtualized execution environments with zero escape potential.',
    image: '/services/reality-01.jpg',
    hud: [
      { label: 'ISOLATION', value: 'WASM Virtualized' },
      { label: 'ESCAPE RATE', value: '0.000% Verified' },
      { label: 'DETECTION', value: '< 12ms SLA' },
    ],
    icon: ShieldCheck,
  },
  {
    id: '02',
    code: 'LAB_ENV // CALIBRATION_02',
    title: 'The Psychometric Calibration Chamber',
    tagline: 'TRIPLE-BLIND DOMAIN EXPERT ADJUDICATION',
    desc: 'Over 1,200 credentialed physicians, attorneys, and financial analysts score reasoning traces using mathematical inter-annotator statistical agreement, eliminating subjective vibes and hallucinating LLM-judge bias.',
    image: '/cards/card_04.jpg',
    hud: [
      { label: 'PANEL SIZE', value: '1,200+ Specialists' },
      { label: 'AGREEMENT', value: 'Krippendorff α = 0.94' },
      { label: 'METHOD', value: 'Triple-Blind' },
    ],
    icon: Users,
  },
  {
    id: '03',
    code: 'LAB_ENV // LEDGER_03',
    title: 'The Cryptographic Trace Ledger',
    tagline: 'IMMUTABLE AUDITABILITY & ROOT-CAUSE TRIAGE',
    desc: 'Seed-locked execution snapshots, raw tool calls, and cryptographic hash ledgers record every decision trace for rapid regression triage, enterprise compliance, and post-incident forensic replay.',
    image: '/services/reality-02.jpg',
    hud: [
      { label: 'DETERMINISM', value: 'Seed-Locked' },
      { label: 'TRIAGE SLA', value: '< 24hr Root Cause' },
      { label: 'LEDGER', value: 'SHA-256 Provenance' },
    ],
    icon: Lock,
  },
];

export default function AboutStickyGridSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeSlide, setActiveSlide] = useState<number>(0);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!section || !stage) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const slides = slideRefs.current.filter(Boolean) as HTMLDivElement[];
        const images = imageRefs.current.filter(Boolean) as HTMLDivElement[];

        // Initial states: Slide 0 is full-bleed, Slide 1 and 2 clipped at bottom
        gsap.set(slides[0], { clipPath: 'inset(0% 0% 0% 0%)' });
        gsap.set([slides[1], slides[2]], { clipPath: 'inset(100% 0% 0% 0%)' });
        gsap.set(images, { scale: 1.15 });

        const tl = gsap.timeline({
          scrollTrigger: {
            id: 'labs-cinematic-showcase',
            trigger: section,
            start: 'top top',
            end: '+=2600',
            pin: true,
            scrub: 0.9,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              if (progress < 0.38) {
                setActiveSlide(0);
              } else if (progress < 0.72) {
                setActiveSlide(1);
              } else {
                setActiveSlide(2);
              }
            },
          },
        });

        // Transition 1: Slide 1 unveils over Slide 0
        tl.to(
          slides[1],
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'power2.inOut',
            duration: 1.2,
          },
          'slide-1'
        );
        tl.to(
          images[1],
          {
            scale: 1.0,
            ease: 'power1.out',
            duration: 1.2,
          },
          'slide-1'
        );
        tl.to(
          images[0],
          {
            scale: 1.05,
            filter: 'brightness(0.35)',
            duration: 1.2,
          },
          'slide-1'
        );

        // Transition 2: Slide 2 unveils over Slide 1
        tl.to(
          slides[2],
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'power2.inOut',
            duration: 1.2,
          },
          'slide-2+=0.2'
        );
        tl.to(
          images[2],
          {
            scale: 1.0,
            ease: 'power1.out',
            duration: 1.2,
          },
          'slide-2+=0.2'
        );
        tl.to(
          images[1],
          {
            scale: 1.05,
            filter: 'brightness(0.35)',
            duration: 1.2,
          },
          'slide-2+=0.2'
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-20 w-full min-h-screen bg-white text-neutral-950 py-16 sm:py-20 lg:py-24 border-b border-neutral-200 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center max-w-3xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-sm bg-neutral-950 text-white uppercase tracking-widest">
              03 // INSIDE EVALIXA LABS
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold">
              ENGINEERING ASSURANCE ENVIRONMENTS
            </span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-neutral-950 tracking-tight leading-tight mb-3">
            Built by Security Researchers, ML Engineers & Domain Specialists.
          </h2>
          <p className="font-sans text-xs sm:text-sm lg:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Explore the three dedicated infrastructure environments purpose-built for continuous frontier model verification.
          </p>
        </div>

        {/* Cinematic Clip-Path Stage */}
        <div
          ref={stageRef}
          className="relative w-full max-w-6xl h-[560px] sm:h-[620px] lg:h-[660px] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl select-none"
        >
          {LAB_SLIDES.map((slide, idx) => {
            const Icon = slide.icon;
            return (
              <div
                key={slide.id}
                ref={(el) => {
                  slideRefs.current[idx] = el;
                }}
                className={`absolute inset-0 w-full h-full overflow-hidden ${
                  idx === 0 ? 'z-10' : idx === 1 ? 'z-20' : 'z-30'
                }`}
                style={{ willChange: 'clip-path' }}
              >
                {/* Background Image Layer with Cinematic Scale */}
                <div
                  ref={(el) => {
                    imageRefs.current[idx] = el;
                  }}
                  className="absolute inset-0 w-full h-full will-change-transform"
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="(max-width: 1280px) 100vw, 1200px"
                    className="object-cover object-center grayscale contrast-125 brightness-[0.55]"
                    priority={idx === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/30" />
                </div>

                {/* Slide Foreground Content */}
                <div className="relative z-10 w-full h-full p-6 sm:p-10 lg:p-12 flex flex-col justify-between text-white">
                  {/* Top Bar: Code Tag + Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-white bg-white/10 px-2.5 py-1 rounded-sm border border-white/15">
                        {slide.code}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 font-semibold hidden sm:inline">
                        {slide.tagline}
                      </span>
                    </div>

                    <div className="w-9 h-9 rounded-md bg-white/10 border border-white/15 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Center Content: Title & Narrative */}
                  <div className="max-w-2xl my-auto py-6">
                    <span className="font-mono text-xs text-neutral-400 uppercase tracking-[0.2em] block mb-2">
                      INFRASTRUCTURE PILLAR #{slide.id}
                    </span>
                    <h3 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-4">
                      {slide.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm lg:text-base text-neutral-300 leading-relaxed font-normal">
                      {slide.desc}
                    </p>
                  </div>

                  {/* Bottom Bar: Telemetry HUD + CTA */}
                  <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="grid grid-cols-3 gap-4 sm:gap-8 font-mono">
                      {slide.hud.map((item, hIdx) => (
                        <div key={hIdx}>
                          <span className="text-[10px] text-neutral-400 uppercase tracking-widest block mb-0.5">
                            {item.label}
                          </span>
                          <span className="text-xs sm:text-sm text-white font-bold block truncate">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/services/ai-agent-evaluation-benchmarking"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-white text-neutral-950 font-mono text-xs uppercase tracking-wider font-bold hover:bg-neutral-200 transition-all self-start sm:self-auto shrink-0 shadow-lg shadow-black/40"
                    >
                      <span>Explore Suite</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-neutral-950" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Floating Stage Navigation Pager (Top Right) */}
          <div className="absolute top-6 sm:top-10 right-6 sm:right-10 z-40 flex items-center gap-2 font-mono text-xs text-white bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 pointer-events-none">
            <span className="text-white font-bold">{`0${activeSlide + 1}`}</span>
            <span className="text-neutral-500">/</span>
            <span className="text-neutral-400">03</span>
          </div>
        </div>
      </div>
    </section>
  );
}
