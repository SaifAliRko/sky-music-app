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
