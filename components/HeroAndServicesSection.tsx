'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const THREE_SERVICES = [
  {
    id: 1,
    num: '01',
    heading: 'AUTONOMOUS SWARMS',
    paragraph:
      'Self-coordinating agent clusters communicating over zero-latency RPCs to execute recursive complex tasks, maintain state memory, and auto-recover from runtime failures.',
    spec: '0.4ms Consensus • Zero Context Drift'
  },
  {
    id: 2,
    num: '02',
    heading: 'NEURAL PIPELINES',
    paragraph:
      'Sub-millisecond pipeline execution with dynamic compute graphs compiled directly to native silicon instructions. Speculative branching and distributed caching eliminate roundtrips.',
    spec: '< 1.2ms Execution • Direct GPU Compilation'
  },
  {
    id: 3,
    num: '03',
    heading: 'DISTRIBUTED MESH',
    paragraph:
      'Petabyte-scale semantic memory fabric indexing billions of high-dimensional embeddings across distributed edge nodes with cryptographic integrity and sub-5ms recall.',
    spec: '10B+ Vectors • Sub-5ms Recall'
  }
];

export default function HeroAndServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const serviceCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const container = containerRef.current;
      const heroText = heroTextRef.current;
      const imageWrapper = imageWrapperRef.current;
      if (!container || !heroText || !imageWrapper) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        // Initial setup
        gsap.set(heroText, { opacity: 1, y: 0 });
        gsap.set(imageWrapper, {
          width: '100vw',
          height: '100vh',
          xPercent: 0,
          yPercent: 0,
          borderRadius: '0px'
        });

        serviceCardsRef.current.forEach((el) => {
          if (el) {
            gsap.set(el, { opacity: 0, y: 30 });
            // Dim all word spans initially
            const words = el.querySelectorAll('.word');
            gsap.set(words, { opacity: 0.15 });
          }
        });

        // Master Timeline pinned with generous scroll room
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '+=7500',
            pin: true,
            scrub: 1,
            anticipatePin: 1
          }
        });

        /* ========================================================================= */
        /* STEP 1: Hero -> Service 1 (Scroll space for image transformation)          */
        /* ========================================================================= */
        // Hero text fades out
        tl.to(heroText, {
          opacity: 0,
          y: -70,
          duration: 1,
          ease: 'power2.inOut'
        }, 'hero-to-s1');

        // Image has scroll space to shrink and travel to the RIGHT
        tl.to(
          imageWrapper,
          {
            width: '45vw',
            maxWidth: '680px',
            height: '64vh',
            xPercent: 50,
            borderRadius: '16px',
            duration: 2,
            ease: 'power2.inOut'
          },
          'hero-to-s1+=0.2'
        );

        // Service 1 fades in on the LEFT
        const s1 = serviceCardsRef.current[0];
        if (s1) {
          tl.to(
            s1,
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power2.out'
            },
            's1-appear'
          );

          /* STEP 1 HOLD: Screen holds while user scrolls to reveal text highlight */
          const s1Words = s1.querySelectorAll('.word');
          tl.to(
            s1Words,
            {
              opacity: 1,
              stagger: 0.1,
              duration: 2.5,
              ease: 'none'
            },
            's1-highlight'
          );

          // Comfortable reading pause
          tl.to({}, { duration: 1 });
        }

        /* ========================================================================= */
        /* STEP 2: Service 1 -> Service 2 (Generous scroll space to glide across)    */
        /* ========================================================================= */
        if (s1) {
          tl.to(
            s1,
            {
              opacity: 0,
              y: -30,
              duration: 1,
              ease: 'power2.in'
            },
            's1-to-s2'
          );
        }

        // Image glides smoothly across from Right to the LEFT
        tl.to(
          imageWrapper,
          {
            xPercent: -50,
            duration: 2.5,
            ease: 'power2.inOut'
          },
          's1-to-s2+=0.2'
        );

        // Service 2 fades in on the RIGHT
        const s2 = serviceCardsRef.current[1];
        if (s2) {
          tl.to(
            s2,
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power2.out'
            },
            's2-appear'
          );

          /* STEP 2 HOLD: Screen holds while user scrolls to reveal text highlight */
          const s2Words = s2.querySelectorAll('.word');
          tl.to(
            s2Words,
            {
              opacity: 1,
              stagger: 0.1,
              duration: 2.5,
              ease: 'none'
            },
            's2-highlight'
          );

          // Comfortable reading pause
          tl.to({}, { duration: 1 });
        }

        /* ========================================================================= */
        /* STEP 3: Service 2 -> Service 3 (Generous scroll space to glide back)      */
        /* ========================================================================= */
        if (s2) {
          tl.to(
            s2,
            {
              opacity: 0,
              y: -30,
              duration: 1,
              ease: 'power2.in'
            },
            's2-to-s3'
          );
        }

        // Image glides smoothly back from Left to the RIGHT
        tl.to(
          imageWrapper,
          {
            xPercent: 50,
            duration: 2.5,
            ease: 'power2.inOut'
          },
          's2-to-s3+=0.2'
        );

        // Service 3 fades in on the LEFT
        const s3 = serviceCardsRef.current[2];
        if (s3) {
          tl.to(
            s3,
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power2.out'
            },
            's3-appear'
          );

          /* STEP 3 HOLD: Screen holds while user scrolls to reveal text highlight */
          const s3Words = s3.querySelectorAll('.word');
          tl.to(
            s3Words,
            {
              opacity: 1,
              stagger: 0.1,
              duration: 2.5,
              ease: 'none'
            },
            's3-highlight'
          );

          // Comfortable reading pause
          tl.to({}, { duration: 1 });
        }

        // Conclusion of the sequence
        tl.to({}, { duration: 0.5 });
      });

      // Mobile Layout (< 1024px)
      mm.add('(max-width: 1023px)', () => {
        gsap.set(imageWrapper, {
          position: 'relative',
          width: '100%',
          height: '420px',
          borderRadius: '12px',
          xPercent: 0,
          yPercent: 0
        });

        serviceCardsRef.current.forEach((card) => {
          if (!card) return;
          gsap.set(card, { opacity: 1, y: 0 });
          const words = card.querySelectorAll('.word');
          gsap.set(words, { opacity: 1 });
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-neutral-950 text-white overflow-hidden"
    >
      {/* Pinned Stage Container */}
      <div className="relative w-full h-screen flex items-center justify-center px-6 sm:px-12 lg:px-20 overflow-hidden">
        {/* ========================================================================= */}
        {/* THE SINGLE IMAGE CONTAINER                                                */}
        {/* ========================================================================= */}
        <div
          ref={imageWrapperRef}
          className="absolute z-10 overflow-hidden border border-neutral-800/80 shadow-2xl shadow-black/80 will-change-[transform,width,height,border-radius] pointer-events-none"
        >
          <img
            src="/hero_placeholder.png"
            alt="Nexus Platform Core"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle dark film to guarantee readability */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-neutral-950/60 pointer-events-none" />
        </div>

        {/* ========================================================================= */}
        {/* HERO SECTION (Initially centered over full-bleed image)                   */}
        {/* ========================================================================= */}
        <div
          ref={heroTextRef}
          className="relative z-20 flex flex-col items-center text-center max-w-4xl px-4 pointer-events-auto"
        >
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
              href="#capabilities"
              className="px-6 py-3 rounded-md border border-neutral-700 bg-neutral-900/60 hover:border-white text-neutral-300 hover:text-white transition-colors"
            >
              <span>View Capabilities</span>
            </a>
          </div>

          <div className="mt-14 flex flex-col items-center gap-2 font-mono text-[10px] text-neutral-400 tracking-[0.2em] uppercase">
            <span>SCROLL TO UNPACK</span>
            <div className="w-[1px] h-6 bg-neutral-600 animate-pulse" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3 SERVICES PANELS (Alternating Left / Right)                              */}
        {/* ========================================================================= */}
        <div id="services" className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center px-6 lg:px-20">
          {THREE_SERVICES.map((service, index) => {
            // Service 1 (index 0): Left side (Image is on Right)
            // Service 2 (index 1): Right side (Image is on Left)
            // Service 3 (index 2): Left side (Image is on Right)
            const isLeft = index % 2 === 0;

            const words = service.paragraph.split(' ');

            return (
              <div
                key={service.id}
                ref={(el) => {
                  serviceCardsRef.current[index] = el;
                }}
                className={`absolute w-full max-w-lg xl:max-w-xl pointer-events-auto p-6 sm:p-8 transition-all duration-300 ${
                  isLeft ? 'lg:left-12 xl:left-20' : 'lg:right-12 xl:right-20'
                }`}
              >
                {/* Small Clean Heading as requested */}
                <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 tracking-wider uppercase mb-4">
                  <span className="text-neutral-500 font-semibold">{service.num}</span>
                  <span className="w-6 h-[1px] bg-neutral-800" />
                  <span className="font-semibold text-white">{service.heading}</span>
                </div>

                {/* Paragraph with word-by-word scroll illumination */}
                <p className="text-lg sm:text-xl xl:text-2xl font-normal leading-relaxed text-white mb-6">
                  {words.map((w, wIdx) => (
                    <span
                      key={wIdx}
                      className="word inline-block mr-[0.25em] will-change-opacity"
                    >
                      {w}
                    </span>
                  ))}
                </p>

                {/* Minimal Sub-spec */}
                <div className="pt-4 border-t border-neutral-800/80 text-xs font-mono text-neutral-500">
                  <span>{service.spec}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
