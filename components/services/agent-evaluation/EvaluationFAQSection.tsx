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
    q: 'How is this different from running a public benchmark ourselves?',
    a: "Public benchmarks tell you how a model compares to other models on someone else's tasks. They are useful for procurement and almost useless for release decisions, because they do not contain your policies, your tools, or your failure costs. We use them as a sanity floor and build the suite that actually gates your release around your own workflows.",
  },
  {
    id: 'faq-2',
    q: 'Do you use LLM-as-a-judge?',
    a: 'Where the quality dimension is genuinely subjective, yes — but never as an unvalidated instrument. A judge is calibrated against an expert-labelled gold set, its disagreement profile is reported, and anything it scores with low confidence is routed to a human. Where an outcome can be asserted programmatically, we assert it instead; a deterministic verifier beats a judge every time.',
  },
  {
    id: 'faq-3',
    q: 'How do you handle benchmark contamination?',
    a: 'We assume public tasks may be memorised and design around it: held-out task construction, perturbed variants that preserve difficulty while changing surface form, and comparison of behaviour on matched seen and unseen tasks. If a score moves sharply when only the surface changes, that is a memorisation signal, not a capability one.',
  },
  {
    id: 'faq-4',
    q: 'What do we actually receive?',
    a: 'A versioned task suite and harness you keep and can re-run yourself, a decision report tied to your release criteria, a ranked set of failure clusters each with a reproduction, and a regression suite wired into CI. The point is a capability you own, not a PDF.',
  },
  {
    id: 'faq-5',
    q: 'How long does a first engagement take?',
    a: 'A focused evaluation on a defined capability typically runs a few weeks: scoping and task design, harness build, evaluation runs, then reporting and handover. Broad multi-capability programmes run longer and are usually staged so you get a usable suite early rather than everything at the end.',
  },
];

export default function EvaluationFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#09090b] text-white border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Section Left Column / Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold block mb-2.5">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-4">
              Answers to Key Technical & Engagement Questions.
            </h2>
            <p className="font-sans text-base text-neutral-400 leading-relaxed font-normal mb-8">
              Everything engineering leaders and AI practitioners need to know about our evaluation suites, deterministic verifiers, and handover deliverables.
            </p>
            <div className="hidden lg:block pt-6 border-t border-neutral-900">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-medium mb-1.5">
                Custom Inquiries
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Need details on custom VPC deployments, zero-data-retention compliance, or air-gapped test harnesses? Reach out directly.
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
