'use strict';

const request   = require('superagent'),
      cheerio   = require('cheerio');

const extractFlights = require('./extractFlights');

module.exports = (url, flights) => {
  return new Promise((resolve, reject) => {
    request(url, (error, response) => {
      if (error) {
        reject(new Error(err));
      } else {
        resolve(flights.concat(extractFlights(response.text)));
      }
    });
  });
}
