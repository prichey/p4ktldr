import React from 'react';
import { Route } from 'react-router-dom';

import Search from './Search';
import Results from './Results';

class Main extends React.Component {
  render() {
    return (
      <main>
        <Route exact path="/" component={Search} />
        <Route path="/search/:foo" component={Results} />
      </main>
    );
  }
}

export default Main;
