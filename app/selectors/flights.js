import fuzzy from 'fuzzy';
import Immutable from 'immutable';
import { createSelector } from 'reselect';

import { getSearchQuery } from './search';

export const getCurrentFlightType = (state) => state.flights.get('selectedType');
export const getFlightsForType = (state) => state.flights.getIn([getCurrentFlightType(state), 'items']);

export const getVisibleFlights = createSelector(
  getFlightsForType,
  getSearchQuery,
  (flights, searchQuery) => {
    if (!searchQuery) {
      return flights.toList();
    }
    return Immutable.fromJS(fuzzy.filter(searchQuery, flights, { extract: (item) => {
      return `${item.get('airline')}
              ${item.get('date')}
              ${item.get('flightNum')}
              ${item.get('location')}
              ${item.get('scheduled')}
              ${item.get('status')}`;
    } }).map((item) => item.original)).toList();
  }
);
