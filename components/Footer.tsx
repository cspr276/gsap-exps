'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative w-full bg-neutral-950 pt-32 pb-16 px-4 sm:px-8 lg:px-12">
      <div className="relative max-w-7xl mx-auto">
        {/* Clean background watermark logo mark & typography aligned cleanly behind the top edge of the dock */}
        <div className="absolute top-0 translate-y-[-50%] translate-x-[18%] pointer-events-none select-none z-0 ">
          <svg
            viewBox="0 0 950 180"
            className="w-[85vw] max-w-5xl h-auto text-neutral-800/90 select-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >

            {/* Brand Wordmark */}
            <text
              // x="95"
              y="130"
              fill="currentColor"
              fontFamily="var(--font-display), sans-serif"
              fontSize="148"
              fontWeight="800"
              letterSpacing="0.6em"
            >
              NEXUS
            </text>
          </svg>
        </div>

        {/* Floating Dark Card Container */}
        <div className="relative z-10 rounded-3xl bg-[#141414] border border-white/5 p-8 sm:p-12 lg:p-16 shadow-2xl shadow-black/80">
          {/* Main Grid: Newsletter Left, Navigation Columns Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-16">
            {/* LEFT: Newsletter & Heading */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-tight mb-3">
                Don&apos;t miss out
              </h3>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-8 max-w-md font-normal">
                New models, features and the occasional making-of, once a month.
              </p>

              {/* Email Input Bar with Arrow Button */}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="w-full max-w-sm flex items-center rounded-xl bg-[#1b1b1b] border border-white/5 p-1.5 pl-4 focus-within:border-neutral-700 transition-colors"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-transparent text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none pr-2 font-normal"
                />
                <button
                  type="submit"
                  className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-black hover:bg-neutral-200 transition-colors shrink-0"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4 text-black stroke-[2.5]" />
                </button>
              </form>
            </div>

            {/* RIGHT: 3 Columns (Product, Company, Community) */}
            <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10">
              {/* Column 1: PRODUCT */}
              <div>
                <span className="block font-mono text-[11px] uppercase tracking-widest text-neutral-400 font-semibold mb-4">
                  PRODUCT
                </span>
                <ul className="space-y-3 text-sm text-neutral-400 font-normal">
                  <li>
                    <a href="#hero" className="hover:text-white transition-colors">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="hover:text-white transition-colors">
                      Benchmarks
                    </a>
                  </li>
                  <li>
                    <a href="#capabilities" className="hover:text-white transition-colors">
                      Stories
                    </a>
                  </li>
                  <li>
                    <a href="#pricing" className="hover:text-white transition-colors">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#faq" className="hover:text-white transition-colors">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 2: COMPANY */}
              <div>
                <span className="block font-mono text-[11px] uppercase tracking-widest text-neutral-400 font-semibold mb-4">
                  COMPANY
                </span>
                <ul className="space-y-3 text-sm text-neutral-400 font-normal">
                  <li>
                    <a href="#about" className="hover:text-white transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#blog" className="hover:text-white transition-colors">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#careers" className="hover:text-white transition-colors">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="hover:text-white transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 3: COMMUNITY */}
              <div>
                <span className="block font-mono text-[11px] uppercase tracking-widest text-neutral-400 font-semibold mb-4">
                  COMMUNITY
                </span>
                <ul className="space-y-3 text-sm text-neutral-400 font-normal">
                  <li>
                    <a
                      href="https://x.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      X
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://discord.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      Discord
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Status, Copyright & Legal Links */}
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-normal">
            <div className="flex items-center gap-4">
              <span>All systems normal</span>
              <span className="text-neutral-500">© 2026 Nexus</span>
            </div>

            <div className="flex items-center gap-6">
              <a href="#terms" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#privacy" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#cookies" className="hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
