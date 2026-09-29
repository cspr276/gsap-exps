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
      const heroText = heroTextRef.current;
      const imageFrame = imageFrameRef.current;
      if (!heroText || !imageFrame) return;

      const mm = gsap.matchMedia();

      // Desktop: High-end kinetic entrance motion on page visit (from anims-refer)
      mm.add('(min-width: 1024px)', () => {
        gsap.set('.hero-headline-line', {
          yPercent: 120,
          rotate: 1.5,
          opacity: 0,
          filter: 'blur(10px)',
        });
        gsap.set('.hero-lede-text', {
          y: 28,
          opacity: 0,
          filter: 'blur(6px)',
        });
        gsap.set('.hero-cta-btn', {
          y: 20,
          opacity: 0,
          scale: 0.96,
        });
        gsap.set(imageFrame, {
          scale: 1.14,
          opacity: 0.6,
        });

        const enterTl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          delay: 0.15,
        });

        enterTl.to(
          imageFrame,
          {
            scale: 1.0,
            opacity: 1,
            duration: 1.8,
            ease: 'power2.out',
          },
          0
        );

        enterTl.to(
          '.hero-headline-line',
          {
            yPercent: 0,
            rotate: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.25,
            stagger: 0.14,
            ease: 'power3.out',
          },
          0.2
        );

        enterTl.to(
          '.hero-lede-text',
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.1,
            ease: 'power3.out',
          },
          0.5
        );

        enterTl.to(
          '.hero-cta-btn',
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: 'power2.out',
          },
          0.7
        );
      });

      // Mobile/Tablet natural entrance
      mm.add('(max-width: 1023px)', () => {
        gsap.fromTo(
          heroText,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out', delay: 0.15 }
        );
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
      className="sticky top-0 z-0 w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-[#09090b]"
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

          {/* Centered Main Headline with Masked Kinetic Lines */}
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.14] mb-6 drop-shadow-md">
            <span className="block overflow-hidden pb-1">
              <span className="hero-headline-line block will-change-transform">
                Decision-Grade AI Agent Evaluation.
              </span>
            </span>
            <span className="block overflow-hidden mt-1 sm:mt-2 pb-1">
              <span className="hero-headline-line text-neutral-300 font-bold block will-change-transform">
                Benchmarked by Domain Experts.
              </span>
            </span>
          </h1>

          {/* Centered lede prose */}
          <p className="hero-lede-text font-sans text-base sm:text-lg text-neutral-200 leading-relaxed max-w-2xl mx-auto mb-10 font-normal drop-shadow-sm will-change-transform">
            We construct empirical, reproducible benchmark suites for enterprise AI workflows — exposing compound error drift, multi-turn hallucinations, and security regressions before production release.
          </p>

          {/* Centered High-Contrast Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="hero-cta-btn inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-all shadow-xl shadow-black/50 will-change-transform"
            >
              <span>Scope an Evaluation</span>
              <ArrowUpRight className="w-4 h-4 text-black stroke-[2.5]" />
            </Link>

            <a
              href="#workbench"
              onClick={handleScrollToWorkbench}
              className="hero-cta-btn inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 hover:text-white font-mono text-xs uppercase tracking-wider font-medium border border-neutral-700/80 transition-all backdrop-blur-md cursor-pointer will-change-transform"
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
