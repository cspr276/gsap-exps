'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ScrollTypographyProps {
  text: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  wordClassName?: string;
  tilt?: boolean;
}

export default function ScrollTypography({
  text,
  tag: Tag = 'h2',
  className = '',
  wordClassName = '',
  tilt = true
}: ScrollTypographyProps) {
  const containerRef = useRef<HTMLHeadingElement | HTMLParagraphElement | null>(null);

  const words = text.split(' ');

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      // fx16 implementation from OnScrollTypographyAnimations-main (Set 2, Example 1):
      // Title rotation settling to 0
      if (tilt) {
        gsap.fromTo(
          el,
          {
            transformOrigin: '0% 50%',
            rotate: 2
          },
          {
            ease: 'none',
            rotate: 0,
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'top 30%',
              scrub: true
            }
          }
        );
      }

      // Words scrub from dim opacity (0.18) to bright active opacity (1.0)
      const wordElements = el.querySelectorAll('.word-span');
      if (wordElements.length > 0) {
        gsap.fromTo(
          wordElements,
          {
            opacity: 0.18,
            y: 4
          },
          {
            ease: 'none',
            opacity: 1,
            y: 0,
            stagger: 0.04,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'bottom 45%',
              scrub: true
            }
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <Tag ref={containerRef as React.Ref<HTMLHeadingElement>} className={`leading-tight ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className={`word-span inline-block mr-[0.28em] will-change-[opacity,transform] ${wordClassName}`}
        >
          {word}
        </span>
      ))}
    </Tag>
  );
}
