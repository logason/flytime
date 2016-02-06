import React, { Component } from 'react';

export default class App extends Component {

  constructor(props) {
    super(props);
    const currentTime = new Date();
    this.state = {
      currentHours: currentTime.getHours(),
      currentMinutes: currentTime.getMinutes(),
    };
  }

  componentDidMount() {
    this.clockInterval = setInterval(() => {
      const currentTime = new Date();
      this.setState({
        currentHours: currentTime.getHours(),
        currentMinutes: currentTime.getMinutes(),
      });
    }, 60 * 1000);
  }

  componentWillUnmount() {
    this.clockInterval.clearInterval();
  }

  render() {
    const { currentMinutes, currentHours } = this.state;
    return (
      <svg width="36px" height="36px" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
          <g transform="translate(-90.000000, -94.000000)">
            <g transform="translate(93.000000, 97.000000)">
              <rect transform={`rotate(${(360 / 60) * currentMinutes}, 15.5, 15.5)`} fill="#fff" x="14" y="6" width="3" height="10"></rect>
              <rect transform={`rotate(${90 + (360 / 12) * currentHours}, 15.5, 15.5)`} fill="#fff" x="9" y="14" width="8" height="3"></rect>
              <path d="M15,30 C23.2842712,30 30,23.2842712 30,15 C30,6.71572875 23.2842712,0 15,0 C6.71572875,0 0,6.71572875 0,15 C0,23.2842712 6.71572875,30 15,30 Z" stroke="#fff" strokeWidth="4"></path>
              <circle fill="#fff" cx="15.5" cy="15.5" r="2.5"></circle>
            </g>
          </g>
        </g>
      </svg>
    );
  }
}
