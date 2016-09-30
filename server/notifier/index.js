'use strict';

const renderEmail = require('../utils/renderEmail');
const sendEmails = require('../utils/sendEmails');

const checkForUpdate = (flightType, updatedFlight, db) => {
  let oldFlight = {};

  let oldFlights;
  try {
    oldFlights = require(`../cache/${flightType}-old.json`);
  } catch (e) {
    console.log('Cache not found'); // eslint-disable-line no-console
    return;
  }

  oldFlight = oldFlights[updatedFlight.key];
  const newFlight = updatedFlight.val();

  if (oldFlight && newFlight && oldFlight.airline === newFlight.airline && oldFlight.flightNum === newFlight.flightNum) {
    if (oldFlight.status !== newFlight.status) {
      const followersData = db.ref(`/followers/${newFlight.id}`);
      followersData.once('value', (data) => {
        const followersList = data.val();
        if (followersList) {
          const email = renderEmail(newFlight, flightType);
          console.log(new Date(), email, `${newFlight.flightNum}: ${newFlight.status}`);
          sendEmails(`${newFlight.flightNum}: ${newFlight.status}`, email, followersList);

          // Delete followers list if flight is finished
          const newFlightStatus = newFlight.status;
          if (newFlightStatus.indexOf('Cancelled') >= 0 ||
            newFlightStatus.indexOf('Landed') >= 0 ||
            newFlightStatus.indexOf('Departed') >= 0) {
            followersData.remove();
          }
        }
      });
    }
  } else {
    // XXX Log error
  }

  return;
};

module.exports = (db) => {
  const arrivalsWatcher = db.ref('/arrivals');
  arrivalsWatcher.on('child_changed', (newFlight) => checkForUpdate('arrivals', newFlight, db));

  const departuresWatcher = db.ref('/departures');
  departuresWatcher.on('child_changed', (newFlight) => checkForUpdate('departures', newFlight, db));
};
