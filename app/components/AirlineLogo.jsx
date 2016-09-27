import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getLogo } from 'selectors/logos';
import * as logoActions from 'actions/logos';
import getLogoPath from 'utils/getLogoPath';

import styles from './AirlineLogo.css';

@connect(createStructuredSelector({
  isLogoAvailable: getLogo,
}))
export default class AirlineLogo extends Component {

  static get propTypes() {
    return {
      airline: PropTypes.string.isRequired,
      dispatch: PropTypes.func.isRequired,
      isLogoAvailable: PropTypes.bool,
    };
  }

  componentDidMount() {
    this.props.dispatch(logoActions.checkIfLogoExists(this.props.airline));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.airline !== this.props.airline) {
      this.props.dispatch(logoActions.checkIfLogoExists(nextProps.airline));
    }
  }

  render() {
    if (this.props.isLogoAvailable || this.props.isLogoAvailable === undefined) {
      return (
        <div
          className={styles.airlineLogo}
          style={{
            backgroundImage: `url(${getLogoPath(this.props.airline)})`,
          }}
        ></div>
      );
    }

    return (
      <div className={classNames(styles.fallbackAirlineName, 'antialiased')}>{this.props.airline}</div>
    );
  }
}
