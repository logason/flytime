'use strict';

const expect = require('expect');
const delayDetector = require('../delayDetector');

describe('delayDetector', () => {
  it('should calculate delay in minutes and set as flight.delay', () => {
    const flight = delayDetector({
      date: '28. Dec',
      flightNum: 'FI692',
      scheduled: '06:20',
      status: 'Landed 06:40',
    });
    expect(flight.delay).toEqual(20);
  });

  it('should return negative delay if flight was ahead of schedule', () => {
    const flight = delayDetector({
      date: '28. Dec',
      flightNum: 'FI692',
      scheduled: '06:20',
      status: 'Landed 06:00',
    });
    expect(flight.delay).toEqual(-20);
  });

  it('should be able to calculate delay over midnight', () => {
    const flight = delayDetector({
      date: '28. Dec',
      flightNum: 'FI692',
      scheduled: '23:30',
      status: 'Landed 00:30',
    });
    expect(flight.delay).toEqual(60);
  });

  it('should return negative delay when flight arrives before midnight', () => {
    const flight = delayDetector({
      date: '29. Dec',
      flightNum: 'FI692',
      scheduled: '00:30',
      status: 'Landed 23:30',
    });
    expect(flight.delay).toEqual(-60);
  });
});
