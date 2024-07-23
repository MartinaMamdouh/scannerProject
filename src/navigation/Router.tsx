import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScanScreen from '../screens/ScanScreen';
import CameraScannerScreen from '../screens/CameraScannerScreen';
import LoginScreen from '../screens/loginScreen';
import SignupScreen from '../screens/SignupScreen';
import DetailsScreen from '../screens/DetailsScreen';
import { RootStackParamList } from './Types';
import UserAuthContextProvider from '../context/UserAuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { TOKEN_JWT } from '../config';
import ReaderScreen from '../screens/ReaderScreen';
import { InScreen } from '../screens/InScreen';
import HomeScreen from '../screens/HomeScreen';

const Router = () => {
  const Stack = createStackNavigator<RootStackParamList>();

  const [authToken, setAuthToken] = useState();
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    AsyncStorage.getItem(TOKEN_JWT).then((res: any) => {
      // console.log("res ", res);
      axios.defaults.headers.common.Authorization = res;
      setAuthToken(res);
      // console.log("auth ", authToken)
      setLoading(false);
    });
  }, []);

  if (loading) {
    return null; // Or render a loading screen
  }
  return (

    <NavigationContainer>
      <UserAuthContextProvider>
        <Stack.Navigator initialRouteName={!!authToken ? 'Home' : 'Login'}>
          {/* <Stack.Navigator initialRouteName={'Home' }>  */}
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Login' component={LoginScreen} />

          <Stack.Screen name='Scan' component={ScanScreen} />
          <Stack.Screen name='CameraScanner' component={CameraScannerScreen} />
          <Stack.Screen name='Reader' component={ReaderScreen} />
          <Stack.Screen name='Details' component={DetailsScreen} />
          <Stack.Screen name='Signup' component={SignupScreen} />
          <Stack.Screen name='In' component={InScreen} />

        </Stack.Navigator>
      </UserAuthContextProvider>

    </NavigationContainer>
  );
};

export default Router;