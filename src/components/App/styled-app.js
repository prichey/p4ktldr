import styled from 'styled-components';

export const StyledAppWrap = styled.div`
  height: 100vh;
  overflow-x: hidden;
`;

export const StyledApp = styled.div`
  position: relative;
  max-width: 800px;
  padding: 0 20px;
  margin: 0 auto;
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
`;

export const StyledMain = styled.main`
  width: 100%;
  flex-grow: 1;
  margin-top: 20px;

  @media (min-width: ${props => props.theme.bp.mobile}) {
    margin-top: 40px;
  }
`;
