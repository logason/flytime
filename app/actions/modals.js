
import constants from 'constants';

export function open({ flightType, flightId }) {
  return {
    type: constants.MODAL.OPEN,
    flightType,
    flightId,
  };
}

export function close() {
  return {
    type: constants.MODAL.CLOSE,
  };
}
