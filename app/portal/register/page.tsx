import type { Metadata } from 'next';
import AuthHeader from '@/components/portal/AuthHeader';
import AuthFooter from '@/components/portal/AuthFooter';
import PortalRegisterCard from '@/components/portal/PortalRegisterCard';

export const metadata: Metadata = {
  title: 'Sign Up — Evalixa AI Contributor Portal',
  description: 'Join the Evalixa AI expert contributor network. Apply your skills to LLM red-teaming, RLHF, and agent benchmarking.',
};

export default function PortalRegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Top Header */}
      <AuthHeader />

      {/* Main Centered Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12 relative overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-neutral-200/40 via-neutral-100/20 to-transparent blur-3xl pointer-events-none -z-10"
          aria-hidden="true"
        />

        <PortalRegisterCard />
      </main>

      {/* Bottom Footer */}
      <AuthFooter />
    </div>
  );
}
