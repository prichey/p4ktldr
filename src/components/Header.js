import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  render() {
    return (
      <StyledHeader>
        <Link to="/">
          <StyledLogo src={logo} alt="p4ktldr logo" />
        </Link>
      </StyledHeader>
    );
  }
}

export default Header;
