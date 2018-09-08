import React, {Component} from 'react';

import styles from './Modal.css';

export default class Modal extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div
          className={styles.modal}
          onClick={event => event.stopPropagation()}
        >
          <div style={{padding: '40px', margin: '0px'}}>
            <h2
              style={{margin: '0px', marginBottom: '20px', textAlign: 'center'}}
            >
              Flytime has closed ✌️
            </h2>
            Now you can follow flight updates on the official Keflavik Airport
            website.
            <br />
            <br />
            Thanks for being a Flytime user 🧡
          </div>
          <a
            href="https://www.isavia.is/en/keflavik-airport/flight-schedule/arrivals"
            className={styles.followButton}
          >
            Open kefairport.is
          </a>
        </div>
      </div>
    );
  }
}
