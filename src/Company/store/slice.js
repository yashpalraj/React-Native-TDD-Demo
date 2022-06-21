import {createSlice} from '@reduxjs/toolkit';

export const initialState = {
  companyList: [],
};

export const slice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    addCompany(state, action) {
      state.companyList = [
        ...state.companyList,
        {name: action.payload, savedEmployeeList: []},
      ];
    },

    getEmployeeList(state) {},

    getEmployeeListSuccess(state, action) {
      console.log('action----', action);

      if (state.companyList.length > 0) {
        const updatedArray = state.companyList.map(element => {
          if (element.name === 'Raj') {
            return {
              ...element,
              savedEmployeeList: [
                ...element.savedEmployeeList,
                ...action.payload,
              ],
            };
          } else {
            return element;
          }
        });
        state.companyList = updatedArray;
      } else {
        state.companyList = [
          ...state.companyList,
          {name: 'Raj', savedEmployeeList: [...action.payload]},
        ];
      }
    },

    addEmployee(state, action) {
      const updatedArray = state.companyList.map(element => {
        if (element.name === action.payload.company) {
          return {
            ...element,
            savedEmployeeList: [
              ...element.savedEmployeeList,
              action.payload.employee,
            ],
          };
        } else {
          return element;
        }
      });
      state.companyList = updatedArray;
    },

    reset(state) {
      state.companyList = [];
    },
  },
});

export const {name, reducer, actions} = slice;
