import React from 'react';
import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogsHero from '@/components/blogs/BlogsHero';
import BlogsEditorialSection from '@/components/blogs/BlogsEditorialSection';
import BlogsCTASection from '@/components/blogs/BlogsCTASection';

export const metadata: Metadata = {
  title: 'Blog - AI Insights & Engineering Strategy | Evalixa',
  description:
    'Expert writing on AI benchmarking, agent evaluation, LLM security, enterprise AI, and modern engineering practices by the Evalixa AI team.',
  keywords: [
    'AI blog',
    'AI benchmarking blog',
    'enterprise AI insights',
    'LLM evaluation articles',
    'AI security testing blog',
    'AI agent evaluation guide',
    'Evalixa AI blog',
    'AI engineering best practices',
  ],
  openGraph: {
    title: 'Evalixa AI Blog — Field Notes on AI Evaluation',
    description:
      'Long-form writing on benchmarking, red-teaming, model security, and expert review, written for teams shipping AI they need to trust.',
    type: 'website',
  },
};

export default function BlogsIndexPage() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#09090b] text-white selection:bg-neutral-800 selection:text-white">
        <Navbar />
        <BlogsHero />
        <BlogsEditorialSection />
        <BlogsCTASection />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
