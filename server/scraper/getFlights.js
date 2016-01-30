'use strict';

const request = require('superagent');

const extractFlights = require('./extractFlights');

module.exports = (url, flights) => new Promise((resolve, reject) => {
  request(url, (error, response) => {
    if (error) {
      reject(new Error(error));
    } else {
      resolve(flights.concat(extractFlights(response.text, new Date().getFullYear())));
    }
  });
});
