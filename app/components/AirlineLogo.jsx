import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import Img from 'react-image';

import getLogoPath from 'utils/getLogoPath';

import styles from './AirlineLogo.css';

export default class AirlineLogo extends Component {
  static get propTypes() {
    return {
      airline: PropTypes.string.isRequired
    };
  }

  render() {
    return (
      <Img
        className={styles.airlineLogo}
        src={getLogoPath(this.props.airline)}
        loader={
          <div
            className={classNames(styles.fallbackAirlineName, 'antialiased')}
          >
            {this.props.airline}
          </div>
        }
        unloader={
          <div
            className={classNames(styles.fallbackAirlineName, 'antialiased')}
          >
            {this.props.airline}
          </div>
        }
      />
    );
  }
}
