'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import { ArrowRight, FileCheck, Scale, Users, ShieldCheck, Target, Activity } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PROOF_CARDS = [
  {
    num: '01',
    category: 'EVIDENCE & TRACE',
    title: 'Auditable Evidence',
    desc: 'Every judgment ships with reviewer notes, agreement scores, and reproducible traces you can inspect and defend.',
    metric: '100% Re-runnable Traces',
    icon: FileCheck,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
  },
  {
    num: '02',
    category: 'RISK TRIAGE',
    title: 'Severity-Graded Findings',
    desc: 'Failures are triaged by risk band and regression delta, so your engineering team fixes what actually matters first.',
    metric: '4-Tier Risk Taxonomy',
    icon: Scale,
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80'
  },
  {
    num: '03',
    category: 'HUMAN BENCHMARK',
    title: 'Calibrated Domain Experts',
    desc: 'Contributors are verified by expertise and calibrated against gold-standard sets before touching production work.',
    metric: 'Domain-Calibrated Specialists',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80'
  },
  {
    num: '04',
    category: 'STATISTICAL RIGOR',
    title: 'Inter-Rater Agreement',
    desc: 'Multiple experts judge each item; we report statistical agreement and adjudicate disputes so findings hold up to scrutiny.',
    metric: "Cohen's Kappa > 0.85",
    icon: ShieldCheck,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'
  },
  {
    num: '05',
    category: 'EXPLOIT COVERAGE',
    title: 'Adversarial Defense',
    desc: 'Prompt-injection, jailbreak, and data-exfiltration suites mapped to severity bands — measured, not guessed.',
    metric: 'Continuous Exploit Gates',
    icon: Target,
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80'
  },
  {
    num: '06',
    category: 'CONTINUOUS GATES',
    title: 'Regression Monitoring',
    desc: 'Automated delta alerts and regression runs as your models, prompts, and tools change over time.',
    metric: 'Automated Delta Tracking',
    icon: Activity,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'
  }
];

