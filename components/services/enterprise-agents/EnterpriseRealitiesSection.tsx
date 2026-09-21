'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const REALITIES = [
  {
    id: 'failure-modes',
    title: 'Prototype vs Production Failure Modes',
    description:
      'Demos hide timeouts, schema drift, and network partitions. When an upstream API returns an error or empty payload, un-instrumented agents consume the raw error text as valid reasoning input and confidently report an outcome that never occurred.',
    stat: '78% Silent Failure',
    statLabel: 'Unchecked error hallucination rate',
    image: '/services/reality-01.jpg',
  },
  {
    id: 'blast-radius',
    title: 'Excessive Blast Radius & Unbounded Access',
    description:
      'Prototypes run on single shared service accounts with broad administrative privileges. When an agent hallucinates a tool argument or experiences prompt injection, an analytical read request escalates directly into irreversible mutations.',
    stat: 'Ring 4 Exposure',
    statLabel: 'Default service account privilege tier',
    image: '/services/reality-02.jpg',
  },
  {
    id: 'observability-gap',
    title: 'Retrofitting Observability Too Late',
    description:
      'Debugging multi-turn agents by combing through raw chat logs is impossible in production. Without structured OpenTelemetry spans capturing prompt templates, context retrieval, tool schemas, and idempotency keys, incident diagnosis stalls.',
    stat: '0% Reproducibility',
    statLabel: 'Without deterministic span telemetry',
    image: '/services/reality-03.jpg',
  },
];

export default function EnterpriseRealitiesSection() {
  return (
    <section className="relative w-full py-20 sm:py-28 bg-white text-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold block mb-2.5">
            THE PRODUCTION GAP
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-neutral-950 tracking-tight leading-tight">
            Why Agent Prototypes Collapse in Real Environments.
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
              {/* Background Image Layer with Subtle Dark Tint & Smooth Zoom on Hover */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
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

              <div className="relative z-10 pt-5 border-t border-white/20">
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
