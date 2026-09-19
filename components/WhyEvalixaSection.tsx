'use client';

import { motion } from 'framer-motion';
import { FileCheck, Scale, Users, ShieldCheck, Target, Activity } from 'lucide-react';
import Image from 'next/image';

const BENTO_CARDS = [
  {
    num: '01',
    category: 'EVIDENCE & TRACE',
    title: 'Auditable Evidence, Not a Single Score',
    desc: 'Every judgment ships with reviewer notes, agreement scores, and reproducible traces you can inspect and defend before stakeholders and auditors.',
    metric: '100% Re-runnable Traces',
    icon: FileCheck,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    cols: 'lg:col-span-7',
    featured: true
  },
  {
    num: '02',
    category: 'STATISTICAL RIGOR',
    title: 'Inter-Rater Agreement',
    desc: 'Multiple domain experts independently score each item. Disagreements are adjudicated and agreement metrics are continuously tracked.',
    metric: "Cohen's Kappa > 0.85",
    icon: ShieldCheck,
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
    cols: 'lg:col-span-5',
    featured: false
  },
  {
    num: '03',
    category: 'RISK TAXONOMY',
    title: 'Severity-Graded Findings',
    desc: 'Failures are triaged by risk band and regression delta, so your engineering team fixes what actually matters first.',
    metric: '4-Tier Risk Matrix',
    icon: Scale,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    cols: 'lg:col-span-4',
    featured: false
  },
  {
    num: '04',
    category: 'EXPLOIT COVERAGE',
    title: 'Adversarial Defense',
    desc: 'Exhaustive prompt-injection, jailbreak, and data-exfiltration benchmark suites mapped directly to enterprise threat severity bands.',
    metric: 'Continuous Exploit Gates',
    icon: Target,
    image: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=800&q=80',
    cols: 'lg:col-span-4',
    featured: false
  },
  {
    num: '05',
    category: 'HUMAN BENCHMARK',
    title: 'Calibrated Domain Experts',
    desc: 'Contributors are verified by credentials and calibrated against gold-standard reference sets before touching production data.',
    metric: 'Gold-Standard Calibrated',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    cols: 'lg:col-span-4',
    featured: false
  },
  {
    num: '06',
    category: 'CONTINUOUS ASSURANCE',
    title: 'Continuous Monitoring & Regression Gates',
    desc: 'Ongoing quality signals, live canary evaluations, and automated regression suites that keep complex generative systems dependable post-launch as your models and prompts evolve.',
    metric: '24/7 Automated Delta Alerts',
    icon: Activity,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    cols: 'lg:col-span-12',
    featured: true,
    isWide: true
  }
];

export default function WhyEvalixaSection() {
  return (
    <section
      id="why-evalixa"
      className="relative w-full bg-white text-neutral-950 py-24 sm:py-28 lg:py-32 border-t border-neutral-200/80 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        {/* Section Header */}
        <div className="max-w-5xl mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 mb-3 block"
          >
            WHY EVALIXA // EVIDENCE & ASSURANCE
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-neutral-950 tracking-tight leading-[1.15] mb-5"
          >
            AI security, evaluation, and intelligent system delivery - shaped by real outcomes.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="text-neutral-600 text-sm sm:text-base lg:text-lg leading-relaxed font-normal"
          >
            Evalixa AI combines adversarial testing, real-time defense, structured evaluation, and expert data annotation into a unified delivery model. We measure AI where it meets the real world.
          </motion.p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-2 items-stretch">
          {BENTO_CARDS.map((card, idx) => {
            return (
              <motion.div
                key={card.num}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className={`${card.cols} group relative rounded-md border border-neutral-200/90 bg-neutral-50/50 hover:bg-white p-8 sm:p-9 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl hover:border-neutral-300 transition-all duration-500`}
              >
                {/* Background Curated Architectural Image with Soft White Gradient Overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="w-full h-full object-cover object-center group-hover:scale-105 opacity-80 group-hover:opacity-90 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-black/25" />
                </div>

                {/* Foreground Card Content */}
                <div className="relative z-10 flex flex-col justify-between h-full p-2">
                  <div>
                    {/* Top Row: Monospace Index & Category */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-neutral-100 uppercase">
                        {card.num}
                      </span>
                      <span className="font-mono text-[11px] tracking-wider text-neutral-200 uppercase">
                        {card.category}
                      </span>
                    </div>

                    {/* Heading */}
                    <h3
                      className={`font-display font-bold text-white tracking-tight mb-3 leading-snug ${
                        card.featured ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
                      }`}
                    >
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={`text-neutral-300 font-normal leading-relaxed ${
                        card.isWide ? 'max-w-3xl text-sm sm:text-base' : 'text-xs sm:text-sm'
                      }`}
                    >
                      {card.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
