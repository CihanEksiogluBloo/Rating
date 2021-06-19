import React, { useState } from "react";
import { View, StyleSheet, Animated, TouchableOpacity } from "react-native";
import { Text, Overlay } from "react-native-elements";
import Rating from "../evaluation/Rating";
import ProfileAvatar from "../ProfileComps/ProfileAvatar";
import SocialValuePoint from "../evaluation/SocialValuePoint";
import { getLocalhostUri } from "../../api/localhostUri";
import Comment from "../NavigateComps/Comment";
import { Entypo } from "@expo/vector-icons";
import Toast from 'react-native-simple-toast';

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
  showCommentsButton,
  points,
}) => {
  let lastRateORDefaultValue = 3;
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  typeof points !== "undefined"
    ? (lastRateORDefaultValue = points[0] ? points[0].star : 3)
    : null;

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
          <View style={{ flex: 1 }}>
            <ProfileAvatar
              localhostUri={localhostUri}
              profile_image={profile_image}
              nick_name={nick_name}
              userID={userID}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <SocialValuePoint star={star} />
            </View>
            <TouchableOpacity onPress={toggleOverlay}>
              <Entypo
                name="dots-three-vertical"
                size={20}
                style={{ color: "black" }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Animated.Image
          source={{
            uri: `${localhostUri}/posts/${image}`,
          }}
          style={{
            width: 360,
            height: 480,
            transform: [{ scale: 1 }],
          }}
          resizeMode="contain"
        />
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <View style={{ padding: 20, justifyContent: "space-evenly" }}>
            <TouchableOpacity
              style={styles.dotsButtonContainer}
              onPress={() => {
                toggleOverlay();
                Toast.show('Reported.', Toast.LONG);
              }}
            >
              <Text
                style={[styles.dotsButton, { backgroundColor: "royalblue" }]}
              >
                Report
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dotsButtonContainer}
              onPress={() => {
                toggleOverlay();
              }}
            >
              <Text style={[styles.dotsButton, { backgroundColor: "#E23E57" }]}>
                X Cancel X
              </Text>
            </TouchableOpacity>
          </View>
        </Overlay>

        <View style={{ margin: 2 }}>
          <Text
            style={{
              maxHeight: 35,
              maxWidth: 350,
              textAlign: "center",
              margin: 1,
            }}
          >
            <Text style={{ fontWeight: "bold", color: "#867ae9" }}>
              {nick_name}:{" "}
            </Text>
            {explain}
          </Text>

          {showCommentsButton ? (
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Rating
                userID={userID}
                postID={postID}
                ratePost={ratePost}
                value={lastRateORDefaultValue}
              />

              <View
                style={{
                  justifyContent: "flex-end",
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                <View>
                  <Comment routeName={"CommentsSrc"} data={postID} />
                </View>
              </View>
            </View>
          ) : (
            <Rating
              size={35}
              userID={userID}
              postID={postID}
              ratePost={ratePost}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dotsButton: {
    padding: 10,
    borderRadius: 10,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  dotsButtonContainer: { padding: 15 },
});

export default PostView;
