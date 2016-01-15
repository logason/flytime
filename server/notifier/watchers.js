'use strict';

const Firebase = require('firebase');
const fs = require('fs');

const renderEmail = require('./renderEmail');
const sendEmails = require('./sendEmails');

const arrivalsWatcher = new Firebase(`${process.env.FIREBASE_URL}/arrivals`);
arrivalsWatcher.on('child_changed', (updatedFlight) => checkForUpdate('arrivals', updatedFlight));

const departuresWatcher = new Firebase(`${process.env.FIREBASE_URL}/departures`);
departuresWatcher.on('child_changed', (updatedFlight) => checkForUpdate('departures', updatedFlight));

const checkForUpdate = (flightType, updatedFlight) => {
  const oldFlight = JSON.parse(fs.readFileSync(`server/cache/${flightType}-old.json`))[updatedFlight.key()];
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
  }

  return;
}
