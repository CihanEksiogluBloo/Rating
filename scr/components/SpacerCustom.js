import React from 'react';
import {View,StyleSheet} from 'react-native';

const SpacerCustom = ({ children,left,right,top,bot,all,horizontal,vertical }) => {
    return <View style={{marginLeft:left|| horizontal || all,marginRight:right ||horizontal || all,marginBottom:bot || vertical || all,marginTop:top || vertical ||all}}>{children}</View>
}
const styles = StyleSheet.create({



});

export default SpacerCustom;