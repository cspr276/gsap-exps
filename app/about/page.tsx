import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import AboutHero from '@/components/about/AboutHero';
import AboutMetricsSection from '@/components/about/AboutMetricsSection';
import AboutOriginSection from '@/components/about/AboutOriginSection';
import AboutDualWaveSection from '@/components/about/AboutDualWaveSection';
import AboutStickyGridSection from '@/components/about/AboutStickyGridSection';
import AboutTenetsSection from '@/components/about/AboutTenetsSection';
import ServiceCTASection from '@/components/services/agent-evaluation/ServiceCTASection';

export const metadata: Metadata = {
  title: 'About Evalixa — Engineering Trust Into Autonomous Intelligence',
  description:
    'Evalixa is the AI assurance, adversarial security, and human-calibrated evaluation layer for frontier enterprise AI systems.',
  openGraph: {
    title: 'About Evalixa — Engineering Trust Into Autonomous Intelligence',
    description:
      'Evalixa is the AI assurance, adversarial security, and human-calibrated evaluation layer for frontier enterprise AI systems.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#09090b] text-white selection:bg-neutral-800 selection:text-white">
        {/* Universal Architectural Sticky Navbar */}
        <Navbar />

        {/* 1. Pinned Atmospheric Hero (Dark) */}
        <AboutHero />

        {/* Continuous Z-20 Stacking Layer */}
        <div className="relative z-20 bg-[#09090b]">
          {/* 2. Institutional Telemetry Metrics Strip (Counter Increase Animation) */}
          <AboutMetricsSection />

          {/* 3. Origin, Thesis & Paradigm Shift (White — OnScrollTypography + OneElementScroll) */}
          <AboutOriginSection />

          {/* 3. Dual-Wave Capabilities & Enterprise Domains (Dark — DualWaveAnimation) */}
          <AboutDualWaveSection />

          {/* 4. Sticky Grid Scroll Unveil: Inside Evalixa Labs (White — StickyGridScroll) */}
          <AboutStickyGridSection />

          {/* 5. Four Non-Negotiable Operating Tenets (Dark — Staggered3DGrid + Marquee) */}
          <AboutTenetsSection />

          {/* 6. High-Contrast Conversion CTA */}
          <ServiceCTASection />

          {/* 7. Architectural Footer */}
          <Footer />
        </div>
      </main>
    </SmoothScroll>
  );
}
