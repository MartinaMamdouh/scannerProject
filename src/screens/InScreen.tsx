import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DetailsScreenRouteProp, RootStackParamList } from '../navigation/Types';
import { NavigationProp } from '@react-navigation/native';
import ErrorScreen from './ErrorScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
export function InScreen() {

    return (
        <ScrollView style={styles.outercontainer}>
            <View style={styles.container}>
                <Text style={styles.heading}>Ticket Details</Text>
                <View style={styles.space} />
                <View style={styles.row}>
                <Text style={styles.label}>Event Name: </Text>
                <Text style={styles.value}> eventName</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Event Date: </Text>
                    <Text style={styles.value}> eventDate</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>User Name: </Text>
                    <Text style={styles.value}> userName</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>User National ID: </Text>
                    <Text style={styles.value}> userNationalId</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>User Email: </Text>
                    <Text style={styles.value}> userEmail</Text>
                </View>
                {/* <Text style={styles.successMsg}> Successfully Scanned</Text>
                <Ionicons name="checkmark-circle" size={50} color="green" /> */}
                <Text style={styles.errorMsg}> This Ticket is Entered Before</Text>
                <Ionicons name="close-circle" size={50} color="#d50000" />
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    outercontainer:{
        borderWidth: 2,
        borderColor: '#33334d',
        margin:15,
    },
    container: {
        flex: 1,
        // marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,

        // width: '100%',
        // maxWidth: 400, // You can adjust this value to control the max width
       
        // marginLeft:10,
        // marginRight:20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        // marginBottom: 20,
        marginTop:20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right',
        paddingRight: 10,
        // marginTop: 10,
    },
    value: {
        fontSize: 16,
        textAlign: 'left'
        // marginBottom: 10,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    space: {
        height: 20,
    },
    successMsg:{
        color:'green',
        fontSize:20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    errorMsg:{
        color:'#d50000',
        fontSize:20,
        fontWeight: 'bold',
        marginTop: 10,
    },
});
