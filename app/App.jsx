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

  handleAddFlight(event, type) {
    event.preventDefault();
    this.props.dispatch(flightActions.add('hello-world', type));
  }

  render() {
    const { flights } = this.props;
    return (
      <div className={styles.container}>
        <div>
          <h1>Arrivals</h1>
          <ul>
            {flights && flights.getIn(['arrivals', 'items']).toList().map((flight) => {
              return (
                <li>{flight.get('flightNum')}</li>
              );
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
            {flights && flights.getIn(['departures', 'items']).toList().map((flight) => {
              return (
                <li>{flight.get('flightNum')}</li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
