import React from 'react';
import {actions, initialState, reducer} from '../../src/Company/store/slice';

describe('Slice Testing', () => {
  it('should test empty slice', async () => {
    const list = initialState.companyList;
    await expect(list).toEqual([]);
  });

  it('should accept new company name', async () => {
    const companyName = 'Raj';
    const prevState = initialState;
    const cList = await reducer(prevState, actions.addCompany(companyName));
    await expect(cList).toEqual({
      companyList: [{name: companyName, savedEmployeeList: []}],
    });
  });

  it('should accept new Employee name', async () => {
    const companyName = 'Raj';
    const prevState = initialState;
    const cList = await reducer(
      await reducer(prevState, actions.addCompany(companyName)),
      actions.addEmployee({company: companyName, employee: 'Yashpal'}),
    );
    await expect(cList).toEqual({
      companyList: [{name: companyName, savedEmployeeList: ['Yashpal']}],
    });
  });

  it('should add new Employee name in Exiting List', async () => {
    const companyName = 'Raj';
    const prevState = initialState;
    const cList = await reducer(
      await reducer(prevState, actions.addCompany(companyName)),
      actions.addEmployee({company: companyName, employee: 'Yashpal'}),
    );
    const cList2 = await reducer(
      cList,
      actions.addEmployee({company: companyName, employee: 'Khushbu'}),
    );
    await expect(cList2).toEqual({
      companyList: [
        {name: companyName, savedEmployeeList: ['Yashpal', 'Khushbu']},
      ],
    });
  });
});
