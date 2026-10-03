'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowDown, Mail } from 'lucide-react';
import { CAREERS_EMAIL } from '@/data/careerRoles';

export default function CareersHero() {
  const scrollToPositions = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('open-positions');
    if (!target) return;
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="careers-hero"
      className="sticky top-0 z-0 w-full min-h-screen lg:h-screen flex flex-col justify-center items-center overflow-hidden bg-[#09090b] text-white"
    >
      {/* Dynamic Atmospheric Background Frame matching rest of site */}
      <motion.div
        initial={{ opacity: 0.4, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none origin-center"
      >
        <Image
          src="/services/hero-bg.webp"
          alt="Evalixa Engineering Careers"
          fill
          priority
          className="object-cover object-center brightness-[0.42] contrast-[1.08]"
        />
        <div className="absolute inset-0 bg-[#09090b]/45 pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-t from-[#09090b] via-transparent to-[#09090b]/70 pointer-events-none" />
      </motion.div>

      {/* Main Centered Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center flex flex-col items-center justify-center pt-24 pb-16 my-auto">
        {/* Kinetic Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 36, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl xl:text-[68px] text-white tracking-tight leading-[1.08] mb-6 max-w-4xl drop-shadow-md"
        >
          Engineering Trust Into{' '}
          <span className="text-neutral-300 font-bold block sm:inline">
            Autonomous Intelligence.
          </span>
        </motion.h1>

        {/* Lede Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-base sm:text-lg lg:text-xl text-neutral-200 leading-relaxed max-w-2xl mx-auto mb-10 font-normal"
        >
          We hire engineers, researchers, and domain specialists who take AI reliability, safety, and evaluation seriously. Remote-first, high autonomy, senior collaboration, and zero corporate red tape.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#open-positions"
            onClick={scrollToPositions}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-all shadow-xl shadow-black/50 cursor-pointer"
          >
            <span>Explore 9 Open Positions</span>
            <ArrowDown className="w-3.5 h-3.5 text-black stroke-[2.5]" />
          </a>

          <a
            href={`mailto:${CAREERS_EMAIL}`}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 hover:text-white font-mono text-xs uppercase tracking-wider font-medium border border-neutral-700/80 transition-all backdrop-blur-md cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-neutral-400" />
            <span>{CAREERS_EMAIL}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
