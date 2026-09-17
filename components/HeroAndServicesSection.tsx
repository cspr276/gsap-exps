'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const THREE_SERVICES = [
  {
    id: 1,
    num: '01',
    heading: 'AI AGENT EVALUATION & BENCHMARKING',
    paragraph:
      'Decision-grade AI benchmarking, regression tracking, and agent evaluation frameworks for enterprise teams. Task-grounded rubrics scored by verified domain specialists with auditable evidence.',
    spec: '50+ Dimensions • Inter-Rater Agreement'
  },
  {
    id: 2,
    num: '02',
    heading: 'AI MODEL SECURITY TESTING',
    paragraph:
      'Adversarial testing, prompt injection analysis, and jailbreak assessments for production models. Every vulnerability is triaged by risk band and accompanied by reproducible traces.',
    spec: 'Zero-Day Jailbreaks • Severity-Graded Triage'
  },
  {
    id: 3,
    num: '03',
    heading: 'AI ATTACK DETECTION SYSTEMS',
    paragraph:
      'Production-grade attack detection systems identifying adversarial inputs, prompt exploitation attempts, and model abuse in real time with sub-millisecond defensive response.',
    spec: '< 1.2ms Latency • Automated Mitigation'
  }
];

const INFO_HEADING = "AI Security, Evaluation & Intelligent Systems";
const INFO_PARAGRAPH =
  "Evalixa delivers enterprise-grade AI services across model security testing, attack detection, agent evaluation, data annotation, and intelligent system design. Our delivery approach is shaped by real case studies and proven outcomes - helping ambitious teams build secure, reliable AI systems.";
const INFO_WORDS = INFO_PARAGRAPH.split(' ');

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1] as const
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.06,
      delayChildren: 0.08
    }
  }
};

const headingVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
    filter: 'blur(8px)'
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

const paragraphVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.015,
      delayChildren: 0.12
    }
  }
};

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
    filter: 'blur(4px)'
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.4,
      ease: [0.2, 0.65, 0.3, 0.9] as const
    }
  }
};

