'use strict';

const fs            = require('fs');

const getFlights    = require('./getFlights'),
      delayDetector = require('./delayDetector'),
      sortFlights   = require('./sortFlights');

const TIMETABLES_URL = 'http://www.kefairport.is/English/Timetables';

const scrape = (type) => {
  const url = `${TIMETABLES_URL}/${type}/`;
  const flights = [];

  getFlights(`${url}/yesterday`, flights)
    .then((flights) => getFlights(url, flights))
    .then((flights) => getFlights(`${url}/tomorrow`, flights))
    .then((flights) => {
      return flights.map((flight) => delayDetector(flight));
    })
    .then(sortFlights)
    .then((flights) => {
      try {
        fs.accessSync(`server/cache/${type}.json`, fs.F_OK);
        fs.rename(`server/cache/${type}.json`, `server/cache/${type}-old.json`);
      } catch (e) {}
      fs.writeFile(`server/cache/${type}.json`, JSON.stringify(flights));
    });
}

module.exports = () => {
  scrape('arrivals');
  scrape('departures');

  // Scrape and update data every 2 minutes
  setInterval(() => scrape('arrivals'), 2 * 60000);
  setInterval(() => scrape('departures'), 2 * 60000);

  console.log(new Date(), 'Scraper running');
}
