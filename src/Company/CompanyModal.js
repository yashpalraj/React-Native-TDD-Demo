import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {TextInput, Button, Portal, Modal, HelperText} from 'react-native-paper';

const CompanyModal = props => {
  const {isVisible, onCompanyEntered} = props;
  const [company, setCompany] = useState('');
  const [companyErrorMessage, setCompanyErrorMessage] = useState('');
  const [showCompanyModal, setShowCompanyModal] = useState(isVisible);

  useEffect(() => {
    setShowCompanyModal(isVisible);
  }, [isVisible]);

  const onCompanyPressed = () => {
    if (company.length > 0) {
      onCompanyEntered(company);
      setCompany('');
      setShowCompanyModal(false);
      setCompanyErrorMessage('');
    } else {
      setCompanyErrorMessage('Please Enter Valid Company');
    }
  };

  const onCompanyCancel = () => {
    setCompany('');
    setShowCompanyModal(false);
  };
  return (
    <Portal>
      <Modal
        style={{margin: 10}}
        visible={showCompanyModal}
        onDismiss={() => {
          setShowCompanyModal(false);
        }}
        contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
        <View>
          <TextInput
            label="Company"
            testID="companyTextInput"
            value={company}
            onChangeText={text => setCompany(text)}
          />
          <HelperText testID="companyTextInputErrorMessage" type="error">
            {companyErrorMessage}
          </HelperText>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Button
              mode="contained"
              testID="buttonCompanySave"
              onPress={onCompanyPressed}>
              Enter Company
            </Button>

            <Button
              mode="contained"
              testID="buttonCompanyCancel"
              onPress={onCompanyCancel}>
              Cancel
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};
export default CompanyModal;
