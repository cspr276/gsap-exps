import type { Metadata } from 'next';
import AuthHeader from '@/components/portal/AuthHeader';
import AuthFooter from '@/components/portal/AuthFooter';
import PortalLoginCard from '@/components/portal/PortalLoginCard';
import PortalAurora from '@/components/portal/PortalAurora';

export const metadata: Metadata = {
  title: 'Sign In — Evalixa AI Contributor Portal',
  description: 'Sign in to access your Evalixa AI contributor portal, projects, reviews, and benchmarking workflows.',
};

export default function PortalLoginPage() {
  return (
    <div className="min-h-screen relative flex flex-col bg-[#FAFAFA] dark:bg-[#09090b] text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white dark:selection:bg-neutral-800 transition-colors overflow-x-hidden">
      {/* Subtle Aurora Glow at the top */}
      <PortalAurora />

      {/* Top Header */}
      <AuthHeader />

      {/* Main Centered Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12 relative z-10">
        <PortalLoginCard />
      </main>

      {/* Bottom Footer */}
      <AuthFooter />
    </div>
  );
}
