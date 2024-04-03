import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const DetailsScreen = ({ route }) => {
    const ticket  = route.params;
console.log("route details", ticket)
    const navigation = useNavigation();
    const navigateToScanner = () => {
        navigation.navigate('Scanner');
    };

    return (
        <View style={styles.container}>
            <Text>Details</Text>
            <Text>Username: {ticket.username}</Text>
            <Text>Ticket Number: {ticket.ticketNumber}</Text>
            <Text>Is Entered: {ticket.isEntered ? 'Yes' : 'No'}</Text>
            <Button title="Scan Again" onPress={navigateToScanner} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    space: {
        height: 10,
    },
});

export default DetailsScreen;

