'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ArrowUpRight,
  Menu,
  X,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';
import {
  insightItems,
  directNavLinks,
} from '@/data/navigation';

// Simplified, clean Scale AI-inspired service categories
const serviceCategories = [
  {
    title: 'EVALUATE & ASSURE',
    items: [
      {
        title: 'AI Agent Evaluation & Benchmarking',
        path: '/services/ai-agent-evaluation-benchmarking',
        tag: 'Assurance',
      },
      {
        title: 'AI Model Security Testing',
        path: '/services/ai-model-security-testing',
        tag: 'Red Team',
      },
      {
        title: 'Continuous Monitoring & Regression',
        path: '/services/continuous-monitoring-regression-testing',
        tag: 'Protection',
      },
      {
        title: 'Agent Readiness & Risk Assessment',
        path: '/services/agent-readiness-risk-assessment',
        tag: 'Governance',
      },
    ],
  },
  {
    title: 'RUNTIME & DATA OPS',
    items: [
      {
        title: 'AI Attack Detection Systems',
        path: '/services/ai-attack-detection-systems',
        tag: 'Runtime',
      },
      {
        title: 'Data Annotation & Gold Standards',
        path: '/services/data-annotation',
        tag: 'Expert Data',
      },
      {
        title: 'Supervised Fine-Tuning (SFT) & RLHF',
        path: '/services/sft-rlhf',
        tag: 'Alignment',
      },
      {
        title: 'Enterprise AI Agents & Systems',
        path: '/services/enterprise-ai-agents',
        tag: 'Build',
      },
    ],
  },
];

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'services' | 'insights' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileInsightsOpen, setMobileInsightsOpen] = useState(false);

  const lastScrollY = useRef(0);
  const scrollDelta = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navContainerRef = useRef<HTMLElement | null>(null);

  const activeDropdownRef = useRef(activeDropdown);
  const mobileMenuOpenRef = useRef(mobileMenuOpen);

  useEffect(() => {
    activeDropdownRef.current = activeDropdown;
  }, [activeDropdown]);

  useEffect(() => {
    mobileMenuOpenRef.current = mobileMenuOpen;
  }, [mobileMenuOpen]);

  // Smooth Hide-on-Scroll with generous room and threshold
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isAtTop = currentScrollY <= 25;
      setScrolled(!isAtTop);

      // Never hide navbar if dropdown or mobile drawer is open
      if (activeDropdownRef.current || mobileMenuOpenRef.current) {
        setVisible(true);
        lastScrollY.current = currentScrollY;
        scrollDelta.current = 0;
        return;
      }

      if (isAtTop) {
        setVisible(true);
        scrollDelta.current = 0;
      } else {
        const diff = currentScrollY - lastScrollY.current;

        // Reset accumulator on direction reversal
        if ((diff > 0 && scrollDelta.current < 0) || (diff < 0 && scrollDelta.current > 0)) {
          scrollDelta.current = 0;
        }
        scrollDelta.current += diff;

        // Give plenty of room: only hide after user has scrolled down by at least 65px AND past 180px
        if (scrollDelta.current > 65 && currentScrollY > 180) {
          setVisible(false);
          setActiveDropdown(null);
        } else if (scrollDelta.current < -15) {
          // Immediately reveal on scrolling up by at least 15px
          setVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Keyboard accessibility (Escape key to dismiss)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Hover management with smooth timing and debounce
  const handleMouseEnter = (dropdown: 'services' | 'insights') => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 220);
  };

  const closeDropdownImmediate = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(null);
  }, []);

  return (
    <>
      <header
        ref={navContainerRef}
        onMouseLeave={handleMouseLeave}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
          visible ? 'translate-y-0' : '-translate-y-full'
        } ${
          activeDropdown
            ? 'bg-[#09090b] border-b border-neutral-800'
            : scrolled
            ? 'bg-[#09090b]/95 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/80'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[68px] flex items-center justify-between">
          {/* Brand Lockup */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              onClick={() => {
                closeDropdownImmediate();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2.5 group"
              aria-label="Evalixa AI Homepage"
            >
              <div className="relative w-8 h-8 shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                <Image
                  src="/logo-negative.png"
                  alt="Evalixa Mark"
                  width={32}
                  height={32}
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-display font-black text-base sm:text-lg tracking-[0.24em] text-white uppercase group-hover:text-neutral-300 transition-colors">
                EVALIXA
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 text-[13px] font-sans font-medium text-neutral-300">
              {/* Services Mega Menu Trigger */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('services')}
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveDropdown((prev) => (prev === 'services' ? null : 'services'))
                  }
                  aria-expanded={activeDropdown === 'services'}
                  aria-controls="services-mega-menu"
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md transition-all duration-200 cursor-pointer ${
                    activeDropdown === 'services'
                      ? 'text-white bg-white/[0.08]'
                      : 'hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 text-neutral-400 ${
                      activeDropdown === 'services' ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Insights / Case Studies Dropdown Trigger */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('insights')}
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveDropdown((prev) => (prev === 'insights' ? null : 'insights'))
                  }
                  aria-expanded={activeDropdown === 'insights'}
                  aria-controls="insights-dropdown"
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md transition-all duration-200 cursor-pointer ${
                    activeDropdown === 'insights'
                      ? 'text-white bg-white/[0.08]'
                      : 'hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span>Case Studies</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 text-neutral-400 ${
                      activeDropdown === 'insights' ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Direct Links */}
              {directNavLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.path}
                  onClick={closeDropdownImmediate}
                  className="px-3.5 py-1.5 rounded-md hover:text-white hover:bg-white/[0.04] transition-all duration-200 tracking-normal"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Actions: Portal & CTA */}
          <div className="hidden sm:flex items-center gap-5">
            <Link
              href="/portal/login"
              className="text-xs font-mono tracking-wider uppercase text-white hover:text-neutral-200 transition-colors"
            >
              Sign In
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-semibold px-4 py-2 rounded-md bg-white text-black hover:bg-neutral-200 border border-transparent shadow-sm transition-all duration-200"
            >
              <span>Inquire</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-black stroke-[2.5]" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-3">
            <Link
              href="/contact"
              className="text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded bg-white text-black font-semibold"
            >
              Inquire
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-md text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── REDESIGNED SERVICES DROPDOWN (Scale AI / Modern Clean Style) ── */}
        <AnimatePresence>
          {activeDropdown === 'services' && (
            <motion.div
              id="services-mega-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
              className="hidden lg:block absolute top-full inset-x-0 border-b border-neutral-800 bg-[#09090b] shadow-2xl shadow-black"
            >
              <div className="max-w-7xl mx-auto px-8 py-10">
                <div className="grid grid-cols-12 gap-10 items-start">
                  {/* Left Link Columns (Clean, unbloated, high-contrast) */}
                  <div className="col-span-7 grid grid-cols-2 gap-8">
                    {serviceCategories.map((category) => (
                      <div key={category.title} className="space-y-4">
                        <span className="block font-mono text-[11px] uppercase tracking-widest text-neutral-400 font-semibold">
                          {category.title}
                        </span>
                        <ul className="space-y-2.5">
                          {category.items.map((item) => (
                            <li key={item.path}>
                              <Link
                                href={item.path}
                                onClick={closeDropdownImmediate}
                                className="group flex items-center justify-between text-[13.5px] font-sans text-neutral-300 hover:text-white transition-colors duration-150 py-1"
                              >
                                <span className="group-hover:translate-x-1 transition-transform duration-150 font-normal">
                                  {item.title}
                                </span>
                                <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-neutral-400 group-hover:text-white shrink-0 ml-2" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Right Column: Featured Visual Showcase (Scale-style rounded media card) */}
                  <div className="col-span-5">
                    <Link
                      href="/services/ai-agent-evaluation-benchmarking"
                      onClick={closeDropdownImmediate}
                      className="group relative block w-full h-[220px] rounded-2xl overflow-hidden border border-neutral-800/90 bg-neutral-900 transition-all duration-300 hover:border-neutral-700 shadow-xl"
                    >
                      <Image
                        src="/hero_poster.jpg"
                        alt="AI Evaluation Platform"
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-[0.45] group-hover:brightness-[0.55]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mb-1">
                          FEATURED PLATFORM
                        </span>
                        <h4 className="font-display text-base font-bold text-white tracking-tight mb-1">
                          Frontier Agent Evaluation & Red-Teaming
                        </h4>
                        <p className="text-xs text-neutral-300 line-clamp-1 mb-2 font-normal">
                          Task-grounded benchmarks scored by verified domain specialists.
                        </p>
                        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-white group-hover:text-neutral-200">
                          <span>Explore Suite</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── REDESIGNED INSIGHTS DROPDOWN (Scale AI / Modern Clean Style) ── */}
        <AnimatePresence>
          {activeDropdown === 'insights' && (
            <motion.div
              id="insights-dropdown"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => handleMouseEnter('insights')}
              onMouseLeave={handleMouseLeave}
              className="hidden lg:block absolute top-full inset-x-0 border-b border-neutral-800 bg-[#09090b] shadow-2xl shadow-black"
            >
              <div className="max-w-5xl mx-auto px-8 py-10">
                <div className="grid grid-cols-12 gap-10 items-start">
                  {/* Left Column: Clean link items */}
                  <div className="col-span-6 space-y-4">
                    <span className="block font-mono text-[11px] uppercase tracking-widest text-neutral-400 font-semibold">
                      RESEARCH & EVIDENCE
                    </span>
                    <ul className="space-y-3">
                      {insightItems.map((item) => (
                        <li key={item.path}>
                          <Link
                            href={item.path}
                            onClick={closeDropdownImmediate}
                            className="group flex items-center justify-between text-[14px] text-neutral-300 hover:text-white transition-colors duration-150 py-1"
                          >
                            <div className="group-hover:translate-x-1 transition-transform duration-150">
                              <div className="font-normal text-neutral-200 group-hover:text-white">
                                {item.title}
                              </div>
                              <div className="text-[12px] text-neutral-400 line-clamp-1 font-normal">
                                {item.description}
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-neutral-400 group-hover:text-white shrink-0 ml-4" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: Featured Story Showcase */}
                  <div className="col-span-6">
                    <Link
                      href="/insights/case-studies"
                      onClick={closeDropdownImmediate}
                      className="group relative block w-full h-[180px] rounded-2xl overflow-hidden border border-neutral-800/90 bg-neutral-900 transition-all duration-300 hover:border-neutral-700 shadow-xl"
                    >
                      <Image
                        src="/cards/card_04.jpg"
                        alt="Case Studies"
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-[0.4] group-hover:brightness-[0.5]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mb-1">
                          PROVEN OUTCOMES
                        </span>
                        <h4 className="font-display text-base font-bold text-white tracking-tight mb-1">
                          Proof Over Promise
                        </h4>
                        <p className="text-xs text-neutral-300 line-clamp-1 mb-2 font-normal">
                          Read how enterprise teams benchmark, secure, and operate frontier AI systems.
                        </p>
                        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-white group-hover:text-neutral-200">
                          <span>View Case Studies</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── MOBILE OVERLAY DRAWER ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl lg:hidden flex flex-col pt-16 sm:pt-[68px]"
          >
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {/* Mobile Services Accordion */}
              <div className="border-b border-neutral-800/80 pb-4">
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between py-2 text-left font-display font-semibold text-base text-neutral-200"
                >
                  <span>Services (8)</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileServicesOpen ? 'rotate-180 text-white' : 'text-neutral-400'
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pt-2 pl-2 space-y-4"
                    >
                      {serviceCategories.map((cat) => (
                        <div key={cat.title} className="space-y-1.5">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 block font-semibold">
                            {cat.title}
                          </span>
                          {cat.items.map((item) => (
                            <Link
                              key={item.path}
                              href={item.path}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1.5 text-xs text-neutral-300 hover:text-white transition-colors"
                            >
                              <div className="font-medium">{item.title}</div>
                            </Link>
                          ))}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Case Studies Accordion */}
              <div className="border-b border-neutral-800/80 pb-4">
                <button
                  type="button"
                  onClick={() => setMobileInsightsOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between py-2 text-left font-display font-semibold text-base text-neutral-200"
                >
                  <span>Case Studies & Insights</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileInsightsOpen ? 'rotate-180 text-white' : 'text-neutral-400'
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {mobileInsightsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pt-2 pl-2 space-y-3"
                    >
                      {insightItems.map((item) => (
                        <Link
                          key={item.path}
                          href={item.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1 text-xs text-neutral-300 hover:text-white transition-colors"
                        >
                          <div className="font-medium text-neutral-200">{item.title}</div>
                          <div className="text-[11px] text-neutral-400">{item.description}</div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Direct Links */}
              <div className="space-y-3 border-b border-neutral-800/80 pb-4">
                {directNavLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block font-display font-semibold text-base text-neutral-200 hover:text-white py-1"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile Portal Link */}
              <div className="pt-2">
                <Link
                  href="/portal/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-neutral-400 hover:text-white py-2"
                >
                  <span>Client Portal Sign In</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Mobile Footer CTA */}
            <div className="p-6 border-t border-neutral-800/80 bg-neutral-950">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-colors"
              >
                <span>Start a Conversation</span>
                <ArrowUpRight className="w-4 h-4 text-black stroke-[2.5]" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
