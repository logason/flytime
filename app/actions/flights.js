
import constants from 'constants';

export const add = (flightId, flightType) => {
  console.log('add', constants.FLIGHTS.ADD);
  return {
    type: constants.FLIGHTS.ADD,
    flightId,
    flightType,
  }
}

export const remove = (flightId, flightType) => {
  return {
    type: constants.FLIGHTS.REMOVE,
    flightId,
    flightType,
  }
}
