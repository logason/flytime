'use strict';

const cheerio = require('cheerio');

module.exports = (data, year) => {
  const $ = cheerio.load(data);
  const columns = ['date', 'flightNum', 'airline', 'location', 'scheduled', 'status'];
  const flights = [];

  $('tr').map((rowNum, flightRow) => {
    if (!$(flightRow).children('td').length) {
      return;
    }

    const flight = {
      date: '',
      flightNum: '',
      airline: '',
      location: '',
      scheduled: '',
      status: '',
      id: '',
      timestamp: '',
    };

    $(flightRow).children('td').each((columnNum, flightColumn) => {
      flight[columns[columnNum]] = $(flightColumn).html();
    });

    flight.timestamp = new Date(`${year} ${flight.date} ${flight.scheduled}`).getTime();
    flight.id = flight.timestamp + flight.flightNum;

    flights.push(flight);
  });

  return flights;
};
