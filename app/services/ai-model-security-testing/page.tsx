import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Flagship Service Sections (Neat, natural scroll, high-contrast)
import ServiceHero from '@/components/services/model-security/ServiceHero';
import ServiceMetricsStrip from '@/components/services/model-security/ServiceMetricsStrip';
import SecurityRealitiesSection from '@/components/services/model-security/SecurityRealitiesSection';
import SecurityWorkbenchSection from '@/components/services/model-security/SecurityWorkbenchSection';
import SecurityTaxonomySection from '@/components/services/model-security/SecurityTaxonomySection';
import SecurityDeliverySection from '@/components/services/model-security/SecurityDeliverySection';
import SecurityFAQSection from '@/components/services/model-security/SecurityFAQSection';
import ServiceCTASection from '@/components/services/model-security/ServiceCTASection';

export const metadata: Metadata = {
  title: 'AI Model Security Testing & Red-Teaming — Evalixa',
  description:
    'Research-backed offensive security testing and red-teaming for LLMs and autonomous agents: prompt injection, excessive agency, retrieval poisoning, and continuous CI exploit gates.',
  openGraph: {
    title: 'AI Model Security Testing & Red-Teaming — Evalixa',
    description:
      'Research-backed offensive security testing and red-teaming for LLMs and autonomous agents: prompt injection, excessive agency, retrieval poisoning, and continuous CI exploit gates.',
    type: 'website',
  },
};

export default function ModelSecurityPage() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#09090b] text-white selection:bg-neutral-800 selection:text-white">
        {/* Universal Architectural Sticky Navbar */}
        <Navbar />

        {/* 1. Atmospheric Ambient Hero */}
        <ServiceHero />

        {/* 2. White-Themed Architectural Metrics Strip */}
        <ServiceMetricsStrip />

        {/* 3. White-Themed Core Security Realities */}
        <SecurityRealitiesSection />

        {/* 4. Interactive Security Workbench (4 Pillars: Threat Modeling, Probes, Containment, CI Gate) */}
        <SecurityWorkbenchSection />

        {/* 5. The 4 Core Vulnerability Dimensions */}
        <SecurityTaxonomySection />

        {/* 6. How We Deliver (Progressive 4-Step Red-Team Grid) */}
        <SecurityDeliverySection />

        {/* 7. Frequently Asked Questions */}
        <SecurityFAQSection />

        {/* 8. High-Contrast Conversion CTA */}
        <ServiceCTASection />

        {/* Universal Footer */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
