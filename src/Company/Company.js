import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  FlatList,
  View,
  Pressable,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Button, Text, TextInput, Provider} from 'react-native-paper';
import CompanyModal from './CompanyModal';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {actions} from './store/slice';

const Company = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const {Reducer} = useSelector(reducer => ({
    Reducer: reducer.company.company,
  }));
  const dispatch = useDispatch();
  console.log('addCompany', Reducer.companyList);

  const [companyList, setCompanyList] = React.useState();
  const [showCompanyModal, setShowCompanyModal] = React.useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    if (Reducer) {
      setCompanyList(Reducer.companyList);
    }
  }, [Reducer]);

  const onAddCompanyPressed = () => {
    setShowCompanyModal(!showCompanyModal);
  };

  const onCompanyEntered = companyName => {
    setShowCompanyModal(!showCompanyModal);
    dispatch(actions.addCompany(companyName));
  };

  return (
    <Provider>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            padding: 10,
          }}>
          <Button
            mode="contained"
            testID="buttonAddCompany"
            onPress={onAddCompanyPressed}>
            Add Company
          </Button>

          <FlatList
            style={{margin: 20}}
            data={companyList}
            testID="flatListCompanyList"
            keyExtractor={item => item.name}
            renderItem={item => {
              return (
                <Pressable
                  onPress={() => {
                    navigation.navigate('Employee List', {
                      companyObj: item.item,
                    });
                  }}>
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
                    <Text style={{fontSize: 15}}>{item.item.name}</Text>
                  </View>
                </Pressable>
              );
            }}
          />
          <CompanyModal
            isVisible={showCompanyModal}
            onCompanyEntered={onCompanyEntered}
          />
        </View>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default Company;
