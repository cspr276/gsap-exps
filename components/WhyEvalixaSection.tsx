'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import { ArrowRight, FileCheck, Scale, Users, ShieldCheck, Target, Activity } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TRUST_CARDS = [
  {
    num: '01',
    category: 'EVIDENCE',
    title: 'Auditable Evidence',
    desc: 'Every judgment ships with reviewer notes and reproducible traces.',
    metric: '100% Traceable',
    icon: FileCheck,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    col: 0,
    row: 0
  },
  {
    num: '02',
    category: 'RISK TRIAGE',
    title: 'Severity-Graded Findings',
    desc: 'Failures are triaged by risk band and regression delta.',
    metric: '4-Tier Matrix',
    icon: Scale,
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
    col: 1,
    row: 0
  },
  {
    num: '03',
    category: 'HUMAN BENCHMARK',
    title: 'Calibrated Domain Experts',
    desc: 'Contributors calibrated against gold-standard reference sets.',
    metric: 'Vetted Specialists',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    col: 2,
    row: 0
  },
  {
    num: '04',
    category: 'STATISTICAL RIGOR',
    title: 'Inter-Rater Agreement',
    desc: 'Multiple experts judge each item with dispute adjudication.',
    metric: 'Kappa > 0.85',
    icon: ShieldCheck,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    col: 0,
    row: 1
  },
  {
    num: '05',
    category: 'EXPLOIT COVERAGE',
    title: 'Adversarial Defense',
    desc: 'Prompt-injection and jailbreak suites mapped to severity.',
    metric: 'Automated Gates',
    icon: Target,
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80',
    col: 1,
    row: 1
  },
  {
    num: '06',
    category: 'CONTINUOUS GATES',
    title: 'Regression Monitoring',
    desc: 'Continuous canary evaluations as models and tools change.',
    metric: 'Delta Tracking',
    icon: Activity,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    col: 2,
    row: 1
  }
];

