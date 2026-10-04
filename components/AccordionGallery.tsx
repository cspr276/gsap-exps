'use client';

import React, { useRef, useEffect, useState, useCallback, CSSProperties, KeyboardEvent, MouseEvent } from 'react';
import { gsap } from 'gsap';

export interface AccordionGalleryItem {
  image: string;
  label?: string;
  link?: string;
  alt?: string;
  num?: string;
  tag?: string;
  headline?: string;
  desc?: string;
  icon?: React.ComponentType<{ className?: string }>;
  tags?: string[];
}

export interface AccordionGalleryProps {
  items?: AccordionGalleryItem[];
  defaultIndex?: number;
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  height?: number;
  gap?: number;
  radius?: number;
  expandRatio?: number;
  orientation?: 'horizontal' | 'vertical';
  duration?: number;
  ease?: string;
  parallax?: number;
  tilt?: number;
  stagger?: number;
  trigger?: 'hover' | 'click';
  showLabels?: boolean;
  grayscale?: boolean;
  className?: string;
}

const DEFAULT_ITEMS: AccordionGalleryItem[] = [
  { image: 'https://picsum.photos/id/1015/900/1200', label: 'Canyon', link: '#' },
  { image: 'https://picsum.photos/id/1018/900/1200', label: 'Ridgeline', link: '#' },
  { image: 'https://picsum.photos/id/1039/900/1200', label: 'Falls', link: '#' },
  { image: 'https://picsum.photos/id/1043/900/1200', label: 'Harbour', link: '#' },
  { image: 'https://picsum.photos/id/1044/900/1200', label: 'Skyline', link: '#' }
];

