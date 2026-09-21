import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Flagship Service Sections (Enterprise AI Agents & Systems)
import ServiceHero from '@/components/services/enterprise-agents/ServiceHero';
import ServiceMetricsStrip from '@/components/services/enterprise-agents/ServiceMetricsStrip';
import EnterpriseRealitiesSection from '@/components/services/enterprise-agents/EnterpriseRealitiesSection';
import EnterpriseWorkbenchSection from '@/components/services/enterprise-agents/EnterpriseWorkbenchSection';
import EnterpriseTaxonomySection from '@/components/services/enterprise-agents/EnterpriseTaxonomySection';
import EnterpriseDeliverySection from '@/components/services/enterprise-agents/EnterpriseDeliverySection';
import EnterpriseFAQSection from '@/components/services/enterprise-agents/EnterpriseFAQSection';
import ServiceCTASection from '@/components/services/enterprise-agents/ServiceCTASection';

export const metadata: Metadata = {
  title: 'Enterprise AI Agents & Systems — Evalixa',
  description:
    'Production AI agents built for reliability and governance: bounded autonomy, least-privilege tool execution, cryptographic audit traces, and evaluation wired in from day one.',
  openGraph: {
    title: 'Enterprise AI Agents & Systems — Evalixa',
    description:
      'Production AI agents built for reliability and governance: bounded autonomy, least-privilege tool execution, cryptographic audit traces, and evaluation wired in from day one.',
    type: 'website',
  },
};

export default function EnterpriseAIAgentsPage() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#09090b] text-white selection:bg-neutral-800 selection:text-white">
        {/* Universal Architectural Sticky Navbar */}
        <Navbar />

        {/* 1. Atmospheric Ambient Hero */}
        <ServiceHero />

        {/* 2. White-Themed Architectural Metrics Strip */}
        <ServiceMetricsStrip />

        {/* 3. White-Themed Core Failure Realities (Why Agent Prototypes Collapse) */}
        <EnterpriseRealitiesSection />

        {/* 4. Interactive Enterprise Workbench (4 Pillars + Blast Radius Simulator & Terminal) */}
        <EnterpriseWorkbenchSection />

        {/* 5. 4 Dimension Cards (Agent Architectural Taxonomy) */}
        <EnterpriseTaxonomySection />

        {/* 6. How We Deliver (12-Week Phased Delivery Grid) */}
        <EnterpriseDeliverySection />

        {/* 7. Frequently Asked Questions (Technical & Scoping) */}
        <EnterpriseFAQSection />

        {/* 8. High-Contrast Conversion CTA */}
        <ServiceCTASection />

        {/* Universal Footer */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
