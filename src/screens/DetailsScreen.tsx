import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DetailsScreenRouteProp, RootStackParamList } from '../navigation/Types';
import { NavigationProp } from '@react-navigation/native';
import ErrorScreen from './ErrorScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DetailsScreen = ({ route }: any) => {
    const ticket = route.params;
    const direction: string = "in";
    console.log("route details", ticket.result);
    // console.log("errmsg", ticket.errors[0].errorMSG);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const navigateToScanner = () => {
        // navigation.navigate('Scan');
    };
    const navigateToHome = () => {
        navigation.navigate('Home');
    };
    return (
        <ScrollView>
            <View style={styles.outercontainer}>
                <Text style={styles.heading}>Ticket Details</Text>
                <View style={styles.space} />
                {/* <View style={styles.row}> */}
                <Text style={styles.label}>Event Name: </Text>
                <Text style={styles.value}> {ticket.ticket.evnt_Name}</Text>
                {/* </View>
                <View style={styles.row}> */}
                <Text style={styles.label}>Event Date: </Text>
                <Text style={styles.value}> {ticket.ticket.eventStartDate}</Text>
                {/* </View>
                <View style={styles.row}> */}
                <Text style={styles.label}>User Name: </Text>
                <Text style={styles.value}> {ticket.ticket.eusr_FirstName} {ticket.ticket.eusr_LastName}</Text>
                {/* </View>
                <View style={styles.row}> */}
                <Text style={styles.label}>User National ID: </Text>
                <Text style={styles.value}> {ticket.ticket.eusr_NationalID}</Text>
                {/* </View>
                <View style={styles.row}> */}
                <Text style={styles.label}>User Email: </Text>
                <Text style={styles.value}> {ticket.ticket.eusr_Email}</Text>
                {/* </View> */}
                {/* <Text style={styles.label}>Last State: </Text>
                <Text style={styles.value}> {ticket.ticket.lastStatus}</Text> */}
                {ticket.result ? (ticket.lastStatus === 'IN' ?
                    (
                        <View style={styles.container}>
                            {/* <Text>true IN</Text> */}
                            <Text style={styles.successMsg}> Successfully Scanned To Enter</Text>
                            <Ionicons name="checkmark-circle" size={50} color="green" />
                        </View>
                    )
                    : (
                        <View style={styles.container}>
                            {/* <Text>true OUT</Text> */}
                            <Text style={styles.successMsg}> Successfully Scanned To Leave</Text>
                            <Ionicons name="checkmark-circle" size={50} color="green" />
                        </View>
                    ))
                    : (ticket.lastStatus === 'IN' ?
                        (
                            <View style={styles.container}>
                                {/* <Text>false OUT</Text> */}
                                <Text style={styles.errorMsg}> {ticket.errors[0].errorMSG}</Text>
                                <Ionicons name="close-circle" size={50} color="#d50000" />
                            </View>
                        )
                        : (
                            <View style={styles.container}>
                                {/* <Text>false IN</Text> */}
                                <Text style={styles.errorMsg}> {ticket.errors[0].errorMSG}</Text>
                                <Ionicons name="close-circle" size={50} color="#d50000" />
                            </View>
                        ))}
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Scan Again" onPress={navigateToHome} />
                {/* <Button title="Home" onPress={navigateToScanner} /> */}
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    outercontainer: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#33334d',
        margin: 15,
    },
    container: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',

    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right',
        paddingRight: 10,
    },
    value: {
        fontSize: 16,
        textAlign: 'left',
        marginBottom: 15,
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
    successMsg: {
        color: 'green',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    errorMsg: {
        color: '#d50000',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: 10,
        width: '50%',
        alignSelf: 'center',
    },
});
//     return (
//         <View style={styles.container}>
//             <Text>Details</Text>
//             <Text>Username: {ticket.username}</Text>
//             <Text>Ticket Number: {ticket.ticketNumber}</Text>
//             {/* <Text>Is Entered: {ticket.isEntered ? 'Yes' : 'No'}</Text> */}
//             <Text style={ticket.isEntered ? { color: 'red' } : {}}>
//                 {ticket.isEntered ? <ErrorScreen/> : ''}
//             </Text>
//            
//             <View style={styles.space} />
//             <Button title="Home" onPress={navigateToHome} />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     space: {
//         height: 10,
//     },
//     button:{

//     }
// });

export default DetailsScreen;

