import React, { useState, useEffect } from "react";
import { View, StyleSheet, BottomSheet, ListItem, } from "react-native";
import { Text, Avatar, Button,Tooltip } from "react-native-elements";
import { getLocalhostUri } from "../../api/localhostUri";
import SocialValuePoint from "../evaluation/SocialValuePoint";
import MiniPost from "../postComp/MiniPost";
import Spacer from "../Spacers/Spacer";
import SpacerCustom from "../Spacers/SpacerCustom";
import ProfileActionButton from "./ProfileActionButton";
import { withNavigation } from "react-navigation";
import { AntDesign } from '@expo/vector-icons';
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

const localhostUri = getLocalhostUri();
const Profile = ({ data, navigation, followReq, unfollowReq }) => {
  let color = "blue";
  let rate = "normal";

  data
    ? data.socialValue > 2 && data.socialValue <= 3
      ? ((color = "gold"), (rate = "Not Bad"))
      : data.socialValue > 3 && data.socialValue <= 4
      ? ((color = "green"), (rate = "Good!"))
      : data.socialValue > 4 && data.socialValue <= 5
      ? ((color = "purple"), (rate = "Great"))
      : data.socialValue > 1 && data.socialValue <= 2
      ? ((color = "red"), (rate = "Bad!?!"))
      : null
    : null;
  return (
    <View
      style={{
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "rgba(125, 125, 125, 0.2)",
        alignItems: "center",
      }}
    >
      {data ? (
        <View style={{ flex: 1 }}>
          <View style={{ justifyContent: "space-between" }}>
            {
              //<SocialValuePoint star={data.socialValue} />
            }
            <SpacerCustom horizontal={20}>
              <View style={{ flexDirection: "row" }}>
                <Avatar
                  size={70}
                  rounded
                  source={{
                    uri: `${localhostUri}/ProfilePhoto/${data.user.profile_image}`,
                  }}
                />
                <View style={{ marginHorizontal: 10 }}>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                
                  <Text h4>{data.user.name}</Text>
                  <SpacerCustom horizontal={5}>
                  {
                    data.user.officialAccount == 1 
                  ? <Tooltip popover={<Text>Official Account</Text>}><AntDesign name="checkcircle" size={24} color="blue" /></Tooltip>
                  : data.user.officialAccount == 2 
                  ? <Tooltip popover={<Text>Rating App Owner</Text>}><AntDesign name="checkcircle" size={24} color="#99154e" /></Tooltip>
                  : null
                  
                 }
                  </SpacerCustom>
                </View>
                  <Text
                    style={{
                      color: "rgba(125, 125, 125, 0.7)",
                      marginVertical: 1,
                    }}
                  >
                    @{data.user.nick_name}
                  </Text>
                  <Text>{data.user.about}</Text>
                </View>
              </View>
            </SpacerCustom>
          </View>

          <SpacerCustom horizontal={20} top={20} bot={0}>
            <View
              style={{
                borderColor: "rgba(125, 125, 125, 0.5)",
                borderBottomWidth: 1,
                borderTopWidth: 1,
                paddingVertical: 10,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderColor: "rgba(125, 125, 125, 0.5)",
                  marginBottom: 5,
                }}
              >
                <Text style={{ color: color }} h2>
                  {rate}
                </Text>
                <Text h3>{data.socialValue}</Text>
                <Text style={styles.followStrings}>Social Value</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <View style={styles.followStrings}>
                  <Text style={styles.followNumberText}>
                    {data.postCounter}
                  </Text>
                  <Text>Posts</Text>
                </View>
                <View style={styles.followStrings}>
                  <Text style={styles.followNumberText}>{data.followers}</Text>
                  <Text>Followers</Text>
                </View>
                <View style={styles.followStrings}>
                  <Text style={styles.followNumberText}>{data.following}</Text>
                  <Text>Following</Text>
                </View>
              </View>
            </View>

            {data.myProfile ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginVertical: 20,
                }}
              >
                <Button
                  title="Edit"
                  containerStyle={{ width: 250, borderRadius: 10 }}
                  onPress={() =>
                    navigation.navigate("EditSrc", { data: data.user })
                  }
                />
              </View>
            ) : (
                <ProfileActionButton
                  userID={data.user._id}
                  followReq={followReq}
                  unfollowReq={unfollowReq}
                  isFollowing={data.isFollowing}
                />

            )}
          </SpacerCustom>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  followStrings: {
    alignItems: "center",
    marginBottom: 5,
  },
  followNumberText: {
    fontSize: 20,
  },
});

export default withNavigation(Profile);
