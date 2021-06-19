import React, { useContext, useEffect } from "react";
import { LogBox, StyleSheet } from "react-native";
import { Context as ProfileContext } from "../context/ProfileContext";
import { Context as PostContext } from "../context/PostContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SpacerCustom from "../components/Spacers/SpacerCustom";
import UserProfileCard from "../components/ProfileComps/UserProfileCard";

const UserScreen = ({ navigation }) => {
  const { followReq, unfollowReq, resetUserProfile, fetchProfile, state } =
    useContext(ProfileContext);
  const { ratePost } = useContext(PostContext);
  const userID = navigation.getParam("data");
  /*
  state.data === Object {
  "posts": Array [
    Object {
      "_id": "",
      "date": "",
      "explain": "",
      "image": "",
      "star": ,
    } ...,
  ],
  "socialValue": 3,
  "user": Array [
    Object {
      "about": "",
      "name": "",
      "nick_name": "",
      "profile_image": "",
    },
  ],
}
*/

  useEffect(() => {
    LogBox.ignoreLogs([
      "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.",
    ]);
    resetUserProfile();
    fetchProfile({ userID });
  }, []);

  return (
    <SafeAreaProvider>
      <SpacerCustom vertical={10} />
      {typeof state.userProfile === "object" ? (
        <UserProfileCard
          ratePost={ratePost}
          data={state.userProfile.data}
          follow={followReq}
          unfollow={unfollowReq}
        />
      ) : null}
    </SafeAreaProvider>
  );
};

UserScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "User Screen",
    headerStyle: {
      backgroundColor: "#9BA4B4",
    },
    headerTitleStyle: {
      color: "white",
    },
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
  },
});

export default UserScreen;
