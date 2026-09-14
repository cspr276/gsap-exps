'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MANIFESTO_TEXT =
  "We are architecting the foundational execution layer where autonomous intelligence operates deterministically, self-heals across edge failures, and compiles directly into native silicon instructions.";

const PILLARS = [
  {
    num: "01",
    tag: "DETERMINISTIC RIGOR",
    desc: "Zero tolerance for hallucination or context drift. Every action is cryptographically attested and verified across consensus nodes before state commits."
  },
  {
    num: "02",
    tag: "SILICON COMPILATION",
    desc: "Bypassing heavy virtualization layers. Agent compute graphs compile directly into bare-metal GPU instructions with sub-millisecond dispatch."
  },
  {
    num: "03",
    tag: "CONTINUOUS SCALE",
    desc: "Engineered from first principles for infinite horizontal concurrency across globally partitioned edge mesh clusters with self-balancing workloads."
  }
];

export default function ManifestoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const words = MANIFESTO_TEXT.split(' ');

  useGSAP(
    () => {
      const title = titleRef.current;
      if (!title) return;

      const wordSpans = title.querySelectorAll('.manifesto-word');

      // Subtle, sleek progressive illumination effect (inspired by anims-refer set 2 fx16)
      gsap.fromTo(
        wordSpans,
        {
          opacity: 0.15,
          y: 12,
        },
        {
          opacity: 1,
          y: 0,
          ease: 'none',
          stagger: 0.04,
          scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: 0.6
          }
        }
      );

      // Staggered fade in for the 3 pillar cards
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="manifesto"
      ref={containerRef}
      className="relative w-full bg-[#f6f6f8] text-neutral-900 py-28 sm:py-32 px-6 sm:px-12 lg:px-20 border-t border-neutral-200 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-start">
        {/* Clean Typographic Label (No pills) */}
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 mb-6 block">
          SYSTEM MANIFESTO
        </span>

        {/* Refined headline with elegant smooth word illumination */}
        <div className="mb-14 max-w-4xl">
          <h2
            ref={titleRef}
            className="font-heading font-medium text-xl sm:text-2xl md:text-3xl lg:text-[34px] tracking-tight text-neutral-900 leading-[1.35] select-none"
          >
            {words.map((word, idx) => (
              <span
                key={idx}
                className="manifesto-word inline-block mr-[0.28em] will-change-[transform,opacity]"
              >
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* 3 Pillars Grid with crisp rectangular cards and clean monochrome styling */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-neutral-200/90">
          {PILLARS.map((item, idx) => (
            <div
              key={item.num}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              className="p-6 sm:p-7 rounded-md border border-neutral-200/90 bg-white hover:border-neutral-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4 text-xs font-mono">
                  <span className="text-neutral-900 font-bold">{item.num}</span>
                  <span className="text-neutral-500 uppercase tracking-wider">{item.tag}</span>
                </div>
                <p className="text-neutral-600 text-sm leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
