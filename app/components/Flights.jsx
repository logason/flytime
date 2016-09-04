import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { browserHistory } from 'react-router';
import { StaggeredMotion, spring } from 'react-motion';
import { range } from 'lodash';

import Flight from './Flight';

import styles from './Flights.css';

export default class Flights extends Component {

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

    const springConfig = { stiffness: 600, damping: 30 };

    if (!(flights && flights.get('items').size)) {
      return (
        <table className={styles.flightTable}>
          <StaggeredMotion
            defaultStyles={range(parseInt(window.innerHeight / 75, 10)).map(() => ({ opacity: 0 }))}
            styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
              return i === 0
                ? { opacity: spring(1, springConfig) }
                : { opacity: spring(prevInterpolatedStyles[i - 1].opacity, springConfig) };
            })}
          >
            {interpolatingStyles =>
              <tbody>
                {interpolatingStyles.map((style) =>
                  this._renderLoadingFlight(style)
                )}
              </tbody>
            }
          </StaggeredMotion>
        </table>
      );
    }

    return (
      <table className={styles.flightTable}>
        <tbody>
          {flights && flights.get('items').map((flight) => {
            return (
              <Flight
                flight={flight}
                type={this.props.type}
                modalActions={this.props.modalActions}
              />
          );
          })}
        </tbody>
      </table>
    );
  }

  _renderLoadingFlight(style) {
    return (
      <tr
        style={{ opacity: style.opacity }}
        className={classNames(styles.flight, styles['flight--loading'])}
      >
        <td className={styles.margin} />
        <td className={styles.date}>
          <div className={styles.loader}></div>
        </td>
        <td className={styles.scheduled}>
          <div className={styles.loader}></div>
        </td>
        <td className={classNames(styles.airline, styles.expanded)}>
          <div className={styles.loader}></div>
        </td>
        <td className={classNames(styles.flightNum, styles.expanded)}>
          <div className={styles.loader}></div>
        </td>
        <td className={classNames(styles.location, styles.expanded)}>
          <div className={styles.loader}></div>
        </td>
        <td className={classNames(styles.status, styles.expanded)}>
          <div className={styles.loader}></div>
        </td>
        <td className={classNames(styles.details)}>
          <div className={styles.loader}></div>
        </td>
        <td className={styles.margin} />
      </tr>
    );
  }
}
