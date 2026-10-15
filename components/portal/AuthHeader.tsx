'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

export default function AuthHeader() {
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

      {/* Right Controls: Back to site */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-neutral-500 hover:text-neutral-900 transition-colors py-1.5 px-3 rounded-md hover:bg-neutral-50"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to site</span>
      </Link>
    </header>
  );
}
