'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const THESIS_TEXT =
  'Foundation models have evolved from passive text generators into autonomous agents capable of mutating production databases, executing financial transactions, and governing enterprise operations. Yet most organizations still evaluate them with static academic leaderboards and subjective vibes. Evalixa was founded on a single engineering conviction: autonomous systems demand deterministic, adversarial, and human-calibrated proof before they touch production.';

const PARADIGM_COMPARISONS = [
  {
    id: '01',
    domain: 'BENCHMARKING METHODOLOGY',
    legacyTitle: 'Static Public Leaderboards',
    legacyDesc:
      'Models overfit to contaminated public datasets (MMLU, GSM8K) that bear zero resemblance to your internal APIs, schemas, or multi-turn edge cases.',
    evalixaTitle: 'Task-Grounded Production Suites',
    evalixaDesc:
      'Extracted directly from your real enterprise workflows, tool schemas, and historical failure logs with strict programmatic pass/fail invariants.',
    metric: '100% Domain-Specific Coverage',
  },
  {
    id: '02',
    domain: 'SECURITY & ROBUSTNESS',
    legacyTitle: 'Single-Turn Happy-Path Checks',
    legacyDesc:
      'Surface-level prompt filters that crumble when exposed to multi-turn context manipulation, indirect document injection, or tool-call privilege escalation.',
    evalixaTitle: 'Adaptive Adversarial Red-Teaming',
    evalixaDesc:
      'Automated and specialist-led exploit chains simulating sophisticated attackers across multi-step reasoning paths and live runtime guardrails.',
    metric: 'Zero-Escape Exploit Containment',
  },
  {
    id: '03',
    domain: 'HUMAN JUDGMENT & SCORING',
    legacyTitle: 'Uncalibrated Crowdworkers & Black-Box LLM Judges',
    legacyDesc:
      'Noisy, generic annotators and unverified LLM-as-a-Judge pipelines that hallucinate rubrics and drift silently across model updates.',
    evalixaTitle: 'Triple-Blind Calibrated Domain Specialists',
    evalixaDesc:
      'Credentialed attorneys, clinicians, engineers, and financial analysts adjudicated with mathematical inter-rater agreement (Krippendorff’s α > 0.90).',
    metric: 'Cryptographically Audited Traces',
  },
];

