import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/Types';
import { NavigationProp } from '@react-navigation/native';

const HomeScreen = () => {

  const navigation =useNavigation<NavigationProp<RootStackParamList>>();

  const navigateToScanner = () => {
    navigation.navigate('Scanner');
  };
  const navigateToLogin = () => {
    navigation.navigate('Login');
  };
  const navigateToSignup = () => {
    navigation.navigate('Signup');
  };
  return (
    <View style={styles.container}>
      <Text>Welcome to QR Code Scanner App!</Text>
      <View style={styles.space} />
      <Button title="Scan QR Code" onPress={navigateToScanner} />     
      <View style={styles.space} />
      <Button title="Logout" onPress={navigateToLogin} />
      {/* <View style={styles.space} />
      <Button title="signup" onPress={navigateToSignup} /> */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  space: {
    height: 10, 
  },
});

export default HomeScreen;
