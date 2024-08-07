import React, { useState, useEffect } from 'react';
import { Button, NativeModules, DeviceEventEmitter, Text, View, StyleSheet, AppState, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ReaderScreenRouteProp, RootStackParamList } from '../navigation/Types';
import { NavigationProp } from '@react-navigation/native';
import { TicketInAPI, TicketOutAPI } from '../APIs';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN_JWT, USER_ID } from '../config';



export function ReaderScreen({ route }: { route: ReaderScreenRouteProp }) {
    const direction = route.params;
    var path: string = '';
    console.log("dir:", direction.direction);
    interface JsonObjectType {
        username: string;
        seat_num: number;
        ticket_num: number;
        direction: string;

        // Add other properties as needed
    }
    const [scannedData, setScannedData] = useState(null);
    const [jsonObject, setJsonObject] = useState<JsonObjectType | null>(null);
    const [token, setToken] = useState('');
    
    // useEffect(() => {
    //     fetchToken();
    // }, []);
    // console.log("token1:", token);
    useEffect(() => {

        const appStateListener = AppState.addEventListener('change', (nextAppState) => {
            console.log("nextAppState: ", nextAppState);
            if (nextAppState === 'background') {
                NativeModules.ScannerModule.unregisterReceiver(); //unregister the receiver when the app goes to the background 
            }
            if (nextAppState === 'active') {
                NativeModules.ScannerModule.registerReceiver(); // register when the app comes back active
                // const data = NativeModules.ScannerModule.registerReceiver(); // register when the app comes back active 
                // setScannedData(data);
            }

        });

        NativeModules.ScannerModule.registerReceiver(); // Initial registration
        // const fetchToken = async () => {
        //     const tokenn = await AsyncStorage.getItem(TOKEN_JWT);
        //     setToken(tokenn || '');
        //     console.log("token:", token);
        // };
        const subscription = DeviceEventEmitter.addListener('onBarcodeDataReceived', async (dataResult) => {  //listen to the scanned data            
            console.log("listen Scanned Data:", dataResult);
            setScannedData(dataResult); // Update state with the received data
            if (direction.direction == "in") {
                path = TicketInAPI;
            } else {
                path = TicketOutAPI;
            }
            
            console.log("path:", path);
            // await fetchToken();
            console.log("token2:", await AsyncStorage.getItem(TOKEN_JWT));
            axios.post(path, {
                userId: await AsyncStorage.getItem(USER_ID),
                ticketQR: dataResult,
            }, {
                headers: {
                    Authorization: `Bearer ${await AsyncStorage.getItem(TOKEN_JWT)}`,
                }
            }).then(async ({ data }) => {
                console.log("result", data.result);
                console.log("data", data);
                navigation.navigate('Details', data);
            })
                .catch((error) => {
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
                })
            // try {
            //     const jsonObject = JSON.parse(dataResult);  //if scanned data is json 
            //     console.log("Received JSON:", jsonObject);
            //     //access the properties of the JSON object
            //     console.log("username:", jsonObject.username);
            //     console.log("seat_num:", jsonObject.seat_num);
            //     console.log("ticket_num:", jsonObject.ticket_num);
            //     console.log("direction:", jsonObject.direction);
            //     setJsonObject(jsonObject);
            // } catch (error) {
            //     // console.error("Error parsing JSON string:", error);
            //     Alert.alert(
            //         'Error',
            //         `Error parsing JSON string: ${error}`,
            //         [
            //             { text: 'OK', onPress: () => console.log('OK Pressed') },
            //         ],
            //         { cancelable: false },
            //     );
            // }
        });

        return () => {
            subscription.remove(); // Cleanup: remove the listener when the component unmounts
            NativeModules.ScannerModule.unregisterReceiver();  //unregister if navigate out this screen 
            appStateListener.remove();
        };

    }, []);

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const navigateToHome = () => {
        navigation.navigate('Home');
    };

    const handleBridge = async () => {
        try {
            console.log("nativeModule: ", NativeModules.MyNativeModule);
            console.log("scannerModule: ", NativeModules.ScannerModule);
            const response = await NativeModules.MyNativeModule.myJavaMethod("message from JS");
            console.log("response: ", response);
            //   const scannedData = await NativeModules.ScannerModule.registerReceiver();
            //   console.log("Scanned Data:", scannedData);

        } catch (error) {
            console.error('Error scanning:', error);
        }

    }
    return (
        <View style={styles.container}>
            {/* <Button title="btn" onPress={handleBridge} /> */}
            <View style={styles.space} />
            <Text style={styles.scanTitle}>Please Scan QR Code </Text>
            {/* {scannedData ? (
                // <Text>Data: {scannedData}</Text>

                <View style={styles.dataContainer}>
                    <Text style={styles.scanTitle}>Scan QR Code Again</Text>
                    <View style={styles.dataContainer}>
                        <Text style={styles.title}>Data:</Text>
                        <Text>Username: {jsonObject ? jsonObject.username : ''}</Text>
                        <Text>seat number: {jsonObject ? jsonObject.seat_num : ''}</Text>
                        <Text>ticket number: {jsonObject ? jsonObject.ticket_num : ''}</Text>
                        <Text>direction: {jsonObject ? jsonObject.direction : ''}</Text>
                        <View style={styles.space} />
                        <Button title="Home" onPress={navigateToHome} />
                    </View>
                </View>
            ) : (
                <Text style={styles.scanTitle}>Please Scan QR Code </Text>
            )} */}
            {/* <View style={styles.space} /> */}
            {/* <View style={styles.button}>
                <Button title="Home" onPress={navigateToHome}/>
            </View> */}
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    space: {
        height: 10,
    },
    dataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 130
    },
    title: {

        fontSize: 20,
        fontWeight: 'bold'
    },
    scanTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    // button:{
    //     flex:1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     marginBottom:220
    // }
});
export default ReaderScreen;
