import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import classNames from 'classnames';
import { TransitionMotion, spring } from 'react-motion';

import Header from 'components/Header';
import Flights from 'components/Flights';
import Modal from 'components/Modal';
import ScrollLock from 'components/ScrollLock';

import * as flightActions from 'actions/flights';
import * as searchActions from 'actions/search';
import * as modalActions from 'actions/modals';

import { getVisibleFlights, getCurrentFlightType } from 'selectors/flights.js';
import { getModal } from 'selectors/modal.js';

import styles from './App.css';

@connect(createStructuredSelector({
  flights: getVisibleFlights,
  type: getCurrentFlightType,
  modal: getModal,
}))
export default class App extends Component {

  static get propTypes() {
    return {
      flights: PropTypes.object.isRequired,
      type: PropTypes.string.isRequired,
      modal: PropTypes.object,
      dispatch: PropTypes.func.isRequired,
      params: PropTypes.object.isRequired,
    };
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(flightActions.connectData(this.props.params.type));

    if (this.props.params.flightId) {
      const { flightId, type } = this.props.params;
      this.props.dispatch(modalActions.open({ flightId, flightType: type }));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.type !== nextProps.params.type) {
      this.props.dispatch(flightActions.connectData(nextProps.params.type));
    }
  }

  render() {
    const { flights, modal, type, dispatch } = this.props;
    const bindedFlightActions = bindActionCreators(flightActions, dispatch);
    const bindedSearchActions = bindActionCreators(searchActions, dispatch);
    const bindedModalActions = bindActionCreators(modalActions, dispatch);
    return (
      <div className={styles.container} style={{ overflow: modal ? 'hidden' : 'auto' }}>
        <div
          className={classNames(styles.content, {
            [styles.blur]: modal,
          })}
        >
          <Header
            type={this.props.type}
            searchActions={bindedSearchActions}
          />
          <Flights flights={flights} type={type} modalActions={bindedModalActions} />
        </div>
        <ScrollLock>
          <TransitionMotion
            styles={() => {
              return modal ? [{
                key: 'modal',
                data: { flight: modal.get('flight') },
                style: {
                  opacity: spring(1),
                  zoom: spring(1, { stiffness: 230, damping: 20 }),
                },
              }] : [];
            }}
            willEnter={() => ({ opacity: 0.7, zoom: 0.8 })}
            willLeave={() => ({
              opacity: spring(0, { stiffness: 400, damping: 20 }),
              zoom: spring(0.8, { stiffness: 400, damping: 20 }),
            })}
          >
            {values =>
              <div>
                {values.map(({ key, style, data }) =>
                  <div
                    style={{
                      zoom: style.zoom,
                      opacity: style.opacity,
                    }}
                  >
                    <Modal
                      key={key}
                      flight={data.flight}
                      type={type}
                      modalActions={bindedModalActions}
                      flightActions={bindedFlightActions}
                    />
                  </div>
                )}
              </div>
            }
          </TransitionMotion>
        </ScrollLock>
      </div>
    );
  }
}
