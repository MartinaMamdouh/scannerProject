import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DetailsScreenRouteProp, RootStackParamList } from '../navigation/Types';
import { NavigationProp } from '@react-navigation/native';

const DetailsScreen = ({ route }: { route: DetailsScreenRouteProp }) => {
    const ticket  = route.params;
console.log("route details", ticket)
const navigation =useNavigation<NavigationProp<RootStackParamList>>();
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

