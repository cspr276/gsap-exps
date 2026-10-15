'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Globe, ArrowLeft, Check } from 'lucide-react';

const LANGUAGES = [
  { code: 'en-US', label: 'English (US)' },
  { code: 'en-GB', label: 'English (UK)' },
  { code: 'de-DE', label: 'Deutsch' },
  { code: 'fr-FR', label: 'Français' },
  { code: 'ja-JP', label: '日本語' },
];

export default function AuthHeader() {
  const [selectedLang, setSelectedLang] = useState('English (US)');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="w-full h-16 sm:h-20 px-6 sm:px-12 flex items-center justify-between border-b border-neutral-100 bg-white/80 backdrop-blur-sm z-20">
      {/* Brand Logo */}
      <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-85">
        <Image
          src="/logo.png"
          alt="Evalixa AI"
          width={130}
          height={32}
          className="h-7 sm:h-8 w-auto object-contain"
          priority
        />
      </Link>

      {/* Right Controls: Back to site & Language selector */}
      <div className="flex items-center gap-3 sm:gap-4">
        <Link
          href="/"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-neutral-500 hover:text-neutral-900 transition-colors py-1.5 px-3 rounded-md hover:bg-neutral-50"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to site</span>
        </Link>

        {/* Language Dropdown Selector (Matching Screenshot 1) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-700 bg-white border border-neutral-200 hover:border-neutral-300 rounded-lg px-3 py-1.5 shadow-xs transition-all active:scale-[0.98]"
            aria-expanded={dropdownOpen}
            aria-haspopup="listbox"
          >
            <Globe className="w-3.5 h-3.5 text-neutral-400" />
            <span>{selectedLang}</span>
            <ChevronDown className="w-3 h-3 text-neutral-400" />
          </button>

          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-1.5 w-44 bg-white border border-neutral-200 rounded-xl shadow-lg py-1 z-40 animate-in fade-in-50 zoom-in-95 duration-100">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setSelectedLang(lang.label);
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs text-neutral-700 hover:bg-neutral-50 flex items-center justify-between transition-colors"
                  >
                    <span>{lang.label}</span>
                    {selectedLang === lang.label && (
                      <Check className="w-3.5 h-3.5 text-neutral-900 stroke-[2.5]" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
