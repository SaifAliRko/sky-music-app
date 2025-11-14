/**
 * Reusable styled components for common UI patterns
 */

import Link from 'next/link';
import styled from 'styled-components';

/**
 * Container with centered content
 */
export const CenteredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

/**
 * Flexible container with gap
 */
export const FlexContainer = styled.div<{ $gap?: string; $direction?: 'row' | 'column' }>`
  display: flex;
  flex-direction: ${(props) => props.$direction || 'row'};
  gap: ${(props) => props.$gap || props.theme.spacing.md};
`;

/**
 * Content wrapper with max width
 */
export const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  padding: ${(props) => props.theme.spacing.xxl};
`;

/**
 * Primary button styling
 */
export const PrimaryButton = styled.button`
  padding: ${(props) => `${props.theme.spacing.md} ${props.theme.spacing.lg}`};
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  font-size: ${(props) => props.theme.typography.fontSize.base};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryDark};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

/**
 * Secondary button styling
 */
export const SecondaryButton = styled.button`
  padding: ${(props) => `${props.theme.spacing.md} ${props.theme.spacing.lg}`};
  background-color: transparent;
  color: ${(props) => props.theme.colors.primary};
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  font-size: ${(props) => props.theme.typography.fontSize.base};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
    color: white;
  }
`;

/**
 * Primary link styling
 */
export const PrimaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  padding: ${(props) => `${props.theme.spacing.md} ${props.theme.spacing.lg}`};
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryDark};
    transform: translateY(-2px);
    text-decoration: none;
  }
`;

/**
 * Card container styling
 */
export const Card = styled.div`
  padding: ${(props) => props.theme.spacing.lg};
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`;

/**
 * Error message styling
 */
export const ErrorMessage = styled.div`
  padding: ${(props) => props.theme.spacing.lg};
  background-color: ${(props) => `${props.theme.colors.error}10`};
  color: ${(props) => props.theme.colors.error};
  border: 1px solid ${(props) => props.theme.colors.error};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  text-align: center;
`;

/**
 * Success message styling
 */
export const SuccessMessage = styled.div`
  padding: ${(props) => props.theme.spacing.lg};
  background-color: ${(props) => `${props.theme.colors.success}10`};
  color: ${(props) => props.theme.colors.success};
  border: 1px solid ${(props) => props.theme.colors.success};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  text-align: center;
`;

/**
 * Badge styling
 */
export const Badge = styled.span<{ $color?: 'primary' | 'secondary' | 'success' | 'error' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => `${props.theme.spacing.xs} ${props.theme.spacing.sm}`};
  background-color: ${(props) => {
    switch (props.$color) {
      case 'secondary':
        return props.theme.colors.secondary;
      case 'success':
        return props.theme.colors.success;
      case 'error':
        return props.theme.colors.error;
      case 'primary':
      default:
        return props.theme.colors.primary;
    }
  }};
  color: white;
  border-radius: ${(props) => props.theme.borderRadius.full};
  font-size: ${(props) => props.theme.typography.fontSize.xs};
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
`;

/**
 * Loading skeleton styling
 */
export const SkeletonLoader = styled.div`
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
