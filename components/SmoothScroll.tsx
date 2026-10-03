'use client';

import { useEffect, useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    window.__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after fonts/DOM settle so pin bounds and total document height are accurate
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timer);
      gsap.ticker.remove(tickerCallback);
      delete window.__lenis;
      lenis.destroy();
    };
  }, []);

  // Synchronously reset scroll before paint on route change
  useIsomorphicLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      if (!window.location.hash) {
        window.scrollTo(0, 0);
        if (window.__lenis) {
          window.__lenis.scrollTo(0, { immediate: true });
        }
      }
      ScrollTrigger.clearScrollMemory?.();
      ScrollTrigger.update();
    }
  }, [pathname]);

  // Secondary refresh after layout settles
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!window.location.hash) {
        window.scrollTo(0, 0);
        if (window.__lenis) {
          window.__lenis.scrollTo(0, { immediate: true });
        }
      }
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return <>{children}</>;
}
