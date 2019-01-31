import React from 'react';
import { Router } from '@reach/router';
import styled from 'styled-components';

import Search from './Search/Search';
import About from './About';

const StyledMain = styled.main`
  width: 100%;
  flex-grow: 1;
  margin-top: 40px;
  margin-bottom: 20px;

  @media (min-width: 550px) {
    margin-top: 60px;
  }
`;

const Main = () => {
  return (
    <StyledMain>
      <Router>
        <About path="/about" />
        <Search path="/*" />
      </Router>
    </StyledMain>
  );
};

export default Main;
