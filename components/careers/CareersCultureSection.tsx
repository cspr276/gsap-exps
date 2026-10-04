'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface CulturePillar {
  num: string;
  tag: string;
  headline: string;
  desc: string;
  image: string;
  tags: string[];
  colSpan: string;
}

const CULTURE_PILLARS: CulturePillar[] = [
  {
    num: '01',
    tag: 'WORKFLOW & CONTEXT',
    headline: 'Life at Evalixa',
    desc: 'A remote-first engineering culture built around written context, clear ownership, focused demos, and async velocity without minute-by-minute tracking or performative meetings.',
    image: '/careers/life-workspace.jpg',
    tags: ['100% Remote', 'Written Context', 'Async Velocity'],
    colSpan: 'col-span-12 lg:col-span-7',
  },
  {
    num: '02',
    tag: 'SUSTAINABLE PRACTICE',
    headline: 'Practical Benefits',
    desc: 'Competitive compensation, flexible schedules, home-office hardware stipends, comprehensive health coverage, and leave policies engineered for sustainable deep work.',
    image: '/careers/life-wellness.jpg',
    tags: ['Competitive Equity', 'Hardware Stipend', 'Health Coverage'],
    colSpan: 'col-span-12 lg:col-span-5',
  },
  {
    num: '03',
    tag: 'CRAFT DEPTH',
    headline: 'Professional Growth',
    desc: 'Direct collaboration with senior founders and PhD domain fellows, conference and publication sponsorships, and career progression anchored purely in demonstrated technical leverage.',
    image: '/careers/life-growth.jpg',
    tags: ['PhD Domain Fellows', 'Research Grants', 'Merit Progression'],
    colSpan: 'col-span-12 lg:col-span-5',
  },
  {
    num: '04',
    tag: 'AUTONOMY & IMPACT',
    headline: 'High-Agency Ownership',
    desc: 'Small autonomous pods deploying deterministic evaluation pipelines and production infrastructure directly to frontier models and enterprise partners worldwide.',
    image: '/careers/life-collaboration.jpg',
    tags: ['High Agency Pods', 'Direct Deployment', 'Zero Bureaucracy'],
    colSpan: 'col-span-12 lg:col-span-7',
  },
];

// Layout-aligned 3D trajectory offsets matching bento grid geometry (exact match to home page WhyEvalixaSection)
const CARD_TRAJECTORIES = [
  { x: -50, y: 35, rotateX: 12, rotateZ: -1.5 }, // Card 0: Row 1 Left (7 cols)
  { x: 50, y: 35, rotateX: 12, rotateZ: 1.5 },   // Card 1: Row 1 Right (5 cols)
  { x: -45, y: 35, rotateX: 12, rotateZ: -1.5 }, // Card 2: Row 2 Left (5 cols)
  { x: 45, y: 35, rotateX: 12, rotateZ: 1.5 },   // Card 3: Row 2 Right (7 cols)
];

export default function CareersCultureSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const grid = gridRef.current;
      if (!section || !grid) return;

      // Header entrance animation with 1:1 scrub (scrolls down and vice versa)
      gsap.fromTo(
        '.culture-header',
        { y: 35, opacity: 0.2 },
        {
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.culture-header',
            start: 'top 92%',
            end: 'top 65%',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      const cards = gsap.utils.toArray<HTMLElement>('.bento-culture-card', grid);
      const mm = gsap.matchMedia();

      // Desktop: natural 1:1 scroll tracking with scrub: true & ease: 'none' (scrolls down and vice versa too)
      mm.add('(min-width: 768px)', () => {
        cards.forEach((card, idx) => {
          const trajectory = CARD_TRAJECTORIES[idx] || { x: 0, y: 35, rotateX: 10, rotateZ: 0 };
          gsap.fromTo(
            card,
            {
              x: trajectory.x,
              y: trajectory.y,
              rotateX: trajectory.rotateX,
              rotateZ: trajectory.rotateZ,
              opacity: 0.15,
            },
            {
              x: 0,
              y: 0,
              rotateX: 0,
              rotateZ: 0,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                end: 'top 58%',
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        });
      });

      // Mobile: natural vertical scrub (scrolls down and vice versa too)
      mm.add('(max-width: 767px)', () => {
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 30, opacity: 0.2 },
            {
              y: 0,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                end: 'top 65%',
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-20 w-full py-20 sm:py-28 bg-[#fbfbfb] text-neutral-900 border-b border-neutral-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="culture-header max-w-3xl mb-12 sm:mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold block mb-3">
            LIFE, BENEFITS & GROWTH
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-neutral-950 tracking-tight leading-tight mb-4">
            Built for Focused Craft and Sustainable Velocity.
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            We operate with a startup mindset: fast feedback, transparent communication, and delivery cycles designed to keep momentum high without sacrificing engineering depth.
          </p>
        </div>

        {/* Bento Grid Layout with 1:1 Scroll Sync */}
        <div
          ref={gridRef}
          className="grid grid-cols-12 gap-5 sm:gap-6 pt-8 border-t border-neutral-200/90 items-stretch"
          style={{ perspective: '1200px' }}
        >
          {CULTURE_PILLARS.map((pillar) => {
            return (
              <div
                key={pillar.num}
                className={`bento-culture-card group relative ${pillar.colSpan} min-h-[380px] sm:min-h-[420px] rounded-2xl overflow-hidden border border-neutral-800/80 bg-neutral-950 p-6 sm:p-8 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:border-neutral-600 transition-[border-color,box-shadow] duration-500 will-change-transform`}
              >
                {/* Background Lifestyle Image with Contrast Overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
                  <Image
                    src={pillar.image}
                    alt={pillar.headline}
                    fill
                    sizes="(max-width: 1024px) 100vw, 650px"
                    className="w-full h-full object-cover object-center group-hover:scale-105 brightness-[0.7] group-hover:brightness-[0.82] contrast-[1.08] transition-all duration-700 ease-out"
                  />
                  {/* Subtle Multi-Stop Gradient for Optimal Text Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/65 to-black/35 pointer-events-none" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none" />
                </div>

                {/* Foreground Card Content — Clean Layout Without Inner Borders or Icons */}
                <div className="relative z-10 flex flex-col justify-between h-full">
                  {/* Top Row: Clean Unboxed Number & Category Tag (NO inner border, NO icon) */}
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs sm:text-sm font-semibold text-neutral-400">
                      {pillar.num}
                    </span>
                    <span className="text-neutral-500 text-xs font-mono">•</span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-300 font-semibold">
                      {pillar.tag}
                    </span>
                  </div>

                  {/* Middle: Headline & Description */}
                  <div className="my-auto py-5 sm:py-6">
                    <h3 className="font-display font-bold text-white tracking-tight text-xl sm:text-2xl lg:text-3xl leading-snug mb-3 group-hover:text-neutral-100 transition-colors drop-shadow-sm">
                      {pillar.headline}
                    </h3>
                    <p className="font-sans text-neutral-200 text-xs sm:text-sm lg:text-base leading-relaxed max-w-xl font-normal drop-shadow-xs">
                      {pillar.desc}
                    </p>
                  </div>

                  {/* Bottom: Clean Unboxed Text Items (NO inner border, NO box/pill containers) */}
                  <div className="pt-4 flex flex-wrap items-center gap-x-3.5 gap-y-2 mt-auto">
                    {pillar.tags.map((tag, idx) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs text-neutral-300 font-medium tracking-wide"
                      >
                        {idx > 0 && <span className="text-neutral-500 select-none">•</span>}
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
