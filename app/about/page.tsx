import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import AboutHero from '@/components/about/AboutHero';
import AboutMetricsSection from '@/components/about/AboutMetricsSection';
import AboutOriginSection from '@/components/about/AboutOriginSection';
import AboutDualWaveSection from '@/components/about/AboutDualWaveSection';
import AboutStickyGridSection from '@/components/about/AboutStickyGridSection';
import AboutValuesSection from '@/components/about/AboutValuesSection';
import AboutTenetsSection from '@/components/about/AboutTenetsSection';
import AboutContributorSection from '@/components/about/AboutContributorSection';
import AboutFAQSection from '@/components/about/AboutFAQSection';
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

          {/* 3. Origin, Thesis & Paradigm Shift (White — OnScrollTypography Fx16 Illumination) */}
          <AboutOriginSection />

          {/* 4. Dual-Wave Capabilities & Enterprise Domains (Dark — DualWave Harmonic Curve) */}
          <AboutDualWaveSection />

          {/* 5. Inside Evalixa Labs (White — Bento Infrastructure Cards) */}
          <AboutStickyGridSection />

          {/* 6. Values & Operating Context Bento Grid (White — Bi-directional Falling-Into-Place Scrub) */}
          <AboutValuesSection />

          {/* 7. Four Non-Negotiable Operating Tenets (Dark — Staggered 3D Cards) */}
          <AboutTenetsSection />

          {/* 8. The Expert Contributor Network Pathway (Dark) */}
          <AboutContributorSection />

          {/* 9. Frequently Asked Questions Accordion (Dark — 10 Source FAQs) */}
          <AboutFAQSection />

          {/* 10. High-Contrast Conversion CTA */}
          <ServiceCTASection />

          {/* 11. Architectural Footer */}
          <Footer />
        </div>
      </main>
    </SmoothScroll>
  );
}
