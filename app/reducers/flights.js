import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

import constants from 'constants';

const initialState = Immutable.fromJS({
  selectedType: 'arrivals',
  arrivals: {
    isLoading: false,
    error: null,
    items: Immutable.Map(),
  },
  departures: {
    isLoading: false,
    error: null,
    items: Immutable.Map(),
  },
});

export default createReducer(initialState, {

  [constants.FLIGHTS.GET]: (state, { flightType }) => {
    state = state.set('selectedType', flightType);
    state = state.setIn([flightType, 'error'], null);
    return state.setIn([flightType, 'isLoading'], true);
  },

  [constants.FLIGHTS.GET_SUCCESS]: (state, { flightType, flights }) => {
    state = state.setIn([flightType, 'isLoading'], false);
    let flightsMap = Immutable.OrderedMap();
    let lastFinishedFlightIndex = 0;

    flights.map((flight, index) => {
      flight.isOver = isFlightOver(flight);
      if (flight.isOver && flight.status.indexOf('Cancelled') < 0) {
        lastFinishedFlightIndex = index;
      }
      flightsMap = flightsMap.set(flight.id, Immutable.fromJS(flight));
    });

    const currentHour = new Date().getHours();
    let expireHour = currentHour - 3;
    if (expireHour < 0) {
      expireHour = 24 + expireHour;
    }
    return state.setIn([flightType, 'items'], flightsMap.take(lastFinishedFlightIndex + 1).reverse().takeUntil((flight) => {
      if (flight.get('status').indexOf('Cancelled') >= 0) {
        return false;
      }
      return flight.get('status').split(' ')[1].split(':')[0] <= expireHour;
    }).reverse().concat(flightsMap.takeLast(flightsMap.size - lastFinishedFlightIndex)));
  },

  [constants.FLIGHTS.GET_ERROR]: (state, { flightType, error }) => {
    state = state.setIn([flightType, 'error'], error);
    return state.setIn([flightType, 'isLoading'], false);
  },

  [constants.FLIGHTS.UPDATE]: (state, { flightType, flight }) => {
    flight.isOver = isFlightOver(flight);
    return state.setIn([flightType, 'items', flight.id], Immutable.fromJS(flight));
  },

});

const isFlightOver = (flight) => {
  return flight.status.indexOf('Landed') >= 0 ||
    flight.status.indexOf('Departed') >= 0 ||
    flight.status.indexOf('Cancelled') >= 0;
};
