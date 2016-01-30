'use strict';

module.exports = (flights) => flights.sort((a, b) => {
  if (a.id < b.id) {
    return -1;
  } else if (a.id > b.id) {
    return 1;
  }
  return 0;
});
