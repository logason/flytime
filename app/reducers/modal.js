import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

import constants from 'constants';

const initialState = Immutable.Map();

export default createReducer(initialState, {

  [constants.MODAL.OPEN]: (state, { flightType, flightId }) => {
    return Immutable.fromJS({ flightType, flightId });
  },

  [constants.MODAL.CLOSE]: () => {
    return initialState;
  },

});
