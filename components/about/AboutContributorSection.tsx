'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Award, ShieldCheck, Scale } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CONTRIBUTOR_PILLARS = [
  {
    num: '01',
    category: 'CREDENTIALED FELLOWS',
    icon: Award,
    title: 'Domain Specialists & Practitioners',
    desc: 'We recruit certified clinicians, attorneys, financial analysts, and security researchers. Every contributor undergoes rigorous calibration against gold-standard rubrics before scoring production data.',
    metric: '1,200+ Verified Fellows',
    image: '/cards/card_05.jpg',
  },
  {
    num: '02',
    category: 'REASONING ADJUDICATION',
    icon: Scale,
    title: 'High-Horizon Decision Analysis',
    desc: 'Automated judges hallucinate on nuanced domain workflows. Our specialists evaluate multi-step tool calls, regulatory compliance boundaries, and multi-turn reasoning traces with granular failure categorization.',
    metric: 'Krippendorff α ≥ 0.90',
    image: '/cards/card_06.jpg',
  },
  {
    num: '03',
    category: 'AUDITABLE EVIDENCE',
    icon: ShieldCheck,
    title: 'Deterministic Trace Auditing',
    desc: 'Every annotation, rubric score, and adjudication dispute is stamped with cryptographic hashes and reviewer provenance, ensuring auditable traceability for enterprise release gates.',
    metric: '100% Auditable Traces',
    image: '/cards/card_08.jpg',
  },
];

const CARD_TRAJECTORIES = [
  { x: -50, y: 35, rotateX: 12, rotateZ: -1.5 }, // Card 0: Left
  { x: 0, y: 45, rotateX: 14, rotateZ: 0 },      // Card 1: Center
  { x: 50, y: 35, rotateX: 12, rotateZ: 1.5 },   // Card 2: Right
];

export default function AboutContributorSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const grid = gridRef.current;
      if (!section || !grid) return;

      const cards = gsap.utils.toArray<HTMLElement>('.contributor-card', grid);
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
      className="relative z-20 w-full py-24 sm:py-32 bg-[#09090b] text-white border-b border-neutral-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (No tag numbering) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-8 mb-14 border-b border-neutral-900 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold block mb-3">
              THE CONTRIBUTOR NETWORK
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              Grounding Autonomous Reasoning in Verified Human Truth.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-sans text-xs sm:text-sm text-neutral-400 max-w-md leading-relaxed"
          >
            We connect frontier AI laboratories with calibrated specialists across healthcare, finance, law, and cybersecurity to eliminate hallucinations and drift.
          </motion.p>
        </div>

        {/* 3 Pillar Cards with Architectural Image Background & 1:1 Scroll Sync */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-16"
          style={{ perspective: '1200px' }}
        >
          {CONTRIBUTOR_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="contributor-card group relative rounded-md border border-neutral-800 bg-neutral-950 p-7 sm:p-8 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl hover:border-neutral-500 transition-[border-color,box-shadow] duration-200 will-change-transform"
              >
                {/* Background Architectural Image with Dark Gradient Overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="w-full h-full object-cover object-center group-hover:scale-105 opacity-80 group-hover:opacity-90 transition-transform duration-700 ease-out contrast-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40" />
                </div>

                {/* Foreground Card Content */}
                <div className="relative z-10 flex flex-col justify-between h-full min-h-[300px]">
                  <div>
                    {/* Top Row: Category in monospace without index numbering */}
                    <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/15">
                      <span className="font-mono text-[11px] tracking-wider text-neutral-300 uppercase font-semibold">
                        {pillar.category}
                      </span>
                      <Icon className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                    </div>

                    <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight leading-snug mb-3">
                      {pillar.title}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-5 border-t border-white/15 flex items-center justify-between font-mono text-xs text-neutral-400">
                    <span className="uppercase tracking-wider text-[11px]">
                      Benchmark
                    </span>
                    <span className="font-semibold text-white">
                      {pillar.metric}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Callout Box */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-md border border-neutral-800 bg-neutral-950/80 p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
        >
          <div>
            <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-widest block mb-1">
              Contribute Your Expertise
            </span>
            <h4 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">
              Are you a credentialed domain specialist?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
              Join our calibrated network of attorneys, physicians, researchers, and engineers working on high-impact milestone evaluation projects.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Link
              href="/contact?source=contributor"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-white text-neutral-950 font-mono text-xs uppercase tracking-wider font-bold hover:bg-neutral-200 transition-colors shadow-sm"
            >
              <span>Apply as Expert Contributor</span>
              <ArrowUpRight className="w-4 h-4 text-neutral-950" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
