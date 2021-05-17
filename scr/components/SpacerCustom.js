import React from 'react';
import {View,StyleSheet} from 'react-native';

const SpacerCustom = ({ children,left,right,top,bot }) => {
    return <View style={{marginLeft:left,marginRight:right,marginBottom:bot,marginTop:top}}>{children}</View>
}
const styles = StyleSheet.create({



});

export default SpacerCustom;