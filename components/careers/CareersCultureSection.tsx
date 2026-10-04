'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Terminal, ShieldCheck, TrendingUp } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CULTURE_PILLARS = [
  {
    num: '01',
    tag: 'WORKFLOW & CONTEXT',
    headline: 'Life at Evalixa',
    desc: 'A remote-first engineering culture built around written context, clear ownership, focused demos, and async velocity without minute-by-minute tracking or performative meetings.',
    image: '/services/reality-01.jpg',
    icon: Terminal,
    tags: ['100% Remote', 'Written Context', 'Async Velocity'],
  },
  {
    num: '02',
    tag: 'SUSTAINABLE PRACTICE',
    headline: 'Practical Benefits',
    desc: 'Competitive compensation, flexible schedules, home-office hardware stipends, comprehensive health coverage, and leave policies engineered for sustainable deep work.',
    image: '/services/hero-datacenter.jpg',
    icon: ShieldCheck,
    tags: ['Competitive Equity', 'Hardware Stipend', 'Health Coverage'],
  },
  {
    num: '03',
    tag: 'CRAFT DEPTH',
    headline: 'Professional Growth',
    desc: 'Direct collaboration with senior founders and PhD domain fellows, conference and publication sponsorships, and career progression anchored purely in demonstrated technical leverage.',
    image: '/cards/card_06.jpg',
    icon: TrendingUp,
    tags: ['PhD Domain Fellows', 'Research Grants', 'Merit Progression'],
  },
];

export default function CareersCultureSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('.culture-card');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0.2 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              end: 'top 60%',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
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
        <div className="max-w-3xl mb-12">
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

        {/* 3 Compact Editorial Cards with Image Background & Clean Direct Icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-neutral-200/90">
          {CULTURE_PILLARS.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <div
                key={pillar.num}
                className="culture-card group relative rounded-lg border border-neutral-200/90 bg-neutral-950 p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl hover:border-neutral-500 transition-[border-color,box-shadow] duration-300 will-change-transform"
              >
                {/* Background Image with Dark Gradient Overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <Image
                    src={pillar.image}
                    alt={pillar.headline}
                    fill
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="w-full h-full object-cover object-center group-hover:scale-105 opacity-80 group-hover:opacity-90 transition-transform duration-700 ease-out contrast-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40" />
                </div>

                {/* Foreground Card Content */}
                <div className="relative z-10 flex flex-col justify-between h-full min-h-[300px]">
                  <div>
                    {/* Top Row: Number, Tag, and Clean Icon (NO box around icon) */}
                    <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/15">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold text-white bg-white/15 px-2 py-0.5 rounded border border-white/20">
                          {pillar.num}
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-300 font-semibold">
                          {pillar.tag}
                        </span>
                      </div>
                      {/* Clean icon without any box around it */}
                      <Icon className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
                    </div>

                    {/* Heading */}
                    <h3 className="font-display font-bold text-white tracking-tight mb-3 text-xl sm:text-2xl leading-snug">
                      {pillar.headline}
                    </h3>

                    {/* Description */}
                    <p className="text-neutral-300 font-normal leading-relaxed text-xs sm:text-sm">
                      {pillar.desc}
                    </p>
                  </div>

                  {/* Bottom Technical Telemetry Chips */}
                  <div className="pt-5 border-t border-white/10 flex flex-wrap gap-1.5 mt-6">
                    {pillar.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] px-2.5 py-1 rounded bg-white/10 border border-white/15 text-neutral-300 backdrop-blur-xs"
                      >
                        {tag}
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
