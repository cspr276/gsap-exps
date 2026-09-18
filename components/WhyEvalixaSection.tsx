'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TRUST_CARDS = [
  {
    num: '01',
    category: 'EVIDENCE & TRACE',
    title: 'Auditable Evidence',
    desc: 'Every judgment ships with reviewer notes, agreement scores, and reproducible traces you can inspect and defend.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
  },
  {
    num: '02',
    category: 'RISK TRIAGE',
    title: 'Severity-Graded Findings',
    desc: 'Failures are triaged by risk band and regression delta, so your team fixes what actually matters first.',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80'
  },
  {
    num: '03',
    category: 'HUMAN BENCHMARK',
    title: 'Calibrated Domain Experts',
    desc: 'Contributors are verified by expertise and calibrated against gold-standard sets before touching production work.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80'
  },
  {
    num: '04',
    category: 'STATISTICAL RIGOR',
    title: 'Inter-Rater Agreement',
    desc: 'Multiple experts judge each item; we report statistical agreement and adjudicate disputes so findings hold up to scrutiny.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'
  },
  {
    num: '05',
    category: 'EXPLOIT COVERAGE',
    title: 'Adversarial Defense',
    desc: 'Prompt-injection, jailbreak, and data-exfiltration suites mapped to severity bands — measured, not guessed.',
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80'
  },
  {
    num: '06',
    category: 'CONTINUOUS GATES',
    title: 'Regression Monitoring',
    desc: 'Automated delta alerts and regression runs as your models, prompts, and tools change over time.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'
  }
];

