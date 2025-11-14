'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styled from 'styled-components';

const RedirectWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

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
