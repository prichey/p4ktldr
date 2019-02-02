import React from 'react';
import { Link } from '@reach/router';

import logo from './logo.svg';
import { StyledHeader, StyledLogo } from './styled-header';

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
