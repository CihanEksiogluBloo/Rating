import React,{useState} from 'react';
import {View,StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import SpacerCustom from './SpacerCustom';

const color = "gold"
const SocialValuePoint = ({star}) => {

    return <View style={{flexDirection:"row",alignItems:"center"}}>
        <SpacerCustom all={2}>
        <AntDesign name="star" size={24} color={`${color}`} />
        </SpacerCustom>
        <Text h3 h3Style={{color, fontSize:25}}>{star}</Text>
    </View>
}

const styles = StyleSheet.create({

});

export default SocialValuePoint;