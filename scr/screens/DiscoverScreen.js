import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  KeyboardAvoidingView,
  ScrollView,
  LogBox,
  RefreshControl,
  Text,
} from "react-native";
import { SearchBar } from "react-native-elements";
import Spacer from "../components/Spacers/Spacer";
import { Context as PostContext } from "../context/PostContext";
import MiniPost from "../components/postComp/MiniPost";
import { getLocalhostUri } from "../api/localhostUri";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SpacerCustom from "../components/Spacers/SpacerCustom";
import { Button } from "react-native";
import { TouchableOpacity } from "react-native";
import ProfileMiniCard from "../components/ProfileComps/ProfileMiniCard";

const DiscoverScreen = ({ navigation }) => {
  const { state, fetchPosts, resetDiscover, ratePost, fetchSearchData } =
    useContext(PostContext);
  const [search, updateSearch] = useState("");
  const localhostUri = getLocalhostUri();
  const [refreshing, setRefreshing] = useState(false);
  const [searchFocus, setSearchFocus] = useState(true);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    resetDiscover();
    fetchPosts();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  //category === Object { "selectedIndex": 1, }
  /* item === Object {
  "_id": "",
  "category": "",
  "date": "",
  "explain": "",
  "image": "default.jpg",
  "nick_name": "5",
  "profile_image": "1.jpeg",
  "star": 3,
  "userID": "",
}

state.searchList === [
  Object {
    "_id": "2",
    "name": "Default",
    "nick_name": "Test",
    "profile_image": "",
    "user_rating": 3,
  },
  {...},
  ...
]


*/
  useEffect(() => {
    LogBox.ignoreLogs([
      "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.",
    ]);
    fetchPosts();
  }, []);

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <SpacerCustom vertical={10} />
          <Spacer>
            <SearchBar
              placeholder="Type Here..."
              onChangeText={(text) => updateSearch(text)}
              value={search}
              containerStyle={styles.SearchBarContainer}
              inputContainerStyle={styles.SearchBarInput}
              inputStyle={{ color: "rgb(123,104,238)" }}
              onEndEditing={() => {
                search ? fetchSearchData(search) : null;
              }}
              onTouchEnd={() => setSearchFocus(false)}
              onClear={() => setSearchFocus(true)}
            />
          </Spacer>
          {searchFocus ? (
            <FlatList
              data={state.discover}
              numColumns={3}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => {
                return (
                  <View style={{ flexDirection: "row" }}>
                    <MiniPost
                      localhostUri={localhostUri}
                      imageName={item.image}
                      profile_image={item.profile_image}
                      nick_name={item.nick_name}
                      star={item.star}
                      screen="PostDetailDiscover"
                      userID={item.userID}
                      postID={item._id}
                      ratePost={ratePost}
                      explain={item.explain}
                    />
                  </View>
                );
              }}
            />
          ) : (
            <View>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                  setSearchFocus(true);
                  console.log("geri dönme isteği");
                }}
              >
                <View style={{ borderWidth: 1, flex: 1, alignItems: "center" }}>
                  <Text>I'm waiting for you to finish your typing...</Text>
                  <Text>If you wanna go back,</Text>
                  <Text>Touch me!</Text>
                </View>
              </TouchableOpacity>
              <FlatList
                data={state.searchList}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                  return (

                      <ProfileMiniCard
                        username={item.name}
                        nick_name={item.nick_name}
                        profile_image={item.profile_image}
                        star={item.user_rating}
                      />

                  );
                }}
              />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  SearchBarInput: {
    borderRadius: 20,
    backgroundColor: "rgba(158, 150, 150, 0.4)",
    borderBottomColor: "rgba(158, 150, 150, 1.0)",
  },
  SearchBarContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    borderColor: "rgba(158, 150, 150, 0.0)",
    borderBottomColor: "rgba(158, 150, 150, 0.0)",
    borderTopColor: "rgba(158, 150, 150, 0.0)",
  },
  ButtonGroupStyle: {
    height: 50,
    borderRadius: 10,
  },
  ButtonGrouptextStyle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  scrollView: {},
});

export default DiscoverScreen;
