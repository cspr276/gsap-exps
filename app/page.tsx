import SmoothScroll from '@/components/SmoothScroll';
import DynamicIslandNav from '@/components/DynamicIslandNav';
import HeroAndServicesSection from '@/components/HeroAndServicesSection';
import HorizontalServicesSection from '@/components/HorizontalServicesSection';
import ManifestoSection from '@/components/ManifestoSection';
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

        {/* Editorial Manifesto Section with word-by-word scroll scrub */}
        <ManifestoSection />

        {/* Footer matching uploaded reference design */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
