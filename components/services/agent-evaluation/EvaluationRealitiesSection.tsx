'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const REALITIES = [
  {
    id: 'compound-drift',
    title: 'Single-Turn Tests Hide Compound Failure Drift',
    description:
      'Standard benchmarks measure one input in isolation. Production agents execute 6 to 14 sequential tool steps. A 95% single-step accuracy degrades exponentially to roughly 66% reliability across an 8-turn enterprise pipeline.',
    stat: '0.95⁸ ≈ 66%',
    statLabel: 'Multi-turn degradation baseline',
    image: '/services/reality-01.jpg',
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
  return (
    <section className="relative w-full py-20 sm:py-28 bg-white text-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold block mb-2.5">
            THE EVALUATION GAP
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-neutral-950 tracking-tight leading-tight">
            Why Standard AI Benchmarks Fail Production Workflows.
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
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/70 to-black/25" />
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
