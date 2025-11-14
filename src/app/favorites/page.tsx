'use client';
/* eslint-disable react-hooks/set-state-in-effect */

import { LoadingSpinner } from '@/components/LoadingSpinner';
import { getFavorites } from '@/lib/storage';
import { store } from '@/store';
import { initializeFavorites } from '@/store/slices/favoritesSlice';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { darkTheme, lightTheme } from '@/styles/theme';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

function ProvidersContent({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<typeof lightTheme>(lightTheme);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark that we're on the client and hydration is complete
    setIsClient(true);

    // Check localStorage for theme preference
    const savedTheme = localStorage.getItem("sky_music_theme") || "light";
    const newTheme = savedTheme === "dark" ? darkTheme : lightTheme;
    setTheme(newTheme);

    // Initialize favorites from localStorage
    const favorites = getFavorites();
    store.dispatch(initializeFavorites(favorites));

    const handleStorageChange = () => {
      const updatedTheme = localStorage.getItem("sky_music_theme") || "light";
      const newTheme = updatedTheme === "dark" ? darkTheme : lightTheme;
      setTheme(newTheme);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Only render content after client-side hydration
  if (!isClient) {
    return <LoadingSpinner />;
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </Provider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return <ProvidersContent>{children}</ProvidersContent>;
}
