import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import classNames from 'classnames';
import Headroom from 'react-headroom';
import { Link } from 'react-router';

import Clock from './Clock';
import SearchIcon from './SearchIcon';
import XIcon from './XIcon';
import styles from './Header.css';

@connect(createStructuredSelector({
  searchQuery: (state) => state.search.get('query'),
}))
export default class Header extends Component {

  static get propTypes() {
    return {
      type: PropTypes.string.isRequired,
      searchActions: PropTypes.object.isRequired,
      searchQuery: PropTypes.string,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      displayDropdown: false,
      displaySearch: false,
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
          <a
            href="#"
            onClick={(event) => this._handleShowSearch(event)}
            className={styles.toggleSearch}
          >
            <SearchIcon
              className={styles.searchIcon}
              circleClassName={styles.searchIconCircle}
              rectClassName={styles.searchIconRect}
            />
        </a>
        <div
          className={classNames(styles.search, {
            [styles['search--active']]: this.state.displaySearch,
          })}
        >
          <input
            placeholder="Search for flight..."
            className={`${styles.searchInput} antialiased`}
            onChange={(event) => this._handleSearch(event)}
            value={this.props.searchQuery || ''}
            ref={(node) => (this.input = node)}
          />
          <a
            href="#"
            className={styles.clearSearch}
            onClick={(event) => this._handleClearSearch(event)}
          >
            <XIcon
              className={styles.closeIcon}
              shapeClassName={styles.closeIconShape}
            />
          </a>
        </div>
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
              <td className={styles.flightNum}>Flight</td>
              <td className={styles.location}>From</td>
              <td className={styles.status}>Status</td>
              <td className={styles.details}>Details</td>
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

  _handleShowSearch(event) {
    event.preventDefault();
    this.setState({
      displayDropdown: false,
      displaySearch: true,
    });
    this.input.focus();
  }

  _handleClearSearch(event) {
    event.preventDefault();
    this.setState({ displaySearch: false });
    this.props.searchActions.clear();
  }

  _handlePickType() {
    this.setState({ displayDropdown: false });
  }

  _handleSearch(event) {
    this.props.searchActions.search(event.target.value);
  }
}
