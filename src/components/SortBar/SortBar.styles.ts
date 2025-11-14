import styled from 'styled-components';

export const SortWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: ${(props) => props.theme.spacing.lg};
  background-color: ${(props) => props.theme.colors.surface};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  gap: ${(props) => props.theme.spacing.lg};
  flex-wrap: wrap;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

export const SelectGroup = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  align-items: center;

  @media (max-width: 640px) {
    width: 100%;

    select {
      flex: 1;
    }
  }
`;

export const Label = styled.label`
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: ${(props) => props.theme.typography.fontSize.sm};
`;

export const Select = styled.select`
  padding: ${(props) =>
    `${props.theme.spacing.sm} ${props.theme.spacing.md}`};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }
`;
