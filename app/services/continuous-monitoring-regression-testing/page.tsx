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
    'Continuous monitoring and automated regression suites for production AI: cohort drift tracking, span versioning, and CI gates that prevent silent quality degradation.',
  openGraph: {
    title: 'Continuous Monitoring & Regression Testing — Evalixa',
    description:
      'Continuous monitoring and automated regression suites for production AI: cohort drift tracking, span versioning, and CI gates that prevent silent quality degradation.',
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

        {/* 2. Standout Curtain-Wipe Highlight Animation: Observability Gap */}
        <MonitoringRealitiesSection />

        {/* Continuous Solid Z-30 Stacking Layer: Metrics, Workbench, and all subsequent sections */}
        <div className="relative z-30 bg-[#09090b]">
          {/* 3. High-Contrast Architectural Metrics Strip */}
          <ServiceMetricsStrip />

          {/* 4. Interactive Monitoring Workbench (4 Pillars: Cohort Drift, Traces, Implicit Signals, CI Gates) */}
          <MonitoringWorkbenchSection />

          {/* 5. The 4 Observability Dimensions */}
          <MonitoringTaxonomySection />

          {/* 6. How We Deliver (Progressive 4-Step Rollout Grid) */}
          <MonitoringDeliverySection />

          {/* 7. Frequently Asked Questions */}
          <MonitoringFAQSection />

          {/* 8. High-Contrast Conversion CTA */}
          <ServiceCTASection />

          {/* Universal Footer */}
          <Footer />
        </div>
      </main>
    </SmoothScroll>
  );
}
