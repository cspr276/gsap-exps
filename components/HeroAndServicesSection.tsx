'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { useGSAP } from '@gsap/react';
import ScrollTypography from './ScrollTypography';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger, Flip);

const THREE_SERVICES = [
  {
    id: 1,
    num: '01',
    category: 'RECURSIVE INTELLIGENCE',
    title: 'Autonomous Swarms That Reason, Adapt, And Self-Heal',
    description:
      'Orchestrating multi-agent consensus protocols with zero-latency RPCs to execute complex distributed workflows with persistent memory and autonomous fault tolerance.',
    specs: ['0.4ms Consensus', 'Zero Context Drift', 'Byzantine Fault Tolerant'],
    metric: '14.2x Throughput'
  },
  {
    id: 2,
    num: '02',
    category: 'NEURAL PIPELINES',
    title: 'Sub-Millisecond Execution Across Dynamic Compute Graphs',
    description:
      'Dynamic DAG computation compiled directly to native silicon instructions. Speculative branching and distributed caching reduce roundtrips to near-instantaneous execution.',
    specs: ['< 1.2ms Execution', 'Direct GPU Compilation', '99.999% Determinism'],
    metric: '180k Ops / Sec'
  },
  {
    id: 3,
    num: '03',
    category: 'DISTRIBUTED MESH',
    title: 'Petabyte Semantic Memory Across Global Edge Partitions',
    description:
      'A decentralized high-dimensional vector fabric synchronizing billions of embeddings across 80+ global nodes with cryptographic integrity and sub-5ms recall.',
    specs: ['10B+ Vectors', 'Sub-5ms Recall', 'Zk-Attested Proofs'],
    metric: '< 5ms Recall'
  }
];

