'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SpotlightCard from './SpotlightCard';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HORIZONTAL_SERVICES = [
  {
    num: '04',
    category: 'INTERFACE SYNTHESIS',
    title: 'Adaptive Generative UI',
    desc: 'Context-aware generative interface engine that streams responsive layouts, real-time controls, and interactive widgets directly into the client DOM.',
    metric: '60 FPS Stream Rate'
  },
  {
    num: '05',
    category: 'SECURITY & ATTESTATION',
    title: 'Zero-Knowledge Guardrails',
    desc: 'Cryptographically verifiable execution enclaves validating prompts, preventing memory leakage, and enforcing immutable sandbox security boundaries.',
    metric: 'Zero Proof Verification'
  },
  {
    num: '06',
    category: 'STREAMING EVENT BUS',
    title: 'Reactive Event Fabric',
    desc: 'Ultra-low latency pub/sub bus handling millions of state transitions per second across multi-region edge clusters with backpressure safety.',
    metric: '5M Events / Sec'
  },
  {
    num: '07',
    category: 'COMPUTE COMPILATION',
    title: 'Autonomous Model Distillation',
    desc: 'Dynamic weight pruning and FP8/INT4 quantization compiling inference graphs directly onto target silicon with dramatic memory reduction.',
    metric: '74% Memory Reduction'
  },
  {
    num: '08',
    category: 'ENTERPRISE GOVERNANCE',
    title: 'Cryptographic Audit Lineage',
    desc: 'Deterministic execution replays, tamper-evident action logs, and role-based capability gating satisfying stringent enterprise compliance requirements.',
    metric: '100% Deterministic Replay'
  }
];

export default function HorizontalServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        // Card width is 490px. Card 04 starts centered at 50vw.
        // Scroll distance travels from card 04 centered through card 08 centered + exit buffer.
        const cardWidth = 490;
        const getScrollDistance = () => track.scrollWidth - cardWidth + 240;

        gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none', // Official GSAP rule for horizontal containerAnimation
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: 'top top',
            end: () => `+=${getScrollDistance()}`,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="relative z-30 lg:-mt-[100vh] w-full min-h-screen h-screen bg-neutral-950 text-white pt-16 sm:pt-20 lg:pt-22 pb-8 flex flex-col justify-start overflow-hidden border-t border-neutral-800/80 shadow-[0_-30px_70px_rgba(0,0,0,0.95)]"
    >
      {/* Section Header */}
      <div className="px-6 sm:px-12 lg:px-20 max-w-4xl flex-shrink-0">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 mb-1.5 block">
          EXTENDED SERVICES
        </span>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white mb-2 leading-tight">
          ADDITIONAL PLATFORM MODULES
        </h2>
        <p className="text-neutral-400 text-xs sm:text-sm font-normal max-w-xl">
          Scroll vertically to pan through the remaining core services and capabilities in horizontal sequence.
        </p>
      </div>

      {/* Horizontal Pinned Track: Card 04 starts centered in viewport on desktop */}
      <div className="relative w-full overflow-hidden md:overflow-visible pl-6 sm:pl-12 lg:pl-[calc(50vw-245px)] mt-6 sm:mt-8 lg:mt-10 pb-4">
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row items-stretch gap-6 sm:gap-8 will-change-transform w-fit pr-20"
        >
          {HORIZONTAL_SERVICES.map((item) => (
            <SpotlightCard
              key={item.num}
              spotlightColor="rgba(255, 255, 255, 0.05)"
              className="group/card w-full md:w-[460px] lg:w-[490px] h-[380px] sm:h-[420px] lg:h-[440px] flex-shrink-0 flex flex-col justify-between p-8 sm:p-9 rounded-md border border-neutral-800/90 bg-[#121212] hover:border-neutral-700 transition-all shadow-xl shadow-black/40 cursor-default"
            >
              <div className="flex flex-col">
                {/* 1. Top Number */}
                <div className="mb-4 sm:mb-6">
                  <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-neutral-400 uppercase">
                    {item.num}
                  </span>
                </div>

                {/* 2. Heading below number */}
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white uppercase tracking-tight mb-3 sm:mb-4 leading-snug">
                  {item.title}
                </h3>

                {/* 3. Content below heading */}
                <p className="text-neutral-400 text-xs sm:text-sm sm:text-[15px] leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              {/* 4. Link below with hover rotation from 45deg to straight 0deg */}
              <div className="pt-5 sm:pt-6 border-t border-neutral-800/80">
                <a
                  href="/"
                  className="group/link inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-wider uppercase text-neutral-300 group-hover/card:text-white font-semibold transition-colors"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400 -rotate-45 group-hover/card:rotate-0 group-hover/card:text-white group-hover/card:translate-x-0.5 transition-all duration-300 ease-out origin-center" />
                </a>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
