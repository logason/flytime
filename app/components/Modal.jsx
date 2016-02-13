import React, { Component, PropTypes } from 'react';

import styles from './Modal.css';

export default class Modal extends Component {

  static get propTypes() {
    return {
      modal: PropTypes.object,
      modalActions: PropTypes.object,
      flightActions: PropTypes.object,
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { flight, flightActions } = this.props;
    return (
      <div className={styles.container} onClick={(event) => this.handleClose(event)}>
        <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        </div>
      </div>
    );
  }

  handleClose(event) {
    event.preventDefault();
    this.props.modalActions.close();
  }
}
