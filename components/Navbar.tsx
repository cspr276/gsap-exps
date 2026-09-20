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
} from 'lucide-react';
import {
  serviceLanes,
  servicesMenuSignals,
  lifecycleSteps,
  insightItems,
  directNavLinks,
  type ServiceItem,
} from '@/data/navigation';

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'services' | 'insights' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileInsightsOpen, setMobileInsightsOpen] = useState(false);

  const lastScrollY = useRef(0);
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

  // Hide on scroll down, show on scroll up; apply bg only when scrolled
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isAtTop = currentScrollY <= 20;
      setScrolled(!isAtTop);

      // If dropdown or mobile menu is open, remain visible
      if (activeDropdownRef.current || mobileMenuOpenRef.current) {
        setVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (isAtTop) {
        setVisible(true);
      } else {
        const diff = currentScrollY - lastScrollY.current;
        // Scrolling down past threshold -> hide navbar and close dropdown
        if (diff > 8 && currentScrollY > 80) {
          setVisible(false);
          setActiveDropdown(null);
        } else if (diff < -6) {
          // Scrolling up -> show navbar
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

  // Hover management with debounce to eliminate flickering
  const handleMouseEnter = (dropdown: 'services' | 'insights') => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
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
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 select-none ${
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
                    className={`w-3.5 h-3.5 transition-transform duration-200 text-neutral-400 ${
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
                    className={`w-3.5 h-3.5 transition-transform duration-200 text-neutral-400 ${
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
              className="text-xs font-mono tracking-wider uppercase text-neutral-400 hover:text-white transition-colors"
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

        {/* ── DESKTOP SERVICES MEGA MENU (SOLID FULL DARK BG) ── */}
        <AnimatePresence>
          {activeDropdown === 'services' && (
            <motion.div
              id="services-mega-menu"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
              className="hidden lg:block absolute top-full inset-x-0 border-b border-neutral-800 bg-[#09090b] shadow-2xl shadow-black"
            >
              <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-12 gap-8 items-stretch">
                  {/* Left Column: Context / Brief (Clean display typography, no serif) */}
                  <div className="col-span-3 flex flex-col justify-between pr-6 border-r border-neutral-800/80">
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-3">
                        METHODOLOGY & SUITE
                      </span>
                      <h3 className="font-display text-xl font-bold text-white leading-snug tracking-tight mb-3">
                        AI systems tested, evaluated, and secured.
                      </h3>
                      <p className="text-neutral-400 text-xs leading-relaxed font-sans">
                        From task-grounded rubrics to zero-day red teaming and continuous regression monitoring, Evalixa combines deep engineering with verified domain experts.
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-neutral-800/60">
                      <Link
                        href="/services/ai-agent-evaluation-benchmarking"
                        onClick={closeDropdownImmediate}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-300 hover:text-white uppercase tracking-wider transition-colors group"
                      >
                        <span>View Evaluation Suite</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors" />
                      </Link>
                    </div>
                  </div>

                  {/* Center Column: 4 Lanes / 8 Services (Clean text without icon boxes) */}
                  <div className="col-span-6 grid grid-cols-2 gap-x-6 gap-y-6">
                    {serviceLanes.map((lane) => (
                      <div key={lane.id} className="space-y-2.5">
                        <div className="flex items-center justify-between pb-1 border-b border-neutral-800/60">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                            {lane.name}
                          </span>
                          <span className="font-mono text-[9px] text-neutral-400 tracking-wider">
                            {lane.tagline}
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          {lane.services.map((service: ServiceItem) => (
                            <Link
                              key={service.path}
                              href={service.path}
                              onClick={closeDropdownImmediate}
                              className="group block p-2.5 rounded-lg hover:bg-white/[0.04] border border-transparent hover:border-neutral-800/80 transition-all duration-150"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-semibold text-neutral-200 group-hover:text-white truncate transition-colors">
                                  {service.title}
                                </span>
                                <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                                  {service.signal}
                                </span>
                              </div>
                              <p className="text-[11px] text-neutral-400 line-clamp-1 leading-snug mt-1">
                                {service.description}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right Column: Service System Blueprint & Operational Signals */}
                  <div className="col-span-3 pl-6 border-l border-neutral-800/80 flex flex-col justify-between bg-[#0e0e12] -my-8 py-8 -mr-6 pr-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-neutral-900 border border-neutral-700 text-[10px] font-mono text-neutral-300 font-bold">
                          AI
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                          SERVICE SYSTEM
                        </span>
                      </div>
                      <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-3">
                        Test, secure, improve, then monitor.
                      </h4>

                      {/* 3-Step Lifecycle Rail */}
                      <div className="grid grid-cols-3 gap-1.5 my-4">
                        {lifecycleSteps.map((step) => (
                          <div
                            key={step.title}
                            className="bg-neutral-900/80 border border-neutral-800 rounded p-1.5 text-center"
                          >
                            <span className="block font-mono text-[9px] text-neutral-400">
                              {step.step}
                            </span>
                            <span className="font-mono text-[10px] font-semibold text-neutral-200 uppercase tracking-wider">
                              {step.title}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Operational Signals */}
                      <div className="space-y-2 mt-4 pt-4 border-t border-neutral-800/70">
                        {servicesMenuSignals.map((signal) => (
                          <div key={signal.label} className="text-xs">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block mb-0.5">
                              {signal.label}
                            </span>
                            <p className="text-[11px] text-neutral-400 leading-snug">
                              {signal.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-neutral-800/60 mt-4">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                        Calibrated domain network
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── DESKTOP INSIGHTS / CASE STUDIES DROPDOWN (SOLID FULL DARK BG) ── */}
        <AnimatePresence>
          {activeDropdown === 'insights' && (
            <motion.div
              id="insights-dropdown"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => handleMouseEnter('insights')}
              onMouseLeave={handleMouseLeave}
              className="hidden lg:block absolute top-full inset-x-0 border-b border-neutral-800 bg-[#09090b] shadow-2xl shadow-black"
            >
              <div className="max-w-4xl mx-auto px-6 py-8">
                <div className="grid grid-cols-12 gap-8 items-stretch">
                  {/* Left Column: Insights Brief (Clean typography, no serif) */}
                  <div className="col-span-5 pr-6 border-r border-neutral-800/80 flex flex-col justify-between">
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-3">
                        EVIDENCE & INSIGHTS
                      </span>
                      <h3 className="font-display text-xl font-bold text-white leading-snug tracking-tight mb-3">
                        Proof over promise.
                      </h3>
                      <p className="text-neutral-400 text-xs leading-relaxed font-sans">
                        Real delivery stories, applied thinking, and rigorous engineering post-mortems shaped by production client engagements.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-neutral-800/60 mt-6">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                        Verified outcomes • Zero black boxes
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Case Studies, Articles, Blogs List (Clean typography without icons) */}
                  <div className="col-span-7 space-y-2.5">
                    {insightItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={closeDropdownImmediate}
                        className="group block p-3 rounded-lg hover:bg-white/[0.04] border border-transparent hover:border-neutral-800/80 transition-all duration-150"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-neutral-200 group-hover:text-white transition-colors">
                            {item.title}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded">
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400 leading-snug mt-1">
                          {item.description}
                        </p>
                      </Link>
                    ))}
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
                      {serviceLanes.map((lane) => (
                        <div key={lane.id} className="space-y-1.5">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 block font-semibold">
                            {lane.name}
                          </span>
                          {lane.services.map((service) => (
                            <Link
                              key={service.path}
                              href={service.path}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1.5 text-xs text-neutral-300 hover:text-white transition-colors"
                            >
                              <div className="font-medium">{service.title}</div>
                              <div className="text-[11px] text-neutral-400 line-clamp-1">{service.description}</div>
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
