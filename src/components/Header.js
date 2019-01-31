import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

import logo from './../img/logo.svg';

const StyledHeader = styled.header`
  width: 100%;
  text-align: center;
  padding-top: 40px;
  flex-grow: 0;

  @media (min-width: 550px) {
    padding-top: 80px;
  }
`;

const StyledLogo = styled.img`
  width: 100%;
  max-width: 150px;

  @media (min-width: 550px) {
    max-width: 200px;
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <Link to="/" state={{ reset: true }}>
        <StyledLogo src={logo} alt="p4ktldr logo" />
      </Link>
    </StyledHeader>
  );
};

export default Header;
