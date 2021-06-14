import React, { useContext, useEffect } from "react";
import {StyleSheet, Button, FlatList,LogBox,ScrollView } from "react-native";
import PostView from "../components/postComp/PostView";
import CommentsOnPost from "../components/postComp/CommentsOnPost";
import { Context as PostContext } from "../context/PostContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CommentingArea from '../components/postComp/CommentingArea';
import SpacerCustom from "../components/Spacers/SpacerCustom";

const PostDetailScreen = ({ navigation }) => {
  const item = navigation.getParam("data");
  const { state, fetchPostComments,PostCommenting } = useContext(PostContext);

  /*data ===
  "explain": "A",
  "imageName": "7.jpeg",
  "navigation": Object {...},
  },
  "nick_name": "Test",
  "postID": "1",
  "profile_image": "default.jpg",
  "ratePost": Function,
  "screen": "PostDetailDiscover",
  "star": 3,
  "userID": "2",
}
    */
  useEffect(() => {
    LogBox.ignoreLogs([
      "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.",
    ]);
    fetchPostComments(item.postID);
  }, []);

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView>
        <PostView
          profile_image={item.profile_image}
          nick_name={item.nick_name}
          star={item.star}
          image={item.imageName}
          explain={item.explain}
          postID={item.postID}
          userID={item.userID}
          ratePost={item.ratePost}
        />
        <SpacerCustom horizontal={10} vertical={5}>
        <CommentingArea PostCommenting={PostCommenting} 
        postID={item.postID} 
        userProfileImage={""} 
        userNickName={""} 
        userStar={""} />


          <FlatList
            data={state.comments[0]}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return (
                <CommentsOnPost
                  profile_image={item.user.profile_image}
                  nick_name={item.user.nick_name}
                  star={item.user.user_rating}
                  comment={item.comment}
                  
                />
              );
            }}
          />
        </SpacerCustom>


      </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});

export default PostDetailScreen;
