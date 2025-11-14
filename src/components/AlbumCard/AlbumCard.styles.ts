import Link from 'next/link';
import styled from 'styled-components';

export const CardWrapper = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
  padding: ${(props) => props.theme.spacing.lg};
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease-in-out;
  min-width: 0;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px ${(props) => props.theme.colors.shadow};
    text-decoration: none;
  }

  &:hover * {
    text-decoration: none !important;
  }

  @media (max-width: 640px) {
    gap: ${(props) => props.theme.spacing.sm};
    padding: ${(props) => props.theme.spacing.md};
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: ${(props) => props.theme.borderRadius.md};
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.surfaceDark};

  @media (max-width: 640px) {
    max-height: 250px;
    max-width: 250px;
  }

  @media (max-width: 480px) {
    max-height: 200px;
    max-width: 200px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const FavoriteButton = styled.button`
  position: absolute;
  top: ${(props) => props.theme.spacing.md};
  right: ${(props) => props.theme.spacing.md};
  width: 40px;
  height: 40px;
  border-radius: ${(props) => props.theme.borderRadius.full};
  border: none;
  background-color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  font-size: 1.5rem;
  transition: all 0.3s ease-in-out;
  z-index: 10;

  &:hover {
    background-color: white;
    transform: scale(1.1);
  }

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    font-size: 1.2rem;
    top: 4px;
    right: 4px;
  }
`;

export const Title = styled.h3`
  margin: 0;
  font-size: ${(props) => props.theme.typography.fontSize.lg};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  color: ${(props) => props.theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-decoration: none !important;
  transition: all 0.3s ease-in-out;

  ${CardWrapper}:hover & {
    text-decoration: underline !important;
    background: linear-gradient(90deg, #ff6b00 0%, #ff1493 25%, #ff00ff 50%, #6200ff 75%, #0066ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 640px) {
    font-size: ${(props) => props.theme.typography.fontSize.base};
  }

  @media (max-width: 480px) {
    font-size: ${(props) => props.theme.typography.fontSize.sm};
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
  }
`;

export const Artist = styled.p`
  margin: 0;
  font-size: ${(props) => props.theme.typography.fontSize.sm};
  color: ${(props) => props.theme.colors.textSecondary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 640px) {
    font-size: ${(props) => props.theme.typography.fontSize.xs};
  }
`;

export const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

export const Genre = styled.span`
  font-size: ${(props) => props.theme.typography.fontSize.xs};
  padding: ${(props) => `${props.theme.spacing.xs} ${props.theme.spacing.sm}`};
  background-color: ${(props) => props.theme.colors.primaryLight}20;
  color: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.borderRadius.full};
  white-space: nowrap;
`;

export const Price = styled.span`
  font-size: ${(props) => props.theme.typography.fontSize.sm};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  color: ${(props) => props.theme.colors.primary};

  @media (max-width: 640px) {
    font-size: ${(props) => props.theme.typography.fontSize.xs};
  }
`;
