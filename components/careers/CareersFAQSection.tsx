'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';
import { CAREERS_EMAIL } from '@/data/careerRoles';

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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative z-20 w-full py-24 sm:py-32 bg-[#09090b] text-white border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Sticky Header matching AboutFAQSection */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold block mb-3">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-4">
              Questions About Working at Evalixa.
            </h2>
            <p className="font-sans text-sm sm:text-base text-neutral-400 leading-relaxed font-normal mb-8">
              Straightforward answers about our engineering culture, evaluation standards, remote policy, and compensation.
            </p>

            <div className="pt-6 border-t border-neutral-900 hidden lg:block">
              <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block mb-2">
                Have a specific question?
              </span>
              <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                Our engineering and operations leads are available to answer candidate questions directly.
              </p>
              <a
                href={`mailto:${CAREERS_EMAIL}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-white font-semibold hover:text-neutral-300 transition-colors"
              >
                <span>Write to {CAREERS_EMAIL}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Accordion List matching AboutFAQSection */}
          <div className="lg:col-span-8 flex flex-col divide-y divide-neutral-900 border-y border-neutral-900">
            {CAREERS_FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx}>
                  <button
                    type="button"
                    onClick={() => toggleFAQ(idx)}
                    className="w-full py-6 sm:py-7 flex items-start justify-between text-left gap-4 cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-4">
                      <span className="font-mono text-xs text-neutral-600 pt-1 select-none">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display font-semibold text-lg sm:text-xl text-neutral-200 group-hover:text-white transition-colors">
                        {faq.q}
                      </span>
                    </div>
                    <div className="shrink-0 pt-1 text-neutral-500 group-hover:text-white transition-colors">
                      {isOpen ? (
                        <Minus className="w-5 h-5 text-neutral-300" />
                      ) : (
                        <Plus className="w-5 h-5 text-neutral-500" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-7 pl-9 pr-4 sm:pr-8 text-neutral-400 font-sans text-sm sm:text-base leading-relaxed">
                          {faq.a}
                        </div>
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
