'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const REALITIES = [
  {
    id: 'one-classifier-trap',
    title: 'The One-Classifier Trap',
    description:
      'Trying to catch all attack shapes in one shared model fails. Attack vectors carry radically different signatures and false-positive tolerances. A single threshold ends up mediocre at every threat, collapsing under live traffic.',
    stat: '1 Shared Threshold',
    statLabel: 'Inevitably collapses precision across threat classes',
    image: '/services/reality-01.jpg',
  },
  {
    id: 'telemetry-not-control',
    title: 'Telemetry Is Not a Control',
    description:
      'Detection without automated containment is just an alert. An alert firing after exfiltration or dangerous tool execution is an incident report, not security. True runtime defense enforces deterministic consequence before completion.',
    stat: '0s Reaction Window',
    statLabel: 'Automated inline containment vs post-facto alerts',
    image: '/services/reality-02.jpg',
  },
  {
    id: 'latency-tax',
    title: 'The Latency Tax',
    description:
      'Inline heavy model judges destroy real-world user experience. Putting multi-billion-parameter evaluator models in the hot path imposes a 600ms+ penalty on every user request for protection achievable asynchronously.',
    stat: '600ms+ Penalty',
    statLabel: 'Hot-path judge tax charged to every user request',
    image: '/services/reality-03.jpg',
  },
];

export default function DetectionRealitiesSection() {
  return (
    <section className="relative w-full py-20 sm:py-28 bg-white text-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold block mb-2.5">
            THE RUNTIME REALITY
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-neutral-950 tracking-tight leading-tight">
            Why Naive AI Guardrails Fail in Production.
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
