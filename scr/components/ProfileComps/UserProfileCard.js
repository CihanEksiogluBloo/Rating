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
import { getLocalhostUri } from "../../api/localhostUri";
const localhostUri = getLocalhostUri();

const UserProfileCard = ({ data, follow, unfollow }) => {
  //<UserProfileCard data={data.userProfile.data} />
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
