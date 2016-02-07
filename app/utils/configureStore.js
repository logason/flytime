import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from 'reducers';
import DevTools from '../DevTools';

export default (initialState) => {
  const middlewares = [thunk];

  let finalCreateStore;
  if (__DEV__) {
    finalCreateStore = compose(
      applyMiddleware(...middlewares),
      DevTools.instrument(),
    )(createStore);
  } else {
    finalCreateStore = applyMiddleware(...middlewares)(createStore);
  }

  const store = finalCreateStore(rootReducer, initialState);

  if (__DEV__) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    );
  }

  return store;
};
