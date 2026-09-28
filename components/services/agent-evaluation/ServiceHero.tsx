'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ServiceHero() {
  const containerRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const heroText = heroTextRef.current;
      const imageFrame = imageFrameRef.current;
      const overlay = overlayRef.current;
      if (!container || !heroText || !imageFrame) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        // Initialize hero state: full coverage
        gsap.set(imageFrame, {
          scale: 1.12,
          borderRadius: '0px',
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '+=100%',
            pin: true,
            pinSpacing: false,
            scrub: 0.6,
          },
        });

        // Text floats up and dissolves with optical blur as next section stacks on top
        tl.to(
          heroText,
          {
            y: -70,
            opacity: 0,
            filter: 'blur(8px)',
            ease: 'power2.inOut',
            duration: 1,
          },
          0
        );

        // Frame contracts slightly into precision chassis
        tl.to(
          imageFrame,
          {
            scale: 0.93,
            borderRadius: '24px',
            ease: 'power2.inOut',
            duration: 1,
          },
          0
        );

        // Dark scrim increases slightly for clean contrast transition into next section
        if (overlay) {
          tl.to(
            overlay,
            {
              backgroundColor: 'rgba(9, 9, 11, 0.85)',
              ease: 'power2.inOut',
              duration: 1,
            },
            0
          );
        }

        return () => {
          tl.kill();
        };
      });
    },
    { scope: containerRef }
  );

  const handleScrollToWorkbench = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('workbench');
    if (!target) return;

    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo(target, {
        offset: -20,
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="service-hero"
      ref={containerRef}
      className="relative z-0 w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-[#09090b]"
    >
      {/* Dynamic Floating Frame / Chassis */}
      <div
        ref={imageFrameRef}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none origin-center transition-shadow border border-white/5"
      >
        <Image
          src="/services/hero-datacenter.jpg"
          alt="Enterprise AI Computing Infrastructure"
          fill
          priority
          className="object-cover object-center brightness-[0.45] contrast-[1.05]"
        />
        {/* Scrim Overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-[#09090b]/40 transition-colors pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-[#09090b]/60 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div
        ref={heroTextRef}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center flex flex-col items-center justify-center pt-28 pb-16 my-auto"
      >
        <div className="max-w-4xl mx-auto">

          {/* Centered Main Headline */}
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12] mb-6 drop-shadow-md">
            Decision-Grade AI Agent Evaluation.{' '}
            <span className="text-neutral-300 font-bold block sm:inline">
              Benchmarked by Domain Experts.
            </span>
          </h1>

          {/* Centered lede prose */}
          <p className="font-sans text-base sm:text-lg text-neutral-200 leading-relaxed max-w-2xl mx-auto mb-10 font-normal drop-shadow-sm">
            We construct empirical, reproducible benchmark suites for enterprise AI workflows — exposing compound error drift, multi-turn hallucinations, and security regressions before production release.
          </p>

          {/* Centered High-Contrast Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-all shadow-xl shadow-black/50"
            >
              <span>Scope an Evaluation</span>
              <ArrowUpRight className="w-4 h-4 text-black stroke-[2.5]" />
            </Link>

            <a
              href="#workbench"
              onClick={handleScrollToWorkbench}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 hover:text-white font-mono text-xs uppercase tracking-wider font-medium border border-neutral-700/80 transition-all backdrop-blur-md cursor-pointer"
            >
              <span>Explore Benchmark Engine</span>
              <ArrowDown className="w-3.5 h-3.5 text-neutral-400" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
