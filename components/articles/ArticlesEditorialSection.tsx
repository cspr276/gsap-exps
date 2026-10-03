'use client';

import React, { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { articlePosts } from '@/data/articleContent';
import { ArrowRight, ArrowUpRight, Search, X } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CATEGORIES = [
  'All',
  'Benchmarking',
  'AI Governance',
  'Startup Strategy',
  'Industry',
  'Company',
  'Guide',
];

export default function ArticlesEditorialSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLElement | null)[]>([]);

  // Filter logic
  const filteredArticles = useMemo(() => {
    return articlePosts.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All' || article.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        article.title.toLowerCase().includes(query) ||
        article.intro.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        article.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const isFiltering = searchQuery.trim() !== '' || selectedCategory !== 'All';

  // Lead article is the first matching article if not filtering, otherwise standard stream
  const featuredArticle = !isFiltering && filteredArticles.length > 0 ? filteredArticles[0] : null;
  const listArticles = !isFiltering && filteredArticles.length > 0 ? filteredArticles.slice(1) : filteredArticles;

  useGSAP(
    () => {
      rowRefs.current.forEach((row, index) => {
        if (!row) return;
        gsap.fromTo(
          row,
          { y: 25, opacity: 0.2 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              id: `article-row-${index}`,
              trigger: row,
              start: 'top 92%',
              end: 'top 65%',
              scrub: 1,
            },
          }
        );
      });
    },
    { dependencies: [filteredArticles.length, selectedCategory, searchQuery], scope: containerRef }
  );

  return (
    <section
      id="articles-stream"
      ref={containerRef}
      className="relative bg-[#09090b] text-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-b border-neutral-800"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Natural Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pb-16 border-b border-neutral-800">
          {/* Main Title & Lede */}
          <div className="lg:col-span-7 space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block">
              EDITORIAL LIBRARY // 6 ARTICLES
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              In-depth analysis for technology leaders.
            </h2>
            <p className="font-sans text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl">
              Our articles explore the topics that matter most to founders, product leaders, and engineering teams. Grounded in real practice, each essay examines architectural trade-offs, benchmarking rigor, and market dynamics.
            </p>
          </div>

          {/* Editorial Notes Block */}
          <div className="lg:col-span-5 space-y-6 pt-2 lg:pt-8 text-sm text-neutral-400">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-300 font-semibold block mb-2">
                What We Write About
              </span>
              <p className="leading-relaxed text-xs sm:text-sm">
                Software startup strategy, vendor selection frameworks, benchmarking architectures, and security analysis — written by active practitioners at Evalixa.
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-800/80">
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-300 font-semibold block mb-2">
                Articles vs. Blogs
              </span>
              <p className="leading-relaxed text-xs sm:text-sm">
                Blogs dive deep into code and engineering mechanics. Articles focus on high-stakes business strategy, market context, and architectural governance.
              </p>
            </div>
          </div>
        </div>

        {/* Searchbar & Category Filter Toolbar */}
        <div className="space-y-5 pb-8 border-b border-neutral-800/80">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title, topic, or keyword..."
                className="w-full bg-neutral-900/60 border border-neutral-800 rounded-lg pl-10 pr-9 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Results Counter */}
            <span className="font-mono text-xs text-neutral-400">
              Showing {filteredArticles.length} of {articlePosts.length} articles
            </span>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-md font-mono text-xs tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-black font-semibold shadow-xs'
                      : 'bg-neutral-900/60 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty State when no articles match filter */}
        {filteredArticles.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block">
              NO MATCHES FOUND
            </span>
            <h3 className="font-display font-bold text-xl text-white">
              No articles match your search criteria.
            </h3>
            <p className="text-sm text-neutral-400 max-w-sm mx-auto">
              Try adjusting your keyword or resetting category filters to browse all published essays.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-xs uppercase tracking-wider transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Featured / Lead Article Spotlight (Shown when viewing default unfiltered state) */}
        {featuredArticle && (
          <div className="pb-16 border-b border-neutral-800">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-6">
              01 // LEAD ESSAY
            </span>
            <Link
              href={featuredArticle.path}
              className="group block space-y-6 hover:text-white transition-colors"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400">
                <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                  {featuredArticle.category}
                </span>
                <span>•</span>
                <span>{featuredArticle.publishDate}</span>
                <span>•</span>
                <span>{featuredArticle.readTime}</span>
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight group-hover:text-neutral-200 transition-colors">
                {featuredArticle.title}
              </h3>

              <p className="font-sans text-base sm:text-lg text-neutral-400 leading-relaxed max-w-4xl">
                {featuredArticle.intro}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                <div className="flex flex-wrap gap-2">
                  {featuredArticle.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] text-neutral-400 bg-neutral-900/80 border border-neutral-800 px-2.5 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-white group-hover:translate-x-1 transition-transform">
                  <span>Read Lead Article</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        )}

        {/* Secondary Articles Natural Rows */}
        {listArticles.length > 0 && (
          <div className="divide-y divide-neutral-800">
            {listArticles.map((article, idx) => (
              <article
                key={article.slug}
                ref={(el) => {
                  rowRefs.current[idx] = el;
                }}
                className="py-12 sm:py-16 first:pt-0 last:pb-0"
              >
                <Link
                  href={article.path}
                  className="group flex flex-col md:flex-row md:items-start justify-between gap-6 hover:text-white transition-colors"
                >
                  {/* Index Column */}
                  <div className="flex items-baseline gap-4 md:w-36 shrink-0">
                    <span className="font-mono text-3xl sm:text-4xl font-extrabold text-neutral-400 group-hover:text-white transition-colors">
                      {String((featuredArticle ? idx + 2 : idx + 1)).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                      {article.category}
                    </span>
                  </div>

                  {/* Article Content */}
                  <div className="flex-1 min-w-0 space-y-3">
                    <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
                      <span>{article.readTime}</span>
                      <span>•</span>
                      <span>{article.publishDate}</span>
                    </div>

                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight leading-snug group-hover:text-neutral-200 transition-colors">
                      {article.title}
                    </h3>

                    <p className="font-sans text-sm sm:text-base text-neutral-400 leading-relaxed max-w-3xl line-clamp-3">
                      {article.intro}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[11px] text-neutral-400 bg-neutral-900/60 border border-neutral-800 px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow Action */}
                  <div className="hidden md:flex items-center justify-end w-12 pt-2">
                    <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
