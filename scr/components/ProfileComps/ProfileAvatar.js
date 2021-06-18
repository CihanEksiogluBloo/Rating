import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";
import NavLink from "../NavigateComps/NavLink";
import SpacerCustom from "../Spacers/SpacerCustom";
import { getLocalhostUri } from "../../api/localhostUri";

const localhostUri = getLocalhostUri();

const ProfileAvatar = ({ profile_image, nick_name, navName,userID }) => {
  const route = navName || "UserSrc"
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <SpacerCustom all={7} left={3} right={2}>
        <Avatar
          rounded
          source={{ uri: `${localhostUri}/ProfilePhoto/${profile_image}` }}
        />
      </SpacerCustom>
      <SpacerCustom all={7} left={3} right={2}>
        <NavLink text={nick_name} routeName={route} data={userID} />
      </SpacerCustom>
    </View>
  );
};
const styles = StyleSheet.create({});

export default ProfileAvatar;
