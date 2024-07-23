import React, { createContext, useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, GestureResponderEvent, ActivityIndicator } from 'react-native';
import { UserAuthContext, useAuth } from '../context/UserAuthContext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { RootStackParamList } from '../navigation/Types';
import { NavigationProp } from '@react-navigation/native';
import RNFS from 'react-native-fs';
import https from 'https';
import RNFetchBlob from 'rn-fetch-blob';
import { NativeModules } from 'react-native';
import { LoginAPI } from '../APIs';

interface ILogin {
  username: string;
  password: string;
}

const LoginScreen = () => {

  // const certFile = RNFS.readFile(RNFS.DocumentDirectoryPath + '/dmzcer.csr', 'utf8');
  // const privateKey = RNFS.readFile(RNFS.DocumentDirectoryPath + '/dmzcer.p8.pem', 'utf8');
  // const certFile = require('../../android/app/src/main/assets/dmzcer.csr');
  // const privateKey = require('../../android/app/src/main/assets/dmzcer.p8.pem'); 

  // const certFile = await RNFS.readFile(RNFS.DocumentDirectoryPath + '/dmzcer.csr', 'utf8');
  // const privateKey = await RNFS.readFile(RNFS.DocumentDirectoryPath + '/dmzcer.p8.pem', 'utf8');

  // let httpsAgent;
  // const fs = require('react-native-fs');
  // const https = require('react-native-https');

  // const cert = fs.readFileSync(certFile);
  // const key = fs.readFileSync(privateKey);

  // const certBuffer = Buffer.from(certFile);
  // const keyBuffer = Buffer.from(privateKey);


  const { logIn } = useAuth();
  const schema = Yup.object().shape({
    // email: Yup.string().email('Invalid email').required('Email is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string()
      // .min(8, 'Must be at least 8 characters long')
      // .matches(
      //   /(?=.*?[A-Z])/,
      //   'Must have at least one uppercase letter',
      // )
      // .matches(
      //   /(?=.*?[a-z])/,
      //   'Must have at least one lowercase letter',
      // )
      // .matches(
      //   /(?=.*?[0-9])/,
      //   'Must have at least one digit',
      // )
      // .matches(
      //   /(?=.*?[#?!@$%^&*-_])/,
      //   'Must have at least one special character (#?!@$%^&*-_)',
      // )
      .required('Password is required.'),
  })
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const copyFileFromAssetsToDocumentDirectory = async () => {
    const documentDirectoryPath = RNFS.DocumentDirectoryPath;
    const assetCertPath = 'dmzcer.csr'; // Path to the file in the assets directory
    const assetKeyPath = 'dmzcer.p8.pem';
    try {
      await RNFS.copyFileAssets(assetCertPath, `${documentDirectoryPath}/dmzcer.csr`);
      await RNFS.copyFileAssets(assetKeyPath, `${documentDirectoryPath}/dmzcer.p8.pem`);
      console.log('File copied from assets to document directory');
    } catch (error) {
      console.error('Error copying file:', error);
    }
  };

  // const readCertificateFiles = async () => {
  //   try{
  //     const certFilePath = RNFS.DocumentDirectoryPath + '/dmzcer.csr';
  //     const keyFilePath = RNFS.DocumentDirectoryPath + '/dmzcer.p8.pem';

  //     // Read the certificate and private key files
  //     const certFile = await RNFS.readFile(certFilePath, 'utf8');
  //     const privateKey = await RNFS.readFile(keyFilePath, 'utf8');
  //     return { certFile, privateKey };

  //   }catch(error){
  //     console.error('Error reading certificate files:', error);
  //   }

  // }



  const logInHandler = async ({ username, password }: ILogin) => {
    // await logIn(username, password);
    // navigation.navigate('Home');
    try {
      setIsLoading(true);
   
        axios.post(LoginAPI, {
          Username: username, password: password
          // httpsAgent:{
          //   cert: certFile,
          //   key: privateKey,
          //   passphrase: '123', 
          // }

          // headers: {
          //   'Content-Type': 'application/json',
          //   'X-Cert': certFile, // Pass the certificate as a custom header
          //   'X-PrivateKey': privateKey, // Pass the private key as a custom header
          // },
        })
          .then(async ({ data }) => {
            console.log("data", data);
            if (data.result === true) {
              // await logIn(username, password);
              // navigation.navigate('Home');
              let { userName, authKey, userID } = data;

              console.log("username ", userName);
              console.log("userId ", userID);
              console.log("authKey ", authKey);
              
              await logIn(userName, authKey, JSON.stringify(userID));
              navigation.navigate('Home');
            } else {
              // Handle the case where the result is not true
              setError(data.errors[0].errorMSG);
              console.log("erorr ", error)
              console.log("Login failed");
            }

          })
          .catch((error) => {
            // Alert.alert(
            //   'Error',
            //   `${error}`,
            // )
            // console.log("error catch", error);
                          if (error.response) {
                  // The server responded with a status code outside the 2xx range
                  console.log('Error response:', error.response);
                } else if (error.request) {
                  // The request was made but no response was received
                  console.log('Error request:', error.request);
                } else {
                  // Something happened in setting up the request that triggered an error
                  console.log('Error message:', error.message);
                }
            // const errorMessage = error.response? error.response.data.message || error.message : 'Network Error';
            // const url = error.response? error.response.config.url : 'Unknown URL';

            // // Print the URL and error message
            // console.log("URL:", url);
            // console.log("Error Message:", errorMessage);
          })
        .finally(() => {
          setIsLoading(false); // Stop loading
        });
    } catch (error) {
      console.log("error: ", error);
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login </Text>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={schema}
        onSubmit={(values) => {
          console.log('Logging in with values:', values);
          logInHandler(values);
        }}>
        {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
          <>
            <Text style={styles.label}>User Name:</Text>
            <TextInput
              style={styles.input}
              // onChangeText={handleChange('username')}
              onChangeText={(text) => {
                setError(''); // Clear the error from the response
                handleChange('username')(text); // Update the username's value
              }}
              onBlur={handleBlur('username')}
              value={values.username}
            // keyboardType="email-address"
            />
            {touched.username && errors.username && <Text style={styles.error}>{errors.username}</Text>}

            <Text style={styles.label}>Password:</Text>
            <TextInput
              style={styles.input}
              // onChangeText={handleChange('password')}
              onChangeText={(text) => {
                setError(''); // Clear the error from the response
                handleChange('password')(text); // Update the password's value
              }}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

            {error && <Text style={styles.error}>{error}</Text>}
            <Button title="Login" onPress={handleSubmit as (e?: GestureResponderEvent) => void} />
          </>
        )}
      </Formik>
      {isLoading && <ActivityIndicator size="large" color="#d1d1e0" />}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
