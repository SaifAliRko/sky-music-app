'use client';

import { GridWrapper, SkeletonCard } from './LoadingSkeletons.styles';

export function LoadingSkeletons() {
  return (
    <GridWrapper>
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </GridWrapper>
  );
}
