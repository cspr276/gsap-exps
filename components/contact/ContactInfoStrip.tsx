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

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  linkedin: (
    <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  twitter: (
    <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  instagram: (
    <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  ),
  facebook: (
    <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
};

// Continuous routes connecting Hyderabad HQ to global enterprise hubs
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
    startLng: -122.4194, // San Francisco
    endLat: 17.385,
    endLng: 78.4867,
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
          { y: 40, opacity: 0.15 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 95%',
              end: 'top 72%',
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

          {/* Connect With Us Card (with authentic Social Icons) */}
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

              {/* Clean social buttons with icons */}
              <div className="flex flex-wrap gap-2.5 font-mono text-xs">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.key}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
                  >
                    {SOCIAL_ICONS[s.key]}
                    <span>{s.label}</span>
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
