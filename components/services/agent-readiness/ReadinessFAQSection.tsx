'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  id: string;
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    q: 'How long does an assessment take?',
    a: 'For a mid-sized estate, typically a few weeks: discovery and interviews, then classification and control testing, then the report and remediation plan. The variable is nearly always discovery — organisations consistently find more AI in use than they expected.',
  },
  {
    id: 'faq-2',
    q: 'We already follow a framework. Is this redundant?',
    a: 'No, and it usually complements it. Frameworks tell you what good looks like; they do not tell you whether your systems currently meet it. We assess the actual estate against the standard you have chosen and produce the gap list, which is the part a framework cannot give you.',
  },
  {
    id: 'faq-3',
    q: 'Is this a compliance exercise or an engineering one?',
    a: 'Both, and separating them is why programmes fail. A control that exists only in a document is not a control. Our findings land as engineering work with a compliance rationale attached, so the people who have to implement them understand why.',
  },
  {
    id: 'faq-4',
    q: 'What if we are not ready for what you find?',
    a: 'That is the normal outcome and the reason to look. The report is sequenced so you can start with the disproportionate-risk items in weeks, rather than needing a year-long programme before anything improves. We would rather tell you plainly than produce a comfortable document.',
  },
];

export default function ReadinessFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#09090b] text-white border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Section Left Column / Sticky Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold block mb-2.5">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-4">
              Answers on Risk, Scope, and Remediation.
            </h2>
            <p className="font-sans text-base text-neutral-400 leading-relaxed font-normal mb-8">
              What security leads, risk committees, and engineering directors ask us before undertaking an enterprise AI readiness assessment.
            </p>
            <div className="hidden lg:block pt-6 border-t border-neutral-900">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-medium mb-1.5">
                Audit Scope Inquiries
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Need details on SOC 2 Type II mappings, ISO 42001 alignment, or custom NDAs for on-premise inspection? Speak with our risk partners.
              </p>
            </div>
          </div>

          {/* Section Right Column / Accordion List */}
          <div className="lg:col-span-8 flex flex-col divide-y divide-neutral-900 border-y border-neutral-900">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={faq.id}>
                  <button
                    type="button"
                    onClick={() => toggleFAQ(idx)}
                    className="w-full py-6 sm:py-7 flex items-start justify-between text-left gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-4">
                      <span className="font-mono text-xs text-neutral-600 pt-1 select-none">
                        0{idx + 1}
                      </span>
                      <span className="font-display font-semibold text-lg sm:text-xl text-neutral-200">
                        {faq.q}
                      </span>
                    </div>
                    <div className="shrink-0 pt-1 text-neutral-500">
                      {isOpen ? (
                        <Minus className="w-5 h-5 text-neutral-400" />
                      ) : (
                        <Plus className="w-5 h-5 text-neutral-500" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-7 pl-8 sm:pl-10 pr-4 sm:pr-8">
                          <p className="font-sans text-sm sm:text-base text-neutral-400 leading-relaxed font-normal">
                            {faq.a}
                          </p>
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
