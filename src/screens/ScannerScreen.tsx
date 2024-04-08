// import React, { useState } from 'react';
// import { StyleSheet, Text, View, Alert } from 'react-native';
// import QRCodeScanner from 'react-native-qrcode-scanner';
// import { RNCamera } from 'react-native-camera';

// const ScannerScreen = () => {
//     console.log("scan screen")
//     const [scanning, setScanning] = useState(true);

//     const handleScan = ({ data }) => {
//         setScanning(false);
//         Alert.alert(
//             'QR Code Scanned',
//             `Data: ${data}`,
//             [
//                 { text: 'OK', onPress: () => setScanning(true) } // Scan next QR code when OK is pressed
//             ]
//         );
//     };

//     return (
//         <View>
//             <Text>barcode scanning </Text>
//             {/* <QRCodeScanner
//                 onRead={handleScan}
//                 reactivate={scanning} //scan many times
//                 showMarker={true}  //frame of scanner
//                 reactivateTimeout={5000}
//                 // containerStyle={styles.scannerContainer}
//                 markerStyle={styles.scannerMarker}
//             /> */}
//             <RNCamera
//         style={styles.camera}
//         type={RNCamera.Constants.Type.back}
//         onBarCodeRead={ handleScan }
//       />
//             {/* <RNCamera
//                 style={{ flex: 1 }}
//                 type={RNCamera.Constants.Type.back}
//                 onBarCodeRead={({ data }) => console.log("data: ", data)}
//             /> */}

//         </View>
//     );
// };

// const styles = StyleSheet.create({

//     scannerContainer: {
//         flex: 1,
//         width: '100%',
//     },
//     scannerMarker: {
//         borderColor: 'green',
//         borderRadius: 10,
//     },
//     camera: {
//         flex: 1,
//         width: '100%',
//       },
// });

// export default ScannerScreen;

// import React, { useState } from 'react';
// import { StyleSheet, Text, View, Alert } from 'react-native';
// import { RNCamera } from 'react-native-camera';

// const ScannerScreen = () => {
//     const [scanning, setScanning] = useState(true);

//     const handleScan = ({ data }) => {
//         setScanning(false);
//         Alert.alert(
//             'QR Code Scanned',
//             `Data: ${data}`,
//             [
//                 { text: 'OK', onPress: () => setScanning(true) } // Scan next QR code when OK is pressed
//             ]
//         );
//     };

//     return (
//         <View style={styles.container}>
//             <RNCamera
//                 style={styles.camera}
//                 type={RNCamera.Constants.Type.back}
//                 onBarCodeRead={handleScan}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     camera: {
//         flex: 1,
//         width: '100%',
//     },
// });

// export default ScannerScreen;


