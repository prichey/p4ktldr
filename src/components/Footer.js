import React from 'react';
import styled from 'styled-components';
import { Location, Link } from '@reach/router';

const StyledFooter = styled.footer`
  width: 100%;
  text-align: right;
  padding-bottom: 15px;
  padding-top: 0.5em;
  flex-grow: 0;
  border-top: 3px solid ${props => props.theme.dark};

  @media (min-width: 550px) {
    padding-bottom: 30px;
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
