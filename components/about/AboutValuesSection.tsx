'use client';

import React, { useRef } from 'react';
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
  initialY: number;
  initialRotateX: number;
}

const VALUES_CARDS: ValueCard[] = [
  {
    id: '01',
    category: 'LEADERSHIP & ENGAGEMENT',
    title: 'Senior Practitioners, Not Handoffs',
    desc: 'Every project is led by senior practitioners who stay involved from initial threat modeling to final release gates. No handoffs to junior replacements halfway through. Leadership here is active, hands-on participation in the work and direct accountability for outcomes.',
    highlight: 'Direct Founder & Principal Involvement',
    cols: 'col-span-12 lg:col-span-7',
    initialY: -100,
    initialRotateX: 12,
  },
  {
    id: '02',
    category: 'ENGINEERING INTEGRITY',
    title: 'Craft Over Shortcuts',
    desc: 'We build deterministic test harnesses, gold-standard rubrics, and automated verifiers designed to remain dependable long after initial launch. Zero throwaway scripts or superficial audit summaries.',
    highlight: 'Deterministic Invariant Longevity',
    cols: 'col-span-12 lg:col-span-5',
    initialY: -140,
    initialRotateX: 16,
  },
  {
    id: '03',
    category: 'TRANSPARENCY',
    title: 'Honest Risk Communication',
    desc: 'We share edge-case vulnerabilities, adversarial exploit chains, and confidence intervals early so engineering leaders make release decisions from unvarnished empirical evidence.',
    highlight: 'Zero Sugarcoating Policy',
    cols: 'col-span-12 md:col-span-6 lg:col-span-4',
    initialY: -110,
    initialRotateX: 10,
  },
  {
    id: '04',
    category: 'OPERATING FOOTPRINT',
    title: 'Remote-First, Global Overlap',
    desc: 'Operating across Europe, Asia, and North America without a single rigid headquarters. Engagements are planned around client timezone overlap, senior availability, and rigorous async documentation.',
    highlight: 'Multi-Region Timezone Overlap',
    cols: 'col-span-12 md:col-span-6 lg:col-span-4',
    initialY: -80,
    initialRotateX: 8,
  },
  {
    id: '05',
    category: 'ECOSYSTEM',
    title: 'Curated Partner Network',
    desc: 'Cloud infrastructure, observability enclaves, and developer tooling relationships validated in enterprise production, deployed only where specialist tooling adds direct client value.',
    highlight: 'Enterprise-Vetted Tooling',
    cols: 'col-span-12 md:col-span-6 lg:col-span-4',
    initialY: -130,
    initialRotateX: 14,
  },
  {
    id: '06',
    category: 'DELIVERY PHILOSOPHY',
    title: 'Outcome-Driven Delivery at a Sustainable Pace',
    desc: 'Success is measured by reduced production regression deltas and verified containment, not by billing hours or shipping unchecked code. Healthy, focused teams build dependable systems and maintain high velocity without chaotic fire drills.',
    highlight: 'Measurable Production Impact',
    cols: 'col-span-12',
    initialY: -90,
    initialRotateX: 10,
  },
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

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        cards.forEach((card, idx) => {
          const cardConfig = VALUES_CARDS[idx];
          const initialY = cardConfig ? cardConfig.initialY : -100;
          const initialRotate = cardConfig ? cardConfig.initialRotateX : 10;

          // Bi-directional scrubbed falling animation:
          // Scrolling down: cards fall smoothly into place
          // Scrolling up: cards lift smoothly back up
          gsap.fromTo(
            card,
            {
              y: initialY,
              rotateX: initialRotate,
              opacity: 0.25,
            },
            {
              y: 0,
              rotateX: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 20%',
                scrub: 0.8,
              },
            }
          );
        });
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(cards, { y: 0, rotateX: 0, opacity: 1 });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="values"
      className="relative z-20 w-full bg-[#fafafa] text-neutral-950 py-24 sm:py-32 border-b border-neutral-200 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-14 border-b border-neutral-200 gap-4">
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

        {/* Bento Grid with Falling-Into-Place Scrubbed Scroll */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6"
          style={{ perspective: '1200px' }}
        >
          {VALUES_CARDS.map((card) => (
            <div
              key={card.id}
              className={`${card.cols} value-bento-card group rounded-md border border-neutral-200/90 bg-white hover:border-neutral-400 hover:shadow-lg transition-all duration-300 p-7 sm:p-8 flex flex-col justify-between shadow-xs will-change-transform`}
            >
              <div>
                {/* Top Row: Index + Category */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-neutral-100">
                  <span className="font-mono text-xs font-bold text-neutral-900">
                    {card.id}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 font-semibold">
                    {card.category}
                  </span>
                </div>

                {/* Heading */}
                <h3 className="font-display font-bold text-lg sm:text-xl text-neutral-950 tracking-tight leading-snug mb-3">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  {card.desc}
                </p>
              </div>

              {/* Bottom Feature Line */}
              <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between font-mono text-xs">
                <span className="text-neutral-400 uppercase tracking-wider text-[11px]">
                  Standard
                </span>
                <span className="font-semibold text-neutral-900">
                  {card.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
