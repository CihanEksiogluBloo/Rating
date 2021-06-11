import React, { useContext,useEffect } from "react";
import {Text,LogBox,StyleSheet } from "react-native";
import {Context as AuthContext} from '../context/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SpacerCustom from "../components/Spacers/SpacerCustom";
import UserProfileCard from "../components/ProfileComps/UserProfileCard";

const UserScreen = ({ navigation }) => {
  const { fetchProfile, state,resetUserProfile } = useContext(AuthContext);
  const nick_name = navigation.getParam("data");
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
    fetchProfile({nick_name});
  }, []);
  return (
    <SafeAreaProvider>
    <SpacerCustom vertical={10} />
      {typeof (state.userProfile) === "object" ? <UserProfileCard data={state.userProfile.data} /> :null
        }
         
          

    </SafeAreaProvider>
  );
};

const styles= StyleSheet.create({
  container: {
    flex: 1,
    borderWidth:2
  },
})

export default UserScreen;
