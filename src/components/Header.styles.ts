import Link from 'next/link';
import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 24px;
  background-color: ${(props) => props.theme.colors.surface};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: 0 1px 2px 0 ${(props) => props.theme.colors.shadow};
  transition: all 0.3s ease-in-out;
  position: sticky;
  top: 0;
  z-index: 50;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  width: 120px;
  height: 50px;

  &:hover {
    transform: scale(1.05);
  }

  img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  align-items: center;
`;

export const NavLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
  color: ${(props) => props.theme.colors.text};
  text-decoration: none;
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
  transition: all 0.3s ease-in-out;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  white-space: nowrap;

  &:hover {
    background-color: ${(props) => props.theme.colors.border};
    color: ${(props) => props.theme.colors.primary};
    text-decoration: none;
  }

  @media (max-width: 640px) {
    padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.sm};
    font-size: ${(props) => props.theme.typography.fontSize.sm};
  }
`;

export const FavoritesText = styled.span`
  color: ${(props) => props.theme.colors.text};
  transition: all 0.3s ease-in-out;

  ${NavLink}:hover & {
    background: linear-gradient(90deg, #ff6b00 0%, #ff1493 25%, #ff00ff 50%, #6200ff 75%, #0066ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

export const FavoriteBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border-radius: ${(props) => props.theme.borderRadius.full};
  font-size: ${(props) => props.theme.typography.fontSize.xs};
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
`;

export const ThemeToggleButton = styled.button<{ $isDark?: boolean }>`
  background: ${(props) => props.theme.colors.border};
  border: none;
  width: 65px;
  height: 32px;
  border-radius: ${(props) => props.theme.borderRadius.full};
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  padding: 2px;
  position: relative;

  &::before {
    content: "☀️";
    position: absolute;
    left: 6px;
    font-size: 18px;
    opacity: ${(props) => (props.$isDark ? 0.3 : 1)};
    transition: opacity 0.3s ease-in-out;
  }

  &::after {
    content: "🌙";
    position: absolute;
    right: 6px;
    font-size: 18px;
    opacity: ${(props) => (props.$isDark ? 1 : 0.3)};
    transition: opacity 0.3s ease-in-out;
  }

  span {
    width: 28px;
    height: 28px;
    background-color: ${(props) => props.theme.colors.surface};
    border-radius: ${(props) => props.theme.borderRadius.full};
    position: absolute;
    left: ${(props) => (props.$isDark ? "calc(100% - 30px)" : "2px")};
    transition: left 0.3s ease-in-out;
    box-shadow: 0 2px 4px ${(props) => props.theme.colors.shadow};
  }

  &:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;
