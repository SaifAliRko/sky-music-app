'use client';

import styled from 'styled-components';

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #000000;
`;

const Spinner = styled.div`
  width: 120px;
  height: 120px;
  border: 6px solid rgba(255, 107, 0, 0.2);
  border-top-color: #ff6b00;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export function LoadingSpinner() {
  return (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );
}