import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ToastAndroid, Button } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import { useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/Types';
import { NavigationProp } from '@react-navigation/native';

export function ScannerScreen() {
    const [torchOn, setTorchOn] = useState(false);
    const { hasPermission: cameraHasPermission, requestPermission: requestCameraPermission } = useCameraPermission();
    const backCamera = useCameraDevice('back');
    const [isCameraActive, setIsCameraActive] = useState(true);
    const [scannedCodes, setScannedCodes] = useState(new Set());
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [tickets, setTickets] = useState([
        { username: 'User1', ticketNumber: 'T1', isEntered: false },
        { username: 'User2', ticketNumber: 'T2', isEntered: false },
        // Add more dummy data as needed
    ]);

    const isFocused = useIsFocused();

    // Use this to determine the focus state of the screen
    useFocusEffect(
        useCallback(() => {
            if (isFocused) {
                setIsCameraActive(true);
                console.log("isCameraActive ", isCameraActive);

                console.log("focus"); //enable the scanner when the screen is focused
            } else {
                setIsCameraActive(false);
                console.log("isCameraActive", isCameraActive);
                console.log("not focus"); // disable the scanner when the screen is unfocused
            }
            // setIsCameraActive(true);
            // console.log("focus"); //enable the scanner when the screen is focused
            // return () => {

            //     setIsCameraActive(false);
            //     console.log("not focus"); // disable the scanner when the screen is unfocused
            // };

        }, [isFocused])
    );

    useEffect(() => {
        const handleCameraPermission = async () => {
            console.log("check permission to camera");
            const granted = await requestCameraPermission();
            if (!granted) {
                Alert.alert('Camera permission is required to use the camera. Please grant permission in your device settings.');
            }
        };
        handleCameraPermission();
    }, []);

    // const toggleEntered = (index) => {
    //     setTickets((prevTickets) =>
    //         prevTickets.map((ticket, i) =>
    //             i === index ? { ...ticket, isEntered: !ticket.isEntered } : ticket
    //         )
    //     );
    // };
    const handleCameraError = useCallback(() => {
    }, []);



    function updateTicket(ticketNumber: string, isEntered: boolean) {
        // Find the index of the ticket to update
        const index = tickets.findIndex(ticket => ticket.ticketNumber === ticketNumber);

        // Create a new array with the updated ticket
        const updatedTickets = [...tickets];
        if (index !== -1) {
            updatedTickets[index] = { ...updatedTickets[index], isEntered };
        }

        // Update the state with the new array
        setTickets(updatedTickets);
    }

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],  //to recognize qrcode and barcode
        onCodeScanned: (codes) => {
            try {
                const code = codes[0];
                const ticket = tickets.find(ticket => ticket.ticketNumber === code.value);

                if (ticket) {
                    updateTicket(code.value!, true);
                    console.log("ticket ", ticket);
                    navigation.navigate('Details', ticket);
                } else {
                    //ticket not found
                }
            } catch (error) {
                console.error("Error scanning code:", error);
            }


            // if (ticket && ticket.isEntered == false) {
            //     setTickets(tickets.map(t => t.ticketNumber === code.value ? { ...t, isEntered: true } : t));
            //         const updatedTicket = { ...ticket, isEntered: true };
            //         console.log("updated ticket: ", updatedTicket);
            //         navigation.navigate('Details', updatedTicket );
            // }



            // if(!scannedCodes.has(code.value)){
            //     if (ticket && ticket.isEntered == false) {
            //         console.log("ticket: ",ticket)
            //         setTickets(tickets.map(t => t.ticketNumber === code.value ? { ...t, isEntered: true } : t));
            //         const updatedTicket = { ...ticket, isEntered: true };
            //         console.log("updated ticket: ", updatedTicket);
            //         Alert.alert(`QR Code Scanned:${code.value}`,`scan again?`,[
            //             { text: 'Yes', onPress: () => {
            //                 // setIsCameraActive(false);
            //                 // setTimeout(() => setIsCameraActive(true), 100); // Delay to ensure the camera is deactivated
            //                 } }, // No action needed
            //             { text: 'No', onPress: () => navigation.navigate('Home') }, 
            //             { text: 'Details', onPress: () => navigation.navigate('Details', updatedTicket ) }
            //         ]);
            //     }
            //     else if (!ticket ) {
            //         setScannedCodes((prev) => new Set([...prev, code.value]));
            //         Alert.alert(`Ticket ${code.value} not found.`,`scan again?`,[
            //             { text: 'Yes', onPress: () => { } }, // No action needed
            //     { text: 'No', onPress: () => navigation.navigate('Home') }, ]);
            //     }
            // }else{
            //     setScannedCodes((prev) => new Set([...prev, code.value]));
            //     Alert.alert(`Code ${code.value} has already been scanned.`,`scan again?`,[
            //         { text: 'Yes', onPress: () => { } }, // No action needed
            // { text: 'No', onPress: () => navigation.navigate('Home') }, ]);
            // }


            // if (code && !scannedCodes.has(code.value)) {
            //     setScannedCodes((prev) => new Set([...prev, code.value]));

            //     // Alert.alert(`QR Code Scanned: ${code.value}`);
            //     Alert.alert(`QR Code Scanned: ${code.value}`, 'Scan another?', [
            //         { text: 'Yes', onPress: () => { } }, // No action needed
            //         { text: 'No', onPress: () => setScannedCodes(new Set()) }, // Clear scanned codes
            //         { text: 'Details', onPress: () => navigation.navigate('Details') }
            //     ]);
            // }

        },
    });

    if (backCamera == null) {
        return <Text>Camera Not Found</Text>;
    }
    return (
        <SafeAreaView style={styles.container}>
            {isFocused && <Camera
                codeScanner={codeScanner}
                style={styles.camera}
                // style={StyleSheet.absoluteFill}
                device={backCamera}
                isActive={isCameraActive}
                torch={torchOn ? 'on' : 'off'}
                onError={handleCameraError}
                resizeMode="cover"

            />}

            <View style={styles.overlay} />
            <TouchableOpacity
                style={styles.torchButton}
                onPress={() => setTorchOn((prev) => !prev)}
            >
                <Text style={styles.torchButtonText}>{torchOn ? 'Torch Off' : 'Torch On'}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    torchButton: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
    },
    torchButtonText: {
        fontSize: 16,
    },
    camera: {
        width: '100%',
        // flex: 1,
        aspectRatio: 4 / 3,
    },
    overlay: {
        position: 'absolute',
        // top: '10%', // Adjust the position as needed
        // left: '10%', // Adjust the position as needed
        width: '60%', // Adjust the size as needed
        height: '40%', // Adjust the size as needed
        borderWidth: 2,
        borderColor: '#00FF00', // Green border for the scanning area
        borderRadius: 10, // Optional: for rounded corners
        backgroundColor: 'rgba(0,0,0,0.2)', // Semi-transparent background
    },
});
export default ScannerScreen;