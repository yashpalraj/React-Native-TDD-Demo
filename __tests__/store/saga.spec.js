import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {expectSaga} from 'redux-saga-test-plan';
import {
  fetchEmployeeList,
  getEmployeeListAPI,
} from '../../src/Company/store/saga';
import {actions, slice} from '../../src/Company/store/slice';

const URL = 'https://api.npoint.io/788a515c6f65fc53bb3b';
const mock = new MockAdapter(axios);
const mockResponse = {
  data: ['Yashpal', 'KhushbuRaj'],
  statuscode: true,
};

describe('Test Saga', () => {
  it('should fgetch employee list from API', async () => {
    return expectSaga(fetchEmployeeList)
      .withReducer(slice.reducer)
      .provide({
        async call(effect, next) {
          // Check for the API call to return fake value

          if (effect.fn === getEmployeeListAPI) {
            await mock.reset();
            await mock.onGet(URL).reply(200, mockResponse);
            const res = await axios.get(URL);
            return res;
          }
          // Allow Redux Saga to handle other `call` effects
          return next();
        },
      })
      .put({
        type: actions.getEmployeeListSuccess.type,
        payload: mockResponse.data,
      })
      .dispatch({type: actions.getEmployeeList.type})
      .hasFinalState({
        companyList: [{name: 'Raj', savedEmployeeList: mockResponse.data}],
      })
      .silentRun();
  });
});
