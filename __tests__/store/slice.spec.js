import React from 'react';
import {
  reducer,
  slice,
  initialState,
  actions,
} from '../../src/domainStore/slice';
describe('Slice Testing', () => {
  it('empty domainList', async () => {
    const dList = initialState.domainList;
    await expect(dList).toEqual([]);
  });
  it('add new Domain Name', async () => {
    const name = 'New Domain';
    const prevState = initialState;
    const dList = reducer(prevState, actions.addDomain(name));
    await expect(dList).toEqual({
      domainList: [{name: name, savedURLList: []}],
    });
  });
  it('add new URL in empty List', async () => {
    const name = 'New Domain';
    const prevState = initialState;
    const dList = reducer(prevState, actions.addDomain(name));
    await expect(
      reducer(dList, actions.addURL({domain: name, url: 'www.gmail.com'})),
    ).toEqual({
      domainList: [{name: name, savedURLList: ['www.gmail.com']}],
    });
  });
  it('add new URL in exitsing List', async () => {
    const name = 'New Domain';
    const prevState = initialState;
    const dList = await reducer(
      await reducer(prevState, actions.addDomain(name)),
      actions.addURL({domain: name, url: 'www.gmail.com'}),
    );
    await expect(
      reducer(dList, actions.addURL({domain: name, url: 'www.google.com'})),
    ).toEqual({
      domainList: [
        {name: name, savedURLList: ['www.gmail.com', 'www.google.com']},
      ],
    });
  });
});
