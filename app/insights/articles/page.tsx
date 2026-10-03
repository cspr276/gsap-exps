import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import ArticlesHero from '@/components/articles/ArticlesHero';
import ArticlesEditorialSection from '@/components/articles/ArticlesEditorialSection';
import ArticlesCTASection from '@/components/articles/ArticlesCTASection';

export const metadata: Metadata = {
  title: 'Articles — Technical Strategy & Market Context | Evalixa',
  description:
    'Long-form reads on software startups, technology strategy, AI benchmarking architectures, and Evalixa’s perspective on modern engineering delivery.',
  openGraph: {
    title: 'Evalixa Articles — Long-Form Strategy & Technical Context',
    description:
      'Grounded in real engineering practice, explore deep-dives into SWE-bench, Terminal-Bench, MLPerf, software startup mechanics, and multimodal governance.',
    type: 'website',
  },
};

export default function ArticlesPage() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#09090b] text-white selection:bg-neutral-800 selection:text-white">
        <Navbar />
        <ArticlesHero />
        <ArticlesEditorialSection />
        <ArticlesCTASection />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
