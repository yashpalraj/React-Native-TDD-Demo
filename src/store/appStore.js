import {configureStore} from '@reduxjs/toolkit';

import createSagaMiddleware from 'redux-saga';
import {createInjectorsEnhancer} from 'redux-injectors';
import rootReducer from './rootReducer';

const sagaMiddleware = createSagaMiddleware({});

const runSaga = sagaMiddleware.run;

const enhancers = [
  createInjectorsEnhancer({
    createReducer: rootReducer,
    runSaga,
  }),
];

const appStore = configureStore({
  reducer: rootReducer(),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),

  preloadedState: {},
  enhancers,
});

export default appStore;
