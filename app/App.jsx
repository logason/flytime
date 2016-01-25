import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import * as flightActions from 'actions/flights';

import styles from './App.css';

@connect(state => ({
  flights: state.flights,
}))
export default class App extends Component {

  static get propTypes() {
    return {
      flights: PropTypes.object.isRequired,
    };
  };

  render() {
    const {flights} = this.props;
    console.log('props', this.props.flights.toJS());
    return (
      <div className={styles.container}>
        <div>
          <h1>Arrivals</h1>
          <ul>
            {flights && flights.get('arrivals').toList().map((flight) => {
              <li>flight.get('flightNum')</li>
            })}
          </ul>
          <a
            href="#"
            onClick={(event) => this.handleAddFlight(event, 'arrivals')}
          >
            Add
          </a>
        </div>
        <div>
          <h1>Departures</h1>
          <ul>
            {flights && flights.get('departures').toList().map((flight) => {
              <li>flight.get('flightNum')</li>
            })}
          </ul>
        </div>
      </div>
    );
  };

  handleAddFlight(event, type) {
    event.preventDefault();
    this.props.dispatch(flightActions.add('hello-world', type));
  }
}
