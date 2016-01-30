'use strict';

const Firebase = require('firebase');
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const renderEmail = require('../utils/renderEmail');
const sendEmails = require('../utils/sendEmails');

module.exports = () => {
  const api = express();

  api.use(bodyParser.json());

  api.post('/follow/email', (req, res) => {
    const type = req.body.type;
    const flightId = req.body.flightId;
    const email = req.body.email;

    if (!type || !flightId || !email) {
      res.status(422).send('Missing parameter');
      return;
    } else if (['arrivals', 'departures'].indexOf(type) < 0) {
      res.status(422).send('Invalid type');
      return;
    }

    const flightsRef = new Firebase(`${process.env.FIREBASE_URL}/${type}`);
    flightsRef.once('value', (flights) => {
      const flight = _.find(flights.val(), (item) => item.id === flightId);
      if (!flight) {
        res.status(422).send('Invalid flight ID');
        return;
      }

      const flightFollowersRef = new Firebase(`${process.env.FIREBASE_URL}/followers/${flightId}`);
      flightFollowersRef.once('value', (followersList) => {
        if (_.find(followersList.val(), (follower) => follower === email)) {
          res.status(200).send({ flightId, email, message: 'Already following' });
          return;
        }

        flightFollowersRef.push(email, (error) => {
          if (error) {
            // XXX Log error
            res.status(500).send('Could not follow flight');
            return;
          }

          const successEmailSubject = `You are following flight ${flight.flightNum} on Flytime.is`;
          const successEmailBody = renderEmail(flight, type, email, true);
          sendEmails(successEmailSubject, successEmailBody, [email]);

          res.status(201).send({ flightId, email, message: 'Follow success' });
          return;
        });
      });
    });
  }, (error, res) => {
    if (error) {
      // XXX Log error
      res.status(500).send();
      return;
    }
  });

  api.get('/unfollow/email/:flightId/:email', (req, res) => {
    const flightId = req.params.flightId;
    const email = req.params.email;

    const flightFollowersRef = new Firebase(`${process.env.FIREBASE_URL}/followers/${flightId}`);
    flightFollowersRef.once('value', (followersList) => {
      if (!_.find(followersList.val(), (follower) => follower === email)) {
        res.status(404).send({ flightId, email, message: 'Not following' });
        return;
      }

      followersList.forEach((follower) => {
        if (follower.val() === email) {
          follower.ref().remove((error) => {
            if (error) {
              // XXX Log error
              res.status(500).send('Could not unfollow');
              return;
            }
            // XXX Return unfollow success page
            res.status(200).send({ flightId, email, message: 'Unfollow success' });
            return;
          });
        }
      });
    });
  });

  return api;
};
