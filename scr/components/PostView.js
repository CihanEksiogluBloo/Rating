import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Image, Text } from "react-native-elements";
import NavLink from "./NavLink";
import Rating from "./Rating";
import ProfileAvatar from "./ProfileAvatar";
import SocialValuePoint from "./SocialValuePoint";

const PostView = ({ localhostUri, item, ratePost }) => {
  /* item example
item === Object {
  "__v": 0,
  "_id": "213213123",
  "category": "Foods",
  "date": "2021-05-13T16:58:20.469Z",
  "explain": "Vghh",
  "image": "231231.jpeg",
  "nick_name": "Test10",
  "profile_image": "default.jpg",
  "star": 5,
  "userID": "2132132131231",
}
*/

  return (
    <View style={{ alignItems: "center", marginBottom: 5 }}>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignContent: "space-between",
          }}
        >
          <ProfileAvatar
            localhostUri={localhostUri}
            profile_image={item.profile_image}
            nick_name={item.nick_name}
          />
          <View
            style={{ flex: 1, marginHorizontal: 5, alignItems: "flex-end" }}
          >
            <SocialValuePoint star={item.star} />
          </View>
        </View>

        <Image
          source={{ uri: `${localhostUri}/posts/${item.image}` }}
          style={{ height: 480, width: 360 }}
          PlaceholderContent={<ActivityIndicator />}
        />

        <View style={{ borderColor: "red", borderWidth: 2, borderRadius: 10 }}>
          <Text
            style={{
              maxHeight: 35,
              maxWidth: 350,
              textAlign: "center",
              margin: 1,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{item.nick_name}: </Text>
            {item.explain}
          </Text>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Rating
              userID={item.userID}
              postID={item._id}
              ratePost={ratePost}
            />

            <View style={{ alignItems: "center", flex: 1 }}>
              <NavLink
                text="Comments..."
                routeName="CommentsSrc"
                data={item._id}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default PostView;
