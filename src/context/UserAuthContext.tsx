
import { createContext, useEffect, useState, useContext, ReactNode } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { TOKEN_JWT, USER_NAME } from '../config';

interface UserAuthContextType {
  token: string;
  logIn: (userName: string, authKey: string) => Promise<boolean>;
  logOut: () => Promise<void>;
}

export const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

interface UserAuthContextProviderProps {
  children: ReactNode;
}

const UserAuthContextProvider = ({ children }: UserAuthContextProviderProps) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const setData = async () => {
      // const userData = await AsyncStorage.getItem(USER_ID);
      // setData(userData ? JSON.parse(userData) : null);
      setToken((await AsyncStorage.getItem(TOKEN_JWT)) || '');
    };

    setData();
  }, []);

  const logIn = async (userName: string, authKey: string) => {
    try {
      if (authKey) {
        await AsyncStorage.setItem(TOKEN_JWT, authKey);        
        await AsyncStorage.setItem(USER_NAME, userName);
        console.log("await ",await AsyncStorage.getItem(USER_NAME))
        setToken(await AsyncStorage.getItem(TOKEN_JWT) || '');
        axios.defaults.headers.common.Authorization = authKey;
      } else {
        await AsyncStorage.removeItem(TOKEN_JWT);
        await AsyncStorage.removeItem(USER_NAME);
        axios.defaults.headers.common.Authorization = '';
      }
      return true

    } catch (error) {
      console.error('Error:', error);
      
      return false; // Login failed
    }
  };

  const logOut = async () => {
    console.log("logout");
    axios.defaults.headers.common.Authorization = '';
    await AsyncStorage.removeItem(TOKEN_JWT);
    await AsyncStorage.removeItem(USER_NAME);
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

export const useAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserAuthContextProvider");
  }
  return context;
};
export default UserAuthContextProvider;