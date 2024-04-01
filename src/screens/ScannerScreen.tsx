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


import React, { useEffect, useState, useCallback } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ToastAndroid } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import { useNavigation } from '@react-navigation/native';

export function ScannerScreen() {
    const [torchOn, setTorchOn] = useState(false);
    const { hasPermission: cameraHasPermission, requestPermission: requestCameraPermission } = useCameraPermission();
    const backCamera = useCameraDevice('back');
    const [scanning, setScanning] = useState(true);
    const [scannedCodes, setScannedCodes] = useState(new Set());
    const navigation = useNavigation();

    const handleCameraError = useCallback(() => {
    }, []);

    useEffect(() => {
        const handleCameraPermission = async () => {
            console.log("check permission to camera")
            const granted = await requestCameraPermission();
            if (!granted) {
                Alert.alert('Camera permission is required to use the camera. Please grant permission in your device settings.');
            }
        };
        handleCameraPermission();
    }, []);
   
    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
            const code = codes[0];

            if (code && !scannedCodes.has(code.value)) {
                setScannedCodes((prev) => new Set([...prev, code.value]));

                // Alert.alert(`QR Code Scanned: ${code.value}`);
                Alert.alert(`QR Code Scanned: ${code.value}`, 'Scan another?', [
                    { text: 'Yes', onPress: () => { } }, // No action needed
                    { text: 'No', onPress: () => setScannedCodes(new Set()) }, // Clear scanned codes
                    { text: 'Details', onPress: () => navigation.navigate('Details') }
                ]);
            }

        },
    });

    if (backCamera == null) {
        return <Text>Camera Not Found</Text>;
    }
    return (
        <SafeAreaView style={styles.container}>
            <Camera
                codeScanner={codeScanner}
                style={styles.camera}
                // style={StyleSheet.absoluteFill}
                device={backCamera}
                isActive={true}
                torch={torchOn ? 'on' : 'off'}
                onError={handleCameraError}
                resizeMode="cover"
            />
         
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
aspectRatio: 4/3,
    },
});
export default ScannerScreen;