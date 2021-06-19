import React, { useContext } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import Spacer from "../components/Spacers/Spacer";
import { Context as AuthContext } from "../context/AuthContext";

const SettingsScreen = () => {
  const { signout } = useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      <Spacer>
        <TouchableOpacity onPress={signout}>
          <Text style={styles.textButtonStyle}>Sign Out</Text>
        </TouchableOpacity>
      </Spacer>
    </View>
  );
};
SettingsScreen.navigationOptions = {
  title: "Settings",
  headerStyle: {
    backgroundColor: "#9BA4B4",
  },
  headerTitleStyle: {
    color: "white",
  },
};

const styles = StyleSheet.create({
  textButtonStyle: {
    textAlign: "center",
    backgroundColor: "#325288",
    padding: 10,
    fontSize: 15,
    borderRadius: 20,
    fontWeight: "bold",
    color: "white",
  },
});

export default SettingsScreen;
