import React, { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text,Button,Input  } from "react-native-elements";
import CommentsOnPost from "../components/postComp/CommentsOnPost";
import Spacer from "../components/Spacers/Spacer";
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
      "user_rating": 3.63,
    },
    ...{},
  ]
*/


  useEffect(() => {fetchPostComments(postID);}, []);

  return (
    <View>
    <Spacer>
      <Input placeholder='Comment... (Max 466 Characters.)' maxLength={466} />
      <Button onPress={()=> console.log(state.comments)} title="button" />
      {state.comments[0] ? <CommentsOnPost profile_image={state.comments[0].user.profile_image} nick_name={state.comments[0].user.nick_name} star={state.comments[0].user.user_rating} comment={state.comments[0].comment} /> 
        : <Text>Loading...</Text>
      }
      {state.comments[0] ? <CommentsOnPost profile_image={state.comments[0].user.profile_image} nick_name={state.comments[0].user.nick_name} star={state.comments[0].user.user_rating} comment={state.comments[0].comment} /> 
        : <Text>Loading...</Text>
      }
      {state.comments[0] ? <CommentsOnPost profile_image={state.comments[0].user.profile_image} nick_name={state.comments[0].user.nick_name} star={state.comments[0].user.user_rating} comment={state.comments[0].comment} /> 
        : <Text>Loading...</Text>
      }
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
