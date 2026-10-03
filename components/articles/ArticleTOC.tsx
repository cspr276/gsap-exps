'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ArticleTOCItem } from '@/data/articleContent';

interface ArticleTOCProps {
  items: ArticleTOCItem[];
  className?: string;
}

export default function ArticleTOC({ items, className }: ArticleTOCProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || '');

  useEffect(() => {
    if (!items.length) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const readingLine = scrollY + 220;
      let currentId = items[0]?.id;

      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.getBoundingClientRect().top + scrollY;
          if (top <= readingLine) {
            currentId = item.id;
          }
        }
      }

      if (currentId) {
        setActiveId(currentId);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [items]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -90, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Article Table of contents"
      className={cn('w-56 shrink-0 space-y-4 select-none', className)}
    >
      <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 font-semibold block">
        On This Page
      </span>

      <div className="border-l border-neutral-800/80 pl-3.5 space-y-2.5">
        {items.map((item) => {
          const isActive = activeId === item.id;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
              className={cn(
                'block transition-colors leading-snug cursor-pointer text-xs',
                isActive
                  ? 'text-white font-medium'
                  : 'text-neutral-400 hover:text-neutral-200'
              )}
            >
              {item.text}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
