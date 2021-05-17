import React from 'react';
import {View,StyleSheet,ActivityIndicator } from 'react-native';
import { Avatar,Image, AirbnbRating  } from 'react-native-elements';
import NavLink from './NavLink';
import SpacerCustom from './SpacerCustom';


const PostView = ({localhostUri,item}) => {

    return <View style={{borderWidth:1,borderColor:"white",alignItems:"center"}}>

    <View >
        
    <View style={{flexDirection:"row", alignItems:"center"}} >
    <View style={{flex:1,flexDirection:"row", alignItems:"center"}}>
        <View style={{flexDirection:"row", alignItems:"center"}}>

        <SpacerCustom top={0}  bot={0} left={0} right={0}>
            <Avatar rounded source={{ uri: `${localhostUri}/ProfilePhoto/${item.profile_image}` }}/>
        </SpacerCustom>
        <NavLink text ={item.nick_name} routeName="UserScreen" />
    </View>
    </View>
</View>

<Image
        source={{ uri: `${localhostUri}/posts/${item.image}` }}
        style={{height: 480,width:360, }}
        PlaceholderContent={<ActivityIndicator />}
    />

    <View style={{flexDirection:"row", alignItems:"center",}} >
    <View style={{flex:1,flexDirection:"row", alignItems:"center"}}>
        <View style={{marginLeft: 15,}}>
        <AirbnbRating
        style={{flexDirection:"row"}}
        count={5}
        reviews={["Terrible", "Bad", "Meh","Good", "Great!"]}
        defaultRating={3}
        size={30}
      />
        </View>
        <View>
                <NavLink   text = "Comments..." routeName="UserScreen" />
        </View>
    </View>
</View>
</View>

    </View>
}

const styles = StyleSheet.create({

})

export default PostView;