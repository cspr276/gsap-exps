'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export default function ArticlesHero() {
  const scrollToArticles = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('articles-stream');
    if (!target) return;
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo(target, { offset: -60, duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="articles-hero"
      className="relative w-full min-h-[75vh] lg:min-h-[80vh] flex flex-col justify-center items-center overflow-hidden bg-[#09090b] text-white"
    >
      {/* Background Frame */}
      <motion.div
        initial={{ opacity: 0.3, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
      >
        <Image
          src="/articles/Articles.webp"
          alt="Evalixa Articles"
          fill
          priority
          className="object-cover object-center brightness-[0.35] contrast-[1.12]"
        />
        <div className="absolute inset-0 bg-[#09090b]/55 pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-t from-[#09090b] via-transparent to-[#09090b]/80 pointer-events-none" />
      </motion.div>

      {/* Main Centered Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center flex flex-col items-center justify-center pt-32 pb-20 my-auto">
        <motion.h1
          initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl xl:text-[68px] text-white tracking-tight leading-[1.08] mb-6 max-w-4xl drop-shadow-md"
        >
          Long-Form Strategy &{' '}
          <span className="text-neutral-300 font-bold block sm:inline">
            Technical Context.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-base sm:text-lg lg:text-xl text-neutral-200 leading-relaxed max-w-2xl mx-auto mb-10 font-normal"
        >
          Our articles explore the topics that matter most to founders, product leaders, and engineering teams — grounded in real practice, not recycled opinion.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#articles-stream"
            onClick={scrollToArticles}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-all shadow-xl shadow-black/50 cursor-pointer"
          >
            <span>Explore 6 Articles</span>
            <ArrowDown className="w-3.5 h-3.5 text-black stroke-[2.5]" />
          </a>

          <Link
            href="/insights/case-studies"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 hover:text-white font-mono text-xs uppercase tracking-wider font-medium border border-neutral-700/80 transition-all backdrop-blur-md cursor-pointer"
          >
            <span>View Case Studies</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
