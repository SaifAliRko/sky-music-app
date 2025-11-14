import styled from 'styled-components';

export const Button = styled.button`
  padding: ${(props) =>
    `${props.theme.spacing.sm} ${props.theme.spacing.lg}`};
  background-color: ${(props) => props.theme.colors.secondary};
  color: white;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  font-size: ${(props) => props.theme.typography.fontSize.base};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryDark};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;
