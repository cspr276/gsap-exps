'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ValueCard {
  id: string;
  category: string;
  title: string;
  desc: string;
  highlight: string;
  cols: string;
  image: string;
}

const VALUES_CARDS: ValueCard[] = [
  {
    id: '01',
    category: 'LEADERSHIP & ENGAGEMENT',
    title: 'Senior Practitioners, Not Handoffs',
    desc: 'Every project is led by senior practitioners who stay involved from initial threat modeling to final release gates. No handoffs to junior replacements halfway through. Leadership here is active, hands-on participation in the work and direct accountability for outcomes.',
    highlight: 'Direct Founder & Principal Involvement',
    cols: 'col-span-12 lg:col-span-7',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '02',
    category: 'ENGINEERING INTEGRITY',
    title: 'Craft Over Shortcuts',
    desc: 'We build deterministic test harnesses, gold-standard rubrics, and automated verifiers designed to remain dependable long after initial launch. Zero throwaway scripts or superficial audit summaries.',
    highlight: 'Deterministic Invariant Longevity',
    cols: 'col-span-12 lg:col-span-5',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '03',
    category: 'TRANSPARENCY',
    title: 'Honest Risk Communication',
    desc: 'We share edge-case vulnerabilities, adversarial exploit chains, and confidence intervals early so engineering leaders make release decisions from unvarnished empirical evidence.',
    highlight: 'Zero Sugarcoating Policy',
    cols: 'col-span-12 md:col-span-6 lg:col-span-4',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '04',
    category: 'OPERATING FOOTPRINT',
    title: 'Remote-First, Global Overlap',
    desc: 'Operating across Europe, Asia, and North America without a single rigid headquarters. Engagements are planned around client timezone overlap, senior availability, and rigorous async documentation.',
    highlight: 'Multi-Region Timezone Overlap',
    cols: 'col-span-12 md:col-span-6 lg:col-span-4',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '05',
    category: 'ECOSYSTEM',
    title: 'Curated Partner Network',
    desc: 'Cloud infrastructure, observability enclaves, and developer tooling relationships validated in enterprise production, deployed only where specialist tooling adds direct client value.',
    highlight: 'Enterprise-Vetted Tooling',
    cols: 'col-span-12 md:col-span-6 lg:col-span-4',
    image: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '06',
    category: 'DELIVERY PHILOSOPHY',
    title: 'Outcome-Driven Delivery at a Sustainable Pace',
    desc: 'Success is measured by reduced production regression deltas and verified containment, not by billing hours or shipping unchecked code. Healthy, focused teams build dependable systems and maintain high velocity without chaotic fire drills.',
    highlight: 'Measurable Production Impact',
    cols: 'col-span-12',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  },
];

// Layout-aligned 3D offsets for clean non-colliding entrance
const CARD_TRAJECTORIES = [
  { x: -50, y: 35, rotateX: 12, rotateZ: -1.5 }, // Card 0: Row 1 Left
  { x: 50, y: 35, rotateX: 12, rotateZ: 1.5 },   // Card 1: Row 1 Right
  { x: -45, y: 35, rotateX: 12, rotateZ: -1.5 }, // Card 2: Row 2 Left
  { x: 0, y: 45, rotateX: 14, rotateZ: 0 },      // Card 3: Row 2 Center (Clean vertical glide)
  { x: 45, y: 35, rotateX: 12, rotateZ: 1.5 },   // Card 4: Row 2 Right
  { x: 0, y: 40, rotateX: 10, rotateZ: 0 },      // Card 5: Row 3 Full Width
];

export default function AboutValuesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const grid = gridRef.current;
      if (!section || !grid) return;

      const cards = gsap.utils.toArray<HTMLElement>('.value-bento-card', grid);
      const mm = gsap.matchMedia();

      // Desktop: natural 1:1 scroll tracking with scrub: true & ease: 'none'
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

      // Mobile
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
      id="values"
      className="relative z-20 w-full bg-white text-neutral-950 py-24 sm:py-32 border-b border-neutral-200 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-12 border-b border-neutral-200 gap-4">
          <div className="max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold block mb-3">
              04 // VALUES & OPERATING CONTEXT
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-neutral-950 tracking-tight leading-tight">
              Values That Shape Every Production Engagement.
            </h2>
          </div>

          <p className="font-sans text-xs sm:text-sm text-neutral-600 max-w-md leading-relaxed">
            We operate with high standards, fast feedback, and transparent communication — keeping momentum high without sacrificing deterministic rigor.
          </p>
        </div>

        {/* Bento Grid with Background Architectural Images and 1:1 Scroll Sync */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-3"
          style={{ perspective: '1200px' }}
        >
          {VALUES_CARDS.map((card) => (
            <div
              key={card.id}
              className={`${card.cols} value-bento-card group relative rounded-md border border-neutral-800 bg-neutral-950 p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl hover:border-neutral-500 transition-[border-color,box-shadow] duration-200 will-change-transform`}
            >
              {/* Background Architectural Image with Dark Gradient Overlay */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="w-full h-full object-cover object-center group-hover:scale-105 opacity-80 group-hover:opacity-90 transition-transform duration-700 ease-out contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/35" />
              </div>

              {/* Foreground Card Content */}
              <div className="relative z-10 flex flex-col justify-between h-full min-h-[220px]">
                <div>
                  {/* Top Row: Index + Category */}
                  <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/15">
                    <span className="font-mono text-xs font-bold text-neutral-300">
                      {card.id}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
                      {card.category}
                    </span>
                  </div>

                  {/* Heading */}
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight leading-snug mb-2.5">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                    {card.desc}
                  </p>
                </div>

                {/* Bottom Feature Line */}
                <div className="mt-6 pt-3.5 border-t border-white/15 flex items-center justify-between font-mono text-xs">
                  <span className="text-neutral-400 uppercase tracking-wider text-[11px]">
                    Standard
                  </span>
                  <span className="font-semibold text-white">
                    {card.highlight}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
