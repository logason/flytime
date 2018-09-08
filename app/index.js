import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import ga from 'react-ga';

import App from './App';

import 'global.css';

if (!__DEV__) {
  ga.initialize(GA_TRACKING_CODE);
  browserHistory.listen(location => ga.pageview(location.pathname));
}

if (typeof document !== 'undefined') {
  render(<App />, document.getElementById('app'));
}