export default function HeroAndServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const serviceCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isInfoVisible, setIsInfoVisible] = useState(false);

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
        if (heroOverlay) gsap.set(heroOverlay, { opacity: 0.55 });
        gsap.set(imageWrapper, {
          scale: heroScale,
          xPercent: 0,
          yPercent: 0,
          borderRadius: '0px',
          boxShadow: 'none'
        });

        serviceCardsRef.current.forEach((el) => {
          if (el) {
            gsap.set(el, { opacity: 0, y: 30 });
          }
        });

        // Master Timeline pinned with snappy, responsive scroll room (4800px + viewport height for stack slide-over)
        let lastVisible = false;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: () => `+=${4800 + window.innerHeight}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            onUpdate: (self) => {
              const total = tl.totalDuration();
              if (
                total > 0 &&
                tl.labels['info-enter'] !== undefined &&
                tl.labels['info-exit'] !== undefined
              ) {
                const startP = tl.labels['info-enter'] / total;
                const endP = tl.labels['info-exit'] / total;
                const inWindow = self.progress >= startP - 0.005 && self.progress <= endP;
                if (inWindow !== lastVisible) {
                  lastVisible = inWindow;
                  setIsInfoVisible(inWindow);
                }
              }
            }
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
            y: -50,
            duration: 0.8,
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
            duration: 1.8,
            ease: 'power2.inOut'
          },
          'hero-shrink'
        );

        // Transition dark scrim to comfortable reading contrast for info display
        if (heroOverlay) {
          tl.to(
            heroOverlay,
            {
              opacity: 0.75,
              duration: 1.6,
              ease: 'power2.inOut'
            },
            'hero-shrink'
          );
        }

        /* ========================================================================= */
        /* PHASE 1.5: INFO DISPLAY (FRAMER MOTION REVEAL WINDOW)                     */
        /* Video stays centered with dark scrim while Framer Motion reveals the text */
        /* ========================================================================= */
        tl.addLabel('info-enter');

        // Reading window while user scrolls
        tl.to({}, { duration: 1.8 });

        tl.addLabel('info-exit');

        // Clear scrim so video is 100% vibrant for the services
        if (heroOverlay) {
          tl.to(
            heroOverlay,
            {
              opacity: 0,
              duration: 0.6,
              ease: 'power2.inOut'
            },
            'info-exit'
          );
        }

        // Brief breathing room in center before moving
        tl.to({}, { duration: 0.2 });

        /* ========================================================================= */
        /* PHASE 2: IMAGE TRAVELS DOWN AND TO THE RIGHT                              */
        /* As user continues scrolling, the image glides to Service 1 down-right spot*/
        /* ========================================================================= */
        tl.to(
          imageWrapper,
          {
            xPercent: 52,
            yPercent: 4,
            duration: 1.2,
            ease: 'power2.inOut'
          },
          'image-to-s1'
        );

        /* ========================================================================= */
        /* SERVICE 1 APPEAR (Immediate clear reveal, no tedious scrub)               */
        /* ========================================================================= */
        const s1 = serviceCardsRef.current[0];
        if (s1) {
          // Content slides & fades in on the LEFT
          tl.to(
            s1,
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power2.out'
            },
            's1-enter'
          );

          // Reading pause
          tl.to({}, { duration: 1.5 });

          tl.to(
            s1,
            {
              opacity: 0,
              y: -30,
              duration: 0.6,
              ease: 'power2.in'
            },
            's1-exit'
          );
        }

        /* ========================================================================= */
        /* SCROLL ROOM 2: TRANSITION TO SERVICE 2 (Image glides to LEFT)             */
        /* ========================================================================= */
        tl.to(
          imageWrapper,
          {
            xPercent: -52,
            duration: 1.3,
            ease: 'power2.inOut'
          },
          's1-exit+=0.1'
        );

        /* ========================================================================= */
        /* SERVICE 2 APPEAR                                                          */
        /* ========================================================================= */
        const s2 = serviceCardsRef.current[1];
        if (s2) {
          // Content slides & fades in on the RIGHT
          tl.to(
            s2,
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power2.out'
            },
            's2-enter'
          );

          // Reading pause
          tl.to({}, { duration: 1.5 });

          tl.to(
            s2,
            {
              opacity: 0,
              y: -30,
              duration: 0.6,
              ease: 'power2.in'
            },
            's2-exit'
          );
        }

        /* ========================================================================= */
        /* SCROLL ROOM 3: TRANSITION TO SERVICE 3 (Image glides to RIGHT)            */
        /* ========================================================================= */
        tl.to(
          imageWrapper,
          {
            xPercent: 52,
            duration: 1.3,
            ease: 'power2.inOut'
          },
          's2-exit+=0.1'
        );

        /* ========================================================================= */
        /* SERVICE 3 APPEAR                                                          */
        /* ========================================================================= */
        const s3 = serviceCardsRef.current[2];
        if (s3) {
          // Content slides & fades in on the LEFT
          tl.to(
            s3,
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power2.out'
            },
            's3-enter'
          );

          // Reading pause
          tl.to({}, { duration: 1.5 });
        }

        /* ========================================================================= */
        /* LOCK SERVICE 3 SECTION IN PLACE WHILE NEXT SECTION STACKS ON TOP         */
        /* The entire section stays pinned and frozen on screen while the            */
        /* HorizontalServicesSection slides up from the bottom directly on top of it */
        /* ========================================================================= */
        tl.to({}, { duration: 1.8 });
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

        setIsInfoVisible(true);

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
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/hero_poster.jpg"
            className="w-full h-full object-cover object-center"
          >
            <source src="/hero_video.mp4" type="video/mp4" />
          </video>
          {/* Subtle dark film to guarantee readability */}
          <div
            ref={heroOverlayRef}
            className="absolute inset-0 bg-black/60 pointer-events-none"
          />
        </div>

        {/* ========================================================================= */}
        {/* HERO SECTION (Centered initially over the full-bleed video)               */}
        {/* ========================================================================= */}
        <div
          ref={heroTextRef}
          className="relative z-20 flex flex-col items-center gap-8 text-center max-w-5xl px-4 pointer-events-auto"
        >
          <h1 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.02em] text-white leading-[1.08] mb-8 sm:mb-10 select-none">
            Engineered for Autonomous Intelligence, <br />
            Built for Planetary Scale.
          </h1>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs font-mono tracking-wider uppercase">
            <Link
              href="/"
              className="group/btn w-full sm:w-auto px-6 py-3.5 rounded-md bg-white hover:bg-neutral-100 text-neutral-950 font-semibold transition-all inline-flex items-center justify-center gap-2 shadow-xl shadow-black/30"
            >
              <span>Explore Architecture</span>
              <ArrowDown className="w-3.5 h-3.5 text-neutral-950 transition-transform duration-200 group-hover/btn:translate-y-0.5" />
            </Link>
            <Link
              href="/"
              className="group/btn w-full sm:w-auto px-6 py-3.5 rounded-md bg-neutral-950/80 hover:bg-neutral-900 border border-neutral-700/90 hover:border-neutral-500 text-white font-semibold transition-all backdrop-blur-md inline-flex items-center justify-center gap-2 shadow-xl shadow-black/30"
            >
              View Capabilities
              <ArrowRight className="w-3.5 h-3.5 text-neutral-300 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:text-white" />
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INFO DISPLAY (Framer Motion Text Reveal)                                  */}
        {/* ========================================================================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInfoVisible ? 'visible' : 'hidden'}
          className="absolute z-20 flex flex-col items-center justify-center text-center max-w-xl md:max-w-2xl px-6 sm:px-10 pointer-events-none"
        >
          <motion.h2
            variants={headingVariants}
            className="font-display font-semibold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mb-4 sm:mb-6 leading-tight select-none"
          >
            {INFO_HEADING}
          </motion.h2>
          <motion.p
            variants={paragraphVariants}
            className="text-sm sm:text-base md:text-lg leading-relaxed font-normal text-neutral-200 select-none"
          >
            {INFO_WORDS.map((w, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className="inline-block mr-[0.26em] will-change-[transform,opacity,filter] font-normal text-white"
              >
                {w}
              </motion.span>
            ))}
          </motion.p>
        </motion.div>

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
                {/* Clean Section Number & Heading */}
                <div className="flex items-center gap-3 text-xs font-mono tracking-wider uppercase mb-5">
                  <span className="text-neutral-950 font-bold">{service.num}</span>
                  <span className="w-2 h-px bg-neutral-300" />
                  <span className="font-semibold text-neutral-900 tracking-wider font-mono">{service.heading}</span>
                </div>

                {/* Paragraph */}
                <p className="text-base sm:text-lg xl:text-xl font-normal leading-relaxed text-neutral-800 mb-6">
                  {service.paragraph}
                </p>

                {/* Technical Metric / Spec Chip */}
                {service.spec && (
                  <div className="text-xs font-mono text-neutral-500 tracking-wider uppercase pt-4 border-t border-neutral-200">
                    {service.spec}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
