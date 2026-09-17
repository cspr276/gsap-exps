'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SpotlightCard from './SpotlightCard';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HORIZONTAL_SERVICES = [
  {
    num: '04',
    category: 'DATA OPS & RLHF',
    title: 'Data Annotation & Expert Workflows',
    desc: 'High-quality, domain-specific data labeling, supervised fine-tuning, and human-in-the-loop preference ranking powering frontier AI systems.',
    metric: 'Vetted Domain Experts',
    image: '/cards/card_04.jpg'
  },
  {
    num: '05',
    category: 'ENTERPRISE AUTOMATION',
    title: 'Enterprise AI Agents & Systems',
    desc: 'Production-minded AI workflows, autonomous agent clusters, and intelligent system design engineered for internal efficiency and operational reliability.',
    metric: 'Zero Context Drift',
    image: '/cards/card_05.jpg'
  },
  {
    num: '06',
    category: 'GOVERNANCE & AUDIT',
    title: 'Agent Readiness & Risk Assessment',
    desc: 'Governance-focused architectural reviews, failure taxonomies, and adoption audits to identify critical risks before business impact.',
    metric: 'Pre-Production Triage',
    image: '/cards/card_06.jpg'
  },
  {
    num: '07',
    category: 'CONTINUOUS ASSURANCE',
    title: 'Continuous Monitoring & Regression',
    desc: 'Ongoing quality signals, live canary evaluations, and automated regression suites that keep complex generative systems dependable post-launch.',
    metric: '24/7 Automated Delta Tracking',
    image: '/cards/card_07.jpg'
  },
  {
    num: '08',
    category: 'MODEL ADAPTATION',
    title: 'Supervised Fine-Tuning & Alignment',
    desc: 'Model improvement loops calibrated by domain expectations and user experience goals, bridging foundation models to production performance.',
    metric: 'Domain-Calibrated RLHF',
    image: '/cards/card_08.jpg'
  }
];

export default function HorizontalServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        // Distance from card 04 to card 08 brings 08 to center (50vw).
        // Adding 120px lets card 08 settle comfortably "just after middle".
        const getScrollDistance = () => {
          const cards = track.children;
          if (cards.length > 1) {
            const lastCard = cards[cards.length - 1] as HTMLElement;
            return lastCard.offsetLeft + 60;
          }
          return 2200;
        };

        gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none', // Official GSAP rule for horizontal containerAnimation
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: 'top top',
            end: () => `+=${getScrollDistance()}`,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="relative z-30 lg:-mt-[100vh] w-full min-h-screen h-screen bg-neutral-950 text-white pt-16 sm:pt-20 lg:pt-22 pb-8 flex flex-col justify-start overflow-hidden border-t border-neutral-800/80 shadow-[0_-30px_70px_rgba(0,0,0,0.95)]"
    >
      {/* Section Header */}
      <div className="px-6 sm:px-12 lg:px-20 max-w-4xl flex-shrink-0">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 mb-1.5 block">
          EXTENDED SERVICES
        </span>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white mb-2 leading-tight">
          ADDITIONAL PLATFORM MODULES
        </h2>
        <p className="text-neutral-400 text-xs sm:text-sm font-normal max-w-xl">
          Scroll vertically to pan through the remaining core services and capabilities in horizontal sequence.
        </p>
      </div>

      {/* Horizontal Pinned Track: Card 04 starts centered in viewport on desktop */}
      <div className="relative w-full overflow-hidden md:overflow-visible pl-6 sm:pl-12 lg:pl-[calc(50vw-245px)] mt-6 sm:mt-8 lg:mt-10 pb-4">
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row items-stretch gap-6 sm:gap-8 will-change-transform w-fit pr-20"
        >
          {HORIZONTAL_SERVICES.map((item) => (
            <SpotlightCard
              key={item.num}
              spotlightColor="rgba(255, 255, 255, 0.08)"
              className="group/card w-full md:w-115 lg:w-[490px] h-[380px] sm:h-[420px] lg:h-[440px] flex-shrink-0 relative rounded-md border border-neutral-800/90 bg-[#121212] hover:border-neutral-700 transition-all shadow-xl shadow-black/50 cursor-default overflow-hidden p-8 sm:p-9"
            >
              {/* Background Image Layer with Dark Overlay & Subtle Zoom on Hover */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover/card:scale-105 group-hover/card:opacity-30 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10101280] via-[#101012]/40 to-[#101012]/25" />
              </div>

              {/* Foreground Card Content */}
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex flex-col">
                  {/* 1. Top Number */}
                  <div className="mb-4 sm:mb-6">
                    <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-white uppercase">
                      {item.num}
                    </span>
                  </div>

                  {/* 2. Heading below number */}
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white uppercase tracking-tight mb-3 sm:mb-4 leading-snug">
                    {item.title}
                  </h3>

                  {/* 3. Content below heading */}
                  <p className="text-neutral-300 text-xs sm:text-sm sm:text-[15px] leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                {/* 4. Link below with hover rotation from 45deg to straight 0deg */}
                <div className="pt-5 sm:pt-6">
                  <Link
                    href="/"
                    className="group/link inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-wider uppercase text-neutral-300 group-hover/card:text-white font-semibold transition-colors"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 text-neutral-400 -rotate-45 group-hover/card:rotate-0 group-hover/card:text-white group-hover/card:translate-x-0.5 transition-all duration-300 ease-out origin-center" />
                  </Link>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
