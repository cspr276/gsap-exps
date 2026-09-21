import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Flagship Service Sections (Neat, natural scroll, high-contrast)
import ServiceHero from '@/components/services/sft-rlhf/ServiceHero';
import ServiceMetricsStrip from '@/components/services/sft-rlhf/ServiceMetricsStrip';
import SftRealitiesSection from '@/components/services/sft-rlhf/SftRealitiesSection';
import SftWorkbenchSection from '@/components/services/sft-rlhf/SftWorkbenchSection';
import SftTaxonomySection from '@/components/services/sft-rlhf/SftTaxonomySection';
import SftDeliverySection from '@/components/services/sft-rlhf/SftDeliverySection';
import SftFAQSection from '@/components/services/sft-rlhf/SftFAQSection';
import ServiceCTASection from '@/components/services/sft-rlhf/ServiceCTASection';

export const metadata: Metadata = {
  title: 'Supervised Fine-Tuning (SFT) & RLHF — Evalixa',
  description:
    'Model adaptation done in the right order: evaluation first, prompting and retrieval before training, then SFT or preference optimisation on data built by calibrated domain experts.',
  openGraph: {
    title: 'Supervised Fine-Tuning (SFT) & RLHF — Evalixa',
    description:
      'Model adaptation done in the right order: evaluation first, prompting and retrieval before training, then SFT or preference optimisation on data built by calibrated domain experts.',
    type: 'website',
  },
};

export default function SftRlhfPage() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#09090b] text-white selection:bg-neutral-800 selection:text-white">
        {/* Universal Architectural Sticky Navbar */}
        <Navbar />

        {/* 1. Atmospheric Ambient Hero */}
        <ServiceHero />

        {/* 2. White-Themed Architectural Metrics Strip */}
        <ServiceMetricsStrip />

        {/* 3. White-Themed Core Failure Realities (Why standard training runs fail) */}
        <SftRealitiesSection />

        {/* 4. Interactive Adaptation Workbench (4 Pillars: Contract Rule-Out, Demonstration SFT, Preference DPO, Regression Gate) */}
        <SftWorkbenchSection />

        {/* 5. The 4 Adaptation Dimensions (Taxonomy Breakdown) */}
        <SftTaxonomySection />

        {/* 6. How We Deliver (Progressive 4-Step Engagement Grid) */}
        <SftDeliverySection />

        {/* 7. Frequently Asked Questions (Technical & Engagement) */}
        <SftFAQSection />

        {/* 8. High-Contrast Conversion CTA */}
        <ServiceCTASection />

        {/* Universal Footer */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
