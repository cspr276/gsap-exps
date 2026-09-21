'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const REALITIES = [
  {
    id: 'facts-vs-retrieval',
    title: 'Training for Facts Instead of Retrieval',
    description:
      'A knowledge gap is frequently mistaken for a behavioral failure. Training factual knowledge into weights is computationally prohibitive, impossible to cite with provenance, and slow to correct. Retrieval can be fixed the same afternoon.',
    stat: '0 Citations',
    statLabel: 'Frozen weights cannot cite provenance',
    image: '/services/reality-01.jpg',
  },
  {
    id: 'underspecified-task',
    title: 'The Underspecified Task Trap',
    description:
      'Prompts asking for multiple competing objectives without worked examples or rigid schema contracts produce variance that looks identical to capability gaps. Sharpening the contract is fast, testable, and immediately reversible.',
    stat: 'Reversible',
    statLabel: 'Zero-cost contract engineering',
    image: '/services/reality-02.jpg',
  },
  {
    id: 'baseline-evaluation',
    title: 'Without Baseline Evaluation, You Cannot Attribute Quality',
    description:
      'Without a calibrated evaluation set predating training, you cannot verify if a checkpoint actually improved production workflows — or if fine-tuning quietly degraded generalized reasoning and safety boundaries.',
    stat: 'Blind Risk',
    statLabel: 'Undetected capability regression',
    image: '/services/reality-03.jpg',
  },
];

export default function SftRealitiesSection() {
  return (
    <section className="relative w-full py-20 sm:py-28 bg-white text-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold block mb-2.5">
            CORE ADAPTATION REALITIES
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-neutral-950 tracking-tight leading-tight mb-3">
            Three Cheaper Explanations for the Gap You Are Seeing.
          </h2>
          <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
            Before allocating GPU compute and curating thousands of examples, work down the list. In most engagements, ruling out these three closes the gap without touching a single weight.
          </p>
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/75 to-black/60" />
              </div>

              {/* Foreground Card Content */}
              <div className="relative z-10">
                <h3 className="font-display font-bold text-lg sm:text-xl text-neutral-100 tracking-tight mb-3 leading-snug">
                  {item.title}
                </h3>

                <p className="font-sans text-sm text-neutral-200 leading-relaxed font-normal mb-8">
                  {item.description}
                </p>
              </div>

              <div className="relative z-10 pt-5">
                <span className="font-mono text-xl sm:text-2xl font-bold text-neutral-100 block mb-1">
                  {item.stat}
                </span>
                <span className="font-mono text-[11px] text-neutral-300 uppercase tracking-wider">
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
