import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
`;

export const MainContent = styled.main`
  flex: 1;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  padding: ${(props) => props.theme.spacing.xxl};
`;

export const HeaderButtonContainer = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;
