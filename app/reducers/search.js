import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

import constants from 'constants';

const initialState = Immutable.Map({
  query: null,
});

export default createReducer(initialState, {

  [constants.SEARCH.SET_QUERY]: (state, { query }) => {
    return state.set('query', query === '' ? null : query);
  },

  [constants.SEARCH.CLEAR]: (state) => {
    return state.set('query', null);
  },

});
