'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface RealityItem {
  id: string;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  image: string;
}

const REALITIES: RealityItem[] = [
  {
    id: 'headcount-fallacy',
    title: 'The Headcount Fallacy',
    description:
      'Buying volume instead of verifiable calibration. Throwing hundreds of unvetted annotators at subjective schemas guarantees noise. When guidelines lack operational definitions, adding headcount only compounds variance across your datasets.',
    stat: '10× Variance',
    statLabel: 'Uncalibrated annotator noise multiplier',
    image: '/services/reality-01.jpg',
  },
  {
    id: 'pairwise-agreement',
    title: 'Pairwise Agreement Over Absolute Scoring',
    description:
      'Scales drift while comparisons hold signal. Two experts will disagree whether a complex output is a 6 or a 7 on a 10-point scale, and the same reviewer drifts over an afternoon. Pairwise relative preference eliminates scale compression.',
    stat: '0.85 vs 0.54 κ',
    statLabel: 'Pairwise vs absolute Likert reliability',
    image: '/services/reality-02.jpg',
  },
  {
    id: 'guideline-ossification',
    title: 'Guideline Ossification',
    description:
      'Specifications that don’t learn from adjudicated edge cases. Guidelines written once at project kickoff decay immediately as edge cases emerge. Without continuous adjudication feedback loops, annotators guess silently.',
    stat: '100% Codified',
    statLabel: 'Adjudicated edge cases fed back to rubrics',
    image: '/services/reality-03.jpg',
  },
];

export default function AnnotationRealitiesSection() {
  return (
    <section className="relative w-full py-20 sm:py-28 bg-white text-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold block mb-2.5">
            THE QUALITY GAP
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-neutral-950 tracking-tight leading-tight">
            Why Volume-First Data Pipelines Fail Production Models.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {REALITIES.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-7 sm:p-8 rounded-md bg-[#f8f8fa] border border-neutral-200/90 hover:border-neutral-400 transition-all flex flex-col justify-between overflow-hidden min-h-85 shadow-sm hover:shadow-md"
            >
              {/* Background Image Layer with Subtle Light Tint & Smooth Zoom on Hover */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 opacity-60 group-hover:opacity-80 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/70 to-black/60" />
              </div>

              {/* Foreground Card Content */}
              <div className="relative z-10">
                <h3 className="font-display font-bold text-lg sm:text-xl text-neutral-100 tracking-tight mb-3 leading-snug">
                  {item.title}
                </h3>

                <p className="font-sans text-sm text-white leading-relaxed font-normal mb-8">
                  {item.description}
                </p>
              </div>

              <div className="relative z-10 pt-5">
                <span className="font-mono text-xl sm:text-2xl font-bold text-neutral-100 block mb-1">
                  {item.stat}
                </span>
                <span className="font-mono text-[11px] text-neutral-200 uppercase tracking-wider">
                  {item.statLabel}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
