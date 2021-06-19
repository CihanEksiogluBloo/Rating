import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  FlatList,
  KeyboardAvoidingView,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import { Button } from "react-native-elements";
import { Context as ProfileContext } from "../context/ProfileContext";
import {Context as PostContext} from '../context/PostContext';
import { MaterialIcons } from "@expo/vector-icons";
import Profile from "../components/ProfileComps/Profile";
import MiniPost from "../components/postComp/MiniPost";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SpacerCustom from "../components/Spacers/SpacerCustom";

const AccountScreen = ({ navigation }) => {
  const { fetchProfile, state,resetmyProfile } = useContext(ProfileContext);
  const {ratePost} = useContext(PostContext);
  const [veri, setVeri] = useState({});

  /*
  state.myProfile.data === Object {
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
      "_id": "d"
    },
  ],
}

  */

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const [refreshing, setRefreshing] = useState(false);

const onRefresh = React.useCallback(() => {
  setRefreshing(true);
  resetmyProfile();
  fetchProfile({ userID: "myProfile" });
  wait(2000).then(() => setRefreshing(false));
}, []);

  useEffect(() => {
    fetchProfile({ userID: "myProfile" });
  }, []);

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
    <KeyboardAvoidingView
        style={styles.keyboardAvoidingViewContainer}
        behavior="height"
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
      <SpacerCustom vertical={10}>

        {typeof state.myProfile.data !== 'undefined' && refreshing == false ? (
          <ScrollView>
            <Profile data={state.myProfile.data} />
            <FlatList
              data={state.myProfile.data.posts}
              numColumns={3}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => {
                return (
                  <SafeAreaProvider style={{ flex: 1 }}>
                    <MiniPost
                      imageName={item.image}
                      profile_image={state.myProfile.data.user.profile_image}
                      nick_name={state.myProfile.data.user.nick_name}
                      star={item.star}
                      screen={"PostDetail"}
                      userID={state.myProfile.data.user._id}
                      postID={item._id}
                      ratePost={ratePost}
                      explain={item.explain}
                      myProfile={state.myProfile.data.myProfile}
                    />
                  </SafeAreaProvider>
                );
              }}
            />
          </ScrollView>
            ) : <ActivityIndicator size="large" />}
      </SpacerCustom>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};
AccountScreen.navigationOptions = ({ navigation }) => {
  return {
    headerStyle:{
      backgroundColor:"#9BA4B4",
    },
    headerTitleStyle: {
      color:"white"
    },
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.push("Settings")}>
        <MaterialIcons name="admin-panel-settings" size={30} color="white" />
      </TouchableOpacity>
    ),
  };
};


const styles = StyleSheet.create({});

export default AccountScreen;
