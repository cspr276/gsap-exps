'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SpotlightCard from './SpotlightCard';
import ShinyText from './ShinyText';
import { ArrowRight, Cpu, Layers, ShieldCheck, Zap, Network, Terminal } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MODULE_CARDS = [
  {
    icon: Cpu,
    tag: 'HARDWARE ACCELERATION',
    title: 'Custom Silicon Graph Kernels',
    desc: 'Fused CUDA and Metal shaders compiling recursive matrix calculations directly on device memory for near-zero bus transfer latency.',
    metric: '3.4x TFLOPS / Watt',
    codeSnippet: 'evalixa.compile_kernel({ fusion: "dense_sparse", precision: "fp8" })'
  },
  {
    icon: Layers,
    tag: 'ORCHESTRATION',
    title: 'Self-Compacting Memory Trees',
    desc: 'Automated pruning of redundant conversational context, reducing token usage by up to 74% while preserving 100% semantic fidelity.',
    metric: '74% Token Reduction',
    codeSnippet: 'tree.compact({ strategy: "semantic_distill", depth_retention: 0.99 })'
  },
  {
    icon: ShieldCheck,
    tag: 'SECURITY',
    title: 'Deterministic State Attestation',
    desc: 'Cryptographic hash trees validating every inference decision with zero-knowledge audit trails for mission-critical operations.',
    metric: 'Zero Proof Verification',
    codeSnippet: 'zk.attest_execution({ root_hash: state.digest, enclave: "sgx_v2" })'
  },
  {
    icon: Network,
    tag: 'NETWORKING',
    title: 'Multipath Global P2P Mesh',
    desc: 'Decentralized peer-to-peer relay nodes dynamically balancing workloads across global edge servers with automated failover.',
    metric: '< 12ms Global P99',
    codeSnippet: 'mesh.route({ routing_tier: "ultra_low_latency", redundancy: 3 })'
  },
  {
    icon: Zap,
    tag: 'INFERENCE ENGINE',
    title: 'Real-Time Dynamic Quantization',
    desc: 'On-the-fly precision adjustments shifting between INT4, INT8, and FP16 based on cognitive complexity and temperature thresholds.',
    metric: '180 Tokens / Sec',
    codeSnippet: 'engine.auto_quantize({ target_throughput: 180, dynamic_fp8: true })'
  }
];

export default function HorizontalCardsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        const track = trackRef.current;
        if (!track) return;

        // Calculate horizontal distance: scroll width minus viewport width plus margin
        const scrollAmount = track.scrollWidth - window.innerWidth + 120;

        gsap.to(track, {
          x: -scrollAmount,
          ease: 'none', // Critical rule from official GSAP skill
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            start: 'top top',
            end: () => `+=${scrollAmount}`,
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
      id="modules"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-neutral-950 text-white overflow-hidden py-24 flex flex-col justify-center"
    >
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <div className="px-6 sm:px-12 lg:px-20 mb-12 max-w-5xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-emerald-400 mb-3">
          <span>SCROLL DRIVEN MODULES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Engineered for Extreme{' '}
          <ShinyText
            text="Autonomous Scale"
            speed={3}
            color="#a1a1aa"
            shineColor="#ffffff"
          />
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          Scroll through our high-performance core modules. Each card features real-time cursor spotlight tracking and direct hardware telemetry.
        </p>
      </div>

      {/* Horizontal Scroll Track Container */}
      <div className="relative w-full overflow-hidden md:overflow-visible pl-6 sm:pl-12 lg:pl-20">
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row gap-6 will-change-transform w-fit pr-12"
        >
          {MODULE_CARDS.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <SpotlightCard
                key={card.title}
                spotlightColor="rgba(16, 185, 129, 0.25)"
                className="w-full md:w-[480px] flex-shrink-0 flex flex-col justify-between border-white/15 bg-neutral-900/60 backdrop-blur-xl p-8 rounded-3xl"
              >
                <div>
                  {/* Card Top */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-emerald-400">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-neutral-500">
                      MODULE 0{idx + 1}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono tracking-wider uppercase text-emerald-400/90 font-semibold mb-2 block">
                    {card.tag}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                    {card.title}
                  </h3>

                  <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                    {card.desc}
                  </p>

                  {/* Code snippet block */}
                  <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-neutral-400 flex items-center gap-2 mb-6">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="truncate">{card.codeSnippet}</span>
                  </div>
                </div>

                {/* Card Bottom */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono">
                  <span className="text-emerald-400 font-semibold">
                    {card.metric}
                  </span>
                  <div className="flex items-center gap-1 text-neutral-400 group-hover:text-white transition-colors">
                    <span>Deploy Module</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
