import styled from 'styled-components';

export const SearchWrapper = styled.div`
  padding: ${(props) => props.theme.spacing.lg};
  background-color: ${(props) => props.theme.colors.background};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

export const InputWrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: ${(props) =>
    `${props.theme.spacing.md} ${props.theme.spacing.lg}`};
  font-size: ${(props) => props.theme.typography.fontSize.base};
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  background-color: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.text};
  transition: all 0.3s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px
      ${(props) => `${props.theme.colors.primary}20`};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.textTertiary};
  }
`;

export const ClearButton = styled.button`
  position: absolute;
  right: ${(props) => props.theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.textSecondary};
  cursor: pointer;
  font-size: ${(props) => props.theme.typography.fontSize.lg};
  transition: all 0.3s ease-in-out;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;
