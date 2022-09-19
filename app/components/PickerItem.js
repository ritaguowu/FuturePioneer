import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import AppDetailText from './AppDetailText';

function PickerItem({item, onPress}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <AppDetailText style={styles.text}>{item.label}</AppDetailText>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    text:{
        padding: 20,
    }
})

export default PickerItem;