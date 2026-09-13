'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function DynamicIslandNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        className={`pointer-events-auto flex items-center justify-between gap-8 px-6 py-3 rounded-md transition-all duration-300 ease-out border shadow-2xl ${
          scrolled
            ? 'bg-neutral-950/90 backdrop-blur-xl border-neutral-800 shadow-black/80 w-[94%] max-w-4xl'
            : 'bg-neutral-950/70 backdrop-blur-md border-neutral-800/80 shadow-black/40 w-[96%] max-w-5xl'
        }`}
      >
        {/* Brand Text as Logo with Refined Font Style */}
        <a href="#hero" className="flex items-center group">
          <span className="font-display font-black text-base sm:text-lg tracking-[0.25em] text-white uppercase group-hover:text-neutral-300 transition-colors">
            NEXUS
          </span>
        </a>

        {/* Minimal Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider uppercase text-neutral-400">
          <a
            href="#services"
            className="hover:text-white transition-colors duration-200"
          >
            Services
          </a>
          <a
            href="#capabilities"
            className="hover:text-white transition-colors duration-200"
          >
            Capabilities
          </a>
          <a
            href="#manifesto"
            className="hover:text-white transition-colors duration-200"
          >
            Manifesto
          </a>
        </div>

        {/* Crisp Rectangular Action Button (Less curvy) */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-neutral-200 px-4 py-2 rounded-md bg-neutral-900 border border-neutral-800 hover:border-neutral-500 hover:text-white transition-all duration-200"
          >
            <span>Inquire</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
          </a>
        </div>
      </nav>
    </header>
  );
}
