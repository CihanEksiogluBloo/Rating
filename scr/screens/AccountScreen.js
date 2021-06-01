import React, { useContext, useEffect, useState } from "react";
import {
  Text,
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
import { getLocalhostUri } from "../api/localhostUri";
import Profile from "../components/Profile";
import MiniPost from "../components/MiniPost";
const localhostUri = getLocalhostUri();

const AccountScreen = () => {
  const { fetchProfile, state } = useContext(AuthContext);
  const [veri, setVeri] = useState({});
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
    fetchProfile("myProfile");
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>


      <Profile data={state.data} />


      {state.data ? (
        <FlatList
          data={state.data.posts}
          numColumns={3}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <View>
                <MiniPost
                  localhostUri={localhostUri}
                  imageName={item.image}
                  profile_image={item.profile_image}
                  nick_name={item.nick_name}
                  star={item.star}
                />
              </View>
            );
          }}
        />
        ) : null}
    </SafeAreaView>
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
