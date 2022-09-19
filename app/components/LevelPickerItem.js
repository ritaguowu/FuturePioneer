import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from './Icon'
import colors from '../config/colors';
import AppDetailText from './AppDetailText';

function LevelPickerItem({item, onPress}) {
    return (
        <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
            <Icon backgroundColor={item.backgroundColor} name={item.icon} size={30} />
            <AppDetailText style={{paddingLeft: 20}}>{item.label}</AppDetailText>
    </View>
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.white,
        flexDirection: "row",
        padding: 25,
        marginVertical: 10
    }
})
export default LevelPickerItem;