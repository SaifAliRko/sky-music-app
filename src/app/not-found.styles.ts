'use client';

import Link from 'next/link';
import styled from 'styled-components';

export const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${(props) => props.theme.spacing.xl};
  text-align: center;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

export const ErrorCode = styled.h1`
  font-size: 8rem;
  font-weight: bold;
  margin: 0;
  background: linear-gradient(135deg, ${(props) => props.theme.colors.primary}, ${(props) => props.theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const ErrorTitle = styled.h2`
  font-size: 2rem;
  margin: ${(props) => props.theme.spacing.md} 0;
  color: ${(props) => props.theme.colors.text};
`;

export const ErrorMessage = styled.p`
  font-size: 1.1rem;
  margin: ${(props) => props.theme.spacing.md} 0 ${(props) => props.theme.spacing.xl};
  color: ${(props) => props.theme.colors.textSecondary};
  max-width: 500px;
`;

export const HomeLink = styled(Link)`
  padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.xl};
  background: linear-gradient(135deg, ${(props) => props.theme.colors.primary}, ${(props) => props.theme.colors.secondary});
  color: white;
  text-decoration: none;
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-weight: 600;
  font-size: 1.1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;
