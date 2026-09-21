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
    id: 'faq-complaints',
    q: 'Can we not just watch user complaints?',
    a: 'Complaints are a real signal but a badly lagging one, and they are heavily biased toward your most vocal users. By the time a pattern is visible in support tickets, the degradation has usually been running for weeks. Implicit signals — retries, abandonment, escalation — capture most of the same information far sooner.',
  },
  {
    id: 'faq-scoring-volume',
    q: 'How much traffic do you score?',
    a: 'A stratified sample, not everything — scoring all traffic with a model judge is rarely justifiable. We weight sampling toward high-impact flows and unusual inputs, then run heavier evaluation on anything the cheap signals flag.',
  },
  {
    id: 'faq-drift-definition',
    q: 'What actually counts as drift here?',
    a: 'Any distribution shift that moves quality: inputs changing as your users change, outputs changing after a model or prompt update, or retrieval changing as the index grows. They need different detection and different responses, so we track them separately rather than as one number.',
  },
  {
    id: 'faq-platform-requirements',
    q: 'Does this need a specific platform?',
    a: 'No. We build on standard tracing so the data stays portable and you are not locked to one vendor. If you already run an observability platform, we extend it rather than replacing it — the value is in the signals and the loop, not the dashboard.',
  },
];

export default function MonitoringFAQSection() {
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
              Answers to Key Architecture Questions.
            </h2>
            <p className="font-sans text-base text-neutral-400 leading-relaxed font-normal mb-8">
              Everything engineering leaders and AI operations teams need to know about our production telemetry, drift detection, and CI regression suites.
            </p>
            <div className="hidden lg:block pt-6 border-t border-neutral-900">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-medium mb-1.5">
                Enterprise Inquiries
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Need details on custom OpenTelemetry collectors, self-hosted clickhouse spans, or zero-data-retention compliance? Reach out directly.
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
