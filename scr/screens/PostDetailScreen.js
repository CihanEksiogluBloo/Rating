import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import PostView from "../components/postComp/PostView";

const PostDetailScreen = ({ navigation }) => {
  const item = navigation.getParam("data");
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

  return (
    <>
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
    </>
  );
};

const styles = StyleSheet.create({});

export default PostDetailScreen;
