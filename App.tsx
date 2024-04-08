/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StyleSheet} from 'react-native';
import Router from './src/navigation/Router';

function App(): React.JSX.Element {
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
