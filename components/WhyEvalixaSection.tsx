'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FileCheck, Scale, Users, ShieldCheck, Target, Activity } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

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
    featured: true,
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
    featured: false,
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
    featured: false,
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
    featured: false,
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
    featured: false,
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
    isWide: true,
  },
];

// Layout-aligned 3D offsets for clean non-colliding entrance matching bento geometry
const CARD_TRAJECTORIES = [
  { x: -50, y: 35, rotateX: 12, rotateZ: -1.5 }, // Card 0: Row 1 Left (7 cols)
  { x: 50, y: 35, rotateX: 12, rotateZ: 1.5 },   // Card 1: Row 1 Right (5 cols)
  { x: -45, y: 35, rotateX: 12, rotateZ: -1.5 }, // Card 2: Row 2 Left (4 cols)
  { x: 0, y: 45, rotateX: 14, rotateZ: 0 },      // Card 3: Row 2 Center (4 cols)
  { x: 45, y: 35, rotateX: 12, rotateZ: 1.5 },   // Card 4: Row 2 Right (4 cols)
  { x: 0, y: 40, rotateX: 10, rotateZ: 0 },      // Card 5: Row 3 Full Width (12 cols)
];

export default function WhyEvalixaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const grid = gridRef.current;
      if (!section || !grid) return;

      const cards = gsap.utils.toArray<HTMLElement>('.why-bento-card', grid);
      const mm = gsap.matchMedia();

      // Desktop: natural 1:1 scroll tracking with scrub: true & ease: 'none'
      mm.add('(min-width: 768px)', () => {
        cards.forEach((card, idx) => {
          const trajectory = CARD_TRAJECTORIES[idx] || { x: 0, y: 35, rotateX: 10, rotateZ: 0 };
          gsap.fromTo(
            card,
            {
              x: trajectory.x,
              y: trajectory.y,
              rotateX: trajectory.rotateX,
              rotateZ: trajectory.rotateZ,
              opacity: 0.15,
            },
            {
              x: 0,
              y: 0,
              rotateX: 0,
              rotateZ: 0,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                end: 'top 58%',
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        });
      });

      // Mobile
      mm.add('(max-width: 767px)', () => {
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 30, opacity: 0.2 },
            {
              y: 0,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                end: 'top 65%',
                scrub: true,
              },
            }
          );
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="why-evalixa"
      className="relative w-full bg-white text-neutral-950 py-24 sm:py-28 lg:py-32 border-t border-neutral-200/80 transition-colors overflow-hidden"
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

        {/* Bento Grid Layout with 1:1 Scroll Sync */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-1 lg:gap-2 items-stretch"
          style={{ perspective: '1200px' }}
        >
          {BENTO_CARDS.map((card) => {
            return (
              <div
                key={card.num}
                className={`${card.cols} why-bento-card group relative rounded-md border border-neutral-200/90 bg-neutral-950 p-8 sm:p-9 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl hover:border-neutral-500 transition-[border-color,box-shadow] duration-200 will-change-transform`}
              >
                {/* Background Curated Architectural Image with Dark Gradient Overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 600px"
                    className="w-full h-full object-cover object-center group-hover:scale-105 opacity-80 group-hover:opacity-90 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
                </div>

                {/* Foreground Card Content */}
                <div className="relative z-10 flex flex-col justify-between h-full p-2 min-h-[260px]">
                  <div>
                    {/* Top Row: Monospace Index & Category */}
                    <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/15">
                      <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-neutral-100 uppercase">
                        {card.num}
                      </span>
                      <span className="font-mono text-[11px] tracking-wider text-neutral-300 uppercase">
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

                  {/* Clean Bottom Metric Bar */}
                  <div className="pt-4 mt-6 border-t border-white/15 flex items-center justify-between font-mono text-xs">
                    <span className="text-neutral-400 uppercase tracking-wider text-[11px]">
                      Metric
                    </span>
                    <span className="font-semibold text-white">
                      {card.metric}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
