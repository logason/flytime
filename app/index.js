import React from 'react';
import {render} from 'react-dom';

import App from './App';

if (typeof document !== 'undefined') {
  render(
    <App />,
    document.getElementById('app')
  );
}
