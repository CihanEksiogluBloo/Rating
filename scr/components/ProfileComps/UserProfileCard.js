import React from "react";
import {
  View,
  FlatList,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import MiniPost from "../postComp/MiniPost";
import Profile from "./Profile";

const UserProfileCard = ({ ratePost, data, follow, unfollow }) => {
  //<UserProfileCard data={data.userProfile.data} />
  /*
  Object {
  "followers": 1,
  "following": 1,
  "isFollowing": false,
  "myProfile": true,
  "postCounter": 15,
  "posts": Array [
    Object {
      "_id": "6098dd6e5fd2c73ab019f6a5",
      "explain": "hggffdsds",
      "image": "default.jpg",
      "star": 3,
    },
  ],
  "socialValue": 3.91,
  "user": Object {
    "_id": "608447f2a21acb3db4fc1e92",
    "about": "Mobile Developer",
    "followers": Array [
      "607b11e552f09b3c500b24ed",
    ],
    "following": Array [
      "607b11e552f09b3c500b24ed",
    ],
    "name": "Cihan Ekşioğlu",
    "nick_name": "Test10",
    "profile_image": "image_608447f2a21acb3db4fc1e92-1623498988842.jpeg",
  },
}
  */
  return (
    <View>
      {typeof data === "object" ? (
        <ScrollView>
          <Profile data={data} followReq={follow} unfollowReq={unfollow} />
          <FlatList
            data={data.posts}
            numColumns={3}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return (
                <View>
                  <MiniPost
                    imageName={item.image}
                    profile_image={data.user.profile_image}
                    nick_name={data.user.nick_name}
                    star={item.star}
                    screen={"PostDetailHome"}
                    userID={data.user._id}
                    postID={item._id}
                    ratePost={ratePost}
                    explain={item.explain}
                  />
                </View>
              );
            }}
          />
        </ScrollView>
      ) : (
        <ActivityIndicator
          size={Platform.OS == "android" ? 50 : "large"}
          color="#0000ff"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default UserProfileCard;
