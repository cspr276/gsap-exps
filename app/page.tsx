import SmoothScroll from '@/components/SmoothScroll';
import DynamicIslandNav from '@/components/DynamicIslandNav';
import HeroAndServicesSection from '@/components/HeroAndServicesSection';
import HorizontalServicesSection from '@/components/HorizontalServicesSection';
import DeliveryProcessSection from '@/components/DeliveryProcessSection';
import ManifestoSection from '@/components/ManifestoSection';
import WhyEvalixaSection from '@/components/WhyEvalixaSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-neutral-950 text-white selection:bg-neutral-800 selection:text-white">
        {/* Crisp Architectural Glass Nav */}
        <DynamicIslandNav />

        {/* Hero & 3 Services Scroll Flow */}
        <HeroAndServicesSection />

        {/* Remaining Services arranged horizontally in one line, pinned while cards scroll on scroll */}
        <HorizontalServicesSection />

        {/* Concept 1: The Pinned Step-Through Rail ("How We Deliver" — Steps 01–04) */}
        <DeliveryProcessSection />

        {/* Why Evalixa: Evidence & Assurance (White-themed Bento Grid) */}
        <WhyEvalixaSection />

        {/* Editorial Manifesto / 3 Core Pillars Section */}
        <ManifestoSection />

        {/* Section above Footer with Aurora background */}
        <CTASection />

        {/* Footer matching uploaded reference design */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
