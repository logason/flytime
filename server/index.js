'use strict';

const Firebase    = require('firebase'),
      express     = require('express');

const scraper     = require('./scraper'),
      notifier    = require('./notifier'),
      renderEmail = require('./utils/renderEmail'),
      sendEmails  = require('./utils/sendEmails'),
      api         = require('./api');

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

app.use('/healthy', (req, res) => {
  res.send('ok');
});

app.use('/api', api());

app.get('*', (req, res) => {
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
