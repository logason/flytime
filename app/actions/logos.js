import request from 'superagent';

import constants from 'constants';
import getLogoPath from 'utils/getLogoPath';

export function checkIfLogoExists(airline) {
  return (dispatch, getState) => {
    if (getState().logos.get(airline) !== void 0) {
      return null;
    }
    request.head(getLogoPath(airline)).end((err, res) => {
      if (err || res.type === 'text/html') {
        return dispatch({
          type: constants.LOGOS.CHECK,
          airline,
          exists: false,
        });
      }
      return dispatch({
        type: constants.LOGOS.CHECK,
        airline,
        exists: true,
      });
    });
  };
}
