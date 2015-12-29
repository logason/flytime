'use strict';

const Firebase = require('firebase');

const scraper = require('./scraper');

const ref = new Firebase(process.env.FIREBASE_URL);
ref.authWithCustomToken(process.env.FIREBASE_SECRET, (error, authData) => {
  if (error) {
    console.log('Authentication failed!', error);
  } else {
    console.log('Authentication succesfull!');

    // Start the scraper
    scraper();
  }
});
