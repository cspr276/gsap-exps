'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STEPS = [
  {
    step: '01',
    title: 'Traffic Profiling & Latency Budgeting',
    duration: 'Week 1',
    description:
      'We profile your live and historical agent traffic to map threat models, establish latency ceilings, and isolate high-risk tool execution surfaces.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
    milestones: ['Traffic payload profiling', 'Hot-path latency budgets', 'High-risk tool isolation'],
  },
  {
    step: '02',
    title: 'Fast Classifier & Egress Deployment',
    duration: 'Week 2',
    description:
      'We deploy compact inline classifiers and enforce egress boundaries at the network edge, stopping known vectors with sub-5ms overhead.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop',
    milestones: ['Sub-5ms classifier runtime', 'Network perimeter egress enforcement', 'Token quota circuit breakers'],
  },
  {
    step: '03',
    title: 'Threshold Tuning & False-Positive Calibration',
    duration: 'Week 3',
    description:
      'We calibrate decision thresholds against your production distributions to eliminate false positives on legitimate complex queries.',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000&auto=format&fit=crop',
    milestones: ['Production traffic replay', 'False-positive curve tuning', 'Domain-specific edge case rules'],
  },
  {
    step: '04',
    title: 'Continuous Hardening & Regression CI',
    duration: 'Week 4+',
    description:
      'We wire asynchronous deep model review and automated regression testing into your CI/CD pipeline for continuous runtime defense.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop',
    milestones: ['Async LLM judge worker', 'Continuous threshold retraining', 'Production canary regression gate'],
  },
];

export default function DetectionDeliverySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const progressBar = progressBarRef.current;
      if (!section || !track) return;

      const mm = gsap.matchMedia();

      // Pinned Horizontal Track on Desktop
      mm.add('(min-width: 1024px)', () => {
        const getScrollDistance = () => {
          const cards = track.children;
          if (cards.length > 1) {
            const lastCard = cards[cards.length - 1] as HTMLElement;
            return lastCard.offsetLeft + 80;
          }
          return 1600;
        };

        gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            id: 'delivery-horizontal',
            trigger: section,
            pin: true,
            start: 'top top',
            end: () => `+=${getScrollDistance() + 450}`,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        if (progressBar) {
          gsap.fromTo(
            progressBar,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: () => `+=${getScrollDistance() + 450}`,
                scrub: 1,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-center py-16 sm:py-20 lg:py-24 bg-white text-neutral-950 border-t border-neutral-200 overflow-hidden"
    >
      {/* Laser progress wire (Desktop) */}
      <div className="hidden lg:block absolute top-0 left-0 right-0 h-[2px] bg-neutral-200">
        <div
          ref={progressBarRef}
          className="w-full h-full bg-neutral-950 origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-8 sm:mb-10 flex-shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold block mb-2">
              DELIVERY ENGAGEMENT
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-neutral-950 tracking-tight leading-tight">
              From Traffic Profiling to Runtime Containment.
            </h2>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-neutral-500 font-mono text-xs">
            <span className="text-neutral-950 font-bold">4 PHASES</span>
            <span>/</span>
            <span>TIMELINE RAIL</span>
          </div>
        </div>
      </div>

      {/* Pinned Horizontal Track Container */}
      <div className="relative w-full overflow-hidden lg:overflow-visible px-4 sm:px-6 lg:px-0 lg:pl-[calc(50vw-210px)]">
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row gap-6 w-full lg:w-max lg:will-change-transform lg:pr-32"
        >
          {STEPS.map((step) => (
            <div
              key={step.step}
              className="group relative p-6 sm:p-7 rounded-md bg-[#f8f8fa] border border-neutral-200/90 hover:border-neutral-400 transition-all flex flex-col justify-between overflow-hidden w-full lg:w-[420px] min-h-[400px] shrink-0 shadow-sm hover:shadow-md"
            >
              {/* Background Image Layer */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 420px"
                  className="object-cover object-center group-hover:scale-105 opacity-60 group-hover:opacity-80 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/70 to-black/60" />
              </div>

              {/* Foreground Card Content */}
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/20">
                    <span className="font-mono text-2xl font-bold text-neutral-100">
                      {step.step}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-200 font-semibold px-2 py-0.5 rounded bg-white/10 border border-white/20">
                      {step.duration}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg sm:text-xl text-neutral-100 mb-3 leading-snug">
                    {step.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-white leading-relaxed font-normal mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Milestones specs */}
                <div className="pt-4 border-t border-white/20 space-y-1.5">
                  {step.milestones.map((ms) => (
                    <div key={ms} className="flex items-center gap-2 text-[11px] font-mono text-neutral-200">
                      <span className="text-neutral-400 select-none">—</span>
                      <span>{ms}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
