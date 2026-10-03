import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CareersCTASection from '@/components/careers/CareersCTASection';
import { CAREER_ROLES, CAREER_ROLE_BY_SLUG, CAREERS_EMAIL } from '@/data/careerRoles';
import CareerApplyClientForm from './CareerApplyClientForm';
import {
  MapPin,
  Clock,
  Briefcase,
  Calendar,
  CheckCircle2,
  ArrowLeft,
  Mail,
  ArrowUpRight,
  ArrowDown,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CAREER_ROLES.map((role) => ({
    slug: role.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const role = CAREER_ROLE_BY_SLUG[slug];

  if (!role) {
    return {
      title: 'Role Not Found — Careers | Evalixa',
    };
  }

  return {
    title: `${role.title} — Careers | Evalixa`,
    description: role.summary,
    openGraph: {
      title: `${role.title} at Evalixa`,
      description: role.summary,
      type: 'website',
    },
  };
}

export default async function CareerRolePage({ params }: PageProps) {
  const { slug } = await params;
  const role = CAREER_ROLE_BY_SLUG[slug];

  if (!role) {
    notFound();
  }

  const mailtoUrl = `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(
    `Application: ${role.title}`
  )}`;

  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#09090b] text-white selection:bg-neutral-800 selection:text-white">
        <Navbar />

        {/* Header / Breadcrumb & Role Title Section */}
        <section className="relative z-10 w-full pt-32 pb-14 sm:pt-40 sm:pb-20 bg-[#09090b] border-b border-neutral-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 font-mono text-xs text-neutral-400 mb-8 select-none">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/careers" className="hover:text-white transition-colors">
                Careers
              </Link>
              <span>/</span>
              <span className="text-white truncate">{role.title}</span>
            </nav>

            <div className="max-w-4xl">
              {/* Team tag & openings badge */}
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                  {role.team}
                </span>
                <span className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                  {role.openings} {role.openings === 1 ? 'opening' : 'openings'}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12] mb-6">
                {role.title}
              </h1>

              {/* Summary */}
              <p className="font-sans text-base sm:text-lg text-neutral-300 leading-relaxed font-normal mb-8 max-w-3xl">
                {role.summary}
              </p>

              {/* Action Buttons & Metadata strip */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <a
                  href="#apply-form"
                  className="px-6 py-3.5 rounded-md bg-white text-neutral-950 font-semibold text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2 hover:bg-neutral-200 transition-colors shadow-lg cursor-pointer"
                >
                  <span>Apply for this Role</span>
                  <ArrowDown className="w-3.5 h-3.5 text-neutral-950" />
                </a>

                <a
                  href={mailtoUrl}
                  className="px-6 py-3.5 rounded-md bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-white font-mono text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Email Resume</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-neutral-300 font-sans pt-6 border-t border-neutral-900">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>{role.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>{role.experience}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>Review Deadline: {role.deadline}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Role Overview & Specifications with Sticky Sidebar */}
        <section className="relative z-10 w-full py-16 sm:py-24 bg-[#09090b]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: Responsibilities, Qualifications, Tools */}
              <div className="lg:col-span-8 space-y-12">
                {/* Key Responsibilities */}
                <div>
                  <h2 className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-5">
                    KEY RESPONSIBILITIES
                  </h2>
                  <ul className="space-y-3.5">
                    {role.responsibilities.map((resp, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3.5 text-sm sm:text-base text-neutral-300 leading-relaxed font-sans"
                      >
                        <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-1" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Qualifications */}
                <div>
                  <h2 className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-4">
                    QUALIFICATIONS & PREREQUISITES
                  </h2>
                  <div className="p-6 sm:p-7 rounded-md bg-neutral-950 border border-neutral-800">
                    <p className="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                      {role.qualification}
                    </p>
                  </div>
                </div>

                {/* Skills & Technologies */}
                <div>
                  <h2 className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-4">
                    RELEVANT SKILLS & TOOLS
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {role.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-xs px-3.5 py-1.5 rounded-md bg-neutral-950 text-neutral-200 border border-neutral-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right / Sticky Sidebar */}
              <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
                <div className="p-7 rounded-md bg-neutral-950 border border-neutral-800">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-4">
                    ROLE SNAPSHOT
                  </h3>

                  <div className="space-y-4 py-4 border-y border-neutral-900 text-xs sm:text-sm font-sans">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-500 font-mono text-xs uppercase">Track</span>
                      <span className="text-white font-medium">{role.team}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-500 font-mono text-xs uppercase">Openings</span>
                      <span className="text-white font-medium">{role.openings} Active</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-500 font-mono text-xs uppercase">Location</span>
                      <span className="text-white font-medium">Remote-first</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-500 font-mono text-xs uppercase">Review Date</span>
                      <span className="text-white font-medium">{role.deadline}</span>
                    </div>
                  </div>

                  <div className="pt-5 space-y-3">
                    <a
                      href="#apply-form"
                      className="w-full py-3 rounded-md bg-white hover:bg-neutral-200 text-neutral-950 font-semibold text-xs tracking-wide inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                    >
                      <span>Jump to Application Form</span>
                      <ArrowDown className="w-3.5 h-3.5 text-neutral-950" />
                    </a>

                    <Link
                      href="/careers#open-positions"
                      className="w-full py-2.5 text-center text-xs font-mono text-neutral-400 hover:text-white inline-flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to All Open Roles</span>
                    </Link>
                  </div>
                </div>

                <div className="p-6 rounded-md bg-neutral-950 border border-neutral-900 text-xs text-neutral-400 space-y-2">
                  <span className="text-white font-medium block">Questions about the role?</span>
                  <p>
                    Contact the hiring track directly at{' '}
                    <a href={`mailto:${CAREERS_EMAIL}`} className="text-white underline underline-offset-2">
                      {CAREERS_EMAIL}
                    </a>
                    .
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Section 2: Application Form — Centered in the middle of the page */}
        <section id="apply-form" className="relative z-10 w-full py-20 sm:py-28 bg-[#09090b] border-t border-neutral-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Centered Form Header */}
            <div className="text-center mb-10">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-2">
                SUBMIT APPLICATION
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight mb-3">
                Apply for {role.title}
              </h2>
              <p className="font-sans text-sm sm:text-base text-neutral-400 leading-relaxed max-w-xl mx-auto mb-4 font-normal">
                Reviewed directly by senior practitioners on the {role.team} team. No automated rejection filters.
              </p>
              <a
                href={mailtoUrl}
                className="inline-flex items-center gap-1.5 font-mono text-xs text-neutral-400 hover:text-white underline underline-offset-4"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Prefer email? Send your resume to {CAREERS_EMAIL}</span>
              </a>
            </div>

            {/* Centered Form Card */}
            <div className="p-8 sm:p-11 rounded-md bg-neutral-950 border border-neutral-800 shadow-2xl">
              <CareerApplyClientForm roleTitle={role.title} teamName={role.team} />
            </div>
          </div>
        </section>

        {/* Conversion CTA */}
        <CareersCTASection />

        <Footer />
      </main>
    </SmoothScroll>
  );
}
