import React from 'react';
import { Router } from '@reach/router';

import Search from './Search';
import About from './About';

const Main = () => {
  return (
    <main>
      <Router>
        <About path="/about" />
        <Search path="/*" />
      </Router>
    </main>
  );
};

export default Main;
