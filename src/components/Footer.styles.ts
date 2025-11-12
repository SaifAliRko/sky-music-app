import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing.xxl};
  background-color: ${(props) => props.theme.colors.surface};
  border-top: 1px solid ${(props) => props.theme.colors.border};
  margin-top: auto;
`;

export const FooterContent = styled.div`
  text-align: center;
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: ${(props) => props.theme.typography.fontSize.sm};
`;
