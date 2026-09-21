'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface RealityItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  stat: string;
  statLabel: string;
  image: string;
}

const REALITIES: RealityItem[] = [
  {
    id: 'shadow-ai',
    title: 'The Shadow AI Estate',
    subtitle: 'Systems built and bought with no central register',
    description:
      'Enterprise departments routinely deploy AI-enabled SaaS tools, third-party copilots, and autonomous pipelines without central security registration. What IT cannot see, compliance cannot defend.',
    stat: '68% Untracked',
    statLabel: 'Estimated shadow AI deployments',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'over-privilege',
    title: 'Excessive Credential Over-Privilege',
    subtitle: 'Agents running with unrestricted service accounts',
    description:
      'Autonomous agents frequently operate under admin-level API keys with unrestricted tool scopes and unlimited network egress. A single prompt injection can compromise internal databases and customer channels.',
    stat: '84% Over-Privileged',
    statLabel: 'Agent service accounts audited',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'no-evidence',
    title: 'Controls Without Evidence',
    subtitle: 'Unsubstantiated compliance that fails regulatory audits',
    description:
      'Governance policies that exist solely in static PDFs fail under regulatory scrutiny. Without verifiable logs, deterministic kill-switches, and reproducible traces, claims of compliance are indefensible.',
    stat: '0 Auditable Traces',
    statLabel: 'Indefensible paper policies',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
  },
];

export default function ReadinessRealitiesSection() {
  return (
    <section className="relative w-full py-20 sm:py-28 bg-white text-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold block mb-2.5">
            THE GOVERNANCE GAP
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-neutral-950 tracking-tight leading-tight">
            Why Unchecked AI Deployment Fails Enterprise Audits.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {REALITIES.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-7 sm:p-8 rounded-md bg-[#f8f8fa] border border-neutral-200/90 hover:border-neutral-400 transition-all flex flex-col justify-between overflow-hidden min-h-85 shadow-sm hover:shadow-md"
            >
              {/* Background Image Layer with Subtle Light Tint & Smooth Zoom on Hover */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 opacity-60 group-hover:opacity-80 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/70 to-black/60" />
              </div>

              {/* Foreground Card Content */}
              <div className="relative z-10">
                <span className="font-mono text-[11px] text-neutral-300 uppercase tracking-wider block mb-2 font-medium">
                  {item.subtitle}
                </span>
                <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight mb-3 leading-snug">
                  {item.title}
                </h3>

                <p className="font-sans text-sm text-neutral-200 leading-relaxed font-normal mb-8">
                  {item.description}
                </p>
              </div>

              <div className="relative z-10 pt-5 border-t border-white/15">
                <span className="font-mono text-xl sm:text-2xl font-bold text-white block mb-1">
                  {item.stat}
                </span>
                <span className="font-mono text-[11px] text-neutral-300 uppercase tracking-wider">
                  {item.statLabel}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
