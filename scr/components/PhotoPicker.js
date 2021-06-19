import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Platform,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Input, Text, Button, Overlay } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import Spacer from "./Spacers/Spacer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const ImagePickerComp = ({ onSubmit, category, errorMessage }) => {
  const [image, setImage] = useState(null);
  const [input, setInput] = useState("");
  const [ResultObj, setResultObj] = useState({});
  const [posting, setPosting] = useState(true);
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

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
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setResultObj(result);
    }
  };

  return (
    <>
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}

      {image ? (
        <View>
          <Image
            source={{ uri: image }}
            style={{ width: 300, height: 400, alignSelf: "center" }}
          />

          <Input
            leftIcon={{ type: "font-awesome", name: "comment" }}
            placeholder="Add an explain... 90 Characters"
            value={input}
            maxLength={90}
            onChangeText={(newinput) => setInput(newinput)}
          />
          <Spacer>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1, marginHorizontal: 5 }}>
                <Button
                  buttonStyle={{
                    backgroundColor: "green",
                    borderRadius: 15,
                  }}
                  icon={
                    <MaterialCommunityIcons
                      name="checkbox-marked-circle"
                      size={24}
                      color="white"
                    />
                  }
                  title="Post"
                  style={{ justifyContent: "flex-start" }}
                  onPress={toggleOverlay}
                />
              </View>
              <View style={{ flex: 1, marginHorizontal: 5 }}>
                <Button
                  buttonStyle={{
                    backgroundColor: "red",
                    borderRadius: 15,
                  }}
                  icon={
                    <AntDesign
                      name="closecircle"
                      size={24}
                      style={{ marginRight: 2 }}
                      color="black"
                    />
                  }
                  title="Cancel"
                  style={{ justifyContent: "flex-end" }}
                  onPress={() => setImage(null)}
                />
                <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                  <View
                    style={{
                      justifyContent: "space-around",
                      width: 250,
                      height: 250,
                      padding: 5,
                      margin: 20,
                    }}
                  >
                    <Text style={{ fontSize: 20 }}>
                      Are you sure you want to upload the image?
                    </Text>
                    {posting ? (
                      <View>
                        <Button
                          buttonStyle={{
                            backgroundColor: "green",
                            borderRadius: 15,
                            margin: 10,
                          }}
                          icon={
                            <MaterialCommunityIcons
                              name="checkbox-marked-circle"
                              size={24}
                              color="white"
                            />
                          }
                          title=" Yeap!"
                          style={{ justifyContent: "flex-start" }}
                          onPress={() => {
                            onSubmit(input, ResultObj, category),
                              setPosting(false);
                          }}
                        />
                        <Button
                          buttonStyle={{
                            backgroundColor: "red",
                            borderRadius: 15,
                          }}
                          icon={
                            <AntDesign
                              name="closecircle"
                              size={24}
                              style={{ marginRight: 2 }}
                              color="black"
                            />
                          }
                          title="Nooo"
                          style={{ justifyContent: "flex-end" }}
                          onPress={() => {
                            setImage(null), toggleOverlay();
                          }}
                        />
                      </View>
                    ) : (
                      <ActivityIndicator size="large" color="#00ff00" />
                    )}
                  </View>
                </Overlay>
              </View>
            </View>
          </Spacer>
        </View>
      ) : !image ? (
        <TouchableOpacity onPress={pickImage} style={styles.container}>
          <MaterialCommunityIcons
            name="image-plus"
            size={250}
            color="grey"
            style={styles.alignCenter}
          />
          <Spacer />
          <Text style={styles.text}>Touch to Upload Images.</Text>
        </TouchableOpacity>
      ) : null}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
  },
  alignCenter: {
    alignSelf: "center",
  },
  text: {
    fontSize: 25,
    alignSelf: "center",
    color: "grey",
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    alignSelf: "center",
  },
});

export default ImagePickerComp;
