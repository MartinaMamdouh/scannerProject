// // AuthContext.js
// import React, { createContext, useContext, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState('');

//   const login = async (username, password) => {
//     try {
//       // authentication with static token
//       if (username === 'aa@aa' && password === 'aaaaAAAA1@') {
//         const staticToken = 'static-token'; 
//         await AsyncStorage.setItem('token', staticToken);
//         setToken(staticToken);
//         return true; // Login successful
//       } else {
//         return false; // Login failed
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       return false; // Login failed
//     }
//   };

//   const logout = async () => {
//     await AsyncStorage.removeItem('token');
//     setToken('');
//   };

//   return (
//     <AuthContext.Provider value={{ token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
// export default AuthProvider;

import { createContext, useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserAuthContext = createContext();

const UserAuthContextProvider = ({ children }) => {
  const [token, setToken] = useState('');

  const logIn = async (username: string, password: string) => {
    try {
      console.log("username: ",username);
      console.log("password: ",password);
      // authentication with static token
      if (username === 'aa@aa' && password === 'aaaaAAAA1@') {
        const staticToken = 'static-token'; 
        console.log("static token: ",staticToken);
        await AsyncStorage.setItem('token', staticToken);
        setToken(staticToken);
        return true; // Login successful
      } else {
        return false; // Login failed
      }
    } catch (error) {
      console.error('Error:', error);
      return false; // Login failed
    }
  };

  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    setToken('');
  };

  return (
    <UserAuthContext.Provider
      value={{ token, logIn, logOut }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

UserAuthContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
export const useAuth = () => useContext(UserAuthContext);
export default UserAuthContextProvider;