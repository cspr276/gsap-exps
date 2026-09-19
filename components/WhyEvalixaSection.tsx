'use client';

import React, { useRef } from 'react';
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

const CARD_WIDTH = 460;
const CARD_GAP = 40;

export default function WhyEvalixaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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

        // Total distance needed to translate track from Card 0 centered to Card 5 centered
        const totalScrollDistance = (cards.length - 1) * (CARD_WIDTH + CARD_GAP);

        const updateCard3DTransforms = () => {
          const viewportCenter = window.innerWidth / 2;

          cards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;
            const distFromCenter = cardCenter - viewportCenter;
            const normDist = distFromCenter / (window.innerWidth * 0.45);
            const clampedNorm = Math.max(-1.5, Math.min(1.5, normDist));

            // Inward 3D curve: center card faces flat (0deg), lateral cards angle inward
            const rotateY = -clampedNorm * 25;
            // Push lateral cards back into Z-depth
            const z = -Math.pow(Math.abs(clampedNorm), 1.4) * 120;
            // Center card is scale 1.0, lateral cards scale down slightly
            const scale = 1 - Math.min(0.15, Math.pow(Math.abs(clampedNorm), 1.2) * 0.15);
            // Lateral cards soften opacity
            const opacity = 1 - Math.min(0.5, Math.pow(Math.abs(clampedNorm), 1.1) * 0.5);

            gsap.set(card, {
              rotateY,
              z,
              scale,
              opacity,
              transformPerspective: 1200,
              transformOrigin: '50% 50%'
            });
          });
        };

        // Master Pinned Scroll Timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${totalScrollDistance}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: updateCard3DTransforms
          }
        });

        // Translate track smoothly along X axis
        tl.to(track, {
          x: -totalScrollDistance,
          ease: 'none'
        });

        // Initial setup pass
        updateCard3DTransforms();
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
      className="relative z-20 w-full min-h-screen h-screen bg-neutral-950 text-white border-t border-neutral-800/80 overflow-hidden flex flex-col justify-between py-16 sm:py-20 lg:py-22"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 flex flex-col items-center text-center flex-shrink-0">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 mb-2 block">
          WHY EVALIXA
        </span>
        <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white tracking-tight uppercase leading-[1.15] mb-3 max-w-4xl">
          Shaped by Real Outcomes
        </h2>
        <p className="text-neutral-400 text-xs sm:text-sm lg:text-[15px] leading-relaxed font-normal max-w-2xl">
          Evalixa AI combines adversarial testing, real-time defense, structured evaluation, and expert data annotation into a unified delivery model. We measure AI where it meets the real world.
        </p>
      </div>

      {/* ===================================================================== */}
      {/* DESKTOP: 3D CURVED HORIZON PERSPECTIVE RUNWAY                         */}
      {/* ===================================================================== */}
      <div
        className="hidden lg:block relative w-full overflow-hidden my-auto py-8"
        style={{ perspective: '1200px', perspectiveOrigin: '50% 50%' }}
      >
        {/* Curved Track: Card 0 starts centered with padding: calc(50vw - 230px) */}
        <div
          ref={trackRef}
          className="flex items-center gap-10 pl-[calc(50vw-230px)] pr-[calc(50vw-230px)] will-change-transform"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {PROOF_CARDS.map((card, idx) => {
            const Icon = card.icon;

            return (
              <div
                key={card.num}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className="w-[440px] lg:w-[460px] h-[360px] sm:h-[380px] flex-shrink-0 cursor-default select-none will-change-transform"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <SpotlightCard
                  spotlightColor="rgba(255, 255, 255, 0.12)"
                  className="group/card relative w-full h-full rounded-md border border-neutral-800/90 bg-[#121212] p-8 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 hover:border-neutral-700"
                >
                  {/* Dark Background Texture with Gradient Overlay */}
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover object-center transition-all duration-700 ease-out opacity-25 group-hover/card:opacity-35 group-hover/card:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101012] via-[#101012]/80 to-[#101012]/50" />
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      {/* Monospace Header */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-sm font-semibold tracking-widest text-white uppercase">
                          {card.num}
                        </span>
                        <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                          {card.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white uppercase tracking-tight mb-3 leading-snug">
                        {card.title}
                      </h3>

                      {/* Description */}
                      <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-normal">
                        {card.desc}
                      </p>
                    </div>

                    {/* Bottom Deliverable Metric */}
                    <div className="pt-4 border-t border-neutral-800/90 flex items-center justify-between">
                      <span className="font-mono text-xs text-neutral-200 flex items-center gap-2">
                        <Icon className="w-4 h-4 text-white" />
                        {card.metric}
                      </span>
                      <ArrowRight className="w-4 h-4 text-neutral-500 -rotate-45 group-hover/card:rotate-0 group-hover/card:text-white transition-all duration-300" />
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MOBILE / TABLET: Clean Responsive List                                */}
      {/* ===================================================================== */}
      <div className="lg:hidden px-6 pb-12 space-y-6">
        {PROOF_CARDS.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={card.num}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="relative rounded-md border border-neutral-800/90 bg-[#121212] p-7 flex flex-col justify-between min-h-[240px] overflow-hidden shadow-xl"
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
                  <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight mb-2">
                    {card.title}
                  </h3>
                  <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-neutral-800 flex items-center justify-between font-mono text-xs text-neutral-300">
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
