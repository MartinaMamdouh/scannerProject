import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const ScannerScreen = () => {
    console.log("scan screen")
    const [scanning, setScanning] = useState(true);

    const handleScan = ({ data }) => {
        setScanning(false);
        Alert.alert(
            'QR Code Scanned',
            `Data: ${data}`,
            [
                { text: 'OK', onPress: () => setScanning(true) } // Scan next QR code when OK is pressed
            ]
        );
    };

    return (
        <View>
            <Text>barcode scanning </Text>
            <QRCodeScanner
                onRead={handleScan}
                reactivate={scanning} //scan many times
                showMarker={true}  //frame of scanner
                reactivateTimeout={5000}
                // containerStyle={styles.scannerContainer}
                markerStyle={styles.scannerMarker}
            />
            {/* <RNCamera
                style={{ flex: 1 }}
                type={RNCamera.Constants.Type.back}
                onBarCodeRead={({ data }) => console.log("data: ", data)}
            /> */}

        </View>
    );
};

const styles = StyleSheet.create({
 
    scannerContainer: {
        flex: 1,
        width: '100%',
    },
    scannerMarker: {
        borderColor: 'green',
        borderRadius: 10,
    },
});

export default ScannerScreen;
