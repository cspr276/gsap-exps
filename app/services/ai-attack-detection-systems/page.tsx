import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Flagship Service Sections (Neat, natural scroll, high-contrast)
import ServiceHero from '@/components/services/attack-detection/ServiceHero';
import ServiceMetricsStrip from '@/components/services/attack-detection/ServiceMetricsStrip';
import DetectionRealitiesSection from '@/components/services/attack-detection/DetectionRealitiesSection';
import DetectionWorkbenchSection from '@/components/services/attack-detection/DetectionWorkbenchSection';
import DetectionTaxonomySection from '@/components/services/attack-detection/DetectionTaxonomySection';
import DetectionDeliverySection from '@/components/services/attack-detection/DetectionDeliverySection';
import DetectionFAQSection from '@/components/services/attack-detection/DetectionFAQSection';
import ServiceCTASection from '@/components/services/attack-detection/ServiceCTASection';

export const metadata: Metadata = {
  title: 'AI Attack Detection Systems — Evalixa',
  description:
    'Runtime defences for LLM and agent systems: injection and jailbreak detection, egress control, anomaly signals and a latency budget you can actually afford in production.',
  openGraph: {
    title: 'AI Attack Detection Systems — Evalixa',
    description:
      'Runtime defences for LLM and agent systems: injection and jailbreak detection, egress control, anomaly signals and a latency budget you can actually afford in production.',
    type: 'website',
  },
};

export default function AttackDetectionPage() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#09090b] text-white selection:bg-neutral-800 selection:text-white">
        {/* Universal Architectural Sticky Navbar */}
        <Navbar />

        {/* 1. Atmospheric Ambient Hero */}
        <ServiceHero />

        {/* 2. White-Themed Architectural Metrics Strip */}
        <ServiceMetricsStrip />

        {/* 3. White-Themed Core Failure Realities (Why naive guardrails fail) */}
        <DetectionRealitiesSection />

        {/* 4. Interactive Detection Workbench (4 Pillars + Latency Budget Simulator) */}
        <DetectionWorkbenchSection />

        {/* 5. The 4 Coordinated Defense Dimensions */}
        <DetectionTaxonomySection />

        {/* 6. How We Deliver (Progressive 4-Step Engagement Grid) */}
        <DetectionDeliverySection />

        {/* 7. Frequently Asked Questions (Technical & Latency) */}
        <DetectionFAQSection />

        {/* 8. High-Contrast Conversion CTA */}
        <ServiceCTASection />

        {/* Universal Footer */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
