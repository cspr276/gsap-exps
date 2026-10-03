'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Clock, Calendar, ArrowRight, X, Mail } from 'lucide-react';
import { CAREER_ROLES, CAREERS_EMAIL } from '@/data/careerRoles';

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

  return (
    <section
      id="open-positions"
      className="relative z-20 w-full py-24 sm:py-32 bg-[#09090b] text-white border-b border-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Sticky / Pinned Filter and Summary Box */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="p-7 rounded-md bg-neutral-950 border border-neutral-800"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-3">
                OPENINGS LEDGER
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-tight mb-4">
                Open Positions.
              </h2>
              <p className="font-sans text-sm text-neutral-400 leading-relaxed font-normal mb-6">
                Evalixa hires people who can raise the quality of AI evaluation, security testing, expert review, and delivery operations.
              </p>

              {/* Quick Telemetry Summary */}
              <div className="grid grid-cols-2 gap-3 py-4 border-y border-neutral-900 mb-6 text-xs">
                <div>
                  <span className="block font-display font-bold text-xl text-white">25+</span>
                  <span className="font-mono text-[11px] text-neutral-500 uppercase tracking-wider">
                    Total Openings
                  </span>
                </div>
                <div>
                  <span className="block font-display font-bold text-xl text-white">6</span>
                  <span className="font-mono text-[11px] text-neutral-500 uppercase tracking-wider">
                    Hiring Tracks
                  </span>
                </div>
              </div>

              {/* Category / Department Filter Buttons */}
              <div className="space-y-1.5 mb-6">
                <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 font-semibold block mb-2">
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
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs font-mono transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white text-neutral-950 font-semibold shadow-sm'
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded ${
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
              <div className="pt-5 border-t border-neutral-900">
                <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 block mb-2">
                  DIRECT RESUME SUBMISSION:
                </span>
                <a
                  href={`mailto:${CAREERS_EMAIL}`}
                  className="font-mono text-xs text-white hover:text-neutral-300 flex items-center gap-2 underline underline-offset-4"
                >
                  <Mail className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{CAREERS_EMAIL}</span>
                </a>
              </div>
            </motion.div>
          </aside>

          {/* Right Column: Search Bar at Top + Proper Job Cards Below */}
          <div className="lg:col-span-8 space-y-6">
            {/* Top Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full"
            >
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
            </motion.div>

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

            {/* Proper Job Opening Cards */}
            {filteredRoles.length > 0 ? (
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {filteredRoles.map((role) => (
                    <motion.div
                      key={role.slug}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
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
                    </motion.div>
                  ))}
                </AnimatePresence>
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
