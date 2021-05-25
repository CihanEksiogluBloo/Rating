import React from 'react';
import {View,StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';
import NavLink from './NavLink';
import SpacerCustom from './SpacerCustom';

const ProfileAvatar = ({localhostUri,profile_image,nick_name}) => {
    return <View style={{flexDirection:"row",alignItems:"center"}}>
    <SpacerCustom all={7} left={3} right={2} >
            <Avatar rounded source={{ uri: `${localhostUri}/ProfilePhoto/${profile_image}` }}/>
    </SpacerCustom>
    <SpacerCustom all={7} left={3} right={2} >
            <NavLink text ={nick_name} routeName="UserScreen" />
    </SpacerCustom>
    </View>
    
  
}
const styles = StyleSheet.create({


});

export default ProfileAvatar;