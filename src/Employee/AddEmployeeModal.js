import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {TextInput, Button, Portal, Modal, HelperText} from 'react-native-paper';

const AddEmployeeModal = props => {
  const {isVisible, onEmployeeEntered} = props;
  const [employee, setEmployee] = useState('');
  const [employeeErrorMessage, setEmployeeErrorMessage] = useState('');
  const [showEmployeeModal, setShowEmployeeModal] = useState(isVisible);

  useEffect(() => {
    setShowEmployeeModal(isVisible);
  }, [isVisible]);

  const onEmployeePressed = () => {
    if (employee.length > 0) {
      onEmployeeEntered(employee);
      setEmployee('');
      setShowEmployeeModal(false);
      setEmployeeErrorMessage('');
    } else {
      setEmployeeErrorMessage('Please Enter Employee Name');
    }
  };

  const onEmployeeCancel = () => {
    setEmployee('');
    setShowEmployeeModal(false);
  };
  return (
    <Portal>
      <Modal
        style={{margin: 10}}
        visible={showEmployeeModal}
        onDismiss={() => {
          setShowEmployeeModal(false);
        }}
        contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
        <View>
          <TextInput
            label="Employee"
            testID="employeeTextInput"
            value={employee}
            onChangeText={text => setEmployee(text)}
          />
          <HelperText testID="employeeTextInputErrorMessage" type="error">
            {employeeErrorMessage}
          </HelperText>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Button
              mode="contained"
              testID="buttonEmployee"
              onPress={onEmployeePressed}>
              Enter Employee
            </Button>

            <Button
              mode="contained"
              testID="buttonEmployeeCancel"
              onPress={onEmployeeCancel}>
              Cancel
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};
export default AddEmployeeModal;
