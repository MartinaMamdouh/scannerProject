import React, { useState } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { CameraScreenRouteProp, RootStackParamList } from '../navigation/Types';
import { NavigationProp } from '@react-navigation/native';
import axios from 'axios';
import { TicketInAPI } from '../APIs';

export function CameraScannerScreen({route}: { route: CameraScreenRouteProp }) {

    const direction   = route.params;
    console.log("dir:",direction.direction);

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
    const [tickets, setTickets] = useState([
        { username: 'User1', ticketNumber: 'T1', isEntered: false },
        { username: 'User2', ticketNumber: 'T2', isEntered: false },
    ]);
    const NoTicket = { username: '', ticketNumber: 'Ticket not Found', isEntered: false };
    function updateTicket(ticketNumber: string, isEntered: boolean) {
        // Find the index of the ticket to update
        const index = tickets.findIndex(ticket => ticket.ticketNumber === ticketNumber);
        // Create a new array with the updated ticket
        const updatedTickets = [...tickets];
        if (index !== -1) {
            updatedTickets[index] = { ...updatedTickets[index], isEntered };
        }
        setTickets(updatedTickets);
    }

    const onCodeScanned = (event: any) => {
        console.log('QR code scanned! Value: ', event.data);
        try {
            // const ticket = tickets.find(ticket => ticket.ticketNumber === event.data);

            // if (ticket) {
            //     updateTicket(event.data, true);
            //     console.log("ticket ", ticket);
            //     navigation.navigate('Details', ticket);
            // } else {
            //     //ticket not found
            //     navigation.navigate('Details', NoTicket);
            // }
            if(direction.direction=="in"){
                axios.post(TicketInAPI, {
                    userId: 2119,
                    ticketQR: event.data
                }).then(async ({ data }) => {
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
            }else{
                axios.post('/OnlineTicketingMobileAPIs/TicketAttendance/TicketOut', {
                    userId: 2119,
                    ticketQR: event.data
                }).then(async ({ data }) => {
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
            }
           
        } catch (error) {
            console.error("Error scanning code:", error);
        }
    };

    return (
        <QRCodeScanner
            onRead={onCodeScanned}
            reactivate={true}
            reactivateTimeout={3000}
            showMarker={true}
        />
    );
}
export default CameraScannerScreen;
