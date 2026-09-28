'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const REALITIES = [
  {
    id: 'compound-drift',
    title: 'Single-Turn Tests Hide Compound Failure Drift',
    description:
      'Standard benchmarks measure one input in isolation. Production agents execute 6 to 14 sequential tool steps. A 95% single-step accuracy degrades exponentially to roughly 66% reliability across an 8-turn enterprise pipeline.',
    stat: '0.95⁸ ≈ 66%',
    statLabel: 'Multi-turn degradation baseline',
    image: '/services/reality-01.jpg',
    turnNodes: [95, 90, 86, 81, 77, 73, 70, 66],
  },
  {
    id: 'synthetic-bias',
    title: 'Public Leaderboards Miss Enterprise Schemas',
    description:
      'Public evaluations rank models on generic trivia and synthetic coding challenges. They completely overlook proprietary business schemas, asynchronous state machines, and multi-tenant authorization boundaries.',
    stat: '0% Domain Fit',
    statLabel: 'Public score to workflow correlation',
    image: '/services/reality-02.jpg',
  },
  {
    id: 'measurement-integrity',
    title: 'Uncalibrated Model Judges Hallucinate Consensus',
    description:
      'Automated LLM-as-a-judge pipelines suffer from severe verbosity bias, position bias, and self-preference drift. Without calibrated human ground truth, evaluation scores become an arbitrary black box.',
    stat: '38% Variance',
    statLabel: 'Uncalibrated automated judge drift',
    image: '/services/reality-03.jpg',
  },
];

export default function EvaluationRealitiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = cardsContainerRef.current;
      if (!container) return;

      const cards = gsap.utils.toArray<HTMLElement>('.reality-card');
      const images = gsap.utils.toArray<HTMLElement>('.reality-bg-image');

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        // 3D Staggered scrub tilt from Staggered3DGridAnimations
        const tilts = [
          { rx: 14, ry: 5, y: 50 },
          { rx: 16, ry: 0, y: 70 },
          { rx: 14, ry: -5, y: 50 },
        ];

        cards.forEach((card, idx) => {
          const config = tilts[idx] || tilts[0];
          gsap.fromTo(
            card,
            {
              rotateX: config.rx,
              rotateY: config.ry,
              y: config.y,
              scale: 0.96,
              transformOrigin: '50% 100%',
            },
            {
              rotateX: 0,
              rotateY: 0,
              y: 0,
              scale: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'center 50%',
                scrub: 0.6,
              },
            }
          );
        });

        // Parallax image scrub
        images.forEach((img) => {
          gsap.fromTo(
            img,
            { yPercent: 0 },
            {
              yPercent: -12,
              ease: 'none',
              scrollTrigger: {
                trigger: img,
                start: 'top bottom',
                end: 'bottom top',
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
      className="relative w-full py-20 sm:py-28 bg-white text-neutral-950 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-950" />
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold">
              THE EVALUATION GAP
            </span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-neutral-950 tracking-tight leading-tight">
            Why Standard AI Benchmarks Fail Production Workflows.
          </h2>
        </div>

        {/* 3D Perspective Grid */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          style={{ perspective: '1200px' }}
        >
          {REALITIES.map((item, idx) => (
            <div
              key={item.id}
              className="reality-card group relative p-7 sm:p-8 rounded-md bg-[#121214] border border-neutral-300 hover:border-neutral-900 transition-shadow duration-500 flex flex-col justify-between overflow-hidden min-h-[380px] shadow-lg hover:shadow-2xl"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Background Image Layer with Parallax Scrub */}
              <div className="absolute inset-[-10%] z-0 overflow-hidden pointer-events-none select-none">
                <div className="reality-bg-image relative w-full h-[120%]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 opacity-40 group-hover:opacity-55 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-[#09090b]/60" />
                </div>
              </div>

              {/* Foreground Card Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-white/10">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 font-bold">
                    FAILURE REALITY 0{idx + 1}
                  </span>
                  <span className="font-mono text-[11px] text-neutral-500 font-medium">
                    DIAGNOSTIC
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight mb-3 leading-snug">
                  {item.title}
                </h3>

                <p className="font-sans text-sm text-neutral-300 leading-relaxed font-normal mb-6">
                  {item.description}
                </p>
              </div>

              {/* Bottom Stat & Optional Turn-Decay Sparkline */}
              <div className="relative z-10 pt-4 border-t border-white/10">
                {item.turnNodes && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-1.5">
                      <span>Turn 1 (95%)</span>
                      <span>Turn 8 (66%)</span>
                    </div>
                    <div className="grid grid-cols-8 gap-1 h-1.5 w-full">
                      {item.turnNodes.map((val, nIdx) => (
                        <div
                          key={nIdx}
                          className="h-full rounded-xs bg-white transition-opacity"
                          style={{ opacity: val / 100 }}
                          title={`Turn ${nIdx + 1}: ${val}% reliability`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xl sm:text-2xl font-bold text-white block">
                    {item.stat}
                  </span>
                  <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider">
                    {item.statLabel}
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
