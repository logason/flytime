import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from 'components/Header';
import Flights from 'components/Flights';

import * as flightActions from 'actions/flights';
import * as searchActions from 'actions/search';

import { getVisibleFlights, getCurrentFlightType } from 'selectors/flights.js';

import styles from './App.css';

@connect(state => ({
  flights: getVisibleFlights(state),
  type: getCurrentFlightType(state),
}))
export default class App extends Component {

  static get propTypes() {
    return {
      flights: PropTypes.object.isRequired,
      type: PropTypes.string.isRequired,
      dispatch: PropTypes.func.isRequired,
      params: PropTypes.object.isRequired,
    };
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(flightActions.connectData(this.props.params.type));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.type !== nextProps.params.type) {
      this.props.dispatch(flightActions.connectData(nextProps.params.type));
    }
  }

  render() {
    const { flights, dispatch } = this.props;
    const bindedFlightActions = bindActionCreators(flightActions, dispatch);
    const bindedSearchActions = bindActionCreators(searchActions, dispatch);
    return (
      <div className={styles.container}>
        <Header type={this.props.type} flightActions={bindedFlightActions} searchActions={bindedSearchActions} />
        <Flights flights={flights} actions={bindedFlightActions} />
      </div>
    );
  }
}
