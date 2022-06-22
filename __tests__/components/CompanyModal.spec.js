import React from 'react';
import {shallow} from 'enzyme';
import CompanyModal from '../../src/Company/CompanyModal';
import {HelperText} from 'react-native-paper';

describe('Test Company Pop Up Modal', () => {
  function testID(id) {
    return component => component.props().testID === id;
  }

  describe('should allow to add a company', () => {
    let handleAddCompanyPressed;
    let wrapper;

    beforeEach(() => {
      handleAddCompanyPressed = jest.fn();
      wrapper = shallow(
        <CompanyModal onCompanyEntered={handleAddCompanyPressed} />,
      );
      wrapper
        .findWhere(testID('companyTextInput'))
        .simulate('changeText', 'Raj');

      wrapper.findWhere(testID('buttonCompanySave')).simulate('press');
    });

    it('should handle add compamny button', () => {
      expect(handleAddCompanyPressed).toHaveBeenCalledWith('Raj');
    });

    it('should clear the textfield after adding company', () => {
      expect(
        wrapper.findWhere(testID('companyTextInput')).props().value,
      ).toEqual('');
    });
  });

  describe('should validate a company', () => {
    let handleAddCompanyPressed;
    let wrapper;

    beforeEach(() => {
      handleAddCompanyPressed = jest.fn();
      wrapper = shallow(
        <CompanyModal onCompanyEntered={handleAddCompanyPressed} />,
      );

      wrapper.findWhere(testID('buttonCompanySave')).simulate('press');
    });

    it('should show empty error message', () => {
      expect(
        wrapper.contains(
          <HelperText testID="companyTextInputErrorMessage" type="error">
            Please Enter Valid Company
          </HelperText>,
        ),
      ).toEqual(true);
    });

    it('should not handle add compamny button', () => {
      expect(handleAddCompanyPressed).not.toHaveBeenCalled();
    });
  });

  describe('should empty text on cancel', () => {
    let handleAddCompanyPressed;
    let wrapper;

    beforeEach(() => {
      handleAddCompanyPressed = jest.fn();
      wrapper = shallow(
        <CompanyModal onCompanyEntered={handleAddCompanyPressed} />,
      );
      wrapper
        .findWhere(testID('companyTextInput'))
        .simulate('changeText', 'Raj');

      wrapper.findWhere(testID('buttonCompanyCancel')).simulate('press');
    });

    it('should clear the textfield after adding company', () => {
      expect(
        wrapper.findWhere(testID('companyTextInput')).props().value,
      ).toEqual('');
    });
  });
});
