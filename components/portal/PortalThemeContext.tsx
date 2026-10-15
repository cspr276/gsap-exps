'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export function PortalThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function usePortalTheme() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Synchronous DOM check avoids any white flash on client-side route transitions
  const isDark = mounted
    ? resolvedTheme === 'dark'
    : typeof document !== 'undefined'
    ? document.documentElement.classList.contains('dark')
    : false;

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return {
    theme: (resolvedTheme as 'light' | 'dark') || (isDark ? 'dark' : 'light'),
    activeTheme: theme || 'system',
    setTheme,
    toggleTheme,
    isDark,
    mounted: mounted || typeof document !== 'undefined',
  };
}
