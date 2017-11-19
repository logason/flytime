import {combineReducers} from 'redux';

import flights from './flights';
import modal from './modal';
import search from './search';

export default combineReducers({
  flights,
  modal,
  search
});
