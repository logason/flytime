import Firebase from 'firebase';
import request from 'superagent';
import ga from 'react-ga';

import constants from 'constants';

let flightData;

export function connectData(flightType) {
  return (dispatch) => {
    flightData = new Firebase(`https://flytime.firebaseio.com/${flightType}`);

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

export function follow(flightType, flightId, email) {
  return (dispatch) => {
    dispatch({
      type: constants.FLIGHTS.FOLLOW,
      flightType,
      flightId,
    });
    ga.event({ category: 'Flight', action: 'FOLLOW', label: flightId });
    request
      .post('/api/follow/email')
      .send({
        type: flightType,
        flightId,
        email,
      })
      .end((error) => {
        if (!error) {
          setTimeout(() => dispatch({
            type: constants.FLIGHTS.FOLLOW_SUCCESS,
            flightType,
            flightId,
            email,
          }), 200);
          ga.event({ category: 'Flight', action: 'FOLLOW_SUCCESS', label: flightId, nonInteraction: true });
        } else {
          // XXX handle error
          ga.event({ category: 'Flight', action: 'FOLLOW_ERROR', label: flightId, nonInteraction: true });
        }
      });
  };
}

export function unfollow(flightType, flightId, email) {
  return (dispatch) => {
    dispatch({
      type: constants.FLIGHTS.UNFOLLOW,
      flightType,
      flightId,
    });
    ga.event({ category: 'Flight', action: 'UNFOLLOW', label: flightId });

    request
      .get(`/api/unfollow/email/${flightId}/${email}`)
      .end((error) => {
        if (!error) {
          setTimeout(() => dispatch({
            type: constants.FLIGHTS.UNFOLLOW_SUCCESS,
            flightType,
            flightId,
            email,
          }), 200);
          ga.event({ category: 'Flight', action: 'UNFOLLOW_SUCCESS', label: flightId, nonInteraction: true });
        } else {
          // XXX handle error
          ga.event({ category: 'Flight', action: 'UNFOLLOW_ERROR', label: flightId, nonInteraction: true });
        }
      });
  };
}
