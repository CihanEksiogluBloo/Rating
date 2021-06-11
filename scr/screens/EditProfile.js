import React, { useContext } from "react";
import { Button } from "react-native";
import { View, Text, StyleSheet,ScrollView } from "react-native";


const EditProfile = ({ navigation }) => {
    const datas = navigation.getParam("data");
    /*datas === {
  "_id": "2",
  "about": "Test strings here",
  "followers": Array [
    "d",
  ],
  "following": Array [
    "d",
  ],
  "name": "Default",
  "nick_name": "Test",
  "profile_image": "default.jpg",
} */


  return (
    <ScrollView>
        <Text>Edit Profile</Text>
        <Button title="Save" onPress={()=> console.log("Profile saved",datas)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default EditProfile;
