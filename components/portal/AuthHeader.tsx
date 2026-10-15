'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';

export default function AuthHeader() {
  return (
    <header className="w-full h-16 sm:h-20 px-6 sm:px-12 flex items-center justify-between bg-transparent z-20">
      {/* Brand Logo with pure CSS dark/light swap */}
      <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-85">
        <Image
          src="/logo.png"
          alt="Evalixa AI"
          width={130}
          height={32}
          className="h-7 sm:h-8 w-auto object-contain dark:hidden"
          priority
        />
        <Image
          src="/logo-negative.png"
          alt="Evalixa AI"
          width={130}
          height={32}
          className="h-7 sm:h-8 w-auto object-contain hidden dark:block"
          priority
        />
      </Link>

      {/* Right Controls: ModeToggle Dropdown & Back to site */}
      <div className="flex items-center gap-3">
        <ModeToggle />

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors py-1.5 px-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Back to site</span>
        </Link>
      </div>
    </header>
  );
}
