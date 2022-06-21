import {combineReducers} from '@reduxjs/toolkit';
import {reducer as company} from './slice';

const companyReducers = combineReducers({
  company,
});

export default companyReducers;
