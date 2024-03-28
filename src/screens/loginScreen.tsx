import React, { createContext, useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { UserAuthContext } from '../context/UserAuthContext';
import { Formik } from 'formik';
import * as Yup from 'yup';

const LoginScreen = () => {
  // const { logIn } = useContext(UserAuthContext);
  const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
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
  const logInHandler = async ({ email, password }) => {
    await logIn(email, password);
  };

  return (
    <View style={styles.container}>
       <Text style={styles.title}>Login </Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={schema}
        onSubmit={(values) => {
          // Your login logic here
          console.log('Logging in with values:', values);
          logInHandler(values);
        }}>
        {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
          <>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <Text style={styles.label}>Password:</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <Button title="Login" onPress={handleSubmit} />
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
