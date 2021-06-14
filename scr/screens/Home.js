import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View,
  RefreshControl,
  ScrollView,
  LogBox,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import PostView from "../components/postComp/PostView"
import { Context as PostContext } from "../context/PostContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HomeScreen = () => {
  const { state, ratePost, fetchFollowedPosts, resetPost } =
    useContext(PostContext);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    resetPost();
    fetchFollowedPosts();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    LogBox.ignoreLogs([
      "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.",
    ]);
    fetchFollowedPosts();
  }, []);

  return (
    <SafeAreaProvider style={styles.container}>
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
          {refreshing ? (
            <ActivityIndicator
              size={Platform.OS == "android" ? 50 : "large"}
              color="#0000ff"
            />
          ) : null}

          <SafeAreaProvider style={styles.container}>
            <FlatList
              data={state.post}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => {
                return (
                  <View>
                    <PostView
                      profile_image={item.profile_image}
                      nick_name={item.nick_name}
                      star={item.star}
                      image={item.image}
                      explain={item.explain}
                      postID={item._id}
                      userID={item.userID}
                      ratePost={ratePost}
                      showCommentsButton={true}
                    />
                  </View>
                );
              }}
            />
          </SafeAreaProvider>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};

HomeScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Rating",
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("Share")}>
        <FontAwesome
          name="plus"
          size={27}
          color="black"
          style={{ marginHorizontal: 10 }}
        />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#fff",
  },
  keyboardAvoidingViewContainer: {
    position: "relative",
  },
});

export default HomeScreen;
