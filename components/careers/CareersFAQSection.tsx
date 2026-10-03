'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const CAREERS_FAQS = [
  {
    q: 'How does Evalixa structure remote work and timezone overlap?',
    a: 'Evalixa is remote-first by design. For core engineering and operations roles, we maintain a 3-4 hour daily overlap window across India Standard Time (IST) and Central European Time (CET). For PhD Domain Experts, engagements are primarily asynchronous and project-based.',
  },
  {
    q: 'Why is a PhD the minimum qualification for Domain Experts?',
    a: 'Our benchmark suites and red-team operations adjudicate frontier model reasoning in specialized fields—including advanced mathematics, legal logic, clinical diagnostics, and theoretical physics. High-horizon reasoning evaluation demands deep, peer-calibrated domain authority.',
  },
  {
    q: 'Can I apply for multiple roles or part-time / advisory capacities?',
    a: 'Yes. If your background bridges multiple areas (e.g., ML Engineering and AI Security), submit an application for your primary interest and mention your adjacent skillsets in your note. For academic fellows, we offer flexible, part-time project agreements.',
  },
  {
    q: 'What hardware, tooling, and equipment does Evalixa provide?',
    a: 'All full-time team members receive a modern high-performance engineering workstation (MacBook Pro M-series or custom Linux setup), an annual home-office ergonomic allowance, and full reimbursement for development subscriptions, compute credits, and research tooling.',
  },
  {
    q: 'How long does the hiring process take from application to offer?',
    a: 'We respect your time. Our typical loop takes between 7 and 14 calendar days from initial submission to final offer. You will never be left waiting without status updates.',
  },
  {
    q: 'Can I apply directly via email instead of using the online form?',
    a: 'Absolutely. You can send your resume, CV, and a brief introduction directly to careers@evalixa.com with the role title in the subject line. Both routes are reviewed by the same senior engineering team.',
  },
];

export default function CareersFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative z-20 w-full py-24 sm:py-32 bg-[#09090b] text-white border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Sticky Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-3">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight mb-4">
              Answers for Prospective Candidates.
            </h2>
            <p className="font-sans text-sm sm:text-base text-neutral-400 leading-relaxed font-normal mb-6">
              Everything you need to know about our culture, evaluation standards, compensation philosophy, and remote operations.
            </p>
            <div className="p-4 rounded-md bg-neutral-950 border border-neutral-800 text-xs text-neutral-400">
              <span className="text-white font-medium block mb-1">Have a specific question?</span>
              Write directly to{' '}
              <a href="mailto:careers@evalixa.com" className="text-white underline underline-offset-2">
                careers@evalixa.com
              </a>
            </div>
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-8 divide-y divide-neutral-800/80 border-y border-neutral-800/80">
            {CAREERS_FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="py-6 sm:py-7 group">
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex items-start justify-between gap-6 text-left cursor-pointer focus:outline-hidden"
                  >
                    <span className="font-display font-semibold text-lg sm:text-xl text-neutral-200 group-hover:text-white transition-colors leading-snug">
                      {faq.q}
                    </span>
                    <span
                      className={`shrink-0 mt-1 w-7 h-7 rounded-md border border-neutral-800 flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:border-neutral-700 transition-all ${
                        isOpen ? 'rotate-180 bg-neutral-900 text-white' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="font-sans text-sm sm:text-base text-neutral-400 leading-relaxed font-normal pt-4 pr-10">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
