'use strict';

const Firebase = require('firebase');
const fs = require('fs');

const renderEmail = require('../utils/renderEmail');
const sendEmails = require('../utils/sendEmails');

const checkForUpdate = (flightType, updatedFlight) => {
  let oldFlight = {};
  try {
    fs.accessSync(`server/cache/${flightType}-old.json`, fs.F_OK);
    const oldFlights = fs.readFileSync(`server/cache/${flightType}-old.json`);
    oldFlight = JSON.parse(oldFlights).length && oldFlights[updatedFlight.key()];
  } catch (e) {
    return;
  }

  const newFlight = updatedFlight.val();

  if (oldFlight.airline === newFlight.airline && oldFlight.flightNum === newFlight.flightNum) {
    if (oldFlight.status !== newFlight.status) {
      const followersData = new Firebase(`${process.env.FIREBASE_URL}/followers/${newFlight.id}`);
      followersData.once('value', (data) => {
        const followersList = data.val();
        if (followersList) {
          const email = renderEmail(newFlight, flightType);
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

module.exports = () => {
  const arrivalsWatcher = new Firebase(`${process.env.FIREBASE_URL}/arrivals`);
  arrivalsWatcher.on('child_changed', (newFlight) => checkForUpdate('arrivals', newFlight));

  const departuresWatcher = new Firebase(`${process.env.FIREBASE_URL}/departures`);
  departuresWatcher.on('child_changed', (newFlight) => checkForUpdate('departures', newFlight));
};
