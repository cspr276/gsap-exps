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
    q: 'Is this a penetration test or a red team?',
    a: 'Both, staged. We start with breadth — automated probing across known attack families to clear the obvious floor — then move to adaptive manual work where the interesting findings live. The difference that matters is chaining: a scanner reports issues individually, a red team combines a small disclosure with a broad permission and shows you the actual consequence.',
  },
  {
    id: 'faq-2',
    q: 'Can prompt injection be fixed?',
    a: 'Not eliminated at the model layer — an LLM receives instructions and data in the same channel, and no amount of prompt wording reliably separates them. It is contained at the architecture layer instead: reduce what a compromised agent can reach, constrain where data can go, and require confirmation for irreversible actions. We test the containment, because that is the thing that actually holds.',
  },
  {
    id: 'faq-3',
    q: 'Do you test the model or the whole system?',
    a: 'The system. A model in isolation has almost no blast radius; the risk appears when you attach retrieval, tools, memory, and credentials. Most of our highest-severity findings are not model weaknesses at all — they are ordinary authorisation mistakes that an AI component made reachable.',
  },
  {
    id: 'faq-4',
    q: 'Will testing put our production data at risk?',
    a: 'No. Work runs against an isolated environment with synthetic or consented data, scoped and agreed in writing before anything starts. Where a finding can only be demonstrated in production, we agree the specific action, the blast radius, and the rollback with you first.',
  },
  {
    id: 'faq-5',
    q: 'What do we get at the end?',
    a: 'A findings report where every item has a reproduction, a demonstrated impact, and a mitigation ranked by durability — architecture first, prompt patches last. Plus the adversarial suite itself, wired into CI so the exploits we found stay closed.',
  },
];

export default function SecurityFAQSection() {
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
              Answers to Key Security &amp; Engagement Questions.
            </h2>
            <p className="font-sans text-base text-neutral-400 leading-relaxed font-normal mb-8">
              Everything security leaders and AI engineering teams need to know about our adversarial testing scope, non-destructive methodologies, and regression gate deliverables.
            </p>
            <div className="hidden lg:block pt-6 border-t border-neutral-900">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-medium mb-1.5">
                Custom Scoping
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Need tailored red-team rules of engagement, specialized threat models, or isolated VPC testing environments? Reach out to our security engineers.
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
