import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import AboutHero from '@/components/about/AboutHero';
import AboutMetricsSection from '@/components/about/AboutMetricsSection';
import AboutOriginSection from '@/components/about/AboutOriginSection';
import AboutOrbitSection from '@/components/about/AboutOrbitSection';
import AboutDualWaveSection from '@/components/about/AboutDualWaveSection';
import AboutStickyGridSection from '@/components/about/AboutStickyGridSection';
import AboutValuesSection from '@/components/about/AboutValuesSection';
import AboutTenetsSection from '@/components/about/AboutTenetsSection';
import AboutContributorSection from '@/components/about/AboutContributorSection';
import AboutFAQSection from '@/components/about/AboutFAQSection';
import AboutCTASection from '@/components/about/AboutCTASection';

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

        <AboutHero />
        <AboutMetricsSection />
        <AboutOriginSection />
        <AboutOrbitSection />
        <AboutDualWaveSection />
        <AboutStickyGridSection />
        <AboutValuesSection />
        <AboutTenetsSection />
        <AboutContributorSection />
        <AboutFAQSection />
        <AboutCTASection />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
