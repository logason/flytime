import constants from 'constants';

export const add = (flightId, flightType) => ({
  type: constants.FLIGHTS.ADD,
  flightId,
  flightType,
});

export const remove = (flightId, flightType) => ({
  type: constants.FLIGHTS.REMOVE,
  flightId,
  flightType,
});
