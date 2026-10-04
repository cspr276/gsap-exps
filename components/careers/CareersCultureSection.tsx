'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Terminal, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface CulturePillar {
  num: string;
  tag: string;
  headline: string;
  desc: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
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
    icon: Terminal,
    tags: ['100% Remote', 'Written Context', 'Async Velocity'],
    colSpan: 'col-span-12 lg:col-span-7',
  },
  {
    num: '02',
    tag: 'SUSTAINABLE PRACTICE',
    headline: 'Practical Benefits',
    desc: 'Competitive compensation, flexible schedules, home-office hardware stipends, comprehensive health coverage, and leave policies engineered for sustainable deep work.',
    image: '/careers/life-wellness.jpg',
    icon: ShieldCheck,
    tags: ['Competitive Equity', 'Hardware Stipend', 'Health Coverage'],
    colSpan: 'col-span-12 lg:col-span-5',
  },
  {
    num: '03',
    tag: 'CRAFT DEPTH',
    headline: 'Professional Growth',
    desc: 'Direct collaboration with senior founders and PhD domain fellows, conference and publication sponsorships, and career progression anchored purely in demonstrated technical leverage.',
    image: '/careers/life-growth.jpg',
    icon: TrendingUp,
    tags: ['PhD Domain Fellows', 'Research Grants', 'Merit Progression'],
    colSpan: 'col-span-12 lg:col-span-5',
  },
  {
    num: '04',
    tag: 'AUTONOMY & IMPACT',
    headline: 'High-Agency Ownership',
    desc: 'Small autonomous pods deploying deterministic evaluation pipelines and production infrastructure directly to frontier models and enterprise partners worldwide.',
    image: '/careers/life-collaboration.jpg',
    icon: Sparkles,
    tags: ['High Agency Pods', 'Direct Deployment', 'Zero Bureaucracy'],
    colSpan: 'col-span-12 lg:col-span-7',
  },
];

export default function CareersCultureSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Entrance animation for the section header
      gsap.fromTo(
        '.culture-header',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        }
      );

      // 2. Bento cards entrance: noticeable staggered rise with slight horizontal offset
      const cards = gsap.utils.toArray<HTMLElement>('.bento-culture-card');
      cards.forEach((card, i) => {
        const isLeft = i % 2 === 0;
        gsap.fromTo(
          card,
          {
            y: 55,
            x: isLeft ? -16 : 16,
            opacity: 0,
            scale: 0.97,
          },
          {
            y: 0,
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // 3. Noticeable parallax scrub on the background lifestyle images
      const images = gsap.utils.toArray<HTMLElement>('.bento-parallax-media');
      images.forEach((img) => {
        const cardParent = img.closest('.bento-culture-card');
        if (!cardParent) return;

        gsap.fromTo(
          img,
          { yPercent: -12, scale: 1.14 },
          {
            yPercent: 12,
            scale: 1.14,
            ease: 'none',
            scrollTrigger: {
              trigger: cardParent,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
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

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-5 sm:gap-6 pt-8 border-t border-neutral-200/90">
          {CULTURE_PILLARS.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <div
                key={pillar.num}
                className={`bento-culture-card group relative ${pillar.colSpan} min-h-[380px] sm:min-h-[420px] rounded-2xl overflow-hidden border border-neutral-800/80 bg-neutral-950 p-6 sm:p-8 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:border-neutral-600 transition-[border-color,box-shadow] duration-500 will-change-transform`}
              >
                {/* Background Lifestyle Image with Parallax & Contrast Overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
                  <div className="bento-parallax-media absolute -inset-y-12 inset-x-0 w-full h-[calc(100%+6rem)] will-change-transform">
                    <Image
                      src={pillar.image}
                      alt={pillar.headline}
                      fill
                      sizes="(max-width: 1024px) 100vw, 650px"
                      className="object-cover object-center brightness-[0.7] contrast-[1.08] group-hover:scale-105 group-hover:brightness-[0.8] transition-all duration-700 ease-out"
                    />
                  </div>
                  {/* Subtle Multi-Stop Gradient for Optimal Text Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/65 to-black/35 pointer-events-none" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none" />
                </div>

                {/* Foreground Card Content */}
                <div className="relative z-10 flex flex-col justify-between h-full">
                  {/* Top Row: Clean Unboxed Number, Tag, and Clean Unboxed Icon */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/15">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs sm:text-sm font-semibold text-neutral-400">
                        {pillar.num}
                      </span>
                      <span className="text-neutral-500 text-xs font-mono">•</span>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-300 font-semibold">
                        {pillar.tag}
                      </span>
                    </div>

                    {/* Clean Lucide icon with NO box/border around it */}
                    <Icon className="w-5 h-5 text-neutral-300 group-hover:text-white transition-colors duration-300 shrink-0" />
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

                  {/* Bottom: Clean Unboxed Text Items (NO boxes, pills, or chip borders) */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-x-3.5 gap-y-2 mt-auto">
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
