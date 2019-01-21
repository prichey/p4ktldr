import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Search from './Search';
import Results from './Results';
import About from './About';

class Main extends React.Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={Search} />
          <Route path="/search/:artist" component={Results} />
          <Route path="/about" component={About} />
          <Redirect to="/" />
        </Switch>
      </main>
    );
  }
}

export default Main;
