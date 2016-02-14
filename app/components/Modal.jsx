import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router'

import styles from './Modal.css';

export default class Modal extends Component {

  static get propTypes() {
    return {
      type: PropTypes.string,
      flight: PropTypes.object,
      modalActions: PropTypes.object,
      flightActions: PropTypes.object,
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { flight, type } = this.props;
    return (
      <div className={styles.container} onClick={(event) => this.handleClose(event)}>
        <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
          <div className={styles.map} />
          <div className={styles.details}>
            <div
              className={styles.airlineLogo}
              style={{
                backgroundImage: `url(/_assets/img/${flight.get('airline').replace(' ', '').replace('.', '').toLowerCase()}.png)`,
              }}
            />
            <div className={styles.location}>
              {type === 'arrivals' ? flight.get('location') : 'Keflavik'}
              <div className={styles.arrow} />
              {type === 'arrivals' ? 'Keflavik' : flight.get('location')}
            </div>
            <div className={styles.flightDetails}>
              <div className={styles.flightDetails__item}>
                <div className={styles.label}>Flight no.</div>
                <div>{flight.get('flightNum')}</div>
              </div>
              <div className={styles.flightDetails__item}>
                <div className={styles.label}>Scheduled</div>
                <div>{flight.get('scheduled')}</div>
              </div>
              {flight.get('status') && (
                <div className={styles.flightDetails__item}>
                  <div className={styles.label}>Status</div>
                  <div>{flight.get('status')}</div>
                </div>
              )}
            </div>
          </div>
          <div className={styles.follow}>
            <input
              placeholder="Enter your email address..."
              className={styles.follow__input}
              autoFocus
            />
            <a
              href="#"
              onClick={(event) => this.handleFollow(event)}
              className={styles.follow__button}
            >
              Follow
            </a>
          </div>
        </div>
      </div>
    );
  }

  handleClose(event) {
    event.preventDefault();
    this.props.modalActions.close();
    browserHistory.push(`/kef/${this.props.type}`);
  }

  handleFollow(event) {
    event.preventDefault();
  }
}
