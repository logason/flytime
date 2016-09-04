import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import request from 'superagent';

import styles from './AirlineLogo.css';

export default class AirlineLogo extends Component {

  static get propTypes() {
    return {
      airline: PropTypes.string,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      isLogoAvailable: true,
    };
  }

  componentDidMount() {
    this.setAirlineLogo(this.props.airline);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.airline !== this.props.airline) {
      this.setAirlineLogo(nextProps.airline);
    }
  }

  setAirlineLogo(airline) {
    request.head(this.getLogoPath(airline)).end((err, res) => {
      if (err || res.type === 'text/html') {
        return this.setState({ isLogoAvailable: false });
      }
      return this.setState({ isLogoAvailable: true });
    });
  }

  render() {
    if (this.state.isLogoAvailable) {
      return (
        <div
          className={styles.airlineLogo}
          style={{
            backgroundImage: `url(${this.getLogoPath(this.props.airline)})`,
          }}
        ></div>
      );
    }

    return (
      <div className={classNames(styles.fallbackAirlineName, 'antialiased')}>{this.props.airline}</div>
    );
  }

  getLogoPath(airline) {
    return `/_assets/img/${airline.replace(' ', '').replace('.', '').toLowerCase()}.png`;
  }
}
