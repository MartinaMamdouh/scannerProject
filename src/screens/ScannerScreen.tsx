import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const ScannerScreen = () => {
    //   const onBarcodeScanned = ({ data }) => {
    //     // Handle scanned data, e.g., navigate to a new screen or display it
    //     console.log('Scanned Barcode:', data);
    //   };
    console.log("scan screen")
    return (
        <View>
            <Text>barcode scanning </Text>
            <QRCodeScanner
        onRead={(e) => (console.log('QR code scanned!', e))}
        // flashMode={RNCamera.Constants.FlashMode.torch}
       reactivate={true}
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
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});

export default ScannerScreen;