export default function WhyEvalixaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const grid = gridRef.current;
      const title = titleRef.current;
      const desc = descRef.current;
      const actions = actionsRef.current;
      if (!section || !grid || !title || !desc || !actions) return;

      const mm = gsap.matchMedia();

      // =========================================================================
      // Desktop: Codrops Sticky Grid Scroll Animation
      // =========================================================================
      mm.add('(min-width: 1024px)', () => {
        // Group items into 3 columns (index % 3)
        const columns: HTMLDivElement[][] = [[], [], []];
        itemRefs.current.forEach((item, idx) => {
          if (item) {
            columns[idx % 3].push(item);
          }
        });

        // Initialize content elements:
        // Description and actions start hidden, title sits in initial rest position
        gsap.set([desc, actions], { opacity: 0, y: 20 });
        gsap.set(title, { opacity: 0.2, scale: 0.95 });

        // Calculate offset for initial column entrance
        const wh = window.innerHeight;
        const dy = wh * 0.9;

        // Set initial positions:
        // Col 0 & Col 2 start above/below, Col 1 starts opposite
        gsap.set(columns[0], { y: -dy });
        gsap.set(columns[1], { y: dy });
        gsap.set(columns[2], { y: -dy });
        gsap.set(grid, { scale: 1 });

        // Master ScrollTrigger Scrub Timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            anticipatePin: 1
          }
        });

        // Step 1: Grid items slide into view in alternating column motions
        tl.to(
          columns[0],
          {
            y: 0,
            stagger: 0.08,
            ease: 'power2.inOut',
            duration: 1.2
          },
          'grid-reveal'
        )
          .to(
            columns[1],
            {
              y: 0,
              stagger: 0.08,
              ease: 'power2.inOut',
              duration: 1.2
            },
            'grid-reveal'
          )
          .to(
            columns[2],
            {
              y: 0,
              stagger: 0.08,
              ease: 'power2.inOut',
              duration: 1.2
            },
            'grid-reveal'
          );

        // Step 2: Grid zoom and lateral parting to open the center stage
        tl.to(
          grid,
          {
            scale: 2.1,
            ease: 'power2.inOut',
            duration: 1.6
          },
          'grid-zoom'
        )
          .to(
            columns[0],
            {
              xPercent: -50,
              opacity: 0.35,
              ease: 'power2.inOut',
              duration: 1.6
            },
            'grid-zoom'
          )
          .to(
            columns[2],
            {
              xPercent: 50,
              opacity: 0.35,
              ease: 'power2.inOut',
              duration: 1.6
            },
            'grid-zoom'
          )
          .to(
            columns[1],
            {
              yPercent: (i) => (i === 0 ? -60 : 60),
              opacity: 0.25,
              ease: 'power2.inOut',
              duration: 1.6
            },
            'grid-zoom'
          );

        // Step 3: Central content reveals clearly as the grid parts
        tl.to(
          title,
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out'
          },
          'grid-zoom+=0.4'
        )
          .to(
            desc,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out'
            },
            'grid-zoom+=0.6'
          )
          .to(
            actions,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out'
            },
            'grid-zoom+=0.8'
          );
      });

      // =========================================================================
      // Mobile / Tablet: Clean Staggered Flow
      // =========================================================================
      mm.add('(max-width: 1023px)', () => {
        itemRefs.current.forEach((item) => {
          if (!item) return;
          gsap.fromTo(
            item,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 85%'
              }
            }
          );
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="why-evalixa"
      ref={sectionRef}
      className="relative w-full bg-neutral-950 text-white border-t border-neutral-800/80 lg:h-[320vh]"
    >
      {/* Sticky Viewport Container on Desktop */}
      <div
        ref={wrapperRef}
        className="lg:sticky lg:top-0 lg:h-screen w-full overflow-hidden flex flex-col items-center justify-center py-20 lg:py-0 px-6 sm:px-12 lg:px-20"
      >
        {/* =================================================================== */}
        {/* BACKGROUND 3-COLUMN GALLERY GRID (Codrops Sticky Grid Mechanics)     */}
        {/* =================================================================== */}
        <div
          ref={gridRef}
          className="hidden lg:grid grid-cols-3 gap-8 w-full max-w-6xl pointer-events-none will-change-transform z-10"
        >
          {TRUST_CARDS.map((card, idx) => (
            <div
              key={card.num}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              className="group/card relative rounded-md border border-neutral-800/90 bg-[#121212]/95 p-7 flex flex-col justify-between h-[230px] overflow-hidden shadow-2xl shadow-black/80 transition-opacity duration-500 will-change-transform"
            >
              {/* Dark Unsplash Background with Overlay */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover object-center opacity-25"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101012] via-[#101012]/85 to-[#101012]/60" />
              </div>

              {/* Card Foreground Content */}
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-semibold tracking-widest text-white">
                      {card.num}
                    </span>
                    <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                      {card.category}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-lg text-white uppercase tracking-tight mb-2 leading-snug">
                    {card.title}
                  </h4>
                  <p className="text-neutral-300 text-xs leading-relaxed line-clamp-3">
                    {card.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* =================================================================== */}
        {/* FOREGROUND CENTRAL CONTENT OVERLAY                                  */}
        {/* =================================================================== */}
        <div
          ref={contentRef}
          className="relative z-20 flex flex-col items-center text-center max-w-3xl mx-auto lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 px-4 pointer-events-auto"
        >
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 mb-3 block">
            WHY EVALIXA
          </span>

          <h2
            ref={titleRef}
            className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-[1.08] mb-6"
          >
            Shaped by Real Outcomes
          </h2>

          <p
            ref={descRef}
            className="text-neutral-300 text-sm sm:text-base lg:text-lg leading-relaxed font-normal mb-8 max-w-2xl"
          >
            Evalixa AI combines adversarial testing, real-time defense, structured evaluation, and expert data annotation into a unified delivery model. We measure AI where it meets the real world.
          </p>

          <div
            ref={actionsRef}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-colors shadow-lg"
            >
              <span>Start an evaluation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#capabilities"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-neutral-800 bg-[#121212] text-neutral-300 font-mono text-xs uppercase tracking-wider font-semibold hover:text-white hover:border-neutral-700 transition-colors"
            >
              <span>Explore services</span>
            </Link>
          </div>
        </div>

        {/* =================================================================== */}
        {/* MOBILE FALLBACK CARD LIST (Clean stacked view on mobile/tablet)      */}
        {/* =================================================================== */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mt-12">
          {TRUST_CARDS.map((card) => (
            <div
              key={card.num}
              className="relative rounded-md border border-neutral-800/90 bg-[#121212] p-6 flex flex-col justify-between overflow-hidden shadow-xl"
            >
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover object-center opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101012] via-[#101012]/80 to-[#101012]/50" />
              </div>

              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-semibold tracking-widest text-white">
                      {card.num}
                    </span>
                    <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                      {card.category}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-lg text-white uppercase tracking-tight mb-2">
                    {card.title}
                  </h4>
                  <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
