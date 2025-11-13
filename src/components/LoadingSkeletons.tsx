'use client';

import styled from 'styled-components';

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${(props) => props.theme.spacing.lg};
  padding: ${(props) => props.theme.spacing.lg};

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: ${(props) => props.theme.spacing.md};
    padding: ${(props) => props.theme.spacing.md};
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${(props) => props.theme.spacing.sm};
    padding: ${(props) => props.theme.spacing.sm};
  }
`;

const SkeletonCard = styled.div`
  aspect-ratio: 1;
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.colors.surface} 25%,
    ${(props) => props.theme.colors.surfaceDark} 50%,
    ${(props) => props.theme.colors.surface} 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: ${(props) => props.theme.borderRadius.lg};

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

export function LoadingSkeletons() {
  return (
    <GridWrapper>
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </GridWrapper>
  );
}
