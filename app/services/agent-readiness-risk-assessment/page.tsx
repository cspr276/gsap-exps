import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Flagship Service Sections (Agent Readiness & Risk Assessment)
import ServiceHero from '@/components/services/agent-readiness/ServiceHero';
import ServiceMetricsStrip from '@/components/services/agent-readiness/ServiceMetricsStrip';
import ReadinessRealitiesSection from '@/components/services/agent-readiness/ReadinessRealitiesSection';
import ReadinessWorkbenchSection from '@/components/services/agent-readiness/ReadinessWorkbenchSection';
import ReadinessTaxonomySection from '@/components/services/agent-readiness/ReadinessTaxonomySection';
import ReadinessDeliverySection from '@/components/services/agent-readiness/ReadinessDeliverySection';
import ReadinessFAQSection from '@/components/services/agent-readiness/ReadinessFAQSection';
import ServiceCTASection from '@/components/services/agent-readiness/ServiceCTASection';

export const metadata: Metadata = {
  title: 'Agent Readiness & Risk Assessment — Evalixa',
  description:
    'Comprehensive AI estate discovery, autonomy risk classification, technical control verification, and defensible audit packs aligned to EU AI Act and NIST AI RMF.',
  openGraph: {
    title: 'Agent Readiness & Risk Assessment — Evalixa',
    description:
      'Comprehensive AI estate discovery, autonomy risk classification, technical control verification, and defensible audit packs aligned to EU AI Act and NIST AI RMF.',
    type: 'website',
  },
};

export default function AgentReadinessPage() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#09090b] text-white selection:bg-neutral-800 selection:text-white">
        {/* Universal Architectural Sticky Navbar */}
        <Navbar />

        {/* 1. Atmospheric Ambient Hero */}
        <ServiceHero />

        {/* 2. White-Themed Architectural Metrics Strip */}
        <ServiceMetricsStrip />

        {/* 3. White-Themed Core Governance Realities */}
        <ReadinessRealitiesSection />

        {/* 4. Interactive Readiness Workbench (4 Pillars: Discovery, Classification, Controls, Evidence) */}
        <ReadinessWorkbenchSection />

        {/* 5. The 4 Risk Dimensions (Governance & Autonomy Taxonomy) */}
        <ReadinessTaxonomySection />

        {/* 6. How We Deliver (Progressive 4-Step Engagement Grid) */}
        <ReadinessDeliverySection />

        {/* 7. Frequently Asked Questions (Risk, Scope, and Remediation) */}
        <ReadinessFAQSection />

        {/* 8. High-Contrast Conversion CTA */}
        <ServiceCTASection />

        {/* Universal Footer */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
