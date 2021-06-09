import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Image, Button, Overlay, Avatar } from "react-native-elements";
import ProfileAvatar from "./ProfileAvatar";
import Rating from "./Rating";
import SocialValuePoint from "./SocialValuePoint";
import SpacerCustom from "./SpacerCustom";
import { getLocalhostUri } from "../api/localhostUri";
import { withNavigation } from "react-navigation";

const localhostUri = getLocalhostUri();

const MiniPost = ({
  imageName,
  profile_image,
  nick_name,
  star,
  navigation,
  screen
}) => {
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };


  return (
    <View>
      <SpacerCustom all={5}>
        <TouchableOpacity onLongPress={toggleOverlay} delayLongPress={100} onPress={()=> navigation.navigate(screen,{data:"yazi"})}>
          <Image
            source={{ uri: `${localhostUri}/posts/${imageName}` }}
            style={{ height: 160, width: 120 }}
            PlaceholderContent={<ActivityIndicator />}
          />
        </TouchableOpacity>

        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <View style={{ flexDirection: "row",justifyContent:"space-between" }}>

              <ProfileAvatar
                localhostUri={localhostUri}
                profile_image={profile_image}
                nick_name={nick_name}
              />


              <SocialValuePoint star={star} />

          </View>

          <Image
            source={{ uri: `${localhostUri}/posts/${imageName}` }}
            style={{ height: 400, width: 300 }}
            PlaceholderContent={<ActivityIndicator />}
          />

          <Rating />
        </Overlay>
      </SpacerCustom>
    </View>
  );
};

const styles = StyleSheet.create({});

export default withNavigation(MiniPost);
