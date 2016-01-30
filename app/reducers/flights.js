import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

import constants from 'constants';

const initialState = Immutable.fromJS({
  arrivals: {},
  departures: {},
});

export default createReducer(initialState, {

  [constants.FLIGHTS.ADD]: (state, { flightId, flightType }) => {
    return state.setIn([flightType, flightId], { flightId });
  },

  [constants.FLIGHTS.REMOVE]: (state, { flightId, flightType }) => {
    return state.deleteIn([flightType, flightId]);
  },

});
