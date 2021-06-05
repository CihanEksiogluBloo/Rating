import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  LogBox,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import PostView from "../components/PostView";
import { getLocalhostUri } from "../api/localhostUri";
import { Context as PostContext } from "../context/PostContext";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HomeScreen = () => {
  const localhostUri = getLocalhostUri();
  const { state, fetchImage, ratePost, fetchFollowedPosts, reset } =
    useContext(PostContext);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    LogBox.ignoreLogs([
      "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.",
    ]);
    fetchFollowedPosts();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          <FlatList
            scrollEnabled={false}
            data={state.post}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return (
                <View>
                  <PostView
                    localhostUri={localhostUri}
                    item={item}
                    ratePost={ratePost}
                  />
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
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
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
