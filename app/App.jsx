import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from './components/Header';
import Flights from './components/Flights';
import * as flightActions from 'actions/flights';

import styles from './App.css';

@connect(state => ({
  flights: state.flights,
}))
export default class App extends Component {

  static get propTypes() {
    return {
      flights: PropTypes.object.isRequired,
      dispatch: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(flightActions.connectData('arrivals'));
  }

  render() {
    const { flights } = this.props;
    return (
      <div className={styles.container}>
        <Header />
        <Flights flights={flights} />
      </div>
    );
  }
}
