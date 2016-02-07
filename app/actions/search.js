import constants from 'constants';

export function search(query) {
  return {
    type: constants.SEARCH.SET_QUERY,
    query,
  };
}

export function clear() {
  return {
    type: constants.SEARCH.CLEAR,
  };
}
