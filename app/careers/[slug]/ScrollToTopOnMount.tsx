'use client';

import { useEffect } from 'react';

export default function ScrollToTopOnMount() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      }
    }
  }, []);

  return null;
}
