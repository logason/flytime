'use strict';

const moment = require('moment');

module.exports = (flights) => {

  return flights.map((flight, index) => {
    const status = flight.status;
    const date = flight.date;

    if(status.indexOf('Landed') >= 0
    || status.indexOf('Confirm') >= 0
    || status.indexOf('Departed') >= 0
    || status.indexOf('Estimat') >= 0) {

      let currentTime = moment(new Date(`${date} ${status.split(' ')[1]}`));
      let scheduledTime = moment(new Date(`${date} ${flight.scheduled}`));

      // We need to check whether flight was delayed over midnight or not. To do so we add 12 hours
      // to the real time and check if scheduledTime is still bigger after that. By doing this we
      // prevent to falsely detect flights ahead of schedule as over midnight delays and vise versa.
      // At the same time this won't work for flights delayed for more than 12 hours but that is a
      // rare edge case and a sacrifice we have to make.
      let midnightCheckTime = moment(new Date(`${date} ${status.split(' ')[1]}`)).add(12, 'hours');
      if (midnightCheckTime < scheduledTime) {
        // Flight was delayed over midnight
        currentTime = currentTime.add(1, 'day');
      }

      const delay = (currentTime - scheduledTime) / (1000 * 60);
      flight.delay = delay;

      if (status === 'Cancelled') {
        flight.delay = '';
      }

    }

    return flight;
  });
}
