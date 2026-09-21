import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Flagship Service Sections (Neat, natural scroll, high-contrast)
import ServiceHero from '@/components/services/agent-evaluation/ServiceHero';
import ServiceMetricsStrip from '@/components/services/agent-evaluation/ServiceMetricsStrip';
import EvaluationRealitiesSection from '@/components/services/agent-evaluation/EvaluationRealitiesSection';
import EvaluationWorkbenchSection from '@/components/services/agent-evaluation/EvaluationWorkbenchSection';
import EvaluationTaxonomySection from '@/components/services/agent-evaluation/EvaluationTaxonomySection';
import EvaluationDeliverySection from '@/components/services/agent-evaluation/EvaluationDeliverySection';
import EvaluationFAQSection from '@/components/services/agent-evaluation/EvaluationFAQSection';
import ServiceCTASection from '@/components/services/agent-evaluation/ServiceCTASection';

export const metadata: Metadata = {
  title: 'AI Agent Evaluation & Benchmarking — Evalixa',
  description:
    'Decision-grade AI agent benchmarking, multi-turn regression tracking, and evaluation frameworks scored by verified domain experts.',
  openGraph: {
    title: 'AI Agent Evaluation & Benchmarking — Evalixa',
    description:
      'Decision-grade AI agent benchmarking, multi-turn regression tracking, and evaluation frameworks scored by verified domain experts.',
    type: 'website',
  },
};

export default function AgentEvaluationPage() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#09090b] text-white selection:bg-neutral-800 selection:text-white">
        {/* Universal Architectural Sticky Navbar */}
        <Navbar />

        {/* 1. Atmospheric Ambient Hero */}
        <ServiceHero />

        {/* 2. White-Themed Architectural Metrics Strip */}
        <ServiceMetricsStrip />

        {/* 3. White-Themed Core Failure Realities (Why standard benchmarks fail) */}
        <EvaluationRealitiesSection />

        {/* 4. Interactive Evaluation Workbench (4 Pillars: Rubrics, Verifiers, Judges, Gates) */}
        <EvaluationWorkbenchSection />

        {/* 5. The 4 Evaluation Dimensions (50+ dimensions breakdown) */}
        <EvaluationTaxonomySection />

        {/* 6. How We Deliver (Progressive 4-Step Engagement Grid) */}
        <EvaluationDeliverySection />

        {/* 7. Frequently Asked Questions (Technical & Engagement) */}
        <EvaluationFAQSection />

        {/* 8. High-Contrast Conversion CTA */}
        <ServiceCTASection />

        {/* Universal Footer */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
