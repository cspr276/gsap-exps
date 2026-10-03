'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, FileCheck, UploadCloud, X, FileText } from 'lucide-react';

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
  const [isDragging, setIsDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Resume file must be under 5 MB.');
      return;
    }
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    const isDoc = /\.(pdf|doc|docx)$/i.test(file.name);
    if (!validTypes.includes(file.type) && !isDoc) {
      setErrorMsg('Please upload a PDF, DOC, or DOCX document.');
      return;
    }
    setErrorMsg('');
    setResumeFile(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="p-8 sm:p-12 rounded-md bg-emerald-950/30 border border-emerald-500/40 text-center space-y-4"
      >
        <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
          <FileCheck className="w-7 h-7" />
        </div>
        <h3 className="font-display font-bold text-2xl text-white">Application Received</h3>
        <p className="font-sans text-sm sm:text-base text-neutral-300 max-w-lg mx-auto leading-relaxed">
          Thank you, {form.fullName}. Your application for {roleTitle} has been submitted to the {teamName} lead. We will review your materials and contact you at {form.email} within 5 business days.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMsg && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 rounded-md bg-red-950/60 border border-red-500/60 text-red-300 text-xs sm:text-sm"
        >
          {errorMsg}
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
            placeholder="Ada Lovelace"
            className="w-full px-4 py-3 rounded-md bg-neutral-900/90 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-hidden focus:border-white transition-colors"
          />
        </div>

        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="ada@example.com"
            className="w-full px-4 py-3 rounded-md bg-neutral-900/90 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-hidden focus:border-white transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
            Phone with Country Code *
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="+1 (555) 000-0000"
            className="w-full px-4 py-3 rounded-md bg-neutral-900/90 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-hidden focus:border-white transition-colors"
          />
        </div>

        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
            Current Location *
          </label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            placeholder="e.g. London, UK / Bengaluru, India / Remote"
            className="w-full px-4 py-3 rounded-md bg-neutral-900/90 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-hidden focus:border-white transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
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
            className="w-full px-4 py-3 rounded-md bg-neutral-900/90 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-hidden focus:border-white transition-colors"
          />
        </div>

        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
            Current / Latest Title
          </label>
          <input
            type="text"
            name="currentRole"
            value={form.currentRole}
            onChange={handleChange}
            placeholder="e.g. Senior Machine Learning Engineer"
            className="w-full px-4 py-3 rounded-md bg-neutral-900/90 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-hidden focus:border-white transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
            LinkedIn / GitHub Profile
          </label>
          <input
            type="url"
            name="linkedin"
            value={form.linkedin}
            onChange={handleChange}
            placeholder="https://github.com/..."
            className="w-full px-4 py-3 rounded-md bg-neutral-900/90 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-hidden focus:border-white transition-colors"
          />
        </div>

        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
            Portfolio / Academic Publications
          </label>
          <input
            type="url"
            name="portfolio"
            value={form.portfolio}
            onChange={handleChange}
            placeholder="https://scholar.google.com/..."
            className="w-full px-4 py-3 rounded-md bg-neutral-900/90 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-hidden focus:border-white transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
          Why Evalixa & Your Relevant Work *
        </label>
        <textarea
          name="note"
          rows={5}
          value={form.note}
          onChange={handleChange}
          required
          placeholder="Tell us about complex evaluation harnesses, systems, or research challenges you have tackled."
          className="w-full px-4 py-3 rounded-md bg-neutral-900/90 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-hidden focus:border-white transition-colors leading-relaxed"
        />
      </div>

      {/* Dotted Border Box File Picker */}
      <div>
        <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-2 font-medium">
          Resume / CV (PDF, DOC, DOCX up to 5MB)
        </label>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`group relative rounded-md border-2 border-dashed transition-all duration-200 p-7 sm:p-9 text-center cursor-pointer flex flex-col items-center justify-center gap-3 select-none ${
            isDragging
              ? 'border-white bg-neutral-800/80 shadow-lg'
              : resumeFile
              ? 'border-emerald-500/70 bg-emerald-950/20'
              : 'border-neutral-700/80 hover:border-neutral-400 bg-neutral-900/40 hover:bg-neutral-900/70'
          }`}
        >
          {resumeFile ? (
            <div className="flex items-center gap-3.5 text-left w-full max-w-md mx-auto p-3 rounded bg-neutral-900 border border-emerald-500/40">
              <div className="w-10 h-10 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans text-sm text-white font-medium truncate">
                  {resumeFile.name}
                </p>
                <p className="font-mono text-xs text-neutral-400">
                  {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                title="Remove file"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:border-neutral-600 transition-colors">
                <UploadCloud className="w-6 h-6" />
              </div>

              <div>
                <p className="font-sans text-sm text-neutral-200 font-medium mb-1">
                  <span className="text-white underline underline-offset-2">Click to choose a file</span>{' '}
                  <span className="text-neutral-400 font-normal">or drag and drop here</span>
                </p>
                <p className="font-mono text-xs text-neutral-500">
                  PDF, DOC, DOCX files up to 5 MB
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="pt-3">
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 rounded-md bg-white hover:bg-neutral-200 text-neutral-950 font-semibold text-sm tracking-wide inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl shadow-black/50 disabled:opacity-60"
        >
          <Send className="w-4 h-4 text-neutral-950" />
          <span>{submitting ? 'Submitting Application...' : `Submit Application for ${roleTitle}`}</span>
        </button>
      </div>
    </form>
  );
}
