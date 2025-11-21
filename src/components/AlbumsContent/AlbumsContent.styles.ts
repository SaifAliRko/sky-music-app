import styled from 'styled-components';

export const ErrorWrapper = styled.div`
  padding: ${(props) => props.theme.spacing.xxl};
  background-color: ${(props) => `${props.theme.colors.error}10`};
  color: ${(props) => props.theme.colors.error};
  text-align: center;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  margin: ${(props) => props.theme.spacing.lg};
`;
