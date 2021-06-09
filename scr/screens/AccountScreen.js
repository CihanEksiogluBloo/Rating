import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  FlatList,
} from "react-native";
import { Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import ProfileAvatar from "../components/ProfileAvatar";
import Profile from "../components/Profile";
import MiniPost from "../components/MiniPost";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SpacerCustom from "../components/SpacerCustom";

const AccountScreen = ({ navigation }) => {
  const { fetchProfile, state } = useContext(AuthContext);
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
    },
  ],
}

  */

  useEffect(() => {
    fetchProfile({ nick_name: "myProfile" });
  }, []);

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <SpacerCustom vertical={10}>
        {state.myProfile ? (
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
                    />
                  </SafeAreaProvider>
                );
              }}
            />
          </ScrollView>
        ) : null}
      </SpacerCustom>
    </SafeAreaProvider>
  );
};
AccountScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.push("Settings")}>
        <MaterialIcons name="admin-panel-settings" size={30} color="black" />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({});

export default AccountScreen;
