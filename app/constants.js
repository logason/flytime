import keyMirror from 'keymirror';
import createConstants from 'utils/createConstants';

export default createConstants({
  FLIGHTS: keyMirror({
    UPDATE: null,
    GET: null,
    GET_SUCCESS: null,
    GET_ERROR: null,
    SEARCH: null,
  }),

  SEARCH: keyMirror({
    SET_QUERY: null,
    CLEAR: null,
  }),

  MODAL: keyMirror({
    OPEN: null,
    CLOSE: null,
  }),

});
