'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import { ArrowRight, FileCheck, Scale, Users, ShieldCheck, Target, Activity } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const LEFT_CARDS = [
  {
    num: '01',
    tag: 'REPRODUCIBLE TRACES',
    title: 'Auditable Evidence',
    desc: 'Every judgment ships with reviewer notes, agreement scores, and reproducible traces you can inspect and defend.',
    metric: '100% Re-runnable Traces',
    icon: FileCheck,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
  },
  {
    num: '02',
    tag: 'STATISTICAL RIGOR',
    title: 'Inter-Rater Agreement',
    desc: 'Multiple domain experts judge each item; we report statistical agreement and adjudicate disputes so findings hold up to audit scrutiny.',
    metric: "Cohen's Kappa > 0.85",
    icon: ShieldCheck,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'
  }
];

const RIGHT_CARDS = [
  {
    num: '03',
    tag: 'RISK TAXONOMY',
    title: 'Severity-Graded Findings',
    desc: 'Failures are triaged by risk band and regression delta, so your engineering team fixes what actually matters first.',
    metric: '4-Tier Severity Matrix',
    icon: Scale,
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80'
  },
  {
    num: '04',
    tag: 'EXPLOIT COVERAGE',
    title: 'Adversarial Defense',
    desc: 'Prompt-injection, jailbreak, and data-exfiltration suites mapped to severity bands — measured, not guessed.',
    metric: 'Automated Exploit Gates',
    icon: Target,
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80'
  }
];

const BOTTOM_HIGHLIGHTS = [
  {
    num: '05',
    title: 'Calibrated Domain Experts',
    desc: 'Specialists verified and calibrated against gold-standard sets before touching production work.',
    icon: Users
  },
  {
    num: '06',
    title: 'Regression Monitoring',
    desc: 'Continuous canary evaluations and regression runs as your models and prompts change.',
    icon: Activity
  }
];

export default function WhyEvalixaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const centerColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const leftCol = leftColRef.current;
      const rightCol = rightColRef.current;
      const centerCol = centerColRef.current;
      if (!section || !leftCol || !rightCol || !centerCol) return;

      const mm = gsap.matchMedia();

      // Desktop: Smooth pinned alternating parallax scroll
      mm.add('(min-width: 1024px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 1,
            anticipatePin: 1
          }
        });

        // Alternating vertical column glide: Left slides up, Right slides down, Center stays grounded
        tl.to(leftCol, { y: -70, ease: 'none' }, 0)
          .to(rightCol, { y: 70, ease: 'none' }, 0)
          .to(centerCol, { scale: 1.02, ease: 'none' }, 0);
      });

      // Mobile / Tablet: Smooth reveal of cards on scroll
      mm.add('(max-width: 1023px)', () => {
        gsap.from('.why-mobile-card', {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%'
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
      className="relative w-full bg-neutral-950 text-white border-t border-neutral-800/80"
    >
      <div
        ref={pinWrapperRef}
        className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pt-28 pb-20 lg:py-28 min-h-screen flex flex-col justify-center"
      >
        {/* Section Eyebrow */}
        <div className="text-center mb-10 lg:mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 mb-2 block">
            WHY EVALIXA
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight uppercase">
            Shaped by Real Outcomes
          </h2>
        </div>

        {/* 3-Column Structured Layout (Sticky Grid Architecture) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* ================================================================= */}
          {/* LEFT COLUMN: 2 Proof Cards                                       */}
          {/* ================================================================= */}
          <div
            ref={leftColRef}
            className="lg:col-span-4 flex flex-col space-y-6 will-change-transform"
          >
            {LEFT_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <SpotlightCard
                  key={card.num}
                  spotlightColor="rgba(255, 255, 255, 0.08)"
                  className="why-mobile-card group/card relative rounded-md border border-neutral-800/90 bg-[#121212] p-7 sm:p-8 flex flex-col justify-between overflow-hidden shadow-xl hover:border-neutral-700 transition-all min-h-[260px]"
                >
                  {/* Background Image Layer with Dark Overlay */}
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover object-center group-hover/card:scale-105 opacity-20 group-hover/card:opacity-30 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101012] via-[#101012]/85 to-[#101012]/50" />
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-xs font-semibold tracking-widest text-white">
                          {card.num}
                        </span>
                        <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                          {card.tag}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-xl text-white uppercase tracking-tight mb-2 leading-snug">
                        {card.title}
                      </h3>
                      <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                        {card.desc}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-neutral-800/80 flex items-center justify-between">
                      <span className="font-mono text-[11px] text-neutral-300 flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5 text-white" />
                        {card.metric}
                      </span>
                    </div>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>

          {/* ================================================================= */}
          {/* CENTER COLUMN: Authoritative Editorial Console                     */}
          {/* ================================================================= */}
          <div
            ref={centerColRef}
            className="lg:col-span-4 rounded-md border border-neutral-800/90 bg-[#121212] p-8 sm:p-9 flex flex-col justify-between min-h-[380px] lg:min-h-[540px] shadow-2xl shadow-black/80 relative overflow-hidden will-change-transform"
          >
            {/* Subtle Top Accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />

            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-400">
                  EVIDENCE & ASSURANCE
                </span>
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight uppercase leading-snug mb-4">
                AI Security & Evaluation Unified
              </h3>

              <p className="text-neutral-300 text-sm leading-relaxed mb-6 font-normal">
                Evalixa combines adversarial testing, real-time defense, structured evaluation, and expert data annotation into a unified delivery model. We measure AI where it meets the real world.
              </p>

              {/* Real Proof Pillars */}
              <div className="space-y-4 pt-4 border-t border-neutral-800/80">
                {BOTTOM_HIGHLIGHTS.map((h) => {
                  const Icon = h.icon;
                  return (
                    <div key={h.num} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded border border-neutral-800 bg-neutral-900 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-mono text-xs font-semibold text-white uppercase tracking-wider">
                          {h.title}
                        </h4>
                        <p className="text-neutral-400 text-xs leading-relaxed mt-0.5">
                          {h.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 mt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-colors"
              >
                <span>Start Evaluation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* ================================================================= */}
          {/* RIGHT COLUMN: 2 Assurance Cards                                   */}
          {/* ================================================================= */}
          <div
            ref={rightColRef}
            className="lg:col-span-4 flex flex-col space-y-6 will-change-transform"
          >
            {RIGHT_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <SpotlightCard
                  key={card.num}
                  spotlightColor="rgba(255, 255, 255, 0.08)"
                  className="why-mobile-card group/card relative rounded-md border border-neutral-800/90 bg-[#121212] p-7 sm:p-8 flex flex-col justify-between overflow-hidden shadow-xl hover:border-neutral-700 transition-all min-h-[260px]"
                >
                  {/* Background Image Layer with Dark Overlay */}
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover object-center group-hover/card:scale-105 opacity-20 group-hover/card:opacity-30 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101012] via-[#101012]/85 to-[#101012]/50" />
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-xs font-semibold tracking-widest text-white">
                          {card.num}
                        </span>
                        <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                          {card.tag}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-xl text-white uppercase tracking-tight mb-2 leading-snug">
                        {card.title}
                      </h3>
                      <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                        {card.desc}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-neutral-800/80 flex items-center justify-between">
                      <span className="font-mono text-[11px] text-neutral-300 flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5 text-white" />
                        {card.metric}
                      </span>
                    </div>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
