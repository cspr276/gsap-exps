'use client';

import React, { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Search, MapPin, Clock, Calendar, ArrowRight, X, Mail } from 'lucide-react';
import { CAREER_ROLES, CAREERS_EMAIL } from '@/data/careerRoles';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CATEGORIES = [
  { id: 'all', label: 'All Tracks' },
  { id: 'engineering', label: 'AI Engineering' },
  { id: 'infrastructure', label: 'Infrastructure' },
  { id: 'security', label: 'AI Security' },
  { id: 'research', label: 'Research' },
  { id: 'network', label: 'Expert Network' },
  { id: 'operations', label: 'Operations & Growth' },
];

export default function CareersOpenPositionsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const filteredRoles = useMemo(() => {
    return CAREER_ROLES.filter((role) => {
      const matchesCategory =
        selectedCategory === 'all' || role.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        role.title.toLowerCase().includes(query) ||
        role.team.toLowerCase().includes(query) ||
        role.summary.toLowerCase().includes(query) ||
        role.qualification.toLowerCase().includes(query) ||
        role.skills.some((skill) => skill.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Smooth beginning-to-end scroll scrub for job cards
  useGSAP(
    () => {
      const container = cardsContainerRef.current;
      if (!container) return;

      const cards = gsap.utils.toArray<HTMLElement>('.career-job-card', container);
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 36, opacity: 0.15 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 95%',
              end: 'top 65%',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    },
    { scope: sectionRef, dependencies: [filteredRoles] }
  );

  return (
    <section
      ref={sectionRef}
      id="open-positions"
      className="relative z-20 w-full py-24 sm:py-32 bg-[#09090b] text-white border-b border-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Sticky / Pinned Filter and Summary Box */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 self-start">
            <div className="p-5 sm:p-6 rounded-md bg-neutral-950 border border-neutral-800 max-h-[calc(100vh-7rem)] overflow-y-auto">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-2">
                OPENINGS LEDGER
              </span>
              <h2 className="font-display font-bold text-2xl text-white tracking-tight leading-tight mb-2.5">
                Open Positions.
              </h2>
              <p className="font-sans text-xs text-neutral-400 leading-relaxed font-normal mb-4">
                Evalixa hires people who can raise the quality of AI evaluation, security testing, expert review, and delivery operations.
              </p>

              {/* Quick Telemetry Summary */}
              <div className="grid grid-cols-2 gap-3 py-3 border-y border-neutral-900 mb-4 text-xs">
                <div>
                  <span className="block font-display font-bold text-lg text-white">25+</span>
                  <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
                    Total Openings
                  </span>
                </div>
                <div>
                  <span className="block font-display font-bold text-lg text-white">6</span>
                  <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
                    Hiring Tracks
                  </span>
                </div>
              </div>

              {/* Category / Department Filter Buttons */}
              <div className="space-y-1 mb-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 font-semibold block mb-1.5">
                  FILTER BY TRACK:
                </span>
                {CATEGORIES.map((cat) => {
                  const count =
                    cat.id === 'all'
                      ? CAREER_ROLES.length
                      : CAREER_ROLES.filter((r) => r.category === cat.id).length;
                  const isSelected = selectedCategory === cat.id;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white text-neutral-950 font-semibold shadow-xs'
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded ${
                          isSelected
                            ? 'bg-neutral-200 text-neutral-950'
                            : 'bg-neutral-900 text-neutral-500'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Direct Mail Rail */}
              <div className="pt-3.5 border-t border-neutral-900">
                <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 block mb-1.5">
                  DIRECT RESUME SUBMISSION:
                </span>
                <a
                  href={`mailto:${CAREERS_EMAIL}`}
                  className="font-mono text-xs text-neutral-300 hover:text-white flex items-center gap-2 underline underline-offset-4"
                >
                  <Mail className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{CAREERS_EMAIL}</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Right Column: Search Bar at Top + Proper Job Cards Below */}
          <div className="lg:col-span-8 space-y-6">
            {/* Top Search Bar */}
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by role title, team, or skills (e.g. Python, Debian, OWASP, PhD)..."
                className="w-full pl-11 pr-10 py-3.5 rounded-md bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-hidden focus:border-white transition-colors shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Results Counter */}
            <div className="flex items-center justify-between text-xs font-mono text-neutral-500 px-1">
              <span>
                Showing {filteredRoles.length} {filteredRoles.length === 1 ? 'role' : 'roles'}
              </span>
              {(selectedCategory !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="text-neutral-400 hover:text-white underline underline-offset-2 cursor-pointer"
                >
                  Reset all filters
                </button>
              )}
            </div>

            {/* Proper Job Opening Cards with GSAP scroll scrub */}
            {filteredRoles.length > 0 ? (
              <div ref={cardsContainerRef} className="space-y-4">
                {filteredRoles.map((role) => (
                  <div key={role.slug} className="career-job-card will-change-transform">
                    <Link
                      href={`/careers/${role.slug}`}
                      className="group block p-7 rounded-md bg-neutral-950 border border-neutral-800 hover:border-neutral-500/80 transition-all duration-300 shadow-xl cursor-pointer"
                    >
                      {/* Header: Track & Openings Badge */}
                      <div className="flex items-center justify-between mb-3.5">
                        <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                          {role.team}
                        </span>
                        <span className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 font-medium">
                          {role.openings} {role.openings === 1 ? 'opening' : 'openings'}
                        </span>
                      </div>

                      {/* Role Title */}
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-2.5 tracking-tight group-hover:text-neutral-200 transition-colors">
                        {role.title}
                      </h3>

                      {/* Summary */}
                      <p className="font-sans text-sm text-neutral-400 leading-relaxed mb-5 font-normal">
                        {role.summary}
                      </p>

                      {/* Facts Bar */}
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 py-3 border-y border-neutral-900 text-xs text-neutral-400 font-sans mb-4">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                          <span>{role.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                          <span>{role.experience}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                          <span>Review: {role.deadline}</span>
                        </div>
                      </div>

                      {/* Skills pills & Action CTA */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                        <div className="flex flex-wrap gap-1.5">
                          {role.skills.map((skill) => (
                            <span
                              key={skill}
                              className="font-mono text-[10px] px-2.5 py-1 rounded bg-neutral-900 text-neutral-400 border border-neutral-800/80"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="inline-flex items-center gap-2 text-xs font-semibold text-white group-hover:text-neutral-200 shrink-0">
                          <span>Apply for this role</span>
                          <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 rounded-md bg-neutral-950 border border-neutral-900 text-center">
                <h4 className="font-display font-bold text-xl text-white mb-2">No roles found</h4>
                <p className="font-sans text-sm text-neutral-400 max-w-md mx-auto mb-6">
                  No open positions match your current search or track filter.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="px-5 py-2.5 rounded-md bg-white text-neutral-950 font-semibold text-xs tracking-wide cursor-pointer hover:bg-neutral-200 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
