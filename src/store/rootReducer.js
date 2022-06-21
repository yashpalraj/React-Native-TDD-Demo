import {combineReducers} from '@reduxjs/toolkit';
import companyReducers from '../Company/store';

const createReducer = asyncReducers =>
  combineReducers({
    ...asyncReducers,
    company: companyReducers,
  });
export default createReducer;
