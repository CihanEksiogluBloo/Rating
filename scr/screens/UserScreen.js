import React, { useContext,useEffect } from "react";
import { View, Text, TouchableOpacity,FlatList,Button,ScrollView,LogBox,StyleSheet } from "react-native";
import {Context as AuthContext} from '../context/AuthContext';
import MiniPost from '../components/MiniPost';
import { SafeAreaView } from "react-native-safe-area-context";
import { getLocalhostUri } from "../api/localhostUri";
import Profile from '../components/Profile';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SpacerCustom from "../components/SpacerCustom";

const localhostUri = getLocalhostUri();
const UserScreen = ({ navigation }) => {
  const { fetchProfile, state } = useContext(AuthContext);
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
    fetchProfile({nick_name});
  }, []);



  return (
    <SafeAreaProvider>
    <SpacerCustom vertical={10} />
      
        
        {/*state.userProfile.data ? (
          <ScrollView >
          
          <Profile data={state.userProfile.data} />
          

          <FlatList
            data={state.userProfile.data.posts}
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
          </ScrollView>
          ) : null*/}
          <Button title="asdas" onPress={()=> console.log(state)} />
          

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
