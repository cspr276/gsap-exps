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

      // 3D Perspective Roll-up / Unfold Effect (inspired by OnScrollTypographyAnimations fx6/fx10)
      gsap.fromTo(
        wordSpans,
        {
          opacity: 0,
          rotateX: -65,
          y: 30,
          z: -100,
          transformOrigin: '50% 100%'
        },
        {
          opacity: 1,
          rotateX: 0,
          y: 0,
          z: 0,
          ease: 'power2.out',
          stagger: {
            each: 0.04,
            from: 'start'
          },
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            end: 'bottom 45%',
            scrub: 0.8
          }
        }
      );

      // Staggered fade in for the 3 pillar cards
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
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
      className="relative w-full bg-neutral-950 text-white py-32 px-6 sm:px-12 lg:px-20 border-t border-neutral-900 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-start">
        {/* Subtle pill badge with blue accent */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono tracking-widest uppercase mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span>SYSTEM MANIFESTO</span>
        </div>

        {/* Refined headline with 3D perspective fold-up scrub */}
        <div style={{ perspective: '1200px' }} className="mb-16 max-w-4xl">
          <h2
            ref={titleRef}
            className="font-heading font-medium text-2xl sm:text-3xl md:text-4xl lg:text-[42px] tracking-tight text-neutral-100 leading-[1.3] select-none"
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

        {/* 3 Pillars Grid with Blue/Green Subtle SaaS Accents */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-neutral-800/80">
          {PILLARS.map((item, idx) => (
            <div
              key={item.num}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              className="p-6 rounded-xl border border-neutral-800/70 bg-neutral-900/40 hover:border-neutral-700/90 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4 text-xs font-mono">
                  <span className="text-blue-400 font-bold">{item.num}</span>
                  <span className="text-neutral-400 uppercase tracking-wider">{item.tag}</span>
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed font-normal">
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
