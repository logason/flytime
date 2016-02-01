import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

import constants from 'constants';

const initialState = Immutable.fromJS({
  arrivals: {
    isLoading: false,
    error: null,
    items: Immutable.OrderedMap(),
  },
  departures: {
    isLoading: false,
    error: null,
    items: Immutable.OrderedMap(),
  },
});

export default createReducer(initialState, {

  [constants.FLIGHTS.GET]: (state, { flightType }) => {
    state = state.setIn([flightType, 'error'], null);
    return state.setIn([flightType, 'isLoading'], true);
  },

  [constants.FLIGHTS.GET_SUCCESS]: (state, { flightType, flights }) => {
    state = state.setIn([flightType, 'isLoading'], false);
    let flightsMap = Immutable.OrderedMap();
    flights.map((flight) => {
      flightsMap = flightsMap.set(flight.id, Immutable.fromJS(flight));
    });
    return state.setIn([flightType, 'items'], flightsMap);
  },

  [constants.FLIGHTS.GET_ERROR]: (state, { flightType, error }) => {
    state = state.setIn([flightType, 'error'], error);
    return state.setIn([flightType, 'isLoading'], false);
  },

  [constants.FLIGHTS.UPDATE]: (state, { flightType, flight }) => {
    return state.setIn([flightType, 'items', flight.id], Immutable.fromJS(flight));
  },

});
