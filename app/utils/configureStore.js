import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from 'reducers';

export default (initialState) => {
  const middleware = [thunk];
  const finalCreateStore = applyMiddleware(...middleware)(createStore);
  return finalCreateStore(rootReducer, initialState);
}
