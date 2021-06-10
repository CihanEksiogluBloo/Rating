import React from "react";
import { View, StyleSheet, ActivityIndicator,Dimensions, Animated } from "react-native";
import { Image, Text } from "react-native-elements";
import Rating from "../evaluation/Rating";
import ProfileAvatar from "../ProfileComps/ProfileAvatar";
import SocialValuePoint from "../evaluation/SocialValuePoint";
import { getLocalhostUri } from "../../api/localhostUri";
import Comment from "../NavigateComps/Comment";


const localhostUri = getLocalhostUri();

const PostView = ({
  profile_image,
  nick_name,
  star,
  image,
  explain,
  postID,
  userID,
  ratePost,
}) => {
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

<Image
          source={{ uri: `${localhostUri}/posts/${image}` }}
          style={{ height: 480, width: 360 }}
          PlaceholderContent={<ActivityIndicator />}
        />
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
            profile_image={profile_image}
            nick_name={nick_name}
          />
          <View
            style={{ flex: 1, marginHorizontal: 5, alignItems: "flex-end" }}
          >
            <SocialValuePoint star={star} />
          </View>
        </View>


        
        <Animated.Image
      source={{
        uri: `${localhostUri}/posts/${image}`
      }}
      style={{
        width: 360,
        height: 480,
        transform: [{ scale: 1 }]
      }}
      resizeMode='contain'
    />





        <View style={{ margin: 2 }}>
          <Text
            style={{
              maxHeight: 35,
              maxWidth: 350,
              textAlign: "center",
              margin: 1,
            }}
          >
            <Text style={{ fontWeight: "bold",color:"#ffffff99" }}>{nick_name}: </Text>
            {explain}
          </Text>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Rating userID={userID} postID={postID} ratePost={ratePost} />

            <View
              style={{
                justifyContent: "flex-end",
                flex: 1,
                flexDirection: "row",
              }}
            >
              <View>
                <Comment routeName="CommentsSrc" data={postID} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default PostView;
