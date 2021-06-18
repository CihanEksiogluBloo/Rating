import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import ProfileAvatar from "../ProfileComps/ProfileAvatar";

const CommentsOnPost = ({ profile_image, nick_name, comment,navigation,userID }) => {
  return (
    <View
      style={{
        borderColor: "rgba(125, 125, 125, 0.2)",
        borderTopWidth: 1,
        padding: 5,
        marginVertical: 5,
        backgroundColor: "#a7bbc7",
        borderRadius: 15,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#eeeded",
          borderRadius: 15,
        }}
      >
        {nick_name === "Me" ? (
          <TouchableOpacity onPress={()=>navigation.navigate("Account")}>
            <Text style={{color:"royalblue",padding:5,fontSize:15,fontWeight:"bold",}}>{nick_name}</Text>
          </TouchableOpacity>
        ) : (
          <ProfileAvatar profile_image={profile_image} nick_name={nick_name} userID={userID} />
        )
      }
      </View>
      <View
        style={{
          backgroundColor: "#eeeded",
          borderRadius: 15,
          marginVertical: 5,
          padding:5
          
        }}
      >
        <Text style={styles.textStyle}>{comment}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    maxHeight: 153,
    paddingLeft: 10,
  },
});

export default CommentsOnPost;
