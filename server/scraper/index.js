'use strict';

const fs            = require('fs'),
      Firebase      = require('firebase');

const getFlights    = require('./getFlights'),
      delayDetector = require('./delayDetector'),
      sortFlights   = require('./sortFlights');

const TIMETABLES_URL = 'http://www.kefairport.is/English/Timetables';

const scrape = (type) => {
  const url = `${TIMETABLES_URL}/${type}/`;
  console.log(new Date(), `Fetching ${type}`);
  getFlights(`${url}/yesterday`, [])
    .then((flights) => getFlights(url, flights))
    .then((flights) => getFlights(`${url}/tomorrow`, flights))
    .then((flights) => {
      return flights.map((flight) => delayDetector(flight));
    })
    .then(sortFlights)
    .then((flights) => {
      // Write flights to disk
      try {
        fs.accessSync(`server/cache/${type}.json`, fs.F_OK);
        fs.rename(`server/cache/${type}.json`, `server/cache/${type}-old.json`);
      } catch (e) {}
      fs.writeFile(`server/cache/${type}.json`, JSON.stringify(flights));

      // Post flights to Firebase
      const firebaseClient = new Firebase(`${process.env.FIREBASE_URL}/${type}`)
      firebaseClient.set(flights);
      console.log(new Date(), `Finished fetching ${type}`);
    });
}

module.exports = () => {
  scrape('arrivals');
  scrape('departures');

  // Scrape and update data every 2 minutes
  setInterval(() => scrape('arrivals'), 60000);
  setInterval(() => scrape('departures'), 60000);

  console.log(new Date(), 'Scraper running');
}
