import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import CareersHero from '@/components/careers/CareersHero';
import CareersCultureSection from '@/components/careers/CareersCultureSection';
import CareersOpenPositionsSection from '@/components/careers/CareersOpenPositionsSection';
import CareersHiringProcessSection from '@/components/careers/CareersHiringProcessSection';
import CareersFAQSection from '@/components/careers/CareersFAQSection';
import CareersCTASection from '@/components/careers/CareersCTASection';

export const metadata: Metadata = {
  title: 'Careers — Engineering Trust into Autonomous Intelligence | Evalixa',
  description:
    'Join Evalixa. Open positions across machine learning engineering, Linux/Debian infrastructure, AI red teaming, evaluation research, and our global PhD domain expert network.',
  openGraph: {
    title: 'Careers at Evalixa — Build Deterministic AI Assurance',
    description:
      'Join our remote-first engineering and research team hardening frontier AI systems. Explore open positions and apply directly.',
    type: 'website',
  },
};

export default function CareersPage() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#09090b] text-white selection:bg-neutral-800 selection:text-white">
        {/* Universal Architectural Sticky Navbar */}
        <Navbar />

        {/* 1. Atmospheric Careers Hero */}
        <CareersHero />

        {/* 2. Life, Principles & Sustainable Growth (White Editorial) */}
        <CareersCultureSection />

        {/* 3. Open Positions Directory with Live Filter, Search & Application Drawer (Dark) */}
        <CareersOpenPositionsSection />

        {/* 4. Transparent 4-Step Evaluation Process (Dark) */}
        <CareersHiringProcessSection />

        {/* 5. Frequently Asked Questions for Candidates (Dark) */}
        <CareersFAQSection />

        {/* 6. General Inquiries & Contributor Fellowship CTA (Dark + Aurora) */}
        <CareersCTASection />

        {/* 7. Institutional Footer */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
