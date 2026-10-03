import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Flagship Service Sections (Neat, natural scroll, high-contrast)
import ServiceHero from '@/components/services/agent-readiness/ServiceHero';
import ServiceMetricsStrip from '@/components/services/agent-readiness/ServiceMetricsStrip';
import ReadinessRealitiesSection from '@/components/services/agent-readiness/ReadinessRealitiesSection';
import ReadinessWorkbenchSection from '@/components/services/agent-readiness/ReadinessWorkbenchSection';
import ReadinessTaxonomySection from '@/components/services/agent-readiness/ReadinessTaxonomySection';
import ReadinessDeliverySection from '@/components/services/agent-readiness/ReadinessDeliverySection';
import ReadinessFAQSection from '@/components/services/agent-readiness/ReadinessFAQSection';
import ServiceCTASection from '@/components/services/agent-readiness/ServiceCTASection';

export const metadata: Metadata = {
  title: 'AI Agent Readiness & Risk Assessment — Evalixa',
  description:
    'Comprehensive AI agent governance and risk readiness: discovery of shadow AI, autonomy classification, credential scoping, and audit-ready regulatory evidence packs.',
  openGraph: {
    title: 'AI Agent Readiness & Risk Assessment — Evalixa',
    description:
      'Comprehensive AI agent governance and risk readiness: discovery of shadow AI, autonomy classification, credential scoping, and audit-ready regulatory evidence packs.',
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

        {/* 2. Standout Curtain-Wipe Highlight Animation: Governance Gap */}
        <ReadinessRealitiesSection />

        {/* Continuous Solid Z-30 Stacking Layer: Metrics, Workbench, and all subsequent sections */}
        <div className="relative z-30 bg-[#09090b]">
          {/* 3. High-Contrast Architectural Metrics Strip */}
          <ServiceMetricsStrip />

          {/* 4. Interactive Readiness Workbench (4 Pillars: Discovery, Risk Tiering, Control Gaps, Audit Evidence) */}
          <ReadinessWorkbenchSection />

          {/* 5. The 4 Governance Framework Dimensions */}
          <ReadinessTaxonomySection />

          {/* 6. How We Deliver (Progressive 4-Step Engagement Grid) */}
          <ReadinessDeliverySection />

          {/* 7. Frequently Asked Questions */}
          <ReadinessFAQSection />

          {/* 8. High-Contrast Conversion CTA */}
          <ServiceCTASection />

          {/* Universal Footer */}
          <Footer />
        </div>
      </main>
    </SmoothScroll>
  );
}
