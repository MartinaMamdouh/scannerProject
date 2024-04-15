import React, {useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/Types';
import { NavigationProp } from '@react-navigation/native';

export function ScannerScreen() {
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

    const onCodeScanned = (event:any) => {
        console.log('QR code scanned! Value: ', event.data);
        try {
            const ticket = tickets.find(ticket => ticket.ticketNumber === event.data);

            if (ticket) {
                updateTicket(event.data, true);
                console.log("ticket ", ticket);
                navigation.navigate('Details', ticket);
            } else {
                //ticket not found
                navigation.navigate('Details', NoTicket);
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
export default ScannerScreen;
