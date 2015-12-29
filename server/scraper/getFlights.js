'use strict';

const request   = require('superagent'),
      cheerio   = require('cheerio');

module.exports = (url, flights) => {
  return new Promise((resolve, reject) => {
    request(url, (error, response) => {
      if (error) {
        reject(new Error(err));
      } else {

        const $ = cheerio.load(response.text);
        const columns = ['date', 'flightNum', 'airline', 'location', 'scheduled', 'status'];
        let newFlights = [];

        $('tr').map(function() {
          if (!$(this).children('td').length) {
            return;
          };

          let flight = {
            'date': '',
            'flightNum':'',
            'airline':'',
            'location': '',
            'scheduled': '',
            'status': '',
            'id': '',
            'delay': 0,
            'timestamp': '',
          };

          $(this).children('td').each(function(index) {
            flight[columns[index]] = $(this).html();
          });
          flight.timestamp = renderFlightDate(flight);
          flight.id = flight.timestamp + flight.flightNum;

          flights.push(flight);
        });
        resolve(flights);
      }
    });
  });
}

const renderFlightDate = (flight) => {
  const flightDate = new Date(new Date().getFullYear() + ' ' + flight['date'] + ' ' + flight['scheduled']);
  return flightDate.getTime();
}
