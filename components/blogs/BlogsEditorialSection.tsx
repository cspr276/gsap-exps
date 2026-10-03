'use client';

import React, { useState, useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { blogPosts } from '@/data/blogPosts';
import { ArrowRight, ArrowUpRight, Search, X, Image as ImageIcon } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CATEGORIES = [
  'All',
  'AI & Automation',
  'Agentic AI',
  'AI Strategy',
  'Healthcare AI',
];

export default function BlogsEditorialSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLElement | null)[]>([]);

  // Filter logic
  const filteredBlogs = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        post.title.toLowerCase().includes(query) ||
        post.intro.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const isFiltering = searchQuery.trim() !== '' || selectedCategory !== 'All';

  // Lead post is the first matching post if not actively filtering, otherwise standard filtered stream
  const featuredBlog = !isFiltering && filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const listBlogs = !isFiltering && filteredBlogs.length > 0 ? filteredBlogs.slice(1) : filteredBlogs;

  useGSAP(
    () => {
      // When searching or filtering, eliminate scroll-tied scrub to prevent glitching
      if (isFiltering) {
        rowRefs.current.forEach((row) => {
          if (row) {
            gsap.set(row, { y: 0, opacity: 1 });
          }
        });
        return;
      }

      // Unfiltered initial scroll: one-shot reveal, never fights with scroll position
      rowRefs.current.forEach((row) => {
        if (!row) return;
        gsap.fromTo(
          row,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 92%',
              once: true,
            },
          }
        );
      });
    },
    { dependencies: [filteredBlogs.length, selectedCategory, searchQuery, isFiltering], scope: containerRef }
  );

  return (
    <section
      id="blogs-stream"
      ref={containerRef}
      className="relative bg-[#09090b] text-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-b border-neutral-800"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Natural Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pb-16 border-b border-neutral-800">
          {/* Main Title & Lede */}
          <div className="lg:col-span-7 space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block">
              RESEARCH REPOSITORY // {filteredBlogs.length} {filteredBlogs.length === 1 ? 'PUBLISHED GUIDE' : 'PUBLISHED GUIDES'}
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Rigorous field research for engineering teams.
            </h2>
            <p className="font-sans text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl">
              Practical analysis of autonomous agent architecture, benchmarking frameworks, enterprise adoption, and healthcare safety evaluation. Written from the trenches of shipping production AI.
            </p>
          </div>

          {/* Research Metric Ledger */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-6 pt-4 lg:pt-0 lg:border-l lg:border-neutral-800 lg:pl-10">
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white block">
                {String(filteredBlogs.length).padStart(2, '0')}
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 block mt-1">
                Deep Guides
              </span>
            </div>
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white block">
                04
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 block mt-1">
                Domain Lanes
              </span>
            </div>
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white block">
                22m
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 block mt-1">
                Lead Read
              </span>
            </div>
          </div>
        </div>

        {/* Searchbar & Category Filter Controls */}
        <div className="space-y-6 pt-2">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guides by title, keyword, or concept..."
                className="w-full pl-10 pr-10 py-2.5 bg-neutral-900/90 border border-neutral-700/80 rounded-lg text-xs sm:text-sm text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-400 transition-colors font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Results counter indicator */}
            <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
              <span>Showing {filteredBlogs.length} of {blogPosts.length} guides</span>
              {isFiltering && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="text-neutral-300 hover:text-white underline underline-offset-4 cursor-pointer"
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Buttons (Crisp rounded-md geometry) */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count =
                cat === 'All'
                  ? blogPosts.length
                  : blogPosts.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono tracking-wider transition-all duration-150 cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-white text-black font-semibold shadow-xs'
                      : 'bg-neutral-900/60 text-neutral-400 hover:text-white hover:border-neutral-700 border border-neutral-800'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-neutral-200 text-neutral-900'
                        : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <div className="py-20 text-center border border-neutral-800 rounded-lg bg-neutral-900/30 space-y-4">
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
              NO MATCHING GUIDES FOUND
            </p>
            <p className="font-sans text-neutral-400 text-sm max-w-md mx-auto">
              No guides matched &ldquo;{searchQuery}&rdquo; in category &ldquo;{selectedCategory}&rdquo;. Try clearing your search term or picking another category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-xs uppercase tracking-wider transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Featured / Lead Guide Spotlight (Entire card clickable via Link) */}
        {featuredBlog && (
          <div className="border border-neutral-800 rounded-xl bg-neutral-900/40 relative overflow-hidden group hover:border-neutral-700 transition-colors">
            <Link
              href={featuredBlog.path}
              className="block p-8 sm:p-12 hover:text-white transition-colors cursor-pointer"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono text-xs uppercase tracking-wider">
                      {featuredBlog.category}
                    </span>
                    <span className="text-neutral-600 font-mono text-xs">•</span>
                    <span className="font-mono text-xs text-neutral-400">
                      {featuredBlog.readTime}
                    </span>
                    <span className="text-neutral-600 font-mono text-xs">•</span>
                    <span className="font-mono text-xs text-neutral-400">
                      {featuredBlog.publishDate}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight group-hover:text-neutral-200 transition-colors">
                    {featuredBlog.title}
                  </h3>

                  <p className="font-sans text-neutral-300 text-base sm:text-lg leading-relaxed line-clamp-3">
                    {featuredBlog.intro}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {featuredBlog.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded bg-neutral-800/80 border border-neutral-700/60 text-xs text-neutral-300 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4">
                    <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white font-semibold group-hover:text-neutral-300 transition-colors">
                      <span>Read Guide</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>

                {/* Cover Media: Unsplash Photo or Schematic Placeholder */}
                <div className="lg:col-span-5">
                  {featuredBlog.coverImage ? (
                    <div className="relative aspect-16/10 rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950">
                      <Image
                        src={featuredBlog.coverImage}
                        alt={featuredBlog.coverImageAlt || featuredBlog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 contrast-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
                    </div>
                  ) : (
                    <div className="relative aspect-16/10 rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950/80 flex flex-col items-center justify-center p-6 text-center space-y-3 group-hover:border-neutral-700 transition-colors">
                      <div className="w-10 h-10 rounded-lg border border-neutral-800 bg-neutral-900 flex items-center justify-center text-neutral-400 group-hover:text-white transition-colors">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 block">
                          IMAGE PLACEHOLDER // ARCHITECTURAL SCHEMATIC
                        </span>
                        <span className="font-sans text-xs text-neutral-400 block">
                          Autonomous agents networked across enterprise systems
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Secondary Guide Stream (Entire row clickable via Link, identical to Articles) */}
        {listBlogs.length > 0 && (
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 text-xs font-mono uppercase tracking-widest text-neutral-400">
              <span>{isFiltering ? 'Matching Guides' : 'Further Reading'}</span>
              <span>Index / Domain</span>
            </div>

            <div className="divide-y divide-neutral-800">
              {listBlogs.map((post, index) => {
                const globalIndex = blogPosts.findIndex((p) => p.slug === post.slug);
                const displayIndex = String(globalIndex + 1).padStart(2, '0');

                return (
                  <article
                    key={post.slug}
                    ref={(el) => {
                      rowRefs.current[index] = el;
                    }}
                    className="py-10 sm:py-12 group hover:bg-neutral-900/30 -mx-4 px-4 sm:-mx-6 sm:px-6 transition-colors rounded-lg cursor-pointer"
                  >
                    <Link
                      href={post.path}
                      className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start block"
                    >
                      {/* Left: Canonical Index & Meta */}
                      <div className="lg:col-span-3 space-y-2">
                        <span className="font-mono text-xl sm:text-2xl font-bold text-neutral-500 group-hover:text-white transition-colors block">
                          {displayIndex}
                        </span>
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <span className="font-mono text-xs uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                            {post.category}
                          </span>
                        </div>
                        <div className="font-mono text-xs text-neutral-400 space-x-2">
                          <span>{post.readTime}</span>
                          <span>•</span>
                          <span>{post.publishDate}</span>
                        </div>
                      </div>

                      {/* Center: Title & Intro */}
                      <div className="lg:col-span-8 space-y-3">
                        <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight group-hover:text-neutral-200 transition-colors">
                          {post.title}
                        </h3>
                        <p className="font-sans text-neutral-400 text-sm sm:text-base leading-relaxed line-clamp-2">
                          {post.intro}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] font-mono text-neutral-400"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right: Quick Action Arrow */}
                      <div className="lg:col-span-1 flex lg:justify-end items-center pt-2 lg:pt-0">
                        <div className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:border-neutral-600 transition-all">
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
