'use strict';

const expect = require('expect');
const delayDetector = require('../delayDetector');

describe('delayDetector', () => {
  it('should calculate delay in minutes and set as flight.delay', () => {
    const flight = {
      'date': '28. Dec',
      'flightNum': 'FI692',
      'scheduled': '06:20',
      'status': 'Landed 06:40',
    };
    const flightWithDelay = delayDetector(flight);
    expect(flight.delay).toEqual(20);
  });

  it('should return negative delay if flight was ahead of schedule', () => {
    const flight = {
      'date': '28. Dec',
      'flightNum': 'FI692',
      'scheduled': '06:20',
      'status': 'Landed 06:00',
    };
    const flightWithDelay = delayDetector(flight);
    expect(flight.delay).toEqual(-20);
  });

  it('should be able to calculate delay over midnight', () => {
    const flight = {
      'date': '28. Dec',
      'flightNum': 'FI692',
      'scheduled': '23:30',
      'status': 'Landed 00:30',
    };
    const flightWithDelay = delayDetector(flight);
    expect(flight.delay).toEqual(60);
  });

  it('should return negative delay if flight was scheduled after midnight but landed before', () => {
    const flight = {
      'date': '29. Dec',
      'flightNum': 'FI692',
      'scheduled': '00:30',
      'status': 'Landed 23:30',
    };
    const flightWithDelay = delayDetector(flight);
    expect(flight.delay).toEqual(-60);
  });

});
