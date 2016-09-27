import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

import constants from 'constants';

const initialState = Immutable.Map();

export default createReducer(initialState, {

  [constants.LOGOS.CHECK]: (state, { airline, exists }) => {
    return state.set(airline, exists);
  },

});
