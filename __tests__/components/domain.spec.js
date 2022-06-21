import React from 'react';
import {shallow} from 'enzyme';
import Domain from '../../src/Domain';
import {HelperText} from 'react-native-paper';

describe('Domain Modal', () => {
  function testID(id) {
    return component => component.props().testID === id;
  }

  describe('On Domain Submit', () => {
    const messageText = 'Effezzient';
    let handleDomainPressed;
    let wrapper;

    beforeEach(() => {
      handleDomainPressed = jest.fn();
      wrapper = shallow(<Domain onDomainEntered={handleDomainPressed} />);

      wrapper
        .findWhere(testID('domainTextInput'))
        .simulate('changeText', messageText);

      wrapper.findWhere(testID('buttonDomain')).simulate('press');
    });

    it('clear domain on submit', () => {
      expect(
        wrapper.findWhere(testID('domainTextInput')).props().value,
      ).toEqual('');
    });

    it('can handle Domain Button with Username & Password', () => {
      expect(handleDomainPressed).toHaveBeenCalledWith(messageText);
    });
  });

  describe('On Domain Submit with Invalid Data', () => {
    let handleDomainPressed;
    let wrapper;

    beforeEach(() => {
      handleDomainPressed = jest.fn();
      wrapper = shallow(<Domain onDomainEntered={handleDomainPressed} />);

      wrapper.findWhere(testID('buttonDomain')).simulate('press');
    });

    it('show empty error message', () => {
      expect(
        wrapper.contains(
          <HelperText testID="domainTextInputErrorMessage" type="error">
            Please Enter Valid Domain
          </HelperText>,
        ),
      ).toEqual(true);
    });

    it('must not handle DomainPressed Button', () => {
      expect(handleDomainPressed).not.toHaveBeenCalled();
    });
  });

  describe('On Cancel', () => {
    const messageText = 'Effezzient';
    let handleDomainPressed;
    let wrapper;

    beforeEach(() => {
      handleDomainPressed = jest.fn();
      wrapper = shallow(<Domain onDomainEntered={handleDomainPressed} />);

      wrapper
        .findWhere(testID('domainTextInput'))
        .simulate('changeText', messageText);

      wrapper.findWhere(testID('buttonDomainCancel')).simulate('press');
    });

    it('clear domain on submit', () => {
      expect(
        wrapper.findWhere(testID('domainTextInput')).props().value,
      ).toEqual('');
    });
  });
});
