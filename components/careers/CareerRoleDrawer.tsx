'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Briefcase,
  MapPin,
  Calendar,
  Clock,
  GraduationCap,
  CheckCircle2,
  Send,
  Mail,
  ArrowUpRight,
  FileCheck,
} from 'lucide-react';
import { CareerRole, CAREERS_EMAIL } from '@/data/careerRoles';

interface CareerRoleDrawerProps {
  role: CareerRole | null;
  onClose: () => void;
}

export default function CareerRoleDrawer({ role, onClose }: CareerRoleDrawerProps) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    experienceYears: '',
    currentRole: '',
    linkedin: '',
    portfolio: '',
    note: '',
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (role) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [role, onClose]);

  // Reset form when role changes
  useEffect(() => {
    if (role) {
      setSubmitted(false);
      setErrorMsg('');
      setForm({
        fullName: '',
        email: '',
        phone: '',
        location: '',
        experienceYears: '',
        currentRole: '',
        linkedin: '',
        portfolio: '',
        note: '',
      });
      setResumeFile(null);
    }
  }, [role]);

  if (!role) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg('Resume file must be under 5 MB.');
        return;
      }
      setErrorMsg('');
      setResumeFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.phone || !form.location || !form.experienceYears || !form.note) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    setErrorMsg('');

    // Simulate fast submission & confirmation
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  const mailtoUrl = `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(
    `Application: ${role.title}`
  )}&body=${encodeURIComponent(
    `Hi Evalixa Hiring Team,\n\nI am writing to apply for the ${role.title} position.\n\nName: \nLocation: \nYears of Experience: \nLinkedIn / Portfolio: \n\n[Please attach your resume PDF here]\n\nThank you!`
  )}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
        />

        {/* Slide-over panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="relative z-10 w-full max-w-2xl h-full bg-[#0d0d10] text-white border-l border-neutral-800 shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-5 bg-[#0d0d10]/95 backdrop-blur-md border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-wider px-2.5 py-1 rounded bg-neutral-800 text-neutral-300 font-medium">
                {role.team}
              </span>
              <span className="font-mono text-xs text-neutral-400">
                {role.openings} {role.openings === 1 ? 'opening' : 'openings'}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Close role details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-8 space-y-10">
            {/* Title & Metadata */}
            <div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight mb-4">
                {role.title}
              </h2>

              <p className="font-sans text-base text-neutral-300 leading-relaxed mb-6 font-normal">
                {role.summary}
              </p>

              {/* Fast Facts Grid */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-md bg-neutral-900/80 border border-neutral-800/80 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-neutral-300">
                  <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>{role.location}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>{role.experience}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <Briefcase className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>{role.team} Track</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <Calendar className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>Review Deadline: {role.deadline}</span>
                </div>
              </div>
            </div>

            {/* Key Responsibilities */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-4">
                KEY RESPONSIBILITIES
              </h3>
              <ul className="space-y-3">
                {role.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-neutral-300 leading-relaxed font-sans">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Qualifications */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-3">
                QUALIFICATIONS & BACKGROUND
              </h3>
              <div className="p-4 rounded-md bg-neutral-900/60 border border-neutral-800/60">
                <p className="font-sans text-sm text-neutral-300 leading-relaxed">
                  {role.qualification}
                </p>
              </div>
            </div>

            {/* Relevant Skills & Tools */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-3">
                RELEVANT SKILLS & TOOLS
              </h3>
              <div className="flex flex-wrap gap-2">
                {role.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs px-3 py-1.5 rounded-md bg-neutral-900 text-neutral-200 border border-neutral-800 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Application Section */}
            <div id="application-form" className="pt-6 border-t border-neutral-800">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display font-bold text-xl text-white tracking-tight">
                    Apply for this Role
                  </h3>
                  <p className="font-sans text-xs text-neutral-400 mt-1">
                    Directly reviewed by senior engineers. No automated discard filters.
                  </p>
                </div>

                <a
                  href={mailtoUrl}
                  className="font-mono text-xs text-neutral-400 hover:text-white inline-flex items-center gap-1 underline underline-offset-4"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Or email directly</span>
                </a>
              </div>

              {submitted ? (
                <div className="p-6 rounded-md bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">Application Received</h4>
                  <p className="font-sans text-sm text-neutral-300 max-w-md mx-auto">
                    Thank you, {form.fullName}. Your packet has been routed to the {role.team} hiring track. We will reply to {form.email} within 5 business days.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-2 px-5 py-2 rounded-md bg-white text-neutral-950 font-semibold text-xs tracking-wide cursor-pointer hover:bg-neutral-200 transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 rounded-md bg-red-950/50 border border-red-500/50 text-red-300 text-xs">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Ada Lovelace"
                        className="w-full px-3.5 py-2.5 rounded-md bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-hidden focus:border-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="ada@example.com"
                        className="w-full px-3.5 py-2.5 rounded-md bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-hidden focus:border-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                        Phone (with country code) *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3.5 py-2.5 rounded-md bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-hidden focus:border-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                        Current Location *
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Berlin, Germany / Bengaluru, India"
                        className="w-full px-3.5 py-2.5 rounded-md bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-hidden focus:border-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                        Years of Experience *
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="50"
                        name="experienceYears"
                        value={form.experienceYears}
                        onChange={handleChange}
                        required
                        placeholder="e.g. 4"
                        className="w-full px-3.5 py-2.5 rounded-md bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-hidden focus:border-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                        Current / Latest Role
                      </label>
                      <input
                        type="text"
                        name="currentRole"
                        value={form.currentRole}
                        onChange={handleChange}
                        placeholder="e.g. Senior Systems Engineer"
                        className="w-full px-3.5 py-2.5 rounded-md bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-hidden focus:border-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                        LinkedIn / GitHub Profile
                      </label>
                      <input
                        type="url"
                        name="linkedin"
                        value={form.linkedin}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/..."
                        className="w-full px-3.5 py-2.5 rounded-md bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-hidden focus:border-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                        Portfolio / Website
                      </label>
                      <input
                        type="url"
                        name="portfolio"
                        value={form.portfolio}
                        onChange={handleChange}
                        placeholder="https://yoursite.com"
                        className="w-full px-3.5 py-2.5 rounded-md bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-hidden focus:border-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                      Why Evalixa & Your Relevant Work *
                    </label>
                    <textarea
                      name="note"
                      rows={4}
                      value={form.note}
                      onChange={handleChange}
                      required
                      placeholder="Briefly describe what you've built, evaluated, or researched that is relevant to this role."
                      className="w-full px-3.5 py-2.5 rounded-md bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-hidden focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                      Upload Resume (PDF, DOC, DOCX up to 5MB)
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="w-full text-xs text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-neutral-800 file:text-white hover:file:bg-neutral-700 cursor-pointer"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 rounded-md bg-white hover:bg-neutral-200 text-neutral-950 font-semibold text-sm tracking-wide inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-black/40 disabled:opacity-60"
                    >
                      <Send className="w-4 h-4" />
                      <span>{submitting ? 'Submitting Application...' : `Submit Application for ${role.title}`}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
