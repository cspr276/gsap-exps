'use client';

import React from 'react';
import { FileText, HeartPulse, GraduationCap, CheckCircle2 } from 'lucide-react';

const CULTURE_PILLARS = [
  {
    icon: FileText,
    tag: 'WORKFLOW & CONTEXT',
    title: 'Life at Evalixa',
    description:
      'A remote-first engineering culture built around written context, clear ownership, focused demos, careful onboarding, and high-quality deliverables without minute-by-minute tracking or performative meetings.',
    points: [
      'Asynchronous-first communication and documented architecture records',
      'High ownership per engineer with minimal coordination overhead',
      'Daily 3-4 hour core collaboration overlap across timezones',
      'Zero unnecessary recurring status meetings',
    ],
  },
  {
    icon: HeartPulse,
    tag: 'SUSTAINABLE PRACTICE',
    title: 'Practical Benefits',
    description:
      'We structure compensation and benefits to support sustainable, uninterrupted deep work. We believe the highest caliber engineering happens when people have peace of mind and full autonomy.',
    points: [
      'Competitive market base compensation and equity upside',
      'Flexible working schedules tailored around peak productive hours',
      'Home-office hardware and ergonomic workstation setup stipend',
      'Comprehensive health coverage and generous wellness leave',
    ],
  },
  {
    icon: GraduationCap,
    tag: 'CRAFT DEPTH',
    title: 'Professional Growth',
    description:
      'We invest heavily in deepening your craft. Every engineer and researcher has access to learning resources, domain specialists, and opportunities to publish novel findings in AI evaluation.',
    points: [
      'Annual stipend for technical books, papers, courses, and certifications',
      'Conference attendance sponsorship for frontier AI & security events',
      'Direct peer calibration with credentialed PhD domain fellows',
      'Career progression anchored purely in technical leverage and impact',
    ],
  },
];

export default function CareersCultureSection() {
  return (
    <section className="relative z-20 w-full py-24 sm:py-32 bg-[#fbfbfb] text-neutral-900 border-b border-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold block mb-3">
            LIFE, BENEFITS & GROWTH
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-neutral-950 tracking-tight leading-tight mb-4">
            Built for Focused Craft and Sustainable Velocity.
          </h2>
          <p className="font-sans text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            We operate with a startup mindset: fast feedback loops, honest communication, and high standards. We do not burn people out with chaotic roadmaps or arbitrary deadlines.
          </p>
        </div>

        {/* 3 Editorial Pillar Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CULTURE_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group relative flex flex-col justify-between p-8 sm:p-9 rounded-md bg-white border border-neutral-200/90 hover:border-neutral-400/80 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 font-semibold">
                      {pillar.tag}
                    </span>
                    <div className="w-10 h-10 rounded-md bg-neutral-100 flex items-center justify-center text-neutral-900 group-hover:bg-neutral-950 group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-2xl text-neutral-950 mb-3 tracking-tight">
                    {pillar.title}
                  </h3>

                  <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed mb-6 font-normal">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-neutral-100">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 font-semibold block mb-3">
                    WHAT YOU CAN EXPECT:
                  </span>
                  <ul className="space-y-2.5">
                    {pillar.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 font-sans leading-normal"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
