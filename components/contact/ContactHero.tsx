'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function ContactHero() {
  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('direct-message');
    if (!target) return;
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo(target, { offset: -30, duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBento = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('contact-channels');
    if (!target) return;
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo(target, { offset: -30, duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[64vh] lg:min-h-[70vh] flex items-center bg-[#09090b] text-white pt-28 pb-16 border-b border-neutral-800 overflow-hidden">
      {/* Background Architectural Image — Clean & Clearly Visible with Light Scrim */}
      <motion.div
        initial={{ opacity: 0.4, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
      >
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85"
          alt="Modern Architectural Tower"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.62] contrast-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/45 to-[#09090b]/30" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-xs uppercase tracking-widest text-neutral-300 font-semibold block mb-3 drop-shadow-sm"
          >
            GET IN TOUCH
          </motion.span>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] mb-5 drop-shadow-md"
          >
            Contact Evalixa AI.
          </motion.h1>

          {/* Subtitle / Lede */}
          <motion.p
            initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-base sm:text-lg text-neutral-200 leading-relaxed max-w-2xl mb-8 font-normal drop-shadow-sm"
          >
            Tell us what you are building, testing, or securing. Your message is routed to the right Evalixa reviewer instead of disappearing into a generic inbox.
          </motion.p>

          {/* Plain Response Signals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-xs text-neutral-300 tracking-wide pb-8 border-b border-neutral-700/80 flex flex-wrap gap-y-2 gap-x-6 drop-shadow-sm"
          >
            <span>One business day response</span>
            <span className="text-neutral-500 hidden sm:inline">/</span>
            <span>Senior review first</span>
            <span className="text-neutral-500 hidden sm:inline">/</span>
            <span>AI evaluation, security & expert data</span>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 pt-6"
          >
            <a
              href="#direct-message"
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-colors cursor-pointer rounded-md shadow-xl"
            >
              <span>Write Direct Message</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>

            <a
              href="#contact-channels"
              onClick={scrollToBento}
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-neutral-600 bg-black/60 text-neutral-200 hover:text-white hover:border-neutral-400 font-mono text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer rounded-md backdrop-blur-sm shadow-lg"
            >
              <span>Explore Channels</span>
              <ArrowDown className="w-3.5 h-3.5 text-neutral-400" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
