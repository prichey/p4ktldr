import styled from 'styled-components';

export const StyledHeader = styled.header`
  width: 100%;
  text-align: center;
  padding-top: 60px;
  flex-grow: 0;

  @media (min-width: ${props => props.theme.bp.mobile}) {
    padding-top: 80px;
  }
`;

export const StyledLogo = styled.img`
  width: 100%;
  max-width: 150px;

  @media (min-width: ${props => props.theme.bp.mobile}) {
    max-width: 200px;
  }
`;
