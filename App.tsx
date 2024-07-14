import React, { useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import Router from './src/navigation/Router';
import SplashScreen from 'react-native-splash-screen';
import axios from 'axios';
import { API_URL, copyFileFromAssetsToDocumentDirectory, getCertificateAndPrivateKey } from './src/config';
import sslPinning from 'react-native-ssl-pinning';
import { NativeModules } from 'react-native';
import { initializeSslPinning } from 'react-native-ssl-public-key-pinning';

function App(): React.JSX.Element {

  // setTimeout(() => {
  //   SplashScreen.hide();
  // }, 1000);
  const { SSLPinningModule } = NativeModules;
 
  useEffect(() => {
    SplashScreen.hide();
   

    const initializeSSLPinning = async () => {
      // const message=await SSLPinningModule.createNewNetworkClient();
      SSLPinningModule.createNewNetworkClient()
        .then((message: string) => {
          console.log(message); // OkHttpClient created successfully
          axios.defaults.baseURL = API_URL;
          // axios.defaults.timeout = 10000;
        //   const customAxios = axios.create({
        //     baseURL: API_URL,
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // });
      
        
        // axios.post('/login/Applogin', {
        //     Username: "username", password: "aaaAAA111"
        //   })
        //     .then(async ({ data }) => {
        //       console.log("data", data);

        //     })
        //     .catch((error) => {
        //       if (error.response) {
        //         // The server responded with a status code outside the 2xx range
        //         console.log('Error response:', error.response);
        //       } else if (error.request) {
        //         // The request was made but no response was received
        //         console.log('Error request:', error.request);
        //       } else {
        //         // Something happened in setting up the request that triggered an error
        //         console.log('Error message:', error.message);
        //       }
        //     })

        })
        .catch((error: string) => {
           console.error(error);
      });

    };
    initializeSSLPinning();
///////////////////////////////////////
    // const initializeSSLPinning = async () => {
     
    //   // axios.defaults.baseURL = API_URL;

    //   const { certFile, privateKey } = await getCertificateAndPrivateKey();
    //   console.log("hello");
    //   console.log('certFile', certFile);
    //   console.log('privateKey', privateKey);
    //   // console.log('PFXCER', PFXCER);

    //   axios.post('https://172.16.0.43/login/Applogin', {
    //     Username: "username", password: "password"
      
    //   })
    //     .then(async ({ data }) => {
    //       console.log("data", data);
          

    //     })
    //     .catch((error) => {
    //       // Alert.alert(
    //       //   'Error',
    //       //   `${error}`,
    //       // )
    //       console.log("error catch", error);
          
    //     })
      
    //   // axios.create({
      
    //   //   httpsAgent: {
    //   //     cert: certFile,
    //   //     key: privateKey,
    //   //     // pfx:PFXCER,
    //   //     passphrase: '123',
    //   //   },
    //   // })
    // };
    // initializeSSLPinning();
  }, []);

  return (
    <View style={styles.container}>
      <Router />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});

export default App;
