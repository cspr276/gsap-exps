'use client';

import React from 'react';
import { motion } from 'framer-motion';

const STEPS = [
  {
    step: '01',
    title: 'Rubric Architecture & Task Extraction',
    duration: 'Week 1',
    description:
      'We extract load-bearing workflows from your production logs and interview your domain experts to codify exact pass/fail rubrics and boundary conditions.',
  },
  {
    step: '02',
    title: 'Adversarial Suite Construction',
    duration: 'Week 2',
    description:
      'We generate task variations, synthetic edge cases, and adversarial injection vectors mapped to severity tiers to stress-test failure modes.',
  },
  {
    step: '03',
    title: 'Calibrated Expert Review & Adjudication',
    duration: 'Week 3',
    description:
      'Vetted domain specialists score ambiguous reasoning paths in triple-blind review; disagreements are adjudicated and agreement scores certified.',
  },
  {
    step: '04',
    title: 'Automated CI/CD Regression Gate',
    duration: 'Week 4+',
    description:
      'Every validated failure mode is converted into permanent automated regression tests integrated directly into your deployment pipeline.',
  },
];

export default function EvaluationDeliverySection() {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#09090b] border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-2.5">
            DELIVERY ENGAGEMENT
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-4">
            From Discovery to Continuous Regression.
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-400 leading-relaxed font-normal">
            A structured 4-stage deployment methodology designed to deliver auditable results within weeks.
          </p>
        </div>

        {/* Crisp cards with less curvy borders (rounded-md) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-md bg-neutral-900/40 border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-neutral-800">
                  <span className="font-mono text-xl font-bold text-white">
                    {step.step}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded-sm border border-neutral-700">
                    {step.duration}
                  </span>
                </div>

                <h3 className="font-display font-bold text-base text-white mb-2.5 leading-snug">
                  {step.title}
                </h3>

                <p className="font-sans text-xs text-neutral-400 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-neutral-800 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                  Deliverable verified
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
