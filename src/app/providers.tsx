'use client';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

function ProvidersContent({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);


  if (!isMounted) {
    // During SSR and initial hydration, render with light theme to prevent mismatch
    return (
      <Provider store={store}>
        {children}
      </Provider>
    );
  }

  // After hydration, render with the correct theme from localStorage
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return <ProvidersContent>{children}</ProvidersContent>;
}