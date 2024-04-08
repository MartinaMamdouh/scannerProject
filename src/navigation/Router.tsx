import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ScannerScreen from '../screens/ScannerScreen';
import LoginScreen from '../screens/loginScreen';
import SignupScreen from '../screens/SignupScreen';
import DetailsScreen from '../screens/DetailsScreen';
import { RootStackParamList } from './Types';
import UserAuthContextProvider from '../context/UserAuthContext';
 
  
const Router = () => {
    const Stack = createStackNavigator<RootStackParamList>();
    const [authToken, setAuthToken] = useState(true);

  return (
    <NavigationContainer>
    <UserAuthContextProvider>
      <Stack.Navigator initialRouteName={!!authToken ? 'Home' : 'Login'}>
        
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Scanner' component={ScannerScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Signup' component={SignupScreen} />
        <Stack.Screen name='Details' component={DetailsScreen} />
      </Stack.Navigator>
    </UserAuthContextProvider>

  </NavigationContainer>
  );
};

export default Router;