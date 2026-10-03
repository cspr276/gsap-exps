'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';

interface FAQItem {
  id: string;
  q: string;
  a: string;
}

const ABOUT_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    q: 'What does Evalixa AI do?',
    a: 'Evalixa AI helps teams evaluate, secure, improve, and monitor AI systems before and after production. Our work spans AI agent evaluation, model security testing, attack detection, regression monitoring, expert data annotation, SFT/RLHF support, and enterprise AI agent delivery.',
  },
  {
    id: 'faq-2',
    q: 'Is Evalixa AI only an AI testing company?',
    a: 'No. Evaluation and security are foundational to our mission, but Evalixa also builds production AI agents, creates expert human-in-the-loop review workflows, prepares specialist datasets, and helps teams operate autonomous systems with auditable evidence and governance.',
  },
  {
    id: 'faq-3',
    q: 'Who is Evalixa AI built for?',
    a: 'Evalixa is built for startups, scale-ups, research labs, and enterprise engineering teams that need dependable AI quality without staffing every niche security and evaluation discipline in-house. The best fit is a team that demands deterministic proof, not generic PDF summaries.',
  },
  {
    id: 'faq-4',
    q: 'How does Evalixa approach AI evaluation?',
    a: 'We anchor directly in the operational tasks the AI must execute. We design deterministic pass/fail harnesses, held-out edge cases, adversarial exploit suites, and specialist reviewer rubrics around your live production context to surface failure modes before users encounter them.',
  },
  {
    id: 'faq-5',
    q: 'What is Ocito on the Evalixa website?',
    a: 'Ocito is the AI assistant built into the Evalixa platform. It assists visitors in exploring technical services, evaluating project scopes, navigating careers, and routing specific engineering inquiries directly to the senior team.',
  },
  {
    id: 'faq-6',
    q: 'What is the Expert Contributor pathway?',
    a: 'The contributor program is designed for domain specialists (physicians, attorneys, financial analysts, and ML researchers) who want to participate in high-impact milestone evaluation projects, benchmark calibration, and reasoning annotation.',
  },
  {
    id: 'faq-7',
    q: 'Who qualifies as an Expert Contributor?',
    a: 'We evaluate candidates based on verifiable credentials, industry standing, and domain depth. Contributors support evaluation suites, preference data pipelines, and ambiguous reasoning trace adjudication matching their domain background.',
  },
  {
    id: 'faq-8',
    q: 'Does registering as a contributor guarantee project work?',
    a: 'No. Registration initiates our calibration review. Project assignments depend on domain specialization, verified inter-annotator agreement scores, availability, and active client program requirements.',
  },
  {
    id: 'faq-9',
    q: 'How should an organization initiate a project with Evalixa?',
    a: 'Organizations can reach out directly with details regarding their AI architecture, target launch timeline, critical risk parameters, and the release decisions requiring evidence. We immediately recommend the appropriate engagement path.',
  },
  {
    id: 'faq-10',
    q: 'Where is Evalixa AI based?',
    a: 'Evalixa operates as a remote-first, globally distributed team with timezone coverage across North America, Europe, and Asia. Engagements are structured with daily timezone overlap, senior practitioner involvement, and rigorous async documentation.',
  },
];

export default function AboutFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative z-20 w-full py-24 sm:py-32 bg-[#09090b] text-white border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Sticky Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold block mb-3">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-4">
              Questions About Evalixa AI & Engagements.
            </h2>
            <p className="font-sans text-sm sm:text-base text-neutral-400 leading-relaxed font-normal mb-8">
              Straightforward answers for teams evaluating our services, learning how we operate, or exploring the contributor network.
            </p>

            <div className="pt-6 border-t border-neutral-900 hidden lg:block">
              <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block mb-2">
                Have a specific architecture question?
              </span>
              <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                Our senior researchers and engineering leads are available to discuss your deployment topology and release criteria.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-white font-semibold hover:text-neutral-300 transition-colors"
              >
                <span>Initiate a Conversation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Accordion List */}
          <div className="lg:col-span-8 flex flex-col divide-y divide-neutral-900 border-y border-neutral-900">
            {ABOUT_FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={faq.id}>
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
