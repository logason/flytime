import Firebase from 'firebase';

import constants from 'constants';

let flightData;

export function connectData(flightType) {
  return (dispatch) => {
    flightData = new Firebase(`${__FIREBASE_URL__}/${flightType}`);

    dispatch({
      type: constants.FLIGHTS.GET,
      flightType,
    });

    flightData.once('value', (data) => {
      dispatch({
        type: constants.FLIGHTS.GET_SUCCESS,
        flightType,
        flights: data.val(),
      });
    }, (error) => {
      dispatch({
        type: constants.FLIGHTS.GET_ERROR,
        flightType,
        error,
      });
    });

    flightData.on('child_changed', (data) => {
      dispatch({
        type: constants.FLIGHTS.UPDATE,
        flightType,
        flight: data.val(),
      });
    });
  };
}
