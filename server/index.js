'use strict';

const Firebase    = require('firebase'),
      express     = require('express'),
      bodyParser  = require('body-parser'),
      _           = require('lodash');

const scraper     = require('./scraper'),
      notifier    = require('./notifier');

const firebaseRef = new Firebase(process.env.FIREBASE_URL);
const app = express();

firebaseRef.authWithCustomToken(process.env.FIREBASE_SECRET, (error, authData) => {
  if (error) {
    console.log('Authentication failed!', error);
  } else {
    console.log('Authentication succesfull!');

    // Start scraper and notifier
    scraper();
    notifier();
  }
});

app.use(bodyParser.json());

app.use('/healthy', (req, res) => {
  res.send('ok');
});

app.post('/follow/email', (req, res) => {
  const type      = req.body.type,
        flightId  = req.body.flightId,
        email     = req.body.email;

  if (!type || !flightId || !email) {
    res.status(422).send('Missing parameter');
    return;
  } else if (['arrivals', 'departures'].indexOf(type) < 0) {
    res.status(422).send('Invalid type');
    return;
  }

  const flightsRef = new Firebase(`${process.env.FIREBASE_URL}/${type}`);
  flightsRef.once('value', (flights) => {

    const flight = _.find(flights.val(), (flight) => flight.id === flightId);
    if (!flight) {
      res.status(422).send('Invalid flight ID');
      return;
    }

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

  })
}, (error) => {
  if (error) {
    // XXX Log error
    res.status(500).send();
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
