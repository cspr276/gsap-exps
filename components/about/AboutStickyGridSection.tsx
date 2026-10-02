'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Curated 6 core lab capability cards (3 columns × 2 rows)
// Streamlined from 12 items to prevent card clutter and guarantee clean parting
const LAB_GRID_ITEMS = [
  { id: '01', label: 'ADVERSARIAL RED-TEAM', image: '/services/reality-01.jpg' },
  { id: '02', label: 'SANDBOX ISOLATION', image: '/services/hero-datacenter.jpg' },
  { id: '03', label: 'EXPERT CALIBRATION', image: '/cards/card_04.jpg' },
  { id: '04', label: 'TRACE INTEGRITY', image: '/services/reality-02.jpg' },
  { id: '05', label: 'CI/CD DRIFT GATE', image: '/cards/card_05.jpg' },
  { id: '06', label: 'REASONING BENCHMARKS', image: '/services/ai-agent-evaluation.webp' },
];

export default function AboutStickyGridSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const grid = gridRef.current;
      const content = contentRef.current;
      if (!section || !grid || !content) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const items = gsap.utils.toArray<HTMLElement>(
          grid.querySelectorAll('.sticky-grid-item')
        );
        if (!items.length) return;

        // Group into 3 columns:
        // Col 0: items [0, 3] (left)
        // Col 1: items [1, 4] (middle)
        // Col 2: items [2, 5] (right)
        const columns: HTMLElement[][] = [[], [], []];
        items.forEach((item, index) => {
          columns[index % 3].push(item);
        });

        // Initial states:
        // Text is completely hidden while cards are assembled so no text bleeds through
        gsap.set(content, { opacity: 0, scale: 0.96, y: 16 });
        gsap.set(items, { opacity: 1, scale: 1 });

        const wh = window.innerHeight;
        const dy = wh + 200;

        // Master pinned scroll timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            id: 'about-sticky-grid',
            trigger: section,
            start: 'top top',
            end: '+=2000',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Phase 1: Grid columns enter from top & bottom into the center
        tl.from(
          columns[0],
          { y: -dy, duration: 1.0, ease: 'power1.inOut' },
          'enter'
        );
        tl.from(
          columns[1],
          { y: dy, duration: 1.0, ease: 'power1.inOut' },
          'enter'
        );
        tl.from(
          columns[2],
          { y: -dy, duration: 1.0, ease: 'power1.inOut' },
          'enter'
        );

        // Brief hold so user sees the assembled lab grid
        tl.to({}, { duration: 0.25 });

        // Phase 2: Grid zooms up & cards part ways, completely clearing the frame
        tl.to(
          grid,
          {
            scale: 2.1,
            duration: 1.2,
            ease: 'power3.inOut',
          },
          'part'
        );

        // Left column flies left and fades to 0
        tl.to(
          columns[0],
          {
            xPercent: -80,
            opacity: 0,
            duration: 1.1,
            ease: 'power3.inOut',
          },
          'part'
        );

        // Right column flies right and fades to 0
        tl.to(
          columns[2],
          {
            xPercent: 80,
            opacity: 0,
            duration: 1.1,
            ease: 'power3.inOut',
          },
          'part'
        );

        // Center column top card flies UP and fades out
        if (columns[1][0]) {
          tl.to(
            columns[1][0],
            {
              yPercent: -150,
              opacity: 0,
              duration: 1.0,
              ease: 'power2.inOut',
            },
            'part'
          );
        }

        // Center column bottom card flies DOWN and fades out
        if (columns[1][1]) {
          tl.to(
            columns[1][1],
            {
              yPercent: 150,
              opacity: 0,
              duration: 1.0,
              ease: 'power2.inOut',
            },
            'part'
          );
        }

        // Phase 3: The clean, uncluttered center content reveals in pristine white space
        tl.to(
          content,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.85,
            ease: 'power2.out',
          },
          'part+=0.4'
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
      {/* Center Unveiled Content (Clean, Focused, No Tag Clutter) */}
      <div
        ref={contentRef}
        className="relative z-20 max-w-3xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center pointer-events-auto"
      >
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 font-semibold mb-4 block">
          03 // INSIDE EVALIXA LABS
        </span>

        <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-neutral-950 tracking-tight leading-[1.08] mb-6 max-w-2xl">
          Built by Security Researchers, ML Engineers & Domain Specialists.
        </h2>

        <p className="font-sans text-sm sm:text-base lg:text-lg text-neutral-600 leading-relaxed max-w-xl mb-8 font-normal">
          Our teams operate at the intersection of offensive AI security, distributed evaluation infrastructure, and human-in-the-loop calibration — turning fragile model outputs into auditable enterprise systems.
        </p>

        <Link
          href="/services/ai-agent-evaluation-benchmarking"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-neutral-950 text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-all shadow-lg shadow-neutral-950/15"
        >
          <span>Inspect Our Flagship Engine</span>
          <ArrowUpRight className="w-4 h-4 text-white" />
        </Link>
      </div>

      {/* 3×2 Grid Overlay (Desktop Pinned Interaction) */}
      <div className="hidden lg:flex absolute inset-0 z-10 items-center justify-center pointer-events-none">
        <div
          ref={gridRef}
          className="w-[720px] xl:w-[780px] grid grid-cols-3 gap-6 will-change-transform"
        >
          {LAB_GRID_ITEMS.map((item) => (
            <div
              key={item.id}
              className="sticky-grid-item relative w-full aspect-square rounded-md overflow-hidden border border-neutral-300 bg-neutral-900 shadow-xl will-change-transform"
            >
              <Image
                src={item.image}
                alt={item.label}
                fill
                sizes="260px"
                className="object-cover object-center grayscale contrast-125 brightness-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] text-white">
                <span className="font-bold opacity-70">#{item.id}</span>
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
