import React,{useState} from 'react';
import {View,StyleSheet,Text,ActivityIndicator,TouchableOpacity} from 'react-native';
import {Image,Button, Overlay,Avatar} from 'react-native-elements';
import ProfileAvatar from './ProfileAvatar';
import Rating from './Rating';
import SpacerCustom from './SpacerCustom';


const MiniPost = ({localhostUri,imageName,profile_image,nick_name}) => {
    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => {
        setVisible(!visible);
      };

    return <View>
    <SpacerCustom
    all={5}
    >
    <TouchableOpacity  onLongPress={toggleOverlay}  delayLongPress={100}    >
        <Image
          source={{ uri: `${localhostUri}/posts/${imageName}` }}
          style={{height: 160,width:120 }}
          PlaceholderContent={<ActivityIndicator />}
        />
    </TouchableOpacity>

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        
      <ProfileAvatar 
        localhostUri={localhostUri}
        profile_image={profile_image}
        nick_name = {nick_name}
        />

        <Image
              source={{ uri: `${localhostUri}/posts/${imageName}` }}
              style={{height: 400,width:300 }}
              PlaceholderContent={<ActivityIndicator />}
        />
        
          <Rating />

      </Overlay>

    </SpacerCustom>
    </View>
}

const styles = StyleSheet.create({});

export default MiniPost;