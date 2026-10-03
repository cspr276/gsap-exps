'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

const FOOTER_SECTIONS = [
  {
    title: 'Services',
    links: [
      { label: 'AI Evaluation & Benchmarking', href: '/services/ai-agent-evaluation-benchmarking' },
      { label: 'Model Security Testing', href: '/services/ai-model-security-testing' },
      { label: 'Attack Detection Systems', href: '/services/ai-attack-detection-systems' },
      { label: 'Continuous Monitoring', href: '/services/continuous-monitoring-regression-testing' },
      { label: 'Agent Risk Assessment', href: '/services/agent-readiness-risk-assessment' },
      { label: 'Data Annotation', href: '/services/data-annotation' },
      { label: 'SFT & RLHF Alignment', href: '/services/sft-rlhf' },
      { label: 'Enterprise AI Agents', href: '/services/enterprise-ai-agents' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
      { label: 'Contributor Portal', href: '/portal/login' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Case Studies', href: '/insights/case-studies' },
      { label: 'Articles', href: '/insights/articles' },
      { label: 'Blog', href: '/insights/blogs' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Cookie Policy', href: '/cookie-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    key: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/evalixa-ai/',
    icon: (
      <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    key: 'twitter',
    label: 'X / Twitter',
    href: 'https://x.com/Evalixa_AI',
    icon: (
      <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    key: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/evalixa_ai/',
    icon: (
      <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    key: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/people/Evalixa-AI/',
    icon: (
      <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative w-full bg-neutral-950 pt-32 pb-16 px-4 sm:px-8 lg:px-12" aria-label="Site footer">
      <div className="relative max-w-7xl mx-auto">
        {/* Background watermark brand wordmark */}
        <div className="absolute top-0 translate-y-[-50%] translate-x-[1%] pointer-events-none select-none z-0">
          <svg
            viewBox="0 0 950 180"
            className="w-[85vw] max-w-7xl h-auto text-neutral-800/90 select-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <text
              y="120"
              fill="currentColor"
              fontFamily="var(--font-display), sans-serif"
              fontSize="118"
              fontWeight="800"
              letterSpacing="0.6em"
            >
              EVALIXA
            </text>
          </svg>
        </div>

        {/* Floating Dark Card Container */}
        <div className="relative z-10 rounded-3xl bg-surface-card-elevated border border-border-subtle p-8 sm:p-12 lg:p-16 shadow-2xl shadow-black/80">
          {/* Main Grid: Left Brand Block & Newsletter, Right Navigation Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start pb-14 border-b border-white/[0.06]">
            {/* LEFT COLUMN: Brand, Mission, Contact & Socials */}
            <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-6">
              {/* Brand lockup */}
              <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group" aria-label="Evalixa AI Homepage">
                <div className="relative w-7 h-7 shrink-0 flex items-center justify-center transition-transform group-hover:scale-105">
                  <Image
                    src="/logo-negative.png"
                    alt="Evalixa Logo"
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
                <span className="font-display font-black text-lg tracking-[0.22em] text-white uppercase group-hover:text-neutral-300 transition-colors">
                  EVALIXA AI
                </span>
              </Link>

              {/* Tagline / Mission */}
              <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-normal max-w-md">
                AI benchmarking, model security testing, expert review, and production readiness support for teams
                shipping AI systems.
              </p>

              {/* Contact Information */}
              <div className="flex flex-col gap-2 mb-6 font-mono text-xs text-neutral-300">
                <a
                  href="mailto:hello@evalixa.com"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-neutral-400" />
                  <span>hello@evalixa.com</span>
                </a>
                <a
                  href="tel:+919491663055"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-neutral-400" />
                  <span>+91 94916 63055</span>
                </a>
                <div className="inline-flex items-center gap-2 text-neutral-400">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <span className="truncate">Hyderabad, India</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-2.5 mb-8">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.key}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-8 h-8 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              {/* Newsletter subscribe */}
              <div className="w-full max-w-sm">
                <span className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                  Subscribe to Updates
                </span>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex items-center rounded-xl bg-surface-card-subtle border border-border-subtle p-1.5 pl-3.5 focus-within:border-border-dark transition-colors"
                >
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-transparent text-xs sm:text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none pr-2 font-normal"
                  />
                  <button
                    type="submit"
                    className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-black hover:bg-neutral-200 transition-colors shrink-0"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-black stroke-[2.5]" />
                  </button>
                </form>
              </div>
            </div>

            {/* RIGHT COLUMNS: Navigation Grid (Services, Company, Resources, Legal) */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6 pt-2">
              {FOOTER_SECTIONS.map((section) => (
                <div key={section.title}>
                  <span className="block font-mono text-[11px] uppercase tracking-widest text-neutral-400 font-semibold mb-4">
                    {section.title}
                  </span>
                  <ul className="space-y-2.5 text-[13px] text-neutral-400 font-normal">
                    {section.links.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="hover:text-white transition-colors duration-150 block py-0.5"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar: Copyright, HQ Address & Legal Quick Links */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-normal">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
              <span>&copy; {new Date().getFullYear()} Evalixa AI Ltd. All rights reserved.</span>
              <span className="hidden sm:inline text-neutral-700">&bull;</span>
              <span className="text-neutral-500">Uppal, Hyderabad, Telangana 500039, India</span>
            </div>

            <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-wider">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms-of-service" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/cookie-policy" className="hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
