import React, { useContext, useEffect,useState } from "react";
import {StyleSheet, FlatList,LogBox,ScrollView,TouchableOpacity } from "react-native";
import {Button,Text} from "react-native-elements";
import PostView from "../components/postComp/PostView";
import CommentsOnPost from "../components/postComp/CommentsOnPost";
import { Context as PostContext } from "../context/PostContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CommentingArea from '../components/postComp/CommentingArea';
import SpacerCustom from "../components/Spacers/SpacerCustom";

const PostDetailScreen = ({ navigation }) => {
  const item = navigation.getParam("data");
  const { state, fetchPostComments,PostCommenting,deletePost } = useContext(PostContext);
  const [deleteReq, setDeleteReq] = useState(false);

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
  "myProfile": "true/false"
  "navName":"asdas"
}
    */
  useEffect(() => {
    LogBox.ignoreLogs([
      "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.",
    ]);
    fetchPostComments(item.postID);
  }, []);

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView>
        <PostView
          profile_image={item.profile_image}
          nick_name={item.nick_name}
          star={item.star}
          image={item.imageName}
          explain={item.explain}
          postID={item.postID}
          userID={item.userID}
          ratePost={item.ratePost}
          navName={item.navName}
        />
        {
          
          item.myProfile && !deleteReq ?        
          <TouchableOpacity onPress={() => {deletePost(item.postID),setDeleteReq(true)}} style={{alignSelf:"center",padding:10 }} >
          <Text
            style={{
              backgroundColor: "#325288",
              padding: 12,
              fontSize: 15,
              borderRadius: 20,
              fontWeight: "bold",
              color: "white",

            }}
          >
            Delete Post
          </Text>
        </TouchableOpacity>
          :item.myProfile && deleteReq ? <TouchableOpacity style={{alignSelf:"center",padding:10 }} disabled>
          <Text
            style={{
              backgroundColor: "#325288",
              padding: 12,
              fontSize: 15,
              borderRadius: 20,
              fontWeight: "bold",
              color: "white",

            }}
          >
            Deleting...
          </Text>
          </TouchableOpacity>
          :null

        
        }
        <SpacerCustom horizontal={10} vertical={5}>
        <CommentingArea PostCommenting={PostCommenting} 
        postID={item.postID} 
        userProfileImage={""} 
        userNickName={""} 
        userStar={""} />


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
        </SpacerCustom>


      </ScrollView>
    </SafeAreaProvider>
  );
};


PostDetailScreen.navigationOptions = {
  title: "Post Detail",
  headerStyle:{
    backgroundColor:"#9BA4B4",
  },
  headerTitleStyle: {
    color:"white"
  },
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});

export default PostDetailScreen;