export default function AboutOriginSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const thesisRef = useRef<HTMLHeadingElement>(null);
  const splitBannerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const thesisWords = THESIS_TEXT.split(' ');

  useGSAP(
    () => {
      const section = sectionRef.current;
      const thesis = thesisRef.current;
      const splitBanner = splitBannerRef.current;
      const cardsContainer = cardsContainerRef.current;
      if (!section) return;

      // 1. OnScrollTypographyAnimations (fx16 + fx6 inspired):
      // Progressive word illumination + subtle 3D perspective tilt on scroll
      if (thesis) {
        const wordEls = thesis.querySelectorAll('.thesis-word');

        gsap.fromTo(
          thesis,
          {
            transformOrigin: '0% 50%',
            rotate: 1.5,
          },
          {
            rotate: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: thesis,
              start: 'top 88%',
              end: 'bottom 50%',
              scrub: 0.6,
            },
          }
        );

        gsap.fromTo(
          wordEls,
          {
            opacity: 0.14,
            y: 14,
            rotateX: -35,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            ease: 'none',
            stagger: 0.03,
            scrollTrigger: {
              trigger: thesis,
              start: 'top 85%',
              end: 'bottom 45%',
              scrub: 0.5,
            },
          }
        );
      }

      // 2. OneElementScroll (animateSpansOnScroll inspired):
      // Alternating horizontal slide of large typographic spans on scroll
      if (splitBanner) {
        const spans = splitBanner.querySelectorAll('.alternating-span');
        spans.forEach((span, idx) => {
          const direction = idx % 2 === 0 ? -120 : 120;
          gsap.fromTo(
            span,
            {
              x: direction,
              opacity: 0.2,
            },
            {
              x: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: splitBanner,
                start: 'top 90%',
                end: 'top 40%',
                scrub: 0.8,
              },
            }
          );
        });
      }

      // 3. Staggered Scroll Reveal for Paradigm Shift Cards
      if (cardsContainer) {
        const cards = cardsContainer.querySelectorAll('.paradigm-card');
        cards.forEach((card, idx) => {
          gsap.fromTo(
            card,
            {
              y: 48,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              delay: idx * 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="origin"
      ref={sectionRef}
      className="relative z-20 w-full bg-white text-neutral-950 py-24 sm:py-32 border-t border-b border-neutral-200 shadow-[0_-30px_70px_rgba(0,0,0,0.85)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Eyebrow */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-12 border-b border-neutral-200 gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-sm bg-neutral-950 text-white uppercase tracking-widest">
              01 // ORIGIN & THESIS
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold">
              WHY EVALIXA EXISTS
            </span>
          </div>
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider">
            [ARCHITECTURAL MANIFESTO]
          </span>
        </div>

        {/* Scroll-Scrubbed Kinetic Typography Statement */}
        <div className="max-w-6xl mb-24 sm:mb-28" style={{ perspective: '1200px' }}>
          <h2
            ref={thesisRef}
            className="font-display font-bold text-2xl sm:text-4xl lg:text-[42px] text-neutral-950 tracking-tight leading-[1.28] select-none"
          >
            {thesisWords.map((word, idx) => (
              <span
                key={idx}
                className="thesis-word inline-block mr-[0.28em] will-change-[transform,opacity]"
              >
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* Alternating Span Banner (OneElementScroll reference) */}
        <div
          ref={splitBannerRef}
          className="py-12 sm:py-16 mb-16 border-y border-neutral-200 flex flex-col items-center justify-center text-center overflow-hidden select-none"
        >
          <span className="alternating-span block font-display font-black text-3xl sm:text-5xl lg:text-7xl tracking-tight text-neutral-300 uppercase leading-none mb-2 sm:mb-3 will-change-transform">
            FROM SUBJECTIVE VIBES
          </span>
          <span className="alternating-span block font-display font-black text-3xl sm:text-5xl lg:text-7xl tracking-tight text-neutral-950 uppercase leading-none will-change-transform">
            TO DETERMINISTIC PROOF.
          </span>
        </div>

        {/* Paradigm Shift Comparison Grid */}
        <div ref={cardsContainerRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {PARADIGM_COMPARISONS.map((item) => (
            <div
              key={item.id}
              className="paradigm-card group rounded-md border border-neutral-200 bg-[#fbfbfd] hover:border-neutral-900 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-neutral-950/5"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-200">
                  <span className="font-mono text-xs font-bold text-neutral-950">
                    {item.id}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">
                    {item.domain}
                  </span>
                </div>

                {/* Legacy Approach */}
                <div className="mb-6 p-4 rounded-sm bg-neutral-100/80 border border-neutral-200/80">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">
                      LEGACY INDUSTRY DEFAULT
                    </span>
                    <span className="font-mono text-[10px] text-neutral-400">DEPRECATED</span>
                  </div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-neutral-600 line-through decoration-neutral-400 mb-1.5">
                    {item.legacyTitle}
                  </h3>
                  <p className="font-sans text-xs text-neutral-500 leading-relaxed">
                    {item.legacyDesc}
                  </p>
                </div>

                {/* The Evalixa Standard */}
                <div className="p-4 rounded-sm bg-white border border-neutral-900 shadow-sm">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-950 font-bold">
                      THE EVALIXA STANDARD
                    </span>
                    <span className="w-2 h-2 rounded-full bg-neutral-950" />
                  </div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-neutral-950 mb-2">
                    {item.evalixaTitle}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {item.evalixaDesc}
                  </p>
                </div>
              </div>

              {/* Bottom Metric Badge */}
              <div className="mt-6 pt-4 border-t border-neutral-200 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                  ASSURANCE OUTCOME
                </span>
                <span className="font-mono text-[11px] font-bold text-neutral-950 bg-neutral-100 px-2.5 py-1 rounded-sm border border-neutral-300">
                  {item.metric}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
