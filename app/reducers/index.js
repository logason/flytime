import { combineReducers } from 'redux';

import flights from './flights';
import search from './search';

export default combineReducers({
  flights,
  search,
});
