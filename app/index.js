import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import configureStore from './utils/configureStore';

import App from './App';

const store = configureStore();

if (typeof document !== 'undefined') {
  render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="*" component={App} />
      </Router>
    </Provider>,
    document.getElementById('app')
  );
}
