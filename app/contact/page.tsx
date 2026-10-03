import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactClientView from '@/components/contact/ContactClientView';

export const metadata: Metadata = {
  title: 'Contact Evalixa AI — Start a Conversation',
  description:
    'Contact Evalixa AI for AI benchmarking, agent evaluation, security testing, and enterprise AI services. Based in Hyderabad, India — serving teams globally. We respond within one business day.',
  openGraph: {
    title: 'Contact Evalixa AI — Start a Conversation',
    description:
      'Tell us what you are building, testing, or securing. Your message is routed to the right Evalixa reviewer.',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#09090b] text-white selection:bg-neutral-800 selection:text-white">
        {/* Universal Architectural Sticky Navbar */}
        <Navbar />

        {/* Clean, authentic contact experience strictly based on original website */}
        <ContactClientView />

        {/* Universal Elevated Footer */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
