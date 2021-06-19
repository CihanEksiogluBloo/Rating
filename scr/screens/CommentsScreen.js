import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Text, Input } from "react-native-elements";
import CommentsOnPost from "../components/postComp/CommentsOnPost";
import Spacer from "../components/Spacers/Spacer";
import { Context as PostContext } from "../context/PostContext";

const CommentsScreen = ({ navigation }) => {
  const { state, fetchPostComments, PostCommenting } = useContext(PostContext);
  const postID = navigation.getParam("data");
  const [comment, setComment] = useState(null);
  const [myComment, setMyComment] = useState(false);

  //const myNickname = state.comments[1].reqNick
  //const myProfileImage = state.comments[1].reqProfileImage

  /*
  state.comments === Array [
    Object {
      "_id": "213123",
      "comment": "this is a comment example",
      "nick_name": "Nick",
      "profile_image": "default.jpg",
      "user_rating": 3.63,
    },
    ...{},
  ]
*/

  useEffect(() => {
    fetchPostComments(postID);
  }, []);

  return (
    <View>
      <Spacer>
        {!myComment ? (
          <View
            style={{
              backgroundColor: "#e1e5ea",
              borderRadius: 20,
              padding: 10,
            }}
          >
            <Input
              placeholder="Comment... (Max 466 Characters.)"
              maxLength={466}
              containerStyle={styles.InputContainer}
              inputStyle={styles.InputLetterStyle}
              onChangeText={(c) => setComment(c)}
            />
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  PostCommenting(postID, comment);
                  setMyComment(true);
                }}
                disabled={comment ? false : true}
              >
                <Text style={styles.InputButton}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <CommentsOnPost
            profile_image={state.comments[1].reqProfileImage}
            nick_name={state.comments[1].reqNick}
            star={state.comments[1].reqUserStar}
            comment={comment}
          />
        )}
        {state.comments[0] ? (
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
        ) : (
          <Text>Loading...</Text>
        )}
      </Spacer>
    </View>
  );
};

CommentsScreen.navigationOptions = {
  title: "Comments",
  headerStyle: {
    backgroundColor: "#9BA4B4",
  },
  headerTitleStyle: {
    color: "white",
  },
};

const styles = StyleSheet.create({
  InputContainer: {
    borderRadius: 20,
    backgroundColor: "rgba(158, 150, 150, 0.4)",
    borderBottomColor: "rgba(158, 150, 150, 1.0)",
    marginBottom: 10,
  },
  InputButton: {
    color: "#47597e",
    fontSize: 20,
    backgroundColor: "#b6c9f0",
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  InputLetterStyle: { color: "rgb(123,104,238)", padding: 5 },
});

export default CommentsScreen;
