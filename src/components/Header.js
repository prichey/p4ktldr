import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

import logo from './../img/logo.svg';

const StyledHeader = styled.header`
  text-align: center;
  padding-top: 40px;

  @media (min-width: 550px) {
    padding-top: 100px;
  }
`;

const StyledLogo = styled.img`
  max-width: 150px;

  @media (min-width: 550px) {
    max-width: 200px;
  }
`;

class Header extends React.Component {
  // <Link to="/" tabIndex={-1}>
  render() {
    return (
      <StyledHeader>
        <Link to="/" state={{ reset: true }}>
          <StyledLogo src={logo} alt="p4ktldr logo" />
        </Link>
      </StyledHeader>
    );
  }
}

export default Header;
