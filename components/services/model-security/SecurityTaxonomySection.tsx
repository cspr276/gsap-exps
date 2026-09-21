'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

const Grainient = dynamic(() => import('@/components/Grainient'), { ssr: false });

const DIMENSIONS = [
  {
    category: '01 / PROMPT INJECTION & JAILBREAKS',
    name: 'Direct & Indirect Prompt Injection',
    summary: 'Testing instruction-data boundary collapse across user prompts, ingested documents, and agent memory.',
    grainientColors: { color1: '#3d1616', color2: '#5c2222', color3: '#873131' },
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
    grainientColors: { color1: '#3d2510', color2: '#5c3818', color3: '#875323' },
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
    grainientColors: { color1: '#142542', color2: '#233d6b', color3: '#365d9c' },
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
    grainientColors: { color1: '#123829', color2: '#1c543e', color3: '#2a7d5c' },
    criteria: [
      'Covert exfiltration via markdown image tags & hyperlinked assets',
      'Blind SSRF and internal port scanning through agent network tools',
      'System prompt and proprietary routing heuristic extraction',
      'PII, API key, and environmental secret leakage under pressure',
    ],
  },
];

function DimensionCard({ dim, idx }: { dim: (typeof DIMENSIONS)[number]; idx: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative p-8 rounded-md bg-neutral-900/40 border border-neutral-800 hover:border-neutral-600 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-sm hover:shadow-xl hover:shadow-black/50"
    >
      {/* Ambient dynamic fluid Grainient on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
          >
            <Grainient
              color1={dim.grainientColors.color1}
              color2={dim.grainientColors.color2}
              color3={dim.grainientColors.color3}
              timeSpeed={0.2}
              warpStrength={0.5}
              grainAmount={0.06}
              contrast={1.15}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/65 via-transparent to-neutral-950/40 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-neutral-800 group-hover:border-neutral-700 transition-colors">
          <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 group-hover:text-neutral-300 transition-colors font-semibold">
            {dim.category}
          </span>
        </div>

        <h3 className="font-display font-bold text-xl text-white mb-2">
          {dim.name}
        </h3>
        <p className="font-sans text-sm text-neutral-300 mb-6 leading-relaxed">
          {dim.summary}
        </p>
      </div>

      <div className="relative z-10 space-y-2.5 pt-4 border-t border-neutral-800 group-hover:border-neutral-700 transition-colors">
        {dim.criteria.map((item) => (
          <div key={item} className="flex items-start gap-2.5 text-xs text-neutral-300 font-sans">
            <span className="font-mono text-neutral-500 group-hover:text-neutral-400 select-none shrink-0">—</span>
            <span className="font-medium">{item}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function SecurityTaxonomySection() {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#09090b] text-white border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold block mb-3">
            SECURITY TAXONOMY
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-4">
            The 4 Core AI Vulnerability Dimensions.
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-400 leading-relaxed font-normal">
            Comprehensive attack surface coverage mapping OWASP GenAI Top 10, NIST AI RMF, and real-world agentic attack vectors.
          </p>
        </div>

        {/* Crisp cards with rounded-md borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DIMENSIONS.map((dim, idx) => (
            <DimensionCard key={dim.name} dim={dim} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
