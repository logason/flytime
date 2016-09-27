import { combineReducers } from 'redux';

import flights from './flights';
import modal from './modal';
import search from './search';
import logos from './logos';

export default combineReducers({
  flights,
  modal,
  search,
  logos,
});
