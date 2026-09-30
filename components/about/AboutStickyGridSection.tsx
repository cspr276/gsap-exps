'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const LAB_GRID_ITEMS = [
  { id: '01', label: 'ADVERSARIAL LAB', image: '/services/reality-01.jpg' },
  { id: '02', label: 'SANDBOX RUNNER', image: '/services/hero-datacenter.jpg' },
  { id: '03', label: 'EXPERT PANEL', image: '/cards/card_04.jpg' },
  { id: '04', label: 'TRACE LEDGER', image: '/services/reality-02.jpg' },
  { id: '05', label: 'CI/CD GATEWAY', image: '/cards/card_05.jpg' },
  { id: '06', label: 'RED-TEAM HARNESS', image: '/services/ai-agent-evaluation.webp' },
  { id: '07', label: 'DRIFT TELEMETRY', image: '/cards/card_06.jpg' },
  { id: '08', label: 'SCHEMA VERIFIER', image: '/services/benchmarking-frameworks.webp' },
  { id: '09', label: 'CANARY CLUSTER', image: '/cards/card_07.jpg' },
  { id: '10', label: 'RLHF ALIGNMENT', image: '/services/reality-03.jpg' },
  { id: '11', label: 'ZERO-TRUST EGRESS', image: '/cards/card_08.jpg' },
  { id: '12', label: 'AUDIT ENGINE', image: '/services/hero-bg.webp' },
];

export default function AboutStickyGridSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const grid = gridRef.current;
      const title = titleRef.current;
      const details = detailsRef.current;
      if (!section || !grid || !title || !details) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const items = gsap.utils.toArray<HTMLElement>(
          grid.querySelectorAll('.sticky-grid-item')
        );
        if (!items.length) return;

        // Group items into 3 columns (matching codrops-sticky-grid-scroll-main)
        const numColumns = 3;
        const columns: HTMLElement[][] = [[], [], []];
        items.forEach((item, index) => {
          columns[index % numColumns].push(item);
        });

        // Initial state for center details
        gsap.set(details, { opacity: 0, y: 24, pointerEvents: 'none' });
        gsap.set(title, { y: 40 });

        const wh = window.innerHeight;
        const dy = wh + 260;

        // Master pinned timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            id: 'about-sticky-grid',
            trigger: section,
            start: 'top top',
            end: '+=2400',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Phase 1: Grid columns enter from alternating vertical directions
        columns.forEach((col, colIndex) => {
          const fromTop = colIndex % 2 === 0;
          tl.from(
            col,
            {
              y: dy * (fromTop ? -1 : 1),
              stagger: {
                each: 0.06,
                from: fromTop ? 'end' : 'start',
              },
              ease: 'power1.inOut',
              duration: 1.1,
            },
            'grid-reveal'
          );
        });

        // Phase 2: Grid zooms & columns part ways to unveil the center core
        tl.to(
          grid,
          {
            scale: 2.05,
            duration: 1.1,
            ease: 'power3.inOut',
          },
          'grid-zoom-=0.35'
        );

        tl.to(
          columns[0],
          {
            xPercent: -48,
            duration: 1.1,
            ease: 'power3.inOut',
          },
          'grid-zoom-=0.35'
        );

        tl.to(
          columns[2],
          {
            xPercent: 48,
            duration: 1.1,
            ease: 'power3.inOut',
          },
          'grid-zoom-=0.35'
        );

        tl.to(
          columns[1],
          {
            yPercent: (index) =>
              (index < Math.floor(columns[1].length / 2) ? -1 : 1) * 52,
             opacity: 0.25,
            duration: 0.85,
            ease: 'power2.inOut',
          },
          'grid-zoom-=0.15'
        );

        // Phase 3: Center title rises & details unveil cleanly
        tl.to(
          title,
          {
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          'grid-zoom+=0.15'
        );

        tl.to(
          details,
          {
            opacity: 1,
            y: 0,
            pointerEvents: 'auto',
            duration: 0.6,
            ease: 'power2.out',
          },
          'grid-zoom+=0.25'
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-20 w-full min-h-screen lg:h-screen bg-white text-neutral-950 border-b border-neutral-200 flex items-center justify-center overflow-hidden py-20 lg:py-0"
    >
      {/* Center Unveiled Content */}
      <div className="relative z-20 max-w-3xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center">
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-neutral-500 font-semibold mb-3 block">
          03 // INSIDE EVALIXA LABS
        </span>

        <h2
          ref={titleRef}
          className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-neutral-950 tracking-tight leading-[1.08] mb-6"
        >
          Built by Security Researchers, ML Engineers & Domain Specialists.
        </h2>

        <div ref={detailsRef} className="flex flex-col items-center">
          <p className="font-sans text-sm sm:text-base lg:text-lg text-neutral-600 leading-relaxed max-w-xl mb-8 font-normal">
            Our teams operate at the intersection of offensive AI security, distributed evaluation infrastructure, and human-in-the-loop calibration — turning fragile model outputs into auditable enterprise systems.
          </p>

          {/* Lab Credentials Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
            {[
              'Offensive AI Red-Teamers',
              'Distributed Systems Architects',
              'PhD Psychometricians & Statisticians',
              'Credentialed Legal, Clinical & Finance Fellows',
            ].map((badge) => (
              <span
                key={badge}
                className="font-mono text-[11px] text-neutral-800 bg-neutral-100 border border-neutral-300 px-3 py-1 rounded-sm font-medium"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/services/ai-agent-evaluation-benchmarking"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-neutral-950 text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-all shadow-lg shadow-neutral-950/15"
            >
              <span>Inspect Our Flagship Engine</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </Link>
          </div>
        </div>
      </div>

      {/* 3-Column Sticky Grid Overlay (Desktop) */}
      <div className="hidden lg:flex absolute inset-0 z-10 items-center justify-center pointer-events-none">
        <div
          ref={gridRef}
          className="w-[680px] xl:w-[740px] grid grid-cols-3 gap-6 will-change-transform"
        >
          {LAB_GRID_ITEMS.map((item) => (
            <div
              key={item.id}
              className="sticky-grid-item relative w-full aspect-square rounded-md overflow-hidden border border-neutral-300 bg-neutral-900 shadow-lg will-change-transform"
            >
              <Image
                src={item.image}
                alt={item.label}
                fill
                sizes="250px"
                className="object-cover object-center grayscale contrast-125 brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between font-mono text-[10px] text-white">
                <span className="font-bold opacity-70">{item.id}</span>
                <span className="tracking-wider uppercase font-semibold truncate ml-2">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
