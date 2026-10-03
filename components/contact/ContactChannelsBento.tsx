'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CONTACT_CHANNELS } from './contactData';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ContactChannelsBentoProps {
  selectedChannelKey: string;
  onSelectChannel: (channelKey: string) => void;
}

export default function ContactChannelsBento({
  selectedChannelKey,
  onSelectChannel,
}: ContactChannelsBentoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const grid = gridRef.current;
      if (!section || !grid) return;

      const cards = gsap.utils.toArray<HTMLElement>('.channel-bento-card', grid);

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 45, opacity: 0.15 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              end: 'top 58%',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  const handleCardClick = (channelKey: string) => {
    onSelectChannel(channelKey);
    const target = document.getElementById('direct-message');
    if (target) {
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.scrollTo(target, { offset: -30, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact-channels"
      className="relative z-20 w-full py-24 sm:py-32 bg-white text-neutral-950 border-b border-neutral-200 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-12 border-b border-neutral-200 gap-4">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold block mb-2.5">
              ROUTING CHANNELS
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-neutral-950 tracking-tight leading-tight">
              Choose a Conversation Channel.
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-neutral-600 max-w-md leading-relaxed font-normal">
            Select the team relevant to your inquiry below. Clicking a card configures the direct message routing form.
          </p>
        </div>

        {/* Bento Grid with Background Images and Smooth Scroll Tracking matching pre-footer cards */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-3.5"
        >
          {CONTACT_CHANNELS.map((ch) => {
            const isSelected = selectedChannelKey === ch.key;

            return (
              <button
                key={ch.key}
                type="button"
                onClick={() => handleCardClick(ch.key)}
                className={`${ch.cols} channel-bento-card group relative rounded-md border border-neutral-800 bg-neutral-950 p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl hover:border-neutral-500 transition-[border-color,box-shadow] duration-200 will-change-transform text-left min-h-[260px] sm:min-h-[290px] cursor-pointer ${
                  isSelected ? 'border-neutral-400 ring-2 ring-neutral-950/20' : ''
                }`}
              >
                {/* Background Architectural Image with Dark Gradient Overlay */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                  <Image
                    src={ch.image}
                    alt={ch.label}
                    fill
                    sizes="(max-width: 1024px) 100vw, 600px"
                    className="w-full h-full object-cover object-center group-hover:scale-105 opacity-80 group-hover:opacity-90 transition-transform duration-700 ease-out contrast-115"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-black/35" />
                </div>

                {/* Foreground Card Content — Seamless, No Inner Dividing Borders */}
                <div className="relative z-10 flex flex-col justify-between h-full w-full">
                  <div>
                    {/* Category Label */}
                    <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block mb-3">
                      {ch.label}
                    </span>

                    {/* Tagline */}
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight leading-snug mb-2.5">
                      {ch.tagline}
                    </h3>

                    {/* Description */}
                    <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal line-clamp-3">
                      {ch.description}
                    </p>
                  </div>

                  {/* Bottom Channel Link */}
                  <div className="mt-6 flex items-center justify-between font-mono text-xs text-white">
                    <span className="truncate pr-2 font-medium">{ch.email}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
