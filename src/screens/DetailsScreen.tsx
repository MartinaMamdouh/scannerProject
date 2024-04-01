import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const DetailsScreen = () => {

    const navigation = useNavigation();
    const navigateToScanner = () => {
        navigation.navigate('Scanner');
      };
      
    return (
        <View style={styles.container}>
          <Text>Details</Text>
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
    
