import React from 'react';
import styled from 'styled-components';
import { Location, Link } from '@reach/router';

const StyledFooter = styled.footer`
  width: 100%;
  text-align: right;
  padding-top: 5px;
  margin-bottom: 40px;
  flex-grow: 0;
  border-top: 3px solid ${props => props.theme.color.dark};

  @media (min-width: ${props => props.theme.bp.mobile}) {
    margin-bottom: 30px;
  }
`;

const Footer = () => {
  return (
    <Location>
      {({ location }) => (
        <StyledFooter>
          {location.pathname === '/about' ? (
            <Link to="/">Back</Link>
          ) : (
            <Link to="/about">???</Link>
          )}
        </StyledFooter>
      )}
    </Location>
  );
};

export default Footer;
