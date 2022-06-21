import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Provider} from 'react-redux';
import Company from './Company/Company';
import {Provider as PaperProvider} from 'react-native-paper';
import appStore from './store/appStore';
import EmployeeList from './Employee/EmployeeList';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={appStore}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Company List"
              component={Company}></Stack.Screen>
            <Stack.Screen
              name="Employee List"
              component={EmployeeList}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
