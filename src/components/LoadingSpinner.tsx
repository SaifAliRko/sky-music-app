'use client';

import { Spinner, SpinnerContainer } from './LoadingSpinner.styles';

export function LoadingSpinner() {
  return (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );
}
