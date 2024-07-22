import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/Types';
import { NavigationProp } from '@react-navigation/native';
import { useAuth } from '../context/UserAuthContext';
import { USER_NAME } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { logOut } = useAuth();

  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      const username = await AsyncStorage.getItem(USER_NAME);
      setUserName(username || '');
    };

    fetchUserName();
  }, []);
  const navigateToScanner = () => {
    navigation.navigate('CameraScanner');
  };
  const navigateToReader = () => {
    navigation.navigate('Reader');
  };
  const navigateToLogin = () => {
    logOut();
    navigation.navigate('Login');
  };
  const navigateToSignup = () => {
    navigation.navigate('Signup');
  };

  return (

    <View style={styles.container}>
      <Text style={styles.usernameTitle}>Welcome {userName}</Text>
      <Text style={{ fontSize: 15 }}> QR Code Scanner App!</Text>

      <View style={styles.space} />
      <Button title="Scan QR Code Using Camera" onPress={navigateToScanner} />
      <View style={styles.space} />
      <Button title="Scan QR Code Using Reader" onPress={navigateToReader} />
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
  usernameTitle: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  }
});

export default HomeScreen;
