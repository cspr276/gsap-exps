'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogBlock } from '@/data/blogPosts';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

interface BlogBodyRendererProps {
  blocks: BlogBlock[];
}

export default function BlogBodyRenderer({ blocks }: BlogBodyRendererProps) {
  return (
    <div className="space-y-6 text-neutral-300 leading-relaxed">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2
                key={index}
                id={block.id}
                className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight mt-12 mb-4 scroll-mt-28 pt-4 first:mt-0 first:pt-0"
              >
                {block.text}
              </h2>
            );

          case 'h3':
            return (
              <h3
                key={index}
                id={block.id}
                className="font-display font-semibold text-xl sm:text-2xl text-neutral-100 tracking-tight mt-8 mb-3 scroll-mt-28"
              >
                {block.text}
              </h3>
            );

          case 'p':
            return (
              <p
                key={index}
                className="font-sans text-base sm:text-[17px] text-neutral-300 leading-[1.8] my-4"
              >
                {block.text}
              </p>
            );

          case 'ul':
            return (
              <ul
                key={index}
                className="space-y-2.5 my-6 pl-5 list-disc marker:text-neutral-500 text-sm sm:text-base text-neutral-300 leading-[1.75]"
              >
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );

          case 'ol':
            return (
              <ol
                key={index}
                className="space-y-2.5 my-6 pl-5 list-decimal marker:text-neutral-500 text-sm sm:text-base text-neutral-300 leading-[1.75]"
              >
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            );

          case 'highlight':
            return (
              <blockquote
                key={index}
                className="my-8 pl-5 py-2 border-l-2 border-neutral-400 text-neutral-100 font-medium text-base sm:text-lg leading-relaxed italic bg-neutral-900/30 rounded-r-md"
              >
                {block.text}
              </blockquote>
            );

          case 'callout':
            return (
              <div
                key={index}
                className="my-8 p-6 rounded-lg border border-neutral-800 bg-neutral-900/50 text-neutral-300 text-sm sm:text-base leading-relaxed"
              >
                {block.text}
              </div>
            );

          case 'image':
            return block.src ? (
              <figure key={index} className="my-10 space-y-3">
                <div className="relative w-full aspect-16/9 rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                {block.caption && (
                  <figcaption className="text-xs text-neutral-500 font-mono text-center">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            ) : (
              <figure
                key={index}
                className="my-10 p-8 rounded-lg border border-neutral-800 bg-neutral-900/40 text-center space-y-2"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block">
                  FIGURE // ARCHITECTURAL SCHEMATIC
                </span>
                <span className="font-display font-semibold text-white block">
                  {block.alt}
                </span>
                {block.caption && (
                  <figcaption className="text-xs text-neutral-400 font-mono pt-2 border-t border-neutral-800/80 max-w-xl mx-auto">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case 'video':
            return (
              <figure
                key={index}
                className="my-10 p-8 rounded-lg border border-neutral-800 bg-neutral-900/40 text-center space-y-2"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block">
                  DEMO // RUNTIME AGENT TRACE
                </span>
                <span className="font-display font-semibold text-white block">
                  {block.title}
                </span>
                {block.caption && (
                  <figcaption className="text-xs text-neutral-400 font-mono pt-2 border-t border-neutral-800/80 max-w-xl mx-auto">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case 'links': {
            const linkList = block.links || block.items || [];
            return (
              <div
                key={index}
                className="my-8 p-6 rounded-lg border border-neutral-800 bg-neutral-900/40 space-y-3"
              >
                {block.heading && (
                  <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold block">
                    {block.heading}
                  </span>
                )}
                <ul className="space-y-2 text-sm">
                  {linkList.map((item, i) => (
                    <li key={i}>
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors underline underline-offset-4"
                        >
                          <span>{item.text}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors underline underline-offset-4"
                        >
                          <span>{item.text}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          }

          case 'faq':
            return (
              <section
                key={index}
                id={block.id || 'blog-faq'}
                aria-labelledby={block.id ? `${block.id}-heading` : undefined}
                className="mt-14 pt-10 border-t border-neutral-800 space-y-6 scroll-mt-28"
              >
                {block.heading && (
                  <h2
                    id={block.id ? `${block.id}-heading` : undefined}
                    className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight"
                  >
                    {block.heading}
                  </h2>
                )}
                <dl className="space-y-6">
                  {block.items.map((item, i) => (
                    <div
                      key={i}
                      className="py-4 border-b border-neutral-800/80 space-y-2 last:border-b-0"
                    >
                      <dt className="font-display font-semibold text-base sm:text-lg text-white">
                        {item.q}
                      </dt>
                      <dd className="font-sans text-sm sm:text-base text-neutral-400 leading-relaxed">
                        {item.a}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
