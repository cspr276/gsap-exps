'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SpotlightCard from './SpotlightCard';
import { ArrowUpRight } from 'lucide-react';

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
        // Distance the track needs to travel horizontally
        const getScrollDistance = () => track.scrollWidth - window.innerWidth + 140;

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
      className="relative z-30 lg:-mt-[100vh] w-full min-h-screen h-screen max-h-screen bg-neutral-950 text-white pt-20 pb-8 sm:pt-24 sm:pb-10 flex flex-col justify-between overflow-hidden border-t border-neutral-800/80 shadow-[0_-30px_70px_rgba(0,0,0,0.95)]"
    >
      {/* Section Header */}
      <div className="px-6 sm:px-12 lg:px-20 max-w-4xl">
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

      {/* Horizontal Pinned Track: Cards arranged in the SAME horizontal line */}
      <div className="relative w-full overflow-hidden md:overflow-visible pl-6 sm:pl-12 lg:px-20 pb-2">
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row items-stretch gap-6 sm:gap-8 will-change-transform w-fit pr-20"
        >
          {HORIZONTAL_SERVICES.map((item) => (
            <SpotlightCard
              key={item.num}
              spotlightColor="rgba(255, 255, 255, 0.05)"
              className="w-full md:w-[440px] lg:w-[480px] h-[300px] sm:h-[320px] flex-shrink-0 flex flex-col justify-between p-7 sm:p-8 rounded-md border border-neutral-800/90 bg-[#121212] hover:border-neutral-700 transition-all shadow-xl shadow-black/40"
            >
              <div>
                {/* Title */}
                <h3 className="font-display font-bold text-lg sm:text-xl text-white uppercase tracking-tight mb-2.5 leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              {/* Simple Link with Animated Arrow on Hover */}
              <div className="pt-3.5 border-t border-neutral-800/80">
                <a
                  href="/"
                  className="group/link inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-neutral-300 hover:text-white font-semibold transition-colors"
                >
                  <span>Learn more</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 transition-transform duration-300 ease-out group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5 group-hover/link:text-white" />
                </a>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
