import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DetailsScreenRouteProp, RootStackParamList } from '../navigation/Types';
import { NavigationProp } from '@react-navigation/native';
import ErrorScreen from './ErrorScreen';

const DetailsScreen = ({ route }: { route: DetailsScreenRouteProp }) => {
    const ticket = route.params;
    console.log("route details", ticket)
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const navigateToScanner = () => {
        navigation.navigate('Scanner');
    };
    const navigateToHome = () => {
        navigation.navigate('Home');
    };
    return (
        <View style={styles.container}>
            <Text>Details</Text>
            <Text>Username: {ticket.username}</Text>
            <Text>Ticket Number: {ticket.ticketNumber}</Text>
            {/* <Text>Is Entered: {ticket.isEntered ? 'Yes' : 'No'}</Text> */}
            <Text style={ticket.isEntered ? { color: 'red' } : {}}>
                {ticket.isEntered ? <ErrorScreen/> : ''}
            </Text>
            <Button title="Scan Again" onPress={navigateToScanner} />
            <View style={styles.space} />
            <Button title="Home" onPress={navigateToHome} />
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
    button:{

    }
});

export default DetailsScreen;

