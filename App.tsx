/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import ScannerScreen from './src/screens/ScannerScreen';
import LoginScreen from './src/screens/loginScreen';
import SignupScreen from './src/screens/SignupScreen';
import UserAuthContextProvider from './src/context/UserAuthContext';
import DetailsScreen from './src/screens/DetailsScreen';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
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
}

const styles = StyleSheet.create({
  // sectionContainer: {
  //   marginTop: 32,
  //   paddingHorizontal: 24,
  // },

});

export default App;