export default function WhyEvalixaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const mm = gsap.matchMedia();

      // =========================================================================
      // Desktop: 3D Curved Horizon Stream with continuous rotational perspective
      // =========================================================================
      mm.add('(min-width: 1024px)', () => {
        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
        if (cards.length === 0) return;

        const updateCard3DTransforms = () => {
          const viewportCenter = window.innerWidth / 2;
          let closestIdx = 0;
          let minDistance = Infinity;

          cards.forEach((card, idx) => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;
            const distFromCenter = cardCenter - viewportCenter;
            const normDist = distFromCenter / (window.innerWidth * 0.45);
            const clampedNorm = Math.max(-1.5, Math.min(1.5, normDist));

            // Calculate active index
            const absDist = Math.abs(distFromCenter);
            if (absDist < minDistance) {
              minDistance = absDist;
              closestIdx = idx;
            }

            // 3D Horizon Arc Geometry:
            // Center card faces flat (0deg), lateral cards curve inward towards viewer
            const rotateY = -clampedNorm * 26;
            // Push lateral cards back into depth
            const z = -Math.pow(Math.abs(clampedNorm), 1.4) * 140;
            // Center card scales up subtly, lateral cards scale down
            const scale = 1 - Math.min(0.18, Math.pow(Math.abs(clampedNorm), 1.2) * 0.18);
            // Lateral cards soften opacity
            const opacity = 1 - Math.min(0.5, Math.pow(Math.abs(clampedNorm), 1.1) * 0.5);

            gsap.set(card, {
              rotateY,
              z,
              scale,
              opacity,
              transformPerspective: 1400,
              transformOrigin: '50% 50%',
              willChange: 'transform, opacity'
            });
          });

          setActiveIndex(closestIdx);
        };

        // Calculate total scroll travel needed to pan card 0 to card 5 across center
        const getScrollDistance = () => {
          const firstCard = cards[0];
          const lastCard = cards[cards.length - 1];
          if (!firstCard || !lastCard) return 2400;
          return lastCard.offsetLeft - firstCard.offsetLeft;
        };

        const totalScrollDistance = getScrollDistance();

        // Initial setup
        updateCard3DTransforms();

        // Master Pinned Scroll Timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${totalScrollDistance + 400}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: updateCard3DTransforms
          }
        });

        tl.to(track, {
          x: () => -totalScrollDistance,
          ease: 'none'
        });
      });

      // =========================================================================
      // Mobile / Tablet: Clean Staggered Cards
      // =========================================================================
      mm.add('(max-width: 1023px)', () => {
        cardRefs.current.forEach((card) => {
          if (!card) return;
          gsap.fromTo(
            card,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
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
      className="relative w-full bg-neutral-950 text-white border-t border-neutral-800/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pt-28 pb-10 lg:pt-32 lg:pb-12 flex flex-col items-center text-center">
        {/* Pinned Section Header */}
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 mb-3 block">
          WHY EVALIXA
        </span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase leading-[1.15] mb-4 max-w-4xl">
          Shaped by Real Outcomes
        </h2>
        <p className="text-neutral-400 text-xs sm:text-sm lg:text-base leading-relaxed font-normal max-w-2xl">
          Evalixa AI combines adversarial testing, real-time defense, structured evaluation, and expert data annotation into a unified delivery model. We measure AI where it meets the real world.
        </p>
      </div>

      {/* ===================================================================== */}
      {/* DESKTOP: 3D CURVED HORIZON PERSPECTIVE RUNWAY                         */}
      {/* ===================================================================== */}
      <div
        className="hidden lg:block relative w-full overflow-hidden pb-16 pt-6"
        style={{ perspective: '1400px', perspectiveOrigin: '50% 50%' }}
      >
        {/* Curved Track: Card 0 starts centered with left padding */}
        <div
          ref={trackRef}
          className="flex items-center gap-10 pl-[calc(50vw-230px)] pr-[calc(50vw-230px)] will-change-transform"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {PROOF_CARDS.map((card, idx) => {
            const Icon = card.icon;
            const isCenter = activeIndex === idx;

            return (
              <div
                key={card.num}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className="w-[440px] lg:w-[460px] h-[380px] sm:h-[400px] flex-shrink-0 cursor-default select-none"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <SpotlightCard
                  spotlightColor="rgba(255, 255, 255, 0.12)"
                  className={`group/card relative w-full h-full rounded-md border p-8 sm:p-9 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 ${
                    isCenter
                      ? 'border-white/40 bg-[#141414] shadow-black/90 ring-1 ring-white/20'
                      : 'border-neutral-800/80 bg-[#101010]/90 hover:border-neutral-700'
                  }`}
                >
                  {/* Dark Background Texture with Gradient Overlay */}
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <img
                      src={card.image}
                      alt={card.title}
                      className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${
                        isCenter
                          ? 'opacity-30 scale-105'
                          : 'opacity-20 group-hover/card:opacity-30'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101012] via-[#101012]/80 to-[#101012]/50" />
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      {/* Monospace Header */}
                      <div className="flex items-center justify-between mb-5">
                        <span className="font-mono text-sm font-semibold tracking-widest text-white uppercase">
                          {card.num}
                        </span>
                        <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                          {card.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display font-bold text-2xl text-white uppercase tracking-tight mb-3 leading-snug">
                        {card.title}
                      </h3>

                      {/* Description */}
                      <p className="text-neutral-300 text-sm leading-relaxed font-normal">
                        {card.desc}
                      </p>
                    </div>

                    {/* Bottom Deliverable Metric */}
                    <div className="pt-5 border-t border-neutral-800/90 flex items-center justify-between">
                      <span className="font-mono text-xs text-neutral-200 flex items-center gap-2">
                        <Icon className="w-4 h-4 text-white" />
                        {card.metric}
                      </span>
                      <span
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          isCenter ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-neutral-800'
                        }`}
                      />
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            );
          })}
        </div>

        {/* 3D Horizon HUD: Active Stage & Interactive Step Navigation */}
        <div className="max-w-4xl mx-auto mt-10 px-6 flex items-center justify-between border-t border-neutral-800/80 pt-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
              ACTIVE PROOF POINT:
            </span>
            <span className="font-mono text-xs font-semibold text-white">
              {PROOF_CARDS[activeIndex].num} / 06 — {PROOF_CARDS[activeIndex].title}
            </span>
          </div>

          {/* Step Pill Indicators */}
          <div className="flex items-center gap-2">
            {PROOF_CARDS.map((c, i) => (
              <span
                key={c.num}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  activeIndex === i ? 'w-8 bg-white' : 'w-2 bg-neutral-800'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MOBILE / TABLET: Clean Responsive List                                */}
      {/* ===================================================================== */}
      <div className="lg:hidden px-6 pb-20 space-y-6">
        {PROOF_CARDS.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={card.num}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="relative rounded-md border border-neutral-800/90 bg-[#121212] p-7 flex flex-col justify-between min-h-[260px] overflow-hidden shadow-xl"
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
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-semibold tracking-widest text-white">
                      {card.num}
                    </span>
                    <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                      {card.category}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-white uppercase tracking-tight mb-2">
                    {card.title}
                  </h3>
                  <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-800 flex items-center justify-between font-mono text-xs text-neutral-300">
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-white" />
                    {card.metric}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        <div className="mt-8 text-center pt-4">
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
