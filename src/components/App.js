import React, { Fragment } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { Helmet } from 'react-helmet';

import GlobalStyle from './GlobalStyle';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

const StyledAppWrap = styled.div`
  height: 100vh;
`;

const StyledApp = styled.div`
  top: 50%;
  transform: translateY(-50%);
  position: relative;
  max-width: 800px;
  padding: 0 20px;
  margin: 0 auto;
  height: 100%;
`;

const theme = {
  dark: '#474748',
  light: '#d1d3d4',
  accent: '#ec2227'
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <GlobalStyle />
        <StyledAppWrap>
          <StyledApp>
            <Helmet>
              <title>p4ktldr</title>
            </Helmet>

            <Header />
            <Main />
            <Footer />
          </StyledApp>
        </StyledAppWrap>
      </Fragment>
    </ThemeProvider>
  );
};

export default App;
