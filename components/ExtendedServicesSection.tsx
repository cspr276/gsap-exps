'use client';

import React from 'react';
import SpotlightCard from './SpotlightCard';
import TiltedCard from './TiltedCard';
import ScrollTypography from './ScrollTypography';
import { ArrowUpRight, Cpu, Layers, ShieldCheck, Zap, Activity } from 'lucide-react';

const EXTENDED_SERVICES = [
  {
    num: '04',
    category: 'INTERFACE SYNTHESIS',
    title: 'Adaptive Generative UI',
    desc: 'Context-aware generative interface engine that streams responsive layouts, real-time controls, and interactive widgets directly into the client DOM.',
    metric: '60 FPS Render',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop'
  },
  {
    num: '05',
    category: 'SECURITY & ATTESTATION',
    title: 'Zero-Knowledge Guardrails',
    desc: 'Cryptographically verifiable execution enclaves validating prompts, preventing memory leakage, and enforcing immutable sandbox security boundaries.',
    metric: 'Zero Proof Verification',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop'
  },
  {
    num: '06',
    category: 'STREAMING EVENT BUS',
    title: 'Reactive Event Fabric',
    desc: 'Ultra-low latency pub/sub bus handling millions of state transitions per second across multi-region edge clusters with backpressure safety.',
    metric: '5M Events / Sec',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop'
  },
  {
    num: '07',
    category: 'COMPUTE COMPILATION',
    title: 'Autonomous Model Distillation',
    desc: 'Dynamic weight pruning and FP8/INT4 quantization compiling inference graphs directly onto target silicon with dramatic memory reduction.',
    metric: '74% Memory Cut',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop'
  },
  {
    num: '08',
    category: 'ENTERPRISE GOVERNANCE',
    title: 'Cryptographic Audit Lineage',
    desc: 'Deterministic execution replays, tamper-evident action logs, and role-based capability gating satisfying stringent enterprise audit requirements.',
    metric: '100% Deterministic',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop'
  }
];

export default function ExtendedServicesSection() {
  return (
    <section
      id="capabilities"
      className="relative w-full bg-neutral-950 text-white py-32 px-6 sm:px-12 lg:px-20 border-t border-neutral-900"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-20 max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 mb-4 block">
            EXTENDED CAPABILITIES
          </span>
          <ScrollTypography
            tag="h2"
            text="ADDITIONAL PLATFORM MODULES"
            tilt={false}
            className="font-display font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white mb-6"
          />
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-normal">
            Modular subsystems engineered for enterprise scalability, cryptographic safety, and hardware acceleration.
          </p>
        </div>

        {/* 3D Tilted Cards & Spotlight Cards Grid from React Bits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EXTENDED_SERVICES.map((item, idx) => (
            <SpotlightCard
              key={item.num}
              spotlightColor="rgba(255, 255, 255, 0.08)"
              className="group flex flex-col justify-between p-8 rounded-lg border border-neutral-800 bg-neutral-900/30 backdrop-blur-sm hover:border-neutral-700 transition-colors"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-6 pb-4 border-b border-neutral-800">
                  <span>MODULE {item.num}</span>
                  <span className="text-neutral-400 uppercase tracking-wider">{item.category}</span>
                </div>

                {/* 3D Tilted Graphic Card Preview (from React Bits) */}
                <div className="mb-6 flex justify-center overflow-hidden rounded-md border border-neutral-800/80 bg-black/40">
                  <TiltedCard
                    imageSrc={item.image}
                    altText={item.title}
                    captionText={`Nexus Module ${item.num}`}
                    containerHeight="200px"
                    containerWidth="100%"
                    imageHeight="200px"
                    imageWidth="100%"
                    rotateAmplitude={10}
                    scaleOnHover={1.04}
                    showMobileWarning={false}
                    showTooltip={false}
                  />
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white uppercase tracking-tight mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                  {item.desc}
                </p>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="text-neutral-300">{item.metric}</span>
                <span className="flex items-center gap-1 group-hover:text-white transition-colors">
                  <span>SPECS</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors" />
                </span>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
