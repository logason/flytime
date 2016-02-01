'use strict';

const cheerio = require('cheerio');

module.exports = (data, year) => {
  const $ = cheerio.load(data);
  const columns = ['date', 'flightNum', 'airline', 'location', 'scheduled', 'status'];
  let flights = [];

  let lastFlightTime = 0;
  let foundYesterdayFlights = false;

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

    // Check if we can find flights that were delayed over midnight
    const thisFlightTime = parseInt(flight.scheduled.split(':')[0], 10);
    if (!foundYesterdayFlights && lastFlightTime - thisFlightTime > 10) {
      flights = flights.map((item) => {
        // All flights in flights[] were delayed over midnight.
        // Therefor we need to correct their timestamp.
        item.timestamp = item.timestamp - (24 * 60 * 60 * 1000);
        item.id = item.timestamp + item.flightNum;
        return item;
      });
      foundYesterdayFlights = true;
    }
    lastFlightTime = thisFlightTime;

    flight.id = flight.timestamp + flight.flightNum;
    flights.push(flight);
  });

  return flights;
};
