"use client";
/* eslint-disable react-hooks/set-state-in-effect */
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { getFavorites, getTheme } from "@/lib/storage";
import type { RootState } from "@/store";
import { store } from "@/store";
import { initializeFavorites } from "@/store/slices/favoritesSlice";
import { setTheme } from "@/store/slices/uiSlice";
import { GlobalStyle } from "@/styles/GlobalStyle";
import { darkTheme, lightTheme } from "@/styles/theme";
import { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";

interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * Provides Redux store with initialized state (theme, favorites)
 * and applies theme styling to the entire app
 */
function ThemeWrapper({ children }: ProvidersProps) {
  const themeMode = useSelector((state: RootState) => state.ui.theme);
  const theme = themeMode === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}

export function Providers({ children }: ProvidersProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Initialize app state from localStorage
    store.dispatch(setTheme(getTheme()));
    store.dispatch(initializeFavorites(getFavorites()));

    // Mark hydration complete
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <LoadingSpinner />;
  }

  return (
    <Provider store={store}>
      <ThemeWrapper>{children}</ThemeWrapper>
    </Provider>
  );
}
