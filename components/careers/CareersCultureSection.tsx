'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Terminal, ShieldCheck, TrendingUp } from 'lucide-react';
import AccordionGallery, { AccordionGalleryItem } from '@/components/AccordionGallery';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CULTURE_PILLARS: AccordionGalleryItem[] = [
  {
    num: '01',
    tag: 'WORKFLOW & CONTEXT',
    headline: 'Life at Evalixa',
    label: 'Life at Evalixa',
    desc: 'A remote-first engineering culture built around written context, clear ownership, focused demos, and async velocity without minute-by-minute tracking or performative meetings.',
    image: '/services/reality-01.jpg',
    icon: Terminal,
    tags: ['100% Remote', 'Written Context', 'Async Velocity'],
  },
  {
    num: '02',
    tag: 'SUSTAINABLE PRACTICE',
    headline: 'Practical Benefits',
    label: 'Practical Benefits',
    desc: 'Competitive compensation, flexible schedules, home-office hardware stipends, comprehensive health coverage, and leave policies engineered for sustainable deep work.',
    image: '/services/hero-datacenter.jpg',
    icon: ShieldCheck,
    tags: ['Competitive Equity', 'Hardware Stipend', 'Health Coverage'],
  },
  {
    num: '03',
    tag: 'CRAFT DEPTH',
    headline: 'Professional Growth',
    label: 'Professional Growth',
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
      gsap.fromTo(
        '.culture-header',
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.culture-gallery-wrap',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
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
        <div className="culture-header max-w-3xl mb-12">
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

        {/* Interactive Accordion Gallery */}
        <div className="culture-gallery-wrap pt-8 border-t border-neutral-200/90">
          <AccordionGallery
            items={CULTURE_PILLARS}
            defaultIndex={0}
            height={490}
            gap={14}
            radius={14}
            expandRatio={0.54}
            trigger="hover"
            grayscale={true}
            tilt={6}
            parallax={0.5}
            accentColor="#ffffff"
          />
        </div>
      </div>
    </section>
  );
}
