import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Image, Overlay } from "react-native-elements";
import ProfileAvatar from "../ProfileComps/ProfileAvatar";
import Rating from "../evaluation/Rating";
import SocialValuePoint from "../evaluation/SocialValuePoint";
import SpacerCustom from "../Spacers/SpacerCustom";
import { getLocalhostUri } from "../../api/localhostUri";
import { withNavigation } from "react-navigation";

const localhostUri = getLocalhostUri();

const MiniPost = ({
  imageName,
  profile_image,
  nick_name,
  star,
  navigation,
  screen,
  userID,
  postID,
  ratePost,
  explain,
  myProfile,
}) => {
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <SpacerCustom all={5}>
        <TouchableOpacity
          onLongPress={toggleOverlay}
          delayLongPress={100}
          onPress={() =>
            navigation.navigate(screen, {
              data: {
                imageName,
                profile_image,
                nick_name,
                star,
                screen,
                userID,
                postID,
                ratePost,
                explain,
                myProfile,
              },
            })
          }
        >
          <Image
            source={{ uri: `${localhostUri}/posts/${imageName}` }}
            style={{ height: 160, width: 120 }}
            PlaceholderContent={<ActivityIndicator />}
          />
        </TouchableOpacity>

        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <ProfileAvatar
                localhostUri={localhostUri}
                profile_image={profile_image}
                nick_name={nick_name}
                userID={userID}
              />
            </View>
            <View>
              <SocialValuePoint star={star} />
            </View>
          </View>

          <Image
            source={{ uri: `${localhostUri}/posts/${imageName}` }}
            style={{ height: 400, width: 300 }}
            PlaceholderContent={<ActivityIndicator />}
          />

          <Rating userID={userID} postID={postID} ratePost={ratePost} />
        </Overlay>
      </SpacerCustom>
    </View>
  );
};

const styles = StyleSheet.create({});

export default withNavigation(MiniPost);
