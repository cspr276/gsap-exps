'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface StepItem {
  step: string;
  title: string;
  duration: string;
  description: string;
  image: string;
}

const STEPS: StepItem[] = [
  {
    step: '01',
    title: 'Rubric & Guideline Architecture',
    duration: 'Week 1',
    description:
      'We codify task specifications, edge cases, and decision trees alongside your domain experts. Worked examples are established across all rating grades before labelling starts.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
  },
  {
    step: '02',
    title: 'Seed Cohort Calibration',
    duration: 'Week 2',
    description:
      'Every reviewer completes blind calibration on identical seed batches. Agreement metrics (Cohen’s κ) are measured and discrepancies resolved before production queue access.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop',
  },
  {
    step: '03',
    title: 'Production Batching & Adjudication',
    duration: 'Week 3',
    description:
      'Domain SMEs execute production batches with invisible gold seeds dispersed throughout the queue. Contested items escalate immediately to senior arbiters.',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000&auto=format&fit=crop',
  },
  {
    step: '04',
    title: 'Gold Standard Delivery & Audit Pack',
    duration: 'Week 4+',
    description:
      'Delivery of verified gold standard datasets accompanied by full inter-rater agreement analytics, adjudication audit logs, and versioned guideline artifacts.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop',
  },
];

export default function AnnotationDeliverySection() {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-white text-neutral-950 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold block mb-2.5">
            DELIVERY ENGAGEMENT
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-neutral-950 tracking-tight leading-tight mb-4">
            From Guideline Calibration to Audited Delivery.
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            A structured 4-stage quality deployment methodology designed to deliver verifiable gold standards with measurable statistical guarantees.
          </p>
        </div>

        {/* Clean cards with Unsplash image backgrounds and dark gradient overlays */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-6 rounded-md bg-[#f8f8fa] border border-neutral-200/90 hover:border-neutral-400 transition-all flex flex-col justify-between overflow-hidden min-h-70 shadow-sm hover:shadow-md"
            >
              {/* Background Image Layer with Smooth Zoom on Hover */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 opacity-60 group-hover:opacity-80 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/70 to-black/60" />
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
