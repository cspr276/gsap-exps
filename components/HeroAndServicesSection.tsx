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

        // Master Timeline pinned with generous scroll room (9500px)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '+=9500',
            pin: true,
            scrub: 1,
            anticipatePin: 1
          }
        });

        /* ========================================================================= */
        /* HERO EXIT & IMAGE SHRINK TO DOWN-RIGHT (Generous scroll room)             */
        /* The full-bleed background smoothly pulls back and travels down-right      */
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

        // The image smoothly zooms out from full bleed to its card frame and glides down-right
        tl.to(
          imageWrapper,
          {
            scale: 1,
            xPercent: 52,
            yPercent: 4,
            borderRadius: '16px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
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

        // Brief breathing room so image settles in place before text enters
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

        // Conclude the sequence cleanly
        tl.to({}, { duration: 0.8 });
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
      className="relative w-full min-h-screen bg-neutral-950 text-white overflow-hidden"
    >
      {/* Pinned Stage Container */}
      <div className="relative w-full h-screen flex items-center justify-center px-6 sm:px-12 lg:px-20 overflow-hidden">
        {/* ========================================================================= */}
        {/* THE FLOATING HERO IMAGE                                                   */}
        {/* ========================================================================= */}
        <div
          ref={imageWrapperRef}
          className="absolute z-10 w-[46vw] max-w-[640px] h-[58vh] max-h-[560px] overflow-hidden border border-neutral-800/80 shadow-2xl shadow-black/80 will-change-transform pointer-events-none"
        >
          <img
            src="/hero_placeholder.png"
            alt="Nexus Platform Core"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle dark film to guarantee readability in full-bleed hero state */}
          <div
            ref={heroOverlayRef}
            className="absolute inset-0 bg-black/45 pointer-events-none"
          />
        </div>

        {/* ========================================================================= */}
        {/* HERO SECTION (Centered initially over the full-bleed image)               */}
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
                {/* Small Clean Heading */}
                <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 tracking-wider uppercase mb-5">
                  <span className="text-neutral-500 font-semibold">{service.num}</span>
                  <span className="w-6 h-[1px] bg-neutral-800" />
                  <span className="font-semibold text-white tracking-widest">{service.heading}</span>
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

                {/* Minimal Sub-spec line */}
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
