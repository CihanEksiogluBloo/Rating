import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import SocialValuePoint from "../evaluation/SocialValuePoint";
import ProfileAvatar from "../ProfileComps/ProfileAvatar";

const CommentsOnPost = ({ profile_image, nick_name,star,comment }) => {
  return (
    <View style={{borderColor: "rgba(125, 125, 125, 0.2)",borderTopWidth: 1, padding:5,marginVertical:5}}>
      <View
        style={{ flexDirection: "row", alignItems: "center",justifyContent:"space-between" }}>

        <ProfileAvatar profile_image={profile_image} nick_name={nick_name} />
        <SocialValuePoint star={star || 2} />
        
      </View>
      <View >
      <Text style={{maxHeight:153,}}>
            {comment}
        </Text>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({});

export default CommentsOnPost;
