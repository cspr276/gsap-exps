'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

export default function ServiceCTASection() {
  return (
    <section className="relative w-full py-28 sm:py-36 bg-[#09090b] border-t border-neutral-900 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block">
            DEPLOY WITH CERTAINTY
          </span>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight max-w-3xl mx-auto">
            Find out where your agents fail before your customers do.
          </h2>

          <p className="font-sans text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed font-normal">
            Talk to our engineering team about scoping an evaluation suite, adversarial red-team run, or continuous regression gate for your models.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-lg bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-all shadow-xl shadow-white/5"
            >
              <span>Schedule Scoping Call</span>
              <ArrowUpRight className="w-4 h-4 text-black stroke-[2.5]" />
            </Link>

            <Link
              href="/insights/case-studies"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-wider font-medium border border-neutral-800 transition-all"
            >
              <span>Explore Case Studies</span>
              <ArrowRight className="w-4 h-4 text-neutral-400" />
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 pt-10 text-neutral-500 font-mono text-xs tracking-wider uppercase">
            <span>✓ Calibrated Domain Network</span>
            <span>✓ Reproducible Traces</span>
            <span>✓ Zero Black Boxes</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
