import React from 'react';
import { StyleSheet,View } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import colors from '../config/colors';

export default{
    colors,
    text:
    {
        // fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
        // fontSize: Platform.OS === 'ios' ? 30 : 28,
        ...Platform.select({
            ios:{
                fontSize: 18,
                fontFamily: "Helvetica Neue"
            },
            android:{
                fontSize: 16,
                fontFamily: 'sans-serif'
            }
            
        }),
        fontWeight: '300',
        color: colors.darkblack,
        }
}
