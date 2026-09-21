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
    q: 'Do we need agents, or would automation do?',
    a: 'Frequently automation would do, and we will tell you when. Agents earn their complexity where the input is unstructured and the path varies. If the workflow is deterministic, a script is cheaper, faster and easier to reason about — and nobody has to evaluate it every quarter.',
  },
  {
    id: 'faq-2',
    q: 'Which model do you use?',
    a: "Whichever fits the task, and we keep that swappable on purpose. Model choice moves quickly; the surrounding architecture — permissions, tracing, evaluation — is what you actually own. Systems built around one provider's specifics tend to age badly.",
  },
  {
    id: 'faq-3',
    q: 'How do you stop it doing something expensive?',
    a: 'Structurally, not by asking it nicely. Scoped credentials, hard spend and rate limits, idempotency on anything that costs money, and confirmation gates on irreversible actions. Prompt instructions are the weakest control available and we never rely on them alone.',
  },
  {
    id: 'faq-4',
    q: 'What does the first engagement look like?',
    a: 'One workflow, end to end, including the operational half — evaluation, tracing, permissions and rollout plan. You get something in production you can judge honestly, plus a clear-eyed view of whether the next workflow is worth doing.',
  },
];

export default function EnterpriseFAQSection() {
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
              Answers Before You Commit.
            </h2>
            <p className="font-sans text-base text-neutral-400 leading-relaxed font-normal mb-8">
              Everything engineering leaders and product teams need to know about our enterprise agent architecture, blast-radius isolation, and engagement model.
            </p>
            <div className="hidden lg:block pt-6 border-t border-neutral-900">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-medium mb-1.5">
                Direct Technical Inquiries
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Have specific constraints regarding self-hosted air-gapped LLMs, VPC peering, or custom HSM cryptographic keys? Get in touch directly with our systems team.
              </p>
            </div>
          </div>

          {/* Section Right Column / Accordion List with subtle divider lines */}
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
