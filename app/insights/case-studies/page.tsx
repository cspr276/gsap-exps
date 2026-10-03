import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import CaseStudiesHero from '@/components/case-studies/CaseStudiesHero';
import CaseStudiesMethodSection from '@/components/case-studies/CaseStudiesMethodSection';
import CaseStudiesLedgerSection from '@/components/case-studies/CaseStudiesLedgerSection';
import CaseStudiesReportingSection from '@/components/case-studies/CaseStudiesReportingSection';
import CaseStudiesCTASection from '@/components/case-studies/CaseStudiesCTASection';

export const metadata: Metadata = {
  title: 'Case Studies — Traceable AI Evaluation & Auditing | Evalixa',
  description:
    'Engagement stories showing how Evalixa turns AI evaluation, adversarial red-teaming, and expert data into decisions teams can defend to boards, auditors, and regulators.',
  openGraph: {
    title: 'Evalixa Case Studies — Traceable AI Evaluation',
    description:
      'Explore in-depth delivery patterns across fintech autonomous agent evaluation, frontier model red-teaming, and clinical documentation RLHF.',
    type: 'website',
  },
};

export default function CaseStudiesPage() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#09090b] text-white selection:bg-neutral-800 selection:text-white">
        {/* Universal Architectural Sticky Navbar */}
        <Navbar />

        {/* 1. Pinned Atmospheric Hero (Dark — Full Screen Height with Background Image) */}
        <CaseStudiesHero />

        {/* Continuous Z-20 Stacking Layer */}
        <div className="relative z-20 bg-[#09090b]">
          {/* 2. Audit Principles & Verification Methodology (White Editorial) */}
          <CaseStudiesMethodSection />

          {/* 3. In-Depth Engagement Ledger (Left Pinned Rail + Right Structured Cards) */}
          <CaseStudiesLedgerSection />

          {/* 4. How We Report Outcomes (4-Segmented Grid with Subtle Grainient Shaders) */}
          <CaseStudiesReportingSection />

          {/* 5. Direct Scoping CTA (WebGL Aurora Canvas) */}
          <CaseStudiesCTASection />

          {/* 6. Institutional Footer */}
          <Footer />
        </div>
      </main>
    </SmoothScroll>
  );
}
