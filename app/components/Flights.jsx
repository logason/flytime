import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { browserHistory } from 'react-router';

import styles from './Flights.css';

export default class Flight extends Component {

  static get propTypes() {
    return {
      flights: PropTypes.object,
      type: PropTypes.string,
      modalActions: PropTypes.object,
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
          {flights && flights.get('items').map((flight) => this._renderFlight(flight))}
        </tbody>
      </table>
    );
  }

  _renderFlight(flight) {
    const now = new Date();
    const flightDay = flight.get('date').split('. ')[0];
    const isToday = now.getDate() === parseInt(flightDay, 10);
    const airlineLogo = `/_assets/img/${flight.get('airline').replace(' ', '').replace('.', '').toLowerCase()}.png`;

    return (
      <tr
        key={flight.get('id')}
        className={classNames(styles.flight, {
          [styles.flight_over]: flight.get('isOver'),
        })}
        onClick={() => this._handleOpenFlight(flight.get('isOver'), flight.get('id'))}
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
        <td className={classNames(styles.airline, styles.expanded)}>
          <img src={airlineLogo}></img>
        </td>
        <td className={classNames(styles.flightNum, styles.expanded)}>{flight.get('flightNum')}</td>
        <td className={classNames(styles.location, styles.expanded)}>{flight.get('location')}</td>
        <td className={classNames(styles.status, styles.expanded)}>{flight.get('status')}</td>
        <td className={classNames(styles.details)}>
          <div className={styles.detailsRow}>
            <div className={styles.airline}><img src={airlineLogo}></img></div>
            <div className={styles.flightNum}>{flight.get('flightNum')}</div>
          </div>
          <div className={styles.location}>{flight.get('location')}</div>
          <div className={styles.status}>{flight.get('status')}</div>
        </td>
        <td className={styles.margin} />
      </tr>
    );
  }

  _handleOpenFlight(isOver, flightId) {
    if (isOver) {
      return;
    }
    browserHistory.push(`/kef/${this.props.type}/${flightId}`);
    this.props.modalActions.open({ flightId, flightType: this.props.type });
  }
}
