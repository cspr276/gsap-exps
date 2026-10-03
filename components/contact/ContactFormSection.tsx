'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CONTACT_CHANNELS } from './contactData';

interface ContactFormSectionProps {
  selectedChannelKey: string;
  onSelectChannel: (channelKey: string) => void;
}

export default function ContactFormSection({
  selectedChannelKey,
  onSelectChannel,
}: ContactFormSectionProps) {
  const selectedChannelInfo =
    CONTACT_CHANNELS.find((c) => c.key === selectedChannelKey) || CONTACT_CHANNELS[0];

  const [form, setForm] = useState({
    name: '',
    email: '',
    channel: selectedChannelKey,
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setForm((prev) => ({ ...prev, channel: selectedChannelKey }));
  }, [selectedChannelKey]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'channel') {
      onSelectChannel(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMsg('Please complete all required fields.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    setTimeout(() => {
      setStatus('success');
    }, 500);
  };

  const handleReset = () => {
    setForm({
      name: '',
      email: '',
      channel: selectedChannelKey,
      subject: '',
      message: '',
    });
    setStatus('idle');
  };

  return (
    <section
      id="direct-message"
      className="relative z-20 w-full py-24 sm:py-32 bg-[#09090b] text-white border-b border-neutral-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Overview & Active Route Anchor */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-3">
              DIRECT MESSAGE
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-5">
              Write to us directly.
            </h2>
            <p className="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed font-normal mb-8">
              Prefer a form? Submit your inquiry here. It is routed straight to the practice lead responsible for your selected topic — no administrative barriers.
            </p>

            {/* Clean Editorial Channel Routing Strip */}
            <div className="pl-5 border-l-2 border-neutral-700 space-y-3 py-1">
              <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block">
                Selected Channel Route
              </span>
              <div className="space-y-1">
                <span className="font-display font-bold text-2xl text-white block">
                  {selectedChannelInfo.label}
                </span>
                <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                  {selectedChannelInfo.tagline}
                </p>
              </div>
              <div className="pt-2">
                <a
                  href={`mailto:${selectedChannelInfo.email}`}
                  className="font-mono text-xs text-neutral-300 hover:text-white inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>{selectedChannelInfo.email}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural, Premium Form Interface */}
          <div className="lg:col-span-7">
            {status === 'success' ? (
              <div className="rounded-md border border-neutral-800 bg-[#0c0d10] p-8 sm:p-12 space-y-6 shadow-xl">
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold block">
                  Transmission Recorded
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                  Message Dispatched.
                </h3>
                <p className="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                  Thank you, <strong className="text-white">{form.name}</strong>. Your inquiry has been routed to our{' '}
                  <strong className="text-white">{selectedChannelInfo.label}</strong> team. We review submissions promptly and will follow up within one business day.
                </p>
                <div className="pt-4 border-t border-neutral-800">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-3 rounded-md bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-md border border-neutral-800 bg-[#0c0d10] p-8 sm:p-10 space-y-6 shadow-xl">
                {status === 'error' && (
                  <div className="p-4 rounded-md border border-red-800 bg-red-950/40 text-red-300 font-sans text-xs">
                    {errorMsg}
                  </div>
                )}

                {/* Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block font-mono text-xs uppercase tracking-wider text-neutral-400 font-medium">
                      Full name <span className="text-neutral-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Dr. Julian Vance"
                      className="w-full px-4 py-3 rounded-md bg-black/60 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono text-xs uppercase tracking-wider text-neutral-400 font-medium">
                      Email address <span className="text-neutral-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="julian@enterprise.com"
                      className="w-full px-4 py-3 rounded-md bg-black/60 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                {/* Topic and Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block font-mono text-xs uppercase tracking-wider text-neutral-400 font-medium">
                      Topic
                    </label>
                    <select
                      name="channel"
                      value={form.channel}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md bg-black/60 border border-neutral-800 text-white text-sm focus:outline-none focus:border-white transition-colors cursor-pointer"
                    >
                      {CONTACT_CHANNELS.map((c) => (
                        <option key={c.key} value={c.key} className="bg-neutral-900 text-white">
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono text-xs uppercase tracking-wider text-neutral-400 font-medium">
                      Subject <span className="text-neutral-500 text-[11px] normal-case">(optional)</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Brief topic or target architecture"
                      className="w-full px-4 py-3 rounded-md bg-black/60 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="block font-mono text-xs uppercase tracking-wider text-neutral-400 font-medium">
                    Message <span className="text-neutral-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us what you are building, testing, or securing…"
                    className="w-full px-4 py-3 rounded-md bg-black/60 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white transition-colors resize-y leading-relaxed"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-md bg-white text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-neutral-200 disabled:opacity-50 transition-colors cursor-pointer"
                  >
                    {status === 'loading' ? 'Sending…' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
