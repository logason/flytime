import React, {Component, PropTypes} from 'react';
import {TransitionMotion, spring} from 'react-motion';

import Header from 'components/Header';
import Flights from 'components/Flights';
import ClosedModal from 'components/ClosedModal';
import ScrollLock from 'components/ScrollLock';

import styles from './App.css';

export default class App extends Component {
  render() {
    return (
      <div className={styles.container} style={{overflow: 'hidden'}}>
        <div className={styles.content}>
          <Header />
          <Flights />
        </div>
        <div className={styles.modalContainer}>
          <ScrollLock>
            <TransitionMotion
              styles={() => {
                return true
                  ? [
                      {
                        key: 'modal',
                        style: {
                          opacity: spring(1),
                          y: spring(0, {stiffness: 230, damping: 20})
                        }
                      }
                    ]
                  : [];
              }}
              willEnter={() => ({opacity: 0.7, y: -50})}
              willLeave={() => ({
                opacity: spring(0, {stiffness: 400, damping: 20}),
                y: spring(-50, {stiffness: 400, damping: 20})
              })}
            >
              {values => (
                <div>
                  {values.map(({key, style, data}) => (
                    <div
                      key={key}
                      style={{
                        opacity: style.opacity
                      }}
                    >
                      <ClosedModal
                        style={{
                          transform: `translateY(${style.y}%)`
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </TransitionMotion>
          </ScrollLock>
        </div>
      </div>
    );
  }
}
