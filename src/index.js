import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Amplify, { Analytics } from 'aws-amplify';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import './index.scss';
import App from './App';
import config from './aws-exports';
import * as serviceWorker from './serviceWorker';
import adminReducer from './store/reducers/admin';
import questionsReducer from './store/reducers/questions';

Amplify.configure(config);
if (process.env.NODE_ENV !== 'development') {
  Analytics.autoTrack('session', { enable: true });
  Analytics.autoTrack('pageView', { enable: true });
}

const rootReducer = combineReducers({
  questions: questionsReducer,
  admin: adminReducer,
});

const composeEnhancers = composeWithDevTools({ trace: true });
const store = createStore(
  rootReducer,
  process.env.NODE_ENV === 'development'
    ? composeEnhancers(applyMiddleware(thunk))
    : applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
