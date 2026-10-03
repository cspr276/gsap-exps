'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Grainient = dynamic(() => import('@/components/Grainient'), { ssr: false });

const DIMENSIONS = [
  {
    category: '01 / PROMPT INJECTION & JAILBREAKS',
    name: 'Direct & Indirect Prompt Injection',
    summary: 'Testing instruction-data boundary collapse across user prompts, ingested documents, and agent memory.',
    criteria: [
      'Direct adversarial jailbreak & multi-turn roleplay evasion',
      'Indirect injection via multi-tenant documents & tool returns',
      'Delimiter escaping, Unicode bidi, and token-smuggling bypasses',
      'Persistent instruction planting in conversational memory',
    ],
  },
  {
    category: '02 / TOOL & AGENT PRIVILEGE ESCALATION',
    name: 'Tool Authority & Excessive Agency',
    summary: 'Auditing credential scopes, unauthorized tool execution, and unconstrained environmental mutations.',
    criteria: [
      'Unintended tool invocation and arbitrary parameter injection',
      'Over-scoped API keys, service roles, and database write access',
      'Circumvention of human-in-the-loop authorization gates',
      'Multi-step lateral movement across internal MCP & API endpoints',
    ],
  },
  {
    category: '03 / RETRIEVAL & VECTOR POISONING',
    name: 'RAG & Knowledge Base Poisoning',
    summary: 'Stress-testing vector indices, embedding space manipulation, and cross-tenant data boundaries.',
    criteria: [
      'Adversarial document planting in vector databases and embeddings',
      'Cross-tenant data bleed and permission bypass in shared indices',
      'Semantic collision attacks manipulating top-k similarity retrieval',
      'Spoofed attribution, citation forging, and poisoned metadata',
    ],
  },
  {
    category: '04 / DATA LEAKAGE & EGRESS CONTROL',
    name: 'Data Exfiltration & Egress Control',
    summary: 'Validating outbound network boundaries, blind SSRF, and sensitive operational disclosure.',
    criteria: [
      'Covert exfiltration via markdown image tags & hyperlinked assets',
      'Blind SSRF and internal port scanning through agent network tools',
      'System prompt and proprietary routing heuristic extraction',
      'PII, API key, and environmental secret leakage under pressure',
    ],
  },
];

function DimensionCard({ dim, idx }: { dim: (typeof DIMENSIONS)[number]; idx: number }) {
  return (
    <div
      className="taxonomy-card relative p-8 rounded-md bg-neutral-950/40 border border-neutral-800 hover:border-neutral-600 transition-colors duration-300 flex flex-col justify-between overflow-hidden group shadow-sm hover:shadow-2xl hover:shadow-black/60 will-change-transform"
    >
      {/* High-visibility pure monochromatic B&W fluid Grainient background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-90 group-hover:opacity-100 transition-opacity duration-500">
        <Grainient
          color1="#000000"
          color2="#303030"
          color3="#808080"
          saturation={0}
          timeSpeed={0.2}
          warpStrength={0.55}
          grainAmount={0.065}
          contrast={1.35}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/90 via-[#09090b]/35 to-[#09090b]/55 pointer-events-none" />
      </div>

      {/* Card Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-neutral-800 group-hover:border-neutral-700 transition-colors">
          <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 group-hover:text-neutral-200 transition-colors font-semibold">
            {dim.category}
          </span>
          <span className="font-mono text-xs text-neutral-500 group-hover:text-neutral-400">
            0{idx + 1}
          </span>
        </div>

        <h3 className="font-display font-bold text-xl text-white mb-2">
          {dim.name}
        </h3>
        <p className="font-sans text-sm text-neutral-300 mb-6 leading-relaxed">
          {dim.summary}
        </p>
      </div>

      <div className="relative z-10 space-y-2.5 pt-4 transition-colors">
        {dim.criteria.map((item) => (
          <div key={item} className="flex items-start gap-2.5 text-xs text-neutral-300 font-sans">
            <span className="text-neutral-500 font-mono text-[11px] select-none pt-0.5 shrink-0">—</span>
            <span className="font-medium">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SecurityTaxonomySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;

      const cards = gsap.utils.toArray<HTMLElement>('.taxonomy-card');
      if (!cards.length) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        // Desktop / tablet: Left cards slide from left, right cards slide from right with to-and-fro scroll scrub
        cards.forEach((card, idx) => {
          const isLeft = idx % 2 === 0;
          gsap.fromTo(
            card,
            {
              x: isLeft ? -110 : 110,
              opacity: 0.1,
            },
            {
              x: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom+=60px',
                end: 'top 48%',
                scrub: 1,
              },
            }
          );
        });
      });

      mm.add('(max-width: 767px)', () => {
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 40, opacity: 0.15 },
            {
              y: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom+=40px',
                end: 'top 55%',
                scrub: 0.8,
              },
            }
          );
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 bg-[#09090b] text-white border-t border-neutral-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-3">
            ATTACK SURFACE TAXONOMY
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-4">
            OWASP LLM Top 10 + 40 Enterprise Attack Vectors.
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-400 leading-relaxed font-normal">
            Every penetration test probes beyond basic prompt injection into compound kill chains, privilege boundaries, and egress leaks.
          </p>
        </div>

        {/* 2-column grid with to-and-fro lateral scroll scrub */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DIMENSIONS.map((dim, idx) => (
            <DimensionCard key={dim.name} dim={dim} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
