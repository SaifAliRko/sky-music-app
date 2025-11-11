'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/albums');
  }, [router]);

  return (
      <div style={{ textAlign: 'center' }}>
        <p>Redirecting to albums...</p>
      </div>
  );
}
