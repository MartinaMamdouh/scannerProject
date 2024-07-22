import React from 'react';
import { StyleSheet, Text, View, Button,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DetailsScreenRouteProp, RootStackParamList } from '../navigation/Types';
import { NavigationProp } from '@react-navigation/native';
import ErrorScreen from './ErrorScreen';

export function InScreen() {

    return(
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Ticket Details</Text>
            <View style={styles.row}>
            <Text style={styles.label}>Event Name:</Text>
            <Text style={styles.value}>eventName</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.label}>Event Date:</Text>
            <Text style={styles.value}>eventDate</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.label}>User Name:</Text>
            <Text style={styles.value}>userName</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.label}>User National ID:</Text>
            <Text style={styles.value}>userNationalId</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.label}>User Email:</Text>
            <Text style={styles.value}>userEmail</Text>
            </View>
    </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        // marginTop: 10,
    },
    value: {
        fontSize: 16,
        marginBottom: 10,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
