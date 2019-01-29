import React, { Fragment } from 'react';
import styled from 'styled-components';

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

const App = () => {
  return (
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
  );
};

export default App;
