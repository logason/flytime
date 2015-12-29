'use strict';

const fs            = require('fs');

const getFlights    = require('./getFlights');

const TIMETABLES_URL = 'http://www.kefairport.is/English/Timetables';

module.exports = (type) => {
  const url = `${TIMETABLES_URL}/${type}/`;

  const flights = [];

  getFlights(`${url}/yesterday`, flights)
    .then((flights) => getFlights(url, flights))
    .then((flights) => getFlights(`${url}/tomorrow`, flights))
    .then((flights) => {
      fs.writeFile(`server/cache/${type}.json`, JSON.stringify(flights));
    });
}
