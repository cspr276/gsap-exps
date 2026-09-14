'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SpotlightCard from './SpotlightCard';
import DecryptedText from './DecryptedText';
import ShinyText from './ShinyText';
import { Shield, Zap, Activity, Globe, ArrowUpRight, Cpu } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STATS = [
  {
    label: 'MEDIAN EXECUTION LATENCY',
    value: '< 1.4ms',
    sub: 'Sub-millisecond inference routing'
  },
  {
    label: 'DETERMINISTIC ACCURACY',
    value: '99.98%',
    sub: 'Formal Zk-attested verifications'
  },
  {
    label: 'MONTHLY TOKENS STREAMED',
    value: '14.2B+',
    sub: 'Distributed across 80+ global edges'
  },
  {
    label: 'ENTERPRISE SLA UPTIME',
    value: '99.999%',
    sub: 'Zero downtime rolling mesh updates'
  }
];

export default function MetricsBentoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      // Stagger stats reveal
      gsap.from(statsRef.current, {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="metrics"
      ref={containerRef}
      className="relative w-full bg-neutral-950 text-white py-24 px-6 sm:px-12 lg:px-20 border-t border-white/10"
    >
      {/* Background radial glow */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-emerald-400 mb-4">
            <Activity className="w-3.5 h-3.5" />
            <span>MEASURED AT LINE SPEED</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            <DecryptedText
              text="Uncompromising Precision & Scale"
              speed={40}
              maxIterations={8}
              animateOn="view"
              className="text-white"
              encryptedClassName="text-emerald-400/80 font-mono"
            />
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Every layer of Evalixa is benchmarked against real-world mission-critical workloads, ensuring absolute determinism and microsecond reliability.
          </p>
        </div>

        {/* 4 Stat Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {STATS.map((stat, idx) => (
            <div
              key={stat.label}
              ref={(el) => {
                statsRef.current[idx] = el;
              }}
              className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl relative group hover:border-emerald-500/40 transition-colors duration-300"
            >
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-3">
                {stat.label}
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">
                {stat.value}
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Bento Cards Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bento Card 1 (2 Cols Wide) */}
          <SpotlightCard
            spotlightColor="rgba(16, 185, 129, 0.2)"
            className="md:col-span-2 p-8 rounded-3xl border-white/15 bg-neutral-900/50 backdrop-blur-xl flex flex-col justify-between min-h-[300px]"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                  REAL-TIME SYNCHRONIZATION
                </span>
                <Globe className="w-5 h-5 text-neutral-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Global Edge Consensual Mesh
              </h3>
              <p className="text-neutral-300 text-sm leading-relaxed max-w-xl">
                Distributed Byzantine fault-tolerant protocols synchronize agent memory partitions across 84 worldwide PoPs in under 15ms.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>84 Global PoPs active</span>
              <span className="text-emerald-400">Zero Desynchronization</span>
            </div>
          </SpotlightCard>

          {/* Bento Card 2 (1 Col Wide) */}
          <SpotlightCard
            spotlightColor="rgba(99, 102, 241, 0.2)"
            className="p-8 rounded-3xl border-white/15 bg-neutral-900/50 backdrop-blur-xl flex flex-col justify-between min-h-[300px]"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
                  HARDWARE ACCEL
                </span>
                <Cpu className="w-5 h-5 text-neutral-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Direct Silicon Fused Ops
              </h3>
              <p className="text-neutral-300 text-sm leading-relaxed">
                Direct compilation to native GPU instructions bypassing traditional driver translation layers.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>CUDA / Metal / ROCm</span>
              <span className="text-indigo-400">+340% Bandwidth</span>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
