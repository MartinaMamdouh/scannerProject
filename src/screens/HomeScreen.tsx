import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/Types';
import { NavigationProp } from '@react-navigation/native';
import { useAuth } from '../context/UserAuthContext';
import { TOKEN_JWT, USER_NAME } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { logOut } = useAuth();

  const [userName, setUserName] = useState('');
  const [token, setToken] = useState('');
  useEffect(() => {
    const fetchUserName = async () => {
      const username = await AsyncStorage.getItem(USER_NAME);
      setUserName(username || '');
    };

    fetchUserName();
 
  // const fetchToken = async () => {
  //   const token = await AsyncStorage.getItem(TOKEN_JWT);
  //   setToken(token || '');
  // };

  // fetchToken();
}, []);
  const navigateToScan = (direction:string) => {
    navigation.navigate('Reader',{direction});
  };
  const navigateToLogin = () => {
    logOut();
    navigation.navigate('Login');
  };
 

  return (

    <View style={styles.container}>
      <Text style={styles.usernameTitle}>Welcome {userName}</Text>
      {/* <Text style={styles.usernameTitle}> {token}</Text> */}
      <Text style={{ fontSize: 15 }}> QR Code Scanner App!</Text>

      <View style={styles.space} />
      <Button title="Enter The Event" onPress={() => navigateToScan('in')} />
      <View style={styles.space} />
      <Button title="Leave The Event" onPress={() => navigateToScan('out')} />
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
