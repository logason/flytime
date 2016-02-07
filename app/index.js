import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Redirect, browserHistory } from 'react-router';

import configureStore from './utils/configureStore';
import App from './App';
import 'global.css';

const store = configureStore();

if (typeof document !== 'undefined') {
  render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/:airport/:type" component={App} />
        <Redirect from="/kef" to="/kef/arrivals" />
        <Redirect from="/" to="/kef/arrivals" />
      </Router>
    </Provider>,
    document.getElementById('app')
  );
}
