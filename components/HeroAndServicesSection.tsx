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
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const serviceCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const container = containerRef.current;
      const heroText = heroTextRef.current;
      const imageWrapper = imageWrapperRef.current;
      const heroOverlay = heroOverlayRef.current;
      if (!container || !heroText || !imageWrapper) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        // Calculate exact scale factor needed to cover the entire viewport from center
        const cardRect = imageWrapper.getBoundingClientRect();
        const cardW = cardRect.width || Math.min(window.innerWidth * 0.46, 640);
        const cardH = cardRect.height || Math.min(window.innerHeight * 0.58, 560);
        const scaleX = window.innerWidth / cardW;
        const scaleY = window.innerHeight / cardH;
        const heroScale = Math.max(scaleX, scaleY) * 1.05;

        // Initial fullscreen hero state:
        // Image card is scaled up so it fully covers the viewport with 0 radius & 0 shadow
        gsap.set(heroText, { opacity: 1, y: 0 });
        if (heroOverlay) gsap.set(heroOverlay, { opacity: 1 });
        gsap.set(imageWrapper, {
          scale: heroScale,
          xPercent: 0,
          yPercent: 0,
          borderRadius: '0px',
          boxShadow: 'none'
        });

        serviceCardsRef.current.forEach((el) => {
          if (el) {
            gsap.set(el, { opacity: 0, y: 40 });
            // Dim all words initially
            const words = el.querySelectorAll('.word');
            gsap.set(words, { opacity: 0.15 });
          }
        });

        // Master Timeline pinned with generous scroll room (11000px + viewport height for stack slide-over)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: () => `+=${11000 + window.innerHeight}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1
          }
        });

        /* ========================================================================= */
        /* PHASE 1: HERO EXIT & SHRINK FROM ALL 4 SIDES (CENTERED)                   */
        /* The full image pulls back and shrinks inward from all 4 sides into center */
        /* ========================================================================= */
        tl.to(
          heroText,
          {
            opacity: 0,
            y: -60,
            duration: 1.2,
            ease: 'power2.inOut'
          },
          'hero-exit'
        );

        // Shrink from all 4 sides inward into a centered framed card (xPercent: 0, yPercent: 0)
        tl.to(
          imageWrapper,
          {
            scale: 1,
            xPercent: 0,
            yPercent: 0,
            borderRadius: '16px',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.18)',
            duration: 3.5,
            ease: 'power2.inOut'
          },
          'hero-shrink'
        );

        // Dark overlay on hero fades to reveal the vibrant crisp image
        if (heroOverlay) {
          tl.to(
            heroOverlay,
            {
              opacity: 0,
              duration: 3.0,
              ease: 'power2.inOut'
            },
            'hero-shrink'
          );
        }

        // Brief breathing room in center before moving
        tl.to({}, { duration: 0.4 });

        /* ========================================================================= */
        /* PHASE 2: IMAGE TRAVELS DOWN AND TO THE RIGHT                              */
        /* As user continues scrolling, the image glides to Service 1 down-right spot*/
        /* ========================================================================= */
        tl.to(
          imageWrapper,
          {
            xPercent: 52,
            yPercent: 4,
            duration: 3.2,
            ease: 'power2.inOut'
          },
          'image-to-s1'
        );

        // Settle room before Service 1 content enters
        tl.to({}, { duration: 0.4 });

        /* ========================================================================= */
        /* SERVICE 1 APPEAR & TEXT HIGHLIGHT HOLD                                    */
        /* Section holds in place while text highlights word-by-word                 */
        /* ========================================================================= */
        const s1 = serviceCardsRef.current[0];
        if (s1) {
          // Content slides & fades in on the LEFT
          tl.to(
            s1,
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: 'power2.out'
            },
            's1-enter'
          );

          // Section holds while user scrolls to highlight words
          const s1Words = s1.querySelectorAll('.word');
          tl.to(
            s1Words,
            {
              opacity: 1,
              stagger: 0.12,
              duration: 3.2,
              ease: 'none'
            },
            's1-highlight'
          );

          // Reading pause
          tl.to({}, { duration: 1.5 });
        }

        /* ========================================================================= */
        /* SCROLL ROOM 2: TRANSITION TO SERVICE 2                                    */
        /* Service 1 exits, image has generous scroll room to glide to LEFT          */
        /* ========================================================================= */
        if (s1) {
          tl.to(
            s1,
            {
              opacity: 0,
              y: -40,
              duration: 1.2,
              ease: 'power2.in'
            },
            's1-exit'
          );
        }

        // Image glides smoothly across from Right to the LEFT
        tl.to(
          imageWrapper,
          {
            xPercent: -52,
            duration: 3.5,
            ease: 'power2.inOut'
          },
          's1-exit+=0.2'
        );

        /* ========================================================================= */
        /* SERVICE 2 APPEAR & TEXT HIGHLIGHT HOLD                                    */
        /* ========================================================================= */
        const s2 = serviceCardsRef.current[1];
        if (s2) {
          // Content slides & fades in on the RIGHT
          tl.to(
            s2,
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: 'power2.out'
            },
            's2-enter'
          );

          // Section holds while user scrolls to highlight words
          const s2Words = s2.querySelectorAll('.word');
          tl.to(
            s2Words,
            {
              opacity: 1,
              stagger: 0.12,
              duration: 3.2,
              ease: 'none'
            },
            's2-highlight'
          );

          // Reading pause
          tl.to({}, { duration: 1.5 });
        }

        /* ========================================================================= */
        /* SCROLL ROOM 3: TRANSITION TO SERVICE 3                                    */
        /* Service 2 exits, image has generous scroll room to glide to RIGHT         */
        /* ========================================================================= */
        if (s2) {
          tl.to(
            s2,
            {
              opacity: 0,
              y: -40,
              duration: 1.2,
              ease: 'power2.in'
            },
            's2-exit'
          );
        }

        // Image glides smoothly back from Left to the RIGHT
        tl.to(
          imageWrapper,
          {
            xPercent: 52,
            duration: 3.5,
            ease: 'power2.inOut'
          },
          's2-exit+=0.2'
        );

        /* ========================================================================= */
        /* SERVICE 3 APPEAR & TEXT HIGHLIGHT HOLD                                    */
        /* ========================================================================= */
        const s3 = serviceCardsRef.current[2];
        if (s3) {
          // Content slides & fades in on the LEFT
          tl.to(
            s3,
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: 'power2.out'
            },
            's3-enter'
          );

          // Section holds while user scrolls to highlight words
          const s3Words = s3.querySelectorAll('.word');
          tl.to(
            s3Words,
            {
              opacity: 1,
              stagger: 0.12,
              duration: 3.2,
              ease: 'none'
            },
            's3-highlight'
          );

          // Reading pause
          tl.to({}, { duration: 1.5 });
        }

        /* ========================================================================= */
        /* LOCK SERVICE 3 SECTION IN PLACE WHILE NEXT SECTION STACKS ON TOP         */
        /* The entire section stays pinned and frozen on screen while the            */
        /* HorizontalServicesSection slides up from the bottom directly on top of it */
        /* ========================================================================= */
        tl.to({}, { duration: 4.2 });
      });

      // Mobile / Tablet Fallback (< 1024px)
      mm.add('(max-width: 1023px)', () => {
        const heroOverlay = heroOverlayRef.current;
        gsap.set(imageWrapper, {
          position: 'relative',
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          width: '100%',
          height: '380px',
          borderRadius: '12px'
        });

        if (heroOverlay) gsap.set(heroOverlay, { opacity: 0 });

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
      className="relative w-full min-h-screen bg-white text-neutral-900 overflow-hidden"
    >
      {/* Pinned Stage Container */}
      <div className="relative w-full h-screen flex items-center justify-center px-6 sm:px-12 lg:px-20 overflow-hidden bg-white">
        {/* ========================================================================= */}
        {/* THE FLOATING HERO IMAGE                                                   */}
        {/* ========================================================================= */}
        <div
          ref={imageWrapperRef}
          className="absolute z-10 w-[46vw] max-w-160 h-[58vh] max-h-140 overflow-hidden border border-neutral-200/90 shadow-2xl shadow-neutral-900/10 will-change-transform pointer-events-none"
        >
          <img
            src="/hero_placeholder.png"
            alt="Nexus Platform Core"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle dark film to guarantee readability in full-bleed hero state */}
          <div
            ref={heroOverlayRef}
            className="absolute inset-0 bg-black/40 pointer-events-none"
          />
        </div>

        {/* ========================================================================= */}
        {/* HERO SECTION (Centered initially over the full-bleed image)               */}
        {/* ========================================================================= */}
        <div
          ref={heroTextRef}
          className="relative z-20 flex flex-col items-center text-center max-w-4xl px-4 pointer-events-auto"
        >
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-300 mb-4 block">
            THE AUTONOMOUS OPERATING CORE
          </span>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.03em] text-white uppercase leading-[1.0] mb-6">
            ENGINEERED <br />
            FOR THE NEXT ERA
          </h1>

          <p className="text-base sm:text-lg text-neutral-200 max-w-2xl font-normal leading-relaxed mb-10">
            A deterministic execution fabric unifying self-healing agent swarms, dynamic compute graphs, and global vector consensus.
          </p>

          <div className="flex items-center gap-5 text-xs font-mono tracking-wider uppercase">
            <a
              href="#services"
              className="px-6 py-3 rounded-md bg-white hover:bg-neutral-200 text-neutral-950 font-semibold transition-all inline-flex items-center gap-2 shadow-lg shadow-black/20"
            >
              <span>Explore Architecture</span>
              <ArrowDown className="w-3.5 h-3.5 text-neutral-950" />
            </a>
            <a
              href="#capabilities"
              className="px-6 py-3 rounded-md border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
            >
              <span>View Capabilities</span>
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3 SERVICES PANELS (Alternating Left / Right)                              */}
        {/* ========================================================================= */}
        <div
          id="services"
          className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center px-6 lg:px-20"
        >
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
                {/* Small Clean Heading without pills or blue */}
                <div className="flex items-center gap-3 text-xs font-mono tracking-wider uppercase mb-5">
                  <span className="text-neutral-950 font-bold">{service.num}</span>
                  <span className="w-6 h-px bg-neutral-300" />
                  <span className="font-semibold text-neutral-900 tracking-wider font-mono">{service.heading}</span>
                </div>

                {/* Paragraph with word-by-word scroll illumination */}
                <p className="text-lg sm:text-xl xl:text-2xl font-normal leading-relaxed text-neutral-950 mb-6">
                  {words.map((w, wIdx) => (
                    <span
                      key={wIdx}
                      className="word inline-block mr-[0.25em] will-change-opacity text-neutral-950 font-normal"
                    >
                      {w}
                    </span>
                  ))}
                </p>

                {/* Minimal Sub-spec line without pill dots */}
                <div className="pt-4 border-t border-neutral-200 text-xs font-mono text-neutral-500">
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
