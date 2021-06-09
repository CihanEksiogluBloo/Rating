import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  KeyboardAvoidingView,
  ScrollView,
  LogBox,
  RefreshControl,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import Spacer from "../components/Spacer";
import { Context as PostContext } from "../context/PostContext";
import MiniPost from "../components/MiniPost";
import { getLocalhostUri } from "../api/localhostUri";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SpacerCustom from "../components/SpacerCustom";
import { Button } from "react-native";

const DiscoverScreen = ({ navigation }) => {
  const { state, fetchPosts, resetDiscover } = useContext(PostContext);
  const [search, updateSearch] = useState("");
  const localhostUri = getLocalhostUri();
  const [refreshing, setRefreshing] = useState(false);

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

  useEffect(() => {
    LogBox.ignoreLogs([
      "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.",
    ]);
    fetchPosts();
  }, []);

  return(
    <SafeAreaProvider style={styles.container}>
      <KeyboardAvoidingView>
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
            />
          </Spacer>
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
                  />
                </View>
              );
            }}
          />
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
  },
});

export default DiscoverScreen;
