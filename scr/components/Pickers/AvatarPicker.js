import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Avatar,Button } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import Spacer from "../Spacers/Spacer";
import { TouchableOpacity } from "react-native";

const AvatarPicker = ({ avatarUri,submit }) => {
  const [image, setImage] = useState(null);
  const [ResultObj, setResultObj] = useState({});

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setResultObj(result);
    }
  };
  return (
    <View>
      {image ? (<View style={{alignItems:"center"}}>
        <Avatar
          rounded
          source={{
            uri: image,
          }}
          size="xlarge"
          onPress={() => pickImage()}
          activeOpacity={0.7}
        /> 
        <Spacer/>
        <TouchableOpacity onPress={()=> submit(ResultObj)}>
          <Text style={{backgroundColor:"#325288",padding:10,fontSize:15,borderRadius:20,fontWeight:"bold",color:"white"}}>Update Profile Image</Text>
        </TouchableOpacity>
        </View>
        
      ) : (
        <Avatar
          rounded
          source={{
            uri: avatarUri,
          }}
          size="xlarge"
          onPress={() => pickImage()}
          activeOpacity={0.7}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});
export default AvatarPicker;
