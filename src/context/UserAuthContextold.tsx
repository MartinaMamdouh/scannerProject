// import { createContext, useEffect, useState, useContext, ReactNode } from 'react';
// import PropTypes from 'prop-types';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // export const UserAuthContext = createContext();

// // const UserAuthContextProvider = ({ children }) => {
// interface UserAuthContextType {
//   token: string;
//   logIn: (username: string, password: string) => Promise<boolean>;
//   logOut: () => Promise<void>;
// }

// export const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

// interface UserAuthContextProviderProps {
//   children: ReactNode;
// }

// const UserAuthContextProvider = ({ children }: UserAuthContextProviderProps) => {
//   const [token, setToken] = useState('');

//   const logIn = async (username: string, password: string) => {
//     try {
//       // authentication with static token
//       if (username === 'aa@aa' && password === 'aaaaAAAA1@') {
//         console.log("username: ", username);
//         console.log("password: ", password);
//         const staticToken = 'static-token';
//         console.log("static token: ", staticToken);
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

//   const logOut = async () => {
//     await AsyncStorage.removeItem('token');
//     setToken('');
//   };

//   return (
//     <UserAuthContext.Provider
//       value={{ token, logIn, logOut }}
//     >
//       {children}
//     </UserAuthContext.Provider>
//   );
// };

// UserAuthContextProvider.propTypes = {
//   children: PropTypes.element.isRequired,
// };
// // export const useAuth = () => useContext(UserAuthContext);
// export const useAuth = () => {
//   const context = useContext(UserAuthContext);
//   if (!context) {
//      throw new Error("useAuth must be used within a UserAuthContextProvider");
//   }
//   return context;
//  };
// export default UserAuthContextProvider;