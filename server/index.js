'use strict';

const Firebase = require('firebase');
const express = require('express');
const _ = require('lodash');

const scraper = require('./scraper');

const firebaseRef = new Firebase(process.env.FIREBASE_URL);
const app = express();

firebaseRef.authWithCustomToken(process.env.FIREBASE_SECRET, (error, authData) => {
  if (error) {
    console.log('Authentication failed!', error);
  } else {
    console.log('Authentication succesfull!');

    // Start the scraper
    scraper();
    require('./notifier/watchers');
  }
});

app.get('/healthy', (req, res) => {
  res.send('ok');
})

app.post('/follow/email/:flightId/:email', (req, res) => {
  const flightId = req.params.flightId;
  const email = req.params.email;

  const flightFollowersRef = new Firebase(`${process.env.FIREBASE_URL}/followers/${flightId}`);
  flightFollowersRef.once('value', (followersList) => {

    if (_.find(followersList.val(), (follower) => follower === email)) {
      res.status(200).send({flightId: flightId, email: email, message: 'Already following'});
      return;
    }

    flightFollowersRef.push(email, (error) => {
      if (error) {
        // XXX Log error
        res.status(500).send('Could not follow flight');
        return;
      }
      // XXX Send follow success email
      res.status(201).send({flightId: flightId, email: email, message: 'Follow success'});
      return;
    });

  });
}, (error) => {
  if (error) {
    // XXX Log error
    res.status(500).send('Could fetch followers list');
    return;
  }
});

app.get('/unfollow/email/:flightId/:email', (req, res) => {
  const flightId = req.params.flightId;
  const email = req.params.email;

  const flightFollowersRef = new Firebase(`${process.env.FIREBASE_URL}/followers/${flightId}`);
  flightFollowersRef.once('value', (followersList) => {

    if (!_.find(followersList.val(), (follower) => follower === email)) {
      res.status(404).send({flightId: flightId, email: email, message: 'Not following'});
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
          res.status(200).send({flightId: flightId, email: email, message: 'Unfollow success'});
          return;
        });
      }
    });
  });
});

app.use((req, res) => {
  // XXX Return bundle
  res.send('hello world');
})

app.listen(process.env.APP_PORT, (error) => {
  if (error) {
    console.error(err);
    return;
  }
  console.log(`Server running at localhost:${process.env.APP_PORT}`);
});
