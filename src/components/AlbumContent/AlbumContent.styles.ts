/**
 * Styled components for the Album Content component
 */

import styled from 'styled-components';

export const AlbumHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(props) => props.theme.spacing.xxl};
  margin-bottom: ${(props) => props.theme.spacing.xxl};
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const AlbumImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  object-fit: cover;

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

export const AlbumInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.lg};
`;

export const Title = styled.h1`
  margin: 0;
  font-size: ${(props) => props.theme.typography.fontSize.xxxl};
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  background: linear-gradient(90deg, #ff6b00 0%, #ff1493 25%, #ff00ff 50%, #6200ff 75%, #0066ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const Artist = styled.h2`
  margin: 0;
  font-size: ${(props) => props.theme.typography.fontSize.xxl};
  color: ${(props) => props.theme.colors.primary};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
`;

export const Meta = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.lg};
  flex-wrap: wrap;
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: ${(props) => props.theme.typography.fontSize.base};
`;

export const MetaItem = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.sm};
`;

export const TracksSection = styled.section`
  margin-top: ${(props) => props.theme.spacing.xxl};
`;

export const TracksTitle = styled.h3`
  font-size: ${(props) => props.theme.typography.fontSize.xxl};
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  color: ${(props) => props.theme.colors.text};
`;

export const TracksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
`;

export const TrackItem = styled.li`
  padding: ${(props) => props.theme.spacing.lg};
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.surfaceDark};
  }
`;

export const TrackHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

export const TrackNumber = styled.span`
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  color: ${(props) => props.theme.colors.primary};
  min-width: 30px;
`;

export const TrackName = styled.span`
  flex: 1;
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  color: ${(props) => props.theme.colors.text};
`;

export const TrackDuration = styled.span`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: ${(props) => props.theme.typography.fontSize.sm};
`;

export const ErrorWrapper = styled.div`
  padding: ${(props) => props.theme.spacing.xxl};
  background-color: ${(props) => `${props.theme.colors.error}10`};
  border-left: 4px solid ${(props) => props.theme.colors.error};
  border-radius: ${(props) => props.theme.borderRadius.md};
  color: ${(props) => props.theme.colors.error};
  text-align: center;
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
`;
