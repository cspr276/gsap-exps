'use client';

import React from 'react';

const CULTURE_PILLARS = [
  {
    num: '01',
    tag: 'WORKFLOW & CONTEXT',
    headline: 'Life at Evalixa',
    desc: 'A remote-first engineering culture built around written context, clear ownership, focused demos, and async velocity without minute-by-minute tracking or performative meetings.',
  },
  {
    num: '02',
    tag: 'SUSTAINABLE PRACTICE',
    headline: 'Practical Benefits',
    desc: 'Competitive compensation, flexible schedules, home-office hardware stipends, comprehensive health coverage, and leave policies engineered for sustainable deep work.',
  },
  {
    num: '03',
    tag: 'CRAFT DEPTH',
    headline: 'Professional Growth',
    desc: 'Direct collaboration with senior founders and PhD domain fellows, conference and publication sponsorships, and career progression anchored purely in demonstrated technical leverage.',
  },
];

export default function CareersCultureSection() {
  return (
    <section className="relative z-20 w-full py-20 sm:py-28 bg-[#fbfbfb] text-neutral-900 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold block mb-3">
            LIFE, BENEFITS & GROWTH
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-neutral-950 tracking-tight leading-tight mb-4">
            Built for Focused Craft and Sustainable Velocity.
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            We operate with a startup mindset: fast feedback, transparent communication, and delivery cycles designed to keep momentum high without sacrificing engineering depth.
          </p>
        </div>

        {/* 3 Compact Editorial Cards matching ManifestoSection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-neutral-200/90">
          {CULTURE_PILLARS.map((pillar) => (
            <div
              key={pillar.num}
              className="p-6 sm:p-7 rounded-md border border-neutral-200/90 bg-white hover:border-neutral-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-neutral-900">{pillar.num}</span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 font-semibold">
                    {pillar.tag}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-neutral-950 mb-3 tracking-tight">
                  {pillar.headline}
                </h3>
                <p className="font-sans text-sm text-neutral-600 leading-relaxed font-normal">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