export default function WhyEvalixaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const gallery = galleryRef.current;
      const title = titleRef.current;
      const desc = descRef.current;
      const cta = ctaRef.current;
      if (!section || !gallery || !title || !desc || !cta) return;

      const mm = gsap.matchMedia();

      // Desktop: The True Codrops Sticky Grid Scroll
      mm.add('(min-width: 1024px)', () => {
        // Collect cards by column
        const col0Cards: HTMLDivElement[] = [];
        const col1Cards: HTMLDivElement[] = [];
        const col2Cards: HTMLDivElement[] = [];
        const row0Cards: HTMLDivElement[] = [];
        const row1Cards: HTMLDivElement[] = [];

        cardRefs.current.forEach((el, idx) => {
          if (!el) return;
          const card = TRUST_CARDS[idx];
          if (card.col === 0) col0Cards.push(el);
          if (card.col === 1) col1Cards.push(el);
          if (card.col === 2) col2Cards.push(el);
          if (card.row === 0) row0Cards.push(el);
          if (card.row === 1) row1Cards.push(el);
        });

        // Set initial visible states:
        // Everything is visible and centered nicely right away — NO BLANK SCREEN!
        gsap.set(gallery, { scale: 1, opacity: 1 });
        gsap.set(cardRefs.current, { xPercent: 0, yPercent: 0, opacity: 1, filter: 'blur(0px)' });
        gsap.set(title, { opacity: 0.35, scale: 0.95 });
        gsap.set([desc, cta], { opacity: 0, y: 25, pointerEvents: 'none' });

        // Master Scrub Timeline pinned for 300vh of smooth scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=250%',
            pin: true,
            scrub: 1,
            anticipatePin: 1
          }
        });

        // =====================================================================
        // STAGE 1 (0% -> 40% scroll): Subtle entrance & gentle column float
        // =====================================================================
        tl.to(col0Cards, { y: -30, ease: 'none', duration: 1 }, 0)
          .to(col1Cards, { y: 20, ease: 'none', duration: 1 }, 0)
          .to(col2Cards, { y: -30, ease: 'none', duration: 1 }, 0)
          .to(title, { opacity: 0.7, scale: 1, ease: 'none', duration: 1 }, 0);

        // =====================================================================
        // STAGE 2 (40% -> 80% scroll): CODROPS SIGNATURE ZOOM & LATERAL PARTING
        // Grid zooms to 2.2x, lateral columns part left/right, top/bottom part vertically
        // =====================================================================
        tl.to(
          gallery,
          {
            scale: 2.2,
            ease: 'power1.inOut',
            duration: 1.5
          },
          'zoom-part'
        )
          .to(
            col0Cards,
            {
              xPercent: -55,
              opacity: 0.2,
              filter: 'blur(3px)',
              ease: 'power1.inOut',
              duration: 1.5
            },
            'zoom-part'
          )
          .to(
            col2Cards,
            {
              xPercent: 55,
              opacity: 0.2,
              filter: 'blur(3px)',
              ease: 'power1.inOut',
              duration: 1.5
            },
            'zoom-part'
          )
          .to(
            row0Cards,
            {
              yPercent: -45,
              ease: 'power1.inOut',
              duration: 1.5
            },
            'zoom-part'
          )
          .to(
            row1Cards,
            {
              yPercent: 45,
              ease: 'power1.inOut',
              duration: 1.5
            },
            'zoom-part'
          )
          .to(
            col1Cards,
            {
              opacity: 0.15,
              filter: 'blur(4px)',
              ease: 'power1.inOut',
              duration: 1.5
            },
            'zoom-part'
          );

        // =====================================================================
        // STAGE 3: CENTRAL MANIFESTO & ACTIONS SHINE THROUGH INTO THE OPEN SPACE
        // =====================================================================
        tl.to(
          title,
          {
            opacity: 1,
            scale: 1.05,
            duration: 0.8,
            ease: 'power2.out'
          },
          'zoom-part+=0.3'
        )
          .to(
            desc,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out'
            },
            'zoom-part+=0.5'
          )
          .to(
            cta,
            {
              opacity: 1,
              y: 0,
              pointerEvents: 'all',
              duration: 0.8,
              ease: 'power2.out'
            },
            'zoom-part+=0.7'
          );
      });

      // Mobile: Responsive Clean Stagger
      mm.add('(max-width: 1023px)', () => {
        gsap.from('.why-mobile-grid-card', {
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%'
          }
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="why-evalixa"
      ref={sectionRef}
      className="relative w-full bg-neutral-950 text-white border-t border-neutral-800/80 overflow-hidden"
    >
      {/* ===================================================================== */}
      {/* DESKTOP VIEWPORT STAGE (Sticky 100vh pinned stage)                     */}
      {/* ===================================================================== */}
      <div className="hidden lg:flex relative w-full h-screen items-center justify-center overflow-hidden">
        {/* Subtle Ambient Radial Lighting in Center */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

        {/* =================================================================== */}
        {/* BACKGROUND GALLERY: 3-Column Structured Grid (Codrops Core Engine)  */}
        {/* =================================================================== */}
        <div
          ref={galleryRef}
          className="absolute z-10 w-[840px] max-w-[88vw] grid grid-cols-3 gap-6 pointer-events-none will-change-transform"
        >
          {TRUST_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={card.num}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className="relative rounded-md border border-neutral-800/90 bg-[#121212]/90 p-5 flex flex-col justify-between h-[210px] overflow-hidden shadow-2xl shadow-black/90 will-change-transform"
              >
                {/* Background Image Layer with Dark Overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover object-center opacity-25"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101012] via-[#101012]/80 to-[#101012]/50" />
                </div>

                {/* Card Content */}
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-semibold tracking-widest text-white">
                        {card.num}
                      </span>
                      <span className="font-mono text-[9px] tracking-widest text-neutral-400 uppercase">
                        {card.category}
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-base text-white uppercase tracking-tight mb-1.5 leading-snug">
                      {card.title}
                    </h4>
                    <p className="text-neutral-300 text-[11px] leading-relaxed line-clamp-2 font-normal">
                      {card.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-neutral-400 font-mono text-[10px]">
                    <span className="flex items-center gap-1.5">
                      <Icon className="w-3 h-3 text-white" />
                      {card.metric}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* =================================================================== */}
        {/* FOREGROUND CENTRAL EDITORIAL CONSOLE (Revealed when Grid Parts)     */}
        {/* =================================================================== */}
        <div className="relative z-20 flex flex-col items-center text-center max-w-2xl px-6 pointer-events-none">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 mb-3 block">
            WHY EVALIXA
          </span>

          <h2
            ref={titleRef}
            className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-[1.08] mb-6 drop-shadow-2xl"
          >
            Shaped by Real Outcomes
          </h2>

          <p
            ref={descRef}
            className="text-neutral-200 text-sm sm:text-base lg:text-lg leading-relaxed font-normal mb-8 max-w-xl drop-shadow-md"
          >
            Evalixa AI combines adversarial testing, real-time defense, structured evaluation, and expert data annotation into a unified delivery model. We measure AI where it meets the real world.
          </p>

          <div
            ref={ctaRef}
            className="flex items-center gap-4 pointer-events-auto"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-colors shadow-xl"
            >
              <span>Start an evaluation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#capabilities"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-neutral-700 bg-neutral-900/90 text-neutral-200 font-mono text-xs uppercase tracking-wider font-semibold hover:text-white hover:border-neutral-500 transition-colors shadow-xl"
            >
              <span>Explore services</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MOBILE / TABLET VIEWPORT (Clean responsive stack)                     */}
      {/* ===================================================================== */}
      <div className="lg:hidden px-6 py-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 mb-2 block">
            WHY EVALIXA
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight uppercase mb-4">
            Shaped by Real Outcomes
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Evalixa AI combines adversarial testing, real-time defense, structured evaluation, and expert data annotation into a unified delivery model.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {TRUST_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.num}
                className="why-mobile-grid-card relative rounded-md border border-neutral-800 bg-[#121212] p-6 flex flex-col justify-between min-h-[220px] overflow-hidden"
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
                      <span className="font-mono text-[9px] tracking-widest text-neutral-400 uppercase">
                        {card.category}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight mb-2">
                      {card.title}
                    </h3>
                    <p className="text-neutral-300 text-xs leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-neutral-800 flex items-center justify-between font-mono text-[10px] text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <Icon className="w-3 h-3 text-white" />
                      {card.metric}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold"
          >
            <span>Start an evaluation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
