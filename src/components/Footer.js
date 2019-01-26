import React from 'react';
import styled from 'styled-components';
import { Location, Link } from '@reach/router';

const StyledFooter = styled.footer`
  text-align: right;
  padding-bottom: 20px;

  @media (min-width: 550px) {
    padding-bottom: 50px;
  }
`;

class Footer extends React.Component {
  render() {
    return (
      <Location>
        {({ location }) => (
          <StyledFooter>
            {location.pathname === '/about' ? (
              <Link to="/">Back</Link>
            ) : (
              <Link to="/about">About</Link>
            )}
          </StyledFooter>
        )}
      </Location>
    );
  }
}

export default Footer;
