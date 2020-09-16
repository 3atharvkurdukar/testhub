import React from 'react';
import ReactDOM from 'react-dom';
import Amplify, { Analytics } from 'aws-amplify';

import './index.scss';
import App from './App';
import config from './aws-exports';
import * as serviceWorker from './serviceWorker';

Amplify.configure(config);
if (process.env.NODE_ENV === 'development') {
  Analytics.autoTrack('session', { enable: true });
  Analytics.autoTrack('pageView', { enable: true });
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