const AccordionGallery = ({
  items = DEFAULT_ITEMS,
  defaultIndex = 0,
  accentColor = '#ffffff',
  overlayColor = '#060010',
  textColor = '#ffffff',
  height = 480,
  gap = 12,
  radius = 14,
  expandRatio = 0.54,
  orientation = 'horizontal',
  duration = 0.6,
  ease = 'power3.out',
  parallax = 0.5,
  tilt = 6,
  stagger = 0.06,
  trigger = 'hover',
  showLabels = true,
  grayscale = true,
  className = ''
}: AccordionGalleryProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const mediaRefs = useRef<(HTMLElement | null)[]>([]);
  const barRefs = useRef<(HTMLElement | null)[]>([]);
  const textRefs = useRef<(HTMLElement | null)[]>([]);
  const activeContentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const collapsedContentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const firstRunRef = useRef(true);
  const mediaSizeRef = useRef(340);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(typeof window !== 'undefined' && window.innerWidth <= 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const effectiveVertical = orientation === 'vertical' || isMobile;
  const count = items.length;
  const [active, setActive] = useState(Math.min(Math.max(defaultIndex, 0), count - 1));

  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const overlayBg = `linear-gradient(180deg, rgba(6,0,16,0.3) 0%, rgba(6,0,16,0.7) 50%, rgba(6,0,16,0.96) 100%), color-mix(in srgb, ${overlayColor} calc(var(--ag-dim, 0.35) * 100%), transparent)`;

  const applyLayout = useCallback(
    (animate: boolean) => {
      const panels = panelRefs.current;
      if (!panels.length) return;

      const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;
      const mediaSize = mediaSizeRef.current;

      tlRef.current?.kill();
      const dur = animate && !prefersReduced ? duration : 0;
      const tl = gsap.timeline();

      panels.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === active;
        const media = mediaRefs.current[i];
        const bar = barRefs.current[i];
        const text = textRefs.current[i];
        const activeContent = activeContentRefs.current[i];
        const collapsedContent = collapsedContentRefs.current[i];

        const rot = isActive ? 0 : i < active ? tilt : -tilt;
        const rotProp = effectiveVertical ? { rotateX: -rot } : { rotateY: rot };

        tl.to(panel, { flexGrow: isActive ? grow : 1, ...rotProp, duration: dur, ease }, 0);

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - i));
          const shift = drift * parallax * mediaSize * 0.06;
          const gray = grayscale ? (isActive ? 0 : 1) : 0;
          tl.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: effectiveVertical ? 0 : isActive ? 0 : shift,
              y: effectiveVertical ? (isActive ? 0 : shift) : 0,
              '--ag-gray': gray,
              '--ag-dim': isActive ? 0 : 0.35,
              duration: dur,
              ease
            },
            0
          );
        }

        // Standard labels fallback (when no rich culture content is present)
        if (showLabels && bar && text) {
          if (isActive) {
            tl.to([bar, text], { opacity: 1, x: 0, duration: dur, ease, stagger: prefersReduced ? 0 : stagger }, 0);
          } else {
            tl.to([bar, text], { opacity: 0, x: -14, duration: dur * 0.6, ease }, 0);
          }
        }

        // Rich Culture Content: Active View
        if (activeContent) {
          if (isActive) {
            tl.to(
              activeContent,
              {
                opacity: 1,
                y: 0,
                duration: dur,
                ease: 'power3.out'
              },
              0
            );
          } else {
            tl.to(
              activeContent,
              {
                opacity: 0,
                y: 12,
                duration: dur * 0.45,
                ease: 'power2.in'
              },
              0
            );
          }
        }

        // Rich Culture Content: Collapsed Preview View
        if (collapsedContent) {
          if (isActive) {
            tl.to(
              collapsedContent,
              {
                opacity: 0,
                duration: dur * 0.35,
                ease: 'power2.in'
              },
              0
            );
          } else {
            tl.to(
              collapsedContent,
              {
                opacity: 1,
                duration: dur * 0.7,
                delay: dur * 0.15,
                ease: 'power3.out'
              },
              0
            );
          }
        }
      });

      tlRef.current = tl;
    },
    [
      active,
      count,
      expandRatio,
      duration,
      ease,
      effectiveVertical,
      tilt,
      parallax,
      grayscale,
      showLabels,
      stagger,
      prefersReduced
    ]
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const total = effectiveVertical ? rect.height : rect.width;
      const usable = Math.max(total - gap * (count - 1), 120);
      const size = Math.max(140, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.25);
      mediaSizeRef.current = size;
      el.style.setProperty('--ag-media-size', `${size}px`);
      applyLayout(!firstRunRef.current);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [applyLayout, gap, count, expandRatio, effectiveVertical]);

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  useEffect(
    () => () => {
      tlRef.current?.kill();
    },
    []
  );

  const handleEnter = (i: number) => {
    if (trigger === 'hover') setActive(i);
  };

  const handleClick = (i: number, e: MouseEvent) => {
    if (i !== active) {
      e.preventDefault();
      setActive(i);
    }
  };

  const handleKeyDown = (i: number, e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i + 1) % count);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i - 1 + count) % count);
    }
  };

  return (
    <div
      ref={rootRef}
      className={`flex ${effectiveVertical ? 'flex-col' : 'flex-row'} w-full max-w-full [perspective:1400px] ${
        effectiveVertical ? '[perspective:none]' : ''
      } ${className}`}
      style={{
        gap: `${gap}px`,
        height: effectiveVertical ? `${Math.max(Math.round(height * 1.35), 560)}px` : `${height}px`
      }}
      role="list"
      aria-label="Accordion gallery"
    >
      {items.map((item, i) => {
        const isActive = i === active;
        const Tag = (item.link ? 'a' : 'div') as 'a';
        const hasRichContent = Boolean(item.headline || item.desc || item.num || item.icon);
        const Icon = item.icon;

        return (
          <Tag
            key={i}
            ref={(el: HTMLElement | null) => {
              panelRefs.current[i] = el;
            }}
            className={`group relative block min-w-0 min-h-0 flex-[1_1_0] cursor-pointer overflow-hidden bg-[#09090b] border border-neutral-800/80 hover:border-neutral-600/90 no-underline outline-none [transform-style:preserve-3d] [transform-origin:center] shadow-xl focus-visible:[box-shadow:0_0_0_2px_var(--ag-accent),0_10px_30px_-18px_rgba(0,0,0,0.8)] transition-[border-color] duration-300 ${
              effectiveVertical ? 'min-h-[74px] !transform-none' : ''
            }`}
            style={
              {
                borderRadius: `${radius}px`,
                '--ag-accent': accentColor,
                willChange: 'flex-grow, transform'
              } as CSSProperties
            }
            href={item.link || undefined}
            onClick={e => handleClick(i, e)}
            onMouseEnter={() => handleEnter(i)}
            onFocus={() => setActive(i)}
            onKeyDown={e => handleKeyDown(i, e)}
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? 'true' : undefined}
            aria-label={item.headline || item.label}
          >
            {/* Background Media with Parallax and Grayscale */}
            <span className="absolute inset-0 overflow-hidden [border-radius:inherit] pointer-events-none select-none">
              <span
                ref={(el: HTMLElement | null) => {
                  mediaRefs.current[i] = el;
                }}
                className="absolute top-1/2 left-1/2 [filter:grayscale(var(--ag-gray,1))]"
                style={{
                  width: effectiveVertical ? '100%' : 'max(100%, var(--ag-media-size, 340px))',
                  height: effectiveVertical ? 'max(100%, var(--ag-media-size, 340px))' : '100%',
                  willChange: 'transform, filter'
                }}
              >
                <img
                  src={item.image}
                  alt={item.alt || item.headline || item.label || ''}
                  draggable={false}
                  className="block h-full w-full select-none object-cover [-webkit-user-drag:none]"
                />
              </span>

              {/* Multi-Stop Contrast Gradient Overlay */}
              <span
                className="pointer-events-none absolute inset-0"
                style={{ background: overlayBg }}
                aria-hidden="true"
              />
            </span>

            {/* Rich Culture Content Rendering */}
            {hasRichContent ? (
              <>
                {/* Active Expanded Content */}
                <div
                  ref={(el: HTMLDivElement | null) => {
                    activeContentRefs.current[i] = el;
                  }}
                  className={`relative z-10 p-6 sm:p-8 flex flex-col justify-between h-full w-full ${
                    isActive ? 'pointer-events-auto' : 'pointer-events-none'
                  }`}
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0px)' : 'translateY(12px)'
                  }}
                >
                  {/* Top Header: Number, Tag, and Clean Icon (NO box around icon) */}
                  <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/15">
                    <div className="flex items-center gap-2.5">
                      {item.num && (
                        <span className="font-mono text-xs font-bold text-white bg-white/15 px-2.5 py-0.5 rounded border border-white/20 shadow-xs">
                          {item.num}
                        </span>
                      )}
                      {item.tag && (
                        <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-300 font-semibold">
                          {item.tag}
                        </span>
                      )}
                    </div>

                    {/* Clean unboxed Lucide icon */}
                    {Icon && (
                      <Icon className="w-5 h-5 text-neutral-300 group-hover:text-white transition-colors duration-300 shrink-0" />
                    )}
                  </div>

                  {/* Middle: Headline and Description */}
                  <div className="my-auto py-3 sm:py-4">
                    <h3 className="font-display font-bold text-white tracking-tight mb-2.5 sm:mb-3 text-xl sm:text-2xl lg:text-3xl leading-snug drop-shadow-sm">
                      {item.headline || item.label}
                    </h3>
                    {item.desc && (
                      <p className="font-sans text-neutral-200 font-normal leading-relaxed text-xs sm:text-sm lg:text-base max-w-xl drop-shadow-xs">
                        {item.desc}
                      </p>
                    )}
                  </div>

                  {/* Bottom: Technical Tag Chips */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="pt-3.5 sm:pt-4 border-t border-white/10 flex flex-wrap gap-2 mt-auto">
                      {item.tags.map(tag => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] sm:text-[11px] px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-neutral-200 backdrop-blur-xs shadow-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Collapsed Preview Content (Visible when inactive) */}
                <div
                  ref={(el: HTMLDivElement | null) => {
                    collapsedContentRefs.current[i] = el;
                  }}
                  className={`absolute inset-0 z-10 p-5 sm:p-6 flex flex-col justify-between h-full w-full ${
                    isActive ? 'pointer-events-none' : 'pointer-events-auto'
                  }`}
                  style={{
                    opacity: isActive ? 0 : 1
                  }}
                >
                  {/* Top: Number badge and clean unboxed icon */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    {item.num ? (
                      <span className="font-mono text-xs font-bold text-neutral-300 bg-white/10 px-2 py-0.5 rounded border border-white/15">
                        {item.num}
                      </span>
                    ) : (
                      <span />
                    )}
                    {Icon && (
                      <Icon className="w-5 h-5 text-neutral-400 group-hover:text-neutral-200 transition-colors duration-300 shrink-0" />
                    )}
                  </div>

                  {/* Bottom: Indicator bar, tag, and title */}
                  <div className="mt-auto flex items-center gap-2.5">
                    <span
                      className="h-5 w-[3px] flex-none rounded-full"
                      style={{
                        background: accentColor,
                        boxShadow: `0 0 10px ${accentColor}`
                      }}
                    />
                    <div className="overflow-hidden min-w-0">
                      {item.tag && (
                        <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-400 font-medium truncate mb-0.5">
                          {item.tag}
                        </span>
                      )}
                      <span className="block font-display font-semibold text-white text-sm sm:text-base tracking-tight truncate">
                        {item.headline || item.label}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Fallback default simple labels */
              showLabels && (
                <span
                  className="pointer-events-none absolute bottom-5 left-5 right-5 z-[2] flex items-center gap-3"
                  aria-hidden="true"
                >
                  <span
                    ref={(el: HTMLElement | null) => {
                      barRefs.current[i] = el;
                    }}
                    className="h-[26px] w-[3px] flex-none rounded-[3px] opacity-0"
                    style={{
                      background: accentColor,
                      boxShadow: `0 0 12px color-mix(in srgb, ${accentColor} 60%, transparent)`
                    }}
                  />
                  <span
                    ref={(el: HTMLElement | null) => {
                      textRefs.current[i] = el;
                    }}
                    className="overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(1rem,1.4vw,1.4rem)] font-semibold tracking-[0.01em] opacity-0 [text-shadow:0_2px_14px_rgba(0,0,0,0.55)]"
                    style={{ color: textColor }}
                  >
                    {item.label}
                  </span>
                </span>
              )
            )}
          </Tag>
        );
      })}
    </div>
  );
};

export default AccordionGallery;
