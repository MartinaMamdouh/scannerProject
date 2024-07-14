import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const ErrorScreen = () => {
    return (
        <View>
            <Text style={styles.error}>you have entered before</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    error:{
        color:'red',
        fontSize:15,

    }
})
export default ErrorScreen;
