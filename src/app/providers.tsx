'use client';
/* eslint-disable react-hooks/set-state-in-effect */

import { darkTheme, lightTheme } from '@/styles/theme';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

function ProvidersContent({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState(lightTheme);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Read the theme that was set by the layout script
    const htmlTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const isDark = htmlTheme === 'dark';
    const newTheme = isDark ? darkTheme : lightTheme;
    
    setTheme(newTheme);

    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleStorageChange = () => {
      const savedTheme = localStorage.getItem('sky_music_theme') || 'light';
      const isDark = savedTheme === 'dark';
      const newTheme = isDark ? darkTheme : lightTheme;
      setTheme(newTheme);
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isMounted]);

  if (!isMounted) {
    // During SSR and initial hydration, render with light theme to prevent mismatch
    return (
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <div suppressHydrationWarning>{children}</div>
        </ThemeProvider>
      </Provider>
    );
  }

  // After hydration, render with the correct theme from localStorage
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </Provider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return <ProvidersContent>{children}</ProvidersContent>;
}