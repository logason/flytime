import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as flightActions from 'actions/flights';

import styles from './App.css';

@connect(state => ({
  flights: state.flights,
}))
export default class App extends Component {

  static get propTypes() {
    return {
      flights: PropTypes.object.isRequired,
      dispatch: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(flightActions.connectData('arrivals'));
  }

  render() {
    const { flights } = this.props;
    return (
      <div className={styles.container}>
        <div>
          <h1>Arrivals</h1>
          <table>
            <thead>
              <tr>
                <td></td>
                <td>Scheduled</td>
                <td>Airline</td>
                <td>Flight No</td>
                <td>From</td>
                <td>Status</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {flights && flights.getIn(['arrivals', 'items']).toList().map((flight) => {
                return (
                  <tr>
                    <td></td>
                    <td>{flight.get('scheduled')}</td>
                    <td>{flight.get('airline')}</td>
                    <td>{flight.get('flightNum')}</td>
                    <td>{flight.get('location')}</td>
                    <td>{flight.get('status')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
