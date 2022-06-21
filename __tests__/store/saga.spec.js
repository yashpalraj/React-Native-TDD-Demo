import React from 'react';
import {describe} from '@jest/globals';
import {expectSaga} from 'redux-saga-test-plan';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import getURLListSaga, {getURLListAPI} from '../../src/domainStore/saga';
import {actions, slice} from '../../src/domainStore/slice';

const URL = 'https://api.npoint.io/37edc2a99c964ca5d869';
const mock = new MockAdapter(axios);
const rrnVal = {
  data: [
    'www.youtube.com',
    'www.facebook.com',
    'www.amazon.com',
    'www.myntra.com',
  ],
  statuscode: true,
};

describe('test saga', () => {
  it('must test getURLListSaga', async () => {
    return await expectSaga(getURLListSaga)
      .withReducer(slice.reducer)
      .provide({
        async call(effect, next) {
          // Check for the API call to return fake value

          if (effect.fn === getURLListAPI) {
            await mock.reset();
            await mock.onGet(URL).reply(200, rrnVal);
            const res = await axios.get(URL);
            return res;
          }
          // Allow Redux Saga to handle other `call` effects
          return next();
        },
      })
      // .provide([[call(getURLListAPI, {isMock: true})]])
      .put({type: actions.getURLListSuccess.type, payload: rrnVal.data})
      .dispatch({type: actions.getURLList.type, payload: {isMock: false}})
      .hasFinalState({
        domainList: [
          {
            name: 'Raj',
            savedURLList: rrnVal.data,
          },
        ],
      })
      .silentRun();
  });
});
