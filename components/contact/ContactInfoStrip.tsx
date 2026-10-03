'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { COMPANY_INFO, SOCIAL_LINKS } from './contactData';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const World = dynamic(() => import('@/components/ui/globe').then((m) => m.World), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

// Continuous, vibrant routes connecting Hyderabad HQ to global enterprise hubs
const CONTINUOUS_ROUTES = [
  {
    order: 1,
    startLat: 17.385,
    startLng: 78.4867, // Hyderabad HQ
    endLat: 37.7749,
    endLng: -122.4194, // San Francisco
    arcAlt: 0.45,
    color: '#818cf8',
  },
  {
    order: 1,
    startLat: 17.385,
    startLng: 78.4867, // Hyderabad HQ
    endLat: 51.5074,
    endLng: -0.1278, // London
    arcAlt: 0.28,
    color: '#38bdf8',
  },
  {
    order: 2,
    startLat: 17.385,
    startLng: 78.4867, // Hyderabad HQ
    endLat: 47.3769,
    endLng: 8.5417, // Zurich
    arcAlt: 0.24,
    color: '#6366f1',
  },
  {
    order: 2,
    startLat: 17.385,
    startLng: 78.4867, // Hyderabad HQ
    endLat: 35.6762,
    endLng: 139.6503, // Tokyo
    arcAlt: 0.22,
    color: '#38bdf8',
  },
  {
    order: 3,
    startLat: 17.385,
    startLng: 78.4867, // Hyderabad HQ
    endLat: 1.3521,
    endLng: 103.8198, // Singapore
    arcAlt: 0.16,
    color: '#818cf8',
  },
  {
    order: 3,
    startLat: 17.385,
    startLng: 78.4867, // Hyderabad HQ
    endLat: 40.7128,
    endLng: -74.006, // New York
    arcAlt: 0.38,
    color: '#6366f1',
  },
  {
    order: 4,
    startLat: 51.5074,
    startLng: -0.1278, // London
    endLat: 17.385,
    endLng: 78.4867, // Hyderabad HQ
    arcAlt: 0.28,
    color: '#38bdf8',
  },
  {
    order: 4,
    startLat: 37.7749,
    endLng: 78.4867,
    startLng: -122.4194, // San Francisco
    endLat: 17.385,
    arcAlt: 0.42,
    color: '#818cf8',
  },
  {
    order: 5,
    startLat: 47.3769,
    startLng: 8.5417, // Zurich
    endLat: 40.7128,
    endLng: -74.006, // New York
    arcAlt: 0.25,
    color: '#38bdf8',
  },
  {
    order: 5,
    startLat: 1.3521,
    startLng: 103.8198, // Singapore
    endLat: 35.6762,
    endLng: 139.6503, // Tokyo
    arcAlt: 0.2,
    color: '#6366f1',
  },
];

const globeConfig = {
  pointSize: 3,
  globeColor: '#09090b',
  showAtmosphere: true,
  atmosphereColor: '#6366f1',
  atmosphereAltitude: 0.15,
  emissive: '#09090b',
  emissiveIntensity: 0.2,
  shininess: 0.9,
  polygonColor: 'rgba(255, 255, 255, 0.45)',
  ambientLight: '#38bdf8',
  directionalLeftLight: '#ffffff',
  directionalTopLight: '#ffffff',
  pointLight: '#ffffff',
  arcTime: 1600,
  arcLength: 0.75,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 17.385, lng: 78.4867 },
  autoRotate: true,
  autoRotateSpeed: 0.7,
};

export default function ContactInfoStrip() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const cards = gsap.utils.toArray<HTMLElement>('.info-strip-card', section);
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

  return (
    <section
      ref={sectionRef}
      className="relative z-20 w-full bg-neutral-950 text-white py-24 sm:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Card 1: Headquarters & Global Footprint (Full width card with 3D Globe positioned lower & slightly to right) */}
        <div className="info-strip-card will-change-transform relative w-full rounded-md border border-neutral-800 bg-[#0c0d10] p-8 sm:p-12 overflow-hidden min-h-[380px] sm:min-h-[440px] flex flex-col justify-between shadow-xl">
          {/* 3D World Globe positioned lower & slightly right, quarter to half visible, normal opacity */}
          <div className="absolute -bottom-36 -right-20 sm:-bottom-48 sm:-right-24 md:-bottom-56 md:-right-28 w-[500px] h-[500px] sm:w-[620px] sm:h-[620px] md:w-[720px] md:h-[720px] pointer-events-none z-10 select-none">
            <World data={CONTINUOUS_ROUTES} globeConfig={globeConfig} />
          </div>

          {/* Left Text Content */}
          <div className="relative z-20 max-w-xl">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-4">
              HEADQUARTERS &amp; FOOTPRINT
            </span>
            <h3 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight mb-3">
              {COMPANY_INFO.headquarters}
            </h3>
            <p className="font-sans text-sm sm:text-base text-neutral-300 font-medium mb-2">
              {COMPANY_INFO.address}
            </p>
            <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
              Operating as a distributed team serving enterprise partners and research institutions across Europe, Asia, and North America.
            </p>
          </div>

          <div className="relative z-20 pt-8">
            <a
              href={COMPANY_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-white hover:text-neutral-300 font-semibold inline-flex items-center gap-1.5 transition-colors"
            >
              <span>View on Google Maps</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Card 2 & Card 3: Full width cards for Response Time and Connect With Us */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Response Time Card */}
          <div className="info-strip-card will-change-transform w-full rounded-md border border-neutral-800 bg-[#0c0d10] p-8 sm:p-10 flex flex-col justify-between shadow-xl min-h-[260px]">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-3">
                RESPONSE TIME
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug mb-3">
                Within one business day
              </h3>
              <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                We read every message and route it directly to the practice lead. Sales and technical support inquiries receive priority triage.
              </p>
            </div>
            <div className="pt-6 font-mono text-xs text-neutral-400">
              Direct practitioner review on every inquiry
            </div>
          </div>

          {/* Connect With Us Card */}
          <div className="info-strip-card will-change-transform w-full rounded-md border border-neutral-800 bg-[#0c0d10] p-8 sm:p-10 flex flex-col justify-between shadow-xl min-h-[260px]">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-3">
                CONNECT WITH US
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug mb-3">
                Follow along
              </h3>
              <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal mb-6">
                Stay updated on frontier benchmark releases, evaluation datasets, and research publications.
              </p>

              {/* Clean square textual links */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-wider">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.key}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-300 hover:text-white transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-6 font-mono text-xs text-neutral-400">
              Verified Official Channels
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
