import React, { Component, PropTypes } from 'react';
import Headroom from 'react-headroom';
import { Link } from 'react-router';

import Clock from './Clock';
import styles from './Header.css';

export default class Header extends Component {

  static get propTypes() {
    return {
      type: PropTypes.string.isRequired,
      searchActions: PropTypes.object.isRequired,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      displayDropdown: false,
    };
  }

  render() {
    const { type } = this.props;
    return (
      <Headroom>
        <div className={styles.header}>
          <a
            href="#"
            onClick={(event) => this._handleToggleTypeSelector(event)}
            className={styles.typeSelector}
          >
            <Clock />
            <div className={`${styles.type} antialiased`}>KEF {type === 'arrivals' ? 'Arrivals' : 'Departures'}</div>
          </a>
          <input
            placeholder="Search for flight..."
            className={`${styles.search} antialiased`}
            onChange={(event) => this._handleSearch(event)}
          />
        </div>
        {this.state.displayDropdown && (
          <Link
            to={`/kef/${type === 'arrivals' ? 'departures' : 'arrivals'}`}
            onClick={() => this._handlePickType()}
            className={`${styles.typeDropdown} antialiased`}
          >
            {type === 'arrivals' ? 'KEF Departures' : 'KEF Arrivals'}
          </Link>
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

  _handlePickType() {
    this.setState({ displayDropdown: false });
  }

  _handleSearch(event) {
    this.props.searchActions.search(event.target.value);
  }
}
