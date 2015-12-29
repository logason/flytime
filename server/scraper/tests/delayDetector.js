'use strict';

const expect = require('expect');
const delayDetector = require('../delayDetector');

describe('delayDetector', () => {
  it('should calculate delay in minutes and set as flight.delay', () => {
    const flights = [
      {
        'date': '28. Dec',
        'flightNum': 'FI692',
        'scheduled': '06:20',
        'status': 'Landed 06:40',
      },
    ];
    const flightsWithDelay = delayDetector(flights);
    expect(flights[0].delay).toEqual(20);
  });

  it('should return negative delay if flight was ahead of schedule', () => {
    const flights = [
      {
        'date': '28. Dec',
        'flightNum': 'FI692',
        'scheduled': '06:20',
        'status': 'Landed 06:00',
      },
    ];
    const flightsWithDelay = delayDetector(flights);
    expect(flights[0].delay).toEqual(-20);
  });

  it('should be able to calculate delay over midnight', () => {
    const flights = [
      {
        'date': '28. Dec',
        'flightNum': 'FI692',
        'scheduled': '23:30',
        'status': 'Landed 00:30',
      },
    ];
    const flightsWithDelay = delayDetector(flights);
    expect(flights[0].delay).toEqual(60);
  });

  it('should return negative delay if flight was scheduled after midnight but landed before', () => {
    const flights = [
      {
        'date': '29. Dec',
        'flightNum': 'FI692',
        'scheduled': '00:30',
        'status': 'Landed 23:30',
      },
    ];
    const flightsWithDelay = delayDetector(flights);
    expect(flights[0].delay).toEqual(-60);
  });

  // XXX Find a way to be able to detect delays longer than 12 hours
  // it('should be able to detect delays longer than 12 hours', () => {
  //   const flights = [
  //     {
  //       'date': '28. Dec',
  //       'flightNum': 'FI692',
  //       'scheduled': '00:00',
  //       'status': 'Landed 12:01',
  //     },
  //   ];
  //   const flightsWithDelay = delayDetector(flights);
  //   expect(flights[0].delay).toEqual(12*60 + 1);
  // });
});
