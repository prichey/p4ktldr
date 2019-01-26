import React from 'react';
import { Router, Redirect } from '@reach/router';

import Search from './Search';
import Results from './Results';
import About from './About';

class Main extends React.Component {
  render() {
    return (
      <main>
        <Router>
          <Search path="/" />
          <Results path="/search/:artist" />
          <About path="/about" />
          <Redirect default noThrow from="*" to="/" />
        </Router>
      </main>
    );
  }
}

export default Main;
