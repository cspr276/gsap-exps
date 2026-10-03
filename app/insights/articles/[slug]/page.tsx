import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArticleTOC from '@/components/articles/ArticleTOC';
import ArticleBodyRenderer from '@/components/articles/ArticleBodyRenderer';
import { articlePosts, getArticle } from '@/data/articleContent';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return articlePosts.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return {
      title: 'Article Not Found | Evalixa',
    };
  }

  return {
    title: `${article.metaTitle.replace(' | Evalixa AI', '').replace(' | Evalixa', '')} | Evalixa`,
    description: article.metaDescription,
    keywords: [article.title, ...(article.tags || []), 'Evalixa AI'].join(', '),
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      type: 'article',
      publishedTime: article.publishDate,
      authors: ['Evalixa AI'],
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  // Find next article for footer recommendation
  const currentIndex = articlePosts.findIndex((a) => a.slug === slug);
  const nextArticle =
    currentIndex >= 0 && currentIndex < articlePosts.length - 1
      ? articlePosts[currentIndex + 1]
      : articlePosts[0];

  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#09090b] text-white selection:bg-neutral-800 selection:text-white">
        <Navbar />

        {/* Article Header & Editorial Meta */}
        <header className="relative pt-32 sm:pt-40 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-neutral-800/80">
          {/* Top Breadcrumb & Category */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <Link
              href="/insights/articles"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Articles</span>
            </Link>

            <span className="font-mono text-xs uppercase tracking-wider text-neutral-300 px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800">
              {article.category}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white tracking-tight leading-[1.12] mb-6">
            {article.title}
          </h1>

          {/* Lede / Intro */}
          <p className="font-sans text-lg sm:text-xl text-neutral-300 leading-relaxed mb-8 max-w-4xl">
            {article.intro}
          </p>

          {/* Byline & Read Time Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-neutral-800/80 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-3">
              <span className="text-white font-semibold">Evalixa AI</span>
              <span>•</span>
              <time dateTime={article.publishDate}>{article.publishDate}</time>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded bg-neutral-900/80 border border-neutral-800 text-[11px] text-neutral-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Optional Cover Media */}
        {article.coverImage && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
            <div className="relative w-full aspect-21/9 rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950">
              <Image
                src={article.coverImage}
                alt={article.coverImageAlt || article.title}
                fill
                priority
                className="object-cover"
              />
            </div>
            {article.coverImageAlt && (
              <p className="text-xs text-neutral-500 font-mono text-center mt-3">
                {article.coverImageAlt}
              </p>
            )}
          </div>
        )}

        {/* Reading Layout: Left Sticky TOC + Main Article Body */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-start gap-10 lg:gap-16">
          {/* Left Sticky TOC */}
          <aside className="hidden lg:block w-56 shrink-0 sticky top-28 self-start pt-1">
            <ArticleTOC items={article.toc} />
          </aside>

          {/* Main Article Content */}
          <article className="flex-1 min-w-0 max-w-3xl">
            <ArticleBodyRenderer blocks={article.blocks} />

            {/* In-Article Conversion Banner */}
            <div className="mt-20 pt-12 border-t border-neutral-800">
              <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-8 sm:p-10 space-y-6">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block">
                  ENGAGEMENT & ADVISORY
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                  Want to work with a team that thinks this carefully about delivery?
                </h3>
                <p className="font-sans text-sm sm:text-base text-neutral-400 leading-relaxed max-w-xl">
                  Evalixa partners with engineering teams, labs, and enterprises on agent evaluation, adversarial security, and model assurance.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href={`/contact?source=${encodeURIComponent(article.slug)}`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-colors"
                  >
                    <span>Talk to Evalixa AI</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/insights/case-studies"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-xs uppercase tracking-wider font-medium border border-neutral-700 transition-colors"
                  >
                    <span>View Case Studies</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Next Article Recommendation */}
            {nextArticle && nextArticle.slug !== article.slug && (
              <div className="mt-12 pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <Link
                  href="/insights/articles"
                  className="text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
                >
                  ← Back to all articles
                </Link>

                <Link
                  href={nextArticle.path}
                  className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-300 hover:text-white transition-colors text-right"
                >
                  <span>Next: {nextArticle.title.slice(0, 45)}...</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            )}
          </article>
        </div>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