export default function HeroAndServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const oneImageRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  // References to the 3 step target slots in the services sections
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const oneEl = oneImageRef.current;
      const heroSec = heroSectionRef.current;
      if (!oneEl || !heroSec) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const stepElements = slotRefs.current.filter(Boolean) as HTMLElement[];
        if (stepElements.length === 0) return;

        // Hero text fades out on initial scroll
        gsap.to(heroTextRef.current, {
          opacity: 0,
          y: -100,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: heroSec,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });

        // Capture Flip states for each step target slot
        const states = stepElements.map((el) =>
          Flip.getState(el, { props: 'borderRadius' })
        );

        // Timeline linked to scroll from the Hero all the way down through the 3 services
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroSec,
            start: 'top top',
            endTrigger: stepElements[stepElements.length - 1],
            end: 'center center',
            scrub: 1,
            immediateRender: false
          }
        });

        const flipConfig = {
          duration: 1,
          ease: 'sine.inOut',
          props: 'borderRadius'
        };

        states.forEach((state, idx) => {
          const fitTween = Flip.fit(oneEl, state, {
            ...flipConfig,
            ease: idx === 0 ? 'power1.inOut' : flipConfig.ease
          });
          if (fitTween) {
            tl.add(fitTween as any, idx ? '+=0.4' : 0);
          }
        });

        // Recalculate on window resize
        const handleResize = () => {
          ScrollTrigger.refresh();
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      });

      // Mobile layout fallback (< 1024px)
      mm.add('(max-width: 1023px)', () => {
        gsap.set(oneEl, {
          position: 'relative',
          width: '100%',
          height: '400px',
          borderRadius: '8px'
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative w-full bg-neutral-950 text-white">
      {/* ========================================================================= */}
      {/* THE SINGLE IMAGE ELEMENT (Starts covering Hero, then travels to slots)     */}
      {/* ========================================================================= */}
      <div
        ref={oneImageRef}
        className="absolute top-0 left-0 w-full h-screen z-10 overflow-hidden pointer-events-none will-change-[transform,width,height]"
        style={{
          borderRadius: '0px'
        }}
      >
        <img
          src="/hero_placeholder.png"
          alt="Nexus Platform Core"
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle dark gradient overlay to ensure hero text contrast */}
        <div className="absolute inset-0 bg-neutral-950/45 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/70 pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* HERO SECTION                                                              */}
      {/* ========================================================================= */}
      <section
        id="hero"
        ref={heroSectionRef}
        className="relative w-full h-screen flex flex-col items-center justify-center text-center px-6 z-20"
      >
        <div ref={heroTextRef} className="max-w-5xl flex flex-col items-center">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-400 mb-6 block">
            THE AUTONOMOUS OPERATING CORE
          </span>

          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-[0.95] mb-8">
            ENGINEERED <br />
            FOR THE NEXT ERA
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl font-normal leading-relaxed mb-10">
            A deterministic execution fabric unifying self-healing agent swarms, dynamic compute graphs, and global vector consensus.
          </p>

          <div className="flex items-center gap-6 text-xs font-mono tracking-wider uppercase">
            <a
              href="#services"
              className="px-6 py-3 rounded-md bg-white text-neutral-950 font-semibold hover:bg-neutral-200 transition-colors inline-flex items-center gap-2"
            >
              <span>Explore Architecture</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>
            <a
              href="#manifesto"
              className="px-6 py-3 rounded-md border border-neutral-700 bg-neutral-900/60 hover:border-white text-neutral-300 hover:text-white transition-colors"
            >
              <span>Read Manifesto</span>
            </a>
          </div>
        </div>

        {/* Minimal Editorial Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[10px] text-neutral-400 tracking-[0.2em] uppercase">
          <span>SCROLL DOWN</span>
          <div className="w-[1px] h-8 bg-neutral-600 animate-pulse" />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3 SERVICES SECTIONS (Left / Right Alternating Flow)                       */}
      {/* ========================================================================= */}
      <div id="services" className="relative w-full z-20">
        {THREE_SERVICES.map((service, index) => {
          // Service 1 (index 0): Text on Left, Image Slot on Right
          // Service 2 (index 1): Image Slot on Left, Text on Right
          // Service 3 (index 2): Text on Left, Image Slot on Right
          const isTextLeft = index % 2 === 0;

          return (
            <section
              key={service.id}
              className="relative w-full min-h-screen flex items-center py-28 px-6 sm:px-12 lg:px-20 border-t border-neutral-900"
            >
              <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                {/* When Text is on Left: Columns 1-6 are Text, Columns 7-12 are Slot */}
                {/* When Text is on Right: Columns 1-6 are Slot, Columns 7-12 are Text */}

                {isTextLeft ? (
                  <>
                    {/* LEFT TEXT COLUMN */}
                    <div className="lg:col-span-6 flex flex-col justify-center">
                      <div className="flex items-center gap-3 text-xs font-mono text-neutral-500 tracking-wider uppercase mb-6">
                        <span>{service.num}</span>
                        <span className="w-8 h-[1px] bg-neutral-800" />
                        <span className="text-neutral-300 font-semibold">{service.category}</span>
                      </div>

                      {/* Headline with fx16 scroll typography scrub */}
                      <ScrollTypography
                        tag="h2"
                        text={service.title}
                        tilt={true}
                        className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight mb-6"
                      />

                      {/* Paragraph with fx16 scroll typography scrub */}
                      <ScrollTypography
                        tag="p"
                        text={service.description}
                        tilt={false}
                        className="text-base sm:text-lg text-neutral-400 font-normal leading-relaxed mb-8"
                      />

                      {/* Technical Specs List */}
                      <div className="border-t border-neutral-800 pt-6 flex flex-wrap gap-y-3 gap-x-6 text-xs font-mono text-neutral-400">
                        {service.specs.map((spec) => (
                          <div key={spec} className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-neutral-500 rounded-full" />
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* RIGHT IMAGE TARGET SLOT */}
                    <div className="lg:col-span-6 flex justify-end">
                      <div
                        ref={(el) => {
                          slotRefs.current[index] = el;
                        }}
                        className="w-full max-w-lg lg:max-w-xl h-[480px] sm:h-[540px] lg:h-[620px] rounded-lg border border-neutral-800/60 bg-neutral-900/10 overflow-hidden"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* LEFT IMAGE TARGET SLOT */}
                    <div className="lg:col-span-6 flex justify-start order-2 lg:order-1">
                      <div
                        ref={(el) => {
                          slotRefs.current[index] = el;
                        }}
                        className="w-full max-w-lg lg:max-w-xl h-[480px] sm:h-[540px] lg:h-[620px] rounded-lg border border-neutral-800/60 bg-neutral-900/10 overflow-hidden"
                      />
                    </div>

                    {/* RIGHT TEXT COLUMN */}
                    <div className="lg:col-span-6 flex flex-col justify-center order-1 lg:order-2">
                      <div className="flex items-center gap-3 text-xs font-mono text-neutral-500 tracking-wider uppercase mb-6">
                        <span>{service.num}</span>
                        <span className="w-8 h-[1px] bg-neutral-800" />
                        <span className="text-neutral-300 font-semibold">{service.category}</span>
                      </div>

                      {/* Headline with fx16 scroll typography scrub */}
                      <ScrollTypography
                        tag="h2"
                        text={service.title}
                        tilt={true}
                        className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight mb-6"
                      />

                      {/* Paragraph with fx16 scroll typography scrub */}
                      <ScrollTypography
                        tag="p"
                        text={service.description}
                        tilt={false}
                        className="text-base sm:text-lg text-neutral-400 font-normal leading-relaxed mb-8"
                      />

                      {/* Technical Specs List */}
                      <div className="border-t border-neutral-800 pt-6 flex flex-wrap gap-y-3 gap-x-6 text-xs font-mono text-neutral-400">
                        {service.specs.map((spec) => (
                          <div key={spec} className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-neutral-500 rounded-full" />
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
