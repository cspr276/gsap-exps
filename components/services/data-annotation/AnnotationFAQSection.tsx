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
    q: 'Why pairwise comparison instead of ratings?',
    a: 'Because absolute scales drift. Two people who broadly agree about quality will still disagree about whether something is a 6 or a 7, and the same person drifts across a long session. Asking which of two responses is better removes most of that noise, which is why preference data is usually collected that way.',
  },
  {
    id: 'faq-2',
    q: 'How do you prove quality rather than assert it?',
    a: 'Agreement between reviewers and against a gold set, measured per batch and reported to you — plus known-answer items seeded invisibly through the production queue, and a hold-out sample audited by reviewers who did not produce it. If those numbers move, you hear about it while it is still cheap to fix.',
  },
  {
    id: 'faq-3',
    q: 'Can we use our own domain experts?',
    a: 'Often the best arrangement. Your specialists hold context nobody can be trained into quickly, but they are expensive and scarce. We usually put them on specification and adjudication — the highest-judgement steps — and staff the bulk with calibrated reviewers working to their rubric.',
  },
  {
    id: 'faq-4',
    q: 'Do you handle sensitive data?',
    a: 'Under agreed handling terms: minimised fields, scoped access, and reviewers matched to the required clearance. Where identifiers are not needed for the labelling judgement, we prefer not to receive them at all — the safest data is the data you never hold.',
  },
];

export default function AnnotationFAQSection() {
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
              Answers to Quality & Annotation Questions.
            </h2>
            <p className="font-sans text-base text-neutral-400 leading-relaxed font-normal mb-8">
              Everything engineering leaders and AI practitioners need to know about our domain specialist squads, inter-rater concordance metrics, and gold set governance.
            </p>
            <div className="hidden lg:block pt-6 border-t border-neutral-900">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-medium mb-1.5">
                Specialized SOW Scoping
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Need details on custom HIPAA-compliant environments, clearance-vetted reviewers, or multi-modal annotation formats? Reach out directly.
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
