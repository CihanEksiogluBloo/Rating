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
  Text,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import PostView from "../components/postComp/PostView";
import { Context as PostContext } from "../context/PostContext";
import { Context as AutContext } from "../context/AuthContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HomeScreen = ({ navigation }) => {
  const { state, ratePost, fetchFollowedPosts, resetPost } =
    useContext(PostContext);
  const { signout } = useContext(AutContext);
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
          <SafeAreaProvider style={styles.container}>
            {state.post.length > 0 ? (
              Array.isArray(state.post[0].points) ? (
                <FlatList
                  data={state.post}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => {
                    return (
                      <View>
                        <PostView
                          profile_image={item.user.profile_image}
                          nick_name={item.user.nick_name}
                          star={item.star}
                          image={item.image}
                          explain={item.explain}
                          postID={item._id}
                          userID={item.user._id}
                          ratePost={ratePost}
                          showCommentsButton={true}
                          points={item.points}
                        />
                      </View>
                    );
                  }}
                />
              ) : (
                <View>
                  <Text>Hi follow someone! or just try login again.</Text>
                  <TouchableOpacity
                    onPress={() => {
                      signout(), navigation.navigate("loginFlow");
                    }}
                    style={styles.LoginButtonContainer}
                  >
                    <Text style={styles.LoginButton}>Login Screen</Text>
                  </TouchableOpacity>
                </View>
              )
            ) : (
              <View>
                <Text>Hi follow someone! or just try login again.</Text>
                <TouchableOpacity
                  onPress={() => {
                    signout(), navigation.navigate("loginFlow");
                  }}
                  style={styles.LoginButtonContainer}
                >
                  <Text style={styles.LoginButton}>Login Screen</Text>
                </TouchableOpacity>
              </View>
            )}
          </SafeAreaProvider>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};

HomeScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Rating",
    headerStyle: {
      backgroundColor: "#9BA4B4",
    },
    headerTitleStyle: {
      color: "white",
    },
    headerRight: () => (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Arena")}>
          <Entypo name="trophy" size={27} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Share")}
          style={{ marginHorizontal: 10 }}
        >
          <FontAwesome
            name="plus"
            size={27}
            color="white"
            style={{ marginHorizontal: 10 }}
          />
        </TouchableOpacity>
      </View>
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
    backgroundColor: "#F9F9F9",
  },
  keyboardAvoidingViewContainer: {
    position: "relative",
  },
  LoginButton: {
    padding: 10,
    borderRadius: 10,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "royalblue",
  },
  LoginButtonContainer: { padding: 15 },
});

export default HomeScreen;
