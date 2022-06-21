import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {useInjectSaga} from 'redux-injectors';
import AddEmployeeModal from './AddEmployeeModal';
import getEmployeeListSaga from '../Company/store/saga';
import {actions, name} from '../Company/store/slice';

const EmployeeList = ({navigation, route}) => {
  const {companyObj} = route.params;
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);

  useInjectSaga({key: name, saga: getEmployeeListSaga});

  const {Reducer} = useSelector(reducer => ({
    Reducer: reducer.company.company,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getEmployeeList());
  }, []);

  useEffect(() => {
    // Reducer.companyList.forEach(element => {
    //   if (element.name === companyObj.name) {
    //     setEmployeeList([...element.savedEmployeeList]);
    //   }
    // });

    if (Reducer.companyList) {
      Reducer.companyList.forEach(element => {
        if (element.name === companyObj.name) {
          setEmployeeList([...element.savedEmployeeList]);
        }
      });
    }
  }, [Reducer.companyList]);

  const onEmployeeButtonClick = () => {
    setShowEmployeeModal(!showEmployeeModal);
  };

  const onEmployeeEntered = enteredEmployee => {
    // const list = employeeList;
    // list.push(enteredEmployee);
    // setEmployeeList(list);

    // dispatch(
    //   actions.addEmployee({
    //     name: companyObj.name,
    //     savedEmployeeList: [...companyObj.savedEmployeeList, enteredEmployee],
    //   }),
    // );

    dispatch(
      actions.addEmployee({
        company: companyObj.name,
        employee: enteredEmployee,
      }),
    );
    setShowEmployeeModal(!showEmployeeModal);
  };

  return (
    <SafeAreaView>
      <Text style={{alignSelf: 'center', margin: 10, fontSize: 18}}>
        {companyObj.name}
      </Text>
      <Button
        style={{margin: 10}}
        mode="contained"
        testID="newEmployeeButton"
        onPress={onEmployeeButtonClick}>
        Add Employee
      </Button>
      <AddEmployeeModal
        isVisible={showEmployeeModal}
        onEmployeeEntered={onEmployeeEntered}
      />
      {employeeList.length > 0 && (
        <FlatList
          style={{margin: 20}}
          data={employeeList}
          keyExtractor={item => item}
          renderItem={item => {
            return (
              <View
                style={{
                  borderColor: '#000000',
                  borderRadius: 10,
                  borderWidth: 2,
                  marginVertical: 10,
                  marginHorizontal: 5,
                  padding: 5,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <Text style={{fontSize: 15}}>{item.item}</Text>
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default EmployeeList;
