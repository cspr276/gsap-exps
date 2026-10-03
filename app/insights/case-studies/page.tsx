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

        <CaseStudiesHero />
        <CaseStudiesMethodSection />
        <CaseStudiesLedgerSection />
        <CaseStudiesReportingSection />
        <CaseStudiesCTASection />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
