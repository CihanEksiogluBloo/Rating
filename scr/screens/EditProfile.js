import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Input, Text } from "react-native-elements";
import AvatarPicker from "../components/Pickers/AvatarPicker";
import Spacer from "../components/Spacers/Spacer";
import { getLocalhostUri } from "../api/localhostUri";
import { Context as ProfileContext } from "../context/ProfileContext";

const localhostUri = getLocalhostUri();

const EditProfile = ({ navigation }) => {
  const { updateProfileImage, updateInfoUser } = useContext(ProfileContext);
  const datas = navigation.getParam("data");
  const [about, setAbout] = useState(datas.about);
  const [name, setName] = useState(datas.name);
  const [uploading, setUploading] = useState(false);
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
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: "center" }}>
        <Text h3>Edit Profile</Text>
        <Spacer />
        <AvatarPicker
          avatarUri={`${localhostUri}/ProfilePhoto/${datas.profile_image}`}
          submit={updateProfileImage}
        />
        <Spacer />
        <Input
          label="About"
          value={about}
          onChangeText={(newAbout) => setAbout(newAbout)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          label="Name"
          value={name}
          onChangeText={(newName) => setName(newName)}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {!uploading ? (
          <TouchableOpacity
            onPress={() => {
              setUploading(true), updateInfoUser(name, about);
            }}
          >
            <Text
              style={{
                backgroundColor: "#325288",
                padding: 10,
                fontSize: 15,
                borderRadius: 20,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Save Informations
            </Text>
          </TouchableOpacity>
        ) : (
          <Text
            style={{
              backgroundColor: "#325288",
              padding: 10,
              fontSize: 15,
              borderRadius: 20,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Uploading...
          </Text>
        )}
        <Spacer />
      </View>
    </View>
  );
};

EditProfile.navigationOptions = {
  title: "Comments",
  headerStyle: {
    backgroundColor: "#9BA4B4",
  },
  headerTitleStyle: {
    color: "white",
  },
};

const styles = StyleSheet.create({});

export default EditProfile;
