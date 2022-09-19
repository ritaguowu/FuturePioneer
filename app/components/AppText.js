import React from 'react';
import { Text, StyleSheet } from 'react-native';

function AppText({children, style}) {
    return (
       <Text style={[styles.text, style]}>{children}</Text>
    );
}

const styles = StyleSheet.create({
    text:{
        // fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
        // fontSize: Platform.OS === 'ios' ? 30 : 28,
        ...Platform.select({
            ios:{
                fontSize: 35,
                fontFamily: "Helvetica Neue"
            },
            android:{
                fontSize: 32,
                fontFamily: 'sans-serif'
            }
            
        }),
        fontWeight: "600",
        color: "white"
    }
})

export default AppText;