import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogTOC from '@/components/blogs/BlogTOC';
import BlogBodyRenderer from '@/components/blogs/BlogBodyRenderer';
import { blogPosts, getBlogPost } from '@/data/blogPosts';
import { ArrowLeft, ArrowRight, ArrowUpRight, Image as ImageIcon } from 'lucide-react';

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: 'Blog Not Found | Evalixa',
    };
  }

  return {
    title: `${post.metaTitle.replace(' | Evalixa AI', '').replace(' | Evalixa', '')} | Evalixa`,
    description: post.metaDescription,
    keywords: [post.title, ...(post.tags || []), 'Evalixa AI'].join(', '),
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.publishDate,
      authors: ['Evalixa AI'],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Find next post for footer recommendation
  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const nextPost =
    currentIndex >= 0 && currentIndex < blogPosts.length - 1
      ? blogPosts[currentIndex + 1]
      : blogPosts[0];

  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#09090b] text-white selection:bg-neutral-800 selection:text-white">
        <Navbar />

        {/* Blog Header & Editorial Meta */}
        <header className="relative pt-32 sm:pt-40 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-neutral-800/80">
          {/* Top Breadcrumb & Category */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <Link
              href="/insights/blogs"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Blogs</span>
            </Link>

            <span className="font-mono text-xs uppercase tracking-wider text-neutral-300 px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800">
              {post.category}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white tracking-tight leading-[1.12] mb-6">
            {post.title}
          </h1>

          {/* Lede / Intro */}
          <p className="font-sans text-lg sm:text-xl text-neutral-300 leading-relaxed mb-8 max-w-4xl">
            {post.intro}
          </p>

          {/* Byline & Read Time Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-neutral-800/80 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-3">
              <span className="text-white font-semibold">Evalixa AI</span>
              <span>•</span>
              <time dateTime={post.publishDate}>{post.publishDate}</time>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
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

        {/* Cover Media or Image Placeholder */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
          {post.coverImage ? (
            <div className="relative w-full aspect-21/9 rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950">
              <Image
                src={post.coverImage}
                alt={post.coverImageAlt || post.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          ) : (
            <div className="relative w-full aspect-21/9 rounded-lg border border-neutral-800 bg-neutral-900/30 flex flex-col items-center justify-center p-8 text-center space-y-3">
              <div className="w-10 h-10 rounded-lg border border-neutral-800 bg-neutral-900 flex items-center justify-center text-neutral-400">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div className="space-y-1.5 max-w-xl">
                <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 block">
                  IMAGE PLACEHOLDER // ARCHITECTURAL SCHEMATIC
                </span>
                <span className="font-display font-medium text-sm sm:text-base text-neutral-200 block">
                  {post.coverImageAlt || post.title}
                </span>
              </div>
            </div>
          )}
          {post.coverImageAlt && (
            <p className="text-xs text-neutral-400 font-mono text-center mt-3">
              {post.coverImageAlt}
            </p>
          )}
        </div>

        {/* Reading Layout: Left Sticky TOC + Main Article Body */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-start gap-10 lg:gap-16">
          {/* Left Sticky TOC */}
          <aside className="hidden lg:block w-56 shrink-0 sticky top-28 self-start pt-1">
            <BlogTOC items={post.toc} />
          </aside>

          {/* Main Article Content */}
          <article className="flex-1 min-w-0 max-w-3xl">
            <BlogBodyRenderer blocks={post.blocks} />

            {/* In-Article Conversion Banner */}
            <div className="mt-20 pt-12 border-t border-neutral-800">
              <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-8 sm:p-10 space-y-6">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block">
                  RESEARCH & ADVISORY
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                  Want to work with a team that thinks this carefully about delivery?
                </h3>
                <p className="font-sans text-sm sm:text-base text-neutral-400 leading-relaxed max-w-xl">
                  Evalixa partners with engineering teams, labs, and enterprises on agent evaluation, adversarial security, and model assurance.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href={`/contact?source=${encodeURIComponent(post.slug)}`}
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

            {/* Next Post Recommendation */}
            {nextPost && nextPost.slug !== post.slug && (
              <div className="mt-12 pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <Link
                  href="/insights/blogs"
                  className="text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
                >
                  ← Back to all blogs
                </Link>

                <Link
                  href={nextPost.path}
                  className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-300 hover:text-white transition-colors text-right"
                >
                  <span>Next: {nextPost.title.slice(0, 45)}...</span>
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
