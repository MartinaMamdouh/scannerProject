/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React , {useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import Router from './src/navigation/Router';
import SplashScreen from 'react-native-splash-screen';
function App(): React.JSX.Element {
  
  // setTimeout(() => {
  //   SplashScreen.hide();
  // }, 1000);
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View style={styles.container}>
   <Router/>
  </View>
  );
}

const styles = StyleSheet.create({
  // sectionContainer: {
  //   marginTop: 32,
  //   paddingHorizontal: 24,
  // },
container:{
  flex:1,
  backgroundColor:'white'
}
});

export default App;
