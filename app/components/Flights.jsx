import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import styles from './Flights.css';

export default class Flight extends Component {

  static get propTypes() {
    return {
      flights: PropTypes.object,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      displayDropdown: false,
    };
  }

  render() {
    const { flights } = this.props;
    return (
      <table className={styles.flightTable}>
        <tbody>
          {flights && flights.getIn(['arrivals', 'items']).toList().map((flight) => this._renderFlight(flight))}
        </tbody>
      </table>
    );
  }

  _renderFlight(flight) {
    return (
      <tr
        className={classNames(styles.flight, {
          [styles.flight_landed]: flight.get('status').indexOf('Landed') >= 0,
        })}
      >
        <td className={styles.margin} />
        <td className={styles.scheduled}>{flight.get('scheduled')}</td>
        <td className={styles.airline}>
          <img src={`/_assets/img/${flight.get('airline').replace(' ', '').replace('.', '').toLowerCase()}.png`}></img>
        </td>
        <td className={styles.flightNum}>{flight.get('flightNum')}</td>
        <td className={styles.location}>{flight.get('location')}</td>
        <td className={styles.status}>{flight.get('status')}</td>
        <td className={styles.margin} />
      </tr>
    );
  }
}
