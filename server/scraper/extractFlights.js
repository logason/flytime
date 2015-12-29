'use strict';

const cheerio = require('cheerio');

module.exports = (data) => {
  const $ = cheerio.load(data);
  const columns = ['date', 'flightNum', 'airline', 'location', 'scheduled', 'status'];
  const flights = [];

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
      'timestamp': '',
    };

    $(this).children('td').each(function(index) {
      flight[columns[index]] = $(this).html();
    });

    flight.timestamp = new Date(`${new Date().getFullYear()} ${flight['date']} ${flight['scheduled']}`).getTime();
    flight.id = flight.timestamp + flight.flightNum;

    flights.push(flight);
  });

  return flights;
}
