import SmoothScroll from '@/components/SmoothScroll';
import DynamicIslandNav from '@/components/DynamicIslandNav';
import HeroAndServicesSection from '@/components/HeroAndServicesSection';
import HorizontalServicesSection from '@/components/HorizontalServicesSection';
import EvidenceAssuranceSection from '@/components/EvidenceAssuranceSection';
import DeliveryProcessSection from '@/components/DeliveryProcessSection';
import TrustAndStatsSection from '@/components/TrustAndStatsSection';
import ManifestoSection from '@/components/ManifestoSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-neutral-950 text-white selection:bg-neutral-800 selection:text-white">
        {/* Crisp Architectural Glass Nav */}
        <DynamicIslandNav />

        {/* Hero & 3 Services Scroll Flow with fast responsive scroll, text hold, and image gliding */}
        <HeroAndServicesSection />

        {/* Remaining Services arranged horizontally in one line, pinned while cards scroll on scroll */}
        <HorizontalServicesSection />

        {/* Evidence & Assurance: Auditable Traces, Risk Stratification, Calibrated Experts */}
        <EvidenceAssuranceSection />

        {/* How We Deliver: 4-Step Precision Pipeline with connected laser beam timeline */}
        <DeliveryProcessSection />

        {/* Built for Trust & 4 Stat Metrics Grid with spotlight cards */}
        <TrustAndStatsSection />

        {/* Editorial Manifesto Section with word-by-word scroll scrub */}
        <ManifestoSection />

        {/* High-Conversion CTA Banner */}
        <CTASection />

        {/* Footer matching uploaded reference design */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
