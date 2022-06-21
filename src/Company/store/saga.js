import {call, put, takeLatest} from 'redux-saga/effects';
import {actions} from './slice';
import axios from 'axios';

const URL = 'https://api.npoint.io/788a515c6f65fc53bb3b';

export const getEmployeeListAPI = async () => {
  const res = await axios.get(URL);
  console.log('res----', res);
  return res;
};

// Worker Sagar
export function* fetchEmployeeList(reqData) {
  try {
    console.log('fetchEmployeeList ---', reqData);
    const res = yield call(getEmployeeListAPI);
    console.log('fetchEmployeeList --res--', res);
    if (res.data.statuscode) {
      console.log('fetchEmployeeList ---', res.data.data);
      yield put(actions.getEmployeeListSuccess(res.data.data));
    } else {
      console.log('Else ---', res.data);
    }
  } catch (error) {
    console.log(error);
  }
}

// Watcher Saga
export default function* getEmployeeListSaga() {
  yield takeLatest(actions.getEmployeeList.type, fetchEmployeeList);
}
