import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Flagship Service Sections (Neat, natural scroll, high-contrast)
import ServiceHero from '@/components/services/continuous-monitoring/ServiceHero';
import ServiceMetricsStrip from '@/components/services/continuous-monitoring/ServiceMetricsStrip';
import MonitoringRealitiesSection from '@/components/services/continuous-monitoring/MonitoringRealitiesSection';
import MonitoringWorkbenchSection from '@/components/services/continuous-monitoring/MonitoringWorkbenchSection';
import MonitoringTaxonomySection from '@/components/services/continuous-monitoring/MonitoringTaxonomySection';
import MonitoringDeliverySection from '@/components/services/continuous-monitoring/MonitoringDeliverySection';
import MonitoringFAQSection from '@/components/services/continuous-monitoring/MonitoringFAQSection';
import ServiceCTASection from '@/components/services/continuous-monitoring/ServiceCTASection';

export const metadata: Metadata = {
  title: 'Continuous Monitoring & Regression Testing — Evalixa',
  description:
    'Production quality signals for AI systems: drift detection, online and offline evaluation, structured tracing, and regression suites that stop a fixed failure from quietly returning.',
  openGraph: {
    title: 'Continuous Monitoring & Regression Testing — Evalixa',
    description:
      'Production quality signals for AI systems: drift detection, online and offline evaluation, structured tracing, and regression suites that stop a fixed failure from quietly returning.',
    type: 'website',
  },
};

export default function ContinuousMonitoringPage() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#09090b] text-white selection:bg-neutral-800 selection:text-white">
        {/* Universal Architectural Sticky Navbar */}
        <Navbar />

        {/* 1. Atmospheric Ambient Hero */}
        <ServiceHero />

        {/* 2. White-Themed Architectural Metrics Strip */}
        <ServiceMetricsStrip />

        {/* 3. White-Themed Core Failure Realities (Why standard APMs fail AI) */}
        <MonitoringRealitiesSection />

        {/* 4. Interactive Monitoring Workbench (4 Pillars: Drift, Traces, Implicit Signals, Gates) */}
        <MonitoringWorkbenchSection />

        {/* 5. The 4 Monitoring Dimensions (Telemetry, Output Drift, Provenance, Interventions) */}
        <MonitoringTaxonomySection />

        {/* 6. How We Deliver (Progressive 4-Step Engagement Grid) */}
        <MonitoringDeliverySection />

        {/* 7. Frequently Asked Questions (Technical & Operations) */}
        <MonitoringFAQSection />

        {/* 8. High-Contrast Conversion CTA */}
        <ServiceCTASection />

        {/* Universal Footer */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
