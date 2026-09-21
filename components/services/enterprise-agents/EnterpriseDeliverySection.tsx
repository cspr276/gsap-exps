'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface DeliveryStep {
  step: string;
  title: string;
  duration: string;
  description: string;
  image: string;
}

const STEPS: DeliveryStep[] = [
  {
    step: '01',
    title: 'Scope & Boundary Specification',
    duration: 'Week 1-2',
    description:
      'Pick the core workflow, explicitly codify what the agent may never execute unattended, and define verifiable success criteria required to justify continuing.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
  },
  {
    step: '02',
    title: 'Thin Slice Build & Tool Integration',
    duration: 'Week 3-6',
    description:
      'One narrow path built completely—intake, context assembly, scoped tools, idempotency, and cryptographic tracing in an isolated sandbox environment.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop',
  },
  {
    step: '03',
    title: 'Evaluation Harness & Hardening',
    duration: 'Week 7-9',
    description:
      'A task benchmark suite for that slice followed by adversarial stress-testing: prompt injection through retrieved context, malformed tool payloads, and permission probing.',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000&auto=format&fit=crop',
  },
  {
    step: '04',
    title: 'Shadow Mode & Phased Rollout',
    duration: 'Week 10-12',
    description:
      'Shadow mode comparing agent decisions against human experts with zero live effect, followed by gated rollout to trusted cohorts. Autonomy widens only as empirical metrics prove reliability.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop',
  },
];

export default function EnterpriseDeliverySection() {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-white text-neutral-950 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold block mb-2.5">
            DELIVERY ENGAGEMENT
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-neutral-950 tracking-tight leading-tight mb-4">
            What the First 12 Weeks Look Like.
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            A phased, disciplined delivery methodology designed to de-risk agent autonomy, establish ironclad blast-radius boundaries, and verify reliability before customer exposure.
          </p>
        </div>

        {/* Crisp cards with Unsplash image backgrounds matching style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-6 rounded-md bg-[#f8f8fa] border border-neutral-200/90 hover:border-neutral-400 transition-all flex flex-col justify-between overflow-hidden min-h-72 shadow-sm hover:shadow-md"
            >
              {/* Background Image Layer with Subtle Dark Tint & Smooth Zoom on Hover */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 opacity-60 group-hover:opacity-80 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/75 to-black/60" />
              </div>

              {/* Foreground Card Content */}
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/20">
                    <span className="font-mono text-xl font-bold text-neutral-100">
                      {step.step}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-200 font-semibold">
                      {step.duration}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base sm:text-lg text-neutral-100 mb-2.5 leading-snug">
                    {step.title}
                  </h3>

                  <p className="font-sans text-xs text-white leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
