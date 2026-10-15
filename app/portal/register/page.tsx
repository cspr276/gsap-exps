import type { Metadata } from 'next';
import AuthHeader from '@/components/portal/AuthHeader';
import AuthFooter from '@/components/portal/AuthFooter';
import PortalRegisterCard from '@/components/portal/PortalRegisterCard';
import PortalAurora from '@/components/portal/PortalAurora';

export const metadata: Metadata = {
  title: 'Sign Up — Evalixa AI Contributor Portal',
  description: 'Join the Evalixa AI expert contributor network. Apply your skills to LLM red-teaming, RLHF, and agent benchmarking.',
};

export default function PortalRegisterPage() {
  return (
    <div className="min-h-screen relative flex flex-col bg-[#FAFAFA] dark:bg-[#09090b] text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white dark:selection:bg-neutral-800 transition-colors overflow-x-hidden">
      {/* Subtle Aurora Glow at the top */}
      <PortalAurora />

      {/* Top Header */}
      <AuthHeader />

      {/* Main Centered Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12 relative z-10">
        <PortalRegisterCard />
      </main>

      {/* Bottom Footer */}
      <AuthFooter />
    </div>
  );
}
