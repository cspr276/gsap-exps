import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Flagship Service Sections (Neat, natural scroll, high-contrast)
import ServiceHero from '@/components/services/data-annotation/ServiceHero';
import ServiceMetricsStrip from '@/components/services/data-annotation/ServiceMetricsStrip';
import AnnotationRealitiesSection from '@/components/services/data-annotation/AnnotationRealitiesSection';
import AnnotationWorkbenchSection from '@/components/services/data-annotation/AnnotationWorkbenchSection';
import AnnotationTaxonomySection from '@/components/services/data-annotation/AnnotationTaxonomySection';
import AnnotationDeliverySection from '@/components/services/data-annotation/AnnotationDeliverySection';
import AnnotationFAQSection from '@/components/services/data-annotation/AnnotationFAQSection';
import ServiceCTASection from '@/components/services/data-annotation/ServiceCTASection';

export const metadata: Metadata = {
  title: 'Data Annotation & Gold Standards — Evalixa',
  description:
    'Domain-expert data labelling for training and evaluation: calibrated reviewers, measured inter-annotator agreement, adjudicated disagreement and guidelines that improve as edge cases surface.',
  openGraph: {
    title: 'Data Annotation & Gold Standards — Evalixa',
    description:
      'Domain-expert data labelling for training and evaluation: calibrated reviewers, measured inter-annotator agreement, adjudicated disagreement and guidelines that improve as edge cases surface.',
    type: 'website',
  },
};

export default function DataAnnotationPage() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#09090b] text-white selection:bg-neutral-800 selection:text-white">
        {/* Universal Architectural Sticky Navbar */}
        <Navbar />

        {/* 1. Atmospheric Ambient Hero */}
        <ServiceHero />

        {/* 2. White-Themed Architectural Metrics Strip */}
        <ServiceMetricsStrip />

        {/* 3. White-Themed Core Failure Realities (Why volume-first pipelines fail) */}
        <AnnotationRealitiesSection />

        {/* 4. Interactive Quality Workbench (4 Pillars + Pairwise Agreement Matrix) */}
        <AnnotationWorkbenchSection />

        {/* 5. Methodology Taxonomy (Matching annotation structure to human judgement) */}
        <AnnotationTaxonomySection />

        {/* 6. How We Deliver (Progressive 4-Step Engagement Grid) */}
        <AnnotationDeliverySection />

        {/* 7. Frequently Asked Questions (Technical & Governance) */}
        <AnnotationFAQSection />

        {/* 8. High-Contrast Conversion CTA */}
        <ServiceCTASection />

        {/* Universal Footer */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
