'use strict';

const moment = require('moment');

module.exports = (flight) => {
  const status = flight.status;
  const date = flight.date;
  const newFlight = flight;

  if (status.indexOf('Landed') >= 0
  || status.indexOf('Confirm') >= 0
  || status.indexOf('Departed') >= 0
  || status.indexOf('Estimat') >= 0) {
    const currentDate = new Date(`${date} ${status.split(' ')[1]}`);
    const scheduledDate = new Date(`${date} ${flight.scheduled}`);
    const scheduledTime = moment(scheduledDate);
    let currentTime = moment(currentDate);

    // We need to check whether flight was delayed over midnight or not. To do so we add 12 hours
    // to the real time and check if scheduledTime is still bigger after that. By doing this we
    // prevent to falsely detect flights ahead of schedule as over midnight delays and vise versa.
    // At the same time this won't work for flights delayed for more than 12 hours but that is a
    // rare edge case and a sacrifice we have to make.
    // XXX Find a way to be able to detect delays longer than 12 hours
    if (moment(currentDate).add(12, 'hours') < scheduledTime) {
      // Flight was delayed over midnight
      currentTime = currentTime.add(1, 'day');
    } else if (moment(currentDate).subtract(12, 'hours') > scheduledTime) {
      // Flight was scheduled after midnight but landed before
      currentTime = currentTime.subtract(1, 'day');
    }

    const delay = (currentTime - scheduledTime) / (1000 * 60);

    newFlight.delay = delay;
    if (status === 'Cancelled') {
      newFlight.delay = '';
    }
  }

  return newFlight;
};
