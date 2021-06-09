import React, { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text,Button,Input  } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as PostContext } from "../context/PostContext";

const CommentsScreen = ({ navigation }) => {
  const { state, fetchPostComments } = useContext(PostContext);
  const postID = navigation.getParam("data");
  /*
  state.comments === Array [
    Object {
      "_id": "213123",
      "comment": "this is a comment example",
      "nick_name": "Nick",
      "profile_image": "default.jpg",
    },
    ...{},
  ]
*/


  useEffect(() => {fetchPostComments(postID);}, []);

  return (
    <View>
    <Spacer>
      <Input placeholder='BASIC INPUT'/>
      <Button onPress={()=> console.log(state.comments)} title="button" />
    </Spacer>
    </View>
  );
};

CommentsScreen.navigationOptions = {
  title: "Comments",
};

const styles = StyleSheet.create({

});

export default CommentsScreen;
