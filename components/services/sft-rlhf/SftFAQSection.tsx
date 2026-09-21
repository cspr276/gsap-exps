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
    q: 'Will fine-tuning make the model smarter?',
    a: 'No, and this is the most common misconception. Adaptation shapes behaviour — format, tone, task convention, judgement — within the capability the base model already has. If the model fundamentally cannot do the task, training on a few thousand examples will not change that; a different base model might.',
  },
  {
    id: 'faq-2',
    q: 'SFT, RLHF, or DPO?',
    a: 'It depends on the gap and your operational constraints, and the honest answer is that the dataset matters far more than the choice. Demonstrations teach "do it like this"; preference data teaches "this is better than that". We pick the simplest method that expresses the judgement you need, because simpler pipelines are cheaper to maintain and easier to debug.',
  },
  {
    id: 'faq-3',
    q: 'How much data do we need?',
    a: 'Less than most teams assume, if it is good — and far more than they hope, if it is not. A few thousand carefully curated, agreement-checked examples routinely outperform a much larger noisy set. We would rather spend the budget on reviewer calibration than on volume.',
  },
  {
    id: 'faq-4',
    q: 'What happens when the base model updates?',
    a: 'You re-evaluate, which is why the baseline set matters so much. Base models improve quickly, and an adapted model from last year can end up behind the current stock one. Part of maintaining a trained model is being willing to retire it.',
  },
];

export default function SftFAQSection() {
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
              Answers to Key Adaptation Questions.
            </h2>
            <p className="font-sans text-base text-neutral-400 leading-relaxed font-normal mb-8">
              Everything engineering leaders and AI practitioners need to know about dataset sizing, method selection, and checkpoint maintenance.
            </p>
            <div className="hidden lg:block pt-6 border-t border-neutral-900">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-medium mb-1.5">
                Technical Scoping
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Need to discuss specialized LoRA vs full fine-tuning, on-premise GPU clusters, or private VPC alignment? Reach out directly.
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
