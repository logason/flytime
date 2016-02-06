import React, { Component } from 'react';
import Headroom from 'react-headroom';

import Clock from './Clock';
import styles from './Header.css';

export default class Header extends Component {

  static get propTypes() {
    return {
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      displayDropdown: false,
    };
  }

  render() {
    return (
      <Headroom>
        <div className={styles.header}>
          <a
            href="#"
            onClick={(event) => this._handleToggleTypeSelector(event)}
            className={styles.typeSelector}
          >
            <Clock />
            <div className={`${styles.type} antialiased`}>KEF Arrivals</div>
          </a>
          <input
            placeholder="Search for flight..."
            className={`${styles.search} antialiased`}
          />
        </div>
        {this.state.displayDropdown && (
          <a
            href="#"
            onClick={(event) => this._handlePickType(event)}
            className={`${styles.styleSelector} antialiased`}
          >
            Departures
          </a>
        )}
        <table className={styles.labels}>
          <thead>
            <tr>
              <td className={styles.margin} />
              <td className={styles.scheduled}>Scheduled</td>
              <td className={styles.airline}>Airline</td>
              <td className={styles.flightNum}>Flight num</td>
              <td className={styles.location}>From</td>
              <td className={styles.status}>Status</td>
              <td className={styles.margin} />
            </tr>
          </thead>
        </table>
      </Headroom>
    );
  }

  _handleToggleTypeSelector(event) {
    event.preventDefault();
    this.setState({ displayDropdown: !this.state.displayDropdown });
  }

  _handlePickType(event) {
    event.preventDefault();
    this.setState({ displayDropdown: false });
  }
}
