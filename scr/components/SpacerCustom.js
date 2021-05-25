import React from 'react';
import {View,StyleSheet} from 'react-native';

const SpacerCustom = ({ children,left,right,top,bot,all }) => {
    return <View style={{marginLeft:left || all,marginRight:right || all,marginBottom:bot || all,marginTop:top || all}}>{children}</View>
}
const styles = StyleSheet.create({



});

export default SpacerCustom;