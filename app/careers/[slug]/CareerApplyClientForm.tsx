'use client';

import React, { useState } from 'react';
import { Send, FileCheck } from 'lucide-react';

interface FormProps {
  roleTitle: string;
  teamName: string;
}

export default function CareerApplyClientForm({ roleTitle, teamName }: FormProps) {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    if (
      !form.fullName ||
      !form.email ||
      !form.phone ||
      !form.location ||
      !form.experienceYears ||
      !form.note
    ) {
      setErrorMsg('Please complete all required fields.');
      return;
    }
    setSubmitting(true);
    setErrorMsg('');

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-md bg-emerald-950/30 border border-emerald-500/40 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
          <FileCheck className="w-6 h-6" />
        </div>
        <h3 className="font-display font-bold text-xl text-white">Application Received</h3>
        <p className="font-sans text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
          Thank you, {form.fullName}. Your application for {roleTitle} has been submitted to the {teamName} lead. We will review your materials and contact you at {form.email} within 5 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errorMsg && (
        <div className="p-3.5 rounded-md bg-red-950/50 border border-red-500/50 text-red-300 text-xs">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
            className="w-full px-4 py-3 rounded-md bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-hidden focus:border-white transition-colors"
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
            className="w-full px-4 py-3 rounded-md bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-hidden focus:border-white transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
            Phone with Country Code *
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="+1 (555) 000-0000"
            className="w-full px-4 py-3 rounded-md bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-hidden focus:border-white transition-colors"
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
            placeholder="e.g. London, UK / Bengaluru, India / Remote"
            className="w-full px-4 py-3 rounded-md bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-hidden focus:border-white transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
            Years of Relevant Experience *
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
            className="w-full px-4 py-3 rounded-md bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-hidden focus:border-white transition-colors"
          />
        </div>

        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
            Current / Latest Title
          </label>
          <input
            type="text"
            name="currentRole"
            value={form.currentRole}
            onChange={handleChange}
            placeholder="e.g. Senior Machine Learning Engineer"
            className="w-full px-4 py-3 rounded-md bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-hidden focus:border-white transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
            LinkedIn / GitHub Profile
          </label>
          <input
            type="url"
            name="linkedin"
            value={form.linkedin}
            onChange={handleChange}
            placeholder="https://github.com/..."
            className="w-full px-4 py-3 rounded-md bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-hidden focus:border-white transition-colors"
          />
        </div>

        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
            Portfolio / Academic Publications
          </label>
          <input
            type="url"
            name="portfolio"
            value={form.portfolio}
            onChange={handleChange}
            placeholder="https://scholar.google.com/..."
            className="w-full px-4 py-3 rounded-md bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-hidden focus:border-white transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
          Why Evalixa & Your Relevant Work *
        </label>
        <textarea
          name="note"
          rows={5}
          value={form.note}
          onChange={handleChange}
          required
          placeholder="Tell us about complex evaluation harnesses, systems, or research challenges you have tackled."
          className="w-full px-4 py-3 rounded-md bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-hidden focus:border-white transition-colors leading-relaxed"
        />
      </div>

      <div>
        <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
          Resume (PDF, DOC, DOCX up to 5MB)
        </label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="w-full text-xs text-neutral-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-neutral-900 file:text-white hover:file:bg-neutral-800 cursor-pointer"
        />
      </div>

      <div className="pt-3">
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 rounded-md bg-white hover:bg-neutral-200 text-neutral-950 font-semibold text-sm tracking-wide inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-black/40 disabled:opacity-60"
        >
          <Send className="w-4 h-4" />
          <span>{submitting ? 'Submitting Application...' : `Submit Application for ${roleTitle}`}</span>
        </button>
      </div>
    </form>
  );
}
