import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';

import App from './components/App';

// import registerServiceWorker from './registerServiceWorker';

ReactGA.initialize('UA-133684082-1');

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
