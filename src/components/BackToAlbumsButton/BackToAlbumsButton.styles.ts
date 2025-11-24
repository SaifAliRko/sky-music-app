import Link from 'next/link';
import styled from 'styled-components';

export const HeaderButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.lg};
  background-color: transparent;
  color: ${(props) => props.theme.colors.text};
  text-decoration: none;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  transition: all 0.3s ease-in-out;
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};

  &:hover {
    transform: translateY(-4px);
    text-decoration: none;
  }

  &:hover,
  &:hover img {
    background: linear-gradient(90deg, #ff6b00 0%, #ff1493 25%, #ff00ff 50%, #6200ff 75%, #0066ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &:active {
    transform: scale(0.95);
  }

  img {
    width: 40px;
    height: 40px;
    transition: all 0.3s ease-in-out;
  }
`;
