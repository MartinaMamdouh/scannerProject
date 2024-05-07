/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import Router from './src/navigation/Router';
import SplashScreen from 'react-native-splash-screen';
function App(): React.JSX.Element {
  
  setTimeout(() => {
    SplashScreen.hide();
  }, 1000);

  return (
   <Router/>
  );
}

const styles = StyleSheet.create({
  // sectionContainer: {
  //   marginTop: 32,
  //   paddingHorizontal: 24,
  // },

});

export default App;
