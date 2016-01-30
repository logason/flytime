'use strict';

const expect = require('expect');
const sortFlights = require('../sortFlights');

describe('sortFlights', () => {
  it('should sort the flights by their id', () => {
    const flights = [
      {
        flightNum: 'FI002',
        id: '2',
      },
      {
        flightNum: 'FI004',
        id: '4',
      },
      {
        flightNum: 'FI001',
        id: '1',
      },
      {
        flightNum: 'FI003',
        id: '3',
      },
    ];

    const sortedFlights = sortFlights(flights);
    expect(sortedFlights[0].flightNum).toEqual('FI001');
    expect(sortedFlights[1].flightNum).toEqual('FI002');
    expect(sortedFlights[2].flightNum).toEqual('FI003');
    expect(sortedFlights[3].flightNum).toEqual('FI004');
  });
});
