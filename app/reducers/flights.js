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
    const normalizedFlights = {};
    flights.map((flight) => {
      normalizedFlights[flight.id] = flight;
    });
    return state.setIn([flightType, 'items'], Immutable.fromJS(normalizedFlights));
  },

  [constants.FLIGHTS.GET_ERROR]: (state, { flightType, error }) => {
    state = state.setIn([flightType, 'error'], error);
    return state.setIn([flightType, 'isLoading'], false);
  },

  [constants.FLIGHTS.UPDATE]: (state, { flightType, flight }) => {
    return state.updateIn([flightType, flight.id], Immutable.Map(), Immutable.fromJS(flight));
  },

});
