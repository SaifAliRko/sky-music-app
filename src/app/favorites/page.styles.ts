import styled from 'styled-components';

export const FavoritesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
`;

export const MainContent = styled.main`
  flex: 1;
  padding: ${(props) => props.theme.spacing.xl};
`;

export const FavoritesHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.spacing.xl};
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.md};
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
`;

export const Title = styled.h1`
  font-size: ${(props) => props.theme.typography.fontSize.xxxl};
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  background: linear-gradient(90deg, #ff6b00 0%, #ff1493 25%, #ff00ff 50%, #6200ff 75%, #0066ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};

  @media (max-width: 768px) {
    font-size: ${(props) => props.theme.typography.fontSize.xxl};
  }
`;

export const Count = styled.span`
  font-size: ${(props) => props.theme.typography.fontSize.lg};
  color: ${(props) => props.theme.colors.textSecondary};
  font-weight: ${(props) => props.theme.typography.fontWeight.normal};
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: ${(props) => props.theme.spacing.lg};
  text-align: center;
`;

export const EmptyIcon = styled.div`
  font-size: 80px;
  opacity: 0.5;
`;

export const EmptyText = styled.p`
  font-size: ${(props) => props.theme.typography.fontSize.lg};
  color: ${(props) => props.theme.colors.textSecondary};
  margin: 0;
  max-width: 400px;
`;

import Link from 'next/link';

export const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.lg};
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  transition: all 0.3s ease-in-out;
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;
