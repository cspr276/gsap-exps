'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const REALITIES = [
  {
    id: 'indirect-injection',
    title: 'Indirect Injection Bypasses Perimeter Chat Filters',
    description:
      'Hostile instructions arrive planted within support tickets, uploaded PDFs, email threads, or web pages. Because instructions and data share the same token channel, edge input filters at the chat box never see the attack.',
    stat: '0% Visibility',
    statLabel: 'Perimeter filter inspection of retrieved data',
    image: '/services/reality-01.jpg',
  },
  {
    id: 'excessive-agency',
    title: 'Excessive Agency Amplifies Exploit Blast Radius',
    description:
      'Autonomous agents granted unconstrained API scopes, database write access, or unrestricted network egress turn minor prompt injection into catastrophic data theft, unauthorized financial transfers, and lateral cloud movement.',
    stat: '3.8× Blast Radius',
    statLabel: 'Average over-privileged tool credential authority',
    image: '/services/reality-02.jpg',
  },
  {
    id: 'system-prompt-brittleness',
    title: 'Natural Language System Prompts Are Not Boundaries',
    description:
      'Instructing a model to "refuse forbidden actions" is the weakest control in software. System prompt tokens compete on equal footing with attacker directives, folding under multi-turn persona grooming and delimiter shifts.',
    stat: '0 Boundary',
    statLabel: 'Architectural isolation from natural language prompts',
    image: '/services/reality-03.jpg',
  },
];

export default function SecurityRealitiesSection() {
  return (
    <section className="relative w-full py-20 sm:py-28 bg-white text-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold block mb-2.5">
            THE ATTACK SURFACE
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-neutral-950 tracking-tight leading-tight">
            Why Perimeter Filters Fail Autonomous AI Systems.
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/75 to-black/65" />
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

              <div className="relative z-10 pt-5 border-t border-white/15">
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
