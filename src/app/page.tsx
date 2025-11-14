'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { RedirectWrapper } from './page.styles';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/albums');
  }, [router]);

  return (
    <RedirectWrapper>
      <p>Redirecting to albums...</p>
    </RedirectWrapper>
  );
}
