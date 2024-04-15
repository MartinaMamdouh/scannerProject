
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
    const NoTicket = { username: '', ticketNumber: 'Ticket not Found', isEntered: false };
    const isFocused = useIsFocused();

    // Use this to determine the focus state of the screen
    useFocusEffect(
        useCallback(() => {
            if (isFocused) {
                console.log("aaa");
                setIsCameraActive(isFocused);
                console.log("isCameraActive ", isCameraActive);
                console.log("focus"); //enable the scanner when the screen is focused
                console.log("aaa");
            } else {
                console.log("sss");
                setIsCameraActive(isFocused);
                console.log("isCameraActive", isCameraActive);
                console.log("not focus"); // disable the scanner when the screen is unfocused
                console.log("sss");
            }

        }, [isFocused])
    );

    useEffect(() => {
        const handleCameraPermission = async () => {
            console.log("check permission to camera");
            const granted = await requestCameraPermission();
            console.log("garanted", granted)
            if (!granted) {
                Alert.alert('Camera permission is required to use the camera. Please grant permission in your device settings.');
            }
            else{
                setIsCameraActive(true);
            }
        };
        handleCameraPermission();
    }, [requestCameraPermission]);

    // const toggleEntered = (index) => {
    //     setTickets((prevTickets) =>
    //         prevTickets.map((ticket, i) =>
    //             i === index ? { ...ticket, isEntered: !ticket.isEntered } : ticket
    //         )
    //     );
    // };
    const handleCameraError = useCallback((error) => {
        console.log("error ", error);
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
                    navigation.navigate('Details', NoTicket);
                }
            } catch (error) {
                console.error("Error scanning code:", error);
            }

        },
    });

    if (backCamera == null) {
        return <Text>Camera Not Found</Text>;
    }
    return (
        <SafeAreaView style={styles.container}>
            
            {isFocused &&
                <Camera
                    codeScanner={codeScanner}
                    style={styles.camera}
                    // style={StyleSheet.absoluteFill}
                    device={backCamera}
                    isActive={isCameraActive}
                    torch={torchOn ? 'on' : 'off'}
                    onError={handleCameraError}
                    resizeMode="cover"

                />
            }

            <View style={styles.overlay} />
            <Text>is focus: {isFocused ? 'Yes' : 'No'}</Text>
            <Text>is camera active: {isCameraActive? 'Yes' : 'No'}</Text>
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