import React, { Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import { Router } from '@reach/router';

import GlobalStyle from '../GlobalStyle';
import Header from '../Header';
import Footer from '../Footer';
import Search from '../Search';
import About from '../About';

import { StyledAppWrap, StyledApp, StyledMain } from './styled-app';

const theme = {
  color: {
    dark: '#474748',
    light: '#d1d3d4',
    accent: '#ec2227'
  },
  bp: {
    mobile: '550px',
    big: '1200px'
  }
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <GlobalStyle />
        <StyledAppWrap>
          <StyledApp>
            <Header />
            <StyledMain>
              <Router>
                <About path="/about" />
                <Search path="/*" />
              </Router>
            </StyledMain>
            <Footer />
          </StyledApp>
        </StyledAppWrap>
      </Fragment>
    </ThemeProvider>
  );
};

export default App;
