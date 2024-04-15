import React, { createContext, useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, GestureResponderEvent } from 'react-native';
import { UserAuthContext,useAuth } from '../context/UserAuthContext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { RootStackParamList } from '../navigation/Types';
import { NavigationProp } from '@react-navigation/native';

interface LoginCredentials {
  username: string;
  password: string;
 }
const LoginScreen = () => {
  const { logIn } = useAuth();
  const schema = Yup.object().shape({
    // email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Must be at least 8 characters long')
      .matches(
        /(?=.*?[A-Z])/,
        'Must have at least one uppercase letter',
      )
      .matches(
        /(?=.*?[a-z])/,
        'Must have at least one lowercase letter',
      )
      .matches(
        /(?=.*?[0-9])/,
        'Must have at least one digit',
      )
      .matches(
        /(?=.*?[#?!@$%^&*-_])/,
        'Must have at least one special character (#?!@$%^&*-_)',
      )
      .required('Password is required.'),
  })
  const navigation =useNavigation<NavigationProp<RootStackParamList>>();

  const logInHandler = async ({ username, password }:LoginCredentials ) => {
    await logIn(username, password);
    navigation.navigate('Home');
//     axios.post('https://webtest.bibalex.org/onLineTicketingAdminAPIs/login/Applogin', { Username:username, password:password })
//       .then(async ({ data }) => {
//         console.log("data", data);

//         // const username = email; //setGeneric doesn't accept email-only, only username
//         // if (enableTouch) {
//         //   Keychain.setGenericPassword(username, password);
//         //   console.log("email:", email);
//         //   console.log("username:", username);
//         // }
//         // let { user, token } = data;
//         // await logIn(user, token);
//         // navigation.navigate('Home');

//         await logIn(username, password);
//         navigation.navigate('Home');
//       })
// .catch((error) => {
//   console.log("error", error);
// })
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
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              // keyboardType="email-address"
            />
            {touched.username && errors.username && <Text style={styles.error}>{errors.username}</Text>}

            <Text style={styles.label}>Password:</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <Button title="Login" onPress={handleSubmit  as (e?: GestureResponderEvent) => void} />
          </>
        )}
      </Formik>
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
