'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-neutral-950 border-t border-neutral-900 py-16 px-6 sm:px-12 lg:px-20 text-neutral-500 text-xs font-mono">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex flex-col gap-2">
          <span className="font-display font-black text-sm tracking-[0.25em] text-white uppercase">
            NEXUS
          </span>
          <span className="text-neutral-500 text-xs font-normal">
            Autonomous Systems Architecture. All rights reserved.
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-8 uppercase tracking-wider text-xs">
          <a href="#hero" className="hover:text-white transition-colors">
            Overview
          </a>
          <a href="#services" className="hover:text-white transition-colors">
            Services
          </a>
          <a href="#capabilities" className="hover:text-white transition-colors">
            Capabilities
          </a>
          <a href="#manifesto" className="hover:text-white transition-colors">
            Manifesto
          </a>
        </div>

        <div className="text-neutral-500">
          STATUS: <span className="text-neutral-300">OPERATIONAL</span>
        </div>
      </div>
    </footer>
  );
}
