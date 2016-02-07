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
          {flights && flights.map((flight) => this._renderFlight(flight))}
        </tbody>
      </table>
    );
  }

  _renderFlight(flight) {
    const now = new Date();
    const flightDay = flight.get('date').split('. ')[0];
    const isToday = now.getDate() === parseInt(flightDay, 10);

    return (
      <tr
        key={flight.get('id')}
        className={classNames(styles.flight, {
          [styles.flight_over]: flight.get('isOver'),
        })}
      >
        <td className={styles.margin} />
        <td className={styles.date}>
          {isToday ? (
            <div className={styles.date__today}>Today</div>
          ) : (
            <span>
              <div className={styles.date__day}>{flight.get('date').split('. ')[0]}</div>
              <div className={styles.date__month}>{flight.get('date').split('. ')[1]}</div>
            </span>
          )}
        </td>
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
